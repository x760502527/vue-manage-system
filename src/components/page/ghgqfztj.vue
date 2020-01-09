<template>
    <div style="background: #fff;height: 100%">
        <img src="/1.png" alt="" style="margin-top:100px;width:100%">
    </div>
    <!--    <v-chart :options="option"/>-->
</template>

<script>
    export default {
        name: 'ghgqfztj',
        computed: {
            option() {
                return {
                    title: {
                        text: '极坐标双数值轴'
                    },
                    legend: {
                        data: ['line']
                    },
                    polar: {
                        center: ['50%', '54%']
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    angleAxis: {
                        type: 'value',
                        startAngle: 0
                    },
                    radiusAxis: {
                        min: 0
                    },
                    series: [
                        {
                            coordinateSystem: 'polar',
                            name: 'line',
                            type: 'line',
                            showSymbol: false,
                            data: data
                        }
                    ],
                    animationDuration: 2000
                };
            }
        }
    };
</script>

<style scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
