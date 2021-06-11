<template>
  <div style=" text-align: center;">
 
    <el-collapse v-model="activeNames">
  
  <el-collapse-item title="接口提交" @click="onsumbit" name="1">
    <el-table class="el-table"
    :data="tableData2"
       :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    style="width: 100%;">
    <!-- <el-table-column
      label="id"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.cid }}</span>
      </template>
    </el-table-column> -->
    <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
      
          <!-- <p>手机号: {{ scope.row.phone }}</p> -->
          <!-- <p>住址: {{ scope.row.address }}</p> -->
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
          </div>
  
      </template>
    </el-table-column>
     <el-table-column
       sortable
      label="提交时间"
     prop="firsttime"
      width="180">
       
    </el-table-column>
     
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button  v-if="admin!=0"
          size="medium "
          @click="handleEdit3(scope.$index, scope.row,tableData2)">首资领取</el-button>

         <!-- <el-button v-if="admin==0"
          size="medium "
          @click="handleEdit2(scope.$index, scope.row,tableData)" ><i class="el-icon-delete-solid"></i></el-button> -->

          
      </template>

    </el-table-column>
  </el-table>
  <div class="block">
      <div style="height:10px"></div>
  <span class="demonstration"> </span>
  <el-pagination
    layout="prev, pager, next"
     @current-change="handleCurrentChange2"
    :total="10000">
  </el-pagination>
</div>
  </el-collapse-item>
 <el-collapse-item title="公海" name="2">
   
   <el-table class="el-table"
    :data="tableData"
       :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}"
    style="width: 100%;">
    <el-table-column
      label="id"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.cid }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
      
          <!-- <p>手机号: {{ scope.row.phone }}</p> -->
          <!-- <p>住址: {{ scope.row.address }}</p> -->
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
          </div>
  
      </template>
    </el-table-column>
     <el-table-column
       sortable
      label="提交时间"
     prop="firsttime"
      width="180">
       
    </el-table-column>
     <el-table-column
     show-overflow-tooltip
      label="最新备注"
      width="180">
      <template slot-scope="scope">
      
        <span style="margin-left: 10px">{{ scope.row.con }}</span>
      </template>
    </el-table-column>

     <el-table-column
     show-overflow-tooltip
      label="提交至今/天数"
      width="180">
      <template slot-scope="scope">
      <el-tag  type="info">{{((Date.parse(new Date())-Date.parse(new Date(scope.row.firsttime)))/86400000).toFixed(0) }}天</el-tag>
       
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button  v-if="admin!=0"
          size="medium "
          @click="handleEdit(scope.$index, scope.row,tableData)">领取</el-button>

         <el-button v-if="admin==0"
          size="medium "
          @click="handleEdit2(scope.$index, scope.row,tableData)" ><i class="el-icon-delete-solid"></i></el-button>

          
      </template>

    </el-table-column>
  </el-table>
 
<div class="block">
      <div style="height:50px"></div>
  <span class="demonstration"> </span>
  <el-pagination
    layout="prev, pager, next"
     @current-change="handleCurrentChange"
    :total="10000">
  </el-pagination>
</div>
  </el-collapse-item>
</el-collapse>

    

  </div>
 
  
  
</template>

<script>
 
