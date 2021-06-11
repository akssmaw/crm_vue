<template>
  <div class="hello">
    <div id="div_box">
      <div id="div_box_top" :style="{background:div_box_top.style}"  > 
         <div class="block" id="div_box_img" ><el-avatar :size="50" :src="div_box_img"></el-avatar>

          <label id="div_box_title"  :style="{fontSize:div_box_title.fontSize,fontWeight:div_box_title.fontWeight}" >{{ div_box_title.title }}</label>
          
         </div>
          



      </div>
      
 <el-container>
<!-- 发送信息 -->
  <el-main  >
    <div id="el_main">
    <div class="el_main_div" id="el_main_div" v-html="el_man_html"  >
      <div>

        
      </div>
<!--  你发的-->
<div class="el_main_div_you">
   <el-avatar :size="40" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1826598918,3479123839&fm=26&gp=0.jpg"></el-avatar>
   <p class="el_main_div_you_lable">
  <label>张老师</label>
  <label> 2018-2-3 14:10:20</label>
 </p>
    <div  class="el_main_li_you" >
      <div>s水水  水水水水水水水水水水杀杀杀杀杀水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水杀杀杀水水水水水水水水水水水水水水水水水水水水水水水水水水杀水水水水水水水水水水</div>
    </div>
    <p/>
</div>
    <!--  你发的-->


    <!-- 我发的 -->
  <div>
      <div class="el_main_div_my">
        <div class="el_main_li_my" >  
       <div>你也是a</div>   
    </div>
     <p />
 </div>
    </div>
  <!-- 我发的 -->

<!--  你发的-->
<div class="el_main_div_you">
   <el-avatar :size="40" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1826598918,3479123839&fm=26&gp=0.jpg"></el-avatar>
   <p class="el_main_div_you_lable">
  <label>张老师</label>
  <label> 2018-2-3 14:10:20</label>
   </p>
    <div  class="el_main_li_you" >
      <div>s水水  水水水水水水水水水水杀杀杀杀杀杀水水水水水水水水水水水水水水水水水水水杀水水水水水水水水水水水水水水杀杀水水水水水水水水水水</div>
       <p/>
    </div>
   
</div>
  
    <!--  你发的-->

<!--  你发的-->
<div class="el_main_div_you">
   <el-avatar :size="40" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1826598918,3479123839&fm=26&gp=0.jpg"></el-avatar>
   <p class="el_main_div_you_lable">
  <label>张老师</label>
  <label> 2018-2-3 14:10:20</label>
   </p>
    <div  class="el_main_li_you" >
      <div>s水水  水水水水水水水水水水杀杀杀杀杀杀水水水水水水水水水水水水水水水水水水水杀水水水水水水水水水水水水水水杀杀水水水水水水水水水水</div>
       <p/>
    </div>
</div>
  
    <!--  你发的-->

 
   <!-- 我发的 -->
    <div>
      <div class="el_main_div_my">
        <div class="el_main_li_my" >  
       <div>你也是a</div>   
    </div>
     <p />
 </div>
    </div>
  <!-- 我发的 -->
    
    
   <!-- 我发的 -->
    <div>
      <div class="el_main_div_my">
        <div class="el_main_li_my" >  
       <div >你也是a</div>   
    </div>
     <p />
 </div>
    </div>
  <!-- 我发的 -->
    </div>
    </div>
        <el-divider></el-divider>
<!-- 文本域 -->
<el-input type="textarea" style="height:70px" v-model="form.desc"></el-input>

<el-button class="onSumbit" @click="onSumbit()">发送</el-button>
  <el-button class="onSumbit" @click="onSumbit2()">发送2</el-button>                                                                                               
  </el-main>



  
  <!-- 右边导航 -->
    <el-aside width="200px" >
<div id="el-aside-about" >关于我们</div>
  <el-divider></el-divider>
  <!-- img -->
<div></div>

<!-- img下面 -->
<div class="el_aside_bananer">
  <div class="block">

    <el-carousel height="150px">
      <el-carousel-item v-for="item in el_aside_bananer" :key="item.id">
        <img :src="item.ImgUrl" style="width:100%;height: 100%;"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</div>
    </el-aside>
</el-container>
      
      </div>

  </div>

</template>

