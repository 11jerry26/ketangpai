<template>
  <div class="main">
    <div class="mask" v-if="addClassButton || createClassButton"></div>
    <div class="head">
      <div class="head-content">
        <div class="head-left">
          <router-link to="/homePage"><img src="../assets/images/ketangpai_logo.png" alt="ketangpai_logo"></router-link>
        </div>
        <div class="head-middle">
          <div v-if="isStudent">
                      <span>我的课堂</span>
                      <div class="line"></div>
          </div>
          <div v-if="!isShow">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
              <el-tab-pane label="我的课堂" name="first"></el-tab-pane>
              <el-tab-pane label="备课区" name="second"></el-tab-pane>
              <el-tab-pane label="虚拟教研室" name="third"></el-tab-pane>
            </el-tabs>
          </div>
        </div>
       <MyAvatar/>
      </div>
    </div>
    <SideBar/>
    <div class="contentBox">
      <div class="content">
        <div class="topClass">
          <div class="topHandler">
            <h2 class="left">置顶课程</h2>
            <button class="right" @click="addClassButton=true" v-if="isStudent"><i class="el-icon-plus"></i>加入课程</button>

            <el-dropdown trigger="click" v-if="!isStudent" @command="handleCommand">
                <div class="el-dropdown-link">
                  <i class="el-icon-plus"></i> 创建/加入课程
                </div>
                <el-dropdown-menu>
                  <el-dropdown-item command="create">创建课程</el-dropdown-item>
                  <el-dropdown-item command="add">加入课程</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="classBox">
            <div class="classCard">
              <span class="tag">混合</span>
              <div class="headerInfo1">
                <p class="time">2022-2023 第二学期</p>
                <h3 class="name">面向对象程序设计(java)</h3>
                <p class="className">122230201-02</p>
                <div class="qrCode">
                  <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">
                  <span class="classCode">加课码:W8ZKCX</span>
                </div>
              </div>

              <div class="userInfo">
                <div class="left">
                  <span class="role">学</span>
                  <span style="cursor: pointer">负责人:刘洁</span>
                </div>
                <div class="right">
                  <div class="setTop">取消置顶</div>
                  <span>...</span>
                </div>
              </div>
            </div>
            <div class="classCard">
              <span class="tag2">线下</span>
              <div class="headerInfo2">
                <p class="time">2022-2023 第一学期</p>
                <h3 class="name">人工智能导论</h3>
                <p class="className">软件工程22级(两江人工智能学院)</p>
                <div class="qrCode">
                  <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">
                  <span>加课码:J8VXA6</span>
                </div>
              </div>

              <div class="userInfo">
                <div class="left">
                  <span class="role">学</span>
                  <span style="cursor: pointer">负责人:张金荣</span>
                </div>
                <div class="right">
                  <div class="setTop">取消置顶</div>
                  <span>...</span>
                </div>
              </div>
            </div>
            <div class="classCard">
              <span class="tag">混合</span>
              <div class="headerInfo3">
                <p class="time">2022-2023 第一学期</p>
                <h3 class="name">计算机技能训练</h3>
                <p class="className">软件工程专业</p>
                <div class="qrCode">
                  <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">
                  <span>加课码:VY8CKN</span>
                </div>
              </div>

              <div class="userInfo">
                <div class="left">
                  <span class="role">学</span>
                  <span style="cursor: pointer">负责人:刘洁</span>
                </div>
                <div class="right">
                  <div class="setTop">取消置顶</div>
                  <span>...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isStudent">
            <el-tab-pane label="我学的" name="whatILearn" ></el-tab-pane>
            <el-tab-pane label="我协助的" name="whatIAssist"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName2" @tab-click="handleClick1" v-if="!isStudent">
            <el-tab-pane label="我教的" name="whatITeach" >
              <div class="empty-content">
                <el-empty description="暂无课程"></el-empty>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我协助的" name="whatIAssist">
              <div class="empty-content">
                <el-empty description="暂无课程"></el-empty>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我学的" name="whatILearn"></el-tab-pane>
          </el-tabs>
          <el-button style="width: 110px;height: 40px;margin-left: 120px">归档管理</el-button>
          <el-input v-show="!teachInput" v-model="input" placeholder="搜索我学的课程" suffix-icon="el-icon-search" class="search-course"></el-input>
          <el-input v-show="teachInput" v-model="input" placeholder="搜索我教的课程" suffix-icon="el-icon-search" class="search-course"></el-input>
      </div>
      <el-collapse v-model="term" :style="divStyle">
        <el-collapse-item title="2023-2024 第一学期" name="3"></el-collapse-item>
        <el-collapse-item title="2022-2022 第二学期" name="2"></el-collapse-item>
        <el-collapse-item title="2022-2023 第一学期" name="1"></el-collapse-item>
      </el-collapse>
      <!--    <div class="classification" :style="divStyle">-->
      <!--      <div class="title">-->
      <!--        <h3 class="left" style="cursor: pointer">2022-2023第一学期</h3>-->
      <!--        <div class="right">-->
      <!--          <div class="buttonChange">-->
      <!--            <div class="unfold" @click="unfold1" :style="back1">-->
      <!--              <i class="el-icon-caret-bottom"></i>-->
      <!--              <span>展开</span>-->
      <!--            </div>-->
      <!--            <div class="fold" @click="fold1" :style="change1">-->
      <!--              <i class="el-icon-caret-top"></i>-->
      <!--              <span>收起</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="classBox" :style="classBoxStyle1">-->
      <!--        <div class="classCard">-->
      <!--          <span class="tag2">线下</span>-->
      <!--          <div class="headerInfo2">-->
      <!--            <p class="time">2022-2023 第一学期</p>-->
      <!--            <h3 class="name">人工智能导论</h3>-->
      <!--            <p class="className">软件工程22级(两江人工智能学院)</p>-->
      <!--            <div class="qrCode">-->
      <!--              <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">-->
      <!--              <span>加课码:J8VXA6</span>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div class="userInfo">-->
      <!--            <div class="left">-->
      <!--              <span class="role">学</span>-->
      <!--              <span style="cursor: pointer">负责人:张金荣</span>-->
      <!--            </div>-->
      <!--            <div class="right">-->
      <!--              <div class="setTop">取消置顶</div>-->
      <!--              <span>...</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="classCard">-->
      <!--          <span class="tag">混合</span>-->
      <!--          <div class="headerInfo3">-->
      <!--            <p class="time">2022-2023 第一学期</p>-->
      <!--            <h3 class="name">计算机技能训练</h3>-->
      <!--            <p class="className">软件工程专业</p>-->
      <!--            <div class="qrCode">-->
      <!--              <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">-->
      <!--              <span>加课码:VY8CKN</span>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--          <div class="userInfo">-->
      <!--            <div class="left">-->
      <!--              <span class="role">学</span>-->
      <!--              <span style="cursor: pointer">负责人:刘洁</span>-->
      <!--            </div>-->
      <!--            <div class="right">-->
      <!--              <div class="setTop">取消置顶</div>-->
      <!--              <span>...</span>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    </div>-->
