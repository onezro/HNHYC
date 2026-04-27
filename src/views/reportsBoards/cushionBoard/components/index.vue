<template>
    <div class="w-full h-full">
        <div class="flex flex-col w-full">
            <div class="title">
                <dv-decoration-10 class="dv-dec-10 decoration" :color="['#40a0ffb8']" />
                <dv-decoration-8 class="dv-dec-8 decoration decoration-center" :color="['#40a0ffb8', '#40a0ffb8']" />
                <div class="text decoration-center">
                    <div class="text-white flex items-center">
                        <span style="padding-top: 10px">缓冲垫事业部</span>
                    </div>
                </div>
                <dv-decoration-8 class="dv-dec-8 transform decoration decoration-center"
                    :color="['#40a0ffb8', '#40a0ffb8']" />
                <dv-decoration-10 class="dv-dec-10 transform decoration" :color="['#40a0ffb8']" />

                <div class="text-white flex justify-end timetext" style="font-size: 24px">
                    <span class="pr-5">{{ currentTime }}</span>
                </div>
            </div>
            <div class="pt-2">
                <el-row :gutter="5">
                    <el-col>
                        <dv-border-box-13 class="centerh">
                            <div class="header_title">
                                <div class="flex items-center justify-between">
                                    <div> <i class="fa fa-tasks"></i> 工单检验</div>
                                    <div class="text-[#fff] pr-2">共： {{ tableData.length }}</div>
                                </div>

                            </div>
                            <div>
                                <dv-scroll-board ref="scrollBoard" :config="config" style="height: 290px" />
                            </div>
                        </dv-border-box-13>
                    </el-col>
                </el-row>
            </div>
            <!-- KPI卡片区域：动态数据 + 深色科技感样式 -->
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-title">
                        <i class="fas fa-times-circle" style="color: #ef4444"></i>
                        总不合格数
                    </div>
                    <div class="kpi-value">{{ totalUnqualified }}</div>
                    <div class="kpi-sub">⚠ 不合格总数 (7天合计)</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">
                        <i class="fas fa-chart-simple"></i> 整体合格率
                    </div>
                    <div class="kpi-value">
                        {{ overallPassRate }}<span style="font-size: 1.2rem">%</span>
                    </div>
                    <div class="kpi-sub">
                        📊 合格率 = {{ totalQualified }} / ({{ totalQualified }}+{{
                            totalUnqualified
                        }})
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title"><i class="fas fa-flask"></i> 首检合格率</div>
                    <div class="kpi-value">
                        {{ firstPassRate }}<span style="font-size: 1.2rem">%</span>
                    </div>
                    <div class="kpi-sub">
                        合格 {{ formatNumber(firstQualified) }} / 不合格
                        {{ formatNumber(firstUnqualified) }}
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">
                        <i class="fas fa-people-arrows"></i> 巡检合格率
                    </div>
                    <div class="kpi-value">
                        {{ patrolPassRate }}<span style="font-size: 1.2rem">%</span>
                    </div>
                    <div class="kpi-sub">
                        合格 {{ formatNumber(patrolQualified) }} / 不合格
                        {{ formatNumber(patrolUnqualified) }}
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-title">
                        <i class="fas fa-truck-fast"></i> 出货检合格率
                    </div>
                    <div class="kpi-value">
                        {{ shipPassRate }}<span style="font-size: 1.2rem">%</span>
                    </div>
                    <div class="kpi-sub">
                        合格 {{ formatNumber(shipQualified) }} / 不合格
                        {{ formatNumber(shipUnqualified) }}
                    </div>
                </div>
            </div>
            <div>
                <el-row :gutter="5">
                    <el-col>
                        <dv-border-box-12 class="centerh1">
                            <div class="header_title">
                                <i class="fa fa-tasks"></i> 每日合格趋势
                            </div>
                            <div>
                                <dv-scroll-board ref="scrollBoard2" :config="otherConfig" style="height: 390px" />
                            </div>
                        </dv-border-box-12>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    GetSummaryOfQualityWorkOrdersQuery,
    GetSummaryOfQualityDataWithinSevenDaysQuery,
} from "@/api/reportsBoards/cushuonBoard";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { ref, onMounted, onBeforeUnmount } from "vue";

// ---------- 响应式数据 ----------
const currentTime = ref("");
const dataRefreshInterval = ref<any>(null);

