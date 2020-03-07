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

            车辆信息
            <el-table :data="cars" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="number" label="编号" align="center"></el-table-column>
                <el-table-column prop="putTimeStr" label="投入市场时间"></el-table-column>

               
              

                <el-table-column prop="longitude" label="经度"></el-table-column>
                <el-table-column prop="dimensionality" label="维度" align="center"></el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0">未使用</span>
                        <span v-if="scope.row.state==1">正在使用</span>
                        <span v-if="scope.row.state==-1">出故障</span>
                        <span v-if="scope.row.state==-2">已回收</span>
                    </template>

                </el-table-column>
                <el-table-column label="操作" align="center">

                    <el-button type="primary" plain>
                        <router-link to="/map"> 显示地图</router-link>
                    </el-button>
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
                cars: []
            };
        },
        created() {
            this.getCarData()
            
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getCarData() {
                this.getRequest('/car').then(resp => {
                    this.cars = resp.data
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