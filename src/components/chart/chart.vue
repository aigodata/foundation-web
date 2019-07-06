<template>
  <div class="app-chart">
    <div class="chart" v-show="!emptyData"></div>
    <div class="empty-text" :class="theme" v-show="emptyData">暂无数据</div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import ElementResizeDetectorMaker from 'element-resize-detector'

  export default {
    name: 'app-chart',
    props: {
      'data': undefined,
      'options': Object,
      'theme': {
        type: String,
        default: 'light',
      }
    },
    watch: {
      data: function() {
        this.createChart(this.chart, echarts)
      }
    },
    data() {
      return {
        emptyData: false
      }
    },
    methods: {
      render(options) {
        // 设置配置
        if (this.options) {
          // 设置默认样式
          this.chart.setOption(options, {
            notMerge: true,    // 是否不跟之前设置的option进行合并，默认为false，即合并
            lazyUpdate: true,  // 在设置完option后是否不立即更新图表，默认为false，即立即更新
            silent: true       // 阻止调用 setOption 时抛出事件，默认为false，即抛出事件
          })
          // 设置自定义的覆盖样式
          this.chart.setOption(this.options)
        } else {
          this.chart.setOption(options)
        }
      },
      // 替换主题 render方法之后执行
      changeTheme(options, cover) {
        let theme = this.theme;
        if (theme === 'dark') {
          // 预留deepClone
          options = Object.assign(options, cover);
        }
      },
      resize(width, height) {
        this.chart.resize(width, height)
      }
    },
    mounted() {
      this.$nextTick(function() {
        // 不存在创建
        if (!this.chart) {
          let el = this.$el.querySelector(".chart");
          el && (this.chart = echarts.init(el));
        }
        // 创建图表(调用子类方法)
        this.createChart(this.chart, echarts);
        // 自动监听el的resize插件
        let elementResizeDetector = ElementResizeDetectorMaker({
          strategy: 'scroll',  // 监听触发策略
          callOnAdd: false     // 刚添加的时候是否触发, 默认为true
        })
        // 监听元素的调整尺寸事件
        elementResizeDetector.listenTo(this.$el, () => {
          // 并自动修改元素的尺寸
          this.resize(this.$el.clientWidth, this.$el.clientHeight)
        })
      })
    }
  }
</script>

<style scoped>
  .app-chart {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .app-chart .chart {
    width: 100%;
    height: 100%;
  }
  .app-chart .empty-text {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .app-chart .empty-text.dark {
    color: #909399;
    font-size: 13px;
  }
</style>
