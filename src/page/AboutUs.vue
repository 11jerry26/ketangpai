<template>
  <div>
    <MyNavigation/>
    <div class="footer">
      <MyFooter/>
    </div>
  </div>
</template>

<script>
import MyNavigation from "@/components/MyNavigation.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name:'AboutUs',
  components:{
    MyNavigation,
    MyFooter
  }
}
</script>

<style scoped>
.footer{
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