<!--      加入课程-->
      <div class="joinTheClass" v-if="addClassButton">
        <div class="top">
          <div class="word">
            <span style="font-size: 20px;font-weight: 600">加入课程</span>
            <i class="el-icon-close" @click="addClassButton=false"></i>
          </div>
          <hr>
        </div>
        <div class="center">
          <img src="../assets/images/asterisk.png" alt="asterisk" class="asterisk">
          <span class="left-word">加课码</span>
          <el-form :model="addRuleForm" status-icon :rules="addRules" class="demo-ruleForm">
            <el-form-item  prop="addCourseCode">
              <el-input v-model="addRuleForm.addCourseCode" autocomplete="off" placeholder="请输入课程加课码" class="inputCode"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <hr>
        <div class="bottom">
          <el-button style="margin-left: 700px" @click="addClassButton=false">取消</el-button>
          <el-button type="primary">确认</el-button>
        </div>
      </div>

<!--      创建课程-->
      <div class="createTheClass" v-if="createClassButton">
        <div class="top">
          <div class="word">
            <span style="font-size: 20px;font-weight: 600">创建课程</span>
            <i class="el-icon-close" @click="createClassButton=false"></i>
          </div>
          <hr>
          <el-tabs v-model="activeName3" @tab-click="handleClick">
            <el-tab-pane label="基本信息(必填)" name="essentialInformation">
              <el-form :model="createRuleForm" status-icon :rules="createRules" ref="createRuleForm"
                       class="demo-ruleForm">
                <div class="item">
                  <img src="../assets/images/asterisk.png" alt="asterisk" class="asterisk">
                  <span class="left-word">课程名称</span>
                  <el-form-item prop="courseName">
                    <el-input v-model="createRuleForm.name" autocomplete="off" class="inputCode"
                              style="width: 1220px"></el-input>
                  </el-form-item>
                </div>
                <div class="item">
                  <img src="../assets/images/asterisk.png" alt="asterisk" class="asterisk">
                  <span class="left-word">教学班级</span>
                  <el-form-item prop="teachingClass">
                    <el-input v-model="createRuleForm.clazz" autocomplete="off" class="inputCode"
                              style="width: 1220px"></el-input>
                  </el-form-item>
                </div>
                <div class="selectTerm">
                  <div>
                    <img src="../assets/images/asterisk.png" alt="asterisk" class="asterisk">
                    <span class="left-word">选择学年 - 学期</span>
                  </div>
                  <el-select v-model="createRuleForm.year" placeholder="请选择学年">
                    <el-option
                        v-for="item in yearOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select v-model="createRuleForm.semester" placeholder="请选择学期">
                    <el-option
                        v-for="item in termOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="more-information" @click="information=!information">
                  <span>更多信息
                    <i class="el-icon-arrow-down" v-show="!information"></i>
                    <i class="el-icon-arrow-up" v-show="information"></i>
                  </span>
                </div>
                <div class="information" v-show="information">
                  <div class="information-box">
                    <div class="up">
                      <p class="radio-margin">授课模式</p>
                      <label>
                        <input type="radio" name="type" value="0" v-model="createRuleForm.type"
                               class="radio-left-right-margin">
                        线上
                      </label>
                      <label>
                        <input type="radio" name="type" value="1" v-model="createRuleForm.type"
                               class="radio-left-right-margin">
                        线下
                      </label>
                      <label>
                        <input type="radio" name="type" value="2" v-model="createRuleForm.type"
                               class="radio-left-right-margin">
                        混合
                      </label>
                      <p class="time-margin">学时数</p>
                      <input type="text" placeholder="请输入学时" class="time-margin1">
                    </div>
                    <div class="center">
                      <p>课程介绍</p>
                      <!--            用VueEditor-->
                      <VueEditor/>
                      <div class="place">
                        <p>授课地点</p>
                        <input type="text" class="place-setting">
                      </div>
                    </div>
                    <div class="footer">
                      <div class="about-institution">
                        <p class="about-institution-word">机构相关</p>
                        <el-switch v-model="value1" active-text="对机构后台可见"></el-switch>
                      </div>
                      <p class="switch-explain">开启后，机构后台管理员可以看见该教师在线上开设的课程及教学情况</p>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <hr>
                  <div class="bottom-content">
                    <span class="mbz"><i class="el-icon-plus"></i> 导入mbz格式课程包</span>
                    <div class="button-box">
                      <el-button class="cancel" @click="createClassButton=false">取消</el-button>
                      <el-button type="primary" id="sure" @click="submitForm">确认</el-button>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="报名设置" name="registrationSettings"></el-tab-pane>
          </el-tabs>
        </div>

    </div>
  </div>
