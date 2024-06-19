<template>
<div class="register">
  <div class="logo">
    <router-link to="/homePage"><img src="../assets/images/ketangpai_logo.png" alt="ketangpai_logo"></router-link>
  </div>
  <div class="registerContent">
    <div class="left">
      <img src="../assets/images/register_picture.png" alt="register_picture">
    </div>
    <div class="right">
      <div class="rightContent">
        <h2 class="title">
          <span>注册账号</span>
        </h2>
        <el-form :model="ruleForm" status-icon :rules="rules" :ref="refName" class="demo-ruleForm">
          <el-form-item  prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" placeholder="请输入邮箱/手机号"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"  placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item  prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码确认"></el-input>
          </el-form-item>
          <div class="roleBox">
            <span>选择身份</span>
            <div class="chooseRole">
              <div class="item" @click="isTeacher" :class="{active: activeTab === 'teacher'}">
                <img src="../assets/images/teacher.png" alt="teacher">
                <p>老师</p>
              </div>
              <div class="item" @click="isStudent" :class="{active: activeTab === 'student'}">
                <img src="../assets/images/student.png" alt="student" style="width: 55px;height: 53px;margin-top: 6px">
                <p>学生</p>
              </div>
            </div>
          </div>
          <el-form-item  prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item  prop="school">
            <el-input type="text" v-model="ruleForm.school" autocomplete="off" placeholder="请输入学校/机构"></el-input>
          </el-form-item>
          <el-form-item  prop="id" :style="isStu">
            <el-input type="text" v-model="ruleForm.id" autocomplete="off" placeholder="请输入学号"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="submitForm">注册</el-button>
        </div>
        <div class="bottom">
          <p>
            已有账号?
            <router-link to="/login">去登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
// import qs from "qs";
export default {
  name:'MyRegister',
  data() {
    let checkAccount = (rule, value, callback) => {

      //电话号码或邮箱验证
      if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value) ||
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)){
        return callback()
      }
      else {
        return callback(new Error('格式不正确'));
      }

    };
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入姓名'));
      }
      else callback()
    };
    let checkSchool = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入学校'));
      }
      else callback()
    };
    let checkID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入学号'));
      }
      else callback()
    };
    let validatePass = (rule, value, callback) => {
      //密码安全强度验证
      if(/(?!\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,20}/.test(value)){
        return callback()
      }
      else {
        return callback(new Error('密码安全强度不足'))
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '' || value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致!'));
      }
      else {
        callback();
      }
    };
    return {
      refName:'ruleForm1',
      inputValue:'',
      activeTab:'teacher',
      isStu:{
        display:'none'
      },
      ruleForm: {
        name:'',
        account: '',
        password: '',
        checkPass: '',
        school:'',
        id:'',
      },
        ruleForm1:{
        name:'',
        account: '',
        password: '',
        checkPass: '',
        school:''
      },
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        school: [
          { validator: checkSchool, trigger: 'blur' }
        ],
        id: [
          { validator: checkID, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm() {
      let that = this
      if (that.activeTab === 'student'){
        this.$refs.ruleForm.validate((valid) => {
          if (valid){
            axios.post('http://localhost:8088/user/register',that.ruleForm).then(function (response){
              console.log(response.data)
              if (response.data === '添加成功') {
                that.$message({
                  message: '注册成功',
                  type: 'success'
                })
                that.$router.push("/login")
              } else if (response.data === '该学号已经存在'){
                that.$message.error('用户已存在')
              } else if (response.data === '该邮箱/手机号已经被注册') {
                that.$message.error('该邮箱/手机号已经被注册')
              } else {
                that.$message.error('用户已存在')
              }
            })
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      }
      if (that.activeTab === 'teacher'){
        that.rules.id = null
        this.$refs.ruleForm1.validate((valid) => {
          if (valid){
            that.ruleForm.id = null;
            axios.post('http://localhost:8088/user/register',that.ruleForm).then(function (response){
              if (response.data === '添加成功') {
                that.$message({
                        message: '注册成功',
                        type: 'success'
                      })
                      that.$router.push("/login")
              } else if (response.data === '该邮箱/手机号已经被注册') {
                that.$message.error('该邮箱/手机号已经被注册')
              } else {
                that.$message.error('用户已存在')
              }
            })
          }
        })
      }
      },
    isTeacher(){
      this.refName = 'ruleForm1'
      this.isStu.display = 'none'
      this.activeTab = 'teacher'
    },
    isStudent(){
      this.refName = 'ruleForm'
      this.isStu.display = 'block'
      this.activeTab = 'student'
      this.inputValue = ''

    }
  }
}
</script>

<style scoped>
.register{
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

.register .logo{
  position: absolute;
  top: 48px;
  left: 62px;
  cursor: pointer;
}

.register .logo img{
  display: block;
  max-width: 136px;
  max-height: 34px;
}

.register .registerContent{
  display: flex;
  justify-content: space-between;
}

.register .left{
  margin-right: -100px;
}

.register .left img{
  display: block;
  height: 538px;
}

.register .right .rightContent{
  width: 431px;
  padding: 0 35px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 61px 0 rgba(85,108,144,.07);
}

.register .registerContent .rightContent .title{
  position: relative;
  padding: 18px 0;
  text-align: center;
}

.register .title span{
  font-size: 28px;
  font-weight: 700;
}

.roleBox{
  margin: 20px 0;
  width: 100%;
}

.roleBox span{
  font-weight: 700;
  font-size: 18px;
  margin:10px 0 10px 0
}

.roleBox .chooseRole{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.roleBox .chooseRole .teacher img,.roleBox .chooseRole .student img{
  width: 50px;
  height: 50px;
  margin:5px 10px 0 10px;
}

.roleBox .chooseRole p{
  margin:17px 5px
}

.roleBox .chooseRole .item{
  width: 190px;
  height: 60px;
  display: flex;
}

.roleBox .chooseRole .active{
  border:1px solid rgb(66,133,244);
}

.register .bottom{
  margin-top: 15px;
  color: #3c4043;
  width: 430px;
  height: 18px;
  text-align: right;
  margin-bottom: 15px;
}

.register .bottom a{
  color: rgb(66,133,244);
  text-decoration: none;
  cursor: pointer;
}

</style>

<style>
.register .rightContent .el-form-item{
  margin-bottom: 16px;
}

.register .rightContent .el-form-item__content{
  line-height: 36px;
  width: 100%;
}

.register .rightContent .el-input{
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  border-radius: 10px;
}

.register .rightContent .el-input__inner{
  height: 52px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 16px;
}

.register .btn{
  margin-top: 20px;
}

.register .btn .el-button{
  width: 100%;
  height: 48px;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
