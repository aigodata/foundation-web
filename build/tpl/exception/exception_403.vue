<template>
  <!-- <%= display %> -->
  <div class="<%= name %>">
    <div class="ripple">
      <img :src="ripple" width="100%">
    </div>
    <div class="error-box">
      <div class="error-pic">
        <img :src="code" width="434px" height="179px">
      </div>
      <div class="error-text">没有权限访问，资源不可用！
        <span><a href="javascript:void(0)" @click="goBack">返回</a></span></div>
    </div>
  </div>
</template>

<script>
  import ripple from '@/assets/images/error-bg.png';
  import code from '@/assets/images/403.png';

  export default {
    name: '<%= name %>',
    data() {
      return {
        ripple: ripple,
        code: code,
      }
    },
    methods: {
      goBack: function() {
        this.$router.push({path: '/login'});
      }
    }
  }
</script>


<style>
  .<%= name %> {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(90deg, RGBA(16, 84, 156, 1) 50%, RGBA(29, 95, 166, 1));
  }

  .<%= name %> .ripple {
    position: absolute;
    width: 100%;
    bottom: -1px;
    z-index: 1;
  }

  .<%= name %> .error-box {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .<%= name %> .error-text {
    margin-top: 30px;
    color: #fff;
  }

  .<%= name %> .error-text span a {
    color: #fff;
  }
</style>
