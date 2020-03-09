<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 管理员信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">


            <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
                <el-form :model="user">
                    <el-form-item label="用户名" label-width="120px">
                        <el-input autocomplete="off" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="120px">
                        <el-input autocomplete="off" v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="身份" label-width="120px">
                        <el-select v-model="user.roleId" placeholder="选择身份">
                            <el-option label="超级管理员" value="1"></el-option>
                            <el-option label="管理员" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAdmin">确 定</el-button>
                </div>
            </el-dialog>

            <div class="handle-box">


                <el-button type="primary" plain @click="dialogFormVisible = true"> 添加管理员</el-button>

            </div>

            <el-table :data="users" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="username" label="用户名" align="center">

                </el-table-column>
                <el-table-column label="密码" align="center">
                    <template slot-scope="scope">
                        <el-button type="info" @click="getUserPassword(scope.row)">点击查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="createTimeStr" label="创建时间" width="180px" align="center"></el-table-column>
                <el-table-column label="身份" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.roleId==1">
                            超级管理员
                        </span>
                        <span v-else>
                            管理员
                        </span>

                    </template>
                </el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0">
                            正常
                        </span>
                        <span v-if="scope.row.state==-1">
                            已停用
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0">
                            <el-button type="danger" @click="changeUserState(scope.row)">停用</el-button>
                        </span>
                        <span v-if="scope.row.state==-1">
                            <el-button type="success" @click="changeUserState(scope.row)">启用</el-button>
                        </span>

                    </template>
                </el-table-column>

            </el-table>
        </div>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                users: [],
                dialogFormVisible: false,
                user:{
                    username:'',
                    password:'',
                    roleId:''
                }

            };
        },
        created() {
            this.getUserData()
        },

        methods: {
            getUserData() {
                this.getRequest('/user?type=admin').then(resp => {
                    this.users = resp.data
                    console.log(this.users[0].password)

                })
            },
            getUserPassword(user) {
                this.getRequest('/user/password/' + user.id).then(resp => {

                    this.$alert(resp.data, '用户密码', {
                        confirmButtonText: '确定',
                        callback: action => {

                        }
                    });


                })
            },
            changeUserState(user) {
                let state = -1
                if (user.state == -1) {
                    state = 0
                }
                this.postRequest('/user/changeState', {
                    'state': state,
                    "userId": user.id
                }).then(resp => {
                    this.getUserData()
                })
            },
            addAdmin() {

                this.postRequest('/user/addAdmin', {
                    'username': this.user.username,
                    'password': this.user.password,
                    'roleId': this.user.roleId
                }).then(resp => {
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.dialogFormVisible = false
                    this.getUserData()
                })
            }


        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>