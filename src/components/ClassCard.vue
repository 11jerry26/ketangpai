<template>
  <div style="display: flex;flex-wrap: wrap">
    <div v-for="(course, index) in courses" :key="index">
      <div class="classCard">
        <span class="tag" :class="tagClass(course)">{{ changeType(course.type) }}</span>
        <div class="headerInfo" :class="randomBackground(course.code)" @click="toClassDetail(course)">
          <p class="time">{{ course.year }}   {{course.semester}}</p>
          <h3 class="name">{{ course.name }}</h3>
          <p class="className">{{ course.clazz }}</p>
          <div class="qrCode">
            <img src="../assets/images/afterLogin/codeIcon.svg" alt="myClass-qrcode">
            <span class="classCode">加课码:{{ course.code }}</span>
          </div>
        </div>
        <div class="userInfo">
          <div class="left">
            <span class="role" v-if="yourName !== responsiblePersons[index]">学</span>
            <span class="role1" v-if="yourName === responsiblePersons[index]">教</span>
            <span style="cursor: pointer">负责人:{{ responsiblePersons[index] }}</span>
          </div>
          <div class="right">
            <div class="setTop" @click="updateTopping(course)">取消置顶</div>
            <span>...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name:'ClassCard',
  data() {
    return {
      yourName: '',
      courses:[],
      responsiblePersons:[]
    }
  },
  methods:{
    loadYourToppedCourse(){
      let that = this;
      axios.post("http://localhost:8088/course/selectTop",qs.stringify({
        token: localStorage.getExpire('token'),
      }))
          .then(function (response) {
            let responseMap = response.data;
            that.responsiblePersons = responseMap.names;
            that.courses = responseMap.courses;
          })
          .catch(error => console.error(error));
    },
    changeType(type) {
      if (type === 0) {
        return "线上";
      } else if (type === 1) {
        return "线下";
      } else {
        return "混合";
      }
    },
    tagClass(course) {
      if (course.type === 0) {
        return 'online';
      } else if (course.type === 1) {
        return 'offline';
      } else {
        return 'hybrid';
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
    loadYourName(){
      let that = this;
      axios.post("http://localhost:8088/user/select",qs.stringify({
        token: localStorage.getExpire('token'),
      }))
          .then(function (response) {
            that.yourName = response.data;
          })
          .catch(error => console.error(error));
    },
    toClassDetail(course){
      this.$router.push({ path: '/classDetail', query: { course: JSON.stringify(course)} })
    },
    updateTopping(course) {
      const formData = new FormData();
      formData.append('course', JSON.stringify(course));
      formData.append('name', this.yourName);
      axios.post("http://localhost:8088/course/update", formData)
          .then(function (response){
            location.reload();
          })
          .catch(error => console.error(error))
    }
  },
  created() {
    this.loadYourToppedCourse();
    this.loadYourName();
  }
}
</script>

<style>
.classCard{
  margin: 11px;
  width: 264px;
  height: 234px;
  background: #fff;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.tag{
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
}

.tag.online {
    background: linear-gradient(270deg,#fac966 0,#ffe1ad);
    color: #6b512e;
}

.tag.offline {
  background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
  color: black;
}

.tag.hybrid {
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  color: black;
}

.headerInfo {
  cursor: pointer;
  padding: 18px 24px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-color: #3367d5;
  height: 125px;
}

.headerInfo.classBackGround1{
  background-image: url("../assets/images/top_class1.jpg");
}

.headerInfo.classBackGround2{
  background-image: url("../assets/images/top_class2.jpg");
}

.headerInfo.classBackGround3{
  background-image: url("../assets/images/top_class3.jpg");
}

.headerInfo.classBackGround4{
  background-image: url("../assets/images/top_class4.jpg");
}

.headerInfo.classBackGround5{
  background-image: url("../assets/images/top_class5.jpg");
}

.headerInfo.classBackGround6{
  background-image: url("../assets/images/top_class6.jpg");
}

.headerInfo.classBackGround7{
  background-image: url("../assets/images/top_class7.jpg");
}

.time{
  opacity: .6;
  font-size: 12px;
}

.name{
  margin-top: 3px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  color: #fff;
  line-height: 32px;
}

.className{
  font-weight: 500;
  font-size: 13px;
  text-align: left;
  color: #fff;
  line-height: 24px;
}

.qrCode{
  margin-top: 18px;
  display: flex;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  color: #fff;
  line-height: 16px;
}

.qrCode img{
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 8px;
}

.classCode{
  font-size: 13px;
}

.userInfo{
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

.role{
  background-color: #fff;
  border: 1px solid #4285f4;
  color: #4285f4;
  margin-right: 10px;
}

.role1{
  background-color: #4285f4;
  border: 1px solid #4285f4;
  color: white;
  margin-right: 10px;
}

.setTop{
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
