<template>
    <div>
        <div id="todayChart" :style="{ height: barHeight + 'px' }"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import dayjs from "dayjs";
import {
    ref,
    reactive,
    watch,
    computed,
    nextTick,
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
} from "vue";
const dateLabels = ['03-26', '03-27', '03-28', '03-29', '03-30', '03-31', '04-01'];
const totalQualified = [1000, 2000, 800, 676, 750, 820, 910];
const totalDefect = [24, 34, 10, 12, 15, 13, 11];
const option = ref({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['合格总数', '不合格总数'], left: 'left', itemWidth: 25, itemHeight: 10, textStyle: {
            color: "#ffffff",
            fontSize: 18,
        }},
    xAxis: { type: 'category', data: dateLabels, axisLabel: {  color: "#ffffff",
            fontSize: 18, } },
    yAxis: [{ type: 'value', name: '合格', nameTextStyle: { fontSize: 9 }, axisLabel: {   color: "#ffffff",
            fontSize: 18, }, splitLine: { lineStyle: { type: 'dashed' } } },
    { type: 'value', name: '不合格', nameTextStyle: { fontSize: 9 }, axisLabel: {   color: "#ffffff",
            fontSize: 18, }, min: 0 }],
    series: [
        { name: '合格总数', type: 'line', smooth: true, data: totalQualified, symbol: 'circle', symbolSize: 6, lineStyle: { width: 2, color: '#3b82f6' }, areaStyle: { opacity: 0.1 } },
        { name: '不合格总数', type: 'bar', yAxisIndex: 1, data: totalDefect, barWidth: '30%', itemStyle: { borderRadius: [4, 4, 0, 0], color: '#f97316' }, label: { show: true, position: 'top', fontSize: 9 } }
    ],
    grid: { top: 30, bottom: 10, left: 40, right: 40, containLabel: true }
})
const timer = ref<any>(null)
const barHeight = ref(300)
const chart = ref()
const refreshing = ref(false)

onMounted(() => {
    initChart();
    startRefreshing();
})
const initChart = () => {
    const chartDom = document.getElementById("todayChart");
    chart.value = echarts.init(chartDom);
    chart.value.setOption(option.value);
    // myChart.resize();
}
const getData = () => {

}
const startRefreshing = () => {
    stopRefreshing(); // 确保只有一个定时器运行
    refreshing.value = true;
    timer.value = setInterval(() => {
        getData();
    }, 60000);
}
const stopRefreshing = () => {
    if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
    }
    refreshing.value = false;
}

</script>

<style lang="scss" scoped></style>
