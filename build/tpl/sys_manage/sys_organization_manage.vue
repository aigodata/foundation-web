<template>
  <!-- 组织机构管理 -->
  <div class="page-sys_organization_manage">
    <!-- 新增 & 批量删除 -->
    <div class="app-page-box">
      <div class="app-page-box-content clearfix">
        <!--<el-button type="success" @click="editConfirm('insert')"-->
        <!--v-permission="'sys_organization_manage.add'">新增</el-button>-->
        <el-button type="danger" :disabled="delBatchBtnDisabled" v-permission="'sys_organization_manage.delete'"
                   @click="delConfirm(null, true)">批量删除
        </el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="app-page-box">
      <!-- 表格 -->
      <el-table stripe border tooltip-effect="dark" ref="tableData" v-loading="loading" :data="tableData" row-key="id"
                default-expand-all :tree-props="{children: 'children'}" @sort-change="handleSortChange"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" :selectable="handleSelectable" width="50" align="center">
        </el-table-column>
        <el-table-column prop="name" label="组织机构名称" sortable="custom">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="category" label="组织机构类别" sortable="custom">
          <template slot-scope="scope">{{ mixin_dict.sys_org__category[scope.row.category] }}</template>
        </el-table-column>
        <el-table-column prop="description" label="简称" sortable="custom">
          <template slot-scope="scope">{{ scope.row.short_name }}</template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="240px" fixed="right"
                         v-if="permissionsLock('sys_organization_manage.add.update.delete')">
          <template slot-scope="scope">
            <el-button type="success" size="mini" v-permission="'sys_organization_manage.add'"
                       @click="editConfirm('insert', scope.row)">新建下属
            </el-button>
            <!-- <div class="operation-line"></div> -->
            <el-button type="success" size="mini" v-permission="'sys_organization_manage.update'"
                       v-show="scope.row.id !== 1" @click="editConfirm('update', scope.row)">修改
            </el-button>
            <!-- <div class="operation-line"></div> -->
            <el-button type="success" size="mini" v-permission="'sys_organization_manage.delete'"
                       v-show="scope.row.id !== 1" @click="delConfirm(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增 & 编辑 dialog -->
    <el-dialog class="edit-dialog" width="750px" append-to-body @close="resetEditForm()" :title="editDialogDisplayTitle"
               :visible.sync="editDialogVisible">

      <el-form status-icon label-width="120px" :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="上级单位:" prop="parent_id" v-if="editDialogType === 'insert'">
          {{ editForm.parent.name }}
        </el-form-item>
        <el-form-item label="组织机构名称:" prop="name">
          <el-input v-model="editForm.name" clearable placeholder="组织机构名称"></el-input>
        </el-form-item>
        <el-form-item label="简称:" prop="short_name">
          <el-input v-model="editForm.short_name" clearable placeholder="简称"></el-input>
        </el-form-item>
        <!-- 仅新增 才能使用     不是事业部 && editForm.parent.category !== 3 -->
        <el-form-item label="组织机构类别:" prop="category" v-show="editDialogType === 'insert'">
          <el-select v-model="editForm.category" clearable placeholder="请选择">
            <!--<el-option label="CFAA" :value="1"></el-option>-->
            <el-option v-for="item in dict.category[editForm.parent.category]" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 仅编辑使用 -->
        <el-form-item label="组织机构类别:" prop="category" v-show="editDialogType === 'update'">
          <span class="el-form-item-read-only" v-show="editDialogType === 'update'">
              {{ mixin_dict.sys_org__category[editForm.category] }}
          </span>
        </el-form-item>
        <!-- 新增 编辑 都使用 -->
       <!-- <el-form-item label="下属工厂:" prop="factory" v-show="editForm.category === 3 || editForm.parent.category === 3">
          <el-checkbox-group v-model="editForm.factory">
            <el-checkbox v-for="item in factoryList" :checked="checked" @change="checked=!checked" :label="item.id"
                         :key="item.id">{{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        -->
        <el-form-item label="描述:" prop="description">
          <el-input v-model="editForm.description" clearable placeholder="组织机构描述" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" :loading="editBtnLoading" @click="editSave()">保存</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script>
  import cryptoUtil from '@/lib/cryptoUtil'
  import basic from '@/mixin/basic';
  import permission from '@/mixin/permission';

  export default {
    mixins: [basic, permission],
    name: 'sys_organization_manage',
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    data() {

      // 自定义验证 是否重名
      let validateRename = (rule, value, callback) => {
        let display = {name: '组织机构名称'};
        // 编辑情况下, 过滤自己的名字
        if (this.editDialogType === 'update') {
          if (this.editRow[rule.field] === value) {
            return callback();
          }
        }
        this.$post('/action', {
          data: {
            "select": this.tableName,
            "where": rule.field + '=' + value,
            "fields": ["name"]
          }
        }, true).then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            callback(new Error(display[rule.field] + ' ' + value + ' 已存在, 请更换' + display[rule.field] + '重试'))
          } else {
            callback();
          }
        })
      };

      return {
        dict: {
          // 为了解决复杂的从属关系
          category: {
            // cfaa
            1: [
              {value: 2, label: '分子公司'},
              {value: 3, label: '事业部'},
              {value: 4, label: '部门'}
            ],
            // 分子公司
            2: [
              {value: 4, label: '部门'},
              {value: 5, label: '工厂'}
            ],
            // 事业部
            3: [
              {value: 4, label: '部门'},
              {value: 5, label: '工厂'}
            ],
            // 部门
            4: [
              {value: 4, label: '部门'},
              {value: 5, label: '工厂'}
            ],
            // 工厂
            5: [
              {value: 2, label: '分子公司'},
              {value: 3, label: '事业部'},
              {value: 4, label: '部门'},
              {value: 5, label: '工厂'},
            ]
          }
        },
        // element-ui的bug
        checked: false,
        // 工厂列表
        factoryList: [],
        // 新增 & 编辑
        editRow: {},                  // 编辑时当前临时记录
        editDialogVisible: false,     // 编辑弹出框显示状态
        editBtnLoading: false,        // 编辑弹出框的保存按钮的loading
        editDialogType: "",           // 编辑弹出框的当前状态, 是编辑, 还是新增
        editDialogDisplayTitle: "",   // 编辑弹出框的标题
        editDialogDisplay: {          // 编辑弹出框的标题映射
          "insert": "新增下属",
          "update": "编辑"
        },
        //表单验证
        editFormRules: {
          name: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {validator: validateRename, trigger: 'blur'},
          ],
          category: [
            {required: true, message: '字段不能为空', trigger: 'change'},
          ],
        },
        editForm: {
          parent: {},
          factory: []
        },
        // 删除弹窗
        delRow: {},                     // 删除时当前临时记录
        delBatchBtnDisabled: true,      // 批量删除按钮的禁用状态
        // 列表相关
        tableName: 'sys_org',
        where: [],
        order: ["id asc"],
        loading: false,
        tableData: [],
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200],
        currentPage: 1,
        multipleSelection: []
      }
    },
    methods: {
      // 新增 & 编辑
      editConfirm(type, row) {
        this.editDialogVisible = true;
        this.editDialogType = type;
        this.editDialogDisplayTitle = this.editDialogDisplay[type];
        this.editRow = JSON.parse(JSON.stringify(row));
        if (type === 'update') {
          this.editForm = JSON.parse(JSON.stringify(row))
          this.editForm.parent = this.findByTree(row.id, this.tableData)
          if (row.children) {
            this.editForm.factory = row.children.filter(d => d.category === 5).map(d => d.id)
          } else {
            this.editForm.factory = []
          }
        } else {
          this.editForm.parent = JSON.parse(JSON.stringify(row))
          this.editForm.parent_id = row.id
          this.editForm.org_code = this.getOrgCode(row)
          this.editForm.factory = []
        }
        // 特殊处理, 事业部情况, 需要选择下属工厂
        // if (this.editForm.category === 3 || this.editForm.parent.category === 3) {
        //  this.editForm.factory = []
        // }
      },
      // 组织机构代码
      getOrgCode(parent) {
        let len = parent.children ? parent.children.length : 0
        let parentOrgCode = parent.org_code
        return parentOrgCode + this.$filter.leftPrefix((len + 1) + '', 3, '0')
      },
      // 保存事件
      editSave() {
        this[this.editDialogType]();
      },
      // 新增
      insert() {
        // 表单验证
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            let editForm = JSON.parse(JSON.stringify(this.editForm));
            delete editForm.parent
            delete editForm.factory
            this.editBtnLoading = true;
            this.$post('/action', {
              data: {
                "insert": this.tableName,
                "values": editForm
              }
            }, true).then((data) => {
              if (data.primary_key !== 0) {
                // @特殊处理, 事业部情况, 要同步新增|编辑|删除 若干下属工厂
                /* 剔除事业部特殊处理逻辑 2019.7.4 lzy
                this.editDepartment(this.editForm, data.primary_key, () => {
                  this.editBtnLoading = false;
                  this.editDialogVisible = false;
                  this.$message({message: '新增成功', type: 'success'});
                  this.list();
                })*/
                this.editBtnLoading = false;
              	this.editDialogVisible = false;
              	this.$message({message: '新增成功', type: 'success'});
              	this.list();
              }
            }).catch(err => {
              this.editBtnLoading = false;
              this.editDialogVisible = false;
              this.$message({message: '新增失败', type: 'error'});
            })
          }
        });
      },
      // 更新
      update() {
        // 表单验证
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            let editForm = JSON.parse(JSON.stringify(this.editForm));
            delete editForm.parent
            delete editForm.factory
            this.editBtnLoading = true;
            this.$post('/action', {
              data: {
                "update": this.tableName,
                "values": editForm,
                "where": ['id=' + editForm.id]
              }
            }, true).then((data) => {
              if (data && data.count === 1) {
                // @特殊处理, 事业部情况, 要同步新增|编辑|删除 若干下属工厂
                /* 剔除事业部特殊处理逻辑 2019.7.4 lzy
                this.editDepartment(this.editForm, editForm.id, () => {
                  this.editBtnLoading = false;
                  this.editDialogVisible = false;
                  this.$message({message: '更新成功', type: 'success'});
                  this.list();
                })*/
                 this.editBtnLoading = false;
                 this.editDialogVisible = false;
                 this.$message({message: '更新成功', type: 'success'});
                 this.list();
              }
            }).catch(err => {
              this.editBtnLoading = false;
              this.editDialogVisible = false;
              this.$message({message: '更新失败', type: 'error'});
            })
          }
        });
      },
      // 获取事业部下属工厂的执行语句
      getFactoryTransaction(editForm, parentId) {
        let transaction = []
        // @特殊处理, 新增若干事业部的下属工厂节点
        let children = editForm.children || []
        let factory = editForm.factory.map(d => this.factoryList.find(f => f.id === d))
        // 查不到, 则为删除
        children.forEach(d => {
          let repeat = factory.find(f => f.id === d.id)
          if (!repeat) {
            transaction.push({
              "delete": this.tableName,
              "where": ['id=' + d.id]
            })
            transaction.push({
              "delete": this.tableName,
              "where": ['parent_id=' + d.id]
            })
          }
        })
        // 查不到, 则为新增
        factory.forEach(d => {
          let repeat = children.find(f => f.id === d.id)
          if (!repeat) {
            transaction.push({
              "insert": this.tableName,
              "values": {
                name: d.name,
                category: d.category,
                description: d.description,
                parent_id: parentId,
                org_code: d.org_code,
              }
            })
          }
        })
        return transaction
      },
      // 新增 | 编辑 | 删除 | 针对事业部
      editDepartment(editForm, parentId, ck) {
        if (editForm.category !== 3 && this.editForm.parent.category !== 3) {
          return ck && ck()
        }
        let transaction = this.getFactoryTransaction(editForm, parentId)
        if (transaction && transaction.length > 0) {
          this.$post('/action', {
            data: {
              "transaction": transaction
            }
          }, true).then((data) => {
            ck && ck()
          }).catch(err => {
            ck && ck()
          })
        } else {
          ck && ck()
        }
      },
      // 更新 | 针对事业部
      updateDepartment() {
        // 表单验证
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            let editForm = JSON.parse(JSON.stringify(this.editForm));
            this.editBtnLoading = true;
            this.$post('/action', {
              data: {
                "update": this.tableName,
                "values": editForm,
                "where": ['id=' + editForm.id]
              }
            }, true).then((data) => {
              if (data && data.count === 1) {
                this.editBtnLoading = false;
                this.editDialogVisible = false;
                this.$message({message: '更新成功', type: 'success'});
                this.list();
              }
            }).catch(err => {
              this.editBtnLoading = false;
              this.editDialogVisible = false;
              this.$message({message: '更新失败', type: 'error'});
            })
          }
        });
      },
      // 表单重置
      resetEditForm() {
        let editForm = this.$refs["editForm"];
        editForm.clearValidate();
        editForm.resetFields();
        // @特殊处理, 针对编辑情况的重置
        this.editForm = {
          parent: {},
          factory: []
        }
      },
      // 删除框
      delConfirm(row, batch) {
      	if(row.children && row.children.length > 0){
      		this.$alert('改节点下包含子节点不能删除！');
      		return;
      	}
        let ids = row ? [row.id] : []
        if (batch) {
          ids = this.multipleSelection.map(v => v.id).join(',');
        }
        this.$confirm('确定删除么?', '删除', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          this.del(ids)
        }).catch(() => {
        });
      },
      // 删除
      del(ids) {
        this.$post('/action', {
          data: {
            "transaction": [
              {
                "delete": this.tableName,
                "where": "id=" + ids
              },
              {
                "delete": this.tableName,
                "where": "parent_id=" + ids
              }
            ]
          }
        }, true).then((data) => {
          if (Array.isArray(data) && data[0].count > 0) {
            this.$message({message: '删除成功', type: 'success'});
            this.list();
          }
        }).catch(err => {
          this.$message({message: '删除失败', type: 'error'});
        });
      },
      // 修改分页数量
      handleSizeChange(val) {
        this.pageSize = val;
        this.list();
      },
      // 切换分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.list();
      },
      // 行首的复选框是否可以被勾选
      handleSelectable(row, index) {
        // @特殊处理 不能删除CFAA
        return row.id !== 1;
      },
      // 勾选选中项, 并批量删除按钮状态
      handleSelectionChange(arr) {
        // 全部选择 this.$refs.multipleTable.data.length === val.length
        // 部分选择
        if (arr.length >= 1) {
          this.delBatchBtnDisabled = false;
        } else {
          this.delBatchBtnDisabled = true;
        }
        this.multipleSelection = arr;
      },
      // 排序
      handleSortChange(column) {
        // console.log(column, prop, order);
        this.order = column.prop && column.order
          ? [column.prop + ' ' + column.order.replace("ending", "")]
          : [];
        this.list();
      },
      // 列表转换成tree
      list2Tree(list, originList) {
        list.forEach(d => {
          let children = originList.filter(f => f.parent_id === d.id)
          if (children && children.length > 0) {
            // children.forEach(f => f.parent = d)   // 补充父亲索引
            d.children = children
            this.list2Tree(children, originList)
          }
        })
      },
      // 查询树节点
      findByTree(id, tree) {
        for (let d of tree) {
          if (d.id === id) {
            return d
          }
          if (d.children) {
            let obj = this.findByTree(id, d.children)
            if (obj) {
              return obj
            }
          }
        }
      },
      // 工厂列表
      getFactoryList(data) {
        this.factoryList = data.filter(f => f.category === 5) // 5 === 工厂
      },
      // 列表
      list() {
        this.$post('/action', {
          data: {
            "select": this.tableName,
            "where": this.where,
            "order": this.order
          }
        }).then((data) => {
          if (data && Array.isArray(data)) {
            //this.getFactoryList(data)
            this.list2Tree(data, data)
            this.tableData = data.filter(f => f.parent_id === 0);
          }
        })
      },
      // 加载
      load() {
        this.list()
      },
    },
    mounted() {
      this.load();
    }
  }
</script>

<style>
  .page-sys_organization_manage {
  }
</style>
