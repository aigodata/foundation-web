<template>
  <div>
    <el-button @click="get()">get</el-button>
    <el-button @click="all()">all</el-button>
    <pre>{{data}}
    </pre> {{loading?'loading...':''}}
  </div>
</template>
<script>
  export default {
    name: 'demo-request',
    data() {
      return {
        data: undefined,
        loading: false
      }
    },
    methods: {

      get() {
        this.$get('/overview').then(d => {
          this.data = d;
        });
      },
      all() {
        this.$all(['/overview']).then(d => {
          this.data = d;
        });
      }
    }
  }
</script>
