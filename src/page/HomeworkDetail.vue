<template>
  <div class="HomeworkDetailPage">
    <div class="head">
      <div class="head-content">
        <i class="el-icon-s-fold"></i>
        <div class="head-middle">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">我的课堂</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/classDetail',query:{course:JSON.stringify(course)}}" >课程内容</el-breadcrumb-item>
            <el-breadcrumb-item>作业详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <MyAvatar/>
      </div>
    </div>
    <div class="JobDetailHead">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="详情" name="first">
          <div class="JobDetailBody">
            <div class="list-card">
              <span class="Tip-Position">
                作业
              </span>
              <div class="margin-top">
                <header class="flex-align" style="margin-bottom: 0">
                  <div class="h-left">
                    <div class="title flex-align">
                      <h4 class="common_pointer">{{homework.title}}</h4>
                    </div>
                  </div>
                </header>
                <div class="tags">
                  <span class="el-tag">个人作业</span>
                  <span class="el-tag">提交起止时间： {{homework.releaseTime}}~{{homework.ddl}}</span>
                  <span class="tag-gray">查重</span>
                  <span class="tag-gray">允许超时提交</span>
                </div>
                <div class="homework-description">
                  {{homework.description}}
                </div>
              </div>
            </div>
          </div>
          <div class="annex-box" v-if="homework.file">
            <div class="title font16 mb24">
              作业附件
              <span class="font12 tip">1个</span>
            </div>
            <div class="attachment flex-between mb16">
              <div class="flex-align file">
                <div class="left">
                  <img src="@/assets/images/afterLogin/task.png" alt="task">

                </div>
                <div class="right">
                  <h3>{{homeworkDetail?homeworkDetail.file.split("com/")[1]:''}}</h3>
                </div>
              </div>
              <div class="opt">
                <div>
                  <button type="button" class="el-button el-button--text el-button--mini">
                    <span @click="downLoad(homework.file)">下载</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="提交作业" name="second" v-if="isStudent">
          <div class="Caps-student-submit">
            <div class="detail-header">
              <div class="cmp-work-list-card">
                <div class="layout-left flex-align">
                  <img src="@/assets/images/afterLogin/work.png"  alt="">
                  <div class="another-name">
                    <span class="lable-type">作业</span>
                  </div>
                </div>
                <div class="layout-right">
                  <header class="flex-align" style="margin-bottom: 0">
                    <div class="h-left">
                      <div class="title flex-align">
                        <h4 class="common_pointer">{{homework.title}}</h4>
                      </div>
                    </div>
                  </header>
                  <div class="tags">
                    <span class="el-tag">个人作业</span>
                    <span class="el-tag">提交起止时间： {{homework.releaseTime}}~{{homework.ddl}}</span>
                    <span class="tag-gray">查重</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="el-divider el-divider--horizontal">
            </div>
            <div class="submit-content mb24">
              <div class="flex-between mb24">
                <div class="font20">
                  提交内容
                </div>
                <div>
                  <button v-if="isStudent" type="button" class="el-button el-button--primary el-button--small">
                    <span v-if="userTaskDetail.submit==='1'" @click="submit">更新提交</span>
                    <span v-else @click="submit">提交</span>
                  </button>
                  <button v-if="userTaskDetail.marking==='1'" type="button" class="el-button el-button--primary el-button--small" style="font-size: 30px">
                    {{userTaskDetail.score}}分
                  </button>
                </div>
              </div>
              <el-form :model="submitForm" ref="submitForm" label-width="100px">
                <el-form-item  label="答案">
                  <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入答案"
                      v-model="submitForm.answer">
                  </el-input>
                </el-form-item>
                <el-form-item  label="作业附件">
                  <el-upload>
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
              <div class="annex-box"  v-if="userTaskDetail.file">
                <div class="title font16 mb24">
                  作业附件
                  <span class="font12 tip">1个</span>
                </div>
                <div class="attachment flex-between mb16">
                  <div class="flex-align file">
                    <div class="left">
                      <img src="@/assets/images/afterLogin/task.png" alt="task">
                    </div>
                    <div class="right">
                      <h3>{{userTaskDetail?userTaskDetail.file.split("com/")[1]:''}}</h3>
                    </div>
                  </div>
                  <div class="opt">
                    <div>
                      <button type="button" class="el-button el-button--text el-button--mini">
                        <span @click="downLoad(userTaskDetail.file)">下载</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="批阅" name="third" v-else>
         <div class="readoverBox">
           <div class="headerBox">
             {{homework.title}}
           </div>
           <div class="topBox">
             <el-tag>截至: {{homework.ddl}}</el-tag>
             <el-tag type="info">个人作业</el-tag>
             <el-tag type="info">查重</el-tag>
           </div>
           <div class="listBox">


             <el-table
                 :data="tableData"
                 style="width: 100%">
               <el-table-column
                   label="姓名"
                   width="180"
                   prop="name"
               >
               </el-table-column>
               <el-table-column
                   label="答案"
                   width="400">
                 <template slot-scope="scope">
                   <el-input
                       type="textarea"
                       :autosize="{ minRows: 2, maxRows: 4}"
                        v-model="scope.row.answer">
                   </el-input>
                 </template>
               </el-table-column>
               <el-table-column
                   label="附件"
                   width="200">
                 <template slot-scope="scope" v-if="scope.row.file!==''">
                   <el-link type="primary">下载</el-link>
                 </template>

               </el-table-column>
               <el-table-column
                   label="得分"
                   width="180">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.score"></el-input>
                 </template>

               </el-table-column>

               <el-table-column label="操作">
                 <template>
                   <el-button
                       size="mini"
                       type="danger">
                     打分</el-button>


                 </template>
               </el-table-column>
             </el-table>
           </div>
         </div>
       </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import MyAvatar from "@/components/MyAvatar.vue";

