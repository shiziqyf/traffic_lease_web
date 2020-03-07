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

                <router-link to="/car/map">
                    <el-button type="primary" plain> 显示地图</el-button>
                </router-link>
            </div>

            车辆信息
            <el-table :data="cars" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="number" label="编号" align="center"></el-table-column>
                <el-table-column prop="putTimeStr" label="投入市场时间"></el-table-column>


                <el-table-column prop="longitude" label="经度" align="center"></el-table-column>
                <el-table-column prop="dimensionality" label="维度" align="center"></el-table-column>

                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0">未使用</span>
                        <span v-if="scope.row.state==1">正在使用</span>
                        <!-- <span v-if="scope.row.state==-1">出故障</span> -->
                        <span v-if="scope.row.state==-2">已回收</span>
                    </template>

                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">

                        <el-button v-if="scope.row.state==0" type="primary">回收</el-button>
                        <el-button v-if="scope.row.state==1" disabled type="primary">回收</el-button>
                        <el-button v-if="scope.row.state==-2" type="primary">重新投入市场</el-button>
                    </template>

                </el-table-column>

            </el-table>
        </div>
          共<span v-text="total"></span>条数据,<span v-text="num"></span>/<span v-text="maxNum"></span>页
        <div style="text-align: right">
                <template>
                    <el-input-number v-model="num" :min="1" :max="maxNum" label="描述文字">
                    </el-input-number>
                </template>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                cars: [],
                num: 1,
                maxNum: 1,
                total: 1
            };
        },
        created() {
            this.getCarData()
        },
        watch: {
            num() {
                this.getCarData()
            }
        },
      
        methods: {
            // 获取 easy-mock 的模拟数据
            getCarData() {
                
                this.getRequest('/car/?pageNum='+this.num).then(resp => {
                    this.cars = resp.data.list
                    this.num = resp.data.pageNum
                    this.maxNum = resp.data.pages
                    this.total = resp.data.total
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