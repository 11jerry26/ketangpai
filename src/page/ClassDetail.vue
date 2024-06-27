<template>
  <div class="courseDetailPage">
    <div class="head">
      <div class="head-content">
        <i class="el-icon-s-fold"></i>
        <div class="head-middle">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">我的课堂</el-breadcrumb-item>
            <el-breadcrumb-item>课程内容</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <MyAvatar/>
      </div>
    </div>
    <div class="card">
      <div class="cardPic" :class="randomBackground(course.code)">
        <h1 class="courseName">{{course.name}}</h1>
        <h2 class="className">{{course.clazz}}</h2>
        <div class="codeBox">
          <img class="codeIcon" src="../assets/images/afterLogin/codeIcon.svg" alt="myClass-qrcode">
          <div class="code">加课码:{{course.code}}</div>
          <div class="text" >已有{{course.count}}人加入</div>
        </div>
        <el-button class="cardPicBtn" disabled><i class="el-icon-video-play"></i>暂无课堂</el-button>
      </div>
      <div class="cardNav">
        <div class="navBtns">
          <div class="btn" :class="select==='learning'?'active':''" @click="selector('learning')">课程学习</div>
          <div class="btn" :class="select==='analyse'?'active':''" @click="selector('analyse')">学期分析</div>
          <div class="btn" :class="select==='scores'?'active':''" @click="selector('scores')">成绩管理</div>
          <div class="btn" :class="select==='introduction'?'active':''" @click="selector('introduction')">课程介绍</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import MyAvatar from "@/components/MyAvatar.vue";
import axios from "axios";
import qs from "qs";

export default {

  name: "classDetail",
  components: {MyAvatar},

  data(){
    return{
      course: null,
      select:'learning',
      code:'',
      courseDetail:''
    }
  },
  mounted() {
    this.course = JSON.parse(this.$route.query.course);
    this.code = this.course.code;
    this.loadCourse();
  },
  methods:{
    loadCourse() {
      let that = this;
      axios.post("http://localhost:8088/course/selectCourse",qs.stringify({
        code:this.code
      }))
          .then(function (response) {
            that.course = response.data;
          })
    },
    selector(index){
      if (this.$route.name !== index){
        this.select = index
        this.$router.push({name: index,
          query: {
            course: JSON.stringify(this.course)
          }
        })
      }
    },
    //根据课程码的首个字符设定背景实现随机背景效果
    randomBackground(code) {
      let alpha = code[0];
      if (alpha === "A" || alpha === "B" || alpha === "C") {
        return 'classBackGround1';
      } else if (alpha === "A" || alpha === "B" || alpha === "C" || alpha === "D" || alpha === "1") {
        return 'classBackGround2';
      } else if (alpha === "E" || alpha === "F" || alpha === "G" || alpha === "H" || alpha === "2") {
        return 'classBackGround3';
      } else if (alpha === "I" || alpha === "J" || alpha === "K" || alpha === "L" || alpha === "3") {
        return 'classBackGround4';
      } else if (alpha === "M" || alpha === "N" || alpha === "O" || alpha === "P" || alpha === "4") {
        return 'classBackGround5';
      } else if (alpha === "Q" || alpha === "R" || alpha === "S" || alpha === "T" || alpha === "5") {
        return 'classBackGround6';
      } else if (alpha === "U" || alpha === "V" || alpha === "W" || alpha === "X" || alpha === "6") {
        return 'classBackGround7';
      } else {
        return 'classBackGround7';
      }
    },
  }

}
</script>

<style>
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

.head span{
  font-size: 16px;
}

.el-icon-s-fold {
  font-size: 20px;
}

.head-middle{
  position: absolute;
  left: 7%;
  color: #4285f4;
}

.el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>

<style scoped>
.courseDetailPage {
  text-align: left;
  margin: 0 auto;
  max-width: 1320px;
  background-color: #fff;
}

.card {
  overflow: hidden;
  border-radius: 8px;
  color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.cardPic {
  position: relative;
  height: 200px;
  padding: 24px;
  background-repeat: no-repeat;
  background-size: cover;
}

.cardPic.classBackGround1{
  background-image: url("../assets/images/top_class1.jpg");
}

.cardPic.classBackGround2{
  background-image: url("../assets/images/top_class2.jpg");
}

.cardPic.classBackGround3{
  background-image: url("../assets/images/top_class3.jpg");
}

.cardPic.classBackGround4{
  background-image: url("../assets/images/top_class4.jpg");
}

.cardPic.classBackGround5{
  background-image: url("../assets/images/top_class5.jpg");
}

.cardPic.classBackGround6{
  background-image: url("../assets/images/top_class6.jpg");
}

.cardPic.classBackGround7{
  background-image: url("../assets/images/top_class7.jpg");
}


.courseName {
  font-size: 36px;
  font-weight: 400;
}

.className {
  font-size: 20px;
  line-height: 32px;
  font-weight: 400;
}

.codeBox {
  margin-top: 55px;
  display: flex;
  line-height: 16px;
}

.codeIcon {
  width: 16px;
}

.code {
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  margin-right: 16px;
}

.text{
  font-size: 14px;
}

.cardPicBtn{
  position: absolute;
  right: 24px;
  bottom: 24px;
  cursor: not-allowed;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
}

.el-icon-video-play{
  font-size: 16px;
  margin-right: 8px;
}

.cardNav {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  padding: 12px 0;
  height: 40px;
}

.navBtns{
  margin: 0 auto;
  color: rgb(60, 64, 67);
  display: flex;
  width: fit-content;
}

.btn{
  margin: 0 24px;
  padding: 0 5px;
  font-size: 20px;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
}

.active{
  background: #e8f0ff;
  color: #4285f4;
}

</style>
