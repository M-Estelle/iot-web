<template>
<div cl="left-nav">

      <el-menu
          default-active="1"
          class="el-menu-vertical-demo leftnav"
          @open="handleOpen"
          @close="handleClose">

        <el-menu-item @click="oneClick" index="1">
            <i class="el-icon-location"></i>
            <span>模块控制</span>
        </el-menu-item>

        <el-menu-item @click="twoClick" index="2">
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
  methods: {
    oneClick(){
      this.$router.replace('/mulControl')
    },
    twoClick(){
      this.$router.replace('/DataShow')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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