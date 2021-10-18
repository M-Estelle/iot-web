<template>
  <div class="data-view">

    <temperature class="box"></temperature>

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
    </div>
    <div class="search clearfix min" v-if="showCurrentChart">
      <el-button @click="newCharts" type="primary" plain>生成图表</el-button>
      <achat :chat-data="list1" ref="chart"></achat>
    </div>

    <!--   历史数据搜索模块    -->
    <div class="search label">模糊数据搜索</div>
    <div class="search aborder">
      <more-form @showSearchData="searchData" ></more-form>
    </div>

    <!--   历史数据搜索数据表格    -->
    <new-data-list
        :dataTitle="searchTitle"
        class="search"
        :new-data="tableSearch"
        :spanArr="spanArr"/>

    <!--   历史数据搜索数据导出功能    -->
    <download-excel
        class = "export-excel-wrapper search"
        :data = "tableSearch"
        :fields = "ExelTitle"
        name = "数据搜索结果.xls">
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </download-excel>

    <!-- 搜索数据图表  -->
    <div class="search label">是否展示搜索数据图表
      <el-switch
          :change="newCharts"
          v-model="showSearchChart"
          active-text="on"
          inactive-text="off">
      </el-switch>
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
import temperature from "@/components/content/temperature";

import {dataTitle,sdkContest,searchTitle,user,ExelTitle} from "@/common/const";


export default {
  name: "DataShow",
  components:{
    achat,
    NewDataList,
    MoreForm,
    temperature
  },
  data() {
    return {
      //图像数据1
      title:[],//实时数据图表的表头
      tableData: [],//实时数据图表的数据
      searchTitle:[],//搜索数据表格的表头
      tableSearch:[],//搜索数据表格的数据
      spanArr:[],//搜索数据表格的合并行的数组
      showCurrentChart:false,//是否展示实时数据图表
      showSearchChart:false,//是否展示搜索数据的图表
      list2:[],//搜索数据表格的内容
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
      //以下为导出功能需要的
      ExelTitle:{},
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
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
        for (let item of this.title) {
          // console.log(item.name)
          if (item.name !== 'date')
            this.list1.dataset.dimensions.push(item.name)
        }

        this.list1.dataset.source = []
        for (let item of this.tableData) {
          this.list1.dataset.source.push(item)
        }
        for (let i = 1; i < this.title.length - 1; i++) {
          this.list1.series.push({type: 'line'})
        }

        // console.log(this.list1)
        this.$refs.chart.changeCharts(this.list1)

    },
    /*
    1.获取实时数据
    2.转化数据格式
    3.往表格中插入数据
     */
    getCurrentData(){
      let that=this

      sdkContest.getSensors(user.devIds,"").completed(function(res){
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
    /*
    当搜索模块的组件检测到数据获取成功时调用
    1.生成搜索数据表格的合并行的数组
    2.将数据渲染到图表视图上
     */
    clearData(){
      this.tableSearch = []
    },
    searchData(list){
      this.clearData()
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
    //从const文件夹读取表头信息
    this.title=dataTitle
    this.searchTitle=searchTitle
    this.ExelTitle=ExelTitle
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