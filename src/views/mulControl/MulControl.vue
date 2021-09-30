<template>
  <div class="mul-control">
    <!--控件控制模块-->
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

export default {
  name: "MulControl",
  components:{
    ControlCard,
    AutoControl
  },
  methods:{
    changeAuto(state){
      console.log(state)
      this.$refs.card1.setCanMod(!state)
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