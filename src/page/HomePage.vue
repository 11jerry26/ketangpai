<template>
<div>
  <MyNavigation/>
  <OfficialWebsite/>
  <MyFooter/>
</div>
</template>

<script>
import MyNavigation from "@/components/MyNavigation.vue";
import OfficialWebsite from "@/page/OfficialWebsite.vue";
import MyFooter from "@/components/MyFooter.vue";
export default {
  name:'PageView',
  components:{
    MyNavigation,
    OfficialWebsite,
    MyFooter
  }
}
</script>

<style>

</style>

<style scoped>

</style>