// 表格1配置
const config = ref<{
    header: string[];
    data: string[][];
    headerBGC: string;
    align: string[];
    columnWidth: number[];
    waitTime: number;
    rowNum: number;
    oddRowBGC: string;
    evenRowBGC: string;
    // carousel: string;
}>({
    header: [],
    data: [],
    headerBGC: "",
    oddRowBGC: "#004A66",
    evenRowBGC: "#0A2732",
    waitTime: 3000,
    rowNum: 6,
    columnWidth: [60, 130, 100, 150, 200, 120, 400, 110, 110, 110, 110, 110, 240],
    align: [
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "left",
        "center",
        "center",
        "center",
        "center",
        "center",
        "left",
    ],
    // carousel: 'page'
});
const scrollBoard = ref<any>(null);
const tableData = ref<string[][]>([]);
// 表格2配置（每日合格趋势）
const otherConfig = ref<{
    header: string[];
    data: string[][];
    headerBGC: string;
    align: string[];
    columnWidth: number[];
    rowNum: number;
    oddRowBGC: string;
    evenRowBGC: string;
    waitTime: number;
}>({
    header: [],
    data: [],
    rowNum: 8,
    headerBGC: "",
    oddRowBGC: "#004A66",
    evenRowBGC: "#0A2732",
    waitTime: 3000,
    columnWidth: [250, 150, 150, 150, 150, 150, 150, 150, 150],
    align: [
        "left",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
        "center",
    ],
});
const scrollBoard2 = ref<any>(null);

// KPI 数据
const totalUnqualified = ref(0);
const totalQualified = ref(0);
const overallPassRate = ref("0.00");
const firstQualified = ref(0);
const firstUnqualified = ref(0);
const firstPassRate = ref("0.00");
const patrolQualified = ref(0);
const patrolUnqualified = ref(0);
const patrolPassRate = ref("0.00");
const shipQualified = ref(0);
const shipUnqualified = ref(0);
const shipPassRate = ref("0.00");
const timeInterval = ref<any>(null); // 新增：时间刷新定时器
// ---------- 辅助函数 ----------

// ---------- 辅助函数 ----------
const formatNumber = (num: number) => num.toLocaleString();

// 从接口返回的数组中提取某个 Metric 的总和（遍历所有日期字段）
const getMetricSum = (dataArray: any[], metricName: string): number => {
    const metricItem = dataArray.find((item) => item.Metric === metricName);
    if (!metricItem) return 0;
    const dateKeys = Object.keys(metricItem).filter(
        (key) => key !== "Metric" && key !== "SortOrder",
    );
    let sum = 0;
    for (const key of dateKeys) {
        sum += Number(metricItem[key]) || 0;
    }
    return sum;
};

