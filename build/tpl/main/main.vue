<template>
  <div id="app" v-cloak>
    <div class="app-sidebar" :style="{width: space}" v-show="sidebarShow">
      <app-sidebar :expand="expand"></app-sidebar>
    </div>
    <div class="app-container" :style="{paddingLeft: space}">
      <div class="app-header">
        <app-header @setExpand="setExpand" :expand="expand">
          <!--面包屑 -->
          <app-breadcrumb></app-breadcrumb>
        </app-header>
      </div>
      <div class="app-content">
        <!-- 页面 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      sidebarShow() {
        return this.$store.state.sidebarShow
      },
      user() {
        return this.$store.getters.user;
      },
      space() {
        if (!this.sidebarShow) {
          return 0;
        }
        return this.expand ? '220px' : '50px'
      },
      permission() {
        return this.$store.getters.permission
      }
    },
    data() {
      return {
        expand: true,
      }
    },
    methods: {
      setExpand(expand) {
        this.expand = expand;
      }
    },
    mounted() {
      if (this.$config.permission) {
        // @特殊处理, 如果没有用户登录信息, 跳转到登录页面
        if (!this.user.name) {
          this.$router.push({name: 'login'})
        }
      }
      // @特殊处理, 如何一个菜单都没有配置, 侧边栏隐藏, 并main也不会显示
      if (this.$route.name === 'main') {
        if (this.sidebarShow) {
          this.$router.push({name: 'dashboard'})
        } else {
          this.$router.push({name: Object.keys(this.permission)[0]})
        }
      }
    }
  }
</script>

<style>
  #app {
    /* 对字体进行抗锯齿渲染 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    position: relative;
  }

  #app .app-header {
    position: relative;
    width: 100%;
    height: 60px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    z-index: 3;
  }

  #app .app-container {
    height: calc(100%);
    position: relative;
    padding-left: 220px;
  }

  #app .app-sidebar {
    width: 220px;
    background: #10465a;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    transition: all 0.15s ease;
  }

  #app .app-content {
    position: relative;
    height: calc(100% - 60px);
    background: #f8fafc;
    z-index: 1;
    padding: 15px;
    overflow: auto;
    transition: all 0.15s ease;
  }
</style>

