<script>
import parentChart from "./chart";
import globalOptions from "./config";

// dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
const darkOptions = {
  grid: globalOptions.dark.grid,
  color: globalOptions.dark.color,
  legend: {
    orient: "vertical",
    right: 25,
    top: 25,
    itemGap: 20,//图例间距
    itemWidth: 8,//图例宽度
    itemHeight: 8,//图例高度
    textStyle: {
      color: "#fff"
    }
  },
  series: [
    {
      type: "pie",
      radius: ["45%", "60%"],
      center: ["40%", "45%"],// 设置成相对的百分比
      avoidLabelOverlap: false,
      hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。
      hoverOffset: 2, // 高亮扇区的偏移距离。
      label: {
        normal: {
          show: true,
          position: "outside"
        },
        emphasis: {
          show: true,
          formatter: "{b} \n {d}%",
          textStyle: {
            fontSize: "16",
            fontWeight: "bold"
          }
        }
      },
      data: [
        { value: 25, name: "域名解析" },
        { value: 30, name: "可用性" },
        { value: 30, name: "内容变更" },
        { value: 25, name: "HTTP请求" },
        { value: 25, name: "网站挂马" },
        { value: 25, name: "网站黑链" },
        { value: 25, name: "违规内容" }
      ],
      labelLine: {
        normal: {
          show: true
        }
      }
    }
  ]
};

// 默认的option配置 (样式部分, 默认 light 浅色风格)
const defaultOptions = {
  grid: globalOptions.light.grid,
  color: globalOptions.light.color,
  legend: {
    orient: "vertical",
    left: 10,
    top: 10
  },
  series: [
    {
      type: "pie",
      radius: ["45%", "60%"],
      avoidLabelOverlap: false,
      hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果。
      hoverOffset: 2, // 高亮扇区的偏移距离。
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          formatter: "{b} \n {d}%",
          textStyle: {
            fontSize: "16",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      }
    }
  ]
};

// 数据处理 (数据部分)
export default {
  extends: parentChart,
  name: "pie-chart",
  methods: {
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
      // 设置数据
      this.setSeries(options);
      // 绘制chart (调用父类)
      this.render(options);
    },
    setLegend(options) {
      if (this.data && this.data.length) {
        options.legend.data = this.data.map(d => {
          return {
            name: d.name,
            icon: "circle"
          };
        });
      }
    },
    setSeries(options) {
      options.series[0].data = this.data;
    }
  }
};
</script>
