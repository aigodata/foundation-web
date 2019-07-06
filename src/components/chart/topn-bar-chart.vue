<script>
  import parentChart from "./chart";
  import globalOptions from "./config";

  // @特殊处理
  let customGrid = Object.assign({}, globalOptions.light.grid, { top: "0px" });
  let color = ["#e05f3d", "#d9b22f", "#2cbd7b"].concat(Array.from({length: 7}).map(v => '#4ca4f7'));

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    grid: customGrid,
    color: color,
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01], // 坐标轴两边留白策略
      min: 0,
      silent: true, // 坐标轴是否是静态无法交互, default: false
      axisLine: {
        show: false, // 是否显示坐标轴轴线。
        lineStyle: {
          color: "#fff" // Y轴字体颜色
        }
      },
      axisTick: {
        show: false // 是否显示坐标轴刻度。
      },
      axisLabel: {
        show: false // 是否显示刻度标签。
      },
      splitLine: {
        show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      },
      splitArea: {
        show: false // 是否显示分隔区域。
      }
    },
    yAxis: [
      // 左
      {
        type: "category",
        axisLine: {
          show: false, // 是否显示坐标轴轴线。
          lineStyle: {
            color: "#fff" // Y轴字体颜色
          }
        },
        axisTick: {
          show: false // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        },
        axisLabel: {
          show: true, // 是否显示刻度标签。
          textStyle:{
              fontSize: '14' // 字体大小
          }
        }
      },
      // 右
      {
        type: "category",
        axisLine: {
          show: false, // 是否显示坐标轴轴线。
          lineStyle: {
            color: "#fff" // Y轴字体颜色
          }
        },
        axisTick: {
          show: false // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        },
        axisLabel: {
          show: true, // 是否显示刻度标签。
          textStyle:{
              fontSize: '14' // 字体大小
          }
        }
      }
    ],
    series: [
      // 阴影
      {
        type: "bar",
        itemStyle: {
          normal: {color: "rgba(255,255,255,0.14)"}
        },
        barGap: "-100%",
        barCategoryGap: "40%",
        data: [],
        animation: false
      },
      // 数据
      {
        type: "bar",
        barWidth: "30%",
        data: []
      }
    ]
  };

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: globalOptions.light.grid,
    color: color,
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01], // 坐标轴两边留白策略
      min: 0,
      silent: true, // 坐标轴是否是静态无法交互, default: false
      axisLine: {
        show: false // 是否显示坐标轴轴线。
      },
      axisTick: {
        show: false // 是否显示坐标轴刻度。
      },
      axisLabel: {
        show: false // 是否显示刻度标签。
      },
      splitLine: {
        show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      },
      splitArea: {
        show: false // 是否显示分隔区域。
      }
    },
    yAxis: [
      // 左
      {
        type: "category",
        axisLine: {
          show: false // 是否显示坐标轴轴线。
        },
        axisTick: {
          show: false // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: true, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
          lineStyle: {
            color: "#323c55"
          }
        }
      },
      // 右
      {
        type: "category",
        axisLine: {
          show: false // 是否显示坐标轴轴线。
        },
        axisTick: {
          show: false // 是否显示坐标轴刻度。
        },
        splitLine: {
          show: true, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
          lineStyle: {
            color: "#323c55"
          }
        }
      }
    ],
    series: [
      // 阴影
      {
        type: "bar",
        itemStyle: {
          normal: {color: "rgba(0,0,0,0.05)"}
        },
        barGap: "-100%",
        barCategoryGap: "40%",
        data: [],
        animation: false
      },
      // 数据
      {
        type: "bar",
        data: []
      }
    ]
  };

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: "topn-bar-chart",
    data() {
      return {};
    },
    methods: {
      /**
       * 父类 mounted方法 或 watch data 自动进行调用
       */
      createChart(chart) {
        if (!chart) return;
        // 判断数据
        this.emptyData = false;
        if (!this.data || !this.data.length) {
          return (this.emptyData = true);
        }
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
        this.render(options);
      },
      setLegend(options) {
      },
      setXAxisData(options) {
      },
      setYAxisData(options) {
        let data = this.data;
        if (!Array.isArray(data)) return;
        options.yAxis[0].data = data.map(item => item.name);
        options.yAxis[1].data = data.map(item => item.value);
      },
      setSeries(options) {
        let data = this.data;
        if (!Array.isArray(data)) return;
        let max = 0;
        let len = data.length;
        options.series[1].data = [];
        data.forEach((d, idx) => {
          max < d.value && (max = d.value);
          options.series[1].data.push({
            value: d.value,
            itemStyle: {
              color: color[(len-1) - idx] // 因为数据从小到大, 需要需要反向取颜色
            }
          })
        });
        // 设置刻度最大值
        options.xAxis.max = max;
        // 设置柱图的阴影
        data.forEach(d => {
          options.series[0].data.push(max);
        })
      }
    }
  }
</script>
