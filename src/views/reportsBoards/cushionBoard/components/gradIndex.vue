<template>
    <div class="w-full h-full">
        <div class="flex flex-col w-full">
            <div class="title">
                <dv-decoration-10 class="dv-dec-10 decoration" :color="['#40a0ffb8']" />
                <dv-decoration-8 class="dv-dec-8 decoration decoration-center" :color="['#40a0ffb8', '#40a0ffb8']" />
                <div class="text decoration-center">
                    <div class="text-white flex items-center">
                        <span style="padding-top: 18px">缓冲垫-{{ propsPrams.titleType }}组</span>
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
                    <el-col :span="8">
                        <div class="flex flex-col">
                            <div>
                                <dv-border-box-12 class="centerh">
                                    <div class="header_title">
                                        <i class="fa fa-id-card"></i> 今日人员
                                    </div>
                                    <div>
                                        <div class="right-panel">
                                            <div class="personnel-card">
                                                <!-- 应到人数 -->
                                                <div class="personnel-item">
                                                    <h3><i class="fa fa-users"></i> 应到人数</h3>
                                                    <div class="personnel-count">
                                                        <span class="value-yd">{{
                                                            personnelData.YDRS
                                                            }}</span>
                                                    </div>
                                                </div>
                                                <!-- 实到人数 -->
                                                <div class="personnel-item">
                                                    <h3><i class="fa fa-user-check"></i> 实到人数</h3>
                                                    <div class="personnel-count">
                                                        <span class="value-sd">{{
                                                            personnelData.SDRS
                                                            }}</span>
                                                    </div>
                                                </div>
                                                <!-- 请假人数 -->
                                                <div class="personnel-item">
                                                    <h3><i class="fa fa-bed"></i> 请假人数</h3>
                                                    <div class="personnel-count">
                                                        <span class="value-qj">{{
                                                            personnelData.QJRS
                                                            }}</span>
                                                    </div>
                                                </div>
                                                <!-- 总到岗率 -->
                                                <div class="personnel-item">
                                                    <h3><i class="fa fa-chart-line"></i> 总到岗率</h3>
                                                    <div class="personnel-count">
                                                        <span class="value-dgll">{{ personnelData.DGLL }}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </dv-border-box-12>
                            </div>
                            <div>
                                <dv-border-box-12 class="centerh1">
                                    <div class="header_title">
                                        <i class="fa fa-check-circle"></i> 今日生产情况
                                    </div>
                                    <div>
                                        <dv-scroll-board :config="config2" style="height: 580px" ref="scrollBoard2" />
                                    </div>
                                </dv-border-box-12>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <dv-border-box-12 class="centerh3">
                            <div class="header_title">
                                <div class="flex items-center justify-between">
                                    <div> <i class="fa fa-tasks"></i> 今日生产数据</div>
                                    <div class="text-[#fff] pr-2">共：{{ tableData.length }}</div>
                                </div>
                            </div>
                            <div>
                                <dv-scroll-board :config="config" style="height: 940px" ref="scrollBoard" />
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
    GetSummaryOfPersonnelQuery,
    GetSummaryOfDateMoveStdQuery,
    GetSummaryOfSpecMoveStdQuery,
} from "@/api/reportsBoards/cushuonBoard";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { ref, onMounted, onBeforeUnmount } from "vue";

