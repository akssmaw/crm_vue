<template>
  <div class="hello">
        <div class="tabs-class">
             <el-dialog title="查询补款" :visible.sync="dialogTableVisible">
  <el-table :data="gridData" >
   
      <el-table-column property="prepay" label="补款金额"></el-table-column>
          <el-table-column property="pcon" label="补款备注"></el-table-column>
  <el-table-column property="account" label="补款平台"  ></el-table-column>
 
       <el-table-column property="ptime" label="补款时间"></el-table-column>
  </el-table>
  
</el-dialog>

  <el-dialog title="详情" :visible.sync="dialogTableVisible2">
 {{gridData2}}
</el-dialog>
     <el-tabs
      class="table1"
        :tab-position="tabPosition"
        
        @tab-click="handleClick"
      >
          <el-tab-pane label="审核">
         
<el-table highlight-current-row

    :data="tableData.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%; margin-top: -10px">
        <el-table-column
       type="expand">
       <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="学员姓名:">
            <span>{{ props.row.stuname }}</span>
          </el-form-item>
          <el-form-item label="学员手机:">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="导师备注:"
           :show-overflow-tooltip="true">
            <span>{{ props.row.con }}</span>
          </el-form-item>

            <el-form-item label="已付金额:">
            <span>{{ props.row.prepay }}</span>
          </el-form-item>
           <el-form-item label="应付总额:">
            <span>{{ props.row.total }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="咨询师"
        :filters="filters"
        :filter-method="filterTagShi"
      prop="uname">
    </el-table-column>

    <el-table-column
      label="项目"
     
      prop="orderproject">
    </el-table-column>

    <!-- <el-table-column
      label="zip地址"
     >
      <template slot-scope="scope">
        <el-tooltip class="item" effect="light" :content="scope.row.zipurl" placement="top-start">
          <div slot="content" style="width: 300px;">{{scope.row.zipurl}}</div>
          <div class="btn">{{scope.row.zipurl}}</div>
        </el-tooltip>
    </template>
 
    </el-table-column> -->
 
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      
      <el-table-column
      label="收款平台"
        :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      :show-overflow-tooltip="true"
      prop="account">
    </el-table-column>
      <el-table-column
      label="全款状态"
        :filters="[{ text: '已交全款', value: 1 },{ text: '未交全款', value:0 }]"
         :filter-method="filterTagQuan"
   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.orderstate==0" type="danger">
      未交全款
    </el-tag><el-tag v-if="scope.row.orderstate==1" type="success">
      已交全款
    </el-tag>
      </template>
    </el-table-column>
     <el-table-column
      label="审核状态"

   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.state==1" type="danger">
    未审核
    </el-tag>
    <el-tag v-if="scope.row.state==3" type="success">
      已审核
    </el-tag>
      </template>
    </el-table-column>
     <el-table-column   width="300"
       >
       <!-- eslint-disable -->
      <template slot="header" slot-scope="scope" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入手机号搜索"/>
      </template>
      <template slot-scope="scope">
            <el-button
          size="mini"
          @click="handleSelect(scope.$index, scope.row)" type="primary"> 查询 </el-button>
       <el-button
          size="mini"
          @click="handleYes(scope.$index, scope.row)" type="primary"> 通过 </el-button>
         
        
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
              <el-button
          size="mini"
         > <a :href="'http://115.28.209.225/Upload/'+scope.row.zipurl"  download="" target="_blank"> 下载</a> </el-button>
      </template>
    </el-table-column>
  </el-table>
  
     </el-tab-pane>
       <el-tab-pane label="已审核 | 需补款">


<el-table highlight-current-row  :data="tableData2.filter(data => !search2 || data.phone.toLowerCase().includes(search2.toLowerCase()))"
    style="width: 100%; margin-top: -10px">
        <el-table-column
       type="expand">
       <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="学员姓名:">
            <span>{{ props.row.stuname }}</span>
          </el-form-item>
          <el-form-item label="学员手机:">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="导师备注:"
           :show-overflow-tooltip="true">
            <span>{{ props.row.con }}</span>
          </el-form-item>
  <el-form-item label="管理员备注:"
           :show-overflow-tooltip="true">
            <span>{{ props.row.ordercon }}</span>
          </el-form-item>
            <el-form-item label="已经预付:">
            <span>{{ props.row.prepay }}</span>
          </el-form-item>
           <el-form-item label="应付总额:">
            <span>{{ props.row.total }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="咨询师"
        :filters="filters"
        :filter-method="filterTagShi"
      prop="uname">
    </el-table-column>

  
    <!-- <el-table-column
      label="zip地址"
     >
      <template slot-scope="scope">
        <el-tooltip class="item" effect="light" :content="scope.row.zipurl" placement="top-start">
          <div slot="content" style="width: 300px;">{{scope.row.zipurl}}</div>
          <div class="btn">{{scope.row.zipurl}}</div>
        </el-tooltip>
    </template>
 
    </el-table-column> -->
 
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      
      <el-table-column
      label="收款平台"
        :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      :show-overflow-tooltip="true"
      prop="account">
    </el-table-column>
      <el-table-column
      label="全款状态"
        :filters="[{ text: '已交全款', value: 1 },{ text: '未交全款', value:0 }]"
         :filter-method="filterTagQuan"
   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.orderstate==0" type="danger">
      未交全款
    </el-tag><el-tag v-if="scope.row.orderstate==1" type="success">
      已交全款
    </el-tag>
      </template>
    </el-table-column>
     <el-table-column
      align="right">
       <!-- eslint-disable -->
      <template slot="header" slot-scope="scope" >
        <el-dropdown>
  <span class="el-dropdown-link">
    请搜索<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
 <el-input
          v-model="search2"
          size="mini"
          placeholder="输入手机号搜索"/>
    <el-input
          v-model="searchstuname"
          @blur="myFunction()"
          size="mini"
          placeholder="输入姓名搜索"/>
   
  </el-dropdown-menu>
</el-dropdown>
       
          
      </template>
      <template slot-scope="scope">
    
           <el-button
          size="mini"
          @click="handleDecs(scope.$index, scope.row,tableData)" type="primary"> 补款 </el-button>
       <el-button
          size="mini"
          @click="handleDecsSelect(scope.$index, scope.row)" type="primary"> 查询补款 </el-button>
              <el-button
          size="mini"
          > <a :href="scope.row.zipurl"  download=""> 下载</a> </el-button>
      </template>
    </el-table-column>
  </el-table>
  
       </el-tab-pane>
         <el-tab-pane label="已审核">
          <el-table highlight-current-row

    :data="tableData3.filter(data => !search || data.phone.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%; margin-top: -10px">
        <el-table-column
       type="expand">
       <template slot-scope="props">
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="学员姓名:">
            <span>{{ props.row.stuname }}</span>
          </el-form-item>
          <el-form-item label="学员手机:">
            <span>{{ props.row.phone }}</span>
          </el-form-item>
          <el-form-item label="导师备注:"
           :show-overflow-tooltip="true">
            <span>{{ props.row.con }}</span>
          </el-form-item>

            <el-form-item label="已付金额:">
            <span>{{ props.row.prepay }}</span>
          </el-form-item>
           <el-form-item label="应付总额:">
            <span>{{ props.row.total }}</span>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="咨询师"
        :filters="filters"
        :filter-method="filterTagShi"
      prop="uname">
    </el-table-column>

    <el-table-column
      label="项目"
     
      prop="orderproject">
    </el-table-column>

    <!-- <el-table-column
      label="zip地址"
     >
      <template slot-scope="scope">
        <el-tooltip class="item" effect="light" :content="scope.row.zipurl" placement="top-start">
          <div slot="content" style="width: 300px;">{{scope.row.zipurl}}</div>
          <div class="btn">{{scope.row.zipurl}}</div>
        </el-tooltip>
    </template>
 
    </el-table-column> -->
 
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      
      <el-table-column
      label="收款平台"
        :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      :show-overflow-tooltip="true"
      prop="account">
    </el-table-column>
      <el-table-column
      label="全款状态"
        :filters="[{ text: '已交全款', value: 1 },{ text: '未交全款', value:0 }]"
         :filter-method="filterTagQuan"
   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.orderstate==0" type="danger">
      未交全款
    </el-tag><el-tag v-if="scope.row.orderstate==1" type="success">
      已交全款
    </el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="审核状态"

   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.state==1" type="danger">
    未审核
    </el-tag>
    <el-tag v-if="scope.row.state==3" type="success">
      已审核
    </el-tag>
      </template>
    </el-table-column>
     <el-table-column   width="300"
       >
       <!-- eslint-disable -->
      <template slot="header" slot-scope="scope" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入手机号搜索"/>
      </template>
      <template slot-scope="scope">
            <el-button
          size="mini"
          @click="handleSelect(scope.$index, scope.row)" type="primary"> 查询 </el-button>
       <el-button
          size="mini"
          @click="handleYes(scope.$index, scope.row)" type="primary"> 通过 </el-button>
         
        
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
              <el-button
          size="mini"
         > <a :href="'http://115.28.209.225/Upload/'+scope.row.zipurl"  download="" target="_blank"> 下载</a> </el-button>
      </template>
    </el-table-column>
  </el-table>


         </el-tab-pane>
 <el-dialog
  title="拒绝" 
  :visible.sync="dialogVisible"
  width="30%"
 >
  <span>确定拒绝学员： {{selectedtable.stuname}} ,  手机号：{{selectedtable.phone}} ,   咨询师： {{selectedtable.uname}}   的订单吗?</span>
  <p></p>
   <span>请填写您的拒绝理由：</span>
  <span slot="footer" class="dialog-footer">
   
          <el-input type="textarea" v-model="rescon"></el-input>
            <p></p>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibleNo">确 定</el-button>
            
  </span>
</el-dialog>

 <el-dialog
  title="同意" 
  :visible.sync="dialogVisible2"
  width="30%"
 >
  <span>确定同意学员： {{selectedtable.stuname}} ,  手机号：{{selectedtable.phone}} ,   咨询师： {{selectedtable.uname}}   的订单吗?</span>
  <p></p>
   <span>请填写订单备注：</span>
  <span slot="footer" class="dialog-footer">
   
          <el-input type="textarea" v-model="ordercon"></el-input>
            <p></p>
    <el-button @click="dialogVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibleYes">确 定</el-button>
            
  </span>
</el-dialog>

 <el-dialog
  title="补款信息" 
  :visible.sync="dialogVisible3"
  width="30%"
 >
  <span>确定给学员： {{selectedtable.stuname}} ,  手机号：{{selectedtable.phone}} ,   咨询师： {{selectedtable.uname}}   补款吗?</span>
  <p></p>
    <el-form>
        <p></p>
 
     <el-form-item label="是否补齐全款">
    <el-switch v-model="prepay.delivery"></el-switch>
  </el-form-item>
  <div v-if="prepay.delivery==false">
 <el-form-item  label="补款金额">
          <el-input-number
            v-model="prepay.prepay"
            :min="1"
            :precision="2"
            :step="1"
            :max="10000"
          ></el-input-number>
        </el-form-item>

  </div>
  <el-form-item label="支付平台">
          <el-select
            filterable 
              allow-create 
              default-first-option 
           v-model="prepay.account" placeholder="请选择支付平台">
            <el-option label="对公微信" value="对公微信"></el-option>
            <el-option label="对公账户 " value="对公账户 "></el-option>
               <el-option label="对公支付宝 " value="对公支付宝 "></el-option>
            <el-option label="兴业银行" value="兴业银行"></el-option>
            <el-option label="工商银行" value="工商银行"></el-option>
                 <el-option label="帅哥微信" value="帅哥微信"></el-option>
          </el-select>
        </el-form-item>
        
    </el-form>
  <span slot="footer" class="dialog-footer">
 <p>  应付总额：{{selectedtable.total}} </p>
<p>   已经预付：{{selectedtable.prepay}}<p>
 
 
          <el-input type="textarea" v-model="prepay.pcon"></el-input>
            <p></p>
    <el-button @click="dialogVisible3 = false">取 消</el-button>
    <el-button  type="primary"  @click="dialogVisibleBuKuan">确 定</el-button>
            
  </span>
</el-dialog>
     </el-tabs>
       <div class="demonstration-div-fenye" v-if="pageshow">
        <div class="block">
          <span class="demonstration"> </span>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="10"
          >
          </el-pagination>
        </div>
      </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'bill',
  data () {
    return {
        tabPosition: "left",
        tabtab:0,
        search:'',
        search2:'',
        searchstuname:'',
        pageshow:true,
           dialogVisible: false,
           dialogVisible2:false,
           dialogVisible3:false,
           rescon:'',
           ordercon:'',
              filters:[{}],
              prepay:{prepay:0,pcon:'',delivery:false,account:''},
     tableData: [{}],
     tableData2:[{}],
     tableData3:[{}],
      selectedtable: [{}],
         DelectTbaleByIndex:'',
         dialogTableVisible:false,
         dialogTableVisible2:false,
         gridData:[{}],
         gridData2:[]
    }
   
  },
   methods:{
onLoad(){
  const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdmin/" +
              1+
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });
          
// 分配人员查询

             that
        .axios({
          method: "POST",
          url: "user/allbyuname2",
        })
        .then(function (res) {
          console.log(res.data.data);
         that.filters=res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
}, 
myFunction(){
  console.log(22);
  
      var search = this.searchstuname;
      if (search) {
        this.tableData2 = this.tableData2.filter(function(product) {
          // 每一项数据
          // console.log(product)
          return Object.keys(product).some(function(key) {
            // 每一项数据的参数名
            // console.log(key)
            return (
              String(product[key])
                // toLowerCase() 方法用于把字符串转换为小写。
                .toLowerCase()
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                .indexOf(search) > -1
            );
          });
        });
      } else{
        const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdminNo/" +
              3+
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData2 = res.data.data;
          
          })
          .catch(function (err) {
            console.log(err);
          });
      }
},
dialogVisibleBuKuan(){

// alert(this.selectedtable.oid)
  if(this.prepay.delivery==true){


   
  
 const that = this;
//  alert(this.selectedtable.total)
    that
 
        .axios({
          method: "POST",
          url: "prepay/insertPrepay2/"+this.selectedtable.oid+"/"+this.prepay.pcon+"/"+this.prepay.account+"/"+this.selectedtable.total,
        })
        .then(function (res) {
 
 that.dialogVisible3=false;
   that.$message({
                type: "success",
                message: "全款已补齐!",
              });
            that.tableData2.splice(that.DelectTbaleByIndex, 1);
        })
        .catch(function (err) {
          console.log(err);
        });
    
  }else {
    const that = this; //加载
 
    that
        .axios({
          method: "POST",
          url: "prepay/insertPrepay/"+this.selectedtable.oid+"/"+this.prepay.pcon+"/"+this.prepay.account+"/"+this.prepay.prepay+"/"+this.selectedtable.prepay,
        })
        .then(function (res) {
            that.$message({
                type: "success",
                message: "补款成功!",
              });
           
        })
        .catch(function (err) {
          console.log(err);
        });

  }



 
},
handleDecsSelect(index, row, tableData){

this.dialogTableVisible=true
 alert(row.oid)
 const that = this;
    that
 
        .axios({
          method: "POST",
          url: "prepay/selectPrepay/"+row.oid,
        })
        .then(function (res) {
console.log(res.data.data);
         that.gridData= res.data.data
 
        })
        .catch(function (err) {
          console.log(err);
        });
},
filterTag(value, row) {
       console.log(value);
        return row.account === value;
      },
      filterTagShi(value, row){
        
     return row.uid == value;
      },
      filterTagQuan(value, row){
           return row.orderstate == value;
      }
      ,
 
      dialogVisibleNo(){
 

 const that = this;
    that
        .axios({
          method: "POST",
          url: "Upload/SelectOrderByOidNo/"+this.selectedtable.oid+"/"+this.rescon,
        })
        .then(function (res) {
    
      
       that.tableData.splice(that.DelectTbaleByIndex, 1);
      
         that.dialogVisible=false;
            that.$message({
              message: "已拒绝该订单",
              type: "success",
            });
        })
        .catch(function (err) {
          console.log(err);
        });

      },
      dialogVisibleYes(){

        
 const that = this;
    that
        .axios({
          method: "POST",
          url: "Upload/SelectOrderByOidyes/"+this.selectedtable.oid+"/"+this.ordercon,
        })
        .then(function (res) {
    
      
       that.tableData.splice(that.DelectTbaleByIndex, 1);
      
         that.dialogVisible2=false;
            that.$message({
              message: "核审通过",
              type: "success",
            });
        })
        .catch(function (err) {
          console.log(err);
        });
      },
      handleSelect(index,row){

 
this.dialogTableVisible2= true;
 
 const that = this; //加载
that
          .axios({
            method: "POST",
            url: "crmdata/bycid/"+row.cid
          })
          .then(function (res) {
          
            that.gridData2 = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });


      },
handleClick(tab, event){
  if(tab.index==0){
    console.log("第0个格子");
      const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdmin/" +
              1+
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });

  }else if(tab.index==1){
   console.log("第一个格子");
      const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdminNo/" +
              3+
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData2 = res.data.data;
          
          })
          .catch(function (err) {
            console.log(err);
          });


  }else if(tab.index==2){
     console.log("第2个格子");
const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdminYes/" +
              3+
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData3 = res.data.data;
          
          })
          .catch(function (err) {
            console.log(err);
          });

  }

    this.tabtab = tab.index;
},
 
      handleCurrentChange(val) {
        console.log("分页"+val)
          console.log("当前tab"+this.tabtab)
          if(this.tabtab==0){
             const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdmin/" +
              1+
              "/" +
              val,
          })
          .then(function (res) {
            that.tableData = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });

          }else if(this.tabtab==1){
           const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdminNo/" +
              3+
              "/" +
              val,
          })
          .then(function (res) {
            that.tableData2 = res.data.data;
          
          })
          .catch(function (err) {
            console.log(err);
          });
          }else if(this.tabtab==2){


              
const that = this; //加载
that
          .axios({
            method: "POST",
            url:
              "Upload/SelectOrderByAdminYes/" +
              3+
              "/" +
              val,
          })
          .then(function (res) {
            that.tableData3 = res.data.data;
          
          })
          .catch(function (err) {
            console.log(err);
          });
          }
      },
      handleDelete(index, row, tableData){
        this.dialogVisible=true
        this.DelectTbaleByIndex=index
      this.selectedtable = row;


      },
      handleDecs(index, row, tableData){
        this.dialogVisible3=true
        // console.log(row)
              this.selectedtable = row;
                   this.DelectTbaleByIndex=index
     
      },
      handleYes(index, row, tableData){
         this.dialogVisible2=true
        this.DelectTbaleByIndex=index
      this.selectedtable = row;
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
.tabs-class {
  margin-top: 50px;
}
.demonstration-div-fenye {
  text-align: center;
  margin: 40px;
}
.table1 {
  margin: -7px;

}

.el-timeline-item {
  margin: 20px;
 
}

</style>