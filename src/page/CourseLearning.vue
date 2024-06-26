<template>
  <div class="courseLearningPage">
    <el-tabs class="navBox" v-model="activeName" >
      <el-tab-pane label="目录" name="menu">
        <div class="amountBox">
          <span style="margin-right:8px ">共0个章节</span>
          <span>0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="互动课件" name="presentation">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="作业" name="homework">
        <div class="headBox">
          <div class="headText">共有{{homeworkList.length}}个活动</div>
          <el-button round class="headBtn" @click="addFormVisible=true" v-if="!isStudent">＋ 添加作业</el-button>
        </div>
        <div class="homeworkBox" v-if="homeworkList.length!==0">
          <homework-item @child-event="getHomeworkList" :homework="item" :role="isStudent" :code="code" :course="course" v-for="(item,index) in homeworkList" :key="index"></homework-item>
        </div>
        <div class="noItemBox" v-if="homeworkList.length===0">
          <img src="@/assets/images/afterLogin/noItem.png" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="测试" name="test">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资料" name="information">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="腾讯会议" name="tencent">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公告" name="announcement">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="话题" name="topic">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="互动答题" name="quiz">
        <div class="amountBox">
          <span>共0个活动</span>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="添加作业" :visible.sync="addFormVisible" @close="closeDialog('addForm')">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
        <el-form-item label="作业标题" prop="title">
          <el-input v-model="addForm.title" placeholder="作业标题" type="text" maxlength="70" show-word-limit></el-input>
        </el-form-item>
        <el-form-item  label="作业描述" prop="description">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="addForm.description">
          </el-input>
        </el-form-item>
        <el-form-item  label="立即发布" prop="isRelease">
          <el-switch
              v-model="addForm.isRelease">
          </el-switch>
        </el-form-item>

        <el-form-item label="发布时间" prop="releaseTime" v-if="addForm.isRelease">
          <el-date-picker
              v-model="addForm.releaseTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间" prop="ddl" v-if="addForm.isRelease">
          <el-date-picker
              v-model="addForm.ddl"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="作业附件">
          <el-upload
              class="upload-demo"
              action="http://upload-cn-east-2.qiniup.com"
              :data="data"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              :before-upload="handleBeforeUpload"
              :on-preview="handlePreview"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('addForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </span>
    </el-dialog>
  </div>

</template>

<script>
import HomeworkItem from "@/components/HomeworkItem.vue";
import axios from "axios";
import qs from "qs";

export default {
  name: "CourseLearning",
  components: {HomeworkItem},

  data(){
    return{
      isStudent:false,
      isStu:false,
      activeName:"homework",
      course: null,
      code: '',
      addForm: {
        title: '',
        description: '',
        isRelease: false,
        releaseTime: '',
        ddl: '',
        file: ''
      },
      fileList:[],
      addFormVisible:false,
      addRules: {
        title: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        releaseTime: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        ddl: [
          { required: true, message: '必填项', trigger: 'blur' },
          { validator: this.checkEndDate, trigger: 'blur' }
        ],
      },
      data:{
        token:''
      },
      homeworkList:[]
    }
  },
  mounted() {
    this.course = JSON.parse(this.$route.query.course);
    this.code = this.course.code;
    this.loadYourRole();
    this.getHomeworkList()
  },
  created() {
    this.getQiniuyunToken();
  },
  methods:{
    // getHomeworkList(){
    //   // httpPost({lessonId:this.lessonId},'/taskList','POST').then(res=>{
    //   //   this.homeworkList = res.data
    //   // })
    // },
    getHomeworkList() {
      let that = this;
      axios.post("http://localhost:8088/homework/selectHomework",qs.stringify({
        code:this.code
      }))
          .then(function (response) {
            that.homeworkList = response.data;
          })
    },
    handleBeforeUpload(file){
      this.data.key=file.name
    },
    handleSuccess(response) {
      this.addForm.file=this.$fileBase+response.key
    },
    getQiniuyunToken(){
      // httpPost({}, '/qiniu/token', 'GET').then(res=>{
      //     this.data.token=res
      // })
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handlePreview() {
      window.open(this.addForm.file);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    checkEndDate(rule, value, callback) {
      const startTimeStamp = +new Date(this.addForm.releaseTime); // 将开始时间转换为时间戳
      const ddlStamp = +new Date(this.addForm.ddl); // 将结束时间转换为时间戳
      if (startTimeStamp>ddlStamp) {
        callback(new Error('结束时间必须在开始时间之后'));
      } else {
        callback();
      }
    },
    closeDialog(){
          this.resetForm('addForm')
          this.addFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName==='addForm'){
            this.addTask()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addTask(){
      const formData = new FormData();
      formData.append('homework',JSON.stringify(this.addForm));
      formData.append('code',this.code)
      formData.append('userToken',localStorage.getExpire('token'))
      axios.post("http://localhost:8088/homework/create", formData)
          .then((response) => {
            if (response.data === "创建成功") {
              this.closeDialog();
              this.$message.success("创建成功!");
              this.getHomeworkList();
            }
          })
          .catch((error) => {
            // 处理错误响应的逻辑
            console.error("作业创建失败", error);
          });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loadYourRole() {
      let that = this;
      axios.post("http://localhost:8088/user/selectRole",qs.stringify({
        token: localStorage.getExpire('token'),
      }))
          .then(function (response) {
            that.role = response.data;
            that.isStudent = that.role === 0;
          })
          .catch(error => console.error(error));
    }
  }
}
</script>

<style>
.courseLearningPage{
  .el-tabs__header {
    margin: 15px 0;
  }
  .el-tabs__item {
    font-size: 16px;
    font-weight: 500;
  }
  .el-tabs__nav-wrap::after {
    content: none;
  }

  .navBox{
    .amountBox{
      padding-top:10px;
      font-size: 16px;
    }
    .headBox{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .headBtn{
        color: #fff;
        background-color: #00ca90;
      }
    }
    .homeworkBox{
      padding-top: 16px;
      border: 1px solid #e7ebf0;
      border-radius: 8px;
      margin-top: 8px;
      margin-bottom: 10px;
    }
    .noItemBox{
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
