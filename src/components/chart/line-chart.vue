<script>
import parentChart from "./chart";
import globalOptions from "./config";

// @特殊处理 顶部高度不够
let customGrid = Object.assign({}, globalOptions.light.grid, { right: "25px" });

// dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
const darkOptions = {
  grid: customGrid,
  color: globalOptions.light.color,
  legend: {
    data: [
      "域名解析",
      "可用性",
      "内容变更",
      "HTTP请求",
      "网站挂马",
      "网站黑链",
      "违规内容"
    ]
  },
  tooltip: {
    show: true,
    backgroundColor: "rgba(0,0,0,.7)",
    transitionDuration: 0.15, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
    textStyle: {
      fontSize: 11
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false, // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
    axisLabel: {
      show: true
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLine: {
      show: false, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      lineStyle: {
        color: "#fff" // 坐标轴轴字体颜色
      }
    }
  },
  yAxis: {
    type: "value",
    minInterval: 1, // 自动计算的坐标轴最小间隔大小。
    splitLine: {
      show: true, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      lineStyle: {
        color: "#32487b",
        type: "dashed"
      }
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLine: {
      show: false, // 是否显示坐标轴轴线。
      lineStyle: {
        color: "#fff" // 坐标轴轴字体颜色
      }
    }
  },
  series: []
};

// 默认的option配置
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
    show: true,
    backgroundColor: "rgba(0,0,0,.7)",
    transitionDuration: 0.15, // 提示框浮层的移动动画过渡时间，单位是 s，设置为 0 的时候会紧跟着鼠标移动。
    textStyle: {
      fontSize: 11
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false, // 坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
    axisLabel: {
      show: true
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLine: {
      show: false // 是否显示分隔线。默认数值轴显示，类目轴不显示。
    }
  },
  yAxis: {
    type: "value",
    minInterval: 1, // 自动计算的坐标轴最小间隔大小。
    splitLine: {
      show: true, // 是否显示分隔线。默认数值轴显示，类目轴不显示。
      lineStyle: {
        color: "#efefef"
      }
    },
    axisTick: {
      show: false // 是否显示坐标轴刻度。
    },
    axisLine: {
      show: false // 是否显示坐标轴轴线。
    }
  },
  series: [
    //数据模板
    {
      itemStyle: {
        normal: {
          color:'#8ebc37',
          lineStyle: {
            color: "#8ebc37"
          }
        }
      }
    }
  ]
};

const seriesSchema = {
  type: "line",
  smooth: true
};

export default {
  name: "line-chart",
  extends: parentChart,
  methods: {
    createChart(chart) {
      if (!chart) return;
      // 判断数据
      this.emptyData = false;
      let dataCount = 0;
      if (Array.isArray(this.data)) {
        this.data.forEach(v => {
          Array.isArray(v.data) && (dataCount += v.data.length);
        });
        if (dataCount === 0) {
          this.emptyData = true;
        }
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
      const data = this.data ||[];
      options.legend.data = data.map(v => v.name)
    },
    setXAxisData(options) {},
    setYAxisData(options) {
      const categories = [];
      const data = this.data || [];
      data.forEach(item => {
        item.data.forEach(d => {
          if (!categories.includes(d.name)) {
            categories.push(d.name);
          }
        });
      });

      // 给 category 的轴设置数据
      let categoryAxis;
      if (options.yAxis.type === "category") {
        categoryAxis = options.yAxis;
      } else {
        categoryAxis = options.xAxis;
      }
      categoryAxis.data = categories;
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