</div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import MyAvatar from "@/components/MyAvatar.vue";
import axios from "axios";
import qs from "qs";
export default {
  name:'MyClass',
  components: {
    MyAvatar,
    SideBar
  },
  data() {
    let checkAddCourseCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填项'));
      }
      else callback()
    }

    let checkCourseName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填项'));
      } else if (value.length > 50) {
        return callback(new Error("长度不超过50"))
      }
      else callback()
    }

    let checkTeachingClass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('必填项'));
      } else if (value.length > 30) {
        return callback(new Error("长度不超过30"))
      }
      else callback()
    }

    return {
      // selectedType:'',
      teachInput:true,
      value1:false,
      information:false,
      isStudent:false,
      addClassButton:false,
      createClassButton:false,
      term: '3',
      isShow: false,
      activeName: 'whatILearn',
      activeName1:'first',
      activeName2:'whatITeach',
      activeName3:'essentialInformation',
      input:'',
      change:{
        display:'block'
      },
      back:{
        display:'none'
      },
      change1:{
        display:'block'
      },
      back1:{
        display:'none'
      },
      divStyle:{
        display:'none'
      },
      classBoxStyle:{
        display: ''
      },
      classBoxStyle1:{
        display: ''
      },
      addRuleForm: {
        addCourseCode: ''
      },
      addRules:{
        addCourseCode: [
            { validator: checkAddCourseCode,trigger:'blur'}
        ]
      },
      createRuleForm:{
        name: '',
        clazz: '',
        year: '',
        semester: '',
        type: ''
      },
      createRules:{
        name:[
          {validator: checkCourseName,trigger:'blur'}
        ],
        clazz:[
          {validator: checkTeachingClass,trigger:'blur'}
        ],
        year:[
          {validator: checkAddCourseCode,trigger:'blur'}
        ],
        semester:[
          {validator: checkAddCourseCode,trigger:'blur'}
        ],
      },
      yearOptions: [{
        value: '2023-2024',
        label: '2023-2024'
      }, {
        value: '2024-2025',
        label: '2024-2025'
      }, {
        value: '2025-2026',
        label: '2025-2026'
      },{
        value: '2026-2027',
        label: '2026-2027'
      }, {
        value: '2027-2028',
        label: '2027-2028'
      }],
      termOptions: [{
        value: '全年',
        label: '全年'
      }, {
        value: '第一学期',
        label: '第一学期'
      }, {
        value: '第二学期',
        label: '第二学期'
      }]
    }
  },
  methods: {
    handleClick(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist'){
        this.divStyle.display = 'none'
      }
      else {
        this.divStyle.display = 'block'
      }
    },
    handleClick1(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist'){
        this.divStyle.display = 'none'
        this.teachInput = false
      }
      else if (tabName === 'whatITeach'){
        this.divStyle.display = 'none'
        this.teachInput = true
      }
      else {
        this.divStyle.display = 'block'
        this.teachInput = false
      }
    },
    checkToken(){
      if (!localStorage.getExpire("token")){
        this.$router.push('/login')
      }
    },
    fold(){
      this.classBoxStyle.display = 'none'
      this.change.display = 'none'
      this.back.display = 'block'
    },
    unfold(){
      this.classBoxStyle.display = 'block'
      this.change.display = 'block'
      this.back.display = 'none'
    },
    fold1(){
      this.classBoxStyle1.display = 'none'
      this.change1.display = 'none'
      this.back1.display = 'block'
    },
    unfold1(){
      this.classBoxStyle1.display = ''
      this.change1.display = 'block'
      this.back1.display = 'none'
    },
    handleCommand(command){
      if (command === 'add'){
        this.addClassButton = true
      }
      else{
        this.createClassButton = true
      }
    },
    submitForm() {
      let that = this
      this.$refs.createRuleForm.validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8088/course/create",
              that.createRuleForm,{headers:{Authorization:localStorage.getExpire('token')}}
          ).then(function (response) {
            if (response.data === "创建成功") {
              // axios.post("http://localhost:8088/teacher-course/create",qs.stringify({
              //       year: that.createRuleForm.yearValue,
              //       term: that.createRuleForm.termValue,
              //       courseName: that.createRuleForm.courseName,
              //       teachingClass: that.createRuleForm.teachingClass,
              //       token: localStorage.getExpire('token'),
              //       addCourseCode: '',
              //       type: that.selectedType,
              //       count: 0
              //     })
              // )
              that.createClassButton = !that.createClassButton
              that.createRuleForm.name = '';
              that.createRuleForm.clazz = '';
              that.createRuleForm.year = '';
              that.createRuleForm.semester = '';
              that.createRuleForm.type = '';
              that.$message({
                message: '创建成功!',
                type: 'success'
              });
            }
          })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  },
  mounted() {
    this.checkToken()
  }
}
</script>


