<template>
  <div class="hello">
    <div class="collapse" v-if="admin == 0">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title=" 批量操作" name="1">
          <el-button type="primary" @click="onFenPei">批量分配</el-button>
          <el-button plain @click="onLiuRu">批量流入公海</el-button>
          <el-button plain>s</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
<el-dialog title="修改备注" :visible.sync="dialogVisible2">
 
     <el-form>
<el-form-item >
  <el-input  style="height:100px" type="textarea" v-model="BeiZhudesc"></el-input>
</el-form-item>

     </el-form>
    
  <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button @click="BeiZhuClick(BeiZhudesc)" type="primary">保存</el-button>
      </div>
</el-dialog>
    <div class="collapse" v-if="admin == 0">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title=" 查询操作" name="2">



          <el-button type="primary" @click="onSumbitison">未分配/未操作 </el-button>  

  <el-button type="primary" @click="onFenPei2">未分配 </el-button>  
               
         <el-button   v-for="item in itemsdropdown"  :key="item.message" :style="{ background: item.style }" style="color:white" @click="onSumbit(item.sid,item)" >{{item.message}} </el-button> 
          <p></p>
          <el-dropdown>
  <span class="el-dropdown-link">
    <label :style="{color:dropdown_link.style}" >{{dropdown_link.message}}   </label><i class="el-icon-arrow-down el-icon--right"> </i>
  </span> 
  <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
                v-for="item in itemsdropdown"
                :key="item.message"
              >
                <el-link
                  @click="itemsdropdownclick2(item)"
                  :underline="false"
                  :style="{ color: item.style }"
                  >{{ item.message }}</el-link
                ></el-dropdown-item>
 
    
  </el-dropdown-menu>
</el-dropdown>
          
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          >
          </el-date-picker>

          <el-button plain @click="sumbitdatatime">查询该时间段</el-button>
        </el-collapse-item>
         
      </el-collapse>
      
    </div>
     <div class="collapse"  >
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="新增操作" name="3">
          
          <el-button plain @click="InsertUser">增加用户</el-button>
        </el-collapse-item>
      </el-collapse>
    </div>
   <el-divider class="divider-lable">

     <label :style="{ color: itemsdropdownmess2.style }">
                {{ itemsdropdownmess2.message }}</label>
   </el-divider>
    <el-table
    highlight-current-row   
      :data="tableData"
      @selection-change="handleSelectionChange"
      ref="tableData"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        fixed="left"
        prop="cid"
        label="ID"
        width="60"
      ></el-table-column>

      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>

      <el-table-column
        prop="source"
        label="表单来源"
        width="120"
      ></el-table-column>

      <el-table-column
        prop="tag"
        label="分配人员"
        width="120"
        :filters="filters"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <p v-if="scope.row.lastuname == 0">未分配</p>
          <p v-else>{{ scope.row.lastuname }}</p>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="firsttime"
        label="创建时间"
        width="170"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column sortable label="最后操作时间" width="170">
        <template sortable slot-scope="scope">
          <p v-if="scope.row.lasttime == 0">暂无时间</p>
          <p v-else>{{ scope.row.lasttime }}</p>
        </template>
      </el-table-column>

  

      <el-table-column
        prop="url"
        label="提交地址"
        width="130"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="con"
        label="备注"
        width="90"
        :show-overflow-tooltip="true"
      ></el-table-column>
 
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-if="admin == 0"
            >分配</el-button
          >
          <el-button @click="handleClick2(scope.row,scope.$index)" type="text" size="small"
            >查看</el-button
          >

          <el-button @click="handleEdit(scope.row,scope.$index)" type="text" size="small"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 右侧弹出层 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="45%"
      title="详细查询"
    >
      <el-form
        :label-position="labelPosition"
        :model="formLabelAlign"
        style="　text-align: center"
        class="drawerdiv"
        label-width="80px"
      >
        <el-form-item label="ID" hidden>
          <el-input disabled v-model="formLabelAlign.cid"></el-input>
        </el-form-item>
        <el-form-item label="客户满意度">
          <el-dropdown>
            <el-button>
              <label :style="{ color: itemsdropdownmess.style }">
                {{ itemsdropdownmess.message }}</label
              ><i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in itemsdropdown"
                :key="item.message"
              >
               <div     @click="itemsdropdownclick(item)">
 <el-link
              
                  :underline="false"
                  :style="{ color: item.style }"
                  >{{ item.message }}</el-link>

               </div>
                </el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input disabled v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        
        <el-form-item label="来源途径">
          <el-input disabled v-model="formLabelAlign.datasource"></el-input>
        </el-form-item>
     
       <el-form-item label="保存有效备注">
    <el-switch v-model="delivery"></el-switch>
  </el-form-item>
        <el-form-item   v-if="delivery" label="姓名 或 其他" >
          <el-input type="textarea"  v-model="formLabelAlign.username"></el-input>
        </el-form-item>

   <el-form-item label="流入公海备注">
    <el-switch v-model="delivery2"></el-switch>
  </el-form-item>
        <el-form-item v-if="delivery2" label="流入公海展示的备注">
          <el-input type="textarea" v-model="formLabelAlign.con"></el-input>
        </el-form-item>

        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button @click="innerDrawer(formLabelAlign.cid)"
            >查看时间线!</el-button
          >
          <el-button
            type="primary"
       
            
            @click="onsumbitForm(formLabelAlign.cid, formLabelAlign.con,formLabelAlign.username)"
            >{{ loading ? '提交' : '确 定' }}</el-button
          >
        </div>
      </el-form>

      <el-drawer
        title="时间线"
        :append-to-body="true"
        :visible.sync="innerDrawerform"
        size="22%"
      >
        <div style="height: 80px"></div>
        <div style="height: 40%; overflow: auto; text-align: center">
          待增加...
        </div>

        <label style="position: sticky"> 操作记录:</label>
        <div style="height: 50px"></div>
        <div style="height: 520px; overflow: auto; text-align: center">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :color="'#409EFF'"
                :timestamp="activity.lasttime"
              >
              
                <div>
                <el-tooltip class="item" effect="dark" :content="activity.lastcon" placement="top-start">
             <label @click="
                    activitydiv(
                      activity.rid,
                      activity.cid,
                      activity.lastuname,
                      activity.lastuid,
                      activity.lasttime,
                      activity.lastcon
                    )
                  ">    {{ activity.lastcon }}</label>

                 </el-tooltip>
          <el-popconfirm
  confirm-button-text='好的'
  cancel-button-text='不用了'
  icon="el-icon-info"
  icon-color="red"
  title="这是一段内容确定删除吗？"
  @onConfirm="popconfirm_div()"
