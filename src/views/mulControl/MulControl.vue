<template>
  <div class="mul-control">
    <!--登录-->
    <div class="search">
      <div class="demo-input-suffix">
        用户名：
        <el-input v-model="input" placeholder="用户名"  ></el-input>
      </div>
      <div class="demo-input-suffix">
        密码：
        <el-input v-model="input2" placeholder="密码" ></el-input>
      </div>

      <el-button @click="login">登录</el-button>
    </div>

    <!--控件控制模块-->
    <div class="search">
      <el-button type="primary" plain @click="getSensors">生成传感器</el-button>
    </div>
    <div v-if="sensors.length!==0" class="search">
      <control-card
          v-for="(item,index) in sensors"
          ref="card" :key="index"
          :name="'item.ApiTag'"
          :Api="item"
          class="control-card">
        <div slot="title">{{item.Name}}</div>
      </control-card>
    </div>

    <!--自动控制-->
    <div class="search">
      <auto-control @autoChange="changeAuto"></auto-control>
    </div>

  </div>
</template>

<script>
import ControlCard from "@/components/content/ControlCard";
import AutoControl from "@/views/mulControl/childComponent/AutoControl";
import {sdkContest} from "@/common/const"

export default {
  name: "MulControl",
  data() {
    return {
      input: '18573242037',
      input2:'tozuki160308',
      haveSensor:false,
      sensors:[]
    }
  },
  components:{
    ControlCard,
    AutoControl
  },
  methods:{
    /*
    当改变自动控制状态时，改变控件是否可改变状态
     */
    changeAuto(state){
      for(let i=0;i<this.$refs.card.length;i++){
        // console.log(this.$refs.card[i])
        this.$refs.card[i].setCanMod(!state)
      }
    },
    login(){
      sdkContest.userLogin(this.input,this.input2,true).completed(function(res){
        console.log(res.ResultObj.AccessToken)
      })
    },
    /*
    获取所有传感器
     */
    getSensors(){
      let that=this
      sdkContest.getProjectSensors(291210).completed(function (res){
        // console.log(res.ResultObj)
        that.sensors=res.ResultObj.filter(item => item.Groups ===2 );
        // console.log(that.sensors)
      })
    }
  },
  watch:{
    /*
    过滤出可以改变状态值的传感器
     */
    sensors:{
      // eslint-disable-next-line no-unused-vars
      handler(val, oldVal){
       if(val.length!==0){
         this.haveSensor=true
       }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
.search{
  margin: 20px auto;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.control-card{
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  margin-top: 20px;
}
</style>