<template>
  <div>
    <div class="filter">
      <h3>Date filter </h3>
      now:
      <span>{{now}}</span>
      <br> now | date
      <span class="value-converted">{{now | date}}</span>
      <br> now | datetime
      <span class="value-converted">{{now | datetime}}</span>
      <br> now | date('Do MM')
      <span class="value-converted">{{now | date('Do MM')}}</span>
      <br> 日期格式参考
      <a href="http://momentjs.com/docs/#/displaying/">moment</a>
    </div>
    <hr>
    <div class="filter">
      <h3>number filter </h3>
      number:  <span>{{number}}</span>
      <br>
      number | comma <span class="value-converted">{{number | comma}}</span>
      <br>
      number | kmb <span class="value-converted">{{number | kmb}}</span>
      <br>
      decimal | percent <span class="value-converted">{{decimal | percent}}</span>
      <br>
      number | currency <span class="value-converted">{{number | currency}}</span>
      <br>
      number | number('$0a[.]0[00]') <span class="value-converted">{{number | number('$0a[.]0[00]')}}</span>
      <br> 数字格式参考
      <a href="http://numeraljs.com/#format">numeral</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'demo-filter',
    data() {
      return {
        now: new Date(),
        number: 233122,
        decimal: 0.2322
      }
    }
  }
</script>
<style>
  .filter {
    line-height: 1.5em;
    text-align: left;
  }

  .filter .value-converted {
    background-color: #7c7;
  }
</style>