export default {
  inject :['reload'],
  name: 'getuser',
  data () {
    return {
       admin: window.localStorage.getItem("admin"),
            uid: window.localStorage.getItem("uid"),
          tableData: [{}],
           tableData2: [{}],
            activeNames: ['1'],
             timer: null  // 定时器
      }
      
    }
    
    ,created(){
    // this.dataRefreh();

     if (localStorage.getItem("uid") != null) {

	    
     const that = this; //加载

 that.axios({
          method: "POST",
          url: "user/SelectUserStateByUid/"+that.uid,
        })
        .then(function (res) {
         if(res.data.data==1){
 
   that.$message({
      message: "登录已过期 或 管理员全体禁止登陆 请勿操作",
          duration:0,
          type: "success",
        });

setTimeout(function () {

         
    // 这里就是处理的事件
        const that = this;
  that.$router.push(
        {
          path: '/login'
        }
      )

}, 1000);
         }else {

           
 
 that.axios({
          method: "POST",
          url: "crmdata/All4/1",
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });

         that.axios({
          method: "POST",
          url: "crmdata/All5/1",
        })
        .then(function (res) {
          that.tableData2 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
         }
        })
       

     
 
 

	  }else{ 
           const that = this;
       that.$message({
      message: "登录已过期 或 管理员全体禁止登陆 请勿操作",
          duration:0,
          type: "success",
        });
      setTimeout(function () {

         
    //这里就是处理的事件
           window.location.href="../login";

}, 1000);
       
    
    
	  }


},

destroyed(){
    // 在页面销毁后，清除计时器
    this.clear();
}
    , methods: {
       // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        console.log("刷新" + new Date());
   const that = this; //加载
   that.onsumbit();

      }, 1000);
    }, 
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    onsumbit(){
       const that = this; //加载
    that.axios({
          method: "POST",
          url: "crmdata/All5/1",
        })
        .then(function (res) {
          that.tableData2 = res.data.data;
          
        })
        .catch(function (err) {
          console.log(err);
        });
},
      onLoad(){
        
   


      },
       dateFormat(time) {
            let year = new Date().getFullYear();//年
            let month = new Date().getMonth() + 1;//注意！月份是从0月开始获取的，所以要+1;
            let day = new Date().getDate();//日
              const todayDate = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day);
      return todayDate ;
    },
     dateFormat2(time) {
      let date = new Date(time + 8 * 3600000);
      let str = date.toISOString().replace("T", " ");
      return str.substr(0, str.lastIndexOf("."));
    },
      handleEdit(index, row,tableData) {
      
//领取客户
 
 const that = this;
   const ztime = this.dateFormat(Date.now())+" "+"00:00:00"
         const gettime = this.dateFormat2(Date.now());
         const lastuid =  window.localStorage.getItem('uid');
          const lastuname = window.localStorage.getItem('uname');

        console.log( gettime)
          console.log( lastuid)
        console.log(index, row);
          console.log("我领取的tableId"+index);
  //  that
  //             .axios({
  //               method: "POST",
  //               url: "Socket/GetuserById"+"/"+index,
             
  //             })
  //             .then(function (res) {
                
  //             })
  //             .catch(function (err) {
  //               console.log(err);
  //             });
that
        .axios({
          method: "POST",
          url: "crmdata/UpdataCrmdataAndInsertGetuser/" +lastuid + "/"+lastuname+"/"+gettime+"/"+ztime+"/"+row.cid,
        })
        .then(function (res) {
          console.log(res);
          if(res.data.data.msg==0){
                that.$message({
          message: "领取失败了！剩余额度:"+ res.data.data.getnext+" ,明天再来吧！",
          
          type: "error",
        });
          }else if(res.data.data.msg==1){
             that.$message({
          message: "手速慢了，剩余额度:"+ res.data.data.getnext+" ",
          
          type: "error",
        });
      
          tableData.splice(index, 1);
          }else if(res.data.data.msg==2){
  that.$message({
          message: "领取成功了！剩余额度:"+res.data.data.getnext+"",
          
          type: "success",
        });
        

        //日志
         that
        .axios({
          method: "POST",
       url: "crmdata/updatabycon/" + lastuid + "/" + lastuname + "/" + row.cid + "/" + gettime + "/"+"领取客户",
        })
        .then(function (res) {
         
        })
        .catch(function (err) {
          console.log(err);
        });
 
//websocket 


          tableData.splice(index, 1);
          }else if(res.data.data.msg==4){

  that.$message({
          message: "保存的用户太多了！请放弃或者尽快开单后，在领取客户把~",
          
          type: "error",
        });
            
          }else{
            that.$message({
          message: "程序报错，联系管理员",
          
          type: "error",
        });
          }
         
        })
        .catch(function (err) {
          console.log(err);
        });


      },
      handleEdit2(index, row,tableData){
         this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            tableData.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });



      },
      handleEdit3(index, row,tableData2){
     
//领取客户
 
 const that = this;
   const ztime = this.dateFormat(Date.now())+" "+"00:00:00"
         const gettime = this.dateFormat2(Date.now());
         const lastuid =  window.localStorage.getItem('uid');
          const lastuname = window.localStorage.getItem('uname');

        console.log( gettime)
          console.log( lastuid)
        console.log(index, row);
          console.log("我领取的tableId"+index);
  //  that
  //             .axios({
  //               method: "POST",
  //               url: "Socket/GetuserById"+"/"+index,
             
  //             })
  //             .then(function (res) {
                
  //             })
  //             .catch(function (err) {
  //               console.log(err);
  //             });
that
        .axios({
          method: "POST",
          url: "crmdata/UpdataCrmdataAndInsertGetuser2/" +lastuid + "/"+lastuname+"/"+gettime+"/"+ztime+"/"+row.cid,
        })
        .then(function (res) {
          console.log(res);
          if(res.data.data.msg==0){
                that.$message({
          message: "领取失败了！剩余首资额度:"+ res.data.data.getnext+" ,明天再来吧！",
          
          type: "error",
        });
          }else if(res.data.data.msg==1){
             that.$message({
          message: "手速慢了，剩余首资额度:"+ res.data.data.getnext+" ",
          
          type: "error",
        });
      
          tableData2.splice(index, 1);
          }else if(res.data.data.msg==2){
  that.$message({
          message: "领取成功了！剩余首资额度:"+res.data.data.getnext+"",
          
          type: "success",
        });
        

          tableData2.splice(index, 1);
        //日志
         that
        .axios({
          method: "POST",
       url: "crmdata/updatabycon/" + lastuid + "/" + lastuname + "/" + row.cid + "/" + gettime + "/"+"领取首资客户",
        })
        .then(function (res) {
         
        })
        .catch(function (err) {
          console.log(err);
        });
 
//websocket 


          }else if(res.data.data.msg==4){


  that.$message({
          message: "保存的用户太多了！请放弃或者尽快开单后，在领取客户把~",
          
          type: "error",
        });
            
          }else{
            that.$message({
          message: "程序报错，联系管理员",
          
          type: "error",
        });
          }
         
        })
        .catch(function (err) {
          console.log(err);
        });

        
      },
      handleCurrentChange(val){
        console.log(val);
       const that = this;
           that.axios({
          method: "POST",
          url: "crmdata/All4/"+val+"",
        })
        .then(function (res) {
          that.tableData = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
      
      },
      handleCurrentChange2(val){
        
  const that = this; //加载
that.axios({
          method: "POST",
          url: "crmdata/All5/"+val,
        })
        .then(function (res) {
          that.tableData2 = res.data.data;
        })
        .catch(function (err) {
          console.log(err);
        });
        
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
 
 
</style>