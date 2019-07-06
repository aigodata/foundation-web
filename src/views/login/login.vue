<template>
  <div class="app-login" v-cloak>
    <!--logo-->
    <img src="../../assets/images/logo.png" class="app-login-logo">
    <div class="app-login-box">
      <!--name-->
      <div class="header">
        <img src="../../assets/images/login-logo.png" width="188">
      </div>
      <!--login-form-->
      <el-form ref="loginForm" :model="loginForm" label-width="0px">
        <el-form-item label="">
          <el-input v-model="loginForm.username" placeholder="输入用户名" clearable @keyup.enter.native="submit" autofocus="true">
            <i slot="prefix" class="icon iconfont icon-denglu"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="loginForm.password" placeholder="输入密码" clearable show-password type="password" @keyup.enter.native="submit">
            <i slot="prefix" class="icon iconfont icon-mima"></i>
          </el-input>
        </el-form-item>
        <!--verification-->
        <div class="verification">
          <el-form-item label="" class="verification-input">
            <el-input v-model="loginForm.captcha" clearable placeholder="请输入验证码"
                      type="text" @keyup.enter.native="submit"></el-input>
          </el-form-item>
          <!--verificationcode-->
          <div class="verification-code" @click="changeCaptcha">
            <img :src="captchaURL" @load="loadImg">
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" class="app-loginin-btn" :loading="loading" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="rememberPassword">
        <!--<el-checkbox v-model="rememberPassword">记住密码</el-checkbox>-->
        <!--<a href="#" class="forget-password">忘记密码？</a>-->
      </div>

      <div class="warning" v-show="messageVisible">
        {{message}}。请重试。如果总是不能登录，请<!--点击“忘记密码”或-->联系管理员。
      </div>
    </div>
  </div>
</template>

<script>
  import cryptoUtil from '@/lib/cryptoUtil'
  export default {
    name: "app",
    data() {
      return {
        loading: false,
        //登陆表单
        loginForm: {
          username: "",
          password: "",
          captcha: ""
        },
        captchaURL: '/api/captcha?identify=' + Date.now(),
        repeatChangeCaptcha: false,
        //记住密码
        rememberPassword: false,
        //账号密码输入错误提示
        messageVisible: false,
        message: "您的用户名和密码错误"
      };
    },
    methods: {
      submit() {
        // @特殊处理, 补充密码加密
        let loginForm = JSON.stringify(this.loginForm);
        loginForm = cryptoUtil.encrypt(loginForm)
        this.$post("/login", {
          data: {
            "params": loginForm
          }
        }).then(data => {
          // @特殊处理, 如果发生错误, 刷新验证码
          if (data.code !== 200) {
            this.changeCaptcha()
          }
          if (data.code === 500) {
            data.message && (this.message = data.message);
            this.messageVisible = true;
          } else {

            this.$store.commit("user", data);

            // 取得权限
            this.$post("/action", {
              data: {
                "select": "sys_role",
                "join": ["sys_permission_ship", "sys_permission"],
                "where": "id=" + data.roleId,
              }
            }).then(per => {
              if (Array.isArray(per) && per.length > 0) {
                this.$store.commit("permission", per[0].sys_permission_ship);

                // @特殊处理 session失效被阻止到登录页面, 需要返回最后的访问页面
                let before403Path = this.localStore.get("before_403_path");
                if (before403Path) {
                  this.$router.push(before403Path);
                  this.localStore.remove("before_403_path");
                } else {
                  this.$router.push('/main');
                }

              }
            });
          }
        });
      },
      changeCaptcha() {
        // console.log(this.repeatChangeCaptcha);
        if (!this.repeatChangeCaptcha) {
          this.repeatChangeCaptcha = true;
          this.captchaURL = this.captchaURL.split("?")[0] + '?identify=' + Date.now()
        }
      },
      loadImg() {
        this.repeatChangeCaptcha = false;
      }
    },
    mounted() {
      // console.log(cryptoUtil.encrypt('123'), cryptoUtil.decrypt(cryptoUtil.encrypt('123')))
//      let loginForm = {
//        username: "admin",
//        password: "aigo@2019",
//        captcha: "6260"
//      }
//      console.log()
    }
  };
</script>

<style>
  .app-login {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/images/login-bg.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .app-login .app-login-logo {
    width: 150px;
    /*height: 78px;*/
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .app-login .app-login-box {
    width: 440px;
    padding: 50px 60px;
    background-color: #f5f6f8;
    position: relative;
    top: 30%;
    transform: translateY(-10%);
    border-radius: 6px;
    margin: 0 auto;
  }

  .app-login .app-login-box .header {
    font-size: 24px;
    text-align: center;
    margin-bottom: 40px;
    color: #1b5b9e;
  }

  .app-login .app-login-box .verification {
    width: 100%;
    position: relative;
  }

  .app-login .app-login-box .verification .verification-input {
    width: 50%;
  }

  .app-login .app-login-box .verification .verification-input .el-input__inner {
    padding-left: 15px;
  }

  .app-login .app-login-box .verification .verification-code {
    width: 47%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    cursor: pointer;
  }

  .app-login .app-login-box .verification .verification-code img {
    width: 146px;
    height: 38px;
  }

  .app-login .app-login-box .el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
    color: #a4a4a4;
    font-size: 14px;
    padding-left: 40px;
  }

  .app-login .app-login-box .icon {
    font-size: 20px;
    line-height: 40px;
    color: #a3a3a3;
    margin-left: 2px;
    padding-right: 5px;
    border-right: 1px solid #e8e8e8;
  }

  .app-login .app-login-box .el-form-item--mini.el-form-item,
  .app-login .app-login-box .el-form-item--small.el-form-item {
    margin-bottom: 15px;
  }

  .app-login .app-login-box .app-loginin-btn {
    width: 100%;
    height: 42px;
    font-size: 14px;
    background-color: #1d4559;
    margin: 11px 0px;
    border: none;
  }

  .app-login .app-login-box .rememberPassword {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .app-login .app-login-box .rememberPassword .forget-password {
    text-decoration: none;
    color: #3d9df4;
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .app-login .app-login-box .warning {
    font-size: 12px;
    color: #ee1515;
    text-align: justify;
    line-height: 20px;
  }

  .app-login .app-login-box .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
