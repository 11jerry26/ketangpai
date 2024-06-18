<template>
  <div class="sideBar">
    <ul>
      <li>
        <i class="el-icon-document"></i>
        <span class="name">待办</span>
      </li>
      <li>
        <img src="../assets/images/chat.png" alt="chat">
        <span class="name">私信</span>
      </li>
      <li>
        <img src="../assets/images/friend.png" alt="friend">
        <span class="name">好友</span>
      </li>
      <li>
        <i class="el-icon-headset"></i>
        <span class="name">客服</span>
      </li>
      <li>
        <img src="../assets/images/official_account.png" alt="official_account">
        <span class="name">公众号</span>
      </li>
      <li>
        <i class="el-icon-edit-outline"></i>
        <span class="name">反馈</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'SideBar'
}
</script>

<style scoped>
.sideBar{
  position: fixed;
  z-index: 1;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 0 18px 0 rgba(0,0,0,0.1);
}

.sideBar ul{
  list-style: none;
}

.sideBar ul li{
  padding: 0 10px;
  cursor: pointer;
  margin-bottom: 12px;
  color: #ff6000;
  text-align: center;
}

.sideBar ul li .name{
  font-size: 14px;
  line-height: 16px
}

.sideBar ul li img{
  display: block;
  margin-left: 3px;
}

.sideBar ul li i{
  display: block;
  margin-top: 10px;
}

.sideBar img{
  width: 36px;
  height: 36px;
}

.el-icon-document,.el-icon-headset,.el-icon-edit-outline{
  font-size: 30px;
}
</style>