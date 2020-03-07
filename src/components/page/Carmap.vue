<template>

    <div class="box">
        <div id="container" style="width:100%; height:640px"></div>
    </div>
</template>

<script>
    import AMap from "AMap"

    export default {
        data() {
            return {
                cars: [],
                map: ''
            }
        },

        created() {
            this.getCarData()
        },
        methods: {

            getCarData() {
                this.getRequest('/car').then(resp => {
                    this.cars = resp.data
                    this.MapInit() //请求到车辆数据后，初始化地图
                })
            },

            MapInit() {

                let markerList = [];

                for (let i in this.cars) {
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(this.cars[i].longitude, this.cars[i].dimensionality),

                    });
                    
                    let content = []
                    content.push('<div>编号：'+this.cars[i].number+'</div>')
                    content.push('<div>投入市场时间：'+this.cars[i].putTimeStr+'</div>')
                    let infoWindow = new AMap.InfoWindow({
                        anchor: 'bottom-left',
                        content: content.join("<br>"),
                    });

                    //监听器。
                    AMap.event.addListener(marker, 'click', function () {
                        infoWindow.open(map, marker.getPosition());
                    });
                    markerList.push(marker)
                }

                let map = new AMap.Map('container', {
                    center: [this.cars[0].longitude, this.cars[0].dimensionality],
                    resizeEnable: true,
                    // mapStyle: 'amap://styles/7b5115b3a847dfd108f18226a216af14',
                   
                    zoom: 8
                })

                map.add(markerList)
                this.map = map


            },

            openMessage() {


                let infoWindow = new AMap.InfoWindow({
                    anchor: 'top-left',
                    content: content.join("<br>"),
                });

                infoWindow.open(this.map, [116.401337, 39.907886])

            }



        }
    }
</script>

<style>

</style>