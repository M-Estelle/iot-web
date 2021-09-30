<template>
  <div class="new-data-list" >
    <el-table
        :data="newData"
        border
        max-height="300"
        style="width: 100%">
      <el-table-column
          v-for="item in dataTitle"
          :key="item.name"
          :prop="item.name"
          :label="item.title"
          :min-width="comWidth">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "NewDataList",
  props:{
    newData:{
      type:Array,
      default(){
        return []
      }
    },
    dataTitle:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  computed:{
    comWidth(){
      let res=Math.floor(100/this.dataTitle.length)
      return res+'%';
    }
  },
  mounted() {
    console.log(this.comWidth)
  }
}
</script>

<style scoped>

</style>