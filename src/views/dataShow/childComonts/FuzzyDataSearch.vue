<template>
  <div class="fuzzdata">
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
      <!--          :change="newCharts"-->
      <el-switch
          v-model="showSearchChart"
          active-text="on"
          inactive-text="off">
      </el-switch>
    </div>
    <div class="search clearfix min" v-if="showSearchChart">
      <template v-for="(item,index) in list2">
        <achat :title="item.ApiTag" :key="index" :ChatData="item.PointDTO"></achat>
      </template>
    </div>
  </div>
</template>

<script>
import MoreForm from "@/components/content/MoreForm";
import achat from "@/components/achat";
import NewDataList from "@/views/dataShow/childComonts/NewDataList"

import {searchTitle,ExelTitle} from "@/common/const";
export default {
  name: "FuzzyDataSearch",
  components:{
    achat,
    NewDataList,
    MoreForm,
  },
  data(){
    return{
      searchTitle:[],//搜索数据表格的表头
      tableSearch:[],//搜索数据表格的数据
      spanArr:[],//搜索数据表格的合并行的数组
      showSearchChart:false,//是否展示搜索数据的图表
      list2:[],//搜索数据图表的内容
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
   当搜索模块的组件检测到数据获取成功时调用
   1.生成搜索数据表格的合并行的数组
   2.将数据渲染到表格以及图表视图上
    */
    clearData(){
      this.tableSearch = []
      this.list2=[]
    },
    searchData(list){
      this.clearData()
      console.log(list)
      if(this.showSearchChart){
        this.showSearchChart=false
      }//如果当前图表打开则关闭

      let arr=[]  //记录表格列合并数组
      for(let i=0;i<list.length;i++){
        // 遍历返回结果，将每条数据插入图表中
        this.list2.push(list[i])
        // 将同种类型的数据条数记录，用于表格的合并
        arr.push(list[i].PointDTO.length)

        for(let j=0;j<list[i].PointDTO.length;j++){
          if(j!==0) {
            arr.push(0);
          }
          // 遍历返回结果，将每条数据插入表格中
          let item={'ApiTag':list[i].ApiTag,'Value':list[i].PointDTO[j].Value,'RecordTime':list[i].PointDTO[j].RecordTime}
          this.tableSearch.push(item)
        }
      }
      this.spanArr=arr
    },

  },
  created() {
    //从const文件夹读取表头信息
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