<template>
  <!-- 仪表盘 -->
  <div class="dashboard">
    仪表盘
  </div>
</template>

<script>
  import basic from '@/mixin/basic.vue'
  import permission from '@/mixin/permission.vue'
  export default {
    mixins: [basic, permission],
    name: 'dashboard',
    computed: {
    },
    data() {
      return {
      }
    },
    methods: {
      load() {
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style>
  .dashboard {
    height: 100%;
    position: relative;
  }
</style>

