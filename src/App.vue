<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
    computed: {},
    data() {
      return {}
    },
    methods: {},
    mounted() {
      document.title = this.$config.title
    }
  }
</script>
