<template>
    <div>
        <div id="badChart" :style="{ height: barHeight + 'px' }"></div>
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
  const firstQualified = [500, 2034, 8010, 688, 720, 790, 850];
        const patrolQualified = [200, 3434, 34, 23, 40, 45, 50];
        const outgoingQualified = [300, 343, 23, 232, 180, 210, 240];
const option = ref({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['首检合格', '巡检合格', '出货检合格'], left: 'left', itemWidth: 20, itemHeight: 10, textStyle: { fontSize: 9 } },
            xAxis: { type: 'category', data: dateLabels, axisLabel: { fontSize: 9, rotate: 0 } },
            yAxis: { type: 'value', name: '合格数量', nameTextStyle: { fontSize: 9 }, axisLabel: { fontSize: 9 } },
            series: [
                { name: '首检合格', type: 'bar', data: firstQualified, itemStyle: { borderRadius: [4,4,0,0], color: '#3b82f6' }, label: { show: true, position: 'top', fontSize: 8, formatter: (p:any) => p.value > 500 ? p.value : '' } },
                { name: '巡检合格', type: 'bar', data: patrolQualified, itemStyle: { borderRadius: [4,4,0,0], color: '#10b981' }, label: { show: true, position: 'top', fontSize: 8 } },
                { name: '出货检合格', type: 'bar', data: outgoingQualified, itemStyle: { borderRadius: [4,4,0,0], color: '#f59e0b' }, label: { show: true, position: 'top', fontSize: 8 } }
            ],
            grid: { top: 30, bottom: 12, left: 45, right: 20, containLabel: true }
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
    const chartDom = document.getElementById("badChart");
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
