<template>
  <!-- 用户登录日志查询 -->
  <div class="page-sys_log_login">
    <div class="app-page-container">
      <!-- 查询条件 -->
      <div class="app-page-box">
        <div class="app-page-box-header">
          查询条件
        </div>
        <div class="app-page-box-content clearfix">
          <el-form :inline="true" :model="searchForm">
            <el-form-item label="分子公司">
              <el-select v-model="searchForm.company_id" clearable placeholder="请选择">
                <el-option
                  v-for="item in constituentCompanyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker
                clearable
                :picker-options="pickerOptions"
                v-model="searchForm.login_time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00','23:59:59']"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 列表 -->
      <div class="app-page-box">
        <el-table
          stripe
          border
          tooltip-effect="dark"
          ref="tableData"
          v-loading="loading"
          :data="tableData"
          @sort-change="handleSortChange">
          <el-table-column prop="ip" label="用户IP" width="140px" fixed="left" sortable="custom">
            <template slot-scope="scope">{{ scope.row.ip }}</template>
          </el-table-column>
          <el-table-column prop="sys_user.username" label="用户名" width="120px" sortable="custom">
            <template slot-scope="scope">{{ scope.row.sys_user.username }}</template>
          </el-table-column>
          <el-table-column prop="sys_user.name" label="姓名" width="120px" sortable="custom">
            <template slot-scope="scope">{{ scope.row.sys_user.name }}</template>
          </el-table-column>
          <el-table-column prop="company_id" label="分子公司" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ formatCompanyName(scope.row.company_id) }}
            </template>
          </el-table-column>
          <el-table-column prop="login_time" label="登录时间" width="150px" sortable="custom">
            <template slot-scope="scope">{{ scope.row.login_time | datetime }}</template>
          </el-table-column>
          <el-table-column prop="duration" label="执行时长(秒)" align="center" width="120px" sortable="custom">
            <template slot-scope="scope">{{ Math.ceil(scope.row.duration / 1000) }}</template>
          </el-table-column>
          <el-table-column prop="request_uri" label="请求URL" sortable="custom">
            <template slot-scope="scope">{{ scope.row.request_uri }}</template>
          </el-table-column>
          <el-table-column prop="request_method" label="请求方式" width="100px" sortable="custom">
            <template slot-scope="scope">{{ scope.row.request_method ? 'POST' : 'GET' }}</template>
          </el-table-column>
          <el-table-column prop="exception" label="异常信息" sortable="custom" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.exception }}</template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="app-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="total"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import basic from '@/mixin/basic';
  import permission from '@/mixin/permission';
  export default {
    mixins: [basic, permission],
    name: 'sys_log_login',
    data() {
      return {
        // 分子公司列表
        constituentCompanyList: [],
        // 查询
        searchForm: {},
        // 列表相关
        tableName: 'log_user_login',
        where: [],
        order: ["login_time desc"],
        loading: false,
        tableData: [],
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 100, 200],
        currentPage: 1
      }
    },
    methods: {
      // 查询
      search() {
        this.currentPage = 1
        this.where = []
        if (this.searchForm.company_id) {
          this.where.push(`company_id=${this.searchForm.company_id}`)
        }
        let date = this.searchForm.login_time
        if (date && date.length > 0) {
          this.where.push(`login_time=${date[0]}~${date[1]}`)
        }
        this.list();
      },
      // 修改分页数量
      handleSizeChange(val) {
        this.pageSize = val;
        this.list();
      },
      // 切换分页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.list();
      },
      // 排序
      handleSortChange(column) {
        // console.log(column, prop, order);
        this.order = column.prop && column.order
          ? [column.prop + ' ' + column.order.replace("ending", "")]
          : [];
        this.list();
      },
      // 查询分子公司
      getConstituentCompanyList() {
        this.$post('/action', {
          data: {
            "select": "sys_org",
            "fields": ["id value", "name label"],
            "where": ['category=2']   // 2 = 分子公司, 参考mixin basic dict
          }
        }).then((data) => {
          if (data && Array.isArray(data)) {
            this.constituentCompanyList = data;
          }
        })
      },
      // 格式化分子公司名称
      formatCompanyName(company_id) {
        let company = this.constituentCompanyList
        if (company && company.length > 0) {
          let item = company.find(f => f.value === company_id)
          return item ? item.label : '-'
        }
      },
      // 列表
      list() {
        this.$post('/action', {
          data: {
            "select": this.tableName,
            "join": ['sys_user'],
            "limit": [(this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize],
            "where": this.where,
            "order": this.order
          }
        }).then((data) => {
          if (data && Array.isArray(data.data)) {
            this.total = data.total;
            this.tableData = data.data;
          }
        })
      },
      // 加载
      load() {
        this.getConstituentCompanyList()
        this.list();
      },
    },
    mounted() {
      this.load();
    }
  }
</script>

<style>
  .page-sys_log_login {

  }

  .page-sys_log_login .el-form-item--mini.el-form-item,
  .page-sys_log_login .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
</style>
