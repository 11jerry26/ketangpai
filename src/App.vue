 <template>
  <div id="app">
<!--    展示当前路由所在页面-->
    <router-view></router-view>
    <el-backtop style="right: 8px;bottom: 80px;color: rgb(95,99,104);border-radius: 0">
      <div class="backToTop">
        <i class="el-icon-top"></i>
        <span>顶部</span>
      </div>
    </el-backtop>
  </div>
</template>

<script>

export default {
  name: 'App',
  components:{
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}

.el-backtop {
  position: fixed;
  background-color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  cursor: pointer;
  z-index: 5;
}

.backToTop{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.el-icon-top{
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-icon-top:before {
  content: "\e6e6";
}

.el-backtop .backToTop span {
  font-size: 12px;
}

</style>
