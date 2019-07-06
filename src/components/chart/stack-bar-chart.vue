<script>
  import parentChart from './chart'
  import globalOptions from './config';

  // @特殊处理 顶部高度不够
  let customGrid = Object.assign({}, globalOptions.light.grid, { top: '50px' });

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    grid: customGrid,
    color: globalOptions.dark.color,
    legend: {
      right: "20px",             // 图例组件离容器右侧的距离。
      icon: 'circle',            // 图例风格
      itemWidth: 12,             // 图例标记的图形宽度。
      padding: 5,                // 图例内边距，单位px，默认各方向内边距为5
      itemGap: 5,                // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。默认10
      textStyle: {
        color: "#fff",
        fontSize: 10,
      },
      data: []
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.7)',
      transitionDuration: 0.15,  // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
      textStyle: {
        fontSize: 11
      },
      padding: [8, 15],           // 提示框浮层的边框宽。
      axisPointer: {             // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',          // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: 'rgba(150,150,150,0.15)'
        }
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,             // 是否显示坐标轴轴线。
        lineStyle:{
          color: '#fff'          // 坐标轴轴字体颜色
        }
      },
      axisTick: {
        show: false,             // 是否显示坐标轴刻度。
      },
      axisLabel: {
        show: true,              // 是否显示刻度标签。
      },
      splitLine: {
        show: false,             // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      },
      splitArea: {
        show: false,             // 是否显示分隔区域。
      },
      data: []
    },
    yAxis: [
      // 左
      {
        type: 'value',
        axisLine: {
          show: false,            // 是否显示坐标轴轴线。
          lineStyle:{
            color: '#fff'         // 坐标轴轴字体颜色
          }
        },
        axisTick: {
          show: false,            // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: true,            // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        }
      }
    ],
    series: [
      // 数据模板
      {
        type: 'bar',
        stack: 'stack',
        barWidth: '30px',
        name: '',
        data: []
      }
    ]
  }

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: customGrid,
    color: globalOptions.light.color,
    legend: {
      right: "20px",             // 图例组件离容器右侧的距离。
      icon: 'circle',            // 图例风格
      itemWidth: 12,             // 图例标记的图形宽度。
      padding: 5,                // 图例内边距，单位px，默认各方向内边距为5
      itemGap: 5,                // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。默认10
      textStyle: {
        fontSize: 10,
      },
      data: []
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.7)',
      transitionDuration: 0.15,  // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
      textStyle: {
        fontSize: 11
      },
      padding: [8, 15],           // 提示框浮层的边框宽。
      axisPointer: {             // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',          // 默认为直线，可选为:'line' | 'shadow'
        shadowStyle: {
          color: 'rgba(150,150,150,0.15)'
        }
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false,             // 是否显示坐标轴轴线。
      },
      axisTick: {
        show: false,             // 是否显示坐标轴刻度。
      },
      axisLabel: {
        show: true,              // 是否显示刻度标签。
      },
      splitLine: {
        show: false,             // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      },
      splitArea: {
        show: false,             // 是否显示分隔区域。
      },
      data: []
    },
    yAxis: [
      // 左
      {
        type: 'value',
        axisLine: {
          show: false,            // 是否显示坐标轴轴线。
        },
        axisTick: {
          show: false,            // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: false,            // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        }
      }
    ],
    series: [
      // 数据模板
      {
        type: 'bar',
        stack: 'stack',
        barWidth: '30px',
        name: '',
        data: []
      }
    ]
  }

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: 'stack-bar-chart',
    props: [
      'yUnit',
      'xUnit',
    ],
    data() {
      return {}
    },
    methods: {
      /**
       * 父类 mounted方法 和 watch data 都自动进行调用
       * @param chart echart实例
       */
      createChart(chart) {
        if (!chart) return;
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions));
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 设置图例
        this.setLegend(options);
        // 设置X轴
        this.setXAxisData(options);
        // 设置Y轴
        this.setYAxisData(options);
        // 设置数据
        this.setSeries(options);
        // 绘制chart (调用父类)
        this.render(options)
      },
      setLegend(options) {
        let list = [];
        if (this.data && this.data.data) {
          list = this.data.data
        }
        options.legend.data = list.map(item => item.name);
      },
      setXAxisData(options) {
        let category = [];
        if (this.data && this.data.category) {
          category = this.data.category
        }
        options.xAxis.data = category;
      },
      setYAxisData(options) {
        options.yAxis[0].name = this.yUnit;
      },
      setSeries(options) {
        // 先取得模板
        let tmp = options.series[0];
        let list = [];
        if (this.data && this.data.data) {
          list = this.data.data
        }
        list.forEach((d, idx) => {
          let item = JSON.parse(JSON.stringify(tmp));
          item.name = d.name;
          item.data = d.value;
          options.series.push(item);
        });
      }
    }
  }
</script>
