<template>
  <div class="control-cartd">
    <el-card class="box-card">
      <div slot="header" class="clearfix title">
      <!--插槽 写入控件名称-->
        <span> {{Api.Name}}</span>
      </div>

      <!--控件内容-->
      <div class="content">
        <!-- 显示控件当前状态     -->
  <!--      <div  class="text item">-->
  <!--        <span class="line-title">状态：</span><span>{{isOpen}}</span>-->
  <!--      </div>-->

        <!--如果参数类型为4的话，显示输入框型更改方式-->
        <div   class="text item">
          <div class="line-title">{{Api.ApiTag}}：</div>
          <el-input
              size="small"
              type="number"
              v-model="value"
              :disabled="canMod"
              placeholder="请输入内容"></el-input>
        </div>

        <!--如果参数类型为1的话，显示开关型更改方式-->
  <!--      <div v-if="Api.OperType===1"  class="text item">-->
  <!--        <span class="line-title">切换状态：</span>-->
  <!--        <el-switch-->
  <!--            class="paddingtop"-->
  <!--            v-model="nowState"-->
  <!--            :disabled="canMod"-->
  <!--            active-text="on"-->
  <!--            inactive-text="off">-->
  <!--      </el-switch>-->
  <!--      </div>-->
      </div>
      <div class="item">
        <el-button type="primary" :disabled="canMod" @click="submitChange" plain>提交设置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {sdkContest,user} from "@/common/const"
export default {
  name: "ControlCard",
  data(){
    return{
      canMod:false, //当前状态是否可以更改，可以为false
      nowState:true, //当前控件状态 开或关 参数为1
      value:'' //参数为4时的值
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
    //传入卡片的详细信息
    Api:{
      type:Object,
      default(){
        return null;
      }
    }
  },
  methods:{
    //设置当前是否可以改变控件的值，当自动控制开启时不可改变
    setCanMod(state){
      if(state)
      this.canMod=false
      else
        this.canMod=true
    },
    //提交当前对控件状态的修改
    submitChange() {
      let that = this
      let params;
      if (this.value === '') {
        this.$message.error('错了哦，没有输入有效值')
        return
      }
      params = this.value
      sdkContest.Cmds(user.devIds,this.Api.ApiTag,params).completed(function(res){
        console.log(res)
        if(res.Status) {
          that.$message({
            showClose: true,
            message: res.Msg
          });
        }
        else{
          that.$message({
            message: '设置成功',
            type: 'success'
          });
        }
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
  width: 150px;
  text-align: center;
  height: auto;
  word-wrap:break-word;
}

.box-card {
  width: 95%;
}
.paddingtop {
  padding-top: 5px;
}
.content{
  display: flex;
  height: auto;
}
</style>