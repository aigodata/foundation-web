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
    legend: [{
      // selectedMode: 'single',
      data: []
    }],
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: [],
        links: [],
        categories: [],
        roam: true,
        label: {
          normal: {
            position: 'right'
          }
        },
        force: {
          repulsion: 100
        }
      }
    ]
  };

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: globalOptions.light.grid,
    color: globalOptions.light.color,
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    legend: [{
      // selectedMode: 'single',
      data: []
    }],
    series: [
      {
        type: 'graph',
        layout: 'force',
        data: [],
        links: [],
        categories: [],
        roam: true,
        label: {
          normal: {
            position: 'right'
          }
        },
        force: {
          repulsion: 100
        }
      }
    ]
  }

  export default {
    extends: parentChart,
    name: 'graph-chart',
    methods: {
      createChart(chart) {
        if (!chart) return;
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions))
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 设置数据
        this.setSeries(options);
        // 绘制chart (调用父类)
        this.render(options)
      },
      setLegend(options, categories) {
        options.legend[0].data = categories
      },
      setSeries(options) {
        const categories = []
        let nodes = []
        let links = []
        if (this.data) {
          Array.isArray(this.data.nodes) && this.data.nodes.forEach(node => {
            const idx = categories.indexOf(node.attributes.group);
            if (idx >= 0) {
              node.category = idx;
            } else {
              categories.push(node.attributes.group)
              node.category = categories.length - 1;
            }
            node.itemStyle = null;
            node.x = node.y = null;
            node.symbolSize = 10;
            node.draggable = true;
          });
          nodes = this.data.nodes
          links = this.data.links
        }
        options.series[0].categories = categories.map(c => {
          return { name: c }
        })
        options.series[0].data = nodes;
        options.series[0].links = links;
        this.setLegend(options, categories)
      }
    }
  }
</script>
