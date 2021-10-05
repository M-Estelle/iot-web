<template>
  <div class="data-view">

    <!--    实时数据展示      -->
    <div class="search label">实时数据<el-button type="primary" class="floatr" @click="getCurrentData">获取数据</el-button></div>

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
      <el-button @click="newCharts" type="primary" plain>生成图表</el-button>
    </div>
    <div class="search clearfix min" v-if="showCurrentChart">
      <achat :chat-data="list1" ref="chart"></achat>
    </div>

    <!--   历史数据搜索模块    -->
    <div class="search label">模糊数据搜索</div>
    <div class="search aborder">
      <more-form @showSearchData="searchData"></more-form>
    </div>


    <new-data-list
        :dataTitle="searchTitle"
        class="search"
        :new-data="tableSearch"
        :spanArr="spanArr"/>

    <!-- 搜索数据图表  <el-button @click="newCharts" type="primary" plain>生成图表</el-button> -->
    <div class="search label">是否展示搜索数据图表
      <el-switch
          :change="newCharts"
          v-model="showSearchChart"
          active-text="on"
          inactive-text="off">
      </el-switch>
      <el-button @click="SearchCharts" type="primary" plain>生成图表</el-button>
    </div>
    <div class="search clearfix min" v-if="showSearchChart">
      <template v-for="item in list2">
<!--        hello {{item.ApiTag}} {{item.PointDTO}}-->
        <achat :title="item.ApiTag" :key="item.ApiTag" :ChatData="item.PointDTO"></achat>
      </template>
    </div>


  </div>
</template>

<script>

import achat from "@/components/achat";
import NewDataList from "@/views/dataShow/childComonts/NewDataList";
import MoreForm from "@/components/content/MoreForm";
// import LineForm from "../../components/content/LineForm";

import {dataTitle,sdkContest,searchTitle} from "@/common/const";


export default {
  name: "DataShow",
  components:{
    achat,
    NewDataList,
    MoreForm
  },
  data() {
    return {
      //图像数据1
      title:[],
      tableData: [],
      searchTitle:[],
      tableSearch:[],
      spanArr:[],
      showCurrentChart:false,
      showSearchChart:false,
      list2:[],
      list1: {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          dimensions: ['date'],//每个x轴点显示几个数据 'product', '2015', '2016', '2017'
          source: [
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]//第一个值为x轴上的值，后面为点上的值
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {type: 'category'},
        // 声明一个 Y 轴，数值轴。
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。{type: 'bar'}, {type: 'bar'},{type: 'bar'}
        series: []
      },

    }
  },
  methods:{
    SearchCharts(){
      console.log('1')
    },
    newCharts(){
        for (let item of this.title) {
          // console.log(item.name)
          if (item.name !== 'date')
            this.list1.dataset.dimensions.push(item.name)
        }

        this.list1.dataset.source = []
        for (let item of this.tableData) {
          this.list1.dataset.source.push(item)
        }
        console.log(this.list1.dataset.source)
        // this.list1.dataset.source.push(['9.29', 86.4, 65.2])

        for (let i = 1; i < this.title.length - 1; i++) {
          this.list1.series.push({type: 'line'})
        }
        console.log(this.list1)
        this.$refs.chart.changeCharts(this.list1)

    },
    getCurrentData(){
      let that=this

      sdkContest.getDevicesDatas('322860 ').completed(function(res){
        // console.log(res.ResultObj[0].Datas)
        let beautify={}
        let myDate = new Date();
        beautify['date']=myDate.toLocaleTimeString();
        for (let item of res.ResultObj[0].Datas){
          beautify[item.ApiTag]=item.Value
        }
        that.tableData.push(beautify)
        // console.log(that.tableData)
      })
    },
    searchData(list){
      console.log(list)
      // this.list2=list
      let arr=[]
      for(let i=0;i<list.length;i++){
        this.list2.push(list[i])
         arr.push(list[i].PointDTO.length)
        for(let j=0;j<list[i].PointDTO.length;j++){
          if(j!==0) {
            arr.push(0);
          }
          let item={'ApiTag':list[i].ApiTag,'Value':list[i].PointDTO[j].Value,'RecordTime':list[i].PointDTO[j].RecordTime}
          this.tableSearch.push(item)
        }
      }
      this.spanArr=arr
    },

  },
  created() {
    this.title=dataTitle
    this.searchTitle=searchTitle
  },
  watch:{
    tableDate:{
      handler(val, oldVal){
        console.log(oldVal)
        console.log(val)
      },
      deep:true //true 深度监听
    }
  }
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
  padding: 20px 20px 0px;
  box-sizing: border-box;
}
</style>