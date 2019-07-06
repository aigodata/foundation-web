<script>
  import moment from 'moment'
  export default {
    name: 'mixin-basic',
    computed: {},
    data() {
      return {
        mixin_dict: {
          sys_org__category: {
            1: 'CFAA',
            2: '分子公司',
            3: '事业部',
            4: '部门',
            5: '工厂'
          }
        },
        // 同步时间 - 限定时间范围
        pickerOptions: {
          disabledDate(time) {
            return moment(moment(time).format('YYYY-MM-DD')).isAfter(moment(Date.now()).format('YYYY-MM-DD'))
            // return time.getTime() > Date.now();
          },
        },
      }
    },
    methods: {
      // 清除
      __clear() {
        this.localStore.remove("user");
        this.localStore.remove("permission");
        this.$router.push('/login');
      },
      // 判断session是否过期
      __checkSession() {
        let page = this.$el
        page.style.display = 'none'
        const loading = this.$loading({
          lock: true,
          target: '.app-content',
          text: '加载中',
          fullscreen: false,
          customClass: 'page-loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0)'
        });
        this.$post('/session/check').then(data => {
          loading.close()
          page.style.display = 'block'
        }).catch(err => {
          loading.close()
          this.__clear()
        })
      }
    },
    mounted() {
       this.__checkSession()
    }
  }
</script>
