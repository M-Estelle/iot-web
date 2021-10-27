<template>
  <div class="data-view">

    <temperature class="box"></temperature>

    <current-data-search></current-data-search>

    <!-- 图书管理系统数据   -->
    <new-data-list
        :dataTitle="readerTitle"
        class="search"
        :new-data="readerTableData"/>


<!--    <fuzzy-data-search></fuzzy-data-search>-->

    <libray-search></libray-search>

  </div>
</template>

<script>

import NewDataList from "@/views/dataShow/childComonts/NewDataList";
import temperature from "@/components/content/temperature";
// import FuzzyDataSearch from "@/views/dataShow/childComonts/FuzzyDataSearch";
import CurrentDataSearch from "@/views/dataShow/childComonts/CurrentDataSearch";
import LibraySearch from "@/views/dataShow/childComonts/LibraySearch";
import {reader,readerlist} from "@/common/library"

export default {
  name: "DataShow",
  components:{
    NewDataList,
    temperature,
    // FuzzyDataSearch,
    CurrentDataSearch,
    LibraySearch
  },
  data() {
    return {
      readerTitle:[],
      readerTableData:[],

    }
  },

  created() {
    //从const文件夹读取表头信息
    this.readerTitle=reader
    this.readerTableData=readerlist

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