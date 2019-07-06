<script>
  import { percent } from '@/plugin/filter'
  import parentChart from './chart'
  import globalOptions from './config';

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    // grid: globalOptions.dark.grid,
    // color: globalOptions.dark.color,
    graphic: {              // graphic 是原生图形元素组件。
      elements: [           // 里面是所有图形元素的集合
        {
          type: 'group',    // group 是唯一的可以有子节点的容器
          top: 'center',    // 定位
          left: 'center',
          z: 10,
          children: [       // 子节点列表
            {
              type: 'text',                             // 文本块
              style: {
                text: '',                               // 文本块文字。可以使用 \n 来换行。
                fill: '#fff',                           // 文字填充色
                stroke: "#fff",
                textAlign: 'center',
                y: 0,                                   // 图形元素的左上角在父节点坐标系
                font: 'bolder 24px "Microsoft YaHei"'   // css font
              }
            },
            {
              type: 'text',
              style: {
                y: 28,
                text: '',
                fill: '#fff',                           // 文字填充色
                textAlign: 'center',
                font: '16px "Microsoft YaHei"'
              }
            }
          ]
        }
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '75%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,          // 是否开启 hover 在扇区上的放大动画效果。
        hoverOffset: 2,                 // 高亮扇区的偏移距离。
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,                   // 数据
            itemStyle: {
              color: '#0db7ec'
            }
          },
          {
            value: 100,                 // 背景
            itemStyle: {
              color: 'rgba(187,187,204, 0.5)'
            }
          }
        ]
      }
    ]
  }

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    // grid: globalOptions.light.grid,
    // color: globalOptions.light.color,
    graphic: {              // graphic 是原生图形元素组件。
      elements: [           // 里面是所有图形元素的集合
        {
          type: 'group',    // group 是唯一的可以有子节点的容器
          top: 'center',    // 定位
          left: 'center',
          z: 10,
          children: [       // 子节点列表
            {
              type: 'text',                             // 文本块
              style: {
                text: '',                               // 文本块文字。可以使用 \n 来换行。
                textAlign: 'center',
                y: 0,                                   // 图形元素的左上角在父节点坐标系
                font: 'bolder 24px "Microsoft YaHei"'   // css font
              }
            },
            {
              type: 'text',
              style: {
                y: 28,
                text: '',
                textAlign: 'center',
                font: '16px "Microsoft YaHei"'
              }
            }
          ]
        }
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '60%'],         //
        center: ["50%", '50%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,          // 是否开启 hover 在扇区上的放大动画效果。
        hoverOffset: 2,                 // 高亮扇区的偏移距离。
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 0,                   // 数据
            itemStyle: {
              color: '#0db7ec'
            }
          },
          {
            value: 100,                 // 背景
            itemStyle: {
              color: '#bbc'
            }
          }
        ]
      }
    ]
  }

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: 'rate-chart',
    props: [
      'color',
      'text'
    ],
    methods: {
      createChart(chart) {
        if (!chart) return;
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions))
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 设置颜色
        this.setColor(options);
        // 设置
        this.setText(options)
        // 设置数据
        this.setSeries(options)
        // 绘制chart (调用父类)
        this.render(options)
      },
      setColor(options) {
        this.color && (options.series[0].data[0].itemStyle.color = this.color);
      },
      setText(options) {
        const rate = (this.data || 0);
        let group = options.graphic.elements[0];
        let rateText = group.children[0];
        let nameText = group.children[1];
        rateText.style.text = percent(rate);    // 比例
        nameText.style.text = this.text || ''   // 描述
      },
      setSeries(options) {
        const value = this.data || 0;
        options.series[0].data[0].value = value;
        options.series[0].data[1].value = 1 - value
      }
    }
  }
</script>
