<template>
<div>
  <div class="middle">
    <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isStu">
      <el-tab-pane label="我学的" name="whatILearn" ></el-tab-pane>
      <el-tab-pane label="我协助的" name="whatIAssist"></el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName2" @tab-click="handleClick1" v-if="!isStu">
      <el-tab-pane label="我教的" name="whatITeach" >
        <div class="empty-content" v-if="teachCourses.length === 0">
          <el-empty description="暂无课程"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我协助的" name="whatIAssist">
        <div class="empty-content">
          <el-empty description="暂无课程"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我学的" name="whatILearn">
        <div class="empty-content" v-if="studyCourses.length === 0">
          <el-empty description="暂无课程"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button style="width: 110px;height: 40px;margin-left: 80px">归档管理</el-button>
    <el-input v-show="!teachInput" v-model="input" placeholder="搜索我学的课程" suffix-icon="el-icon-search" class="search-course"></el-input>
    <el-input v-show="teachInput" v-model="input" placeholder="搜索我教的课程" suffix-icon="el-icon-search" class="search-course"></el-input>
  </div>
  <el-collapse v-model="term" :style="stuDivStyle">
    <el-collapse-item v-for="(group,index) in groupedStudyCourses" :key="index" :title="group[0]" :name="index">
      <div v-for="course in group[1]" :key="course.code">
        <div class="classCard">
          <span class="tag" :class="tagClass(course)">{{ changeType(course.type) }}</span>
          <div class="headerInfo" :class="randomBackground(course.code)"  @click="toClassDetail(course)">
            <p class="time">{{ course.year }}   {{course.semester}}</p>
            <h3 class="name">{{ course.name }}</h3>
            <p class="className">{{ course.clazz }}</p>
            <div class="qrCode">
              <img src="../assets/images/myclass-qrcode.png" alt="myClass-qrcode">
              <span class="classCode">加课码:{{ course.code }}</span>
            </div>
          </div>
          <div class="userInfo">
            <div class="left">
              <span style="cursor: pointer">负责人:{{ responsiblePersons[courses.indexOf(course)] }}</span>
            </div>
            <div class="right">
              <div class="setTop" @click="updateTopping(course)" v-if="isTops[courses.indexOf(course)] === 1">取消置顶</div>
              <div class="setTop" @click="updateTopping(course)" v-if="isTops[courses.indexOf(course)] === 0">置顶</div>
              <span>...</span>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-collapse v-model="term" :style="teaDivStyle">
    <el-collapse-item v-for="(group,index) in groupedTeachCourses" :key="index" :title="group[0]" :name="index">
      <div v-for="course in group[1]" :key="course.code">
        <div class="classCard">
          <span class="tag" :class="tagClass(course)">{{ changeType(course.type) }}</span>
          <div class="headerInfo" :class="randomBackground(course.code)"  @click="toClassDetail(course)">
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
              <span style="cursor: pointer">负责人:{{ responsiblePersons[courses.indexOf(course)] }}</span>
            </div>
            <div class="right">
              <div class="setTop" @click="updateTopping(course)" v-if="isTops[courses.indexOf(course)] === 1">取消置顶</div>
              <div class="setTop" @click="updateTopping(course)" v-if="isTops[courses.indexOf(course)] === 0">置顶</div>
              <span>...</span>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: 'CourseClassification',
  props: {
    isStu:Boolean
  },
  data() {
    return {
      activeName: 'whatILearn',
      activeName2:'whatITeach',
      teachInput:true,
      input:'',
      term: '3',
      yourName:'',
      courses:[],
      responsiblePersons:[],
      isTops:[],
      teachCourses:[],
      studyCourses:[],
      teaDivStyle:{
        display: 'block'
      },
      stuDivStyle:{
        display: 'none'
      }
    }
  },
  computed: {

    groupedStudyCourses() {
      const grouped = this.studyCourses.reduce((result, course) => {
        const key = `${course.year}  ${course.semester}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(course);
        return result;
      }, {});
      // const semesterToNumber = {'第一学期':1,'第二学期':2,'全年':3}
      return Object.entries(grouped).sort((a, b) => {
        const [yearA, semesterA] = a[0].split(' ');
        const [yearB, semesterB] = b[0].split(' ');
        const yearComparison = yearB.localeCompare(yearA); // 比较年份，降序排序
        if (yearComparison !== 0) {
          return yearComparison;
        } else {
          const semesterComparison = semesterB.localeCompare(semesterA); // 比较学期
          return semesterComparison;
        }
      });
    },
    groupedTeachCourses() {
      const grouped = this.teachCourses.reduce((result, course) => {
        const key = `${course.year}  ${course.semester}`;
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(course);
        return result;
      }, {});
      // const semesterToNumber = {'第一学期':1,'第二学期':2,'全年':3}
      return Object.entries(grouped).sort((a, b) => {
        const [yearA, semesterA] = a[0].split(' ');
        const [yearB, semesterB] = b[0].split(' ');
        const yearComparison = yearB.localeCompare(yearA); // 比较年份，降序排序
        if (yearComparison !== 0) {
          return yearComparison;
        } else {
          const semesterComparison = semesterB.localeCompare(semesterA); // 比较学期
          return semesterComparison;
        }
      });
    }
  },
  methods: {
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
    loadYourCourse(){
      let that = this;
      axios.post("http://localhost:8088/course/select",qs.stringify({
        token: localStorage.getExpire('token'),
      }))
          .then(function (response) {
            let responseMap = response.data;
            that.responsiblePersons = responseMap.names;
            that.courses = responseMap.courses;
            that.isTops = responseMap.isTops;
            for (let i = 0; i < that.courses.length; i ++) {
              if (that.yourName === that.responsiblePersons[i]) {
                that.teachCourses.push(that.courses[i]);
              } else {
                that.studyCourses.push(that.courses[i])
              }
            }
          })
          .catch(error => console.error(error));
    },
    updateTopping(course) {
      const formData = new FormData();
      formData.append('course', JSON.stringify(course));
      formData.append('name', this.yourName);
      axios.post("http://localhost:8088/course/update", formData)
          .then(function (response){
            if (response.data === 1) {
              location.reload();
            }
          })
          .catch(error => console.error(error))
    },
    toClassDetail(course){
      console.log(course)
      this.$router.push({ path: '/classDetail', query: { course: JSON.stringify(course)} })
    },
    handleClick(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist') {
        this.teaDivStyle.display = 'none'
        this.stuDivStyle.display = 'none'
      } else {
        this.teaDivStyle.display = 'none'
        this.stuDivStyle.display = 'block'
      }
    },
    handleClick1(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist') {
        this.stuDivStyle.display = 'none'
        this.teaDivStyle.display = 'none'
        this.teachInput = false
      } else if (tabName === 'whatITeach') {
        this.stuDivStyle.display = 'none'
        this.teaDivStyle.display = 'block'
        this.teachInput = true
      } else {
        this.teaDivStyle.display = 'none'
        this.stuDivStyle.display = 'block'
        this.teachInput = false
      }
    }
  },
  created() {
    this.loadYourName();
    this.loadYourCourse();
  }
}

</script>

<style scoped>
.middle{
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  color: #575a5b;
  line-height: 24px;
  justify-content: space-between;
}

</style>

<style>
.middle .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 600px 15px 0;
}

.middle .el-input__inner {
  padding-right: 30px;
  border-radius: 20px;
  margin-left: 6px;
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

.el-collapse-item__content{
  display: flex;
  flex-wrap: wrap;
}
</style>
