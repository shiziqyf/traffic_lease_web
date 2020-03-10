<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 车辆信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <router-link to="/car/map">
                    <el-button type="primary" plain> 打开地图</el-button>
                </router-link>
            </div>


            <el-table :data="cars" border class="table" ref="multipleTable" header-cell-class-name="table-header">

                <el-table-column prop="number" label="编号" align="center"></el-table-column>
                <el-table-column prop="putTimeStr" label="投入市场时间" align="center"></el-table-column>


                <!-- <el-table-column prop="longitude" label="经度" align="center"></el-table-column>
                <el-table-column prop="dimensionality" label="维度" align="center"></el-table-column> -->
                <el-table-column label="车辆位置" align="center">
                    <template slot-scope="scope" >
                    <el-tooltip class="item" effect="dark" :content="adress" placement="top-start">
                        
                            <div @mouseover="getAdress(scope.row)">

                                <div>
                                    <span v-text="'L:' + scope.row.longitude"></span>
                                    <br>
                                    <span v-text="'D:'+ scope.row.dimensionality"></span>
                                </div>

                            </div>
                      
                    </el-tooltip>
                      </template>
                </el-table-column>
                <el-table-column label="二维码" align="center">
                    <template slot-scope="scope">
                        <el-image style="width: 40px; height: 40px" :src="'http://' + scope.row.qrUrl"
                            @click="openUrl('http://' + scope.row.qrUrl)">
                        </el-image>
                    </template>
                </el-table-column>

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

                        <el-button v-if="scope.row.state==0" type="primary" @click="changeState(scope.row)">回收
                        </el-button>
                        <el-button v-if="scope.row.state==1" disabled type="primary">回收</el-button>
                        <el-button v-if="scope.row.state==-2" type="success" @click="changeState(scope.row)">重新投入市场
                        </el-button>
                    </template>

                </el-table-column>

            </el-table>
        </div>
        共<span v-text="total"></span>条数据,<span v-text="num"></span>/<span v-text="maxNum"></span>页
        <div style="text-align: right">
            <template>
                <el-input-number v-model="num" :min="1" :max="maxNum" @change="getCarData" label="分页">
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
                total: 1,
                adress: ''
            };
        },
        created() {
            this.getCarData()

        },


        methods: {

            getCarData() {

                this.getRequest('/car/?pageNum=' + this.num).then(resp => {
                    this.cars = resp.data.list
                    this.num = resp.data.pageNum
                    this.maxNum = resp.data.pages
                    this.total = resp.data.total
                })
            },

            openUrl(url) {
                this.$alert('<image src=' + url + '></image>', '', {
                    dangerouslyUseHTMLString: true

                });
            },
            changeState(car) {
                let state = 0
                if (car.state == 0) {
                    state = -2
                }
                this.postRequest('/car/changeCarState', {
                    'carId': car.id,
                    'state': state
                }).then(resp => {
                    this.getCarData()
                })

            },
            getAdress(local) {
                let url = 'https://restapi.amap.com/v3/geocode/regeo?location=' + local.longitude + ',' + local
                    .dimensionality + '&key=58db38b9aaa81f1b9f1ba0e6e2698629'
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