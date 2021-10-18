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

  mounted() {
    /*ECharts图表*/
    // console.log(this.$refs.chats)

    let myChart = echarts.init(this.$refs.chats);
    this.theChart=myChart
    // myChart.setOption(this.ChatData)

    myChart.on('click', function(params) {
      console.log(params.name);
    });

    if(this.title!==''){
      this.insertData()
    }
  },
  methods:{
    /*
    更新list
    插入数据
    */
    insertData(){
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
      this.list.series=[{
        type:'line',
        // markPoint: {
        //   data: [
        //     { type: 'max', name: 'Max' },
        //     { type: 'min', name: 'Min' }
        //   ]
        // }, //显示最高点与最低点
        markLine : {
          data : [
            {type : 'average', name: '平均值'}
          ]
        }//显示平均值线
      }]

      // console.log(this.list)
      this.theChart.setOption(this.list)
    },
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