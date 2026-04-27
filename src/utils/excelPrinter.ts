import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // 必须导入，用于生成表格

/**
 * 核心方法：Excel Base64 直接转PDF（无HTML中转）
 * @param base64 Excel的Base64字符串（可带data:前缀）
 */
export  const excelBase64ToPdfAndPrint = async (excelBase64:any): Promise<void> => {
  try {
    // ========== 1. 替换为你的后端返回的Excel Base64 ==========
    // const excelBase64 = '你的Excel Base64字符串（可带data:application/vnd.ms-excel;base64,前缀）';
    
    // ========== 2. 解码Base64为Excel二进制数据 ==========
    const pureBase64 = excelBase64.includes('base64,') ? excelBase64.split('base64,')[1] : excelBase64;
    const binaryStr = window.atob(pureBase64);
    const arrayBuffer = new ArrayBuffer(binaryStr.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryStr.length; i++) {
      uint8Array[i] = binaryStr.charCodeAt(i);
    }

    // ========== 3. 解析Excel数据（保留原始行列结构） ==========
    const workbook = XLSX.read(uint8Array, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // 将Excel转为二维数组（保留所有单元格数据，解决HTML变形核心）
    const excelData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // 输出二维数组格式，而非对象
      raw: false // 保留原始格式（如数字、日期）
    });

    // ========== 4. 直接生成PDF（基于原始Excel数据） ==========
    // 初始化PDF：A4纵向，单位mm
    const doc = new jsPDF({
      orientation: 'portrait', // portrait纵向/landscape横向
      unit: 'mm',
      format: 'a4'
    });

    // 配置PDF表格（还原Excel样式）
    const tableConfig = {
      head: excelData.length > 0 ? [excelData[0]] : [], // 表头（第一行）
      body: excelData.length > 1 ? excelData.slice(1) : [], // 表体（剩余行）
      startY: 10, // 表格起始Y坐标（边距）
      styles: {
        font: 'notosanssc', // 中文支持（jspdf内置）
        fontSize: 10,
        cellPadding: 5,
        borderColor: '#333',
        borderWidth: 1
      },
      headStyles: {
        fillColor: '#f5f5f5', // 表头背景色
        textColor: '#000',
        fontStyle: 'bold'
      },
      columnStyles: {
        // 自动适配列宽（根据内容），解决列变形
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        // 如需固定列宽，可替换为具体数值：0: { cellWidth: 20 }
      }
    };

    // 生成PDF表格
    (doc as any).autoTable(tableConfig);

    // ========== 5. 触发PDF打印 ==========
    // 方式1：直接打印（部分浏览器需用户手动确认）
    doc.autoPrint();
    doc.output('dataurlnewwindow'); // 打开打印预览窗口

    // 方式2（备选）：生成PDF Blob后打印（兼容性更好）
    // const pdfBlob = doc.output('blob');
    // const pdfUrl = URL.createObjectURL(pdfBlob);
    // const printWindow = window.open(pdfUrl, '_blank');
    // printWindow?.onload = () => {
    //   printWindow.print();
    //   setTimeout(() => {
    //     URL.revokeObjectURL(pdfUrl);
    //     printWindow.close();
    //   }, 1000);
    // };

  } catch (error) {
    console.error('Excel转PDF失败：', error);
    alert('转换失败，请检查Excel格式或重试！');
  }
};

export  const printPDF = (base64String:any) => {
  // 1. 处理可能带前缀的 Base64
  const base64 = base64String.includes('base64,')
    ? base64String.split('base64,')[1]
    : base64String

  // 2. 将 Base64 解码为二进制数据
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/pdf' })

  // 3. 生成对象 URL
  const blobUrl = URL.createObjectURL(blob)

  // 4. 创建隐藏 iframe
  const iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  iframe.style.top = '-9999px'
  iframe.style.left = '-9999px'
  iframe.src = blobUrl

  // 5. 监听加载完成事件
  iframe.onload = () => {
    // 延迟一小段时间确保渲染完成
    setTimeout(() => {
      iframe.contentWindow?.print()
      // 释放对象 URL 并移除 iframe（打印对话框关闭后）
      // 注意：print() 是异步的，不能立即释放，但可以稍后释放
    }, 100)
  }

  // 6. 添加到页面
  document.body.appendChild(iframe)

  // 7. 清理函数（可以在打印后调用，但无法精确知道用户何时关闭打印对话框）
  // 这里提供一个简单的轮询检查，或者直接放弃清理（依赖垃圾回收）
  // 更健壮的方式是监听 iframe 的 afterprint 事件，但兼容性有限
  const cleanup = () => {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe)
    }
    URL.revokeObjectURL(blobUrl)
  }

  // 尝试在打印后清理（非完美方案）
  setTimeout(cleanup, 30000) // 30秒后清理，假设打印已完成
}