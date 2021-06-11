<template>

<div>
  
  
  <div><h2>销售管理</h2></div>

  <!-- <div class="collapse"  >
      <el-collapse  >
        <el-collapse-item title=" 批量操作" name="1">
        
        </el-collapse-item>
          <el-collapse-item title="查询" name="2">
          <el-button type="primary" >查询排序</el-button>
        
        </el-collapse-item>
      </el-collapse>
    </div> -->
     <el-divider content-position="left">用户</el-divider>
    <el-tabs tab-position="left"    @tab-click="handleClick">
    <el-tab-pane label="操作用户">
        <div class="div_button">
          <el-button type="primary" @click="SumbitAdd" >全体增加首资+1</el-button>
            <el-button type="danger" @click="SumbitDel">全体减少首资-1</el-button>
           <el-button type="danger" @click="SumbitDown">全体强制下线</el-button>
             <el-button type="danger" @click="SumbitBanLog">全体禁止登陆</el-button>
               <el-button type="primary" @click="SumbitAllowLog">全体允许登陆</el-button>
      </div>
      <div class="table-div">
    <el-table
    :data="tableData.filter(data => !search || data.uname.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="Id"
      prop="uid">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="uname">
    </el-table-column>

      <el-table-column
      label="MD5"
       :show-overflow-tooltip='true'
      prop="upassword">
    </el-table-column>
    <el-table-column
      label="当天领取个数"
      prop="getnext2">
    </el-table-column>
     <el-table-column
      label="每天首资个数"
      prop="initialcount">
    </el-table-column>
    <el-table-column
      label="当天首资剩余个数"
      prop="nownext2">
    </el-table-column>
    <el-table-column
      label="每日公海领取个数"
      prop="getnext">
    </el-table-column>
    <el-table-column
      label="小组"
      prop="group">
    </el-table-column>
     <el-table-column
      label="权力"
      prop="authority">
    </el-table-column>
     <el-table-column
      label="可保存个数"
      prop="savecount">
    </el-table-column>
    
    <el-table-column  width="300"  
      align="right">
      <!-- eslint-disable -->
      <template slot="header"slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">统计</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
    </el-tab-pane>
    <el-tab-pane label="自动流出">
      
      <div class="ScheduledTimer_div">
    
开启定时：<el-switch
  v-model="ScheduledTimer"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
   <p></p>
<div class="ScheduledTimer_div_vshow" v-show="ScheduledTimer">
 
     <p></p>
     <el-slider 
     class="ScheduledTimer_div_vshow_slider "
      v-model="SysData.scheduledday"
      show-input>
    </el-slider>
    <p></p>
       <p></p>

</div>
   <el-button type="primary" @click="SysDataSubmit()">保存</el-button>
   <el-button type="danger" @click="SysDataCancel()" >取消</el-button>

      </div>
      
    </el-tab-pane>
    <el-tab-pane label="角色管理">
    
    </el-tab-pane>
 
  </el-tabs>
  
    
   
   
 <div  class="div_el_card_centen" v-if="div_el_card"  >
  <el-card class="box-card" v-for="(item2,o) in 3"  :key="item2[o]" >
  <div slot="header" class="clearfix">
    <span>{{item2}} 组</span>
    <el-button style="float: right; padding: 3px 0" type="text" >
成交率： {{ ((dataArray2_V[o].validcountrate / dataArray2_V[o].overallcountrate) * 100).toFixed(3)}} %
； 无效率： {{(((dataArray2_V[o].overallcountrate-dataArray2_V[o].validcountrate) / dataArray2_V[o].overallcountrate) * 100 ).toFixed(3)}} %
    </el-button>
    
   
  </div>
  <div v-for="(item3,k) in dataArray[o]" :key="item3[o]" class="text item div_for_left" >
        <label>姓名： </label><label class="lable_div_tencer">{{ item3.uname }}</label>
        <label>总数： </label><label class="lable_div_tencer">{{ item3.overallcount }}</label>
        <label>成交： </label><label class="lable_div_tencer">{{ item3.validcount }}</label>
      <label>成交率 </label><label class="lable_div_tencer">{{  ((item3.validcount / item3.overallcount) * 100).toFixed(3) }}%</label>
  </div>
  
</el-card>

   </div>
  <div>
    <el-dialog  class="date_time" :title="programuser.uname+'的统计'"  :visible.sync="dialogFormVisible">
          <el-divider content-position="left">领取统计</el-divider>
 <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="center">
    </el-date-picker>
   <el-button type="primary" @click="UseryejiByTime" icon="el-icon-search">查询</el-button>
   <!-- 统计 -->
       <div id="main" style="width: 100%;height:300px;"></div>
 
    <el-divider content-position="left">统计</el-divider>



  <div slot="footer" class="dialog-footer">
    
    <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
    <el-button type="primary" @click="DialogByYes">好的</el-button>
  </div>
