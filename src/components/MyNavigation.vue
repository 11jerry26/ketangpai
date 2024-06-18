<template>
<!--  导航栏-->
  <div class="navigation">
<!--    logo图标-->
    <div class="logo">
      <router-link to="/homePage"><img alt="ketangpai-logo" src="../assets/images/ketangpai_logo.png"></router-link>
    </div>
<!--    导航栏选项-->
    <div class="nav-option">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="首页" name="/homePage"></el-tab-pane>
        <el-tab-pane label="产品功能" name="/productFunction"></el-tab-pane>
        <el-tab-pane label="机构版" name="/mechanism"></el-tab-pane>
        <el-tab-pane label="渠道合作" name="/cooperation"></el-tab-pane>
        <el-tab-pane label="会员权益" name="/vipPower"></el-tab-pane>
        <el-tab-pane label="帮助中心" name="/helpCenter"></el-tab-pane>
      </el-tabs>
    </div>
<!--    登录注册按钮-->
   <span v-if= isTokenExpired>
     <button class="login" @click="goToLogin">登录</button>
     <button class="register" @click="goToRegister">注册</button>
   </span>
    <span v-else>
      <button class="inClass" @click="getInClass">进入课堂</button>
    </span>
  </div>

</template>

<script>
export default {
  name: 'MyNavigation',
  data(){
    return{
      activeName:this.$route.path,
      isTokenExpired:false
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    goToRegister() {
      this.$router.push('/register')
    },
    handleClick(tab) {
      let tabName = tab.name;
      this.$router.push(tabName);
    },
    getInClass(){
      this.$router.push('/main')
    }
  },
  created() {
    this.isTokenExpired = localStorage.getExpire("token") === null
  }
}
</script>

<style>
.logo img{
  cursor: pointer;
}

.navigation .el-tabs{
  line-height: 76px;
}

.navigation .el-tabs__item {
  height: 40px;
  position: relative;
  color: #3c4043;
  font-weight: 500;
  font-size: 19px;
  padding: 0 20px;
  margin-top: 30px;
}

.navigation .el-tabs__item:hover{
  color: rgb(48,49,51);
}

.navigation .el-tabs__item.is-active{
  color: rgb(48,49,51);
}

.carousel .el-tabs__nav-wrap {
  overflow: hidden;
  margin-bottom: -6px;
  position: relative;
}

.navigation .el-tabs__nav-wrap::after{
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: transparent;
  z-index: 1;
}

.carousel .el-tabs__nav-scroll {
  height: 70px;
  line-height: 70px;
}

.navigation .el-tabs__active-bar{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #4285f4;
  z-index: 1;
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}

.navigation .el-tabs__content{
  overflow: hidden;
  position: relative;
}

.navigation .el-tab-pane{
  display: none;
}
</style>

<style scoped>
.navigation{
  display: flex;
  width: 1224px;
  height: 70px;
  margin: auto;
  flex-direction: row;
  align-items: center;
}

.navigation img{
  display: flex;
  width: 134px;
  margin-right: 48px;
  padding: 18px 0;
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
}

span{
  display: flex;
  width: 200px;
  height: 40px;
  margin-left: 240px;
  margin-top: 10px;
}

.login{
  background-color: white;
  color: rgb(66,133,246);
  border: 1px solid rgb(66,133,246);
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 90px;
  height: 36px;
  line-height: 10px;
  margin-right: 20px;
  text-align: center;
}

.login:hover{
  background-color: rgb(236,243,254);
}
.register{
  background: linear-gradient(131deg,#7eb0ff,#2178ff);
  color: white;
  border: none;
  border-radius: 5px;
  cursor:pointer;
  font-size: 16px;
  width: 90px;
  height: 36px;
  line-height: 10px;
  text-align: center;
}

.inClass{
  background: linear-gradient(131deg,#7eb0ff,#2178ff);
  color: white;
  border: none;
  border-radius: 5px;
  cursor:pointer;
  font-size: 16px;
  width: 130px;
  height: 36px;
  line-height: 10px;
  text-align: center;
  margin-left: 100px;
}

</style>