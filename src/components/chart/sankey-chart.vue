<script>
  import parentChart from './chart'
  import globalOptions from './config';

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    grid: globalOptions.dark.grid,
    color: globalOptions.dark.color,
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        data: [],
        links: [],
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#aaa'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.5
          }
        }
      }
    ]
  }

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: globalOptions.light.grid,
    color: globalOptions.light.color,
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        layout: 'none',
        data: [],
        links: [],
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: '#aaa'
          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0.5
          }
        }
      }
    ]
  };

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: 'sankey-chart',
    methods: {
      createChart(chart) {
        if (!chart) return;
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions));
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 设置数据
        this.setSeries(options);
        // 绘制chart (调用父类)
        this.render(options)
      },
      setSeries(options) {
        if (this.data) {
          options.series[0].data = this.data.nodes;
          options.series[0].links = this.data.links;
        } else {
          options.series[0].data = [];
          options.series[0].links = [];
        }

      }
    }
  }
</script>
