<script>
  import parentChart from './chart'
  import globalOptions from './config';

  // dark 深色风格, 结构与defaultOptions一致, 仅添加样式相关的配置项即可, changeTheme会替换defaultOptions的相同属性配置
  const darkOptions = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    color: globalOptions.dark.color,
    visualMap: [                                // 是视觉映射组件
      {
        type: 'continuous',                     // 连续型视觉映射组件
        show: false,                            // 如果设置为 false，不会显示，但是数据映射的功能还存在
        min: 0,                                 // 指定 visualMapContinuous 组件的允许的最小值
        max: 0,                                 // 指定 visualMapContinuous 组件的允许的最大值
        dimension: 2,                           // 指定用数据的『第几列』
        seriesIndex: 0,                         // 指定取系列数组的第几条数据
        text: [],                               // 两端的文本
        textStyle: {                            // visualMap 文字的颜色
          color: '#fff'
        },
        calculable: false,                      // 是否显示拖拽用的手柄
        inRange: {                              // 定义 在选中范围中 的视觉元素
          color: [
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#2cbd7b',
            '#d9b22f',
            '#e05f3d'
          ],
          symbolSize: [
            20,
            50
          ]
        },
        controller: {                           // 适用于一些控制器视觉效果需要特殊定制或调整的场景。
          outRange: {}
        }
      }
    ],
    geo: {
      show: true,
      map: '',          // setMap方法内指定
      roam: false,      // 是否开启鼠标缩放和平移漫游。默认不开启。
      top: 0,
      left: 'center',
      // right: 'center',
      bottom: 0,
      // center: [117.41580, 24.11226],	// 中国
      itemStyle: {
        areaColor: '#101c4d',
        borderColor: '#09fcff'
      },
      emphasis: {
        label: {
          show: false,
          color: "#fff"
        },
        itemStyle: {
          borderColor: '#09fcff',
          areaColor: '#304fac',
          color: "fff"
        }
      },
      regions: []         // 在地图中对特定的区域配置样式。
    },
    series: [
      // 节点气泡
      {
        name: '',
        type: 'effectScatter',
        zlevel: 3,
        coordinateSystem: 'geo',
        symbolSize: 10,
        itemStyle: {
          color: 'rgba(229,57,53, 0.7)'
        },
        data: [],
        tooltip: {
          show: true,
          alwaysShowContent: true,		// 是否永远显示提示框内容
          transitionDuration: 0.15,
          backgroundColor: 'rgba(0,0,0,0.9)',
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 5,
          textStyle: {
            color: "#fff",
            fontSize: 11
          },
          padding: [8, 15],
          formatter: undefined
        }
      },
      // 连线
      {
        name: '',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          // period: 2,					// 特效动画的时间，单位为 s。
          trailLength: 0.5,		// 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
          symbol: "circle",
          symbolSize: 2,
          color: "rgba(255,255,255, 0.7)"
        },
        lineStyle: {
          color: "rgba(0,234,255, 0.1)",
          // shadowColor: 'rgba(137,245,255,0.3)',
          // shadowBlur: 2,
          width: 1,
          // opacity: 1,
          curveness: 0.2	// 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
        },
        // emphasis: {
        // 	lineStyle: {
        // 		color: "#ff7673"
        // 	}
        // },
        data: []
      }
    ]
  }

  // 默认的option配置 (样式部分, 默认 light 浅色风格)
  const defaultOptions = {
    grid: globalOptions.light.grid,
    color: globalOptions.light.color,
    visualMap: [                                // 是视觉映射组件
      {
        type: 'continuous',                     // 连续型视觉映射组件
        show: false,                            // 如果设置为 false，不会显示，但是数据映射的功能还存在
        min: 0,                                 // 指定 visualMapContinuous 组件的允许的最小值
        max: 0,                                 // 指定 visualMapContinuous 组件的允许的最大值
        dimension: 2,                           // 指定用数据的『第几列』
        seriesIndex: 0,                         // 指定取系列数组的第几条数据
        text: [],                               // 两端的文本
        textStyle: {                            // visualMap 文字的颜色
          color: '#fff'
        },
        calculable: false,                      // 是否显示拖拽用的手柄
        inRange: {                              // 定义 在选中范围中 的视觉元素
          color: [
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#4ca4f7',
            '#2cbd7b',
            '#d9b22f',
            '#e05f3d'
          ],
          symbolSize: [
            10,
            20
          ]
        },
        controller: {                           // 适用于一些控制器视觉效果需要特殊定制或调整的场景。
          outRange: {}
        }
      }
    ],
    geo: {
      show: true,
      map: '',          // setMap方法内指定
      roam: false,      // 是否开启鼠标缩放和平移漫游。默认不开启。
      top: 0,
      left: 'center',
      // right: 'center',
      bottom: 0,
      // center: [117.41580, 24.11226],	// 中国
      itemStyle: {
        areaColor: '#101c4d',
        borderColor: '#09fcff'
      },
      emphasis: {
        label: {
          show: false,
          color: "#fff"
        },
        itemStyle: {
          borderColor: '#09fcff',
          areaColor: '#304fac',
          color: "fff"
        }
      },
      regions: []         // 在地图中对特定的区域配置样式。
    },
    series: [
      // 气泡
      {
        name: '',
        type: 'effectScatter',
        zlevel: 3,
        coordinateSystem: 'geo',      // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
        data: [],
        tooltip: {
          show: true,
          alwaysShowContent: true,		// 是否永远显示提示框内容
          transitionDuration: 0.15,
          backgroundColor: 'rgba(0,0,0,0.9)',
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 5,
          textStyle: {
            color: "#fff",
            fontSize: 11
          },
          padding: [8, 15],
          formatter: undefined
        }
      },
      // 连线
      {
        name: '',
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          // period: 2,					// 特效动画的时间，单位为 s。
          trailLength: 0.5,		// 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
          symbol: "circle",
          symbolSize: 2,
          color: "rgba(255,255,255, 0.7)"
        },
        lineStyle: {
          color: "rgba(0,234,255, 0.1)",
          // shadowColor: 'rgba(137,245,255,0.3)',
          // shadowBlur: 2,
          width: 1,
          // opacity: 1,
          curveness: 0.2	// 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
        },
        // emphasis: {
        // 	lineStyle: {
        // 		color: "#ff7673"
        // 	}
        // },
        data: []
      }
    ]
  }

  // 数据处理 (数据部分)
  export default {
    extends: parentChart,
    name: 'map-chart',
    props: [
      'name',     // 指定地图资源名称
    ],
    data() {
      return {}
    },
    methods: {
      /**
       * 父类 mounted方法 或 watch data 自动进行调用
       * @param chart 当前chart图的实例
       * @param echarts echarts
       */
      createChart(chart, echarts) {
        if (!chart) return;
        // @特殊处理, 当没有数据时, 需要显示空地图, 暂不主处理空数据情况
        // 克隆
        let options = JSON.parse(JSON.stringify(defaultOptions));
        // 切换主题 (调用父类)
        this.changeTheme(options, darkOptions);
        // 指定气泡的格式化方法
        options.series[0].formatter = this.formatter;
        // 设置数据
        this.setSeries(options);
        // 加载地图
        this.setMap(options, echarts, this.name, () => {
          // 绘制chart (调用父类)
          this.render(options);
        })
      },
      setSeries(options) {
        if (this.data) {
          let geoInfo = this.data.geoInfo;
          this.setVisualMap(options, this.data.nodes);
          options.series[0].data = this.setNode(options, geoInfo, this.data.nodes) || [];
          // options.series[1].data = this.setEdge(options, geoInfo, this.data.edges) || [];
        }
      },
      // 设置视觉映射最大值
      setVisualMap(options, nodes) {
        if (Array.isArray(nodes) & nodes.length > 0) {
          let maxValue = 0;
          nodes.forEach(function (v, i) {
            maxValue = Math.max(maxValue, v.value);
          });
          options.visualMap[0].max = maxValue;
        }
      },
      // 设置节点
      setNode(options, geoInfo, nodes) {
        if (Array.isArray(nodes) & nodes.length > 0) {
          let arr = [];
          nodes.forEach((v) => {
            // 过滤无效地址
            let info = geoInfo[v.name];
            if (info) {
              arr.push({
                name: v.name,
                value: (info.geo).concat([v.value])
              })
            }
          });
          return arr;
        }
      },
      // 设置连线
      setEdge(options, geo, edges) {
        if (Array.isArray(edges) & edges.length > 0) {
          return edges.map((v) => {
            return {
              name: '',
              date: v.date,
              from: v.from,
              to: v.to,
              summary: v.summary,
              value: v.value,
              coords: [
                geo[v.from],    // 起点
                geo[v.to]   	  // 终点
              ]
            }
          });
        }
      },
      formatter(params, ticket, callback) {
        // console.log("params", params);
        //取得当期节点
        let name = params.name;
        // 取得当期节点的所有出访
        let visit = edge.filter(function (v) {
          return v.from === name
        });
        if (visit.length === 0) {
          return;
        }
        // 组装
        let str = '';
        for (let i = 0; i < visit.length; i++) {
          let v = visit[i];
          let s = '<div class="chart-tooltip-visit-item">'
            + '<p><i class="chart-tooltip-visit-icon teal">&nbsp;</i> ' + v.date + ' ' + v.from + ' 出访 ' + v.to + '</p>'
            + '<p>' + v.summary + '</p>'
            + '</div>';

          str += s;
        }
        return '<div class="chart-tooltip-visit-container">' + str + '</div>';
      },
      setMap(options, echarts, name, callback) {
        // 判断地图是否存在
        if (!echarts.getMap(name)) {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", '/assets/map/' + name + '.json');
          xhr.onload = () => {
            let mapData = xhr.response;
            // 注册地图
            if (mapData) {
              echarts.registerMap(name, mapData);
              options.geo.map = name;
              callback && callback();
            }
          };
          xhr.send();
        } else {
          options.geo.map = name;
          callback && callback();
        }
      }
    }
  }
</script>
