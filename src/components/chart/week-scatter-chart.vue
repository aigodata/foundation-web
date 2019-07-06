<script>
  import parentChart from './chart'
  import globalOptions from './config';

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    grid: globalOptions.dark.grid,
    color: globalOptions.dark.color,
    tooltip: {
      show: true
    },
    series: []
  }

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: globalOptions.light.grid,
    color: globalOptions.light.color,
    tooltip: {
      show: true
    },
    series: []
  }

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: 'week-scatter-chart',
    methods: {
      createChart(chart) {
        if (!chart) return;
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions))
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 设置图例
        this.setTitle(options)
        // 设置Y轴
        this.setYAxis(options)
        // 设置数据
        this.setSeries(options)
        // 绘制chart (调用父类)
        this.render(options)
      },
      setTitle(options) {
        const data = this.data || []
        const len = data.length
        options.title = data.map((d, idx) => {
          return {
            textBaseline: 'middle',
            top: (idx + 0.3) * 100 / len + '%',
            text: d.name
          }
        })
      },
      setYAxis(options) {
        const data = this.data || []
        const len = data.length
        options.singleAxis = data.map((d, idx) => {
          const singleData = d.data || []
          return {
            left: 60,
            type: 'category',
            boundaryGap: false,
            data: singleData.map(sd => sd.name),
            top: (idx * 100 / len + 3) + '%',
            height: (100 / len - 10) + '%',
            axisTick: {
              show: idx === len - 1
            },
            axisLabel: {
              show: idx === len - 1,
              interval: 2
            },
            axisLine: {
              lineStyle: {
                width: 1,
                opacity: idx === len - 1 ? 1 : 0.3,
                type: idx === len - 1 ? 'solid' : 'dashed'
              }
            },
            splitLine: {
              show: false
            }
          }
        })
      },
      setSeries(options) {
        const data = this.data || []
        options.series = data.map((d, idx) => {
          return {
            singleAxisIndex: idx,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            data: d.data,
            symbolSize: function(value) {
              return value;
            }
          }
        })
      }
    }
  }
</script>
