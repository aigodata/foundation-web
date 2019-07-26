<template>
  <!-- <%= display %> -->
  <div class="<%= name %>">
    <%= display %>
  </div>
</template>

<script>
  import basic from '@/mixin/basic.vue'
  import permission from '@/mixin/permission.vue'
  export default {
    mixins: [basic, permission],
    name: '<%= name %>',
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
  .<%= name %> {
    height: 100%;
    position: relative;
  }
</style>

