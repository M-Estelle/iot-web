<template>
  <el-card class="box-card">
    <div class="text item">
      是否开启自动控制:
      <el-switch
          v-model="isOpen"
          active-text="on"
          inactive-text="off">
      </el-switch>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "AutoControl",
  data(){
    return{
      isOpen:false
    }
  },
  watch:{
    isOpen(newState,oldState){
      console.log("mei",oldState)
      this.$emit('autoChange',newState)
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  text-align: center;
}
</style>