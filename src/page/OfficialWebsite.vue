<template>
<div class="container">
<!--  轮播图-->
  <div class="carousel">
    <el-carousel :interval="5000" arrow="never">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.idView" class="image" alt="banner_home">
      </el-carousel-item>
    </el-carousel>
  </div>

<!--  混合教学全过程管理-->
  <div class="blendList">
<!--    混合教学全过程管理-->
    <div class="mixedTeaching">
      <div class="head">
        <div class="title">混合教学全过程管理</div>
        <div class="detail">课前、课中、课后，线上线下，教学场景全过程管理</div>
      </div>

      <div class="list">
        <ul>
          <li>
            <div class="headImg"><img alt="task" src="../assets/images/task..png"></div>
            <div class="title">作业</div>
            <div class="detail">81 种文档格式作业在线展示和批阅，实时查重，精准对比，避免学生抄袭。 自动管理成绩，一键下载作业数据。</div>
          </li>
          <li>
            <div class="headImg"><img alt="exam" src="../assets/images/exam.png"></div>
            <div class="title">考试/练习</div>
            <div class="detail">单选、多选、填空、简答等10余种题型。支持题库随机抽题组卷。支持限时考试、选项随机等防作弊模式。</div>
          </li>
          <li>
            <div class="headImg"><img alt="information" src="../assets/images/information.png"></div>
            <div class="title">课件资料</div>
            <div class="detail">课件、资料、话题、公告等教学内容支撑。在线制作方便快捷，提升备课效率。支持课前发布活动，课中互动，课后巩固。</div>
          </li>
          <li>
          <div class="headImg"><img alt="interaction" src="../assets/images/interaction.png"></div>
          <div class="title">课中互动</div>
          <div class="detail">课件在线讲解、标记疑问 支持发言、开启弹幕、抢答、提问、话题讨论、黑板、画笔标注课堂要点，让课堂更精彩</div>
          </li>
          <li>
            <div class="headImg"><img alt="signIn" src="../assets/images/sign_in.png"></div>
            <div class="title">考勤签到</div>
            <div class="detail">二维码、数字口令、GPS等5种考勤形式， 精准有效、避免代签 签到数据自动生成，一键导出</div>
          </li>
          <li>
            <div class="headImg"><img alt="grade" src="../assets/images/grade.png"></div>
            <div class="title">成绩管理</div>
            <div class="detail">汇总互动数据、平时成绩、期末成绩 个性化配置成绩权重占比数据报表一键导出下载，课留存，可追溯</div>
          </li>
          <li>
            <div class="headImg"><img alt="dataAnalyze" src="../assets/images/data_analyze.png"></div>
            <div class="title">教学数据分析</div>
            <div class="detail">全方位教学数据信息化，可视化实时监测教学质量，把控教学进度，学业预警分析，提升教学效果</div>
          </li>
          <li>
            <div class="headImg"><img alt="broadCast" src="../assets/images/broadcast.png"></div>
            <div class="title">直播-云录屏</div>
            <div class="detail">满足线上线下混合式教学场景 动画及课件同屏+语音实现轻量级直播 不限人员数量，手机电脑均可参与</div>
          </li>
        </ul>
      </div>
    </div>
  </div>

<!--  智慧教学平台-->
  <div class="wisdom">
    <div class="head">
      <div class="title">智慧教学平台</div>
    </div>
    <div class="wisdomList">
      <ul>
        <li>
          <div class="headImg"><img src="../assets/images/interactive_classrooms.png" alt="interactive_classrooms"></div>
          <div class="title">线下互动课堂</div>
          <div class="detail">多种互动教学工具，沉浸式学习体验，精准化学习。</div>
        </li>
        <li>
          <div class="headImg"><img src="../assets/images/blended_teaching.png" alt="blended_teaching"></div>
          <div class="title">混合教学全过程管理</div>
          <div class="detail">多种互动教学工具，沉浸式学习体验，精准化学习。</div>
        </li>
        <li>
          <div class="headImg"><img src="../assets/images/live_online.png" alt="live_online"></div>
          <div class="title">在线直播教室</div>
          <div class="detail">在线直播教学搭配教学互动，充分还原真实的教学场景，提升教学效果。</div>
        </li>
        <li>
          <div class="headImg"><img src="../assets/images/curriculum_building.png" alt="curriculum_building"></div>
          <div class="title">在线课程建设</div>
          <div class="detail">在线直播课、精品慕课资源、课程资源体系搭建，沉淀教学资源。</div>
        </li>
      </ul>
    </div>
    <div class="understand">
      <div class="content">
        <button class="und">了解详细功能</button>
        <button class="now" @click="goToRegister">立即注册体验</button>
      </div>
    </div>
  </div>

