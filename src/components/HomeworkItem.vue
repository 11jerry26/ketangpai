<template>
  <div class="homeworkItemPage">
    <div class="homeworkItem" @click="goHomeworkDetail()">
      <div class="itemLeft">
        <img class="noItem" src="@/assets/images/afterLogin/work.png" alt="">
        <div class="itemLeft-bottom">
          作业
        </div>
      </div>
      <div class="itemRight">
        <div class="itemRight-left">
          <div class="itemRight-left-head">
            {{homework.title}}
          </div>
          <div class="itemRight-left-body">
            <div class="itemRight-left-body-left">
              提交截止时间：{{time(homework.ddl)}}
            </div>
            <div class="el-divider" v-if="isDeadlinePassed">
              |
            </div>
            <div class="itemRight-left-body-mid" v-if="isDeadlinePassed">
              已结束
            </div>
            <div class="el-divider">
              |
            </div>
            <div class="itemRight-left-body-right">
              个人作业
            </div>
          </div>
          <div class="itemRight-left-foot" v-if="isStudent">
            已提交
          </div>
          <div class="itemRight-left-foot" v-if="isStudent">
            未提交
          </div>
        </div>
        <div class="itemRight-right" v-if=isStudent>
          <el-button class="hasSubmit" type="primary">提交作业</el-button>
        </div>
        <div class="itemRight-right" v-if=!isStudent>
          <template v-if="homework.isRelease">
            <span class="homeworkDetail">
           <div class="num">{{markingNum||0}}</div>
           <div>已批完</div>
         </span>
            <span class="homeworkDetail">
           <div class="num">{{unMarkingNum||0}}</div>
           <div>未批完</div>
         </span>
            <span class="homeworkDetail">
           <div class="num">{{unSubmitNum||0}}</div>
           <div>未交</div>
         </span>
          </template>
          <template v-else>
            <div class="moreBox" @click="publishHomework" @click.stop>
              <img class="moreIcon" src="@/assets/images/afterLogin/issue.png" alt="" >
              <div>发布</div>
            </div>
          </template>
          <el-dropdown placement="bottom" trigger="click" @command="handleCommand">
            <div class="moreBox" @click.stop>
              <img class="moreIcon" src="@/assets/images/afterLogin/more.svg" alt="" >
              <div>更多</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="edit" v-if="!homework.isRelease">编辑
              </el-dropdown-item>
              <el-dropdown-item command="delete">删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>
    </div>
    <el-dialog title="编辑作业" :visible.sync="editFormVisible" @close="closeDialog('editForm')">
      <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
        <el-form-item label="作业标题" prop="title">
          <el-input v-model="editForm.title" placeholder="作业标题" type="text" maxlength="70" show-word-limit ></el-input>
        </el-form-item>
        <el-form-item  label="作业描述" prop="description">
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="editForm.description">
          </el-input>
        </el-form-item>
        <el-form-item  label="立即发布" prop="isRelease">
          <el-switch
              v-model="editForm.isRelease">
          </el-switch>
        </el-form-item>

        <el-form-item label="发布时间" prop="releaseTime" v-if="editForm.isRelease">
          <el-date-picker
              v-model="editForm.releaseTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间" prop="ddl" v-if="editForm.isRelease">
          <el-date-picker
              v-model="editForm.ddl"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item  label="作业附件">
          <el-upload>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog('editForm')">取 消</el-button>
            <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>确定删除这个课程吗?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteHomework">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "HomeworkItem",
  props:['homework','isStudent','code','course'],
  data(){
    return{
      dialogVisible:false,
      markingNum: 0,
      unMarkingNum: 0,
      unSubmitNum: 0,
      editFormVisible:false,
      editForm:{
        status:'',
        title:this.homework.title,
        description: this.homework.description,
        isRelease: false,
        releaseTime: '',
        ddl: '',
        file: ''
      },
      fileList:[],
      editRules: {
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
    }
  },
  computed: {
    isDeadlinePassed() {
      const currentDateTime = +new Date();
      const deadlineDateTime = +new Date(this.homework.ddl);
      return currentDateTime > deadlineDateTime;
    }
  },
  mounted() {
    this.getHomeWorkCounts();
    this.editForm.id = this.homework.id
    this.editForm.creatorId = this.homework.creatorId
    this.editForm.unsubmitNum = this.homework.unsubmitNum
    this.editForm.lessonId = this.homework.lessonId
    this.editForm.unmarkingNum = this.homework.unmarkingNum
    this.editForm.publishNow=this.homework.status==='1'
    this.editForm.status = this.homework.status
    this.editForm.homeworkName = this.homework.title
    this.editForm.description = this.homework.description
    this.editForm.file = this.homework.file
    this.editForm.releaseTime = new Date(this.homework.releaseTime)
    this.editForm.ddl = new Date(this.homework.ddl)
    if (this.homework.file!==''){
      this.fileList.push({name: this.homework.file.substring(this.homework.file.lastIndexOf('/') + 1), url: this.homework.file})
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(()=> {});
    },
    goHomeworkDetail(){
      this.$router.push({path:'/homeworkDetail',
        query: {
          isStudent:this.isStudent,
          homework:JSON.stringify(this.homework),
          course:JSON.stringify(this.course)
        }})
    },
    handleCommand(command){
      switch (command){
        case "edit":
          this.editFormVisible = true; break;
        case "delete":
          this.dialogVisible = true; break;
      }
    },
    time(dateString){
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);

      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
    checkEndDate(rule, value, callback) {
      const startTimeStamp = +new Date(this.editForm.releaseTime); // 将开始时间转换为时间戳
      const ddlStamp = +new Date(this.editForm.ddl); // 将结束时间转换为时间戳
      if (startTimeStamp>ddlStamp) {
        callback(new Error('结束时间必须在开始时间之后'));
      } else {
        callback();
      }
    },
    closeDialog(){
      this.resetForm('editForm')
      this.editFormVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName==='editForm'){
            this.updateHomework()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateHomework(){
      // if (this.editForm.status==='1'){
      //   if (this.editForm.publishNow){
      //     this.editForm.status=this.editForm.publishNow>new Date()?'3':'2'
      //   }
      // }
      let that = this;
      axios.post("http://localhost:8088/homework/update",this.editForm).then(function (response) {
        if (response.data === '修改成功') {
          that.$message.success("修改成功!")
          that.editFormVisible = false;
          that.$emit('child-event','msg');
        } else {
          that.$message.error("修改失败!");
        }
      })
          .catch(error => console.error(error))
    },
    deleteHomework(){
      let that = this;
      this.dialogVisible = false;
      axios.post("http://localhost:8088/homework/delete",qs.stringify({
        id:this.homework.id
      }))
          .then(function (response) {
            if (response.data === '删除成功') {
              that.$message.success("删除成功!")
              that.$emit('child-event','msg')
            } else{
              that.$message.error('删除失败')
            }
          })
          .catch(error => console.error(error))
    },

    publishHomework(){
      this.editForm.releaseTime=null
      this.editForm.ddl=null
      this.editFormVisible = true;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getHomeWorkCounts() {
      let that = this;
      axios.post("http://localhost:8088/homework/selectCounts",qs.stringify({
        homeworkId: this.homework.id,
        code:this.code
      }))
          .then(function (response) {
            const [markingNum,unMarkingNum,unSubmitNum] = response.data;
            that.markingNum = markingNum;
            that.unMarkingNum = unMarkingNum;
            that.unSubmitNum = unSubmitNum;
          })
    }
  }
}
</script>

<style scoped>
.homeworkItemPage {

  .homeworkItem {
    padding: 10px 16px 0 16px;
    display: flex;

    .itemLeft {
      width: 85px;
      margin-right: 16px;
      font-size: 12px;
      flex-direction: column;
      text-align: center;

      .itemLeft-bottom {
        margin-top: 5px;
        text-align: center;
      }
    }

    .itemRight {
      width: 100%;
      padding: 0 0 4px;
      display: flex;
      border-bottom: 1px solid #eee;
      justify-content: space-between;

      .itemRight-left {
        color: #5f6368;
        font-size: 12px;

        .itemRight-left-head {
          font-size: 16px;
          margin-bottom: 12px;
          color: #212121;
        }

        .itemRight-left-body {
          display: flex;
          font-family: Roboto, Helvetica, Arial, sans-serif;

          .el-divider {
            color: #dadce0;
            margin: 0 8px;
          }

          .itemRight-left-body-left {
            border-right: #5f6368;
          }

          .itemRight-left-body-mid {
            border-right: #5f6368;
          }

          .itemRight-left-body-right {
            border-right: #5f6368;
          }
        }

        .itemRight-left-foot {
          font-size: 12px;
          padding-top: 8px;
        }
      }

      .itemRight-right {
        display: flex;
        //justify-content: ;
        .homeworkDetail{
          text-align: center;
          margin: 0 20px;
          margin-top: 10px;
          .num{
            color: #4285f4;
            font-size: 20px;
          }
        }
        .hasSubmit {
          height: 40px;
          color: #4285f4;
          background: #ecf3fe;
          border-color: #b3cefb;
        }
        .moreBox{
          height: 50px;
          border-left: 1px solid #e7ebf0;
          font-size: 12px;
          text-align: center;
          padding-left: 30px;
          padding-right: 40px;
          padding-top: 10px;
          .moreIcon{
            width: 20px;
          }
        }
      }
    }
  }
}
</style>
