<template>
  <!-- 页面1_1 -->
  <div class="page1_1">
    页面1_1
  </div>
</template>

<script>
  import basic from '@/mixin/basic.vue'
  import permission from '@/mixin/permission.vue'
  export default {
    mixins: [basic, permission],
    name: 'page1_1',
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
  .page1_1 {
    height: 100%;
    position: relative;
  }
</style>