<style scoped>
.head{
  position: relative;
  display: flex;
  height: 64px;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #ccc;
  z-index: 2;
}

.head-content{
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  height: 64px;
  width: 100%;
  padding: 0 28px;
  min-width: 900px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 0 0 #dfdfdf;
  z-index: 1;
}

.head img{
  cursor: pointer;
}

.head-left img{
  width: 112px;
  height: 32px;
}

.head span{
  cursor: pointer;
  font-size: 18px;
}

.head-middle{
  align-items: center;
  position: absolute;
  left: 50%;
  justify-content: center;
  font-size: 21px;
  color: #4285f4;
  margin-left: -65px;
}

.head-middle .line {
  background-color: #4285f4;
  width: 70px;
  height: 3px;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  position: fixed;
  left: 50%;
  top: 62px;
  margin-left: -35px;
}

.head-middle .el-tabs{
  position: absolute;
  left: 50%;
  margin-left: -124px;
  margin-top: -21px;
}

.contentBox{
  width: 1240px;
  margin:0 auto;
}

.contentBox .content{
  display: flex;
  width: 1240px;
  border: 1px solid #dadce0;
  flex-flow: row nowrap;
  border-radius: 8px;
}

.contentBox .topClass{
  padding: 18px;
}

.contentBox .topHandler{
  display: flex;
  justify-content: space-between;
}

