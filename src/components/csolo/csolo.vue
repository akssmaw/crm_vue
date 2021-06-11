<template>
<div>
<div>
  
<el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form  >
    <el-form-item label="提醒我：" >
      <el-input v-model="textarea" autocomplete="off" type="textarea"></el-input>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer"> 
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="onsumbit(title,textarea)">保 存</el-button>
  </div>
</el-dialog>
</div>
<el-calendar>
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  
  <template
    slot="dateCell"
    slot-scope="{data}">
    <div :class="dealMyDate2(data.day)" class="div_bak"   @contextmenu.prevent="row_click(data)">
      
<h5  class="data_h" >
      
    
       <el-tooltip class="item" effect="dark" :content="dealMyDate(data) " placement="top">
         <el-popconfirm
  title="确定删除提示吗？"
  @onConfirm='ount(data)'
>
    <label  slot="reference"><label class="time_lable">{{ data.day.split('-').slice(1).join('-') }}</label>  <br> <label  class="data_p" >{{dealMyDate(data.day)}} </label> </label>
 
</el-popconfirm>
 
    </el-tooltip>
</h5>

  
    </div>
  </template>
</el-calendar>
  </div>
</template>
 
<script>

export default {
  name: 'csolo',
  data () {
    return {
      msg: '我是主机信息展示',
       dialogFormVisible: false,
       textarea:'',
        title:'',
         resDate: [{}  ]
    }
  } ,
    methods:{
        dealMyDate(v) {
           
            let len = this.resDate.length
            let res = ""
            for(let i=0; i<len; i++){
                if(this.resDate[i].date == v) {
                    res = this.resDate[i].content
                    break
                }
            }
            return res
        },
        ount(data){
       
const  array=JSON.parse(this.getcookie("data"));
 
          for (var i=0; i< array.length; ) {
 
            if(array[i].date==data.day){

           
                    array.splice(i, 1);
                 continue;
               

            }
            i++;
          
            const str = JSON.stringify(array)
        document.cookie = "data="+str
              this.resDate=str;
          }

        },
         
          dealMyDate2(v) {
           
            let len = this.resDate.length
            let res = ""
            for(let i=0; i<len; i++){
             
                if(this.resDate[i].date == v) {
                    return "is-selected"
                    
                }
            }
            return ""
        },
        row_click(data){
          this.textarea=''
          this.dialogFormVisible=true;
          this.title=data.day

          
        }
        ,
        row_click2(data){
 

    
        },
        onsumbit(title,textarea){


     const data = {date:title,content:textarea}
 
 this.resDate.unshift(data)

 
var str = JSON.stringify(this.resDate)
 document.cookie = "data="+str

        },
       getcookie(objname) {//获取指定名称的cookie的值
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) return unescape(temp[1]);
    }
}, 
    } ,created(){
// const data = [{name:'1',age:1},{name:'2',age:2}]

// const array={name:'3',age:1};

// data.push(array)
        // 设置cookie
        
//     var str = JSON.stringify(data)
//     document.cookie = "data="+str
//   console.log(JSON.parse(this.getcookie("data")));

//  console.log(this.resDate);
  
 
const data = JSON.parse(this.getcookie("data"));
 this.resDate=data;

 

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-selected {
  background-color: bisque;

   
  }
  .div_bak{
 width: 100%;
 height: 100%;

  margin-top: -22px;
  }
 
   .data_h{
     padding: 10px;
   }
   .time_lable{
font-size: 15px;
   }
 .data_p{
    overflow:hidden; 
 text-overflow:ellipsis;
 display:-webkit-box; 
 /* autoprefixer: off */
 -webkit-box-orient:vertical; 
 /* autoprefixer: on */
 -webkit-line-clamp:1; 
 margin-top: 20px;
 color: #636568;
  }
</style>
