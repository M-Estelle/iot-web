<template>
  <div class="lamp">
    <div class="lamp-out">
      <div class="lamp-bg" :class="[isActive?'animation-twinkle':'']"></div>
      <img v-if="!isActive" class="sensor-iner" src="@/assets/images/lamp.png">
      <img v-else class="sensor-iner" src="@/assets/images/lamp_active.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "lamp",
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
.lamp-out{
  width: 150px;
  height: 150px;
  position: relative;
}
.sensor-iner{
  width: 100px;
  height: 100px;
  padding-top: 30px ;
  padding-left: 24px;
}
.lamp-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.animation-twinkle{
  background: url("~@/assets/images/alarm_light.png") no-repeat;
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