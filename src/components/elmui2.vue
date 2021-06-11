<template>
 <div>
 <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal"  router='' @select="handleSelect">
  <el-menu-item index="/csolo/csolo">主机信息</el-menu-item>
  <el-submenu index="2">
    <template slot="title">用户管理</template>
    <el-menu-item index="/user/userlist">用户列表</el-menu-item>
    <el-menu-item index="2-2">用户2</el-menu-item>
    <el-menu-item index="2-3">用户3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="3" disabled > 消息中心</el-menu-item>
<el-menu-item index="4">订单管理</el-menu-item>
<el-menu-item >
   <div class="box-img"  @click="onBu">
      <el-tooltip class="item" effect="dark" content="点击退出" placement="top">
      <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </el-tooltip>
    </div>
    </el-menu-item>
    <el-menu-item >
   <div> {{$route.params.username}}</div>
    </el-menu-item>
</el-menu>

<router-view></router-view>
     <!-- <router-link to="/">主页</router-link>
        <router-link to="/HelloWorld">连接页面</router-link>
        <router-link to="/inde">内容</router-link>
        <router-link to="/elmui">我是饿了么ui</router-link>
        <el-button type="primary">引入Element成功</el-button> -->
 </div>
</template>

<script>
export default {
  name: 'elmui',
  data () {
    return {
      activeIndex: '1',
      router: 'true'
    }
  },
  methods:
  {

    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    onBu () {
      this.$router.push(
        {
          path: '/login'
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.box-img {
    display: flex;

}
</style>
