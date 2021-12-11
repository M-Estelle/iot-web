<template>
  <div class="temperature">
    <div class="label" >当前温度：<span>{{ temp_cur }}</span> ℃
      <el-tag v-if="returnState===30" type="danger">高于上限温度</el-tag>
      <el-tag v-if="returnState===50" type="danger">当前没有有效值</el-tag>
      <el-tag v-if="returnState===0" type="danger">获取温度失败</el-tag>
      <el-tag v-if="returnState===10" type="danger">低于下限温度</el-tag>
      <el-tag v-if="returnState===20" type="success">正常</el-tag>
    </div>
    <blower class="senser" :isActive="returnState===30">风扇1</blower>
    <blower class="senser" :isActive="returnState===20">风扇2</blower>
    <alarm class="senser" :isActive="returnState===10"></alarm>
    <machinery class="senser" :isActive="0"></machinery>
<!--    <el-button @click="modify">修改</el-button>-->
  </div>
</template>

<script>
import {user,sdkContest} from "@/common/const";
import blower from "@/components/content/blower";
import alarm from "@/components/content/alarm";
import machinery from "./machinery";

export default {
  name: "temperature",
  components:{
    blower,
    alarm,
    machinery
  },
  data(){
    return{
      state:0,
      temp_up:null,
      temp_low:null,
      temp_cur:'',
      timer:null,
      isActive:false,

    }
  },
  computed:{
    returnState(){
      if (this.temp_cur===null||this.temp_cur===''||this.temp_up===null||this.temp_up===''||this.temp_low===null||this.temp_low===''){
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
      let that=this
      sdkContest.getDeviceInfo(user.devIds).completed(function(res){
        // console.log(res)
        for(let item of res.ResultObj.Sensors){
          if(item.ApiTag==="temp_up" && that.temp_up !== item.Value){
            that.temp_up = item.Value
          }
          if(item.ApiTag==="temp_low" && that.temp_low !== item.Value){
            that.temp_low = item.Value
          }
          if(item.ApiTag==="temp_cur" && that.temp_cur !== item.Value){
            that.temp_cur = item.Value
          }
        }
      })
    },
    modify(){
      this.isActive=!this.isActive
    }
  },
  mounted() {
    this.getTemperature()
    let that=this
    that.timer=setInterval(that.getTemperature, 3000);
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
.senser{
  display: inline-block;
  width: 50%
}
</style>