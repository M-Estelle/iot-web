<template>
<div class="left-nav">

      <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo leftnav"
          :router="true">

        <el-menu-item  index="/mulControl">
            <i class="el-icon-location"></i>
            <span>模块控制</span>
        </el-menu-item>

        <el-menu-item  index="/DataShow">
          <i class="el-icon-menu"></i>
          <span slot="title">数据显示</span>
        </el-menu-item>

<!--        <el-menu-item index="3">-->
<!--          <i class="el-icon-document"></i>-->
<!--          <span slot="title">导航三</span>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="4">-->
<!--          <i class="el-icon-setting"></i>-->
<!--          <span slot="title">导航四</span>-->
<!--        </el-menu-item>-->

      </el-menu>

</div>
</template>

<script>
export default {
  name: "leftNav",
  data(){
    return {
      activeIndex: '/mulControl',
      // title: '模块控制'
    }
  },
  methods: {
    oneClick(){
      this.$router.replace('/mulControl')
    },
    twoClick(){
      this.$router.replace('/DataShow')
    },

  },
  mounted() {
    if(window.location.pathname!=='/')
    this.activeIndex = window.location.pathname;
    else
      this.activeIndex='/mulControl'
    console.log(this.$route.path)
  }
}
</script>

<style scoped>

.leftnav{
  width: 20%;
  float: left;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 120px;
}

</style>