// 获取每日合格趋势 + 计算 KPI
const getOtherData = () => {
    GetSummaryOfQualityDataWithinSevenDaysQuery({}).then((res: any) => {
        const dataArray = res.content || [];
        if (dataArray.length === 0) return;

        // ========== 1. 计算 KPI（基于聚合数据） ==========
        // 总合格数 & 总不合格数
        const totalQual = getMetricSum(dataArray, "合格总数");
        const totalUnqual = getMetricSum(dataArray, "不合格总数");
        totalQualified.value = totalQual;
        totalUnqualified.value = totalUnqual;
        const totalCheck = totalQual + totalUnqual;
        overallPassRate.value =
            totalCheck > 0 ? ((totalQual / totalCheck) * 100).toFixed(2) : "0.00";

        // 首检
        const firstQual = getMetricSum(dataArray, "首检合格总数");
        const firstUnqual = getMetricSum(dataArray, "首检不合格总数");
        firstQualified.value = firstQual;
        firstUnqualified.value = firstUnqual;
        const firstTotal = firstQual + firstUnqual;
        firstPassRate.value =
            firstTotal > 0 ? ((firstQual / firstTotal) * 100).toFixed(2) : "0.00";

        // 巡检
        const patrolQual = getMetricSum(dataArray, "巡检合格总数");
        const patrolUnqual = getMetricSum(dataArray, "巡检不合格总数");
        patrolQualified.value = patrolQual;
        patrolUnqualified.value = patrolUnqual;
        const patrolTotal = patrolQual + patrolUnqual;
        patrolPassRate.value =
            patrolTotal > 0 ? ((patrolQual / patrolTotal) * 100).toFixed(2) : "0.00";

        // 出货检
        const shipQual = getMetricSum(dataArray, "出货检合格总数");
        const shipUnqual = getMetricSum(dataArray, "出货检不合格总数");
        shipQualified.value = shipQual;
        shipUnqualified.value = shipUnqual;
        const shipTotal = shipQual + shipUnqual;
        shipPassRate.value =
            shipTotal > 0 ? ((shipQual / shipTotal) * 100).toFixed(2) : "0.00";

        // ========== 2. 构建每日合格趋势表格（使用“合格总数”行） ==========
        const qualifiedRow = dataArray.find(
            (item: any) => item.Metric === "合格总数",
        );
        if (qualifiedRow) {
            const dateKeys = Object.keys(qualifiedRow)
                .filter((key) => key !== "Metric" && key !== "SortOrder")
                .sort();
            // 表头
            const headers = dateKeys.map(
                (date) => `<div style="font-size:20px;">${date}</div>`,
            );
            headers.unshift('<div style="font-size:20px;">指标</div>');
            otherConfig.value.header = headers;

            // 数据行（只有合格总数一行）
            const rowData = dateKeys.map(
                (date) =>
                    `<div style="font-size:20px;color:#fff;">${qualifiedRow[date] ?? 0}</div>`,
            );
            otherConfig.value.data = res.content.map((item: any, index: any) => {
                return [
                    `<div style="font-size:20px;color:#fff;">${item.Metric}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[0]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[1]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[2]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[3]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[4]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[5]]}</div>`,
                    `<div style="font-size:20px;color:#fff;">${item[dateKeys[6]]}</div>`,
                ];
            });

            // 动态调整列宽
            otherConfig.value.columnWidth = [
                250,
                ...new Array(dateKeys.length).fill(150),
            ];
            otherConfig.value.align = [
                "left",
                ...new Array(dateKeys.length).fill("center"),
            ];

            if (scrollBoard2.value) {
                scrollBoard2.value.updateRows(otherConfig.value.data);
            }
        }
    });
};
// 获取工单检验数据并更新表格+KPI
const getData = () => {
    GetSummaryOfQualityWorkOrdersQuery({}).then((res: any) => {
        const list = res.content || [];
        // 构建表格数据
        tableData.value = list.map((item: any, index: number) => {
            return [
                `<div style="font-size:16px;color:#fff;">${index + 1}</div>`,
                `<div style="font-size:16px;color:#fff;">${""}</div>`,
                `<div style="font-size:16px;color:#fff;">${""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.WorkCenterName || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.MfgOrderName || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.ProductName || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.Description || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.InspectionType || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.SpecName || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.QualifiedCount ?? 0}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.UnqualifiedCount ?? 0}</div>`,
                `<div style="font-size:16px;color:#fff;">${item.LatestInspector || ""}</div>`,
                `<div style="font-size:16px;color:#fff;">${dayjs(item.LatestInspectionTime).format("YYYY-MM-DD HH:mm:ss") || ""}</div>`,
            ];
        });
        if (scrollBoard.value) {
            scrollBoard.value.updateRows(tableData.value);
        }
    });
};

// 更新时间显示
const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        hour12: false,
    });
};

// 定时刷新（每60秒）
const startAutoRefresh = () => {
    dataRefreshInterval.value = setInterval(() => {
        getData();
        getOtherData();
    }, 60000);
    timeInterval.value = setInterval(() => {
        updateTime();
    }, 1000);
};

onMounted(() => {
    // 初始化表头样式
    config.value.header = [
        '<div style="font-size:18px;width:60px">序号</div>',
        '<div style="font-size:18px;width:130px">订单号</div>',
        '<div style="font-size:18px;width:100px">客户</div>',
        '<div style="font-size:18px;width:150px">生产线</div>',
        '<div style="font-size:18px;width:200px">工单号</div>',
        '<div style="font-size:18px;width:120px">产品编码</div>',
        '<div style="font-size:18px;width:400px">产品名称</div>',
        '<div style="font-size:18px;width:110px">检验类型</div>',
        '<div style="font-size:18px;width:110px">工序</div>',
        '<div style="font-size:18px;width:110px">合格数</div>',
        '<div style="font-size:18px;width:110px">不合格数</div>',
        '<div style="font-size:18px;width:110px">检验人</div>',
        '<div style="font-size:18px;width:240px">检验时间</div>',
    ];
    updateTime();
    getData();
    getOtherData();
    startAutoRefresh();
});

onBeforeUnmount(() => {
    if (dataRefreshInterval.value) {
        clearInterval(dataRefreshInterval.value);
    }
    if (timeInterval.value) {
        // 新增：清除时间定时器
        clearInterval(timeInterval.value);
    }
});
</script>

