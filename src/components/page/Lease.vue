<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 租赁信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <router-link to="/car/map">
                    <el-button type="primary" plain> 统计分析</el-button>
                </router-link>
            </div>

            <!-- 弹窗 -->

            <el-dialog title="车辆信息" :visible.sync="showCar">
                <el-form>
                    <el-form-item label="车辆编号：" label-width="120px">
                        <el-input :disabled="true" v-text="car.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="投入市场时间：" label-width="120px">
                        <el-input :disabled="true" v-text="car.putTimeStr" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="经度：" label-width="120px">
                        <el-input :disabled="true" v-text="car.longitude" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="维度：" label-width="120px">
                        <el-input :disabled="true" v-text="car.dimensionality" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" label-width="120px">
                        <el-input :disabled="true" v-text="car.state" autocomplete="off">

                        </el-input>
                    </el-form-item>

                </el-form>
            </el-dialog>



            <el-table :data="leases" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column label="车辆编号" align="center">
                    <template slot-scope="scope">
                        <el-link :underline="false" v-text="scope.row.carNumber" @click="openCar(scope.row.carId)"></el-link>
                    </template>
                </el-table-column>



                <el-table-column label="用户名" align="center">
                    <template slot-scope="scope">

                        <el-link :underline="false" v-text="scope.row.username" @click="openUser"></el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="statTimeStr" label="租用时间" width="180px" align="center"></el-table-column>
                <el-table-column label="租用位置" align="center" width="200px">
                    <template slot-scope="scope">

                        <el-tooltip class="item" effect="dark" :content="adress" placement="top-start">
                            <div @mouseover="getAdress(scope.row)">
                                <el-button v-text="scope.row.startLongitude+' || '+scope.row.startDimensionality">
                                </el-button>
                            </div>
                        </el-tooltip>

                    </template>

                </el-table-column>

                <el-table-column label="结束时间" width="180px" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.endTimeStr">
                            <span v-text="scope.row.endTimeStr"></span>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>
                </el-table-column>
                <el-table-column label="结束位置" align="center" width="200px">

                    <template slot-scope="scope">
                        <div v-if="scope.row.endLongitude">
                            <el-tooltip class="item" effect="dark" :content="adress" placement="top-start">
                                <div @mouseover="getAdress(scope.row)">
                                    <el-button v-text="scope.row.endLongitude+' || '+scope.row.endDimensionality">
                                    </el-button>
                                </div>
                            </el-tooltip>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>

                </el-table-column>

                <el-table-column prop="durationTime" label="时长" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.durationTime">
                            <span v-text="durationTime"></span>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>
                </el-table-column>

                <el-table-column label="费用" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.expense">
                            <span v-text="expense"></span>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==0">
                            租用中
                        </span>
                        <span v-if="scope.row.state==1">
                            已付钱
                        </span>
                        <span v-if="scope.row.state==-1">
                            未付钱
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">

                    <template slot-scope="scope">


                        <router-link :to="'/lease/line/' +scope.row.id">查看路线
                            
                        </router-link>


                    </template>

                </el-table-column>


            </el-table>

        </div>

        共<span v-text="total"></span>条数据,<span v-text="num"></span>/<span v-text="maxNum"></span>页
        <div style="text-align: right">
            <template>
                <el-input-number v-model="num" :min="1" :max="maxNum" @change="getLeaseData" label="分页">
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
                leases: [],
                showCar: false,
                car: [],
                adress: '',
                num: 1,
                maxNum: 1,
                total: 1
            };
        },
        created() {
            this.getLeaseData()
        },


        methods: {
            getLeaseData() {
                this.getRequest('/lease?pageNum=' + this.num).then(resp => {
                    this.leases = resp.data.list
                    this.num = resp.data.pageNum
                    this.maxNum = resp.data.pages
                    this.total = resp.data.total
                })
            },
            openCar(carId) {
                this.showCar = true
                this.getRequest('car/info/'+carId).then(resp => {
                    var result = resp.data
                    if (result.state == 0) {
                        result.state = '未使用'
                    }
                    if (result.state == 1) {
                        result.state = '正在使用'
                    }
                    if (result.state == -1) {
                        result.state = '出故障'
                    }
                    if (result.state == -2) {
                        result.state = '已回收'
                    }
                    this.car = result
                })
            },
            openUser() {

            },

            getAdress(local) {
                let url = 'https://restapi.amap.com/v3/geocode/regeo?location=' + local.startLongitude + ',' + local
                    .startDimensionality + '&key=58db38b9aaa81f1b9f1ba0e6e2698629'
                this.getRequest(
                    url
                ).then(resp => {
                    let adress = resp.data.regeocode.formatted_address
                    if (adress == '') {
                        adress = '暂无位置信息'
                    }
                    this.adress = adress

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