<!--  课堂派机构版-->
  <div class="mechanism">
    <div class="mechanismContainer">
      <div class="head">
        <div class="title">课堂派机构版</div>
      </div>
      <div class="content">
        <div class="mecLeft">
          <img src="../assets/images/mec-left.png" alt="mecLeft">
        </div>
        <div class="mecRight">
          <ul>
            <li>
              <div class="title">
                <div class="choose"><img src="../assets/images/choose.png" alt="choose"></div>
                <div class="content">精准高效管理教学事务</div>
              </div>
              <div class="detail">一键对接教务系统，精准高效管理师生教学、课程、课务。</div>
            </li>
            <li>
              <div class="title">
                <div class="choose"><img src="../assets/images/choose.png" alt="choose"></div>
                <div class="content">有效提升教学质量</div>
              </div>
              <div class="detail">以课堂教学为核心，以产出为导向；实时监控师生、课程、教学活动等教学过程。</div>
            </li>
            <li>
              <div class="title">
                <div class="choose"><img src="../assets/images/choose.png" alt="choose"></div>
                <div class="content">教学资产管理</div>
              </div>
              <div class="detail">沉淀教学过程资产，促进优质课程、资源、知识图谱建设。</div>
            </li>
            <li>
              <div class="title">
                <div class="choose"><img src="../assets/images/choose.png" alt="choose"></div>
                <div class="content">智慧校园全景定制</div>
              </div>
              <div class="detail">以学生为中心，以教学为导向，提供校园全景智慧教学解决方案。</div>
            </li>
          </ul>
          <div class="rightButton">
            <button class="und">了解详细功能</button>
            <button class="now">申请免费试用</button>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--  媒体报道-->
  <div class="media">
    <div class="head">
      <div class="title">媒体报道</div>
    </div>
<!--    轮播图-->
  <div class="bigCarousel">
    <el-carousel :interval="2000000" type="card" height="440px">
      <el-carousel-item v-for="item in imgList1" :key="item.id">
        <div class="itemContent">
          <img :src="item.idView" class="image" alt="carousels">
          <div class="newContent">
            <p class="title">{{ item.title }}</p>
            <p class="content">{{ item.content }}</p>
            <button class="btn">查看详情</button>
          </div>
          <div class="blue"></div>
        </div>

      </el-carousel-item>
    </el-carousel>
  </div>

  </div>

<!--  欢迎使用课堂派-->
  <div class="welcome">
    <div class="show">
      <div class="content">
        <div class="head">欢迎使用课堂派</div>
        <div class="detail">精彩教学，从这里开启</div>
        <div class="buttonContent">
          <button class="connect">联系课堂派</button>
          <button class="free" @click="goToRegister">免费注册</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name:'OfficialWebsite',
  data(){
    return{
      imgList:[
        {id:0,idView:require("../assets/images/banner_home.png")}
      ],
      imgList1:[
        {id: 0,
        idView: require("../assets/images/carousel1.png"),
        title:"助力智慧课堂：课堂派成为腾讯微校生态战略伙伴",
        content:"7月18日，腾讯微校发布会在北京船山书院如期举行，正式推出以微信校园卡、腾讯校园码为核心的数字校园解决方案——腾讯微校2.0。" +
            "本次发布会突破传统Q&A的传统模式，现场模拟校园场景，利用“一款非常好用的应用”课堂派进行了现场互动。作为腾讯微校的生态战略伙伴，" +
            "互动教学品牌课堂派展现了科技时代，智慧课堂所带来的创新和变化。"
        },
        {id: 1,
        idView: require("../assets/images/carousel2-5.png"),
        title: "课堂派亮相2018中国“互联网+”数字经济峰会",
        content: "4月12日下午教育分论坛，北京大学软件与微电子学院林院长分享了智慧课堂的建设经验：教学资源呈现多样化、课堂形式丰富、" +
            "如何把学生从玩手机的屏幕聚焦到课堂互动环节等方面。林院长表示，课堂派在研发过程中，学院的一线教师主动参与，把很多丰富的实际教学经验" +
            "融入研发当中，使整个智慧课堂的建设更具实用性和前瞻性。"
        },
        {id: 2,
        idView: require("../assets/images/carousel3.png"),
        title: "新时代新青年 课堂派创始人陈杰宾的创业梦",
        content: "6月26日，中国共产主义青年团第十八次全国代表大会在人民大会堂开幕。共青团委对福建省驻京团工委点赞，CCTV新闻频道进行了同步报" +
            "道。分享会上，课堂派创始人陈杰宾作为闽籍创业青年代表，向在京青年创业者分享了课堂派的发展模式以及创业历程。"
        },
        {id: 3,
        idView: require("../assets/images/carousel4.png"),
        title: "【新浪新闻】课堂派云管理颠覆高校传统实习模式",
        content: "用课堂派最大的好处就是在学习的过程中，随时跟老师进行沟通和分享，无论从知识和情感层面都需要倾诉，而课堂派不仅提供跟老师同学" +
            "交流的机会，还能够获得别人的指导和鼓励，让整个学习过程更加轻松。"
        },
        {id: 4,
        idView: require("../assets/images/carousel2-5.png"),
        title: "【华北电力大学】“互联网+”让教育发现每一个学生",
        content: "“课堂上教师要及时了解学生对内容的掌握程度，课下学生也希望教师能对自己的学习困难进行及时的指导。”在以前，这些实现起来比较困难" +
            "的事情，“课堂派”可以让这一切变得轻而易举。"
        }
      ]
    }
  },
  methods:{
    goToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style>
/*轮播图*/
.carousel .el-carousel__container {
  position: relative;
  height: 470px;
}

.carousel .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.carousel .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.carousel .el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.carousel .el-carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px;
}