const propsPrams = defineProps(["titleType"]);
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
    rowNum: 15,
    columnWidth: [55, 130, 100, 200, 100, 280, 100, 100, 100, 100],
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
    ],
    // carousel: 'page'
});
const scrollBoard = ref<any>(null);
const timeInterval = ref<any>(null);
const personnel = ref({
    steelPlate: { actual: 0, standard: 0 },
    cushion: { actual: 0, standard: 0 },
    membrane: { actual: 0, standard: 0 },
});
const tableData = ref<string[][]>([]);
const config2 = ref<{
    header: string[];
    data: string[][];
    headerBGC: string;
    align: string[];
    columnWidth: number[];
    waitTime: number;
    rowNum: number;
    oddRowBGC: string;
    evenRowBGC: string;
}>({
    header: [],
    data: [],
    headerBGC: "",
    oddRowBGC: "#004A66",
    evenRowBGC: "#0A2732",
    waitTime: 3000,
    rowNum: 8,
    columnWidth: [55, 85, 90, 90, 110, 110, 110], // 7列宽度
    align: ["left", "left", "left", "center", "center", "center", "center"],
});
const scrollBoard2 = ref<any>(null);
const tableData2 = ref<string[][]>([]);
const personnelData = ref({
    EmployeeGroup: "",
    YDRS: 0,
    SDRS: 0,
    QJRS: 0,
    DGLL: "0",
});
const getStatusColor = (status: string): string => {
    switch (status) {
        case "生产中":
            return "#f39c12"; // 橙色
        case "计划确认":
            return "#3498db"; // 蓝色
        case "已下发":
            return "#2ecc71"; // 绿色
        default:
            return "#ffffff"; // 白色
    }
};
const getPersonnelData = () => {
    GetSummaryOfPersonnelQuery({}).then((res: any) => {
        let data = res.content || {};
        if (propsPrams.titleType) {
            data = data.filter(
                (item: any) =>
                    item.EmployeeGroup &&
                    item.EmployeeGroup.includes(propsPrams.titleType),
            );
        }


        personnelData.value = {
            EmployeeGroup: data[0]?.EmployeeGroup || "",
            YDRS: data[0]?.YDRS ?? 0,
            SDRS: data[0]?.SDRS ?? 0,
            QJRS: data[0]?.QJRS ?? 0,
            DGLL: data[0]?.YDRS > 0 ? ((data[0]?.SDRS / data[0]?.YDRS) * 100).toFixed(0) : "0.00",
        };
    });
};
// 获取工单检验数据并更新表格+KPI
const getData = () => {
    GetSummaryOfDateMoveStdQuery({}).then((res: any) => {
        let list = res.content || [];

        // 根据 propsPrams.titleType 模糊匹配 WorkflowName
        if (propsPrams.titleType) {
            list = list.filter(
                (item: any) =>
                    item.WorkflowName && item.WorkflowName.includes(propsPrams.titleType),
            );
        }

        tableData.value = list.map((item: any, index: number) => {
            return [
                `<div style="font-size:18px;color:#fff;">${index + 1}</div>`,
                `<div style="font-size:18px;color:#fff;">${''}</div>`,
                `<div style="font-size:18px;color:#fff;">${''}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.MFGORDERNAME || ""}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.ProductName || ""}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.ProductDEC || ""}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.WorkflowName || ""}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.Qty ?? 0}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.moveStdQty ?? 0}</div>`,
                `<div style="font-size:18px;color:${getStatusColor(item.OrderStatusName || "")};">${item.OrderStatusName || ""}</div>`,
            ];
        });
        if (scrollBoard.value) {
            scrollBoard.value.updateRows(tableData.value);
        }
    });
};
const getSpecData = () => {
    GetSummaryOfSpecMoveStdQuery({}).then((res: any) => {
        let list = res.content || [];

        // 根据 propsPrams.titleType 模糊匹配 WorkflowName
        if (propsPrams.titleType) {
            list = list.filter(
                (item: any) =>
                    item.SPECNAME && item.SPECNAME.includes(propsPrams.titleType),
            );
        }
        tableData2.value = list.map((item: any, index: number) => {
            return [
                `<div style="font-size:18px;color:#fff;>${index + 1}</div>`,
                `<div style="font-size:18px;color:#fff;>${item.SPECNAME || ""}</div>`,
                `<div style="font-size:18px;color:#fff;">${item.SPECDec || ""}</div>`,
                `<div style="font-size:18px;color:#fff;>${item.moveStdQty ?? 0}</div>`,
                `<div style="font-size:18px;color:#fff;>${item.moveStdQty ?? 0}</div>`,
                `<div style="font-size:18px;color:#fff;>${item.moveStdQty ?? 0}</div>`,
                `<div style="font-size:18px;color:#fff;>${item.NoResultQty ?? 0}</div>`,
            ];
        });
        if (scrollBoard2.value) {
            scrollBoard2.value.updateRows(tableData2.value);
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
        getSpecData();
        getPersonnelData();
    }, 60000);
    timeInterval.value = setInterval(() => {
        updateTime();
    }, 1000);
};

onMounted(() => {
    console.log(propsPrams.titleType);

    // 初始化表头样式
    // 更新表头（8列）
    config.value.header = [
        '<div style="font-size:16px;width:55px">序号</div>',
        '<div style="font-size:16px;width:130px">订单号</div>',
        '<div style="font-size:16px;width:100px">客户</div>',
        '<div style="font-size:16px;width:200px">工单号</div>',
        '<div style="font-size:16px;width:100px">产品编码</div>',
        '<div style="font-size:16px;width:280px">产品名称</div>',
        '<div style="font-size:16px;width:100px">工艺名称</div>',
        '<div style="font-size:16px;width:100px">计划数量</div>',
        '<div style="font-size:16px;width:100px">完成数量</div>',
        '<div style="font-size:16px;width:100px">状态</div>',
    ];
    // config2.value.header = [
    //     '<div style="font-size:18px;width:80px">序号</div>',
    //     '<div style="font-size:18px;width:150px">工序编号</div>',
    //     '<div style="font-size:18px;width:160px">工序名称</div>',
    //     '<div style="font-size:18px;width:120px">完成数量</div>',
    //     '<div style="font-size:18px;width:120px">生成中数量</div>',
    //     '<div style="font-size:18px;width:120px">未开始数量</div>',
    //     '<div style="font-size:18px;width:120px">不合格数量</div>',
    // ];
    config2.value.header = [
        '<div style="font-size:16px;width:50px">序号</div>',
        '<div style="font-size:16px;width:80px">工序编号</div>',
        '<div style="font-size:16px;width:90px">工序名称</div>',
        '<div style="font-size:16px;width:90px">完成数量</div>',
        '<div style="font-size:16px;width:110px">生成中数量</div>',
        '<div style="font-size:16px;width:110px">未开始数量</div>',
        '<div style="font-size:16px;width:110px">不合格数量</div>',
    ];
    updateTime();
    getData();
    getSpecData();
    getPersonnelData();
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
    padding: 8px;
    height: 410px;
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
    padding: 8px;
    height: 590px;
    font-size: 22px;
    font-weight: bolder;
    color: #8ac6ff;
    background-color: rgba(16, 33, 68, 0.7);

    .header_title {
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(64, 160, 255);
    }
}

.centerh3 {
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: 1000px;
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
    padding: 15px;
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

.right-panel {
    display: grid;
    grid-template-rows: auto auto;
    gap: 20px;
    padding-top: 20px;
}

.personnel-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.personnel-item {
    background: linear-gradient(145deg,
            rgba(16, 33, 68, 0.85) 0%,
            rgba(9, 39, 77, 0.7) 100%);
    border-radius: 20px;
    padding: 18px 12px;
    text-align: center;
    border: 1px solid rgba(64, 160, 255, 0.4);
    backdrop-filter: blur(2px);
    transition: all 0.25s ease;
    box-shadow:
        0 6px 14px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);

    &:hover {
        transform: translateY(-4px);
        border-color: #40a0ff;
        box-shadow:
            0 12px 24px -8px rgba(0, 160, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        background: linear-gradient(145deg,
                rgba(20, 45, 85, 0.9),
                rgba(12, 42, 70, 0.8));
    }

    h3 {
        font-size: 22px;
        margin-bottom: 14px;
        color: #b8dcff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-weight: 500;

        i {
            font-size: 24px;
            color: #40a0ff;
            text-shadow: 0 0 3px rgba(64, 160, 255, 0.5);
        }
    }

    .personnel-count {
        font-size: 36px;
        font-weight: 800;
        letter-spacing: 1px;

        span {
            display: inline-block;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        /* 专属颜色 */
        .value-yd {
            color: #42c5f5;
        }

        /* 应到：青蓝色 */
        .value-sd {
            color: #f1c40f;

        }

        /* 实到：翠绿色 */
        .value-qj {
            color: #e67e22;
        }

        /* 请假：橙色 */
        .value-dgll {
            color: #2ecc71;
        }

        /* 到岗率：金黄色 */
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
