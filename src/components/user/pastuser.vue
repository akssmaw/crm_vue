<template>
  <div class="table_div" >
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

        <el-form-item label="定金">
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
        <el-form-item label="文件">
          <input type="file" @change="getFile($event)" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sumbit">提交</el-button>
      </div>
    </el-dialog>
  <el-dialog :title="title" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
            <el-table-column property="stuname" label="学员姓名"></el-table-column>
               <el-table-column property="orderproject" label="报名项目"></el-table-column>

      <el-table-column property="con" show-overflow-tooltip label="我的备注"></el-table-column>

    <el-table-column property="prepay" label="预付"  ></el-table-column>
    <el-table-column property="total" label="总额"></el-table-column>
       <el-table-column property="time" label="订单时间"></el-table-column>
    <el-table-column label="审核状态">
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
      label="全款状态"
   >
      <template slot-scope="scope">
  
 <el-tag v-if="scope.row.orderstate==0" type="danger">
      未交全款
    </el-tag><el-tag v-if="scope.row.orderstate==1" type="success">
      已交全款
    </el-tag>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
      <el-collapse class="collapse" v-model="activeNames"  >
  <el-collapse-item title="历史客源" name="1">
    <div>
<el-form :model="formInline"  >
 
    <el-input class="formInline" v-model="formInline.phone"   placeholder="手机号"></el-input>
   <el-button @click="SelectpastuserSearch">搜索用户</el-button>
</el-form>

    </div>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="CID"
      sortable
      prop="cid"
      width="180">
      
    </el-table-column>
    <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
       <span  >{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="最后操作时间"
      prop="lasttime"
      sortable 
      width="180">
      
    </el-table-column>
       <el-table-column
      label="备注"
      width="180">
      <template slot-scope="scope">
       <span  >{{ scope.row.con }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      align="right">
          <!-- eslint-disable -->
      
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查询订单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleInsert(scope.$index, scope.row)">Insert</el-button>
      </template>
    
    </el-table-column>
  </el-table>
  <div class="demonstration-div-fenye"  v-if="pageshow">
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

  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
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

</template>

<script>
export default {
  name: 'pastuser',
  data () {
    return {
        tableData: [{}],
        gridData:[{}],
         activeNames: ['1'],
           uid:window.localStorage.getItem("uid"),
        uname:window.localStorage.getItem("uname"),
         pageshow:true,
          search:'',
             dialogTableVisible: false,
             title:'',
             formInline:{phone:''},
             dialogFormVisible:false,
               selectedtable: [{}],
               xiansuotitle:"",
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
      }
  },methods:{
      onLoad(){
          const that = this; //加载
         that
        .axios({
          method: "POST",
          url: "crmdata/Selectpastuser/"+this.uid+"/"+1,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      },
          handleCurrentChange(val) {

            const that = this; //加载
         that
        .axios({
          method: "POST",
          url: "crmdata/Selectpastuser/"+this.uid+"/"+val,
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
          },
     handleEdit(index, row) {
                      const that = this; //加载
                      that.title="用户ID : "+row.cid+" 的订单"
                   that
        .axios({
          method: "POST",
          url: "Upload/SecletOrderByCid/"+row.cid,
        })
        .then(function (res) {
          console.log(res.data.data);
       that.gridData= res.data.data
        })
        .catch(function (err) {
          console.log(err);
        });
    this.dialogTableVisible=true;
                },
        SelectpastuserSearch(){

 
 const that = this; //加载 
            that
        .axios({
          method: "POST",
          url: "crmdata/SelectpastuserSearch/"+ that.uid+"/"+that.formInline.phone,
        })
        .then(function (res) {
 
        that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

                },
                   getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
       handleInsert(index,row){
         alert(row.cid)
         this.dialogFormVisible=true
      this.selectedtable = row;
           this.xiansuotitle = "手机号:" + row.phone;
                },
                 sumbit() {
      let prepay = parseFloat(this.form.prepay).toFixed(3);
      let prepayprepay = prepay.substring(0, prepay.length - 1);

      let total = parseFloat(this.form.total).toFixed(3);
      let totaltotal = total.substring(0, total.length - 1);

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

.table_div{
    margin: 50px;
}
.demonstration-div-fenye {
  text-align: center;
  margin: 40px;

}
.formInline{
  width: 150px;
 
}
.collapse {
  text-align: center;
  margin: 30px;
}
</style>
