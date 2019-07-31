<script>
  // 跳转路由, 为了解决路由重复点击的强制刷新问题
  export default {
    mounted() {
      window.history.go(-1);
    }
  }
</script>
