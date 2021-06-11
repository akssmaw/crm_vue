<template>
  <div class="hello">
 

 <div class="collapse-div">

<el-dialog :title="xiansuotitle" :visible.sync="dialogTableVisible">
      
      <div class="block" style="height: 300px; overflow: auto">
        <el-timeline>
          <el-timeline-item
            class="el-timeline-item"
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            color="#409EFF"
            :size="activity.size"
            :timestamp="activity.ptime"
          >
           {{ activity.uname }} : {{ activity.pcon }}
          </el-timeline-item>
        </el-timeline>
      </div>

     
    </el-dialog>
     <el-collapse v-model="activeName" >
         
  <el-collapse-item title="客源查询" name="1">
      
 <div class="block">
    <el-cascader :options="options" :show-all-levels="false"  ref="demoCascader"></el-cascader> 
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       :default-time="['00:00:00', '00:00:00']">
      align="center">
    </el-date-picker>
    <el-button  @click="CountAndDataClick"  type="primary">查询</el-button>
  </div>
   <div v-if="count_div_show" >
 
    <el-divider content-position="left">统计</el-divider>
    <span >总客源数：<label class="count_lable">{{count.sumcount}}</label> 条</span> <br>
    <span >以有效数：<label class="count_lable">{{count.validcount}}  </label>条</span> <br>
     <span >客户录入：<label class="count_lable">{{count.servicecount}}  </label>条</span> <br>
   
    <span >接口提交：<label class="count_lable">{{count.apicount}}  </label>条</span> <br>
  </div>
   <el-table class="table_div"
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
     <el-table-column
      prop="phone"
      label="手机号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="datasource"
      label="提交方式"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="firsttime"
      label="提交日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="ip"
      label="IP地址"
      >
    </el-table-column>
     <el-table-column
      prop="plankey"
         show-overflow-tooltip
      label="关键词"
      >
    </el-table-column>
      <el-table-column
      prop="source"
      label="来源平台"
      >
    </el-table-column>
      <el-table-column
      prop="lastuname"
      label="领取人"
      >
    </el-table-column>
    <el-table-column
      prop="con"
       show-overflow-tooltip
      label="备注"
      >
    </el-table-column>
     <el-table-column
    
      label="状态"
      >
        <template slot-scope="scope">
    <el-tag v-if="scope.row.stat==-1" type="success">
      保存有效
    </el-tag>
 <el-tag v-if="scope.row.stat==-2" type="success"> 
    未领取
    </el-tag>
     <el-tag v-if="scope.row.stat==0" type="warning">
    已领取 未拨打
    </el-tag>
      <el-tag v-if="scope.row.stat>=1" type="danger">
  无效
    </el-tag>
      </template>
    </el-table-column>
     <el-table-column
      align="right">
          <!-- eslint-disable -->
      
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">线索</el-button>
       
      </template>
    
    </el-table-column>
  </el-table>
  <div class="block">
 
    <el-pagination
 
      @current-change="handleCurrentChange"
 
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
  </el-collapse-item>
  <el-collapse-item title="平台统计" name="2">
     <div class="block">
    
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
       :default-time="['00:00:00', '00:00:00']">
      align="center">
    </el-date-picker>
    <el-button  @click="CountAndDataClick2"  type="primary">统计</el-button>
  </div>

 <div>
    <el-table
 
    :data="tableData2"
    style="width: 100%">
    <el-table-column
      prop="sourcename"
    label="来源平台"
   
    >
    </el-table-column>
     
      <el-table-column
      prop="allSize"
    label="全部客源 / 个"
   
    >
    </el-table-column>
     <el-table-column
  
    label="有效客源 / 个"
   
    >
    <template slot-scope="scope">
  
         <el-tag  >{{scope.row.effectiveSize}}</el-tag>
      </template>
    </el-table-column>
    </el-table-column>
     <el-table-column
    label="无效客源 / 个"
   
    >
      <template slot-scope="scope">
    <el-tag type="danger">{{scope.row.invalidSize}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
 </div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>

 </div>

  </div>

</template>

<script>
export default {
  name: 'operationlist',
  data () {
    return {
      msg: '我是主机信息展示',
      activeName: '1',
      count:{sumcount: '',validcount: '',apicount:'',servicecount:''},
      dialogTableVisible: false,
      xiansuotitle: "",
      getDate:'',
         activities: [{}],
      demoCascader:'',
      count_div_show:false,
      tableData:[{}],
      tableData2:[{}],
       tableData:[{}],
        options: [{
          value: '百度',
          label: '百度',
          children: [{
            value: '百度-1',
            label: '百度-1'
          }, {
            value: '百度-2',
            label: '百度-2'
          }, {
            value: '百度-3',
            label: '百度-3'
          },
          {
            value: '百度-4',
            label: '百度-4'
          },
          {
            value: '百度-5',
            label: '百度-5'
          },
          {
            value: '百度-6',
            label: '百度-6'
          }]
        },
        {
          value: '360',
          label: '360',
          children: [{
            value: '360-1',
            label: '360-1'
          }, {
            value: '360-2',
            label: '360-2'
          }, {
            value: '360-3',
            label: '360-3'
          },{
            value: '360-4',
            label: '360-4'
          }]
        },
         {
          value: '搜狗',
          label: '搜狗',
          children: [{
            value: '搜狗-1',
            label: '搜狗-1'
          }, {
            value: '搜狗-2',
            label: '搜狗-2'
          }, {
            value: '搜狗-3',
            label: '搜狗-3'
          },{
            value: '搜狗-4',
            label: '搜狗-4'
          },{
            value: '搜狗-5',
            label: '搜狗-5'
          }]
        },{
          value: '快手',
          label: '快手',
          children: [{
            value: '快手',
            label: '快手'
          }]
        },
        {
          value: '小红书',
          label: '小红书',
          children: [{
            value: '小红书',
            label: '小红书'
          }]
        },
         {
          value: '豆瓣',
          label: '豆瓣',
          children: [{
            value: '豆瓣',
            label: '豆瓣'
          }]
        }
      
        ],
      
      pickerOptions: {
          shortcuts: [
              {
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          },{
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
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
         value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: [ ]
    }
  },
  methods:{
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
      onLoad(){
          console.log(111111);
      },
      handleCurrentChange(val){
        const obj = this.$refs['demoCascader'].getCheckedNodes()
 var str = obj[0].data.value;
       
const onesubstr= str.substr(0, 1);
const twosubstr= str.substr(-1);
const  source = [onesubstr,twosubstr]
        console.log(val);
         const that = this; //加载
      that.axios({
          method: "POST",
          url: "crmdata/SelectCrmdataBySource/"+source+"/"+that.formatTime(that.value2[0],'yyyy-MM-dd hh:mm:ss')+"/"+that.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss')+"/"+val,
        })
        .then(function (res) {
          that.count_div_show=true;
          that.count= res.data.data.count;

          that.tableData = res.data.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      },
      handleEdit(index,row){
 
  console.log(index, row);

      this.selectedtable = row;
      const that = this; //加载

      that
        .axios({
          method: "POST",
          url: "piste/UserpisteAll/" + row.cid,
        })
        .then(function (res) {
          that.activities = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

      this.xiansuotitle = "手机号:" + row.phone;
      this.dialogTableVisible = true;

      },
      CountAndDataClick(){

          
             this.formatTime(this.value2[0],'yyyy-MM-dd hh:mm:ss') +"  -  "+this.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss') 

 
const obj = this.$refs['demoCascader'].getCheckedNodes()
 

  if(typeof((obj[0]))=="undefined"){

   this.$message({
          message: '警告哦，请选择来源',
          type: 'warning'
        });

}else{
       var str = obj[0].data.value;
       
const onesubstr= str.substr(0, 1);
const twosubstr= str.substr(-1);
const  source = [onesubstr,twosubstr]


     const that = this; //加载
      that.axios({
          method: "POST",
          url: "crmdata/SelectCrmdataBySource/"+source+"/"+that.formatTime(that.value2[0],'yyyy-MM-dd hh:mm:ss')+"/"+that.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss')+"/1",
        })
        .then(function (res) {
          that.count_div_show=true;
          that.count= res.data.data.count;

          that.tableData = res.data.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

}
    
    
   

  

      },
      CountAndDataClick2(){
             const that = this; //加载
      that.axios({
          method: "POST",
          
          url: "SourceSize/SelectCrmdataBySourceSize/"+that.formatTime(that.value2[0],'yyyy-MM-dd hh:mm:ss')+"/"+that.formatTime(this.value2[1],'yyyy-MM-dd hh:mm:ss')+"",
        })
        .then(function (res) {
       console.log(res.data.data);
          that.tableData2= res.data.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
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
.collapse-div{
    margin: 40px;
    text-align: center;
}
.table_div{
  margin: 10px;
}
.count_lable{
  color: deepskyblue;
}
.tem_you{
  background-color: aqua;
}
</style>
