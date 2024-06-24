<template>
<div>
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
</div>
</template>

<script>
export default {
  name: 'CourseClassification',
  data() {
    return {
      activeName: 'whatILearn',
      activeName2:'whatITeach',
      isStudent:false,
      teachInput:true,
      input:'',
      term: '3',
      divStyle:{
        display:'none'
      },
    }
  },
  methods: {
    handleClick(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist') {
        this.divStyle.display = 'none'
      } else {
        this.divStyle.display = 'block'
      }
    },
    handleClick1(tab) {
      const tabName = tab.name
      if (tabName === 'whatIAssist') {
        this.divStyle.display = 'none'
        this.teachInput = false
      } else if (tabName === 'whatITeach') {
        this.divStyle.display = 'none'
        this.teachInput = true
      } else {
        this.divStyle.display = 'block'
        this.teachInput = false
      }
    }
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

.middle .el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 600px 15px 0;
}
</style>
