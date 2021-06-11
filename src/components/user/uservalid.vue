<template>
  <div class="hello">
    <div class="tabs-class">
      <el-dialog
  title="放弃用户！"
  :visible.sync="dialogVisible"
  width="30%"
 >
 
  <el-form :model="form2">
    <el-form-item label=""></el-form-item>
 
    <el-form-item label="放弃理由：">
          <el-select
            filterable 
              allow-create 
              default-first-option 
           v-model="form2.account" placeholder="请选择放弃理由">
            <el-option label="客户无咨询" value="客户无咨询"></el-option>
            <el-option label="同行 " value="同行 "></el-option>
               <el-option label="停机 " value="停机 "></el-option>
            <el-option label="空号" value="空号"></el-option>
            <el-option label="非本人咨询" value="非本人咨询"></el-option>
                 <el-option label="不同意联系方式" value="不同意联系方式"></el-option>
                   <el-option label="主动放弃" value="主动放弃"></el-option>
          </el-select>
        </el-form-item>
          </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="FangqiYes">确 定</el-button>
  </span>
</el-dialog>
<el-dialog title="历史备注" :visible.sync="dialogVisible2">
 <div  style="height:300px;overflow:auto">
    <el-table :data="gridData">
        <el-table-column property="lastuname" width="150" label="人员"></el-table-column>
    <el-table-column property="lastcon" label="备注" width="150"></el-table-column>
    <el-table-column property="lasttime" label="时间" width="200"></el-table-column>

  </el-table>
 </div>
</el-dialog>


<el-dialog title="修改备注" :visible.sync="dialogVisible3">
 
     <el-form>
<el-form-item >
  <el-input  style="height:100px" type="textarea" v-model="BeiZhudesc"></el-input>
</el-form-item>

     </el-form>
    
  <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button @click="BeiZhuClick" type="primary">保存</el-button>
      </div>
</el-dialog>
      <el-tabs
        :tab-position="tabPosition"
        @tab-click="handleClick"
      >
        <el-tab-pane label="有效客户">
          
          <!-- table1 -->
         
          <el-form ref="form" :model="formphone" class="formphone" >
  <el-form-item label=" ">
    <el-input v-model="formphone.phone" class="formphone-input"></el-input>
    <el-button @click="formphoneClick"  >查询</el-button>
  </el-form-item>
          </el-form>
          <el-table 
   ref="singleTable"
          highlight-current-row

            class="table1"
            :data="
              tableData.filter(
                (data) =>
                  !search1 ||
                  data.phone.toLowerCase().includes(search1.toLowerCase())
              )
            "
            style="width: 100%"
        @row-contextmenu="rowtextmenuclick"
        @cell-mouse-enter="handleMouseEnter"
       @cell-dblclick="handleclickEnter"
         @row-click="rowclick"
        
          :row-class-name="tableRowClassName" 
        
          >
            <el-table-column label="cid" prop="cid"> </el-table-column>
            <el-table-column label="手机号" prop="phone"> </el-table-column>
                     <el-table-column show-overflow-tooltip label="备注" prop="con"> </el-table-column>
                    
                     <el-table-column label="来源平台" prop="source"> </el-table-column>

                           <el-table-column show-overflow-tooltip label="关键词" prop="plankey"> </el-table-column>
                            <el-table-column label="领取时间" prop="lasttime"> </el-table-column>
                                   
            <el-table-column   width="380" align="right">
              <!-- eslint-disable -->
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search1"
                  size="mini"
                  placeholder="输入手机号查询"
                />
              </template>
              <template slot-scope="scope" v-if="tabtab==0">
             
                <el-popover
  placement="right"
 
  trigger="hover">
 
    <el-table :data="activities2">
  <el-table-column width="150" property="ptime" label="时间"></el-table-column>
    <el-table-column width="150" property="pcon" label="备注"></el-table-column>

  </el-table>
  
  <el-button slot="reference"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >线索</el-button
                >
 
