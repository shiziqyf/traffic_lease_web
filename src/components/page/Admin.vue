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