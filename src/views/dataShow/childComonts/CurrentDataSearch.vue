<template>
  <div class="currentdata">
    <!--    实时数据展示      -->
    <div class="search label">实时数据
      <el-button type="primary" class="floatr" @click="getCurrentData">获取实时数据</el-button>
    </div>

    <new-data-list
        :dataTitle="title"
        class="search"
        :new-data="tableData"/>

    <!-- 实时数据图表  <el-button @click="newCharts" type="primary" plain>生成图表</el-button> -->
    <div class="search label">是否展示实时数据图表
      <el-switch
          :change="newCharts"
          v-model="showCurrentChart"
          active-text="on"
          inactive-text="off">
      </el-switch>
    </div>
    <div class="search clearfix min" v-if="showCurrentChart">
      <el-button @click="newCharts" type="primary" plain>生成图表</el-button>
      <achat :chat-data="list1" ref="chart"></achat>
    </div>
  </div>
</template>

<script>
import achat from "@/components/achat";
import NewDataList from "@/views/dataShow/childComonts/NewDataList";


import {sdkContest,user} from "@/common/const";
import {dataTitle} from "@/common/library"
export default {
  name: "CurrentDataSearch",
  components:{
    achat,
    NewDataList,
  },
  data(){
    return{
      //图像数据1
      title:[],//实时数据图表的表头
      tableData: [],//实时数据图表的数据
      showCurrentChart:false,//是否展示实时数据图表
      list1: {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          dimensions: ['date'],
          source: []//第一个值为x轴上的值，后面为点上的值
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。{type: 'bar'}, {type: 'bar'},{type: 'bar'}
        series: []
      },

    }
  },
  methods:{
    /*
    生成实时数据的图表
    1.插入表头
    2.插入图表数据
    3.生成图表
     */
    newCharts(){
      //插入图表的头
      this.list1.dataset.dimensions=[]
      for (let item of this.title) {
        this.list1.dataset.dimensions.push(item.name)
      }

      //插入图表数据
      this.list1.dataset.source = []
      for (let item of this.tableData) {
        this.list1.dataset.source.push(item)
      }
      for (let i = 0; i < this.title.length - 1; i++) {
        this.list1.series.push({type: 'line'})
      }

      //刷新图表
      this.$refs.chart.changeCharts(this.list1)

    },
    /*
    1.获取实时数据
    2.转化数据格式
    3.往表格中插入数据
     */
    getCurrentData(){
      if(this.showCurrentChart){
        //如果当前展示按钮为开则关闭
        this.showCurrentChart=false
      }
      let that=this
      let titlearr=[]
      for(let i=1;i<this.title.length;i++){
        titlearr.push([this.title[i].name])
      }
      let titlestring=titlearr.join(',')
      sdkContest.getSensors(user.devIds,titlestring).completed(function(res){
        // console.log(res.ResultObj[0].Datas)
        let beautify={}
        let myDate = new Date();
        beautify['date']=myDate.toLocaleTimeString();
        for (let item of res.ResultObj){
          beautify[item.ApiTag]=item.Value
        }
        that.tableData.push(beautify)
        // console.log(that.tableData)
      })
    },


  },
  created() {
    //从const文件夹读取表头信息
    this.title=dataTitle
  },
}
</script>

<style scoped>
.search{
  margin: 20px auto;
  width: 90%;
}
.min{
  min-width: 525px;
  overflow: hidden;
}
.label{
  height: 25px;
  line-height: 25px;
  font-size: 22px;
  font-weight: 600;
}
.aborder{
  border: 1px solid #ebeef5;
  padding: 20px 20px 0;
  box-sizing: border-box;
}
.box{
  margin: 20px auto;
  width: 90%;
}
</style>