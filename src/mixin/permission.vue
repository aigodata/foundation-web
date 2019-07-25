<script>
  export default {
    name: 'permission',
    computed: {
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 权限控制
       *    格式说明: module.rule1.rule2
       *    rule类型:
       *      select  查询
       *      insert  添加
       *      update  修改
       *      delete  删除
       *      import  导入
       *      export  导出
       *    示例:
       *      v-if="permission('模块名.update')"          // 模块是否有更新权限
       *      v-if="permission('模块名.update.delete')"   // 模块是否有更新或者删除权限
       *
       * @param rule 配置
       * @returns {boolean} 是否有权限
       */
      permission(rule) {
        if (!this.$config.permission) {
          return true
        }
        let [module, ...action] = rule.split('.');
        // 具备模块的权限, 并具备模块的动作权限
        let per = this.$store.getters.permission[module];
        if (per && action.some(v => per[v]) ) {
          return true;
        }
      }
    },
    mounted() {}
  }
</script>