</el-popover>
               
                  <!-- <el-button
                  size="mini"
                  @click="handleEdit2(scope.$index, scope.row)"
                  >备注</el-button
                > -->
                 <!-- <el-button
                  size="mini"
                  @click="handleEdit3(scope.$index, scope.row)"
                  >修改</el-button
                > -->
                    <el-button
                  size="mini"
                 
                  @click="handleEdit4(scope.$index, scope.row)"
                  >修改</el-button
                >
                 
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleSele(scope.$index, scope.row)"
                  >新建</el-button
                >
                
                <el-button
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row, tableData)"
                  >放弃</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <!-- table1 -->
        </el-tab-pane>

        <el-tab-pane label="正在审核">
          
 <el-table
 
    :data="tableData2.filter(data => !search2 || data.phone.toLowerCase().includes(search2.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="学员姓名"
       
      prop="stuname">
    </el-table-column>
    <el-table-column
      label="手机号"
      sortable
      prop="phone">
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
      label="预付"
      sortable
      prop="prepay">
    </el-table-column>
      <el-table-column
      label="总额"
      sortable
      prop="total">
    </el-table-column>
 
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      <el-table-column
      label="我的备注"
      :show-overflow-tooltip="true"
      prop="con">
    </el-table-column>
       <el-table-column
      label="状态"
  >
   <template slot-scope="scope">
        <el-tag v-if="scope.row.state=1"  type="warning"
          disable-transitions>正在审核</el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="支付平台"
     :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      prop="account">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search2"
          size="mini"
          placeholder="输入手机号查询"/>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">从新创建</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">ss</el-button> -->
      </template>
    </el-table-column>
  </el-table>

        </el-tab-pane>
 
        <el-tab-pane label="审核失败">
          
          
<el-table 
 

    :data="tableData3.filter(data => !search3 || data.phone.toLowerCase().includes(search3.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="学员姓名"
       
      prop="stuname">
    </el-table-column>
    <el-table-column
      label="手机号"
      sortable
      prop="phone">
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
      label="预付"
      sortable
      prop="prepay">
    </el-table-column>
      <el-table-column
      label="总额"
      sortable
      prop="total">
    </el-table-column>
    
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      <el-table-column
      label="我的备注"
      :show-overflow-tooltip="true"
      prop="con">
    </el-table-column>
        <el-table-column
      label="驳回备注"
      :show-overflow-tooltip="true"
      prop="rescon">
    </el-table-column>
       <el-table-column
      label="状态"
  >
   <template slot-scope="scope">
        <el-tag v-if="scope.row.state=2" type="danger"
          disable-transitions>审核失败</el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="支付平台"
       :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      prop="account">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search3"
          size="mini"
          placeholder="输入手机号查询"/>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">从新创建</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">ss</el-button> -->
      </template>
    </el-table-column>
  </el-table>

        </el-tab-pane>

        <el-tab-pane label="审核成功">
          
