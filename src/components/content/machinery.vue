<template>
<div class="sensors">
  <img class="blower " v-if="isActive=='0'" src="@/assets/images/machinery.png">
  <img class="blower " v-else :class="setState" src="@/assets/images/machinery_active.png">
  <div class="text"><slot>电机</slot></div>
</div>
</template>

<script>
export default {
  name: "machinery",
  props:{
    isActive: {
      type: String,
      default(){
        return 0
      }
    },
  },
  computed:{
    setState(){
      if(this.isActive==1){
        return 'animation-turn'
      }
      else{
        return 'animation-reverse-turn'
      }
    }
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

.animation-reverse-turn{
  animation:reverse-turn 0.5s linear infinite;
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
@keyframes reverse-turn{
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(-90deg);}
  50%{-webkit-transform:rotate(-180deg);}
  75%{-webkit-transform:rotate(-270deg);}
  100%{-webkit-transform:rotate(-360deg);}
}

</style>