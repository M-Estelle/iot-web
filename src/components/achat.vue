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
      theChart:null
    }
  },
  props:{
    ChatData:{},
  },
  mounted() {
    /*ECharts图表*/
    // console.log(this.$refs.chats)

    let myChart = echarts.init(this.$refs.chats);
    this.theChart=myChart
    myChart.setOption(this.ChatData)

    myChart.on('click', function(params) {
      console.log(params.name);
    });
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