<template>
  <div class="header">
    <slot></slot>
    <!-- logo
    <div class="logo" @click="goHome">
      <img :src="logo" alt="logo">
    </div>
    -->
    <!-- 侧边栏缩放
    <div class="sidebar-control" @click="setExpand" :class="!expand ? 'active': ''">
      <i class="icon iconfont icon-caidan1"></i>
    </div>
    -->
    <!-- 导航
    <div class="nav-container">
      <ul class="clearfix nav">
        <li v-for="(item, index) in nav" class="nav-item" :key="index"
            :data-index="index"
            v-show="permissionNav(item.routerName)"
            @click="activeItem(item.routerName)"
            :class="{active: item.routerName === active}">
          {{item.name}}
        </li>
      </ul>
    </div>
    -->
    <!-- 个人中心 & 设置 -->
    <div class="user">
      <div class="item user-info">
        <el-dropdown trigger="click" class="user-info-dropdown" @command="activeUserDropdown">
          <!-- 当前 -->
          <div class="el-dropdown-link">
            <i class="icon iconfont icon-denglu"></i>
            {{ user.name }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item>用户管理</el-dropdown-item>-->
            <el-dropdown-item command="startEditDialog">个人信息</el-dropdown-item>
            <el-dropdown-item command="startPwdDialog">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="v-line"></div>
      </div>
      <!--<div class="item" title="帮助">-->
      <!--<i class="icon iconfont icon-bangzhu" style="font-size: 22px;"></i>-->
      <!--<div class="v-line"></div>-->
      <!--</div>-->
      <!--<div class="item" title="信息">-->
      <!--<i class="icon iconfont icon-wodezhanghu-" style="font-size: 22px;"></i>-->
      <!--<div class="icon-target">5</div>-->
      <!--<div class="v-line"></div>-->
      <!--</div>-->
      <div class="item" title="退出系统" @click="logout">
        <i class="icon iconfont icon-signOut"></i>
      </div>
    </div>

    <!-- 修改密码dialog -->
    <el-dialog class="update-pwd-dialog" title="修改密码" width="30%"
               :append-to-body="true" :visible.sync="dialogPwdVisible" @close="resetPwdForm()">
      <!-- 表单 -->
      <el-form status-icon :model="pwdForm" ref="pwdForm" :rules="pwdRules">
        <el-form-item label="当前密码" :label-width="pwdFormLabelWidth" prop="oldPassword">
          <el-input v-model="pwdForm.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="pwdFormLabelWidth" prop="newPassword">
          <el-input v-model="pwdForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="pwdFormLabelWidth" prop="newPasswordCheck">
          <el-input v-model="pwdForm.newPasswordCheck" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogPwdVisible = false">取消</el-button>
        <el-button type="primary" @click="updatePwd">保存</el-button>
      </div>
    </el-dialog>

    <!-- 新增 & 编辑 dialog -->
    <el-dialog class="edit-dialog" width="30%" append-to-body @close="resetEditForm()" title="个人信息"
               :visible.sync="editDialogVisible">

      <el-form status-icon label-width="70px"
               :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item class="margin-bottom-clear" label="手机号:" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
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
  import logo from "@/assets/images/logo.png";
  import cryptoUtil from '@/lib/cryptoUtil'
  export default {
    name: "app-header",
    props: ["expand"],
    computed: {
      sidebarShow() {
        // @特殊处理, 如何一个菜单都没有配置, 侧边栏隐藏, 并main也不会显示
        return this.$store.state.sidebarShow
      },
      active() {
        return this.$store.state.navName;
      },
      user() {
        return this.$store.getters.user;
      },
      permission() {
        return this.$store.getters.permission;
      }
    },
    data() {

      // 自定义验证 密码确认
      let validateCheckPassword = (rule, value, callback) => {
        if (value !== this.pwdForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
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
        logo: logo,
//      logo: "",
        username: "",
        // 导航
        nav: [
          {
            // icon: 'icon-mubiao',
            routerName: 'main',
            name: '网站监测平台'
          },
          {
            // icon: 'icon-mubiao',
            routerName: 'real_time_analysis',
            name: '实时监测分析'
          },
          {
            // icon: 'icon-mubiao',
            routerName: 'situation_analysis',
            name: '安全态势分析'
          }
        ],
        // 修改密码
        dialogPwdVisible: false,
        // 表单验证
        pwdRules: {
          oldPassword: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}
          ],
          newPasswordCheck: [
            {required: true, message: '字段不能为空', trigger: 'blur'},
            {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'},
            {validator: validateCheckPassword, trigger: 'blur'}
          ],
        },
        pwdForm: {
          oldPassword: '',
          newPassword: '',
          newPasswordCheck: '',
        },
        pwdFormLabelWidth: '110px',
        // 表名
        tableName: 'sys_user',
        // 新增 & 编辑
        editRow: {},                  // 编辑时当前临时记录
        editDialogVisible: false,     // 编辑弹出框显示状态
        editBtnLoading: false,        // 编辑弹出框的保存按钮的loading
        editDialogType: "",           // 编辑弹出框的当前状态, 是编辑, 还是新增
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
          phone: [
            {pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '手机号码格式不正确', trigger: 'blur'}
          ],
          email: [
            {type: "email", message: '不是邮箱类型', trigger: 'blur'},
            {required: true, message: '字段不能为空', trigger: 'blur'},
          ],
        },
        editForm: {
          id: '',
          name: '',
          email: '',
          phone: '',
          username: '',
          roleId: ''
        },
      };
    },
    methods: {
      // 控制导航栏显示
      permissionNav(routerName) {
        if (routerName === 'main') {
          return this.sidebarShow;
        }
        return this.permission[routerName]
      },
      // logo的监听
      goHome() {
        // this.$router.push("home");
      },
      // 控制侧边栏展示收起
      setExpand() {
        this.$emit("setExpand", !this.expand);
      },
      // nav导航切换路由
      activeItem(routerName) {
        if (routerName !== 'main') {
          this.$router.push({name: routerName});
        }
      },
      activeUserDropdown(command) {
        if (command === 'startPwdDialog') {
          this.dialogPwdVisible = true;
        }else if(command === 'startEditDialog'){
          this.editConfirm('update');
        }
      },
      // 修改密码
      updatePwd() {
        // 表单验证
        this.$refs["pwdForm"].validate((valid) => {
          if (valid) {
            // @特殊处理, 补充密码加密
            let pwdForm = JSON.parse(JSON.stringify(this.pwdForm));
            pwdForm.oldPassword = cryptoUtil.encrypt(pwdForm.oldPassword.trim())
            pwdForm.newPassword = cryptoUtil.encrypt(pwdForm.newPassword.trim())
            pwdForm.newPasswordCheck = cryptoUtil.encrypt(pwdForm.newPasswordCheck.trim())
            // 请求
            this.$put('/password', {
              data: pwdForm
            }).then((data) => {
              if (data === true) {
                this.$message({message: '密码修改成功', type: 'success'});
                this.dialogPwdVisible = false;
              }
            })
          }
        });
      },
      // 表单验证重置
      resetPwdForm: function () {
        let pwdForm = this.$refs["pwdForm"];
        pwdForm.clearValidate();
        pwdForm.resetFields();
      },
      // 新增 & 编辑
      editConfirm(type) {
        this.editDialogVisible = true;
        this.editDialogType = type;
        if (type === 'update') {
          this.detail(this.user.id);
        }
      },
      // 保存事件
      editSave() {
        this[this.editDialogType]();
      },
      // 更新时查询单条
      detail(id) {
        this.$post('/action', {
          data: {
            "select": this.tableName,
            "join": ["sys_user_role", "sys_role"],
            "where": "id=" + id
          }
        }, true).then((arr) => {
          if (Array.isArray(arr) && arr.length === 1) {
            let data = arr[0];
            this.editRow = data;
            for (let k in this.editForm) {
              if (k === 'roleId') {
                this.editForm['roleId'] = data.sys_user_role.sys_role.id || '';
              } else {
                this.editForm[k] = data[k] || '';
              }
            }
          }
        });
      },
      // 更新
      update() {
        // 表单验证
        this.$refs["editForm"].validate((valid) => {
          if (valid) {
            this.editBtnLoading = true;
            this.$put('/user/' + this.editForm.id, {
              data: this.editForm
            }, true).then((data) => {
              if (data && data.count === 1) {
                this.editBtnLoading = false;
                this.editDialogVisible = false;
                this.$message({message: '更新成功', type: 'success'});
              }
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
      },
      // 退出 & 注销
      logout() {
        this.$confirm('是否确认退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(_ => {
          // 请求
          this.$post('/logout').then((data) => {
            if (data === true) {
              this.$localStore.remove("user");
              this.$localStore.remove("permission");
              this.$router.push('/login');
            }
          })
        }).catch(_ => {
        })
      }
    }
  };
</script>

<style>
  .header {
    position: relative;
    height: 100%;
  }

  /* logo */
  .header .logo {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    line-height: 100%;
    text-align: center;
  }

  .header .logo img {
    position: relative;
    height: 60%;
    top: 20%;
  }

  /* 边栏控制 */
  .header .sidebar-control {
    position: absolute;
    left: 210px;
    top: 22px;
    color: #585858;
    cursor: pointer;
  }

  .header .sidebar-control:hover,
  .header .sidebar-control.active {
    color: #3d9df4;
  }

  .header .sidebar-control .icon {
    font-size: 18px;
  }

  /* 导航 */
  .header .nav-container {
    padding-left: 240px;
  }

  .header .nav-container .nav {
  }

  .header .nav-container .nav .nav-item {
    float: left;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 0.9rem;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.1s;
    color: #585858;
  }

  .header .nav-container .nav .nav-item:hover,
  .header .nav-container .nav .nav-item.active {
    border-bottom: 5px solid #20a0ff;
    color: #3d9df4;
  }

  /* 个人中心 设置 */
  .header .user {
    position: absolute;
    top: 0;
    right: 0;
  }

  .header .user .item {
    display: inline-block;
    min-width: 60px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    position: relative;
    color: #585858;
    text-align: center;
  }

  .header .user .item .icon-target {
    position: absolute;
    font-size: 10px;
    background-color: #b60102;
    border-radius: 50%;
    height: 14px;
    padding: 0 4px;
    line-height: 14px;
    top: 16px;
    right: 16px;
    color: #ffffff;
  }

  .header .user .item .icon {
    font-size: 18px;
  }

  .header .user .item.user-info .el-dropdown {
  }

  .header .user .item.user-info .el-dropdown .el-dropdown-link {
    padding: 0 10px;
  }

  .header .user .item.user-info .el-dropdown .el-dropdown-link:hover {
    color: #3d9df4;
  }

  .header .user .v-line {
    position: absolute;
    right: 0;
    height: 40%;
    top: 30%;
    width: 1px;
    background: #ededed;
  }

  .header .user .item:hover {
    color: #3d9df4;
  }

  .update-pwd-dialog .el-dialog__body {
    padding: 30px 20px 20px;
  }

  .update-pwd-dialog .el-dialog__body .el-form-item--small.el-form-item {
    margin-bottom: 18px;
  }
</style>
