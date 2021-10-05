import 
<template>
  <div class="control-cartd">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
      <!--插槽 写入控件名称-->
        <span> <slot name="title"></slot></span>
      </div>

      <!-- 显示控件当前状态     -->
<!--      <div  class="text item">-->
<!--        <span class="line-title">状态：</span><span>{{isOpen}}</span>-->
<!--      </div>-->

      <!--如果参数类型为4的话，显示输入框型更改方式-->
      <div v-if="Api.OperType===4"  class="text item">
        <div class="line-title">{{Api.Name}}：</div>
        <el-input
            size="small"
            v-model="valus"
            :disabled="canMod"
            placeholder="请输入内容"></el-input>
      </div>

      <!--如果参数类型为1的话，显示开关型更改方式-->
      <div v-if="Api.OperType===1"  class="text item">
        <span class="line-title">切换状态：</span>
        <el-switch
            class="paddingtop"
            v-model="nowState"
            :disabled="canMod"
            active-text="on"
            inactive-text="off">
      </el-switch>
      </div>

      <div class="item">
        <el-button type="primary" :disabled="canMod" @click="submitChange" plain>提交设置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {sdkContest} from "@/common/const"
export default {
  name: "ControlCard",
  data(){
    return{
      canMod:false, //当前状态是否可以更改，可以为false
      nowState:true, //当前控件状态 开或关
      setValus:null,
      valus:''
    }
  },
  computed:{
    isOpen(){
      if(this.nowState===true){

        return '开'
      }
      else{
        return '关'
      }
    }
  },
  props:{
    name:{
      type:String,
      default(){
        return '';
      }
    },

    Api:{
      type:Object,
      default(){
        return null;
      }
    }
  },
  methods:{
    setCanMod(state){
      if(state)
      this.canMod=false
      else
        this.canMod=true
    },
    submitChange(){
      // console.log(this.Api)
      let params;
      if(this.Api.OperType==4){
        params=this.valus
      }
      else{
        params=this.nowState
      }
      sdkContest.Cmds('322860',this.Api.ApiTag,params).completed(function(res){
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: 600;
}
.text {
  font-size: 14px;
  width: auto;
  height: 32px;
  line-height: 32px;
}

.item {
  display: flex;
  margin-bottom: 18px;
}

.line-title{
  width: 90px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 95%;
}
.paddingtop {
  padding-top: 5px;
}
</style>