<template>
  <div class="hello">
   <div>
    
       
  <el-tabs :tab-position="tabPosition" @tab-click="handleClick">
    <el-tab-pane label="统计"  >
 <div class="div_picker_centen" >
   
 <div class="block">
       <el-select v-model="bySort" placeholder="请选择">
           <el-option key="0" value='0' label="默认" selected = "selected" >
    </el-option>
    <el-option key="1" value="1" label="金额排序">
    </el-option>
        <el-option key="2" value="2" label="组排序">
    </el-option>
  </el-select>
    <span class="demonstration">  </span>
    <el-date-picker
    v-model="value2"
      type="datetimerange"
       :picker-options="pickerOptions"
           :default-time="['00:00:00', '00:00:00']"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="center"
      >
    </el-date-picker>
    <el-button @click="onSumbitByTime">查询统计</el-button>
  </div>


  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="uid"
      prop="uid">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="uname">
    </el-table-column>

     <el-table-column
      label="预付金额"
      prop="prepay">
    </el-table-column>
     <el-table-column
      label="总额"
      prop="total">
    </el-table-column>
     <el-table-column
      label="订单数量"
      prop="count">
    </el-table-column>

     <el-table-column
      label="每日领取数"
     >
       <template slot-scope="scope">
        A_{{scope.row.getnext2}}
      </template>
    </el-table-column>


     <el-table-column
      label="领取数"
      >
      <!-- eslint-disable-next-line -->
       <template slot-scope="scope">
        {{scope.row.getuser2count}}
      </template>
    </el-table-column>

 <el-table-column
      label="有效数"
      prop="setusercount">
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
      align="right">
           <!-- eslint-disable -->
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleSelect(scope.$index, scope.row)">查询</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>

 

    </el-tab-pane>
    <el-tab-pane label="小组">
    
    <div class="div_picker_centen" >
 <div class="block">
    <span class="demonstration">  </span>
    <el-date-picker
    v-model="value2"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="center"
      >
    </el-date-picker>
    <el-button @click="onSumbit">查询</el-button>
  </div>

    </div>
   
 <div  class="div_el_card_centen" v-if="div_el_card"  >
  <el-card class="box-card" v-for="(item2,o) in 3"  :key="item2[o]" >
  <div slot="header" class="clearfix">
    <span>{{item2}} 组</span>
    <el-button style="float: right; padding: 3px 0;text-align: left;" type="text" >
<div style="">
  成交率： {{ ((dataArray2[o].validcountrate / dataArray2[o].overallcountrate) * 100).toFixed(3)}} %
； 无效率： {{(((dataArray2[o].overallcountrate-dataArray2[o].validcountrate) / dataArray2[o].overallcountrate) * 100 ).toFixed(3)}} %;
</div>
<br>
<div>
  总成交：{{dataArray3[o].totalsum}}；
已付额：{{dataArray3[o].prepaysum}}；
总数量：{{dataArray3[o].count}}；
</div>
    </el-button>
    
   
  </div>
  <div v-for="(item3) in dataArray[o]" :key="item3[o]" class="text item div_for_left" >
        <label>姓名： </label><label class="lable_div_tencer">{{ item3.uname }}</label>
        <label>总数： </label><label class="lable_div_tencer" style="width:20px">{{ item3.overallcount }}</label>
        <label>成交： </label><label class="lable_div_tencer" style="width:20px">{{ item3.validcount }}</label>
      <label>成交率 </label><label class="lable_div_tencer">{{  ((item3.validcount / item3.overallcount) * 100).toFixed(3) }}%</label>
  </div>
  
