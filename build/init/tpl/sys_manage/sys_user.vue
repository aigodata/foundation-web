<template>
  <!-- 用户管理 -->
  <div class="page-sys_user">
    <!-- 新增 & 批量删除 -->
    <div class="app-page-box" v-permission="'sys_user.add.delete'">
      <div class="app-page-box-content clearfix">
        <el-button type="success" @click="editConfirm('insert')" v-permission="'sys_user.add'">新增</el-button>
        <el-button type="danger" :disabled="delBatchBtnDisabled"
                   @click="delConfirm('batch')" v-permission="'sys_user.delete'">批量删除</el-button>
      </div>
    </div>
    <!-- 列表 -->
    <div class="app-page-box">
      <!-- 表格 -->
      <el-table
        stripe
        border
        tooltip-effect="dark"
        ref="tableData"
        v-loading="loading"
        :data="tableData"
        @sort-change="handleSortChange"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" :selectable="handleSelectable" width="36">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="120px" sortable="custom">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120px" sortable="custom">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120px" sortable="custom">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <!--<el-table-column prop="email" label="岗位" sortable="custom">-->
          <!--<template slot-scope="scope">{{ scope.row.email }}</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="is_department_manager" label="部门负责人" width="120" align="center" sortable="custom">
          <template slot-scope="scope">{{ scope.row.is_department_manager ? '是' : '否' }}</template>
        </el-table-column>
        <el-table-column prop="sys_org.name" label="所属部门" width="240px" sortable="custom" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.sys_org.name }}</template>
        </el-table-column>
        <el-table-column prop="sys_user_role.sys_role.name" label="角色" width="120px" align="center" sortable="custom">
          <template slot-scope="scope">{{ scope.row.sys_user_role.sys_role.name }}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120px" sortable="custom">
          <template slot-scope="scope">
            <!-- @特殊处理 自己不能修改自己 -->
            <el-select size="mini" :disabled="user.id === scope.row.id"
              v-model="scope.row.status" @change="changeStatus(scope.row)">
              <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150px" sortable="custom">
          <template slot-scope="scope">{{ scope.row.create_time | datetime }}</template>
        </el-table-column>
        <el-table-column label="操作" align="left" fixed="right" width="100px" v-if="permissionsLock('sys_user.update.delete')">
          <template slot-scope="scope">
            <el-button type="text" @click="editConfirm('update', scope.row)" v-permission="'sys_user.update'">修改</el-button>
            <!-- <div class="operation-line"></div> -->
            <el-button @click="delConfirm(scope.row)" v-permission="'sys_user.delete'"
                       v-show="user.id !== scope.row.id" type="text" class="text-color-red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="app-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="total"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>

    <!-- 新增 & 编辑 dialog -->
    <el-dialog class="edit-dialog page-sys_user-edit-dialog" width="750px" append-to-body @close="resetEditForm()" :title="editDialogDisplayTitle"
               :visible.sync="editDialogVisible">

      <el-form status-icon label-width="85px"
               :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="editForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="editForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="editForm.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPassword">
          <el-input type="password" v-model="editForm.checkPassword" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="editForm.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="editForm.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色:" prop="roleId">
          <el-select v-model="editForm.roleId" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门负责人:" prop="isDepartmentManager">
          <el-checkbox v-model="editForm.isDepartmentManager" :true-label="1" :false-label="0"></el-checkbox>
        </el-form-item>
        <el-form-item class="margin-bottom-clear"  label="所属部门:" prop="orgId">
          <el-tree
            ref="organizationTree"
            :data="organizationTree"
            :props="treeDefaultProps"
            node-key="id"
            show-checkbox
            @check="handleTreeNodeCheck"
            :expand-on-click-node="false"
            :check-on-click-node="false"
            :default-expand-all="true"></el-tree>
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
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox.vue";
  export default {
    components: {ElCheckbox},
    mixins: [basic, permission],
    name: 'sys_user',
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    data() {

      // 自定义验证 组织机构
      let validateCheckOrgId = (rule, value, callback) => {
        let orgId = this.editForm.orgId;
        console.log(this.editForm.orgId)
        if (!orgId) {
          callback(new Error('字段不能为空'));
        } else {
          callback();
        }
      };

      // 自定义验证 密码确认
      let validateCheckPassword = (rule, value, callback) => {
        let password = this.editForm.password;
        if (value !== password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

      // 自定义验证 是否重名
      let validateRename = (rule, value, callback) => {
        let display = {username: '用户名', name: '姓名'};
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
        // 组织机构树
        treeDefaultProps: {
          children: 'children',
          label: 'name'
        },
        organizationTree: [],
        organizationList: [],
        // 表名
        tableName: 'sys_user',
        // 新增 & 编辑
        editRow: {},                  // 编辑时当前临时记录
        editDialogVisible: false,     // 编辑弹出框显示状态
        editBtnLoading: false,        // 编辑弹出框的保存按钮的loading
        editDialogType: "",           // 编辑弹出框的当前状态, 是编辑, 还是新增
        editDialogDisplayTitle: "",   // 编辑弹出框的标题
        editDialogDisplay: {          // 编辑弹出框的标题映射
          "insert": "新增",
          "update": "编辑"
        },
        //表单验证
        editFormRules: {
          username: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {validator: validateRename, trigger: 'blur'},
            {pattern: /^[a-zA-Z]{1}\w*$/, message: '以英文字母开头，只能填写英文字母、数字、下划线', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {validator: validateRename, trigger: 'blur'},
          ],
          password: [
            {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}
          ],
          checkPassword: [
            {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'},
            {validator: validateCheckPassword, trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '手机号码格式不正确', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {type: "email", message: '不是邮箱类型', trigger: 'blur'},
          ],
          roleId: [
            {required: true, message: '字段不能为空', trigger: 'change'},
          ],
          orgId: [
             {required: true, validator: validateCheckOrgId, message: '字段不能为空', trigger: 'change'},
            // {validator: validateCheckOrgId, trigger: 'change'}
          ]
        },
        editForm: {
          id: '',
          name: '',
          email: '',
          phone: '',
          username: '',
          password: '',
          checkPassword: '',
          roleId: '',
          orgId: 0,
          companyId: 0,
          isDepartmentManager: 0,
        },
        statusList: [                   // 用户状态
          {value: 1, label: "正常"},
          {value: 2, label: "锁定"},
        ],
        roleList: [],                   // 角色列表 下拉框
        // 删除
        delBatchBtnDisabled: true,      // 批量删除按钮的禁用状态
        // 列表相关
        where: [],
        order: ["create_time asc"],
        loading: true,
        tableData: [],
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200],
        currentPage: 1,
        multipleSelection: []
      }
    },
    methods: {
      // 树节点选中状态发生变化时的回调
      handleTreeNodeCheck(data, check) {
        if (check.checkedKeys.length === 0) {
          this.editForm.orgId = undefined
          this.setTreeSelectedKey({org_id: undefined})
        } else {
          this.editForm.orgId = data.id
          this.setTreeSelectedKey({org_id: data.id})
        }
      },
      // 选择树节点
      setTreeSelectedKey(row) {
        this.$nextTick(() => {
          this.$refs['organizationTree'].setCheckedKeys(row.org_id ? [row.org_id] : []);
        })
      },
      // 列表转换成tree
      list2Tree(list, originList) {
        list.forEach(d => {
          // @特殊处理, 只有部门和工厂才能选中
          (d.category !== 4 && d.category !== 5) && (d.disabled = true)
          let children = originList.filter(f => f.parent_id === d.id)
          if (children && children.length > 0) {
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
      // 列表
      getOrganizationList() {
        this.$post('/action', {
          data: {
            "select": "sys_org"
          }
        }).then((data) => {
          if (data && Array.isArray(data)) {
            this.organizationList = JSON.parse(JSON.stringify(data))
            this.list2Tree(data, data)
            this.organizationTree = data.filter(f => f.parent_id === 0)
          }
        })
      },
      // 新增 & 编辑
      editConfirm(type, row) {
        this.editDialogVisible = true;
        this.editDialogType = type;
        this.editDialogDisplayTitle = this.editDialogDisplay[type];
        if (type === 'update') {
          this.setTreeSelectedKey(row)
          this.detail(row);
        }
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
            // @特殊处理, 补充密码加密
            let editForm = JSON.parse(JSON.stringify(this.editForm));
            editForm.password = cryptoUtil.encrypt(editForm.password.trim())
            editForm.checkPassword = cryptoUtil.encrypt(editForm.checkPassword.trim())

            this.editBtnLoading = true;
            this.$post('/user', {
              data: editForm
            }, true).then((data) => {
              if (data) {
                this.editBtnLoading = false;
                this.editDialogVisible = false;
                this.$message({message: '新增成功', type: 'success'});
                this.list();
              }
            }).catch(err => {
              this.editBtnLoading = false;
              this.$message({message: '新增失败', type: 'error'});
            })
          }
        });
      },
      // 更新时查询单条
      detail(row) {
        this.editRow = row;
        for (let k in this.editForm) {
          if (k === 'roleId') {
            this.editForm['roleId'] = row.sys_user_role.sys_role.id || '';
          } else if (k === 'password' || k === 'checkPassword') {
            this.editForm[k] = '';
          } else if (k === 'isDepartmentManager') {
            this.editForm[k] = (row['is_department_manager'] ? 1 : 0)
          } else if (k === 'companyId') {
            this.editForm[k] = row['company_id'] || '';
          } else if (k === 'orgId') {
            this.editForm[k] = row['org_id'] || '';
          } else {
            this.editForm[k] = row[k] || '';
          }
        }
      },
      // 更新
      update() {
        // 表单验证
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            // @特殊处理, 补充密码加密
            let editForm = JSON.parse(JSON.stringify(this.editForm));
            editForm.password = cryptoUtil.encrypt(editForm.password.trim())
            editForm.checkPassword = cryptoUtil.encrypt(editForm.checkPassword.trim())

            this.editBtnLoading = true;
            this.$put('/user/' + editForm.id, {
              data: editForm
            }, true).then((data) => {
              if (data && data.count === 1) {
                this.editBtnLoading = false;
                this.editDialogVisible = false;
                this.$message({message: '更新成功', type: 'success'});
                this.list();
              }
            }).catch(err => {
              this.editBtnLoading = false;
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
        for (let k in this.editForm) {
          this.editForm[k] = '';
        }
        this.$refs['organizationTree'].setCheckedKeys([]);
      },
      // 删除框
      delConfirm(row) {
        let ids = [row.id]
        // 区分批量删除, 单条删除
        if (row === 'batch') {
          ids = this.multipleSelection.map(v => v.id).join(',');
        }
        this.$confirm('是否确定删除?', '删除', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          this.del(ids)
        }).catch(() => {});
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
                "delete": "sys_user_role",
                "where": "user_id=" + ids
              }
            ]
          }
        }, true).then((data) => {
          if (Array.isArray(data) && data[0].count > 0 && data[1].count > 0) {
            this.$message({message: '删除成功', type: 'success'});
            this.list();
          }
        }).catch(err => {
          this.$message({message: '删除失败', type: 'error'});
        });
      },
      // 修改用户状态
      changeStatus(row) {
        let value = {
          "status": row.status
        }
        row.status === 1 && (value["login_error_count"] = 0)
        this.$post('/action', {
          data: {
            "update": this.tableName,
            "where": 'id=' + row.id,
            "values": value
          }
        }, true).then((data) => {
          if (data && data.count === 1) {
            this.$message({message: '状态修改成功', type: 'success'});
          }
        }).catch(err => {
          this.$message({message: '状态修改失败', type: 'error'});
        })
      },
      // 获取角色列表
      getRoleList() {
        this.$post('/action', {
          data: {
            "select": "sys_role",
            "fields": ["name label", "id value"]
          }
        }, true).then((data) => {
          this.roleList = data;
        })
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
        // @特殊处理 自己不能删除自己
        return row.id !== this.user.id;
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
      // 列表
      list() {
        this.$post('/action', {
          data: {
            "select": this.tableName,
            "join": ["sys_org", "sys_user_role", "sys_role"],
            "limit": [(this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize],
            "where": this.where,
            "order": this.order
          }
        }).then((data) => {
          if (data && Array.isArray(data.data)) {
            this.total = data.total;
            this.tableData = data.data;
          }
        })
      },
      // 加载
      load() {
        this.getOrganizationList()
        this.getRoleList();
        this.list();
      },
    },
    mounted() {
      this.load();
    }
  }
</script>

<style>
  .page-sys_user {

  }
  .page-sys_user-edit-dialog .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    /*background-color: #12465a;*/
    /*color: #fff;*/
  }
</style>
