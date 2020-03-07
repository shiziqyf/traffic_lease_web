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
                leaseId: this.$route.params.id,
                leases: []
            }
        },
        watch: {

        },

        created() {
            this.getCarData()
        },
        methods: {

            getCarData() {
                this.getRequest('/lease/line/' + this.leaseId).then(resp => {
                    this.leases = resp.data
                    this.MapInit() //初始化地图
                })
            },

            MapInit() {

                let path = [];
                let count = -1
                for (var i in this.leases) {
                    path.push(new AMap.LngLat(this.leases[i].longitude, this.leases[i].dimensionality))
                    count = count + 1
                }

                let polyline = new AMap.Polyline({
                    path: path,
                    borderWeight: 2,
                    strokeColor: '#000000',
                    lineJoin: 'round'
                })

                let startIcon = new AMap.Icon({
                    size: new AMap.Size(40, 50), // 图标尺寸
                    image: 'http://localhost:83/start.png', // Icon的图像

                    imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
                });
                let endIcon = new AMap.Icon({
                    size: new AMap.Size(40, 50), // 图标尺寸
                    image: 'http://localhost:83/end.png', // Icon的图像

                    imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
                });

                let startMarker = new AMap.Marker({
                    position: new AMap.LngLat(this.leases[0].longitude, this.leases[0].dimensionality),

                    icon: startIcon
                });
                let endtMarker = new AMap.Marker({
                    position: new AMap.LngLat(this.leases[count].longitude, this.leases[count].dimensionality),

                    icon: endIcon
                });


                let map = new AMap.Map('container', {
                    center: [this.leases[0].longitude, this.leases[0].dimensionality],
                    resizeEnable: true,
                    // mapStyle: 'amap://styles/7b5115b3a847dfd108f18226a216af14',

                    zoom: 15
                })

                map.add(polyline)
                map.add(startMarker)
                if (count > 0) {
                    map.add(endtMarker)
                }


            }
        }
    }
</script>

<style>

</style>