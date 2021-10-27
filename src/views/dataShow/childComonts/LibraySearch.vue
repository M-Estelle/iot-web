<template>
  <div class="libraryseach">
    <line-form class="search" @bookSearch="searchBook"></line-form>
    <new-data-list
        :dataTitle="bookTitle"
        class="search"
        :new-data="bookTableData"/>
    <LibraryMoreForm class="search aborder" @showSearchData="searchData" @returnChartDat="getChartData"></LibraryMoreForm>
    <!--   历史数据搜索数据表格    -->
    <new-data-list
        :dataTitle="searchTitle"
        class="search"
        :new-data="tableSearch"/>

    <!-- 搜索数据图表  -->
    <div class="search label">是否展示搜索数据图表
      <!--          :change="newCharts"-->
      <el-switch
          v-model="showSearchChart"
          active-text="on"
          inactive-text="off">
      </el-switch>
    </div>
    <div class="search clearfix min" v-if="showSearchChart">
      <el-button @click="newCharts" type="primary" plain>生成图表</el-button>
      <achat :chat-data="list1" ref="chart"></achat>
    </div>
  </div>
</template>

<script>
import LineForm from "@/components/content/LineForm";
import NewDataList from "@/views/dataShow/childComonts/NewDataList";
import LibraryMoreForm from "@/components/content/LibraryMoreForm";
import achat from "@/components/achat";

import {books,searchTitle} from "@/common/library"
import {sdkContest} from "@/common/const";
export default {
  name: "LibraySearch",
  components:{
    LineForm,
    NewDataList,
    LibraryMoreForm,
    achat
  },
  data(){
    return{
      bookTitle:[],
      bookTableData:[],
      searchTitle:[],//搜索数据表格的表头
      tableSearch:[],//搜索数据表格的数据
      showSearchChart:false,//是否展示搜索数据的图表
      chartlist:[],
      list1: {
        legend: {},
        tooltip: {},
        dataset: {
          // 提供一份数据。
          source: []//第一个值为x轴上的值，后面为点上的值
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。{type: 'bar'}, {type: 'bar'},{type: 'bar'}
        series: []
      },
    }
  },
  created() {
    //从const文件夹读取表头信息
    this.bookTitle=books
    this.searchTitle=searchTitle
    // this.ExelTitle=ExelTitle
  },
  methods:{
    /*
   生成搜索数据的图表
   1.插入表头
   2.插入图表数据
   3.生成图表
    */
    newCharts(){
      //插入图表的头
      this.list1.dataset.source = []
      this.list1.dataset.source=[['data',this.chartlist[0].name,this.chartlist[1].name]]

      //插入图表数据
      console.log(this.chartlist)
      for (let i=0;i<this.chartlist[0].list.length;i++) {
        this.list1.dataset.source.push(
            [this.chartlist[0].list[i].time,this.chartlist[0].list[i].count,this.chartlist[1].list[i].count]
        )
      }
      for (let i = 0; i < 2; i++) {
        this.list1.series.push({type: 'line'})
      }

      //刷新图表
      this.$refs.chart.changeCharts(this.list1)

    },
    getChartData(list){
      console.log(list)
      this.chartlist=list
    },
    searchBook(bookid){
      // console.log(bookid)
      let that=this
      sdkContest.getBookList().completed(function(res){
        // console.log(res.ResultObj)
        for (let item of res.ResultObj){
          if(item['book_id']===bookid) {
            if (item.has_borrowed === 0) {
              item['has_borrowed'] = "未被借阅"
            } else
              item['has_borrowed'] = "已被借阅"
            // console.log(item)
            that.bookTableData.push(item)
          }
        }
      })
    },
    /*
  当搜索模块的组件检测到数据获取成功时调用
  1.生成搜索数据表格
   */
    clearData(){
      this.tableSearch = []
    },
    searchData(list){
      if(list.length===0){
        this.$message({
          message: '当前查询范围内，没有数据',
          type: 'warning'
        });
        return;
      }
      this.clearData()
      // console.log(list)
      if(this.showSearchChart){
        this.showSearchChart=false
      }//如果当前图表打开则关闭

      for(let i=0;i<list.length;i++){
        // 遍历返回结果，将每条数据插入表格中
        this.tableSearch.push(list[i])

      }
    },
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