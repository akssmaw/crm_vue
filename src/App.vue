<template>
  <div id="app">

     <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
        isRouterAlive :true
    };

  },
   methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
      console.log(666);
    },
  
  },
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;


  margin-top: 30px;
  
}
  .el-drawer__header{
      margin-bottom:0px
    }
    
 
   :focus{
 
        outline:0;
    }
#tab-0{
  height: 50px;
}
#tab-1{
  height: 50px;
}
#tab-2{
  height: 50px;
}
#tab-3{
  height: 50px;
}

.el-select-dropdown__list{
  display: grid;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

 /* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color:  #bbd8fa85 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #83bdff85;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}
 .el-table .warning-row {
    background: rgb(250, 232, 200);
  }
 
 .el-table .danger-row{
  background: rgb(214, 135, 135);
 }
   .el-calendar-table .el-calendar-day {
  padding: 0px
}
</style>
