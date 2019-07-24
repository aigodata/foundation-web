<template>
  <!-- <%= display %> -->
  <div class="<%= name %>">
    <%= display %>
  </div>
</template>

<script>
  export default {
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

