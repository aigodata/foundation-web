<template>
  <div>
    <app-pie-chart style="height:200px; width:400px;display:inline-block;" :data="pieData"></app-pie-chart>
    <app-line-chart style="height:200px; width:400px;display:inline-block;" :data="lineData"></app-line-chart>
    <app-topn-bar-chart style="height:200px; width:400px;display:inline-block;" :data="topnBarData"></app-topn-bar-chart>
    <hr>
    <app-stack-bar-chart style="height:200px; width:600px;display:inline-block;" :data="stackBarData"></app-stack-bar-chart>
    <hr>
    <app-sankey-chart style="height:300px; width:100%" :data="sankeyData"></app-sankey-chart>
    <hr>
    <app-graph-chart style="height:300px; width:100%" :data="graphData"></app-graph-chart>
    <hr>
    <app-week-scatter-chart style="height:300px; width:100%" :data="weekScatterData"></app-week-scatter-chart>
    <hr>
    <app-rate-chart :data="0.3921" text="Baidu" color="green" style="height:200px; width:200px;display:inline-block;"></app-rate-chart>
    <app-rate-chart :data="0.61" text="Google"  style="height:200px; width:200px;display:inline-block;"></app-rate-chart>
    <hr>
    <app-map-chart :data="mapData" name="china"  style="height:400px; width:700px;display:inline-block;"></app-map-chart>
    <hr>
    <app-bar-chart :data="barData" style="height:200px; width:500px;display:inline-block;"></app-bar-chart>
    <app-mutil-bar-chart :data="mutilBarData" style="height:200px; width:500px;display:inline-block;"></app-mutil-bar-chart>
  </div>
</template>

<script>
  import lineData from './chartData/line';
  import pieData from './chartData/pie';
  import sankeyData from './chartData/sankey';
  import topnBarData from './chartData/topnBar';
  import stackBarData from './chartData/stackBar';
  import graphData from './chartData/graph';
  import weekScatterData from './chartData/weekScatter';
  import mapData from './chartData/map';
  import barData from './chartData/bar';
  import mutilBarData from './chartData/mutilBar';

  export default {
    name: 'demo-chart',
    data() {
      return {
        pieData,
        lineData,
        sankeyData,
        topnBarData,
        stackBarData,
        graphData,
        weekScatterData,
        mapData,
        barData,
        mutilBarData
      }
    }
  }
</script>
