<template>
<div>
<el-row :gutter="0">
  <el-col :span="11"><div class="grid-content bg-purple">
    <div class="div-collapse" >
    <el-collapse v-model="activeNames" >
  <el-collapse-item title="我的业绩" name="1">
 <div class="block">
    <span class="demonstration">选择时间</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
     :default-time="['00:00:00','00:00:00']">
      align="centen">
    </el-date-picker>
    <el-button type="" @click="onsumbit">查询</el-button>
  </div>
     
  <h2 style="font-family:'Times New Roman';font-weight: 600;">今日创建订单：{{orderAndUid.zongCount}}     总额 ：{{orderAndUid.zongTotal}}     已通过：{{orderAndUid.enter}}     待入账：{{orderAndUid.lodingenter}}  </h2>
<p></p>
<div v-if="orderAndUid2Hid"> 
  <h2 style="font-family:'Times New Roman';font-weight: 600;">{{orderAndUid2Day}} <br> 
    创建订单：{{orderAndUid2.zongCount}}  个 <br>
        已通过：{{orderAndUid2.enter}}   ,   待入账：{{orderAndUid2.lodingenter}}   <br> 
            总额 ：{{orderAndUid2.zongTotal}}    <br> 
         </h2>
   
    

</div>
 
 
  </el-collapse-item>
  <el-collapse-item title="排行榜" name="2">
    <div id="main" style="width: 100%;height:300px;" ></div>
     <el-button type=""  @click="out()">查询排行榜</el-button>
  </el-collapse-item>
  <el-collapse-item title="待增加1 Efficiency" name="3" >
    待增加1
  </el-collapse-item>
  <el-collapse-item title="待增加2 Controllability" name="4">
   待增加2
  </el-collapse-item>
</el-collapse>
  </div>
    </div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">
    </div></el-col>
  
 
</el-row>
  
</div>
</template>

