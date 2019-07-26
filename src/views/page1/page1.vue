<template>
  <!-- 页面1 -->
  <div class="page1">
    页面1
  </div>
</template>

<script>
  import basic from '@/mixin/basic.vue'
  import permission from '@/mixin/permission.vue'
  export default {
    mixins: [basic, permission],
    name: 'page1',
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
  .page1 {
    height: 100%;
    position: relative;
  }
</style>