.carousel .el-carousel--horizontal {
  overflow-x: hidden;
}

.carousel img{
  width: 100%;
  height: 470px;
}

.bigCarousel .el-carousel__item--card.is-in-stage {
  cursor: pointer;
  z-index: 1;
}


.bigCarousel .officialWebsite .container .media[data-v-06817548] .is-in-stage {
  height: 400px!important;
}

.bigCarousel .el-carousel__item--card {
  width: 50%;
}

.bigCarousel .el-carousel__item--card, .el-carousel__item.is-animating {
  transition: transform .4s ease-in-out;
}

.bigCarousel .el-carousel--horizontal {
  overflow-x: hidden;
}

.bigCarousel .el-carousel {
  position: relative;
}

.bigCarousel .el-carousel__mask {
  width: 100%;
  background-color: #fff;
  opacity: 60%;
  transition: .2s;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
}

.bigCarousel .el-carousel__item--card.is-active {
  z-index: 2;
}

.bigCarousel .el-carousel__item--card.is-active img{
  z-index: 2;
  opacity: 1;
}

.bigCarousel .item-content{
  padding: 8px;
  position: relative;
}
</style>


<style scoped>
/*轮播图*/
.container{
  margin-top: 2px;
}

.carousel{
  width:100%;
  height: 470px;
}
/*列表*/
.blendList{
  background: linear-gradient(180deg,#fff,#f4f8ff 42%);
}
/*混合教学全过程管理*/
.mixedTeaching{
  height: 952px;
  width: 1380px;
  margin: 0 auto;
}

.mixedTeaching .head{
  text-align: center;
  padding: 64px 0 40px;
}

.head .title{
  font-size: 40px;
  font-weight: 500;
  color: #1f2023;
}

.head .detail{
  height: 32px;
  font-size: 20px;
  color: #74787c;
  margin-top: 16px;
}

.list ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
}

.list ul li{
  height: 320px;
  text-align: center;
  width: 270px;
  background: linear-gradient(180deg,#fff,#f4f8ff 130%);
  border-radius: 8px 8px 0 8px;
  margin-top: 24px;
  padding: 15px 24px;
}

.list ul li .headImg{
  width: 64px;
  margin: 20px auto 24px;
  height: 64px;
}

.list ul li img{
  width: 64px;
  height: 64px;
}

.list ul li .title{
  font-weight: 600;
  color: #1f2023;
  font-size: 24px;
  margin-bottom: 8px;
}

.list ul li .detail{
  font-size: 14px;
  color: #74787c;
  line-height: 24px;
}
/*智慧教学平台*/
.wisdom{
  width: 1200px;
  margin: 0 auto;
  height: 614px;
}

.wisdom .head{
  text-align: center;
  padding: 64px 0;
}

.wisdom .head .title{
  font-size: 40px;
  font-weight: 500;
  color: #1f2023;
}

.wisdomList ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
}

.wisdomList ul li{
  width: 288px;
  height: 262px;
  padding: 0 30px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 20px 20px 100px -63px #8297b2;
}