>
<!-- <i  style="float: right;" slot="reference" class="el-icon-delete"></i>
  -->
</el-popconfirm>
                 
                </div>
                
              </el-timeline-item>
            </el-timeline>
          </div>

          <div style="height: 100px; overflow: auto; text-align: center"></div>
        </div>
      </el-drawer>
    </el-drawer>

    <!-- 分页 -->
    <div class="demonstration-div-fenye"  v-if="pageshow">
      <div class="block">
        <span class="demonstration"> </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="1"
          layout="prev, pager, next, jumper"
          :total="100"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 单分配弹出层 -->
    <el-dialog
      @close="closeDialog"
      title="单分配客户"
      :visible.sync="dialogFormVisible"
      width="700px"
      top="200px"
    >
      <div class="dialog-div">
        <h3>
          用户ID:<label> {{ form.cid }}</label>
        </h3>
     

        <h3>
          用户手机号:<label> {{ form.phone }}</label>
        </h3>
        
        <div class="block">
          <span class="demonstration"
            ><h3 @click="onhandleChange">
              选择分配人员:
              <el-cascader
                ref="cascaderAddr"
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                :show-all-levels="false"
                @change="handleChange"
              >
              </el-cascader>
            </h3>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSet(form.cid)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 多分配弹出层 -->
    <el-dialog
      @close="closeDialog"
      title="批量分配"
      :visible.sync="dialogFormVisible2"
      width="700px"
      top="200px"
    >
      <div class="dialog-div">
        <h3>
          用户ID:<label> {{ list }}</label>
        </h3>
        <el-divider></el-divider>
        <div class="block">
          <span class="demonstration"
            ><h3 @click="onhandleChange">
              选择分配人员:
              <el-cascader
                ref="cascaderAddr"
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                :show-all-levels="false"
                @change="handleChange"
              >
              </el-cascader>
            </h3>
          </span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>

        <el-button type="primary" @click="handleSet2(list)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="录入客户"
      :visible.sync="dialogFormVisible3"
      width="800px"
      top="200px"
    >
    <el-form ref="form" :model="form2" label-width="80px" >
    
   
    <el-form-item label="手机号:">
    <el-input v-model="form2.phone"></el-input>
  
  </el-form-item>
  <p />
      <el-form-item label="来源平台:">
    <el-input v-model="form2.source"></el-input>

  
  </el-form-item>
    <p />
    <el-form-item label="网站地址:">
    <el-input v-model="form2.url"></el-input>

  
  </el-form-item>
    <p />
   <el-form-item label="备注:">
    <el-input v-model="form2.con"></el-input>

  
  </el-form-item>
    <p />
  <el-form-item label="plankey:">
    <el-input v-model="form2.plankey"></el-input>

  
  </el-form-item>
     </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button @click="onSumbitFrom3">提 交</el-button>
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
       
      </div>
    </el-dialog>
  </div>
