<template>
  <div class="senser">
    <img v-if="!isActive" class="lock" src="@/assets/images/lock.png">
    <img v-else class="lock" src="@/assets/images/lock_active.png">
    <div class="text"><slot>锁</slot></div>
  </div>
</template>

<script>
export default {
  name: "lock",
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
.lock{
  width: 150px;
  height: 150px;
}
</style>