<template>
<div class="footer">
  <div class="above">
    <div class="left">
      <div class="bottomLogo">
        <img src="../assets/images/bottom-logo.png" alt="bottom-logo">
      </div>
      <ul>
        <li><router-link to="/aboutUs">关于我们</router-link></li>
        <li><router-link to="/clauseService">服务条款</router-link></li>
        <li><router-link to="/productDynamic">产品动态</router-link></li>
        <li><router-link to="/downloadBrowse">浏览器下载</router-link></li>
      </ul>
    </div>
    <div class="right">
      <div class="contact">
        <p>联系我们</p>
        <p>(工作日09:30～18:30)</p>
        <p>
          <img src="../assets/images/telephone.png" alt="telephone">
          010-57748642
        </p>
        <p>
          <img src="../assets/images/letter.png" alt="letter">
          hi@ketangpai.com
        </p>
      </div>
      <div class="qrcode">
        <img src="../assets/images/qrcode_left.png" alt="qrcode_left">
        <p>课堂派客服-派派</p>
      </div>
      <div class="qrcode">
        <img src="../assets/images/qrcode_right.png" alt="qrcode_right">
        <p>扫码开启移动教学</p>
      </div>
    </div>
  </div>
  <div class="bottom">
    <span>
     Copyright © 2014 ketangpai.com All Rights Reserved.
     <a>京ICP备14023276号-4</a>
    </span>
    <span>
      <a>京公网安备 11011402010566号</a>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name:'MyFooter'
}
</script>

<style scoped>
.footer{
  background-color: rgb(39,46,56);
  min-width: 1224px;
}

.above{
  padding: 0 120px;
  display: flex;
  justify-content: space-between;
}

.above .left{
  padding: 65px 0;
}

.above .left .bottomLogo{
  width: 128px;
  margin-bottom: 8px;
}

.above .left ul{
  display: flex;
  margin-top: 30px;
  list-style: none;
}

.above .left li{
  margin-right: 64px;
}

.above .left li a{
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
}

.above .right{
  display: flex;
}

.above .right .contact{
  padding: 60px 0;
  margin-right: 20px;
}

.above .right .contact p{
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  display: flex;
}

.above .right .contact p:nth-child(2) {
  font-size: 10px;
  font-weight: 400;
  color: #6d7790;
  margin-top: 2px;
  margin-left: 5px;
}

.above .right .contact p:nth-child(3) {
  margin: 16px 0;
}

.above .right .contact p img{
  margin-right: 8px;
}

.above .right .qrcode{
  padding: 40px 0;
  margin-left: 20px;
}

.above .right .qrcode img{
  width: 120px;
}

.above .right .qrcode p{
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  text-align: center;
}

.footer .bottom{
  width: 100%;
  height: 48px;
  background: #15191f;
  text-align: center;
}

.footer .bottom span{
  font-size: 12px;
  color: #647184;
  margin-right: 60px;
  line-height: 48px;
}

.footer .bottom span a{
  cursor: pointer;
  text-decoration: none;
  color: #647184;
}
</style>