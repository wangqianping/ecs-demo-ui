<template>
  <div id="background">
    <div class="login">
      <el-form :model="user" class="demo-form-inline" label-width="40px">
        <el-form-item class="input-reader-name">
          <el-input v-model="user.account" aria-required="true" placeholder="Please input account"
                    suffix-icon="el-icon-user"/>
        </el-form-item>
        <el-form-item class="input-reader-name">
          <el-input v-model="user.password" aria-required="true" type="password" placeholder="Please input password"
                    suffix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item class="input-reader-name">
          <el-button  type="primary" @click="login">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginForm',
  data() {
    return {
      user: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$axios.post("/auth/login", this.user)
          .then(
              rsp => {
                const data = rsp.data;
                if (data.code == 200) {
                  const userInfo = data.data;
                  this.$store.commit('SET_TOKEN', userInfo.token);
                  this.$store.commit('SET_USER', userInfo)
                  this.$router.push('/index')
                } else {
                  this.$message.error({
                    message: data.message,
                    center: true
                  })
                }
              })
          .catch(
              error => {
                this.$message.error({
                  message: error.message,
                  center: true
                })
              })

    }

  }
}
</script>

<style scoped>

#background {
  background-image: url('../assets/background.jpg');
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.login {
  width: 400px;
  height: 250px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(66, 79, 119, 0.843);
}

.demo-form-inline {
  width: 300px;
  height: 150px;
  position: absolute;
  left: 45%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>