<el-table
    :data="tableData4.filter(data => !search4 || data.phone.toLowerCase().includes(search4.toLowerCase()))"
    highlight-current-row 
    style="width: 100%">
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="学员姓名"
       
      prop="stuname">
    </el-table-column>
    <el-table-column
      label="手机号"
      sortable
      prop="phone">
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
      label="预付"
      sortable
      prop="prepay">
    </el-table-column>
      <el-table-column
      label="总额"
      sortable
      prop="total">
    </el-table-column>
    
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      <el-table-column
      label="我的备注"
      :show-overflow-tooltip="true"
      prop="con">
    </el-table-column>
       <el-table-column
      label="状态"
  >
   <template slot-scope="scope">
        <el-tag v-if="scope.row.state=3" type="success"
          disable-transitions>审核成功</el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="支付平台"
 
      
       :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      prop="account">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search4"
          size="mini"
          placeholder="输入手机号查询"/>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">从新创建</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">ss</el-button> -->
      </template>
    </el-table-column>
  </el-table>


        </el-tab-pane>
          <el-tab-pane label="未缴尾款">
      <el-table
    :data="tableData5.filter(data => !search5 || data.phone.toLowerCase().includes(search5.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="cid"
      sortable
      prop="cid">
    </el-table-column>
    <el-table-column
      label="学员姓名"
       
      prop="stuname">
    </el-table-column>
    <el-table-column
      label="手机号"
      sortable
      prop="phone">
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
      label="预付"
      sortable
      prop="prepay">
    </el-table-column>
      <el-table-column
      label="总额"
      sortable
      prop="total">
    </el-table-column>
    
   
     <el-table-column
      label="创建时间"
      sortable
      prop="time">
    </el-table-column>
      <el-table-column
      label="我的备注"
      :show-overflow-tooltip="true"
      prop="con">
    </el-table-column>
       <el-table-column
      label="状态"
       :filters="[{ text: '审核成功', value: 3 }, { text: '审核失败', value: 2 },{ text: '正在审核', value:1 }]"
      :filter-method="filterTag2"
  >
   <template slot-scope="scope">
    <el-tag v-if="scope.row.state==1" type="warning">
      正在核审
    </el-tag>
 <el-tag v-if="scope.row.state==2" type="danger">
      核审失败
    </el-tag><el-tag v-if="scope.row.state==3" type="success">
      核审成功
    </el-tag>
      </template>
    </el-table-column>
      <el-table-column
      label="支付平台"

       :filters="[{ text: '兴业银行', value: '兴业银行' }, { text: '对公微信', value: '对公微信' },{ text: '工商银行', value: '工商银行' },{ text: '帅哥微信', value: '帅哥微信' },{ text: '对公支付宝', value: '对公支付宝' }]"
      :filter-method="filterTag"
      prop="account">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search5"
          size="mini"
          placeholder="输入手机号查询"/>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">从新创建</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">ss</el-button> -->
      </template>
    </el-table-column>
  </el-table>


          </el-tab-pane>
      </el-tabs>
      <div class="demonstration-div-fenye" v-if="pageshow">
        <div class="block">
          <span class="demonstration"> </span>
          <el-pagination
            @current-change="handleCurrentChange"
                 :current-page.sync="currentPage"
            :page-size="1"
       
            layout="prev, pager, next, jumper"
            :total='100'
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 线索 -->
    <el-dialog :title="xiansuotitle" :visible.sync="dialogTableVisible">
      <el-dialog
        width="40%"
        title="新建线索"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-input type="textarea" v-model="textarea"></el-input>
        <p></p>
        <el-button
          type="primary"
          @click="resetForm(selectedtable)"
          style="text-align: center; width: 100%"
          >保存</el-button
        >
      </el-dialog>
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
          <el-popconfirm
  title="确定删除吗？"
   @onConfirm="DeleteXianSuo(activity.pid)"
 

>

 <label  slot="reference" > {{ activity.uname }} : {{ activity.pcon }}
        </label> 
 
</el-popconfirm>
         
          
          </el-timeline-item>
        </el-timeline>
      </div>

      <!-- <a href="http://xuebim.net/Upload/springboot.zip" download="">下载文件</a> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >新建线索</el-button
        >
      </div>
    </el-dialog>
    <!-- 新建订单 -->
    <el-dialog :title="xiansuotitle" :visible.sync="dialogFormVisible">
      <el-form label-position="right" label-width="100px" :model="form">
        <el-form-item label="cid" hidden style="width: 280px">
          <el-input v-model="selectedtable.cid"></el-input>
        </el-form-item>
        <el-form-item label="phone" style="width: 280px">
          <el-input disabled v-model="selectedtable.phone"></el-input>
        </el-form-item>

        <el-form-item label="学员姓名" style="width: 280px">
          <el-input v-model="form.stuname"></el-input>
        </el-form-item>
        
