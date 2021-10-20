<template>
<div class="sensors">
   <img class="blower" :class="[isActive?'animation-turn':'']" src="@/assets/images/blower.png">
   <div class="text"><slot>风扇</slot></div>
</div>
</template>

<script>
export default {
  name: "blower",
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
.animation-turn{
  animation:turn 0.5s linear infinite;
}

.blower{
  width: 150px;
  height: 150px;

}
@keyframes turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}
}

</style>