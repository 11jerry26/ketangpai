<template>
  <div class="head-right">
    <div class="paper"><img src="../assets/images/paper.png" alt="paper"></div>
    <div class="ring"><img src=../assets/images/ring.png alt="ring"></div>
    <div class="avatar">
      <img class="avatarImg" src="../assets/images/avatar.png" alt="avatar" @click.stop="unfoldManu">
      <ul v-show="isShow" ref="showManu">
        <li>
          <img src="../assets/images/VIP.png" alt="vip">
          开通VIP
        </li>
        <li>
          <img src="../assets/images/pin.png" alt="pin">
          机构用户认证
        </li>
        <li>
          <img src="../assets/images/setting.png" alt="setting">
          个人设置
        </li>
        <li @click="exit">
          <img src="../assets/images/exit.png" alt="exit">
          退出登录
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'MyAvatar',
  data(){
    return{
      isShow: false
    }
  },
  methods:{
    unfoldManu(){
      this.isShow = this.isShow !== true;
    },
    exit(){
      localStorage.removeItem("token")
      this.$router.push('/login')
    }
  },
  created() {
    document.addEventListener('click',(e)=>{
      if(this.$refs.showManu){
        let isSelf = this.$refs.showManu.contains(e.target)
        if(!isSelf){
          this.isShow = false
        }
      }
    })
  }
}
</script>

<style scoped>
.head-right{
  display: flex;
  margin-right: 4%;
}

.head-right .paper{
  margin-top: 16px;
  cursor: pointer;
}

.head-right .ring{
  margin-top: 11px;
  cursor: pointer;
}

.avatar{
  margin-top: 9px;
  cursor: pointer;
}

.avatarImg{
  width: 56px;
  height: 45px;
}

.avatar ul{
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  width: 200px;
  margin-top: 20px;
  list-style: none;
  box-shadow: -2px -2px 5px rgb(237,238,243),2px 2px 5px rgb(237,238,243);
  z-index: 3;
}

.avatar ul li{
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 11px;
  margin-bottom: 11px;
  color: rgb(136,136,136);
}

.avatar ul li:hover{
  background-color: rgb(232,240,255);
}

.avatar ul img{
  margin-left: 10px;
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
</style>