<template>
  <div class="mul-control">
    <!--控件控制模块-->
    <el-input v-model="input" placeholder="用户名" style="width: 500px;margin-left: 90px;margin-bottom: 100px"></el-input>
    <el-input v-model="input2" placeholder="密码" style="width: 500px;margin-left: 90px;margin-bottom: 100px"></el-input>
    <el-button @click="login">登录</el-button>
    <div class="search">
      <control-card ref="card1" :name="'传感器1'" :set-valus="[{title:'最低',value:0},{title:'最高',value:0}]" class="control-card">
        <div slot="title">传感器1</div>
      </control-card>
    </div>

    <div class="search">
      <auto-control @autoChange="changeAuto"></auto-control>
    </div>

  </div>
</template>

<script>
import ControlCard from "@/components/content/ControlCard";
import AutoControl from "@/views/mulControl/childComponent/AutoControl";
import $ from 'jquery'
import "@/network/nlecloud-sdk"
export default {
  name: "MulControl",
  data() {
    return {
      input: '',
      input2:''
    }
  },
  components:{
    ControlCard,
    AutoControl
  },
  methods:{
    changeAuto(state){
      console.log(state)
      $.click()
      this.$refs.card1.setCanMod(!state)
    },
    login(){
      // eslint-disable-next-line no-undef
      const sdkTest = new NLECloudAPI()
      sdkTest.userLogin(this.input,this.input2,true).completed(function(res){
        console.log(res.ResultObj.AccessToken)
      })
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