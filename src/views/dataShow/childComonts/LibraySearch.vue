<template>
  <div class="libraryseach">
    <line-form class="search" @bookSearch="searchBook"></line-form>
    <new-data-list
        :dataTitle="bookTitle"
        class="search"
        :new-data="bookTableData"/>
    <LibraryMoreForm class="search aborder" @showSearchData="searchData"></LibraryMoreForm>
    <!--   历史数据搜索数据表格    -->
    <new-data-list
        :dataTitle="searchTitle"
        class="search"
        :new-data="tableSearch"/>
  </div>
</template>

<script>
import LineForm from "@/components/content/LineForm";
import NewDataList from "@/views/dataShow/childComonts/NewDataList";
import LibraryMoreForm from "@/components/content/LibraryMoreForm";

import {books,searchTitle} from "@/common/library"
import {sdkContest} from "@/common/const";
export default {
  name: "LibraySearch",
  components:{
    LineForm,
    NewDataList,
    LibraryMoreForm
  },
  data(){
    return{
      bookTitle:[],
      bookTableData:[],
      searchTitle:[],//搜索数据表格的表头
      tableSearch:[],//搜索数据表格的数据
      showSearchChart:false,//是否展示搜索数据的图表
    }
  },
  created() {
    //从const文件夹读取表头信息
    this.bookTitle=books
    this.searchTitle=searchTitle
    // this.ExelTitle=ExelTitle
  },
  methods:{
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
  1.生成搜索数据表格的合并行的数组
  2.将数据渲染到表格以及图表视图上
   */
    clearData(){
      this.tableSearch = []
      this.list2=[]
    },
    searchData(list){
      this.clearData()
      // console.log(list)
      if(this.showSearchChart){
        this.showSearchChart=false
      }//如果当前图表打开则关闭

      for(let i=0;i<list.length;i++){
        // 遍历返回结果，将每条数据插入图表中
        // this.list2.push(list[i])
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