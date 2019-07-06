<template>
  <div class="page-dashboard">
    仪表盘
  </div>
</template>

<script>
  import basic from '@/mixin/basic';
  import permission from '@/mixin/permission';
  export default {
    mixins: [basic, permission],
    name: "dashboard",
    data() {
      return {}
    },
    methods: {
      load() {}
    },
    mounted() {
      this.load();
    }
  }
</script>

<style>
  .page-dashboard {
    width: 100%;
  }
</style>
