<template>
  <div class="senser">
    <div class="smoke-out">
      <div class="smoke-bg" :class="[isActive?'animation-twinkle':'']"></div>
      <img class="sensor-iner" src="@/assets/images/smoke.png">
    </div>
    <div class="text"><slot>烟雾报警器</slot></div>
  </div>
</template>

<script>
export default {
  name: "smoke",
  props:{
    isActive: {
      type: Boolean,
      default(){
        return false
      }
    },
  }
}
</script>

<style scoped>
.senser{
  width: 150px;
  height: 200px;
}
.text{
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
}
.smoke-out{
  width: 150px;
  height: 150px;
  position: relative;
}
.sensor-iner{
  width: 135px;
  height: 130px;
  padding-top: 11px;
  padding-left: 6px;
}
.smoke-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.animation-twinkle{
  background: url("~@/assets/images/smoke_active.png") no-repeat;
  background-size: 150px 150px;
  animation:twinkle 0.5s linear infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
}
</style>