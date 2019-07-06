<template>
  <div class="demo">
    <el-menu mode="horizontal">
      <el-menu-item index="1-1" @click="go('demo.filter')">filter
      </el-menu-item>
      <el-menu-item index="1-2" @click="go('demo.request')">request
      </el-menu-item>
      <el-menu-item index="1-3" @click="go('demo.chart')">chart
      </el-menu-item>
      <el-menu-item index="1-4" @click="go('demo.dialog')">dialog
      </el-menu-item>
    </el-menu>
    <div class="demo-container">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'demo',
    methods: {
      go(routeName) {
        this.$router.push({ name: routeName })
      }
    }
  }
</script>
<style>
  .demo {
    padding: 12px;
  }
  .demo-container {
    margin-top: 20px;
  }
</style>
