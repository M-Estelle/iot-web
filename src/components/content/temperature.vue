<template>
  <div class="temperature">
    <div class="label" >当前温度：<span>{{ temp_cur }}</span> ℃
      <el-tag v-if="returnState===30" type="danger">高于上限温度</el-tag>
      <el-tag v-if="returnState===50" type="danger">当前没有有效值</el-tag>
      <el-tag v-if="returnState===0" type="danger">获取温度失败</el-tag>
      <el-tag v-if="returnState===10" type="danger">低于下限温度</el-tag>
      <el-tag v-if="returnState===20" type="success">正常</el-tag>
    </div>
  </div>
</template>

<script>
import {user,sdkContest} from "@/common/const";

export default {
  name: "temperature",
  data(){
    return{
      state:0,
      temp_up:null,
      temp_low:null,
      temp_cur:''
    }
  },
  computed:{
    returnState(){
      if (this.temp_cur===null||this.temp_up===null||this.temp_low===null){
        return 0
      }
      else if(this.temp_low>this.temp_up){
        return 50
      }
      else if(this.temp_cur>this.temp_up){
        return 30
      }
      else if(this.temp_cur<this.temp_low){
        return 10
      }
      else {
        return 20
      }
    }
  },
  methods:{
    getTemperature(){
      console.log('1111111')
      let that=this
      sdkContest.getDeviceInfo(user.devIds).completed(function(res){
        for(let item of res.ResultObj.Sensors){
          if(item.ApiTag=="temp_up" && that.temp_up !== item.Value){
            that.temp_up = item.Value
          }
          if(item.ApiTag=="temp_low" && that.temp_low !== item.Value){
            that.temp_low = item.Value
          }
          if(item.ApiTag=="temp_cur" && that.temp_cur !== item.Value){
            that.temp_cur = item.Value
          }
        }
      })
    }
  },
  mounted() {
    // this.getTemperature()
    let that=this
    setInterval(that.getTemperature(), 300);
  }
}
</script>

<style scoped>
.label{
 padding: 30px 0;
  height: 25px;
  line-height: 25px;
  font-size: 22px;
  font-weight: 600;
}
</style>