<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

import leftNav from "@/components/leftNav";

export default {
  name: 'App',
  components: {
    leftNav,
  }
}
</script>

<style>
   @import "./assets/css/base.css";

   .right{
     float:right;
     width:80%;
     /*background-color: #409eff;*/
     height: auto;
   }
</style>
