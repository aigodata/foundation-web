<template>
  <!-- 页面1_2_2_2 -->
  <div class="page1_2_2_2">
    页面1_2_2_2
  </div>
</template>

<script>
  import basic from '@/mixin/basic.vue'
  import permission from '@/mixin/permission.vue'
  export default {
    mixins: [basic, permission],
    name: 'page1_2_2_2',
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
  .page1_2_2_2 {
    height: 100%;
    position: relative;
  }
</style>