.topHandler .left{
  font-size: 20px;
  color: #575a5b;
  font-weight: 500;
}

.contentBox .topHandler button{
  width: 117px;
  height: 36px;
  background-color: rgb(66,133,244);
  color: white;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  padding-left: 27px;
}

.contentBox .topHandler button:hover{
  background-color: rgba(66,133,244,90%);
}

.topClass{
  width: 1150px;
}

.contentBox .classBox{
  max-height: 320px;
  margin: 8px -10px 0;
  display: flex;
  flex-flow: row wrap;
  overflow-y: auto;
}

.contentBox .classCard{
  margin: 11px;
  width: 280px;
  height: 234px;
  background: #fff;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.contentBox .tag{
  width: 62px;
  height: 26px;
  border-radius: 0 0 0 8px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  line-height: 26px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(270deg,#fac966 0,#ffe1ad);
  color: #6b512e;
}

.contentBox .tag2{
  width: 62px;
  height: 26px;
  border-radius: 0 0 0 8px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  line-height: 26px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;background-color: #00ca90;
  color: white;
}

.contentBox .headerInfo1{
  cursor: pointer;
  padding: 18px 24px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-color: #3367d5;
  height: 125px;
  background-image: url("../assets/images/top_class1.jpg");
}

.contentBox .headerInfo2{
  cursor: pointer;
  padding: 18px 24px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-color: #3367d5;
  height: 125px;
  background-image: url("../assets/images/top_class2.jpg");
}

.contentBox .headerInfo3{
  cursor: pointer;
  padding: 18px 24px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-color: #3367d5;
  height: 125px;
  background-image: url("../assets/images/top_class3.jpg");
}

.contentBox .time{
  opacity: .6;
  font-size: 12px;
}

.contentBox .name{
  margin-top: 3px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #fff;
  line-height: 32px;
}

.contentBox .className{
  font-weight: 500;
  font-size: 13px;
  text-align: left;
  color: #fff;
  line-height: 24px;
}

.contentBox .qrCode{
  margin-top: 18px;
  display: flex;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  color: #fff;
  line-height: 16px;
}

.contentBox .qrCode img{
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 8px;
}

.contentBox .classCode{
  font-size: 13px;
}

.contentBox .userInfo{
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 8px 14px 12px;
  font-size: 13px;
  line-height: 16px;
  margin-top: 25px;
}

.contentBox .userInfo .left,.contentBox .userInfo .right{
  display: flex;
  align-items: center;
}

.contentBox .role{
  background-color: #fff;
  border: 1px solid #4285f4;
  color: #4285f4;
  margin-right: 10px;
}

.contentBox .setTop{
  cursor: pointer;
  display: flex;
  align-items: center;
}

.contentBox .middle{
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  color: #575a5b;
  line-height: 24px;
  justify-content: space-between;
}

.contentBox .right{
  display: flex;
  align-items: center;
}

.contentBox .right1{
  width: 180px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.contentBox .classification{
  background: #f8f9fa;
  margin-bottom: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 18px;
}

.contentBox .classification .title{
  display: flex;
  justify-content: space-between;
}

.contentBox .classification .title .right{
  color: rgb(66,133,244);
  cursor: pointer;
}

.contentBox .classification .title .right:hover{
  color: rgba(66,133,244,80%);
}

.contentBox .classification .title span{
  margin-right: 25px;
  margin-left: 10px;
}

.contentBox .classification .left{
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  font:inherit;
  font-weight: 400;
  vertical-align: baseline;
}

.item{
  display: flex;
  align-items: center;
  margin-top: -19px;
}

.search-course{
  margin-left: 15px;
}

.more-information{
    cursor: pointer;
    color: #4285f4;
    margin-top: 20px;
    margin-left: 20px;
}

.information-box{
  width: 94%;
  margin: auto;
}

.radio-margin{
  margin-right: -5px;
}

.radio-left-right-margin{
  margin-left: 25px;
}

.place{
  display: flex;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
}

.place-setting{
  width: 93%;
  height: 35px;
  border: 1px solid rgb(204,204,204);
}
</style>

<style>
.contentBox .middle .left .el-tabs__item {
  font-size: 17px;
}

.contentBox .left .is-active{
  color: #4285f4;
}

.contentBox .left .el-tabs__item:hover{
  color: #4285f4;
}


.contentBox .middle .left .el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #4285f4;
  z-index: 1;
  transition: transform .3s cubic-bezier(.645,.045,.355,1);
  list-style: none;
}

.contentBox .middle .right .el-button{
  margin-right: 30px;
  width: 100px;
}

.contentBox .middle .right .el-input__inner{
  border-radius: 20px;
  width: 212px;
}

.contentBox .middle .right .el-input__suffix{
  cursor: pointer;
}

.contentBox .joinTheClass .el-icon-close{
  font-size: 27px;
  cursor: pointer;
}

.joinTheClass{
  position: absolute;
  top: 30%;
  left: 50%;
  margin: -120px 0 0 -440px;
  width: 880px;
  border-radius: 10px;
  z-index: 101;
  background-color: white;
}

.createTheClass{
  position: absolute;
  top: 18%;
  left: 50%;
  margin: -120px 0 0 -680px;
  width: 1360px;
  border-radius: 10px;
  z-index: 101;
  background-color: white;
}

.createTheClass .el-tabs__nav-wrap::after{
  height: 0;
}

.joinTheClass .top,.createTheClass .top{
  width: 100%;
}

.joinTheClass .top .word,.createTheClass .top .word{
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 15px;
}

.joinTheClass .center{
  display: flex;
  align-items: center;
  height: 115px;
}

.joinTheClass .bottom{
  height: 60px;
  display: flex;
  align-items: center;
}

.asterisk{
  width: 9px;
  margin-left: 30px;
  margin-right: 3px;
  height: 9px;
}

.left-word{
  font-size: 15px;
  margin-right: 8px;
}

.inputCode{
  width: 770px;
  margin-top: 20px
}

.joinTheClass .bottom .el-button{
  width: 80px;
  height: 45px;
}

.createTheClass .selectTerm{
  display: flex;
  width: 650px;
  justify-content: space-between;
  align-items: center;
}

.createTheClass .bottom{
  margin-top: 20px;
}

.createTheClass .bottom .bottom-content{
  width: 90%;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: space-between;
}

.mbz{
  white-space: nowrap;
  color: rgb(116,166,247);
  cursor: pointer;
}

.createTheClass .button-box{
  margin: 10px 0;
}

.createTheClass .information{
  width: 95%;
  margin:10px auto;
  background-color: rgb(248,249,250);
}

.createTheClass .information .up{
  display: flex;
  align-items: center;
}

.empty-content{
  width: 960px;
  position: relative;
  padding-right: -100px;
  left: 50%;
  margin-left: -210px;
}

hr{
  background-color: rgb(218,220,224);
  border: none;
  height: 1px;
}

.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 100;
}

