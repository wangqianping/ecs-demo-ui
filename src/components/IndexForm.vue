<template>
  <el-container>
    <el-aside width="200px"><menu-form/></el-aside>
    <el-container>
      <el-header height="60px"><header-form/></el-header>
      <el-main>
        <h1>至于画什么暂时还没想好，我写这个东西就是单纯地想掌握一个前端框架并不是想成为一个前端工程师</h1>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import MenuForm from "@/components/MenuForm";
import HeaderForm from "@/components/HeaderForm";

export default {
  name: 'IndexForm',
  components:{MenuForm,HeaderForm}
}
</script>

<style>

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-aside {
  background-color: rgb(48, 65, 86);
  color: white;
  text-align: left;
  line-height: 10px;
  height: 100%;
  position: fixed;
}

</style>
