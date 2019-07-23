<template>
  <div id="page-500">
    <div class="ripple">
      <img :src="ripple" width="100%">
    </div>
    <div class="error-box">
      <div class="error-pic">
        <img :src="code" width="434px" height="179px">
      </div>
      <div class="error-text">服务器错误！
        <span><a href="javascript:void(0)" @click="goBack">返回</a></span></div>
    </div>
  </div>
</template>

<script>
  import ripple from '@/assets/images/error-bg.png';
  import code from '@/assets/images/500.png';

  export default {
    name: 'page-500',
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
  #page-500 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(90deg, RGBA(16, 84, 156, 1) 50%, RGBA(29, 95, 166, 1));
  }

  #page-500 .ripple {
    position: absolute;
    width: 100%;
    bottom: -1px;
    z-index: 1;
  }

  #page-500 .error-box {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  #page-500 .error-text {
    margin-top: 30px;
    color: #fff;
  }

  #page-500 .error-text span a {
    color: #fff;
  }
</style>
