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
const firstDefect = [23, 23, 32, 23, 24, 20, 22];
const patrolDefect = [23, 23, 23, 23, 23, 23, 23];
const outgoingDefect = [23, 23, 23, 23, 23, 23, 23];
const firstDefectTotal = firstDefect.reduce((a, b) => a + b, 0);
const patrolDefectTotal = patrolDefect.reduce((a, b) => a + b, 0);
const outgoingDefectTotal = outgoingDefect.reduce((a, b) => a + b, 0);
const option = ref({
    tooltip: { trigger: 'item', formatter: '{b}: {d}% ({c}个)' },
    legend: { orient: 'vertical', left: 'left',  textStyle: {
            color: "#ffffff",
            fontSize: 18,
        }, itemWidth: 10, itemHeight: 10 },
    series: [{
        type: 'pie', radius: '45%', center: ['50%', '55%'],
        data: [
            { name: '首检不合格', value: firstDefectTotal, itemStyle: { color: '#ef4444' } },
            { name: '巡检不合格', value: patrolDefectTotal, itemStyle: { color: '#f59e0b' } },
            { name: '出货检不合格', value: outgoingDefectTotal, itemStyle: { color: '#8b5cf6' } }
        ],
        label: { show: true, fontSize: 9, formatter: '{b}' },
        labelLine: { length: 5, length2: 5 }
    }],
    graphic: [{ type: 'text', left: 'center', top: 15, style: { text: `总不合格 ${firstDefectTotal + patrolDefectTotal + outgoingDefectTotal}`, fill: '#334155', fontSize: 10 }, z: 100 }]
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
