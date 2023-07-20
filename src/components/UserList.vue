<template>
    <el-container>
        <el-aside width="200px"><MenuForm/></el-aside>
        <el-container>
            <el-header height="60px"><HeaderForm/></el-header>
            <el-main>
                <el-row :gutter="10">
                  <el-col :span="24">
                    <el-form :inline="true" :model="queryParam" class="demo-form-inline">
                          <el-form-item label="账号">
                              <el-input v-model="queryParam.account" placeholder="请输入账号"></el-input>
                          </el-form-item>
                          <el-form-item label="名称">
                              <el-input v-model="queryParam.name" placeholder="请输入姓名"></el-input>
                          </el-form-item>
                          <el-form-item>
                              <el-button size="large" type="primary" @click="handleQuery">查询</el-button>
                          </el-form-item>
                          <el-form-item>
                              <el-button size="large" type="primary" @click="handleCreate">创建</el-button>
                          </el-form-item>
                      </el-form>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                        <el-table :data="tableData">
                            <el-table-column
                                prop="account"
                                label="账号"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="电话"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="email"
                                label="邮箱"
                                align="center">
                            </el-table-column>
                            <el-table-column label="操作"  align="center">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDetail(scope.row)">详情</el-button>
                                    <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                  </el-col>
                </el-row>
            </el-main>
        </el-container>


        <el-dialog
            title="用户详情"
            :visible.sync="dialogVisible"
            width="40%">
            <div>
                <el-form :inline="true" :model="currentUser" class="demo-form-inline">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="名称">
                                <el-input v-model="currentUser.name" :disabled="editFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="账号">
                                <el-input v-model="currentUser.account" :disabled="editFlag"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="邮箱">
                                <el-input v-model="currentUser.email" :disabled="editFlag"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话">
                                <el-input v-model="currentUser.phone" :disabled="editFlag"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                 </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit" :disabled="editFlag">确 定</el-button>
            </span>
        </el-dialog>


    </el-container>
</template>

<script>

import MenuForm from "./MenuForm.vue";
import HeaderForm from "./HeaderForm.vue";

 export default {
    name: "UserList",
    components: { MenuForm, HeaderForm },
    inject: ["reload"],
    data(){
        return {
            tableData: [],
            queryParam: {
                account: '',
                name: ''
            }, 
            dialogVisible: false,
            editFlag: false,
            currentUser: {
                id: null,
                account: '',
                name: '',
                phone: '',
                email: ''    
            }
        }    
    },
    created(){
        this.getAllUser()    
    },
    methods: {
        getAllUser() {
            this.$axios.get("/user/listUser",{
                params:{
                    "account": this.queryParam.account,
                    "name": this.queryParam.name
                }
            })
                .then(rsp => {
                const data = rsp.data;
                if (data.code == 200) {
                    const result = data.data;
                    this.tableData = result;
                }
                else {
                    this.$message.error({
                        message: data.message,
                        center: true
                    });
                }
            })
                .catch(error => {
                this.$message.error({
                    message: error.message,
                    center: true
                });
            });
        },
        saveUser(){
            this.$axios.post("/user/saveUser",this.currentUser)
                  .then(rsp =>{
                    this.$message.success({
                        message:rsp.data.message,
                        center:true
                    })
                  })
                  .catch(error =>{
                    this.$message.error({
                    message: error.message,
                    center: true
                });
                  })
        },
        updateUser(){
            this.$axios.post("/user/updateUser",this.currentUser)
                  .then(rsp =>{
                    this.$message.success({
                        message:rsp.data.message,
                        center:true
                    })
                  })
                  .catch(error =>{
                    this.$message.error({
                    message: error.message,
                    center: true
                });
                })
        },
        deleteUser(id){
            this.$axios.delete("/user/deleteUser",{
                params:{id:id}
            })
                  .then(rsp =>{
                    this.$message.success({
                        message:rsp.data.message,
                        center:true
                    })
                  })
                  .catch(error =>{
                    this.$message.error({
                    message: error.message,
                    center: true
                });
                  })
        },
        handleQuery(){
          this.getAllUser();
        },
        handleDetail(row){
          this.currentUser = row;
          this.dialogVisible = true;
          this.editFlag = true;
        },
        handleEdit(row){
          this.currentUser = row;
          this.dialogVisible = true;
          this.editFlag = false;
        },
        handleDelete(id){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.deleteUser(id)
                    this.reload();
                });
            
        },
        handleCreate(){
          this.clearCurrentUser();
          this.dialogVisible = true;
          this.editFlag = false;
        },
        clearCurrentUser(){
            this.currentUser.id = null;
            this.currentUser.name = null;
            this.currentUser.account = null;
            this.currentUser.phone = null;
            this.currentUser.email = null;
        },
        submit(){
            this.dialogVisible = false;
            if(this.currentUser.id == null){
                this.saveUser();
            }else{
                this.updateUser();
            }
            this.reload();
        },
        cancel(){
            this.dialogVisible = false;
            this.reload();
        }

    },
}
</script>

<style>

.el-aside {
  background-color: rgb(48, 65, 86);
  color: white;
  text-align: left;
  line-height: 10px;
  height: 100%;
  position: fixed;
}

.el-main {
    margin-left: 200px;
    line-height: 10px;
}

.demo-form-inline{
    float: left;
}

</style>