<template>
  <div class="lock">
    <img v-if="!isActive" class="lock" src="@/assets/images/lock.png">
    <img v-else class="lock" src="@/assets/images/lock_active.png">
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
.lock{
  width: 150px;
  height: 150px;
}
</style>