<script>
import {sockjs } from '../../socket/sockjs.min.js' //注意路径
import {stomp } from '../../socket/stomp.min' //注意路径
export default {
  
  name: 'chat',
  data () {
    return {
        div_box_img: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1826598918,3479123839&fm=26&gp=0.jpg",
      div_box_title: {title:'BIM咨询中心',fontSize:'20px',fontWeight:'800'},
      div_box_top:{style:'#91AAC8'},
      el_aside_bananer:[
      {ImgUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3821050880,2624819807&fm=26&gp=0.jpg',id:1},
      {ImgUrl:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2465178703,1419738502&fm=26&gp=0.jpg',id:2},
      {ImgUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3821050880,2624819807&fm=26&gp=0.jpg',id:3},
      {ImgUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3821050880,2624819807&fm=26&gp=0.jpg',id:4}
      ],
      form:{desc:""},
      el_man_html:''
    }
   
  },
 methods:{
   onSumbit(){
     if( this.form.desc==""){
         this.$message({
          message: '消息为空',
          type: 'warning'
        });
     }else{
  
      this.el_man_html+='<div><div class="el_main_div_my"><div class="el_main_li_my" ><div>'+ this.form.desc+'</div></div><p /></div></div>'
      let msg = document.getElementById('el_main_div') // 获取对象 
      this.$nextTick(() => {
      msg.scrollTop = msg.scrollHeight// 滚动高度
      });
             
  this.form.desc="";

     }
  
   
      
   },
    onSumbit2(){
     this.el_man_html+='<div class="el_main_div_you"> <p class="el_main_div_you_lable"><label >张老师</label><label> 2018-2-3 14:10:20</label></p><div  class="el_main_li_you" ><div>s水水  水水水水水水水水水水杀杀杀杀杀杀水水水水水水水水水水水水水水水水水水水杀水水水水水水水水水水水水水水杀杀水水水水水水水水水水</div><p/></div></div>'
   
         let msg = document.getElementById('el_main_div') // 获取对象
         this.$nextTick(() => {
   msg.scrollTop = msg.scrollHeight // 滚动高度
});
           
              console.log(msg.scrollHeight);
      
   }
 },
 created(){
   var socket = new SockJS("http://localhost:8080/myWebSocket");//如果前后端分离项目需要拼接具体地址，前后端分离index.html可放在
        const that = this;
       this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, function (frame) {
            console.log(frame);

            //分配客户的  地址：http://localhost:8080/Socket/Allot?message=%E5%88%86%E9%85%8D%E5%AE%A2%E6%88%B7%E4%BA%86
            that.stompClient.subscribe('/topic/ChatMess', function (body) {
				
			alert(body.body)
             
            });
        });
   
 }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
#div_box{

width: 800px;
height: 600px;
  margin: 150px auto;
  border: 1px solid #e4e7ed;

  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
 
}

#div_box_top{
height: 80px;

}
#div_box_img{
margin-left: 20px;
padding-top: 20px;
}
#div_box_title{
 vertical-align: 50%;
 margin: 20px;
 color:#F0F1F2;

}
.el-main {
    background-color: #E9EEF3;
    color: #333;
    overflow: hidden;
  }

  #el-aside-about{
text-align: center;
margin: 20px;
  }
  .el_aside_bananer{

    margin-top: 335px;
  }
 #el_main_div{
   height: 240px;
     overflow-x: hidden;
     overflow-y: auto;
 }
.onSumbit{
margin-left:87%;
}
.el-textarea__inner{
  padding:8px
}
.el_main_div ul li{
  list-style: none;
 
 
}
.el_main_li_you div{
 
  background-color:#9DA9B8;

  border-radius: 5px;
 padding: 11px;
margin: 5px;
font-size: 14px;
}
.el_main_div_you{
  margin: 15px;
}
.el_main_li_my:after{
  content: "";
    display: block;
    clear: both;
}

.el_main_li_my div{
  background-color: #BFCAD6;

  border-radius: 5px;
  padding: 11px ;
  margin: 5px;
  font-size: 14px;
float:right;

}

.el_main_div_you_lable{
   font-size: 13px;
  display: inline;
  color: #62778C;
 vertical-align: 80%;
 margin: 15px;
}


</style>