.wisdomList ul li .headImg{
  width: 64px;
  margin: 24px auto 32px;
  height: 64px;
}

.wisdom .wisdomList ul li .title{
  font-weight: 600;
  color: #1f2023;
  font-size: 24px;
  margin-bottom: 8px;
}

.wisdomList ul li .detail{
  font-size: 14px;
  color: #74787c;
  line-height: 24px;
}

.understand .content{
  margin: 64px auto;
  width: 344px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.understand .content .und ,.mecRight .rightButton .und{
  width: 160px;
  height: 48px;
  background: #fff;
  border: 1px solid #4285f4;
  color: #4285f4;
  border-radius: 5px;
  cursor: pointer;
}

.understand .content .now ,.mecRight .rightButton .now{
  width: 160px;
  height: 48px;
  background: linear-gradient(131deg,#7eb0ff,#2178ff);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/*课堂派机构版*/
.mechanism{
  background: linear-gradient(180deg,#fff,#f4f8ff 42%);
  height: 810px;
}

.mechanismContainer{
  width: 1224px;
  height: 810px;
  margin: 0 auto;
  padding: 0;
}

.mechanism .head{
  text-align: center;
  padding: 64px 0;
}

.mechanism .head .title{
  font-size: 40px;
  font-weight: 500;
  color: #1f2023;
}

.mechanism .content{
  width: 1224px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.mecLeft img{
  width: 625px;
  height: 548px;
}

.mecRight{
  width: 520px;
}

.mecRight ul{
  list-style: none;
}

.mecRight ul li{
  margin-bottom: 24px;
}

.mecRight ul li .title{
  line-height: 36px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.mecRight ul li .title .choose{
  width: 20px;
  height: 20px;
}

.mecRight ul li .title .choose img{
  width: 20px;
  height: 20px;
}

.mecRight ul li .title .content{
  color: #1f2023;
  font-weight: 600;
  margin-left: 16px;
  font-size: 24px;
}

.mecRight ul li .detail{
  font-size: 18px;
  margin-top: 8px;
  color: #74787c;
  padding-left: 38px;
  line-height: 32px;
}

.rightButton{
  margin: 64px 0 0 38px;
  width: 344px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

/*媒体报道*/
.media{
  height: 600px;
  margin: 0 auto;
}

.media .head{
  text-align: center;
  padding: 64px 0;
}

.media .head .title{
  font-size: 40px;
  font-weight: 500;
  color: #1f2023;
}

.bigCarousel{
  height: 428px;
}

.bigCarousel img{
  width: 240px;
  height: 350px;
  position: absolute;
  left: 38px;
  top: 40px;
  border-radius: 8px;
  opacity: 60%;
  z-index: 1;
  margin-top: 10px;
}

.bigCarousel .itemContent{
  display: flex;
  height: 450px;

}

.bigCarousel .btn{
  width: 106px;
  height: 38px;
  color: #fff;
  background-color: #4285f4;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 5px;
  border: none;
}

.bigCarousel .newContent{
  height: 450px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 30px 30px 30px 300px;
  border-radius: 5px;
  box-shadow: 5px 5px 25px #e7ebf0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.bigCarousel .newContent .title{
  font-size: 26px;
  font-weight: 600;
}

.bigCarousel .newContent .content{
  font-size: 15px;
  line-height: 24px;
  color: #74787c;
}

.blue{
  background-color: rgb(33,120,255);
  width: 19px;
  height: 355px;
  margin-top: 50px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/*欢迎使用课堂派*/
.welcome{
  background-image: url("../assets/images/welcome.1865e6b9(1).jpg");
  background-position: 50%;
  height: 400px;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 40px 0 auto ;
  display: flex;
  justify-content: center;
}

.show{
  position: absolute;
  top: 0;
  width: 100%;
}

.welcome .content{
  width: 336px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
}

.welcome .content .head{
  font-weight: 500;
  line-height: 48px;
  font-size: 48px;
  margin-top: 88px;
}

.welcome .content .detail{
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 37px;
}

.welcome .content .buttonContent{
  display: flex;
  justify-content: space-around;
}

.welcome .content .buttonContent .connect{
  width: 120px;
  height: 40px;
  color: #fff;
  background: #5293ff;
  box-sizing: border-box;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 5px;
}

.welcome .content .buttonContent .free{
  border:none;
  width: 120px;
  height: 40px;
  background: #fff;
  color: #5293ff;
  cursor: pointer;
  border-radius: 5px;
}
</style>