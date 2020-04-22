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
                <router-link to="/lease/leaseChart">
                    <el-button type="primary" plain> 统计分析</el-button>
                </router-link>
            </div>

            <!-- 弹窗 -->

            <el-dialog title="车辆信息" :visible.sync="showCar">

                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form>
                                <el-form-item label="车辆编号：" label-width="120px">
                                    <el-input :disabled="true" v-text="car.number" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="投入市场时间：" label-width="120px">
                                    <el-input :disabled="true" v-text="car.putTimeStr" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="经度：" label-width="120px">
                                    <el-input :disabled="true" v-text="car.longitude" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="维度：" label-width="120px">
                                    <el-input :disabled="true" v-text="car.dimensionality" autocomplete="off">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="状态：" label-width="120px">
                                    <el-input :disabled="true" v-text="car.state" autocomplete="off">

                                    </el-input>
                                </el-form-item>

                            </el-form>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg--light">

                            <img :src="'http://' + car.qrUrl" />

                        </div>
                    </el-col>
                </el-row>


            </el-dialog>



            <el-table :data="leases" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column label="车辆编号" align="center" width="160px">
                    <template slot-scope="scope">
                        <el-link :underline="false" v-text="scope.row.carNumber" @click="openCar(scope.row.carId)">
                        </el-link>
                    </template>
                </el-table-column>



                <el-table-column label="用户名" align="center">
                    <template slot-scope="scope">

                        <el-link :underline="false" v-text="scope.row.username" @click="openUser"></el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="statTimeStr" label="租用时间" width="160px" align="center"></el-table-column>
                <el-table-column label="租用位置" align="center" width="200px">
                    <template slot-scope="scope">

                        <el-tooltip class="item" effect="dark" :content="adress" placement="top-start">
                            <div @mouseover="getAdress(scope.row.startLongitude, scope.row.startDimensionality)">
                               
                                <div>
                                    <span v-text="'L:' + scope.row.startLongitude"></span>
                                    <br>
                                    <span v-text="'D:'+ scope.row.startDimensionality"></span>
                                </div>

                             
                            </div>
                        </el-tooltip>

                    </template>

                </el-table-column>

                <el-table-column label="结束时间" width="160px" align="center">
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
                                <div @mouseover="getAdress(scope.row.endLongitude, scope.row.endDimensionality)">
                                    <div>
                                    <span v-text="'L:' + scope.row.endLongitude"></span>
                                    <br>
                                    <span v-text="'D:'+ scope.row.endDimensionality"></span>
                                </div>
                                </div>
                            </el-tooltip>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>

                </el-table-column>

                <el-table-column prop="durationTime" label="时长"  align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.durationTime">
                            <span v-text="scope.row.durationTime + '分钟'"></span>
                        </div>
                        <div v-else>暂无数据</div>
                    </template>
                </el-table-column>

                <el-table-column label="费用" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.expense">
                            <span v-text="scope.row.expense + '元'"></span>
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

                <el-table-column label="操作" align="center" fixed="right">

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
                this.getRequest('car/info/' + carId).then(resp => {
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

            getAdress(longitude, dimensionality) {
                let url = 'https://restapi.amap.com/v3/geocode/regeo?location=' + longitude + ',' + dimensionality + '&key=58db38b9aaa81f1b9f1ba0e6e2698629'
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