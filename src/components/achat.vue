<template>
  <div>
    <div id="charts" ref="chats" class="achat"></div>
  </div>
</template>

<script>
var echarts = require('echarts');

export default {
  name: "achat",
  data(){
    return{
      theChart:null,
      list: {
        title:{
          text:'表格一'
        },
        legend: {},
        tooltip: {},
        dataset: {
          // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          // dimensions: ['product', '2015', '2016', '2017'],
          dimensions: [],
           // {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},{type: 'bar'},
            // {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},{type: 'bar'},
           // {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},{type: 'bar'},
            // {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
          source: []
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: []
    },
    }
  },
  props:{
    title: {
      type: String,
      default(){
        return ''
      }
    },
    ChatData:{},
  },
  watch:{
    // eslint-disable-next-line no-unused-vars
    // title(val, oldVal){
    //   this.list.title.text=val;
    //   console.log(this.list)
    // },
    // ChatData:{//深度监听，可监听到对象、数组的变化
    //   // eslint-disable-next-line no-unused-vars
    //   handler(val, oldVal){
    //     this.dataset.dimensions=[]
    //     for(let item of Object.keys(val[0]) ){
    //       this.dataset.dimensions.push(item)
    //     }
    //     this.list.dataset.source=[]
    //     for (let i=0;i<val.length;i++){
    //       this.list.dataset.source.push(val[i])
    //     }
    //     console.log(this.list)
    //     this.theChart.setOption(this.list)
    //
    //   },
    //   deep:true //true 深度监听
    // }
  },
  mounted() {
    /*ECharts图表*/
    // console.log(this.$refs.chats)

    let myChart = echarts.init(this.$refs.chats);
    this.theChart=myChart
    // myChart.setOption(this.ChatData)

    myChart.on('click', function(params) {
      console.log(params.name);
    });

    if(this.ChatData.length!==0){
      this.list.title.text=this.title;
      this.list.dataset.dimensions=[]
      let val=this.ChatData
      for(let item of Object.keys(val[0]) ){
        this.list.dataset.dimensions.push(item)
      }
      this.list.dataset.dimensions.reverse()
      this.list.dataset.source=[]
      for (let i=0;i<val.length;i++){
        this.list.dataset.source.push(val[i])
      }

      this.list.series=[{type: 'line'}]

      console.log(this.list)
      this.theChart.setOption(this.list)
    }
  },
  methods:{
    /*
    更新整个图表
     */
    changeCharts(newData){
      this.ChatData=newData
      this.theChart.setOption(newData)
    },
    /*
    将新数据插入到图表中
     */
    changeDatas(newData){
      this.ChatData.source.push(newData)
      let myChart = this.$refs.chats;
      myChart.setOption(this.ChatData)
    }
  }
}
</script>

<style scoped>
.achat{
  width: 100%;
  min-width: 450px;
  height: 400px;
  float: left;
}
</style>