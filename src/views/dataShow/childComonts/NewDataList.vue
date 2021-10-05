<template>
  <div class="new-data-list" >
    <el-table
        :data="newData"
        border
        max-height="400"
        :span-method="objectSpanMethod"
        style="width: 100%">
      <el-table-column
          v-for="item in dataTitle"
          :key="item.name"
          :prop="item.name"
          :label="item.title"
          :min-width="comWidth">
      </el-table-column>
<!--       :span-method="objectSpanMethod"--->
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
    },
    spanArr:{
      type:Array,
      default(){
        return []
      }
    }
  },
  computed:{
    cmpArr(){
      if(this.spanArr.length===0){
        let arr=[]
        for(let i=0;i<this.newData.length;i++){
          arr.push(1)
        }
        return arr
      }
      else {
        return this.spanArr
      }
    },
    comWidth(){
      let res=Math.floor(100/this.dataTitle.length)
      return res+'%';
    }
  },
  mounted() {
    // console.log(this.comWidth)
  },
  methods:{
    // eslint-disable-next-line no-unused-vars
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
      if (columnIndex === 0) {
        const _row = this.cmpArr[rowIndex];
        const _col = _row>0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }

    }
  }
}
</script>

<style scoped>

</style>