</el-card>

   </div>

        
    </el-tab-pane>
    <el-tab-pane label="公司">
   
             <div id="main" style="width: 1600px;height:400px;"></div>
           <div class="Date_zong"><h2>今年销售总额：{{zongtotal}} 元</h2></div>
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
  
   </div>
  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      msg: 'Welcome to Your company App',
       tabPosition: 'left',
          dataArray:[{}],
         dataArray2:[{}],
         dataArray2_V:[],
         dataArray3:[],
           value2: [{},{}],
           bySort:'0',
           tableData: [{ }],
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
          }, {
            text: '最近二个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        search: '',
          div_el_card:false,
         zongtotal:0,
         check:0,
        
          
    }
  },
  
  created(){
    
 

  },
  methods:{
    echo(tlist){
   const that = this;
   let myChart = that.$echarts.init(document.getElementById("main"));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {              //设置tip提示
                trigger: 'axis'
            },
            
            legend: {               //设置区分（哪条线属于什么）
                data:['销售额','暂无']
            },
            color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
            xAxis: {                //设置x轴
                type: 'category',
                boundaryGap: false,     //坐标轴两边不留白
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
                name: '时间 / 月',           //X轴 name
                nameTextStyle: {        //坐标轴名称的文字样式
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 0, 20]
                },
                  axisLabel:{
 interval: 0
 },
                axisLine: {             //坐标轴轴线相关设置。
                    lineStyle: {
                        color: '#FA6F53',
                    }
                }
            },
            yAxis: {
                name: '销售额 / 元',
                nameTextStyle: {
                    color: '#FA6F53',
                    fontSize: 16,
                    padding: [0, 0, 10, 0]
                },
                axisLine: {
                    lineStyle: {
                        color: '#FA6F53',
                    }
                },
                type: 'value'
            },
            series: [
              {
                name: '销售额',
                data:  tlist,
                type: 'line',               // 类型为折线图
                lineStyle: {                // 线条样式 => 必须使用normal属性
                    normal: {
                        color: '#8AE09F',
                    }
                },
              },
              {
                name: '暂无',
                data: [0, 0, 0, 0, 0, 0, 0],
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#FA6F53',
                    }
                },
              }
          ]
        };
 
        // 使用刚指定的配置项和数据显示图表。
   myChart.setOption(option);
            myChart.resize();
 
               myChart.on("mouseover", that.eConsole);
    },
    eConsole:function(param){
            　 
            　 this.check=param.dataIndex;
            　 
            alert(this.check)


            },
            handleSelect(index,row){
              console.log(row.uid)
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
    onSumbitByTime(){
  
      const newdata1 = this.dateFormat(this.value2[0],'yyyy-MM-dd-hh:mm:ss')
        
     const  newdata2 = this.dateFormat(this.value2[1],'yyyy-MM-dd-hh:mm:ss')
        
        this.value1=[{newdata1},{newdata2}];
      
      console.log(this.value1);

console.log(this.bySort);

    const that = this;
that.axios({
          method: "POST",
          url: "UserStatis/All/"+that.value1[0].newdata1+"/"+that.value1[1].newdata2+"/"+that.bySort,
        })
        .then(function (res) {
       
       that.tableData = res.data.data
            
        })
        .catch(function (err) {
          console.log(err);
        });


      
    },
          onSumbit(){
          
            
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
        that.dataArray3=res.data.data.data3;
 
  
        that.div_el_card=true;
    
        })
        .catch(function (err) {
          console.log(err);
        });


            },
            
              handleClick(tab){
         
       if(tab.index==2){
         

       let nowDate = new Date()
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate()
  }
 
      const that = this;
    that.zongtotal=0;
 that.axios({
          method: "POST",
          url: "Month/MonthAll/"+date.year,
        })
        .then(function (res) {
       
             that.echo(res.data.data);

             res.data.data.forEach(element => {
               that.zongtotal+=element ;
             });
        })
        .catch(function (err) {
          console.log(err);
        });

     


       }
            }
  }
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
.box-card {
 
    display: inline-block;
    margin: 40px;
  }
  .div_el_card_centen{
    display: flex;
flex-direction: row;
margin: 10px;
  }
  .div_picker_centen{
    text-align: center;
  }
  .div_for_left{
    text-align: center;
  }
  .lable_div_tencer{

      display: inline-block;
    width: 50px;/*要保证能放得下最长的文字，也可以设置为溢出隐藏形式：overflow: hidden;*/
    text-align: justify;
    text-align-last: justify;
 margin: 5px;
 color: rgb(95, 141, 141);
  }
  .hello{
      padding: 40px;
  }
 .Date_zong{
   text-align: center;
 }
 .clearfix{
   height: 50px;
 }
</style>
