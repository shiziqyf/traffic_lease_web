<template>

    <div class="box">
        <div id="container" style="width:100%; height:700px"></div>
    </div>
</template>

<script>
    import AMap from "AMap"

    export default {
        data() {
            return {
                cars: []
            }
        },
        watch: {
            cars() {
                this.MapInit() //请求到车辆数据后，初始化地图
            }
        },
        mounted() {
            this.MapInit()
        },
        created() {
            this.getCarData()
        },
        methods: {

            getCarData() {
                this.getRequest('/car').then(resp => {
                    this.cars = resp.data
                })
            },

            MapInit() {

                var markerList = [];
                console.log(this.cars)
                for (var i in this.cars) {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(this.cars[i].longitude, this.cars[i].dimensionality), 
                        
                    });
                    markerList.push(marker)
                }

                let map = new AMap.Map('container', {
                    center: [this.cars[0].longitude, this.cars[0].dimensionality],
                    resizeEnable: true,
                    mapStyle: 'amap://styles/7b5115b3a847dfd108f18226a216af14',
                    zoom: 10
                })

                map.add(markerList)

            }
        }
    }
</script>

<style>

</style>