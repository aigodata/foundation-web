<script>
import parentChart from "./chart";
import globalOptions from "./config";

// dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
const darkOptions = {
  grid: globalOptions.dark.grid,
  color: ["#3398DB"],
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0,0,0,.7)",
    transitionDuration: 0.15, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
    textStyle: {
      fontSize: 11
    },
    padding: [8, 15], // 提示框浮层的边框宽。
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      shadowStyle: {
        color: "rgba(150,150,150,0.15)"
      }
    }
  },
  xAxis: {
    type: "category",
    axisLine: {
      show: false, // 是否显示坐标轴轴线。
      lineStyle: {
        color: "#fff" // X轴字体颜色
      }
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLabel: {
      show: true, // 是否显示刻度标签。
      interval: 0, // 可以设置成 0 强制显示所有标签。
      fontSize: 11
    },
    splitLine: {
      show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
    },
    splitArea: {
      show: false // 是否显示分隔区域。
    },
    data: []
  },
  yAxis: [
    // 左
    {
      type: "value",
      minInterval: 1, // 自动计算的坐标轴最小间隔大小。
      axisLine: {
        show: false, // 是否显示坐标轴轴线。
        lineStyle: {
          color: "#fff" // X轴字体颜色
        }
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
    // 数据模板
    {
      type: "bar",
      barWidth: "30%",
      name: "",
      itemStyle: {
        normal: {
          color: "#31a5f8"
        }
      },
      data: []
    }
  ]
};

// 默认的option配置 (样式部分, 默认 light 浅色风格)
const defaultOptions = {
  grid: globalOptions.light.grid,
  color:globalOptions.light.color,
  legend: {
    right: "20px",             // 图例组件离容器右侧的距离。
    icon: 'circle',            // 图例风格
    itemWidth: 12,             // 图例标记的图形宽度。
    padding: 5,                // 图例内边距，单位px，默认各方向内边距为5
    itemGap: 5,                // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。默认10
    textStyle: {
      fontSize: 12,
    },
    data: []
  },
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0,0,0,.7)",
    transitionDuration: 0.15, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
    textStyle: {
      fontSize: 11
    },
    padding: [8, 15], // 提示框浮层的边框宽。
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为:'line' | 'shadow'
      shadowStyle: {
        color: "rgba(150,150,150,0.15)"
      }
    }
  },
  xAxis: {
    type: "category",
    axisLine: {
      show: false // 是否显示坐标轴轴线。
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLabel: {
      show: true, // 是否显示刻度标签。
      // interval: 0, // 可以设置成 0 强制显示所有标签。
      fontSize: 11
    },
    splitLine: {
      show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
    },
    splitArea: {
      show: false // 是否显示分隔区域。
    },
    data: []
  },
  yAxis: [
    // 左
    {
      type: "value",
      minInterval: 1, // 自动计算的坐标轴最小间隔大小。
      axisLine: {
        show: false // 是否显示坐标轴轴线。
      },
      axisTick: {
        show: false // 是否显示坐标轴刻度。
      },
      splitLine: {
        show: true, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
        lineStyle: {
          color: "#efefef"
        }
      }
    }
  ],
  series: []
};

// 数据模板
const seriesSchema = {
  type: "bar",
  barWidth: "30%",
  name: "",
  itemStyle: {},
  data: []
}

// 数据处理 (数据部分)
export default {
  extends: parentChart,
  name: "bar-chart",
  props: ["yUnit", "xUnit"],
  data() {
    return {};
  },
  methods: {
    /**
     * 父类 mounted方法 和 watch data 都自动进行调用
     * @param chart echart实例
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
      options.legend.data = this.data.map(v => v.name)
    },
    setXAxisData(options) {
      const categoryAxis = options.xAxis.data = [];
      const data = this.data || [];
      data.forEach(item => {
        item.data.forEach(d => {
          categoryAxis.push(d.name);
        });
      });
    },
    setYAxisData(options) {
      this.yUnit && (options.yAxis[0].name = this.yUnit);
    },
    setSeries(options) {
      const data = this.data || [];
      options.series = data.map(d => {
        const s = JSON.parse(JSON.stringify(seriesSchema));
        s.name = d.name;
        s.data = d.data;
        return s;
      });
    }
  }
};
</script>
