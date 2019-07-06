<template>
  <div class="breadcrumb">
    <ul class="breadcrumb-list clearfix">
      <!-- 当前位置 -->
      <li class="breadcrumb-current-position">
        <i class="el-icon-location-outline"></i>当前位置 :
      </li>
      <!-- 路由 -->
      <li v-for="(item, index) in list" class="breadcrumb-item">
        <!--<router-link-->
        <!--:to="item.path">-->
        <!--<span>{{item.meta.name}}</span>-->
        <!--<i v-show="index !== list.length - 1" class="el-icon-arrow-right"></i>-->
        <!--</router-link>-->
        <div
          v-if="index !== list.length - 1"
          class="router-link-active"
          > <!-- @click="change(item)" -->
          <span>{{item.meta.name}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
        <div v-else class="last-text">
          {{item.meta.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'breadcrumb',
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'load'
    },
    data() {
      return {
        list: []
      }
    },
    methods: {
      load() {
        this.list = []; // 清空
        let matched = this.$router.currentRoute.matched;
        // console.log(matched);
        for (let item of matched) {
          if (item.name !== "main") {
            this.list.push(item)
          }
        }
      },
      change(item) {
        this.$router.push(item.path)
      }
    },
    mounted() {
      this.load();
    },
  }
</script>

<style>

  .breadcrumb {
    position: relative;
  }

  .breadcrumb .breadcrumb-list {
    margin-left: 20px;
    line-height: 60px;
  }

  .breadcrumb .breadcrumb-current-position {
    float: left;
    font-size: 14px;
    color: #2e3b4a;
  }

  .breadcrumb .breadcrumb-current-position i {
    font-size: 14px;
    padding-right: 3px;
  }

  .breadcrumb .breadcrumb-list .breadcrumb-item {
    float: left;
    color: #2e3b4a;
    font-size: 14px;
  }

  .breadcrumb .breadcrumb-list .breadcrumb-item .router-link-active {
    margin: 0;
    display: block;
    text-decoration: none;
    /*cursor: pointer;*/
  }

  /*.breadcrumb .breadcrumb-list .breadcrumb-item .router-link-active:hover span {*/
    /*color: #3d9df4;*/
  /*}*/

  .breadcrumb .breadcrumb-list .breadcrumb-item span {
    margin-left: 10px;
    margin-right: 10px;
  }

  .breadcrumb .breadcrumb-list .breadcrumb-item i {
    color: darkgrey;
  }

  .breadcrumb .breadcrumb-list .breadcrumb-item .last-text {
    margin-left: 10px;
  }
</style>