<script>
import Notify from '@wcjiang/notify';
export default {
  name: 'index',
  
  data () {
    return {
      msg: '我是内容',
       activeNames: ['1','2'],
       total:6,
       getDate:'',
       total2:'',
       getDate2:'',
       value2: '',
       demo:1,
       demo0:{},
       uid:window.localStorage.getItem("uid"),
       admin:window.localStorage.getItem("admin"),
      //  今日创建订单总数  总额   已入账户    待入账   
       orderAndUid:{zongCount:'',zongTotal:'',enter:'',lodingenter:''},
        orderAndUid2:{zongCount:'',zongTotal:'',enter:'',lodingenter:''},
        orderAndUid2Day:'',
        orderAndUid2Hid:false,
        notifyData:{},
   pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '前天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  methods:{
     notifyMe(title,body) {
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
     dateFormat(time) {
            let year = new Date().getFullYear();//年
            let month = new Date().getMonth() + 1;//注意！月份是从0月开始获取的，所以要+1;
            let day = new Date().getDate();//日
              const todayDate = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day);
      return todayDate ;
    },
     timeFormat: function (date) {
        if (!date || typeof(date) === "string") {
          this.error("参数异常，请检查...");
        }
        var y = date.getFullYear(); //年
        var m = date.getMonth() + 1; //月
        var d = date.getDate(); //日
     const todayDate = y + '-' + (m >= 10 ? m : '0' + m) + '-' + (d >= 10 ? d : '0' + d);
        return todayDate;
      },
       getcookie(objname) {//获取指定名称的cookie的值
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) return unescape(temp[1]);
    }
},
 
    onLoad(){

//         const starTime = new Date();

//       const data = JSON.parse(this.getcookie("data"));
 
// for(var i=0;i<data.length;i++){
 
//   if(data[i].date==this.dateFormat(starTime)){
 

//       this.notifyMe("您好！ "+data[i].date+" ","记得 "+data[i].content);
//   }else{

//   }

 
 
// }
 
  
//    const date = new Date();

//     var weekday = date.getDay()||7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7

//     date.setDate(date.getDate()-weekday+1+6);//往前算（weekday-1）天，年份、月份会自动变化  
//     // +6是最后一天 
//     // 2021-5-2
 
//  alert(this.timeFormat(date))
 
 const date = new Date();
  const that = this; //加载
//4/2021-03-16 00:00:00/2021-03-17 00:00:00
      that
        .axios({
          method: "POST",
          url: "notify/v1/"+that.uid,
        })
        .then(function (res) {
            console.log("res");
            console.log( res.data.data.count_1);
 
 


      //获取
      
 if(that.getcookie("mess_pop_1")==null){
 
 console.log(222);
  
 
    
//弹出
      that.notifyMessage("未保存有效，即将流出："+res.data.data.count_1,"未填写线索，即将流出："+res.data.data.count_2,"未更新线索，即将流出："+res.data.data.count_3);    
 const mess_pop_1 = {id:1,date:that.dateFormat(date),state:1}
        document.cookie = "mess_pop_1="+JSON.stringify(mess_pop_1)

 }else{
  
     const date = new Date();
    const mess_pop_1 = JSON.parse(that.getcookie("mess_pop_1"));
    const oDate1 = new Date(mess_pop_1.date);
    const oDate2 = new Date(that.dateFormat(date));

    if(oDate2.getTime() > oDate1.getTime()){
      //必须提示 并且修改时间
      
          //弹框
    that.notifyMessage("未保存有效，即将流出："+res.data.data.count_1,"未填写线索，即将流出："+res.data.data.count_2,"未更新线索，即将流出："+res.data.data.count_3);   
        
    }
    else if(oDate2.getTime() == oDate1.getTime() && mess_pop_1.state==1 ){
       
  //state==1 继续提示
      
    //弹出
      that.notifyMessage("未保存有效，即将流出："+res.data.data.count_1,"未填写线索，即将流出："+res.data.data.count_2,"未更新线索，即将流出："+res.data.data.count_3);  
  
   
        
    
    }else if(oDate2.getTime() == oDate1.getTime() && mess_pop_1.state==2) {
      
    }
 }








        })
        .catch(function (err) {
          console.log(err);
        });


  


   console.log( this.$store.state.items);
   this.$store.commit('setname',"6水水水水水水水水水水水水水水水水水水6")
      console.log( this.$store.state.uname);
    //  最大时间
   const start = new Date();
   start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
 
   let day = this.formatTime(start,'yyyy-MM-dd')+" "+"00:00:00" 
 
  //  最小时间
   const start2 = new Date();
   start2.setTime(start2.getTime());
 
   let day2 = this.formatTime(start2,'yyyy-MM-dd')+" "+"00:00:00"  
 

 
//4/2021-03-16 00:00:00/2021-03-17 00:00:00
      that
        .axios({
          method: "POST",
          url:
            "OrderAnd/SelectOrderAndUid" +"/"+
            this.uid +
            "/" +day2+"/"+day
        })
        .then(function (res) {
          that.orderAndUid = res.data.data;
          console.log(res.data);
        
        })
        .catch(function (err) {
          console.log(err);
        });
    this.out();
    },


notifyMessage(mess_1,mess_2,mess_3){
    const h = this.$createElement;
          const that = this; //加载
   that.$notify({
  title: '系统消息',
  onClick:function(){
    this.close();
  },
  message: h('p', [
    h('p', null,mess_1 ),
  h('p', null, mess_2),
   h('p', null, mess_3),
    h('p', {
      style: 'text-align: right;width:195px;dispaly:block;margin-top: 8px;color:#43c39d',
      on: {
        click: () => {
       that.$notify.close()
                const date = new Date();
 const mess_pop_1 = {id:1,date:this.dateFormat(date),state:2}
        document.cookie = "mess_pop_1="+JSON.stringify(mess_pop_1)
           
           
        },
      },
    }, '今日不提示'),
  ]),
  duration: 0,
  position: 'bottom-right',
  customClass: 'bulletin_notic',
});
},

    out(){
this.demo=0;
          //  最大时间
   const start = new Date();
   start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
 
   let day = this.formatTime(start,'yyyy-MM-dd')
 
  //  最小时间
   const start2 = new Date();
   start2.setTime(start2.getTime());
 
   let day2 = this.formatTime(start2,'yyyy-MM-dd' )

    const that = this; //加载

            let myChart = that.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
    
        //加载
      that
        .axios({
          method: "POST",
          url: "total/TotalAll/" +day2+"/"+day ,
        })
        .then(function (res) {
            console.log(res.data.data);
            if(res.data.data.length==0){
              console.log("暂无开单");
            }
           const stringNum =[]
                
           for (let index = 0; index < res.data.data.length; index++) {
          
            
           stringNum.push(''+res.data.data[index].name+'')
       
           
           }
        
             let option = {

          title : {
            text: day2+" 至 "+day,
            subtext: '统计',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show: true,
            orient: 'vertical',
            left: 'left',
            data: stringNum
        },
        series : [
            {
                name: '统计',
                type: 'pie',
                radius : '65%',
                center: ['50%', '60%'],
                data:res.data.data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
         ]
       
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
       
        })
        .catch(function (err) {
          console.log(err);
        });
   
      
    },
    onsumbit(){
   console.log( this.value2);
   this.getDate = this.formatTime(this.value2[0],'yyyy-MM-dd hh:mm:ss') +"  -  "+this.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss') 

  
   
    alert(this.uid)

  const that = this; //加载
//4/2021-03-16 00:00:00/2021-03-17 00:00:00
      that
        .axios({
          method: "POST",
          url:
            "OrderAnd/SelectOrderAndUid" +"/"+
            this.uid +
            "/" +this.formatTime(this.value2[0],'yyyy-MM-dd hh:mm:ss')+"/"+this.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss')
        })
        .then(function (res) {
               that.orderAndUid2 = res.data.data;
                 that.orderAndUid2Hid=true;
               that.orderAndUid2Day=that.formatTime(that.value2[0],'yyyy-MM-dd hh:mm:ss') +"-"+that.formatTime(that.value2[1],'yyyy-MM-dd hh:mm:ss')
      
        })
        .catch(function (err) {
          console.log(err);
        });

    },
      formatTime: function (date, fmt) {
                var date = new Date(date);
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                var o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (var k in o) {
                    if (new RegExp('('+k+')').test(fmt)) {
                        var str = o[k] + '';
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return fmt;
            }
 
    
  }, 
     beforeRouteEnter(to, from, next) {
     next((vm) => {
      vm.onLoad();
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.div-collapse{
  margin: 40px;
    text-align: center;
}
 
</style>
