<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10">批量删除
                </el-button>

                <el-input placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <router-link to="/car/map">
                    <el-button type="primary" plain> 显示地图</el-button>
                </router-link>
            </div>


            用户信息
            <el-table :data="users" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="username" label="用户名" align="center">

                </el-table-column>
                <el-table-column prop="phoneNumber" label="电话号码" align="center">

                </el-table-column>
                <el-table-column prop="createTimeStr" label="注册时间" width="180px" align="center"></el-table-column>

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
                            <el-button type="danger" @click="changeUserState(scope.row)">注销</el-button>
                        </span>
                        <span v-if="scope.row.state==-1">
                            <el-button type="success" @click="changeUserState(scope.row)"> 启用</el-button>
                        </span>

                    </template>
                </el-table-column>


            </el-table>

        </div>

        <!-- 编辑弹出框 -->

    </div>
</template>

<script>
    export default {
        name: 'basetable',
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
                this.getRequest('/user').then(resp => {
                    this.users = resp.data
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