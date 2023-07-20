<template>
  <el-container>
    <el-aside width="200px">
      <MenuForm/>
    </el-aside>
    <el-container>
      <el-header height="60px">
        <HeaderForm/>
      </el-header>
      <el-main>
        <el-form :model="currentUser" class="demo-form-inline">
          <el-row :gutter="100">
            <el-col :span="10">
              <el-image style="height: 150px;width: 150px;border-radius: 50%" :src="currentUser.profilePhoto"/>
              <el-upload
                  class="upload-demo"
                  action="http://localhost:8001/user/uploadProfilePhoto"
                  :headers="{Authorization:$store.getters.TOKEN}"
                  :file-list="profilePhotos"
                  :before-upload="beforeHandler"
                  :on-success="successHandler"
                  :on-error="errorHandler"	
                  :on-remove="removeHandler"
                  :limit="1"
                  :show-file-list="false"	
                  :auto-upload="true">
                <el-button style="margin-top:15px" size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">上传文件且不超过500kb</div>
              </el-upload>
            </el-col>
            <el-col :span="14">
              <el-form-item label="名称" label-width="50px">
                <el-input v-model="currentUser.name"></el-input>
              </el-form-item>
              <el-form-item label="账号" label-width="50px">
                <el-input v-model="currentUser.account" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="50px">
                <el-input v-model="currentUser.email"></el-input>
              </el-form-item>
              <el-form-item label="电话" label-width="50px">
                <el-input v-model="currentUser.phone"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="50px">
                <el-input type="password" v-model="currentUser.password" disabled>
                  <el-button slot="append" type="primary" @click="goToUpdatePassword">修改</el-button>
                </el-input>
              </el-form-item>
              <el-form-item label-width="50px">
                <el-button type="primary" @click="updateUser">保存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>

    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form :model="password" :rules="rules">
        <el-form-item label="原密码" label-width="80px" prop="oldWord">
          <el-input type="password" v-model="password.oldWord"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newWord">
          <el-input type="password" v-model="password.newWord"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="confirmWord">
          <el-input type="password" v-model="password.confirmWord"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible=false">取 消</el-button>
                <el-button type="primary" @click="savePassword">确 定</el-button>
            </span>
    </el-dialog>

  </el-container>
</template>

<script>

import MenuForm from "./MenuForm.vue";
import HeaderForm from "./HeaderForm.vue";

export default {
  name: "UserInformation",
  components: {MenuForm, HeaderForm},
  data() {
    return {
      currentUser: {
        id: this.$route.query.userId,
        account: '',
        name: '',
        phone: '',
        email: '',
        profilePhoto: '',
        password: ''
      },
      profilePhotos: [],
      password: {
        oldWord: "",
        newWord: "",
        confirmWord: ""
      },
      dialogVisible: false,
      action: "",
      rules: {
        oldWord: {required: true, message: "请输入密码", trigger: 'blur'},
        newWord: {required: true, message: "请输入密码", trigger: 'blur'},
        confirmWord: {required: true, message: "请输入密码", trigger: 'blur'}
      }

    }
  },
  created() {
    this.getUserDetail()
  },
  methods: {
    
    beforeHandler(file){
        const imageSize = file.size/1024/1024
        if(imageSize>0.75){
           this.$message.error({
            message:"图片太大超出限制，请重新上传合适的头像",
            center:true
           }) 
           return false;
        }
        return true;
    },

    successHandler(){
      console.log(this.currentUser.profilePhoto);
      console.log("上传成功")
      this.profilePhotos.length;
    },

    errorHandler(error,file,fileList){
      console.log("errorHandler");
      console.log(error);
      console.log(file);
      console.log(fileList);
    },

    removeHandler(file,fileList){
      console.log("removeHandler");
      console.log(file);
      console.log(fileList);

    },

    getUserDetail() {
      this.$axios.get("/user/getUserById", {
        params: {
          id: this.$route.query.userId
        }
      })
          .then(rsp => {
            const data = rsp.data;
            const result = data.data;
            this.currentUser = result;
          })
          .catch(error => {
            this.$message.error({
              message: error.message,
              center: true
            });
          });
    },

    updateUser() {
      this.$axios.post("/user/updateUser", this.currentUser)
          .then(rsp => {
            this.$message.success({
              message: rsp.data.message,
              center: true
            })
          })
          .catch(error => {
            this.$message.error({
              message: error.message,
              center: true
            });
          })
    },

    goToUpdatePassword() {
      this.password.newWord = null;
      this.password.confirmWord = null;
      this.password.oldWord = null;
      this.dialogVisible = true;
    },

    savePassword() {
      if (this.password.oldWord != this.currentUser.password) {
        this.$message.error({
          message: "原密码输入错误",
          center: true
        })
        return;
      }

      if (this.password.newWord != this.password.confirmWord) {
        this.$message.error({
          message: "确认密码和新密码输入不一致",
          center: true
        })
        return;
      }
      this.currentUser.password = this.password.newWord;
      this.dialogVisible = false;
    }

  },
}
</script>

<style scoped>

.demo-form-inline {
  margin-top: 100px;
}

</style>