.time-margin {
  margin-left: 50px;
  margin-top: 15px;
}

.time-margin1 {
  margin-top: 15px;
  margin-left: 7px;
  width: 115px;
  height: 25px;
}

.createTheClass .center{
  margin-top: 25px;
}

.about-institution{
  display: flex;
}

.switch-explain {
  color: rgb(153,153,153);
  font-size: 14px;
  margin-top: 3px;
  padding-bottom: 20px;
}

.about-institution-word{
  margin-right: 15px;
}

.createTheClass .footer{
  margin-top: 15px;
}

.el-message{
  background-color: black;
  top: 750px !important;
  z-index: 200;
}

.el-message .el-message__content,.el-message .el-icon-success{
  color: white;
}
</style>

<style>
.head-middle .el-tabs .el-tabs__item:nth-child(2),.head-middle .el-tabs .el-tabs__item:nth-child(3),.head-middle .el-tabs .el-tabs__item:nth-child(4){
  font-size: 19px;
  height: 55px;
  line-height: 45px;
  padding-right: 40px;
}

.head-middle .el-tabs .el-tabs__active-bar{
  height: 3px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}

.el-dropdown-link{
  width: 130px;
  height: 30px;
  text-align: center;
  color: white;
  background-color: rgb(66,133,244);
  border-radius: 10px;
  padding-top: 10px;
  cursor: pointer;
}

.el-dropdown-link:hover{
  background-color: rgba(66,133,244,80%);
}

.el-icon-close{
  font-size: 25px;
}

.el-switch__label * {
  line-height: 1;
  font-size: 16px;
  display: inline-block;
}
.createTheClass .el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform .3s;
  float: left;
  z-index: 2;
  margin-left: 33px;
  margin-top: 25px;
}

.createTheClass .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 0;
  font-size: 18px;
}

.createTheClass .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: 0;
  font-size: 18px;
}

.middle .el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  position: relative;
}

.middle .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 260px;
  height: 2px;
  background-color: #E4E7ED;
  z-index: 1;
}

.topClass .el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
  width: 120px;
}

.topClass .el-dropdown-link {
  width: 170px;
  height: 30px;
  text-align: center;
  color: white;
  background-color: rgb(66,133,244);
  border-radius: 10px;
  padding-top: 10px;
  cursor: pointer;
  position: relative;
  right: 0;
}

.search-course .el-input__icon {
  height: 0;
  width: 25px;
  text-align: center;
  transition: all .3s;
  line-height: 40px;
}

.middle .el-input__inner {
  padding-right: 30px;
  border-radius: 20px;
}

.middle .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 500px 15px 0;
}

</style>
