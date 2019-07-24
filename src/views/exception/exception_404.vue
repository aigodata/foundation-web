<template>
  <!-- 页面不存在 -->
  <div class="exception_404">
    <div class="ripple">
      <img :src="ripple" width="100%">
    </div>
    <div class="error-box">
      <div class="error-pic">
        <img :src="code" width="434px" height="179px">
      </div>
      <div class="error-text">抱歉您访问的页面不存在
        <span><a href="javascript:void(0)" @click="goBack">返回</a></span></div>
    </div>
  </div>
</template>

<script>
  import ripple from '@/assets/images/error-bg.png';
  import code from '@/assets/images/404.png';

  export default {
    name: 'exception_404',
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
  .exception_404 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(90deg, RGBA(16, 84, 156, 1) 50%, RGBA(29, 95, 166, 1));
  }

  .exception_404 .ripple {
    position: absolute;
    width: 100%;
    bottom: -1px;
    z-index: 1;
  }

  .exception_404 .error-box {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .exception_404 .error-text {
    margin-top: 30px;
    color: #fff;
  }

  .exception_404 .error-text span a {
    color: #fff;
  }
</style>
