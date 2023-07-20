<template>
  <div id="touxiang">
    <el-dropdown>
          <span>
            <el-avatar class="el-dropdown-link"
                       :src="$store.getters.PROFILE_PHOTO"/>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="goInformation">个人信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登入</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'HeaderForm',
  methods: {
    logout() {
      localStorage.removeItem("token")
      this.$store.commit("LogOut")
      this.$router.push("/")
    },
    goInformation() {
      this.$router.push({path: "/userInformation", query: {userId: this.$store.getters.USER_ID}})
    },
  }
}
</script>

<style>

.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px rgb(80, 72, 72) solid;
}

#touxiang {
  float: right;
  padding-top: 10px;
}

.el-dropdown-link {
  background-color: rgba(64, 255, 236, 0.556);
}

</style>