</el-dialog>
  </div>
  </div>
 
</template>
 
<script>
 
export default {
  name: 'program',
  data () {
     return {
        tableData: [{}],
        SysData:{scheduledtime:null,scheduledday:null},
        search: '',
        dialogFormVisible: false,
        programuser:[],
        div_el_card:false,
        ScheduledTimer:false,
       
         pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近二个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      value1:[{},{}],
        value2: [{},{}],
        dataArray:[{}],
         dataArray2:[{}],
         dataArray2_V:[]
      }
  },
  methods:{
    
 
    onLoad()
    {
  
  
         const start = new Date();
   start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
 
   let day = this.formatTime(start,'yyyy-MM-dd')+" "+"00:00:00" 
 
  //  最小时间
   const start2 = new Date();
   start2.setTime(start2.getTime());
 
   let day2 = this.formatTime(start2,'yyyy-MM-dd')+" "+"00:00:00"  
 
 console.log(day);

console.log(day2);
       const that = this;

      that
        .axios({
          method: "POST",
          url: "user/UserAll/"+day2+"/"+day,
        })
        .then(function (res) {
      
        that.tableData = res.data.data
            console.log(res.data.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      
      console.log(1)

    },
     handleEdit(index, row) {
      this.programuser=row;
      this.dialogFormVisible=true;

 const newdata1 = this.dateFormat(this.value2[0],'yyyy-MM-dd-hh:mm:ss')
        
     const  newdata2 = this.dateFormat(this.value2[1],'yyyy-MM-dd-hh:mm:ss')
        
        this.value1=[{newdata1},{newdata2}];
      
      console.log(this.value1);
       this.drawChart(this.value1,this.programuser.uid);

      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      DialogByYes(){
         this.dialogFormVisible=false;
   
      },
      UseryejiByTime(){

      

const newdata1 = this.dateFormat(this.value2[0],'yyyy-MM-dd-hh:mm:ss')
        
     const  newdata2 = this.dateFormat(this.value2[1],'yyyy-MM-dd-hh:mm:ss')
        
        this.value1=[{newdata1},{newdata2}];
      
      console.log(this.value1);
       this.drawChart(this.value1,this.programuser.uid);
 
 


      },
      dateFormat(date, fmt) {
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
 
    },
       drawChart(time,uid) {
          
        
         if(time[0].newdata1=='NaN-aN-aN-aN:aN:aN'){
           const that = this;
 that.$message({
          message: "未选择时间段",
          
          type: "error",
        });
         }else{
           console.log("已有时间"+time);
           console.log("已由id"+this.programuser.uid);

           const that = this;
        
          that
               .axios({
                      method: "POST",
                      url: "satisfaction/SatisfactionByUidAndTime/"+time[0].newdata1+"/"+time[1].newdata2+"/"+uid+""
                    })
                    .then(function (res) {
                      
            
                  const stringNum =[]
                  const stringNum2 =[]
           for (let index = 0; index < res.data.data.length; index++) {
          
            
           stringNum.push(''+res.data.data[index].message+'')
          stringNum2.push(res.data.data[index].stat)
           
           }
              
                   //


            let myChart = that.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          // text: "统计图"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: stringNum,
         axisLabel:{
 interval: 0
 }

        },
        yAxis: {},
         color:'#409EFF',
        series: [
          {
   
            type: "bar",
            data: stringNum2
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      
                    });
                      
              // 基于准备好的dom，初始化echarts实例
      
         }
   
    },
    SumbitAdd(){
 this.$confirm('确定要给全体 "增加" 首资额度吗？, 是否继续?', '提示+1', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //增加
 const that = this;

      that
        .axios({
          method: "POST",
          url: "user/UpdateUserAllAddCount"
        })
        .then(function (res) {
       
     
 that.$message({
            type: 'success',
            message: '增加成功!'
          });
          that.onLoad()
        })
        .catch(function (err) {
          console.log(err);
        });
         
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消增加'
          });          
        });
    },
   SumbitDel(){
 this.$confirm('确定要给全体 "减少" 首资额度吗？, 是否继续?', '提示-1', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//减少
 const that = this;

      that
        .axios({
          method: "POST",
          url: "user/UpdateUserNotAddCount"
        })
        .then(function (res) {
       
    that.$message({
            type: 'success',
            message: '减少成功!'
          });
   that.onLoad()
        })
        .catch(function (err) {
          console.log(err);
        });

          
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消减少'
          });          
        });
    },
    SumbitDown(){

       this.$confirm('确定要给全体强制下线吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
 const that = this;

      that
        .axios({
          method: "POST",
          url: "Socket/Allot/1"
        })
        .then(function (res) {
       
      alert(res.data.msg)

        })
        .catch(function (err) {
          console.log(err);
        });

          
        }).catch(() => {
           const that = this;
          that.$message({
            type: 'info',
            message: '已取消'
          });          
        });

      
    },
    SumbitBanLog(){
const that = this;

      that
        .axios({
          method: "POST",
          url: "user/UpdateUserUstate/1"
        })
        .then(function (res) {
       
       that.$message({
            type: 'success',
            message: '禁止登陆成功!'
          });

        })
        .catch(function (err) {
          console.log(err);
        });
      
    },
    SumbitAllowLog(){
const that = this;

      that
        .axios({
          method: "POST",
          url: "user/UpdateUserUstate/0"
        })
        .then(function (res) {
       
      that.$message({
            type: 'success',
            message: '允许登陆成功!'
          });
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
            },
            SysDataSubmit(){
               const that = this; //加载
  
console.log(that.SysData);
 
 
if(that.ScheduledTimer==true){
 
 
   this.$set(that.SysData, 'scheduledtime',1);

}else if(that.ScheduledTimer==false){

 
   this.$set(that.SysData, 'scheduledtime',0);
 
    
}

console.log( that.SysData);
       that.axios({
          method: "POST",
          url: "SysCon/UpdateSysByScheduledtime/"+that.SysData.scheduledtime+"/"+that.SysData.scheduledday
        })
        .then(function (res) {
          if(res.data.data==1){
             that.$message({
          message: '保存成功',
          type: 'success'
        });
          }

 })
        .catch(function (err) {
          console.log(err);
        });


            },
            SysDataCancel(){
 const that = this; //加载
       that.axios({
          method: "POST",
          url: "SysCon/SelectSys"
        })
        .then(function (res) {
            console.log(res.data.data);
          that.SysData=res.data.data ;
       
    
    if(res.data.data.scheduledtime==0){

      that.ScheduledTimer=false;
    }else if(res.data.data.scheduledtime==1){
      
      that.ScheduledTimer=true;

    }
       that.$message.error('取消保存');
        })
        .catch(function (err) {
          console.log(err);
        });
            },
            onSumbit(){
              this.dataArray2_V=[];
const newdata1 = this.dateFormat(this.value2[0],'yyyy-MM-dd-hh:mm:ss')
        
     const  newdata2 = this.dateFormat(this.value2[1],'yyyy-MM-dd-hh:mm:ss')
        
        this.value1=[{newdata1},{newdata2}];
      
      console.log(this.value1);
 const that = this;

      that
        .axios({
          method: "POST",
          url: "group/All/"+that.value1[0].newdata1+"/"+that.value1[1].newdata2
        })
        .then(function (res) {
         
      that.dataArray=  res.data.data.data;
        that.dataArray2=  res.data.data.data2;
        
    
  for (let i = 0; i < res.data.data.data2.length; i++) {
 
 

    that.dataArray2_V.push(res.data.data.data2[i])
  }
     console.log( that.dataArray2_V);
        that.div_el_card=true;
    
        })
        .catch(function (err) {
          console.log(err);
        });


            },
            handleClick(tab){
              
            const that = this;
              if(tab.index==1){
               
                
     
      that
        .axios({
          method: "POST",
          url: "SysCon/SelectSys"
        })
        .then(function (res) {
            console.log(res.data.data);
          that.SysData=res.data.data ;
       
    
    if(that.SysData.scheduledtime==0){
      that.ScheduledTimer=false;
    }else if(that.SysData.scheduledtime==1){
      
      that.ScheduledTimer=true;

    }
       
        })
        .catch(function (err) {
          console.log(err);
        });
        
              }
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
.date_time{
  text-align: center;
 
}
#main{
  text-align: center;
}
.collapse_div{
 text-align: center;
  margin: 30px;
}
.collapse {
  text-align: center;
  margin: 30px;
}
.table-div{
  margin: 10px;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    display: inline-block;
    margin: 60px;
  }
  .div_el_card_centen{
    display: flex;
flex-direction: row;
margin: 40px;
  }
  .div_picker_centen{
    text-align: center;
  }
  .div_for_left{
    text-align: center;
  }
  .lable_div_tencer{

      display: inline-block;
    width: 44px;/*要保证能放得下最长的文字，也可以设置为溢出隐藏形式：overflow: hidden;*/
    text-align: justify;
    text-align-last: justify;
 margin: 8px;
 color: rgb(95, 141, 141);
  }
  .div_button{
    text-align: center;
  }
  .ScheduledTimer_div{
    text-align: center;
  }
  .ScheduledTimer_div_vshow{
 width: 90%;
  }
  .ScheduledTimer_div_vshow_slider{
    text-align: center;
  }
</style>
