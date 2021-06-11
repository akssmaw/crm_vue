<template>
  <div class="login-box">
    <el-form :model="form" :rules="rules" ref="formName">
      <el-form-item label class="login-box-tityle">
        <h3>欢迎登陆</h3>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="onSubmit(form)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs.formName.validate((valid) => {
        const that = this;

        if (valid) {
          console.log(formName.username);
          console.log(formName.password);
          //请求登陆
          that
            .axios({
              method: "POST",
              url: "/user/loginUser",
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                uname: formName.username,
                upassword: formName.password,
              }),
            })
            .then(function (res) {
              console.log(res);

              if (res.data.data == 0) {
                console.log(res);
                       that.$message.error("未查询到账号 或 大小写填写错误");
              } else {
                if (res.data.data.ustate == 1) {
                  that.$message.error("账号被禁用 ");
                } else {
                  window.localStorage.clear();
                  window.localStorage.setItem("uid", res.data.data.uid);
                  window.localStorage.setItem("uname", res.data.data.uname);
                 window.localStorage.setItem("admin", res.data.data.admin);
                  //请求导航条
                  that
                    .axios({
                      method: "POST",
                      url: "/items/All",
                    })
                    .then(function (res) {
                  
                      window.localStorage.setItem("items", JSON.stringify(res.data.data))
               

                  that.$router.push({ path: "/index", name: "index" });

                      
                    });
                  
                }
              }
            })
            .catch(function (err) {
              alert(err);
              that.$message.error("查询出错");
            });
        } else {
          //验证表单
          that.$message.error("表单验证出错");
        }
      });
      /*  if (this.form.username) {
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        })
        this.$router.push({name: 'elmui', params: {username: this.form.username}})
      } else {
        this.$message({
          message: '登陆失败',
          type: 'success'
        })
      }*/
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.login-box {
  width: 300px;
  margin: 150px auto;
  border: 1px solid #e4e7ed;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #dcdfe6;
}
.login-box-tityle {

  text-align: center;
 
}

</style>