</template>

   <!-- <el-table-column prop="city" label="市区"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="zip" label="邮编"></el-table-column> -->
      
	<script src="http://www.xuebim.top/demo.js"></script>
<script>
export default {
  inject :['reload'],
  name: "userlist",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      dialogVisible2:false,
        BeiZhudesc:"",
delivery:false,
delivery2:false,
      value2: "",
   dropdown_link:{message:'选择满意度',style:'#606266',sid:'0'},
      tableData: [{}],
      bol: true,
      dialogFormVisible: false, //弹出层默认为关闭
      dialogFormVisible3:false,
      drawer: false,
      direction: "rtl",
      loading: true,
      pageshow:true,
      page:'',
      dialogFormVisible2: false, //多分配弹出层默认为关闭
      list: "", //多分配值
      admin: window.localStorage.getItem("admin"),
      uid:window.localStorage.getItem("uid"),
        uname:window.localStorage.getItem("uname"),
      innerDrawerform: false,
      labelPosition: "top",
      activities: [{}],
      stat: "stat1",
      sid:0,
      sid2:0,
      formLabelAlign: {
        cid: "",
        phone: "",
        firsttime: "",
        source: "",
        lastuname: "",
        datasource: "",
        lasttime: "",
        con: "",
        username:''
      },
      itemsdropdownmess: { style: "black ", message: "请选择" },
         itemsdropdownmess2: { style: "black ", message: "已分配/未操作" },
      itemsdropdown: [
      
      ],
      form: {
        cid: "",
        phone: "",
      },
       form2: {
         phone:'',source:'',url:'',con:'',plankey:'' },
    tabletr:'',
      multipleSelection: [],
      count: 0,
      activeName: [],
      value: [],
      options: [
        {
          value: "0",
          label: "澜鑫海",
          children: [{}],
        },
      ],
         filters:[{}],
    };
    
  },
  methods: {
    handleClick(row) {
      this.dialogFormVisible = true; //查看的开启弹出层
      this.form.cid = row.cid;
      this.form.phone = row.phone;
    },
    onSumbit(sid,item){
   this.itemsdropdownmess2=item;
   this.page=1;
alert(sid)
this.stat = "stat2";
 this.pageshow = false;//让分页隐藏
 this.sid2=0;
this.$nextTick(() => {//重新渲染分页
    this.pageshow = true;
});

this.sid = sid;
console.log(this.sid);
console.log(this.stat);
    const that = this; //加载


 that.axios({
          method: "POST",
          url: "crmdata/All2/" + sid + "/" + 1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

    },
    onSumbitison(){
      this.itemsdropdownmess2={ style: "black ", message: "已分配/未操作" };
this.stat ="stat1";
this.pageshow = false;//让分页隐藏
this.sid2=0;
this.$nextTick(() => {//重新渲染分页
    this.pageshow = true;
});

console.log(this.stat);
  const that = this;
      //加载
      that
        .axios({
          method: "POST",
          url: "crmdata/All/" + window.localStorage.getItem("uid") + "/" + 1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

    }
    ,
    innerDrawer(cid) {
      //时间线弹框

      this.innerDrawerform = true;
      alert(cid);
      const that = this; //加载
      that
        .axios({
          method: "POST",
          url: "record/RecordAllById/" + cid,
        })
        .then(function (res) {
          console.log(res);

          if (res.data.data == null || res.data.data == "") {
            that.activities = [{ lasttime: "暂无数据", lastcon: "暂无数据" }];
          } else {
            that.activities = res.data.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    InsertUser(){
      this.dialogFormVisible3=true

   
   
    },
    BeiZhuClick(BeiZhudesc){
alert(BeiZhudesc)

    },
    
    handleEdit(row,index){
 
this.dialogVisible2=true;

  this.BeiZhudesc= row.con;

    },
    onSumbitFrom3(){
       
      const that = this;
       that.axios({
        method: "POST",
        url: "crmdata/InsertCrmdata/" + this.form2.phone+"/"+this.form2.source+"/"+this.form2.url+"/"+this.form2.con+"/"+this.form2.plankey+"/"+this.uname+"/"+this.uid,
      })
        .then(function (res) {
          
          that.$message({
        showClose: true,
        message: res.data.data.data,
        type: "success",
      });
       
      //加载
      that
        .axios({
          method: "POST",
          url: "crmdata/All/" + window.localStorage.getItem("uid") + "/" + 1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

        
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    handleSelectionChange(val) {
      
      this.multipleSelection = val;
      console.log(val)
    },
    itemsdropdownclick(item) {
      console.log(item);
      this.itemsdropdownmess = item;
    },
    itemsdropdownclick2(item) {
      console.log(item);
      this.dropdown_link = item;
    },

    activitydiv(rid, cid, lastuname, lastuid, lasttime, lastcon) {
      this.$message({
        showClose: true,
        message: "销售ID : " + lastuid + " 留言 : " + lastcon,
        type: "success",
      });
    },
    dateFormat(time) {
      let date = new Date(time + 8 * 3600000);
      let str = date.toISOString().replace("T", " ");
      return str.substr(0, str.lastIndexOf("."));
    },
    sumbitdatatime() {

      var data = this.value2;

      var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(this.value2)
 console.log(this.dropdown_link)
 
console.log(data);
    },
popconfirm_div(){
  alert("s")
},
    handleClick2(row,index) {
      this.itemsdropdownmess = { sid:"-2",style: "black ", message: "请选择 " }; //点击查看数据的时候把选择的项为空
      this.drawer = true; //右操作盘

   console.log("选中id"+index);
   this.tabletr=index;
      console.log("数据id"+row.cid);
      //单查cid
      const that = this;
      that.axios({
        method: "POST",
        url: "crmdata/bycid/" + row.cid,
      })
        .then(function (res) {
          that.formLabelAlign.cid = res.data.data.cid;
          that.formLabelAlign.phone = res.data.data.phone;
          that.formLabelAlign.firsttime = res.data.data.firsttime;
          that.formLabelAlign.source = res.data.data.source;

          that.formLabelAlign.lastuname = res.data.data.lastuname;
          that.formLabelAlign.datasource = res.data.data.datasource;
          that.formLabelAlign.lasttime = res.data.data.lasttime;
          that.formLabelAlign.con = "";
        })
        .catch(function (err) {
          console.log(err);
        });

     
    },
    //弹出层关闭事件
    handleClose(done) {
      // this.$confirm("确定要提交表单吗？")
      //   .then((_) => {
      //     this.loading = true;
      //     this.timer = setTimeout(() => {
      //       done();
      //       动画关闭需要一定的时间
      //       setTimeout(() => {
      //         this.loading = false;
      //       }, 400);
      //     }, 2000);
      //   })
      //   .catch((_) => {});
    },
    cancelForm() {
      this.loading = false;
      this.drawer = false;
    },
    onsumbitForm(cid, con,username) {
  

       console.log("填写的备注con" + con);
     

         var lastuname = window.localStorage.getItem('uname');
         var lastuid =  window.localStorage.getItem('uid');
         var datetime = this.dateFormat(Date.now());
  
       console.log("stat"+this.itemsdropdownmess.sid);
      console.log("cid"+cid);

      if(this.itemsdropdownmess.sid=="-2" ){
          this.$message({
          message: '未选择满意度',
          type: 'warning'
        });
        
      }else if(this.itemsdropdownmess.sid !== "-2" && con == ""){
      //没有备注的时候
      
      console.log(this.itemsdropdownmess.message);

     const that = this;
      //加载
      
    this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
           
     that
        .axios({
          method: "POST",
          url: "crmdata/updatabycon/" + lastuid + "/" + lastuname + "/" + cid + "/" + datetime + "/" + this.itemsdropdownmess.message + "",
        })
        .then(function (res) {
        

       that
        .axios({
          method: "POST",
          url: "setuser/InsertSetUser/" +cid + " / "+lastuid+"/"+that.itemsdropdownmess.sid+"/"+datetime,
        })
        .then(function (res) {
          
        })
        .catch(function (err) {
          console.log(err);
        });
         
        })
         that
        .axios({
          method: "POST",
          url: "crmdata/updatastatbycid/ " +cid + " / " +this.itemsdropdownmess.sid+ " ",
        })
        .then(function (res) {
         
        })
        .catch(function (err) {
          console.log(err);
        });
   
  if(username==""){

   }else{
     that
        .axios({
          method: "POST",
          url: "crmdata/UpdateCrmDataByIdCon/ " +cid + " / " +username+ " ",
        })
        .then(function (res) {
         
        })
        .catch(function (err) {
          console.log(err);
        });
   }
 this.tableData.splice(this.tabletr,1)
    that.drawer = false; 
    that.$message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
 

       
    
          }, 100);
        })
        .catch((_) => {});
     

      }else{
         //有备注的时候

 const that = this;
      //加载
      
    this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
        that
        .axios({
          method: "POST",
          url: "crmdata/updatabycon/" + lastuid + "/" + lastuname + "/" + cid + "/" + datetime + "/" + con + "",
        })
        .then(function (res) {
         
http://localhost:8080//{cid}/{uid}/{iid}/{settime}
           that
        .axios({
          method: "POST",
          url: "setuser/InsertSetUser/" +cid + " / "+lastuid+"/"+that.itemsdropdownmess.sid+"/"+datetime,
        })
        .then(function (res) {
          
        })
        .catch(function (err) {
          console.log(err);
        });
           
      
         
        })
        .catch(function (err) {
          console.log(err);
        });
         that
        .axios({
          method: "POST",
          url: "crmdata/updatastatbycid/ " +cid + " / " +this.itemsdropdownmess.sid+ " ",
        })
        .then(function (res) {
          
        })
        .catch(function (err) {
          console.log(err);
        });
 if(username==""){

   }else{
     that
        .axios({
          method: "POST",
          url: "crmdata/UpdateCrmDataByIdCon/ " +cid + " / " +username+ " ",
        })
        .then(function (res) {
         
        })
        .catch(function (err) {
          console.log(err);
        });
   }
    this.tableData.splice(this.tabletr,1)
    that.drawer = false; 
    that.$message({
          showClose: true,
          message: "保存成功",
          type: "success",
        });
 

        
          }, 100);
        })
        .catch((_) => {});
     


      }


    },
    onLoad() {
      console.log(this.tableData);
      const that = this;
      //加载
      that
        .axios({
          method: "POST",
          url: "crmdata/All/" + window.localStorage.getItem("uid") + "/" + 1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

         

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
         //请求满意度
      this.axios({ method: "POST", url: "/satisfaction/satisfactionall" })
        .then(function (res) {
          console.log("满意度");
          console.log(res);
          that.itemsdropdown = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    /* 下拉框选线 */

    handleChange(value) {},
    //查询全部销售i人
    onhandleChange() {
      const that = this;

      that
        .axios({
          method: "POST",
          url: "user/allbyuname",
        })
        .then(function (res) {
          console.log(res.data.data);

          for (const key in that.options) {
            that.options[key].children = res.data.data;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    /* 分配人员 */
    filterTag(value, row) {
      console.log(value);
      return row.lastuid == value;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      
      
      console.log(val);
     
      console.log("输出的stat"+this.stat);
   
      if(this.stat == "stat1"){
          const that = this;
  that
        .axios({
          method: "POST",
          url: "crmdata/All/" + window.localStorage.getItem("uid") + "/" + val,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      }else if(this.stat =="stat2"){
           this.page=val;
    
            
         const that = this;

      
    
          that
        .axios({
          method: "POST",
          url: "crmdata/All2/" + this.sid + "/" + val,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      }else if(this.stat == "stat3"){
        const that = this;
         that
        .axios({
          method: "POST",
          url: "crmdata/All3/" + 0 + "/" + val,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      }
      //加载
      
    
    },
    //单个分配id
    handleSet(id) {
      console.log("时间" + this.dateFormat(Date.now()));
      console.log(
        "姓名" + this.$refs["cascaderAddr"].getCheckedNodes()[0].data.label
      );
      console.log(
        "ID" + this.$refs["cascaderAddr"].getCheckedNodes()[0].data.value
      );

      console.log("分配的id" + id);
    },
    //批量分配id
    handleSet2(list) {
      try {
        console.log("时间" + this.dateFormat(Date.now()));
        console.log(
          "姓名" + this.$refs["cascaderAddr"].getCheckedNodes()[0].data.label
        );
        console.log(
          "ID" + this.$refs["cascaderAddr"].getCheckedNodes()[0].data.value
        );
        console.log("分配的id" + list);
        //多分配
        const that = this;
        that
          .axios({
            method: "POST",
            url:
              "crmdata/updata/" +
              this.$refs["cascaderAddr"].getCheckedNodes()[0].data.value +
              "/" +
              this.$refs["cascaderAddr"].getCheckedNodes()[0].data.label +
              "/" +
              list +
              "/" +
              this.dateFormat(Date.now()),
          })
          .then(function (res) {
            //多分配成功处理
            that.$message({
              message: "分配成功" + res.data.data,
              type: "success",
            });

            //运行websocket
            that
              .axios({
                method: "post",
                url: "Socket/Refresh",
              })
              .then(function (res) {})
              .catch(function (err) {
                console.log(err);
              });

            that.dialogFormVisible2 = false;
          })
          .catch(function (err) {
            console.log(err);
          });
      } catch (err) {
        this.$message({
          message: "是不是没选择分配给谁?",
          type: "warning",
        });
      }
    },

    //弹出层关闭事件
    closeDialog() {
      //弹出层关闭后

      console.log("触发了关闭窗口的事件6");
      this.$refs.cascaderAddr.$refs.panel.clearCheckedNodes(); //把选择的销售人为空
    },

    //批量分配
    onFenPei() {
      var myArray = new Array();
      console.log(this.multipleSelection.length);
      for (const i in this.multipleSelection) {
        myArray.push(this.multipleSelection[i].cid);
      }
      if (myArray == null || myArray == "") {
        this.$message({
          message: "未选择数据",
          type: "warning",
        });
      } else {
        this.dialogFormVisible2 = true; //查看的开启弹出层
        this.list = myArray;

        alert(myArray);
      }
    },
    onLiuRu(){
      console.log(this.multipleSelection);
      var myArray = new Array();
      console.log(this.multipleSelection.length);
      for (const i in this.multipleSelection) {
        myArray.push(this.multipleSelection[i].cid);
      }
      if (myArray == null || myArray == "") {
        this.$message({
          message: "未选择数据",
          type: "warning",
        });
      } else {
        
        alert(myArray);
this.$confirm('将用户 ID为： '+myArray+' 流入公海, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           const that = this;
          
           that
        .axios({
          method: "POST",
       url: "crmdata/UpdataGongHaiBycid/"+myArray,
        })
        .then(function (res) {
           
              that.$message({
              message: "流入公海成功" + res.data.data,
              type: "success",
            });

 that
              .axios({
                method: "POST",
                url: "Socket/GetuserById"+"/"+1,
             
              })
              .then(function (res) {
                
              })
              .catch(function (err) {
                console.log(err);
              });
         
        })
        .catch(function (err) {
          console.log(err);
        });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      

        
      }
    },
    
    onFenPei2(){
         this.itemsdropdownmess2={ style: "black ", message: "未分配" };
 
 this.pageshow = false;//让分页隐藏
 
this.$nextTick(() => {//重新渲染分页
    this.pageshow = true;
});
        this.stat = "stat3";
          const that = this;
  
 
       that.sid2=-1;
       console.log("我是sid2" +that.sid2);
       console.log("stat" +that.stat);
  that
        .axios({
          method: "POST",
          url: "crmdata/All3/" + 0 + "/" + 1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

     


    },
    goBack() {
      console.log("go back");
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.onLoad();
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
h3{
  margin: 40px;
}
.dialog-div {

  text-align: center;
}
.el-dialog {
  height: 700px;
}
.collapse {
  text-align: center;
  margin: 30px;
}
.drawerdiv {
  margin: 35px;
  width: 45%;
}
.demonstration-div-fenye {
  text-align: center;
  margin: 40px;

}

.el-drawer.rtl{
    overflow: scroll;
}
.el-form-item {
    margin-bottom: 0px; 
}
.demo-drawer__footer{
  margin: 20px;
}
.divider-lable{
  margin: 40px;
}
.el-divider--horizontal{
 
  display: block;
    height: 1px;
   
    margin: 54px 0;
}
</style>
