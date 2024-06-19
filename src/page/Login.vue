<template>
<div class="login">
  <div class="logo">
    <router-link to="/homePage"><img src="../assets/images/ketangpai_logo.png" alt="ketangpai_logo"></router-link>
  </div>
  <div class="loginContent">
    <div class="left">
      <img src="../assets/images/login_picture.png" alt="login_picture">
    </div>
    <div class="right">
      <div class="rightContent">
        <h2 class="title">
          <span>账号登录</span>
        </h2>
        <ul class="tabs-nav">
          <li class="item"  @click="changeToAccount" :class="{activeLogin: activeTab === 'account'}">
            账号登录
            <i class="line"></i>
          </li>
          <li class="item" @click="changeToPhone" :class="{activeLogin: activeTab === 'sms'}">
            手机短信登录
            <i class="line"></i>
          </li>
          <li class="item" @click="changeToWeChat" :class="{activeLogin:activeTab === 'wechat'}">
            微信登录
            <i class="line"></i>
          </li>
        </ul>
        <div class="loginTab" v-if="showLoginTab">
          <el-form :model="ruleForm" status-icon ref="ruleForm"  :rules="rules" class="demo-ruleForm" v-if="showAccount">
            <el-form-item prop="account">
              <el-input autocomplete="on" v-model="ruleForm.account" placeholder="请输入邮箱/手机号/账号"></el-input>
            </el-form-item>
            <el-form-item prop="password" >
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
          </el-form>


          <el-form :model="ruleForm" status-icon ref="ruleForm"  :rules="rules" class="demo-ruleForm" v-if="showPhone">
            <el-form-item prop="account">
              <el-input autocomplete="on" v-model="ruleForm.account" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password" style="display: flex">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入验证码" style="width: 290px"></el-input>
              <el-button type="primary" style="margin-left: 28px;height: 52px;">发送验证码</el-button>
            </el-form-item>
          </el-form>
          <div class="auto">
            <div class="autoButton">
              <el-checkbox>下次自动登录</el-checkbox>
            </div>
            <a>忘记密码?</a>
          </div>
          <div class="bottomBox">
            <div class="above">
              <el-button type="primary" @click="submitForm">登录</el-button>
            </div>
            <div class="bottom">
              <p>
                还没有账号?
                <router-link to="/register">去注册</router-link>
              </p>
            </div>
          </div>
          <div class="qrBox">
            <div class="qrCode" @click="changeToWeChat"></div>
          </div>
        </div>


        <div class="weChat" v-if="showWeChat">
          <div class="bigQrCode">
            <img class="big-qrcode" src="../assets/images/big-qrcode.png">
          </div>
          <div class="qr-bottomBox">
            <span style="margin-left: 135px;font-size: 18px">二维码2分钟后失效</span>
            <div class="autoButton" style="margin-top: 15px;margin-left: 70px">
              <el-checkbox>下次自动登录</el-checkbox>
            </div>
            <div class="qrBox">
              <div class="qrCode1" @click="changeToAccount"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs"

export default {
  name:'MyLogin',
  data() {
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      }else {
        if (!this.ruleForm.account){
          this.$message.error('用户名不存在')
        }
        callback()
      }
    };
    return {
      showAccount:true,
      showPhone:false,
      showLoginTab: true,
      showWeChat: false,
      activeTab:'account',
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    setActive(tab){
      this.activeTab = tab
    },
    // 登录
    submitForm() {
      let that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8088/user/login',qs.stringify({
            account: that.ruleForm.account,
            password: that.ruleForm.password
          })).then(function (response){
            if (response.data.success === 1){
              localStorage.setExpire("token",response.data.token,1000*60*60*24*7)
              that.$router.push('/main')
            }
            if (response.data.success === 2){
              that.$message.error('密码错误')
            }
            if (response.data.success === 0){
              that.$message.error('用户不存在')
            }
          })
        }
        else{
          console.log('error submit')
          return false
        }
      })
    },
    changeToWeChat(){
      this.activeTab = 'wechat'
      this.showWeChat = true
      this.showLoginTab = false
    },
    changeToAccount(){
      this.activeTab = 'account'
      this.showLoginTab = true
      this.showAccount = true
      this.showPhone = false
      this.showWeChat = false
    },
    changeToPhone(){
      this.activeTab = 'sms'
      this.showLoginTab = true
      this.showWeChat = false
      this.showAccount = false
      this.showPhone = true
    }
  }
}
</script>

<style scoped>
.login{
  position: relative;
  background: #f8f9fa;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /*最小占视窗的高度*/
  min-height: calc(100vh);
}

.login .logo{
  position: absolute;
  top: 48px;
  left: 62px;
  cursor: pointer;
}

.login .logo img{
  display: block;
  max-width: 136px;
  max-height: 34px;
}

.login .loginContent{
  display: flex;
  justify-content: space-between;
}

.login .left{
  margin-right: -100px;
}

.login .left img{
  display: block;
  height: 538px;
}

.login .right .rightContent{
  width: 431px;
  padding: 0 35px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 61px 0 rgba(85,108,144,.07);
}

.login .loginContent .rightContent .title{
  position: relative;
  padding: 18px 0;
  text-align: center;
}

.login .title span{
  font-size: 22px;
  font-weight: 700;
}

.login .loginContent .rightContent .tabs-nav{
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  list-style: none;
}

.login .loginContent .rightContent .tabs-nav .item{
  cursor: pointer;
  position: relative;
  padding-bottom: 9px;
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  color: #74787c;
  line-height: 32px;
}

.tabs-nav li .line{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background-color: rgb(66,133,244);
  display: none;
}

.tabs-nav .activeLogin .line{
  display: block;
}

.login .bottomBox .above{
  margin-top: 12px;
}

.login .auto{
  display: flex;
  justify-content: space-between;
  margin:25px 0;
}

.login .auto a{
  color: rgb(116,120,124);
  cursor: pointer;
  font-size: 14px;
}

.login .bottomBox .above .el-button{
  width: 100%;
  height: 48px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.login .bottomBox .bottom{
  margin-top: 24px;
}

.login .bottomBox .bottom a{
  color: rgb(66,133,244);
  text-decoration: none;
  cursor: pointer;
}

.login .bottomBox .bottom{
  width: 430px;
  height: 18px;
  text-align: right;

}

.login .qrBox{
  overflow: hidden;
  margin: -40px -35px 0;
}

.login .qrCode{
  position: relative;
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: url("../assets/images/login_qrcode.png") no-repeat 0 0/cover;
  transform: rotateY(180deg);
}

.login .qrCode1{
  position: relative;
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: url("../assets/images/login_qrcode.png") no-repeat 0 0/cover;
  background-position: 0 -141px;
  transform: rotateY(180deg);
}
</style>

<style>
.login .rightContent .el-form-item{
  margin-bottom: 16px;
}

.login .rightContent .el-form-item__content{
  line-height: 36px;
  width: 100%;
}

.login .rightContent .el-input{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  border-radius: 10px;
}

.login .rightContent .el-input__inner{
  height: 52px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 16px;
}

.big-qrcode{
  margin-left: 75px;
  margin-top: 20px;
}

.qr-bottomBox{
  margin-top: 20px;
}
</style>
