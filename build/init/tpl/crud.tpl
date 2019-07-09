<template>
  <!-- ${name} -->
  <div class="${key}">
    ${name}
  </div>
</template>

<script>
  export default {
    name: '${key}',
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
  ${key} {
    height: 100%;
    position: relative;
  }
</style>