<el-form-item label="是否全款"  style="width: 280px">
 
         <el-switch
        :change="quan_kuan()"
 v-model="quan_kuan_bool"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
        </el-form-item>
        <el-form-item label="定金" v-show="quan_kuanbool">
          <el-input-number
            v-model="form.prepay"
            :min="0"
            :precision="2"
            :step="1"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总额">
          <el-input-number
            v-model="form.total"
            :min="1"
            :precision="2"
            :step="1"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="支付平台">
          <el-select
            filterable 
              allow-create 
              default-first-option 
           v-model="form.account" placeholder="请选择支付平台">
            <el-option label="对公微信" value="对公微信"></el-option>
            <el-option label="对公账户 " value="对公账户 "></el-option>
               <el-option label="对公支付宝 " value="对公支付宝 "></el-option>
            <el-option label="兴业银行" value="兴业银行"></el-option>
            <el-option label="工商银行" value="工商银行"></el-option>
                 <el-option label="帅哥微信" value="帅哥微信"></el-option>
          </el-select>
        </el-form-item>
       
         <el-form-item label="选择项目">
          <el-select
            filterable 
              allow-create 
              default-first-option 
           v-model="form.orderproject" placeholder="请选择项目">
            <el-option label="BIM建模师" value="BIM建模师"></el-option>
            <el-option label="水利电力BIM工程师 " value="水利电力BIM工程师 "></el-option>
               <el-option label="装饰BIM工程师 " value="装饰BIM工程师 "></el-option>
            <el-option label="造价BIM工程师" value="造价BIM工程师"></el-option>
            <el-option label="建筑BIM工程师" value="建筑BIM工程师"></el-option>
              <el-option label="结构BIM工程师" value="结构BIM工程师"></el-option>
                   <el-option label="市政BIM工程师" value="市政BIM工程师"></el-option>
                           <el-option label="机电BIM工程师" value="机电BIM工程师"></el-option>
                                <el-option label="公路BIM工程师" value="公路BIM工程师"></el-option>
                                   <el-option label="BIM高级工程师" value="BIM高级工程师"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单备注" prop="desc">
          <el-input type="textarea" v-model="form.con"></el-input>
        </el-form-item>
        <el-form-item label="压缩包文件">
          <input type="file" @change="getFile($event)" />
        </el-form-item>
      </el-form>
     
      <div slot="footer" class="dialog-footer">
         <p>注意：上传文件必须是压缩包文件 (如提交不进去 就缩短压缩包名称为 "学员姓名" 即可) 压缩包里是学员资料，信息，合同，备注，等信息 </p>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sumbit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "uservalid",
  data() {
    return {
      msg: "我是有效客户",
      tabPosition: "left",
      quan_kuan_bool:false,
      quan_kuanbool:true,
      tableData: [{}],
      tableData2:[{}],
      tableData3:[{}],
      tableData4:[{}],
      tableData5:[{}],
      currentPage:1,
      gridData:'',
      dialogVisible:false,
      dialogVisible2:false,
      dialogVisible3:false,
      BeiZhudesc:"",
      search: "",
      search1:'',
       search2:'',
        search3:'',
         search4:'',
          search5:'',
          number:1,
      pageshow: true,
      tabtab: 0,
      dialogTableVisible: false,
      xiansuotitle: "",
      textarea: "",
      innerVisible: false,
      admin: window.localStorage.getItem("admin"),
      activities: [{}],
      activities2:[{}],
      selectedtable: [{}],
      dialogFormVisible: false,
      uid: window.localStorage.getItem("uid"),
      uname: window.localStorage.getItem("uname"),
      DelectTbaleByIndex:'',
      page: 1,
      selectData:{},
      file: "",
      formphone:{
        phone:''
      },
      form: {
        cid: "",
        phone: "",
        uid: "",
        uname: "",
        stuname: "",
        zipurl: "", //zip地址
        prepay: "", //预付款金额
        total: "", //全额
        account: "", //平台
        orderproject:'',
        con: "", //备注
        state: "", //状态
      },
      form2:{
        account:''
      },
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        row.index = rowIndex;
         if (row.color === 1) {
          return 'warning-row';
        } else if (row.color === 2) {
          return 'success-row';
        }else if (row.color === 3) {
          return 'danger-row';
        }
        
        return '';
      
      },
      pClick(){
        alert(2)
      },
      defineCallBack(page,selectData) {
 
 const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "crmdata/SelectYouXiao/" +
            window.localStorage.getItem("uid") +
            "/" +
            page,
        })
        .then(function (res) {
          that.tableData = res.data.data;
          var j = parseInt(page)
          that.currentPage = j;
         let rowid= window.localStorage.getItem("rowid")
        
           that.$refs.singleTable.setCurrentRow(that.tableData[rowid]);
       that.pageshow = false;//让分页隐藏
  
that.$nextTick(() => {//重新渲染分页
    that.pageshow = true;
});

        })
        .catch(function (err) {
          console.log(err);
        });

},
    onLoad() {


  
const that = this; //加载
        if (window.localStorage.getItem("page") != null) {

         
  that.$notify({
    title: "通知消息",
   
    dangerouslyUseHTMLString: true,
    message: `<p style="cursor: pointer;">检测到您上次访问，点击跳转 <br>页面数：${window.localStorage.getItem("page")}</p><p> 用户ID：${window.localStorage.getItem("selectData")}</p>`,
    
    type: "warning",
    onClick() {
          
      that.defineCallBack(window.localStorage.getItem("page"),window.localStorage.getItem("selectData")); //自定义回调,message为传的参数


    }
  });

        }



 
      that
        .axios({
          method: "POST",
          url:
            "crmdata/SelectYouXiao/" +
            window.localStorage.getItem("uid") +
            "/" +
            1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    rowtextmenuclick(row){
 
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    sumbit() {
       
      let prepay = parseFloat(this.form.prepay).toFixed(3);
      let prepayprepay = prepay.substring(0, prepay.length - 1);

      let total = parseFloat(this.form.total).toFixed(3);
      let totaltotal = total.substring(0, total.length - 1);
      if(this.quan_kuan_bool==true){

        prepayprepay=totaltotal

      }
      console.log("prepayprepay"+prepayprepay);
console.log("totaltotal"+totaltotal);

      if (this.form.stuname == "") {
        const that = this;
        that.$message({
          message: "好像没填姓名",
          type: "warning",
        });
      } else if (prepayprepay == "0.00") {
        const that = this;
        that.$message({
          message: "金额不能为0",
          type: "warning",
        });
      } else if (this.form.account == "") {
        const that = this;
        that.$message({
          message: "支付平台未选择",
          type: "warning",
        });
      } else if (this.form.con == "") {
        const that = this;
        that.$message({
          message: "备注未填写",
          type: "warning",
        });
      } else if (this.file == "") {
        const that = this;
        that.$message({
          message: "未选择文件",
          type: "warning",
        });
      } else if(prepayprepay>totaltotal) {
         const that = this;
        that.$message({
          message: "金额填写错误",
          type: "warning",
        });
       
      }else{
         const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

console.log(totaltotal);
console.log(this.form.orderproject);
        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("phone", this.selectedtable.phone);
        formData.append("cid", this.selectedtable.cid);
        formData.append("uid", this.uid);
        formData.append("uname", this.uname);
        formData.append("stuname", this.form.stuname);
        formData.append("prepay", prepayprepay);
        formData.append("total", totaltotal);
        formData.append("account", this.form.account);
        formData.append("con", this.form.con);
         formData.append("orderproject", this.form.orderproject);
         console.log(formData);
   const that = this; //加载
          that.axios({
           method: 'post',
           timeout: 900000, //这个就是重点
           url: 'Upload/UploadOrder',
           headers: {
           },
           params:{
           },
           data: formData
         }).then((response) => {
            loading.close();
                 this.tableData.splice(this.DelectTbaleByIndex, 1);
                   this.dialogFormVisible = false;
                   
              that.$message({
                type: "success",
                message: "已提交!",
              });
             console.log(response)

           }).catch(function (error) {
               loading.close();
             alert("上传zip文件错误请从新上传")

             console.log(error)
           })
      }
    },
     filterTag(value, row) {
       console.log(value);
        return row.account === value;
      },
      filterTag2(value, row) {
       console.log(value);
        return row.state == value;
      },
      quan_kuan(){

        if(this.quan_kuan_bool==true){
 this.quan_kuanbool=false;

        }else if(this.quan_kuan_bool==false){
           this.quan_kuanbool=true;
        }
       

      },
    dateFormat(time) {
      let date = new Date(time + 8 * 3600000);
      let str = date.toISOString().replace("T", " ");
      return str.substr(0, str.lastIndexOf("."));
    },
    resetForm(selectedtable) {
      console.log(this.textarea);

      console.log(selectedtable);
      // 判断有没有填写线索
      const that = this; //加载

      if (this.textarea == "") {
        that.$message({
          message: "好像没有填写线索",
          type: "warning",
        });
      } else {
        var datetime = this.dateFormat(Date.now());
        that
          .axios({
            method: "POST",
            url:
              "piste/InsertUserpiste/" +
              selectedtable.cid +
              "/" +
              datetime +
              "/" +
              that.textarea +
              "/" +
              window.localStorage.getItem("uid") +
              "/" +
              window.localStorage.getItem("uname"),
          })
          .then(function (res) {
            that.$message({
              showClose: true,
              message: "保存成功",
              type: "success",
            });

            that
              .axios({
                method: "POST",
                url: "piste/UserpisteAll/" + selectedtable.cid,
              })
              .then(function (res) {
                that.activities = res.data.data;
                that.dialogTableVisible=false;
                that.innerVisible=false;
              })
              .catch(function (err) {
                console.log(err);
              });
          })
          .catch(function (err) {
            console.log(err);
          });
          
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
this.textarea="";
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
    handleDelete(index, row, tableData) {

      this.dialogVisible=true;
      this.selectedtable = row;
          this.DelectTbaleByIndex=index;
    },
    FangqiYes(){
         var datetime = this.dateFormat(Date.now());

  const that = this;
          that
            .axios({
              method: "POST",
              url: "crmdata/UpdataGongHaiBycidDan/"+this.selectedtable.cid+"/"+window.localStorage.getItem("uid") ,
            })
            .then(function (res) {
    
              
            

    that
        .axios({
          method: "POST",
          url: "crmdata/updatabycon/" + window.localStorage.getItem("uid") + "/" + window.localStorage.getItem("uname") + "/" + that.selectedtable.cid + "/" + datetime + "/" + that.form2.account + "",
        })
        .then(function (res) {
            that.tableData.splice(that.DelectTbaleByIndex, 1);
              that.$message({
                type: "success",
                message: "已放弃!",
              });
    that.dialogVisible=false;
        })
              
            })
            .catch(function (err) {
              console.log(err);
            });

    },
    handleSele(index, row) {
      this.DelectTbaleByIndex=index;
         
      this.xiansuotitle = "手机号:" + row.phone;
      this.dialogFormVisible = true;

      this.selectedtable = row;
      console.log(index, row);
    },
    rowclick(row){
      
      window.localStorage.setItem("page", this.currentPage);
         window.localStorage.setItem("selectData", row.cid);
            window.localStorage.setItem("rowid", row.index);
          
     
    },
    handleClick(tab, event) {

       this.pageshow = false;//让分页隐藏
 
this.$nextTick(() => {//重新渲染分页
    this.pageshow = true;
});

      this.tabtab = tab.index;
      if (this.tabtab == 0) {
        const that = this; //加载

        that
          .axios({
            method: "POST",
            url:
              "crmdata/SelectYouXiao/" +
              window.localStorage.getItem("uid") +
              "/" +
              1,
          })
          .then(function (res) {
            that.tableData = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (this.tabtab == 1) {

 const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            1+ "/"+
            1,
        })
        .then(function (res) {
          that.tableData2 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log("当前tab" + 1);
      } else if (this.tabtab == 2) {

        const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            2+ "/"+
            1,
        })
        .then(function (res) {
          that.tableData3 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log("当前tab" + 2);
      } else if (this.tabtab == 3) {

          const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            3+ "/"+
            1,
        })
        .then(function (res) {
          that.tableData4 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log("当前tab" + 3);
      }else if(this.tabtab == 4){
const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUidWk/" +
            window.localStorage.getItem("uid") +
            "/" +
            1,
        })
        .then(function (res) {
          that.tableData5 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log(4);
      }
    },
     handleEdit2(index,row){
    
    this.dialogVisible2 = true;
  const that = this; //加载
      that
        .axios({
          method: "POST",
          url: "record/RecordAllById/" + row.cid,
        })
        .then(function (res) {
          console.log(res);

        
            that.gridData = res.data.data;
         
        })
        .catch(function (err) {
          console.log(err);
        });

    },
    formphoneClick(){
 
 const that = this; //加载
      that
        .axios({
          method: "POST",
          url: "crmdata/SelectYouXiaoSearh/" + that.uid+"/"+that.formphone.phone,
        })
        .then(function (res) {
          console.log(res);

        
        that.tableData = res.data.data;
         
        })
        .catch(function (err) {
          console.log(err);
        });

    },
    handleMouseEnter(row){
   
  
       
 
       const that = this; //加载

      that
        .axios({
          method: "POST",
          url: "piste/UserpisteAll/" + row.cid,
        })
        .then(function (res) {
          that.activities2 = res.data.data;
        
        })
        .catch(function (err) {
          console.log(err);
        });



    },
    handleclickEnter(row){
     
  

      if(row.color==0){
         const that = this; //加载
        that
        .axios({
          method: "POST",
          url: "crmdata/UpdataColorByCid/" + row.cid+"/"+1,
        })
        .then(function (res) {

that
          .axios({
            method: "POST",
            url:
              "crmdata/SelectYouXiao/" +
              window.localStorage.getItem("uid") +
              "/" +
              that.number,
          })
          .then(function (res) {
            that.tableData = res.data.data;

 that.$message({
          message: '标记成功',
          type: 'success'
        });

          })
          
        
        })
        .catch(function (err) {
          console.log(err);
        });
      }else{
        
         const that = this; //加载
        that
        .axios({
          method: "POST",
          url: "crmdata/UpdataColorByCid/" + row.cid+"/"+0,
        })
        .then(function (res) {

that
          .axios({
            method: "POST",
            url:
              "crmdata/SelectYouXiao/" +
              window.localStorage.getItem("uid") +
              "/" +
              that.number,
          })
          .then(function (res) {
            that.tableData = res.data.data;

 that.$message({
          message: '取消标记',
          type: 'success'
        });

          })
          
        
        })
        .catch(function (err) {
          console.log(err);
        });
      }

    },
 handleEdit4(index,row){
  
  this.BeiZhudesc= row.con;
   this.selectedtable = row;
   this.dialogVisible3=true;
 },
 DeleteXianSuo(pid){




   const that = this; //加载
     that
              .axios({
                method: "POST",
                url: "piste/DeleteUserpisteByPid/" + pid,
              })
              .then(function (res) {
               that
              .axios({
                method: "POST",
                url: "piste/UserpisteAll/" + that.selectedtable.cid,
              })
              .then(function (res) {
                that.activities = res.data.data;
                
              })
              .catch(function (err) {
                console.log(err);
              });
                
              })
              .catch(function (err) {
                console.log(err);
              });

           
 },
 
 BeiZhuClick(){
   
 
  console.log(this.number);
     const that = this; //加载
     
   that
        .axios({
          method: "POST",
          url: "crmdata/UpdateCrmDataByIdCon/ " +that.selectedtable.cid + " / " +that.BeiZhudesc+ " ",
        })
        .then(function (res) {


that
          .axios({
            method: "POST",
            url:
              "crmdata/SelectYouXiao/" +
              window.localStorage.getItem("uid") +
              "/" +
              that.number,
          })
          .then(function (res) {
            that.tableData = res.data.data;

 that.$message({
          message: '修改成功',
          type: 'success'
        });

          })
          .catch(function (err) {
            console.log(err);
          });


         
        })
        .catch(function (err) {
          console.log(err);
        });
 },
    handleCurrentChange(val) {
      console.log("当前tab" + this.tabtab);
      console.log("页数" + val);
      this.number=val;
      if (this.tabtab == 0) {
        const that = this; //加载

        that
          .axios({
            method: "POST",
            url:
              "crmdata/SelectYouXiao/" +
              window.localStorage.getItem("uid") +
              "/" +
              val,
          })
          .then(function (res) {
            that.tableData = res.data.data;
          })
          .catch(function (err) {
            console.log(err);
          });
      } else if (this.tabtab == 1) {
       
        const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            1+ "/"+
            val,
        })
        .then(function (res) {
          that.tableData2 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      } else if (this.tabtab == 2) {
        console.log("当前tab" + 2);
        const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            2+ "/"+
            val,
        })
        .then(function (res) {
          that.tableData3 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      } else if (this.tabtab == 3) {
       const that = this; //加载

      that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUid/" +
            window.localStorage.getItem("uid") +
            "/" +
            3+"/"+
            val,
        })
        .then(function (res) {
          that.tableData4 = res.data.data;
          
        })
        .catch(function (err) {
          console.log(err);
        });
      }else if(this.tabtab == 4){
   const that = this; //加载
that
        .axios({
          method: "POST",
          url:
            "Upload/SelectOrderByUidWk/" +
            window.localStorage.getItem("uid") +
            "/" +
            val,
        })
        .then(function (res) {
          that.tableData5 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        console.log(4);
      }
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
<style scoped>
 
h1,
h2 {
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
.tabs-class {
  margin-top: 50px;
}
.table1 {
  margin: -7px;
}
.demonstration-div-fenye {
  text-align: center;
  margin: 40px;
}
.el-timeline-item {
  margin: 20px;
}
.formphone-input{
  width: 150px;
}
.formphone{
text-align: center;
}

</style>