export default {
  name: "HomeworkDetail",
  components: {MyAvatar},
  data() {
    return {
      isStudent:false,
      course:null,
      activeName: 'first',
      homework:null,
      homeworkDetail:'',
      submitForm:{
        answer:'',
        file:'',
      },
      fileList:[],
      data:{
        token:''
      },
      tableData: []
    };
  },
  computed:{
    publishTime(){
      const date = new Date(this.homeworkDetail.releaseTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);

      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
    endTime(){
      const date = new Date(this.homeworkDetail.ddl);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hour = ("0" + date.getHours()).slice(-2);
      const minute = ("0" + date.getMinutes()).slice(-2);
      const formattedDate = `${year}/${month}/${day} ${hour}:${minute}`;
      return formattedDate
    },
  },
  mounted() {
    this.isStudent = this.$route.query.isStudent === 'true';
    this.homework = JSON.parse(this.$route.query.homework);
    this.course = JSON.parse(this.$route.query.course);
    this.getHomeworkDetail()
  },
  methods: {
    // getTaskUnit(){
    //   // httpPost({homeworkId:this.homeworkId},'/getTaskUnit','POST').then(res=>{
    //   //   this.userHomeworkDetail=res.data
    //   // })
    // },
    // handleClick(tab) {
    //   if (tab.name==='second'){
    //     this.getTaskUnit()
    //   }
    //   else if (tab.name==='third'){
    //     // httpPost({homeworkId:this.homeworkId},'/getAnswerInfo','POST').then(res=>{
    //     //   this.tableData=[]
    //     //   if (res.data){
    //     //     for (let i = 0; i < res.data.length; i++) {
    //     //       this.tableData.push({
    //     //         name: res.data[i].userName,
    //     //         answer: res.data[i].answer,
    //     //         file: res.data[i].file,
    //     //         studentId: res.data[i].studentId,
    //     //         score:res.data[i].score
    //     //       })
    //     //     }
    //     //   }
    //     // })
    //   }
    // },
  }
}


</script>

<style>
.HomeworkDetailPage {
  width: 1224px;
  height: 1000px;
  margin: auto;

  /*
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
  */

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

  .annex-box {
    margin-top: 20px;
    font-size: 14px;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #dadce0;
    .title{
      text-align: left;
    }
    .attachment {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      height: 72px;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #dadce0;

      .file {
        border-radius: 8px;
        width: 100%;
        height: 100%;
        .right{
          h3{
            font-weight: normal
          }
        }
      }

      .flex-align {
        display: flex;
        align-items: center;
      }

      .left {
        margin-right: 14px;

        img {
          width: 33px;
          height: 40px;
        }
      }

      .mb16 {
        margin-bottom: 16px;
      }

      .flex-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      text-align: left;
    }
  }
  .JobDetailHead {
    margin: 60px 0;

    .el-tabs__nav {
      z-index: 0;
    }

    .el-tabs__nav-wrap::after {
      content: none;
    }

    .el-tabs__item {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }
  }

  .JobDetailBody {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px;

    .list-card {
      width: 100%;
      display: flex;
      position: relative;

      .Tip-Position {
        position: absolute;
        background: #31ccd2;
        color: #fff;
        font-size: 14px;
        left: -12px;
        top: -12px;
        border-bottom-right-radius: 4px;
        text-align: center;
        padding: 8px;
      }

      .margin-top {
        margin-top: 30px;

        .flex-align {
          display: flex;
          align-items: center;

          .h-left {
            .title flex-align {
              line-height: 20px;

              .common_pointer {
                font-size: 16px;
                font-weight: 500;
                margin-right: 5px;
                max-width: 670px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }

        .tags {
          text-align: left;
          padding: 6px 0;

          .el-tag {
            height: 20px;
            padding: 0 5px;
            line-height: 19px;
            margin-right: 6px;
          }

          .tag-gray {
            margin-right: 6px;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
            display: inline-block;
            font-size: 12px;
            color: #909399;
            border-width: 1px;
            border-style: solid;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            height: 20px;
            padding: 0 5px;
            line-height: 19px;
          }
        }

        .homework-description {
          text-align: left;
          font-weight: normal;
        }
      }
    }
  }

  .Caps-student-submit {
    width: 1224px;
    margin: 0 auto;
    font-size: 12px;

    .detail-header {
      position: relative;

      .cmp-work-list-card {
        width: 100%;
        display: flex;
        position: relative;

        img {
          border: none;
        }

        .layout-left {
          flex-direction: column;
          min-width: 55px;
          margin-right: 16px;
          font-size: 12px;

          img {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
          }

          .another-name {
            position: relative;
            margin-top: 5px;
            line-height: 13px;
            display: inline-block;
            width: 85px;
            text-align: center;
            max-height: 31px;
            margin-bottom: 2px;

            .lable-type {
              color: #3c4043;
              font-size: 13px;
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 65px;
              max-height: 30px;
              line-height: 15px;
              word-break: break-all;
              display: inline-block;
              text-align: center;
            }
          }
        }

        .flex-align {
          display: flex;
          align-items: center;
        }

        .layout-right {
          width: 100%;

          header {
            justify-content: space-between;
          }

          .tags {
            text-align: left;
            padding: 6px 0;

            .el-tag {
              height: 20px;
              padding: 0 5px;
              line-height: 19px;
              margin-right: 6px;
            }

            .tag-gray {
              margin-right: 6px;
              background-color: #f8f9fa;
              border-color: #f8f9fa;
              display: inline-block;
              font-size: 12px;
              color: #909399;
              border-width: 1px;
              border-style: solid;
              border-radius: 4px;
              box-sizing: border-box;
              white-space: nowrap;
              height: 20px;
              padding: 0 5px;
              line-height: 19px;
            }
          }

          .flex-align {
            display: flex;
            align-items: center;

            .h-left {
              .title {
                line-height: 20px;

                h4 {
                  font-size: 16px;
                  font-weight: 500;
                  margin-right: 5px;
                  max-width: 670px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .common_pointer {
                  user-select: none;
                  cursor: pointer;
                }
              }

              .flex-align {
                display: flex;
                align-items: center;
              }
            }

            .h-right {
              text-align: right;
            }

            .font14 {
              font-size: 14px;
            }
          }
        }
      }

      .right-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 12px 0;
    }

    .el-divider {
      background-color: #dadce0;
      position: relative;
    }

    .opt {
      color: #4285f4;

      span {
        margin-left: 38px;
        cursor: pointer;
      }
    }

    span {
      outline: none;
    }

    .font14 {
      font-size: 14px;
    }

    .mb24 {
      margin-bottom: 24px;

      .flex-between {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .font20 {
          font-size: 20px;

          .el-button--text {
            color: #4285f4;
            background: 0 0;
            padding-left: 0;
            padding-right: 0;
          }

          .el-button--medium {
            padding: 10px 20px;
            font-size: 14px;
            border-radius: 4px;
          }

          .el-button {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: 0;
            margin: 0;
            transition: .1s;
            font-weight: 500;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 4px;
          }
        }
      }
    }

    .font16 {
      font-size: 16px;
    }

    .tip {
      color: #74787c;
      margin-left: 8px;
    }

    .font12 {
      font-size: 12px;
    }

    span {
      outline: none;
    }


  }
  .readoverBox{
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    font-weight: 400;
    vertical-align: baseline;
    font-family: Roboto,Helvetica,Arial,sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    .headerBox{
      font-size: 20px;
      font-weight: 500;
      text-align: left;
      color: #3c4043;
    }
    .topBox{
      display: flex;
      margin-top: 8px;
      margin-bottom: 15px;
    }
    .listBox{
      display: flex;
      /*
      .blockBox{
        height: 100%;
        width: 320px;
      }
      .tableBox{
        line-height: 60px;
        width: 50%;
        color: #909399;
      }
       */
      .studenthomeworkBox{
        display: flex;
        justify-content: flex-end;
        .studentBox{
          padding:0 10px 0 10px;
          background-color: #fff;
          .studentName{
            text-align: left;
            font-size: 14px;
            font-weight: 700;
            color: #2d2d2d;
          }
          .studentNum{
            display: block;
          }
        }
        .gradeBox{
        }
      }
    }
    .paginationBox{
      text-align: center;
      white-space: nowrap;
      padding: 2px 5px;
      color: #303133;
      font-weight: 700;
    }
  }
}
</style>
