<template>
    <div>

        <el-col :span="24">
            <!-- <el-card>
                <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
            </el-card> -->
        </el-col>
        <el-col :span="24">
            <el-card>
                <schart ref="line" class="schart" canvasId="line" :options="timeDate"></schart>
            </el-card>
        </el-col>

    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        created() {
            this.getTimeData()
        },
        data() {
            return {
                timeDate: {
                    type: 'line',
                    title: {
                        text: '每天中各时间段用户使用车俩数据'
                    },
                    labels: [],
                    datasets: [{
                            label: '次数',
                            data: []
                        },

                    ]
                }
            }
        },
        methods: {
            getTimeData() {
                this.getRequest('/lease/leaseSlice').then(resp => {
                    this.timeDate.labels = resp.data.time
                    this.timeDate.datasets[0].data = resp.data.count

                })
            }
        }

    }
</script>

<style>
    .schart {
        width: 100%;
        height: 300px;
    }
</style>