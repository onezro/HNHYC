<template>
  <div class="w-full h-full factory-dashboard">
    <div class="flex flex-col h-full content-overlay">
      <!-- 顶部区域 -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 glass-panel-light mb-1 dv-border-box-12-wrap">
          <div class="corner-tl"></div>
          <div class="corner-tr"></div>
          <div class="corner-bl"></div>
          <div class="corner-br"></div>
          <div class="border-box-content">
            <el-row :gutter="5" class="h-full">
              <el-col :span="4">
                <div class="flex justify-center items-center h-full"><span class="text-2xl font-bold ml-1"
                    style="color:#1a3048;">{{ currentTime }}</span></div>
              </el-col>
              <el-col :span="4">
                <div class="flex justify-center items-center h-full"><span class="text-3xl opacity-40"
                    style="color:#94a3b8;"></span></div>
              </el-col>
              <el-col :span="4">
                <div class="flex justify-center items-center h-full"><span class="text-5xl font-bold tracking-wider"
                    style="color:#0b2b4a;">河南环宇昌&nbsp;·</span></div>
              </el-col>
              <el-col :span="4">
                <div class="flex justify-center items-center h-full"><span class="text-5xl font-bold tracking-wider"
                    style="color:#0b2b4a;">西门子MES&nbsp;·</span></div>
              </el-col>
              <el-col :span="4">
                <div class="flex justify-center items-center h-full"><span class="text-5xl font-bold tracking-wider"
                    style="color:#0b2b4a;">数字化中心</span></div>
              </el-col>
              <el-col :span="4">
                <div class="flex justify-center items-center h-full fullscreen-toggle"
                  :title="isFullscreen ? '退出全屏' : '进入全屏'">
                  <span class="text-2xl" style="color:#2c3e50;">{{ isFullscreen ? '🌤 天气' : '🌤 天气' }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="flex-1 glass-panel-light dv-border-box-12-wrap">
          <div class="corner-tl"></div>
          <div class="corner-tr"></div>
          <div class="corner-bl"></div>
          <div class="corner-br"></div>
          <div class="border-box-content">
            <div class="p-2 h-full">
              <el-row :gutter="5" class="h-full">
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">今日产出</div>
                    <div class="metric-row"><span class="metric-value accent" style="color:#0ea5e9;">1,200</span><span
                        class="metric-sub">/ 3,000</span>
                      <div class="progress-wrap"><el-progress :percentage="30" color="#0ea5e9" :stroke-width="24" />
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">工单数</div>
                    <div class="metric-row"><span class="metric-value accent" style="color:#22c55e;">50</span><span
                        class="metric-sub">/ 1000</span>
                      <div class="progress-wrap"><el-progress :percentage="50" color="#22c55e" :stroke-width="24" />
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">OEE</div>
                    <div class="value-light">80%</div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">运行效率</div>
                    <div class="metric-row"><span class="metric-value accent" style="color:#f59e0b;">40</span><span
                        class="metric-sub">/ 60</span>
                      <div class="progress-wrap"><el-progress :percentage="66" color="#f59e0b" :stroke-width="24" />
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">在岗率</div>
                    <div class="metric-row"><span class="metric-value accent" style="color:#3b82f6;">98</span><span
                        class="metric-sub">/ 100</span>
                      <div class="progress-wrap"><el-progress :percentage="98" color="#3b82f6" :stroke-width="24" />
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="indicator-card-light h-full">
                    <div class="label-light">警告数</div>
                    <div class="metric-row"><span class="metric-value accent" style="color:#ef4444;">5</span><span
                        class="metric-sub">/ 10</span>
                      <div class="progress-wrap"><el-progress :percentage="50" color="#ef4444" :stroke-width="24" />
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <!-- 中部视频区 -->
      <div class="flex-[2] mt-1">
        <div class="h-full glass-panel-light dv-border-box-12-wrap">
          <div class="corner-tl"></div>
          <div class="corner-tr"></div>
          <div class="corner-bl"></div>
          <div class="corner-br"></div>
          <div class="border-box-content h-full">
            <div class="h-full">
              <el-row :gutter="5" class="h-full">
                <el-col :span="4">
                  <div class="flex flex-col h-full gap-1">
                    <div class="content-block-light flex-1 flex flex-col">
                      <div class="block-title-light">计划完成率</div>
                      <div class="flex-1 flex flex-col justify-between">
                        <div class="flex items-center gap-2"><span class="label-light"
                            style="min-width:60px;">缓冲部</span><span
                            style="color:#0ea5e9;font-size:20px;font-weight:700;">85</span><span class="metric-sub">/
                            100</span>
                          <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="85"
                              color="#0ea5e9" :stroke-width="16" /></div>
                        </div>
                        <div class="flex items-center gap-2"><span class="label-light"
                            style="min-width:60px;">钢板部</span><span
                            style="color:#22c55e;font-size:20px;font-weight:700;">60</span><span class="metric-sub">/
                            100</span>
                          <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="60"
                              color="#22c55e" :stroke-width="16" /></div>
                        </div>
                        <div class="flex items-center gap-2"><span class="label-light"
                            style="min-width:60px;">载盘部</span><span
                            style="color:#f59e0b;font-size:20px;font-weight:700;">60</span><span class="metric-sub">/
                            100</span>
                          <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="60"
                              color="#f59e0b" :stroke-width="16" /></div>
                        </div>
                        <div class="flex items-center gap-2"><span class="label-light"
                            style="min-width:60px;">膜材部</span><span
                            style="color:#ef4444;font-size:20px;font-weight:700;">95</span><span class="metric-sub">/
                            100</span>
                          <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="95"
                              color="#ef4444" :stroke-width="16" /></div>
                        </div>
                      </div>
                    </div>
                    <div class="content-block-light flex-1 flex flex-col">
                      <div class="block-title-light">订单状态</div>
                      <div class="flex-1 flex items-center justify-center">
                        <div class="scroll-board-container" ref="scrollBoardRef">
                          <table class="scroll-board-table">
                            <thead>
                              <tr>
                                <th v-for="(h, idx) in orderHeader" :key="'h' + idx" v-html="h"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(row, ri) in visibleOrderRows" :key="'r' + ri"
                                :style="{ backgroundColor: ri % 2 === 0 ? orderEvenBg : orderOddBg }">
                                <td v-for="(cell, ci) in row" :key="'c' + ci"
                                  :style="({ textAlign: orderAligns[ci] || 'center' } as import('vue').CSSProperties)">
                                  {{ cell }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="video-placeholder-light h-full">
                    <el-carousel :interval="4000" height="540px" arrow="never" indicator-position="none">
                      <el-carousel-item v-for="i in 9" :key="i">
                        <img :src="`/ppt/${i}.png`" style="width:100%; height:100%; object-fit:contain;" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="video-placeholder-light h-full">
                    <video class="video-full" src="http://192.168.11.14:8022/videoA.mp4" autoplay loop muted playsinline></video>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="flex flex-col h-full gap-1">
                    <div class="content-block-light flex-1 flex flex-col">
                      <div class="block-title-light">设备状态</div>
                      <div class="flex-1 chart-box" ref="deviceStatusChart"></div>
                    </div>
                    <div class="content-block-light flex-1 flex flex-col">
                      <div class="block-title-light">实时警告</div>
                      <table class="mini-table flex-1">
                        <thead>
                          <tr>
                            <th>设备编号</th>
                            <th>名称</th>
                            <th>状态</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>121</td>
                            <td>1号研磨机</td>
                            <td><span class="status-tag-light warn">⚠ 待保养</span></td>
                          </tr>
                          <tr>
                            <td>122</td>
                            <td>2号研磨机</td>
                            <td><span class="status-tag-light error">🔴 维修中</span></td>
                          </tr>
                          <tr>
                            <td>123</td>
                            <td>3号压合机</td>
                            <td><span class="status-tag-light warn">⚠ 温度预警</span></td>
                          </tr>
                          <tr>
                            <td>124</td>
                            <td>4号切割机</td>
                            <td><span class="status-tag-light warn">⚠ 刀具磨损</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部指标 -->
      <div class="flex-1 glass-panel-light mt-1 dv-border-box-12-wrap">
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>
        <div class="border-box-content h-full">
          <div class="h-full">
            <el-row :gutter="5" class="h-full">
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">📝 工单状态明细</div>
                  <table class="mini-table flex-1">
                    <thead>
                      <tr>
                        <th>部门</th>
                        <th>已完成</th>
                        <th>生产中</th>
                        <th>暂停</th>
                        <th>待处理</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>缓冲垫</td>
                        <td style="color:#00e676;">10</td>
                        <td style="color:#00d4ff;">20</td>
                        <td style="color:#ff9100;">10</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>钢板部</td>
                        <td style="color:#00e676;">10</td>
                        <td style="color:#00d4ff;">20</td>
                        <td style="color:#ff9100;">10</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>载盘部</td>
                        <td style="color:#00e676;">10</td>
                        <td style="color:#00d4ff;">20</td>
                        <td style="color:#ff9100;">10</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>膜材部</td>
                        <td style="color:#00e676;">12</td>
                        <td style="color:#00d4ff;">19</td>
                        <td style="color:#ff9100;">20</td>
                        <td>3</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">📊 质量概况</div>
                  <div class="flex-1 flex flex-col items-center justify-between">
                    <div class="flex items-center gap-2 w-full"><span class="label-light"
                        style="min-width:60px;">缓冲部</span><span
                        style="color:#0ea5e9;font-size:20px;font-weight:700;">85</span><span class="metric-sub">/
                        100</span>
                      <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="85" color="#0ea5e9"
                          :stroke-width="16" /></div>
                    </div>
                    <div class="flex items-center gap-2 w-full"><span class="label-light"
                        style="min-width:60px;">钢板部</span><span
                        style="color:#22c55e;font-size:20px;font-weight:700;">60</span><span class="metric-sub">/
                        100</span>
                      <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="60" color="#22c55e"
                          :stroke-width="16" /></div>
                    </div>
                    <div class="flex items-center gap-2 w-full"><span class="label-light"
                        style="min-width:60px;">载盘部</span><span
                        style="color:#f59e0b;font-size:20px;font-weight:700;">60</span><span class="metric-sub">/
                        100</span>
                      <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="60" color="#f59e0b"
                          :stroke-width="16" /></div>
                    </div>
                    <div class="flex items-center gap-2 w-full"><span class="label-light"
                        style="min-width:60px;">膜材部</span><span
                        style="color:#ef4444;font-size:20px;font-weight:700;">95</span><span class="metric-sub">/
                        100</span>
                      <div class="progress-wrap progress-wrap-h16 flex-1"><el-progress :percentage="95" color="#ef4444"
                          :stroke-width="16" /></div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">不合格概况 (尺寸/外观)</div>
                  <div class="flex-1 chart-box" ref="defectChart"></div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">返工/报废</div>
                  <div class="flex-1 chart-box" ref="reworkChart"></div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">物料预警</div>
                  <table class="mini-table flex-1">
                    <thead>
                      <tr>
                        <th>物料编号</th>
                        <th>名称</th>
                        <th>预警值</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>522.5</td>
                        <td>缓冲垫原料</td>
                        <td style="color:#e67e22;font-weight:700;">100</td>
                        <td><span class="status-tag-light warn">⚠ 预警</span></td>
                      </tr>
                      <tr>
                        <td>522.6</td>
                        <td>钢板原料</td>
                        <td style="color:#c0392b;font-weight:700;">120</td>
                        <td><span class="status-tag-light error">🔴 紧缺</span></td>
                      </tr>
                      <tr>
                        <td>522.7</td>
                        <td>载盘原料</td>
                        <td style="color:#e67e22;font-weight:700;">201</td>
                        <td><span class="status-tag-light warn">⚠ 预警</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="indicator-card-light h-full flex flex-col">
                  <div class="panel-title">7天停机TOP5</div>
                  <div class="flex-1 chart-box" ref="downtimeChart"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, onMounted, onBeforeMount, onBeforeUnmount, nextTick, computed } from "vue";
import * as echarts from 'echarts';
// import { GetSMTValorLine } from "@/api/smtApplyApi";
// import { GetReport_LineCurrentWo } from "@/api/kanbanApi";
// import completion from "./completion.vue";
// import spiPassRate from "./spiPassRate.vue";
// import aoiPassRate from "./aoiPassRate.vue";
// import badPassRate from "./badPassRate.vue";
// import capacityChart from "./capacityChart.vue";
// import throwMChart from "./throwMChart.vue";
// import dayjs from "dayjs";
// import { Refresh } from "@element-plus/icons-vue";

const currentTime = ref('');
const refreshCountdown = ref(60);
const orderList = ref<any[]>([]);
const scrollBoardRef = ref<HTMLElement | null>(null);

let dataRefreshInterval: number | undefined;
let countdownInterval: number | undefined;
let scrollBoardTimer: number | undefined;

// 订单滚动配置（三列：订单号、客户、状态）
const orderHeader = ref([
  '<div style="font-size:14px;color:#334155;font-weight:600;">订单号</div>',
  '<div style="font-size:14px;color:#334155;font-weight:600;">客户</div>',
  '<div style="font-size:14px;color:#334155;font-weight:600;">状态</div>',
]);
const orderAligns = ref(['center', 'center', 'center']);
const orderOddBg = ref('#f8fafc');
const orderEvenBg = ref('#ffffff');
const orderRowNum = 5;

const tableData = ref([
  ['1', '20260423003', '客户A', '90%'],
  ['2', '20260321005', '客户B', '延期'],
  ['3', '20260415001', '客户C', '65%'],
  ['4', '20260410002', '客户D', '100%'],
  ['5', '20260428004', '客户E', '42%'],
  ['6', '20260501010', '客户F', '延期'],
  ['7', '20260502011', '客户G', '88%'],
  ['8', '20260502012', '客户H', '30%'],
  ['9', '20260503013', '客户I', '95%'],
  ['10', '20260503014', '客户J', '延期'],
]);

const scrollOffset = ref(0);
const visibleOrderRows = computed(() => {
  const data = tableData.value;
  if (data.length === 0) return [];
  const rows = [];
  for (let i = 0; i < orderRowNum; i++) {
    const idx = (scrollOffset.value + i) % data.length;
    rows.push(data[idx].slice(1)); // 去掉内部序号
  }
  return rows;
});

const startScrollBoard = () => {
  if (scrollBoardTimer) clearInterval(scrollBoardTimer);
  scrollBoardTimer = window.setInterval(() => {
    scrollOffset.value = (scrollOffset.value + 1) % tableData.value.length;
  }, 3500);
};

const updateTime = () => {
  const now = new Date();
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const w = weekDays[now.getDay()];
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${y}-${m}-${d} ${w} ${hh}:${mm}:${ss}`;
};

const setDataRefreshInterval = () => {
  if (dataRefreshInterval) clearInterval(dataRefreshInterval);
  dataRefreshInterval = window.setInterval(() => {
    // 可在此刷新静态数据，当前为空实现
  }, 60000);
};

const isFullscreen = ref(false);
const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => console.warn(err));
  } else {
    document.exitFullscreen();
  }
};

// ECharts 实例引用
const deviceStatusChart = ref<HTMLElement | null>(null);
const downtimeChart = ref<HTMLElement | null>(null);
const defectChart = ref<HTMLElement | null>(null);
const reworkChart = ref<HTMLElement | null>(null);
let deviceChartInstance: echarts.ECharts | null = null;
let downtimeChartInstance: echarts.ECharts | null = null;
let defectChartInstance: echarts.ECharts | null = null;
let reworkChartInstance: echarts.ECharts | null = null;

function initDeviceChart() {
  if (!deviceStatusChart.value) return;
  if (deviceChartInstance) deviceChartInstance.dispose();
  deviceChartInstance = echarts.init(deviceStatusChart.value);
  deviceChartInstance.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.92)',
      borderColor: '#cbd5e1',
      textStyle: { color: '#1e293b', fontSize: 12 },
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      textStyle: { color: '#334155', fontSize: 10 },
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
          fontSize: 11,
          color: '#fff',
          fontWeight: 700,
        },
        emphasis: { label: { fontSize: 14, fontWeight: 'bold' }, scaleSize: 6 },
        data: [
          { value: 48, name: '运行', itemStyle: { color: '#22c55e' } },
          { value: 22, name: '空闲', itemStyle: { color: '#f59e0b' } },
          { value: 18, name: '保养', itemStyle: { color: '#3b82f6' } },
          { value: 12, name: '维修', itemStyle: { color: '#ef4444' } },
        ],
      },
    ],
  });
}

function initDowntimeChart() {
  if (!downtimeChart.value) return;
  if (downtimeChartInstance) downtimeChartInstance.dispose();
  downtimeChartInstance = echarts.init(downtimeChart.value);
  const categories = ['7号加工中心', '大上胶机', '3号压合机', '5号切割机', '2号传送带'];
  const values = [58, 24, 18, 14, 10];
  const colors = ['#ef4444', '#f59e0b', '#fbbf24', '#f59e0b', '#fbbf24'];
  downtimeChartInstance.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.92)',
      borderColor: '#cbd5e1',
      textStyle: { color: '#1e293b', fontSize: 11 },
    },
    grid: { left: 2, right: 30, top: 5, bottom: 5, containLabel: true },
    xAxis: {
      type: 'value',
      name: 'h',
      nameTextStyle: { color: '#64748b', fontSize: 10 },
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
      axisLabel: { color: '#475569', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: categories,
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#334155', fontSize: 10, width: 70, overflow: 'truncate' },
    },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: colors[i],
            borderRadius: [0, 4, 4, 0],
            shadowBlur: 6,
            shadowColor: 'rgba(0,0,0,0.08)',
          },
        })),
        barWidth: 14,
        label: {
          show: true,
          position: 'right',
          fontSize: 10,
          color: '#1e293b',
          formatter: '{c}h',
          fontWeight: 600,
        },
      },
    ],
  });
}

function initDefectChart() {
  if (!defectChart.value) return;
  if (defectChartInstance) defectChartInstance.dispose();
  defectChartInstance = echarts.init(defectChart.value);
  const depts = ['缓冲部', '钢板部', '载盘部', '膜材部'];
  const sizeData = [80, 60, 60, 95];
  const appearanceData = [100, 100, 100, 100];
  defectChartInstance.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.92)',
      borderColor: '#cbd5e1',
      textStyle: { color: '#1e293b', fontSize: 11 },
    },
    legend: {
      data: ['尺寸不合格', '外观不合格'],
      bottom: 0,
      textStyle: { color: '#334155', fontSize: 10 },
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: { left: 10, right: 10, top: 30, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: depts,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#475569', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '件数',
      nameTextStyle: { color: '#64748b', fontSize: 10 },
      axisLabel: { color: '#475569', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
    },
    series: [
      {
        name: '尺寸不合格',
        type: 'bar',
        data: sizeData,
        itemStyle: { color: '#0ea5e9', borderRadius: [4, 4, 0, 0] },
        barWidth: '35%',
        label: { show: true, position: 'top', fontSize: 10, color: '#0ea5e9', fontWeight: 600 },
      },
      {
        name: '外观不合格',
        type: 'bar',
        data: appearanceData,
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
        barWidth: '35%',
        label: { show: true, position: 'top', fontSize: 10, color: '#f59e0b', fontWeight: 600 },
      },
    ],
  });
}

function initReworkChart() {
  if (!reworkChart.value) return;
  if (reworkChartInstance) reworkChartInstance.dispose();
  reworkChartInstance = echarts.init(reworkChart.value);
  const depts = ['缓冲部', '钢板部', '载盘部', '膜材部'];
  const reworkData = [60, 60, 60, 10];
  const scrapData = [2, 3, 4, 4];
  reworkChartInstance.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.92)',
      borderColor: '#cbd5e1',
      textStyle: { color: '#1e293b', fontSize: 11 },
    },
    legend: {
      data: ['返工', '报废'],
      bottom: 0,
      textStyle: { color: '#334155', fontSize: 10 },
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: { left: 10, right: 10, top: 30, bottom: 30, containLabel: true },
    xAxis: {
      type: 'category',
      data: depts,
      axisLine: { lineStyle: { color: '#cbd5e1' } },
      axisLabel: { color: '#475569', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      name: '件数',
      nameTextStyle: { color: '#64748b', fontSize: 10 },
      axisLabel: { color: '#475569', fontSize: 10 },
      splitLine: { lineStyle: { color: '#e2e8f0', type: 'dashed' } },
    },
    series: [
      {
        name: '返工',
        type: 'bar',
        data: reworkData,
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
        barWidth: '35%',
        label: { show: true, position: 'top', fontSize: 10, color: '#f59e0b', fontWeight: 600 },
      },
      {
        name: '报废',
        type: 'bar',
        data: scrapData,
        itemStyle: { color: '#ef4444', borderRadius: [4, 4, 0, 0] },
        barWidth: '35%',
        label: { show: true, position: 'top', fontSize: 10, color: '#ef4444', fontWeight: 600 },
      },
    ],
  });
}

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
  setDataRefreshInterval();
  startScrollBoard();

  countdownInterval = window.setInterval(() => {
    refreshCountdown.value -= 1;
    if (refreshCountdown.value <= 0) refreshCountdown.value = 60;
  }, 1000);

  document.addEventListener('fullscreenchange', onFullscreenChange);
  isFullscreen.value = !!document.fullscreenElement;

  nextTick(() => {
    initDeviceChart();
    initDowntimeChart();
    initDefectChart();
    initReworkChart();
  });
});

onBeforeUnmount(() => {
  if (dataRefreshInterval) clearInterval(dataRefreshInterval);
  if (countdownInterval) clearInterval(countdownInterval);
  if (scrollBoardTimer) clearInterval(scrollBoardTimer);
  document.removeEventListener('fullscreenchange', onFullscreenChange);
  deviceChartInstance?.dispose();
  downtimeChartInstance?.dispose();
  defectChartInstance?.dispose();
  reworkChartInstance?.dispose();
});
</script>

<style lang="scss" scoped>
/* ========== 全局容器与遮罩 ========== */
.factory-dashboard {
  background: transparent;
  color: #1e293b;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  width: 100%;
  height: 100%;
}

.content-overlay {
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.glass-panel-light {
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.dv-border-box-12-wrap {
  position: relative;
  border-radius: 12px;
  background: transparent;
  overflow: hidden;

  .border-box-content {
    position: relative;
    z-index: 1;
    background: transparent;
    height: 100%;
    border-radius: 12px;
  }

  .corner-tl,
  .corner-tr,
  .corner-bl,
  .corner-br {
    position: absolute;
    width: 14px;
    height: 14px;
    z-index: 3;
    pointer-events: none;
  }

  .corner-tl {
    top: 4px;
    left: 4px;
    border-top: 2px solid rgba(100, 160, 200, 0.7);
    border-left: 2px solid rgba(100, 160, 200, 0.7);
  }

  .corner-tr {
    top: 4px;
    right: 4px;
    border-top: 2px solid rgba(100, 160, 200, 0.7);
    border-right: 2px solid rgba(100, 160, 200, 0.7);
  }

  .corner-bl {
    bottom: 4px;
    left: 4px;
    border-bottom: 2px solid rgba(100, 160, 200, 0.7);
    border-left: 2px solid rgba(100, 160, 200, 0.7);
  }

  .corner-br {
    bottom: 4px;
    right: 4px;
    border-bottom: 2px solid rgba(100, 160, 200, 0.7);
    border-right: 2px solid rgba(100, 160, 200, 0.7);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    border: 1px solid rgba(180, 200, 220, 0.5);
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 10px;
    border: 1px solid rgba(180, 200, 220, 0.3);
    pointer-events: none;
    z-index: 2;
  }
}

.indicator-card-light {
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.label-light {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: 1px;
}

.value-light {
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
}

.metric-value {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
}

.accent {
  font-size: 24px;
  text-shadow: none;
}

.metric-sub {
  font-size: 18px;
  color: #606266;
}

.metric-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;

  .progress-wrap {
    width: 100%;
    margin-top: 4px;
  }
}

.progress-wrap :deep(.el-progress-bar__outer) {
  background: rgba(0, 0, 0, 0.06) !important;
  border-radius: 10px;
  height: 24px !important;
}

.progress-wrap-h16 :deep(.el-progress-bar__outer) {
  height: 16px !important;
  border-radius: 8px;
}

.content-block-light {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  padding: 5px 12px;
  border: 1px solid rgba(203, 213, 225, 0.6);
}

.block-title-light {
  font-size: 16px;
  color: #334155;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 6px;
  font-weight: 600;
}

.block-body-light {
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
  color: #0f172a;
}

.video-placeholder-light {
  background: rgba(255, 255, 255, 0.2);
  border: 2px dashed #94a3b8;
  border-radius: 10px;
  color: #475569;
  font-size: 24px;
  overflow: hidden;
}

.video-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.scroll-board-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  border-radius: 8px;
}

.scroll-board-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background: rgba(255, 255, 255, 0.15);

  th,
  td {
    padding: 8px 6px;
    font-size: 13px;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
    word-break: break-word;
    line-height: 1.4;
  }

  th {
    font-weight: 600;
    text-align: center;
    background: rgba(240, 244, 248, 0.95);
    border-bottom: 2px solid #cbd5e1;
    color: #1e293b;
    letter-spacing: 0.5px;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 40%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 25%;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 35%;
  }
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 6px;

  th {
    background: rgba(240, 244, 248, 0.8);
    padding: 7px 5px;
    font-weight: 600;
    color: #1e293b;
    border-bottom: 2px solid #cbd5e1;
    text-align: center;
  }

  td {
    padding: 6px 5px;
    text-align: center;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
  }
}

.status-tag-light {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;

  &.warn {
    background: #fff3e0;
    color: #e67e22;
    border: 1px solid #f0c07a;
  }

  &.error {
    background: #fdecea;
    color: #c0392b;
    border: 1px solid #f5b7b1;
  }
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 6px;
}

.chart-box {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.fullscreen-toggle {
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.05);
    text-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
  }
}
</style>