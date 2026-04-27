import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
let loadingRequestCount = 0;
// 初始化loading
let loadingInstance: any;
export const showLoading = (val:any) => {
  if (loadingRequestCount === 0) {
    // 全局实现loading效果，不⽤每个页⾯单独去v-loading
    // loading样式
    loadingInstance = ElLoading.service({
      lock: true,
      text: val,
      background: 'rgba(0, 0, 0, 0.1)'
    });
  }
  loadingRequestCount++;
};
// 隐藏loading的函数，并且记录请求次数 --
export const hideLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) {
    loadingInstance.close();
  }
};