<style lang="scss" scoped>
/* 原有样式保留（略作调整） */
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 10px 0;
    padding: 15px 20px;
    background: rgba(16, 33, 68, 0.7);
    border-radius: 8px;
    border: 2px solid rgba(64, 160, 255, 0.723);
    box-shadow: 0 0 20px rgba(0, 100, 255, 0.1);
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
}

.info-item {
    background: rgba(16, 33, 68, 0.5);
    padding: 10px 15px;
    border-radius: 6px;
    border-left: 3px solid #40a9ff;
}

.info-value {
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
}

.centerh {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 360px;
    font-size: 22px;
    font-weight: bolder;
    color: #8ac6ff;
    background-color: rgba(16, 33, 68, 0.7);

    .header_title {
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(64, 160, 255);
    }
}

.centerh1 {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 460px;
    font-size: 22px;
    font-weight: bolder;
    color: #8ac6ff;
    background-color: rgba(16, 33, 68, 0.7);

    .header_title {
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(64, 160, 255);
    }
}

.timetext {
    position: absolute;
    top: 38px;
    right: 10px;
}

.title {
    width: 100%;
    height: 60px;
    padding: 10px;
    display: flex;

    .transform {
        transform: rotateY(180deg);
    }

    .text {
        width: 500px;
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .decoration {
        width: calc((100% - 500px) / 4);
    }

    .decoration-center {
        padding-top: 20px;
    }
}

/* ========= KPI卡片 深色科技感样式 ========= */
.kpi-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin: 10px 0;
}

.kpi-card {
    background: rgba(16, 33, 68, 0.65);
    backdrop-filter: blur(4px);
    border-radius: 20px;
    padding: 18px 16px;
    border: 1px solid rgba(64, 160, 255, 0.5);
    border-color: #40a0ff;
    box-shadow:
        0 8px 20px -8px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(64, 160, 255, 0.2) inset;
    transition: all 0.25s ease;
}

.kpi-card:nth-child(1) .kpi-value {
    color: #f39c12;
}

// 总不合格数
.kpi-card:nth-child(2) .kpi-value,
.kpi-card:nth-child(3) .kpi-value,
.kpi-card:nth-child(4) .kpi-value,
.kpi-card:nth-child(5) .kpi-value {
    color: #2ecc71;
}

// 合格率类
.kpi-card:hover {
    transform: translateY(-3px);
    border-color: #40a0ff;
    box-shadow:
        0 12px 28px -10px rgba(0, 120, 255, 0.3),
        0 0 0 1px #40a0ff inset;
    background: rgba(20, 45, 85, 0.75);
}

.kpi-title {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: #8ac6ff;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.kpi-value {
    font-size: 2.4rem;
    font-weight: 800;
    color: #f0f6ff;
    line-height: 1.2;
    margin-bottom: 8px;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.kpi-sub {
    font-size: 20px;
    color: #b0d4ff;
    border-top: 1px solid rgba(64, 160, 255, 0.4);
    margin-top: 8px;
    padding-top: 6px;
}

/* 其他原有样式（保持原样） */
.el-dropdown-link {
    color: #ffffff;
    font-size: 32px;
}

.test-dropdown {
    background: #05162f !important;
    border: 1px solid #4472cb !important;
}

.el-dropdown-menu__item {
    color: #47c4ff !important;
    background: #05162f !important;

    &:hover {
        background-color: #4472cb !important;
        color: #b2dde9 !important;
    }
}

.popper__arrow {
    border-color: #4472cb !important;

    &::after {
        border-top-color: #46bcff !important;
        border-bottom-color: #46bcff !important;
    }
}

.custom-select-wrapper {
    position: relative;
    width: 120px;
}

.custom-select {
    width: 100%;
    font-size: 2rem;
    color: #ffffff;
    background-color: transparent;
    border: none;
    appearance: none;
    cursor: pointer;
}

.custom-select-wrapper::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #fff;
}

.custom-select option {
    background-color: #05162f;
    color: #47c4ff;
}

.material-card {
    background: rgba(9, 39, 77, 0.8);
    border-radius: 8px;
    padding: 10px;
    border: 1px solid rgba(64, 147, 255, 0.2);
}

.material-list li {
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.text-green {
    color: #00ff3c;
}

.text-red {
    color: #ff0019;
}

:deep(.dv-scroll-board) {
    .header {
        background-color: #102144 !important;
        border-bottom: 1px solid #40a0ff;
    }
}
</style>
