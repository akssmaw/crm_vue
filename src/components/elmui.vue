<template>
 <div>

 <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal"  @select="handleSelect">

  <el-menu-item   v-for="item in items" :key="item.messurl" :index="item.messurl">{{item.message}}</el-menu-item>

 <!-- <el-menu-item v-if="admin!=0"  index="csolo/csolo" >csolo</el-menu-item> -->

 <el-menu-item v-if="admin!=0"  index="user/uservalid" >私海</el-menu-item>

  <el-menu-item v-if="admin!=0"  index="user/pastuser" >总客源</el-menu-item>
 
  <el-menu-item v-if="admin==0"  index="program" >销售管理</el-menu-item>

 
  <el-submenu v-if="admin==0" index="2">

    <template  slot="title">公司管理</template>

      <el-menu-item index="company">统计</el-menu-item>
      
      <el-menu-item index="admin/bill">订单</el-menu-item>
   

      <el-menu-item index="operation/operationlist">客源</el-menu-item>

     <el-menu-item index="admin/chat">客服</el-menu-item>

  </el-submenu>


    <el-menu-item style="float: right;" >
 
   <el-dropdown>
     
  <span class="el-dropdown-link">
     {{uname}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>

  
  <el-dropdown-menu slot="dropdown">
    
    <el-dropdown-item @click.native="onBu"><label>退出登录</label></el-dropdown-item>
 

  </el-dropdown-menu>
</el-dropdown>

    </el-menu-item>

</el-menu>

<router-view>
  
</router-view>
     

     
 </div>
 
</template>
 
<script>
import {sockjs } from '../socket/sockjs.min.js' //注意路径
import {stomp } from '../socket/stomp.min' //注意路径
import Notify from '@wcjiang/notify';
export default {
  name: 'elmui',
   inject :['reload'],
  data () {
  
    return {
      items:[{}],
      activeIndex: '1',
      uname:window.localStorage.getItem('uname'),
      admin:window.localStorage.getItem('admin'),
       uid:window.localStorage.getItem('uid'),
      router: 'true',
      son:sessionStorage.getItem('son'),
     activeNames: ['1']

    }
  },
  methods:
  {
    onLoad(){
    

      console.log(5555);

    },
 notifyMe(title,body) {
// 		   if (!Notification) {
// 		     alert('Desktop notifications not available in your browser. Try Chromium.'); 
// 		     return;
// 		   }
		 
// 		   if (Notification.permission !== "granted")
// 		     Notification.requestPermission();
// 		   else {
// 		     var notification = new Notification(title,{
// 		       icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
// 		       body: body,
// 			   requireInteraction: true, //在此处设置 requireInteraction
     
// 	  data: {
//         url: 'localhost:8080/crm_system/user/getuser'
//     },
// 		     });
		 
		    
// 		notification.onshow = function () {
//     console.log('通知显示了！');
// }
// notification.onclick = function (e) {
//     //可以直接通过实例的方式获取data内自定义的数据
//     //也可以通过访问回调参数e来获取data的数据
//     window.open(notification.data.url);
//     notification.close();
// }
// notification.onclose = function () {
//     console.log('你墙壁了我！！！');
// }
// notification.onerror = function (err) {
//     console.log('出错了，小伙子在检查一下吧');
//     throw err;
// }
		    
// 		   }
		 

     var iN = new Notify({ });
            iN.notify({
             
 
              title: title,
              body:  body,
              openurl: 'http://xuebim.net:8080/crm_system/user/getuser',
       icon:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2614555822,2668128081&fm=11&gp=0.jpg',
              onclick: () => {
                console.log('on click');
                iN.close();
              },
              onshow: () => {
                console.log('on show');
              },
            });
           
		 },
 

    handleSelect ( keyPath) {
      console.log( keyPath)
        const that = this;
           if (localStorage.getItem("uid") != null) {
	    
	  }else{ 
           const that = this;
       that.$message({
          message: "登录已过期，从新登陆",
      
          type: "success",
        });
      setTimeout(function () {

          window.localStorage.clear();  
    // 这里就是处理的事件
       that.$router.push(
        {
          path: '/login'
        }
      )
}, 1000);
       
    
    
	  }
      if(keyPath==null){
       
        console.log(keyPath)
  
      }else{
             that.$router.push({  path: '/'+keyPath,name: keyPath,name   })
      }
    },
    onBu(){
     window.localStorage.clear();
      this.$router.push(
        {
          path: '/login'
        }
      )
    },
  
  
  },
    beforeRouteEnter(to, from, next) {
     next((vm) => {
      vm.onLoad();
    });
  },
    created(){
       
    console.log("加载"+localStorage.getItem('items'))
this.items=JSON.parse(window.localStorage.getItem('items'))
console.log(SockJS);

//  var socket = new SockJS("http://115.28.209.225:8080/crm_system-0.0.1-SNAPSHOT/myWebSocket"); 
     var socket = new SockJS("http://localhost:8080/myWebSocket");//如果前后端分离项目需要拼接具体地址，前后端分离index.html可放在
        const that = this;
       this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, function (frame) {
            console.log(frame);

            //分配客户的  地址：http://localhost:8080/Socket/Allot?message=%E5%88%86%E9%85%8D%E5%AE%A2%E6%88%B7%E4%BA%86
            that.stompClient.subscribe('/topic/Allot', function (body) {
				
		console.log(body.body);
    
        if(body.body=="1"){
          if(window.localStorage.getItem("admin")==0){
            
             alert("下线成功")
            
          }else{


                    window.localStorage.clear();  
      
             that.notifyMe('更新通知',' 更新系统，强制下线 ');
            that.$router.push(

        {
          path: '/login'
        }
      )
          }
      
       }
         if(body.body=="2"){
              console.log("销")
          if(window.localStorage.getItem("admin")==0){
            
        
            
          }else{
            console.log("销")
          if(that.$route.path=="/user/getuser"){
console.log(1)
            that.reload();

          }else{

          }
    
             that.notifyMe('客源通知','有新的客源进入了！，请及时领取！');
          
          
          }
      
       }
       if(body.body=="3"){
          if(window.localStorage.getItem("admin")==0){
            
        
            
          }else{
    
             that.notifyMe('客源通知','客服录入新的客源了！，请及时领取！');
          
          }
      
       }
       
             
            });
            that.stompClient.subscribe('/topic/Refresh', function (body) {

 if(window.localStorage.getItem("admin")==0){

alert("管理员分配了数据 但是并没有刷新页面 页面更新了  获得当前的页数 保持状态  执行axios从新拿到数据 ")

        }else{
            that.$message({
          message: '管理员分配数据成功,2秒后即将刷新页面',
          type: 'success'
                });

         setTimeout(() => {
                location.reload();
   
            }, 2000);

        }
        
   
 
             
            });
            
                that.stompClient.subscribe('/topic/GetuserById', function (body) {
				
         if(window.localStorage.getItem("admin")==0){

         }else{
 console.log(11111111111111111111111111111111111111111111)
         that.$message({
          message: "管理员已流入新客户",
          duration:0,
          type: "success",
        });
         }
       
        
		 
             
            });
        });


    },
    onmounted(){
      
  

    },
      
}
console.log("\n %c  CRM_SYSTEM:  www.xuebim.net  版本号： %c -V 1.0.0 \n\n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;") 
 
</script>

 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.box-img {
    display: flex;

}
.Zd_collapse{
  margin: 40px;
}
</style>
