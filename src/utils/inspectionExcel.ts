import * as ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'

// 实际使用时，可根据PictureId、PictureName或PictureFile字段获取真实图片数据
const loadImageAsBase64 = async (pictureId:any, pictureName:any, pictureFile:any) => {
  // 1. 优先使用PictureFile中的Base64数据（如果存在）
  if (pictureFile && typeof pictureFile === 'string' && pictureFile.startsWith('data:image')) {
    return pictureFile
  }
  
  // 2. 如果有图片ID或名称，模拟生成一个测试图片（演示用）
  //    实际项目中应替换为真实请求：如通过PictureId调用后端API获取Base64
  if (pictureId || pictureName) {
    // 模拟异步加载图片（实际开发中可改为真实网络请求）
    return new Promise((resolve) => {
      setTimeout(() => {
        // 生成一个简单的彩色占位图Base64 (100x100 红色带文字)
        const canvas = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 100
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#f0f0f0'
          ctx.fillRect(0, 0, 100, 100)
          ctx.fillStyle = '#ff0000'
          ctx.font = '12px Arial'
          ctx.fillText(pictureName || '图片', 10, 50)
        }
        const base64 = canvas.toDataURL('image/png')
        resolve(base64)
      }, 10)
    })
  }
  
  // 无图片数据
  return null
}

// 构建行数据列表（每个DetailData为一行）
const buildRowsData = (data:any) => {
  const rows = []
  for (const mainItem of data) {
    const {
      ContainerName,
      SN,
      PassRate,
      JudgmentResult,
      Creator,
      DetailData = []
    } = mainItem
    
    for (const detail of DetailData) {
      rows.push({
        // 主表字段
        ContainerName: ContainerName || '',
        SN: SN || '',
        PassRate: PassRate !== null && PassRate !== undefined ? PassRate : '',
        JudgmentResult: JudgmentResult || '',
        Creator: Creator || '',
        // 详情字段
        ProjectName: detail.ProjectName || '',
        MeasurementMethod: detail.MeasurementMethod || '',
        TargetValue: detail.TargetValue || '',
        MaxiMum: detail.MaxiMum || '',
        MiniMum: detail.MiniMum || '',
        ActualValue: detail.ActualValue || '',
        Unit: detail.Unit || '',
        Remark: detail.Remark || '',
        // 图片相关信息
        PictureId: detail.PictureId || '',
        PictureName: detail.PictureName || '',
        PictureFile: detail.PictureFile || null
      })
    }
  }
  return rows
}

// 获取每个行的图片Base64（异步）
const loadAllImages = async (rowsData:any) => {
  const imagePromises = rowsData.map(async (row:any, idx:any) => {
    const base64 = await loadImageAsBase64(row.PictureId, row.PictureName, row.PictureFile)
    return { idx, base64 }
  })
  const results = await Promise.all(imagePromises)
  const imageMap = new Map() // key: 行索引, value: base64
  for (const res of results) {
    if (res.base64) {
      imageMap.set(res.idx, res.base64)
    }
  }
  return imageMap
}

// 自适应列宽
const autoFitColumns = (worksheet:any, dataRows:any, headerRow:any) => {
  const colWidths:any = []
  
  // 初始化列宽（基于表头文字长度）
  worksheet.columns.forEach((col:any, colIdx:any) => {
    let maxLen = col.header ? col.header.toString().length : 0
    colWidths[colIdx] = maxLen
  })
  
  // 遍历数据行更新最大宽度
  dataRows.forEach((row:any) => {
    worksheet.columns.forEach((col:any, colIdx:any) => {
      const key = col.key
      let cellValue = row[key]
      if (cellValue !== undefined && cellValue !== null) {
        const len = cellValue.toString().length
        if (len > colWidths[colIdx]) {
          colWidths[colIdx] = len
        }
      }
    })
  })
  
  // 设置列宽，限制最大宽度30
  worksheet.columns.forEach((col:any, idx:any) => {
    col.width = Math.min(colWidths[idx] + 2, 30)
  })
}

// 合并相同SN的单元格（合并列：批次、SN码、合格率、检验结果、创建人）
const mergeSameSnCells = (worksheet:any, rowsData:any, startRowIndex:any) => {
  if (rowsData.length === 0) return
  
  // 列映射（从1开始）
  const colMap = {
    ContainerName: 1,
    SN: 2,
    PassRate: 3,
    JudgmentResult: 4,
    Creator: 5
  } as const;

  type ColMapKey = keyof typeof colMap;
  
  let currentSN = rowsData[0].SN
  let mergeStartRow = startRowIndex
  
  for (let i = 1; i <= rowsData.length; i++) {
    const isLastRow = i === rowsData.length
    const currentRowSN = isLastRow ? null : rowsData[i].SN
    
    if (isLastRow || currentRowSN !== currentSN) {
      const mergeEndRow = startRowIndex + i - 1
      if (mergeEndRow > mergeStartRow) {
        // 合并多行
        for (const colKey of Object.keys(colMap) as ColMapKey[]) {
          const colIdx = colMap[colKey]
          worksheet.mergeCells(mergeStartRow, colIdx, mergeEndRow, colIdx)
        }
      }
      // 重置
      if (!isLastRow) {
        currentSN = currentRowSN
        mergeStartRow = startRowIndex + i
      }
    }
  }
}

// 插入图片到工作表
const insertImagesToWorksheet = async (worksheet:any, workbook:any, rowsData:any, imageMap:any, startRowIndex:any) => {
  // 图片列索引（第13列，从1开始）
  const IMAGE_COL_INDEX = 13
  
  for (let i = 0; i < rowsData.length; i++) {
    const base64 = imageMap.get(i)
    if (!base64) continue
    
    const rowNumber = startRowIndex + i
    const targetCell = worksheet.getCell(rowNumber, IMAGE_COL_INDEX)
    
    try {
      // 添加图片到工作簿
      const imageId = workbook.addImage({
        base64: base64,
        extension: 'png',
      })
      
      // 计算图片显示尺寸（宽度自适应列宽，高度自动缩放）
      const colWidth = worksheet.getColumn(IMAGE_COL_INDEX).width || 15
      // Excel中列宽单位与像素转换近似值：1个字符宽度约7像素
      const cellWidthPx = colWidth * 7
      let imgWidth = 80  // 默认宽度
      let imgHeight = 80
      
      // 尝试解析图片实际尺寸（简易方式，通过Image对象获取）
      const img = new Image()
      await new Promise<void>((resolve) => {
        img.onload = () => {
          imgWidth = img.width
          imgHeight = img.height
          resolve()
        }
        img.onerror = () => resolve()
        img.src = base64
      })
      
      // 缩放图片以适应单元格（最大宽度不超过列宽，最大高度不超过80像素）
      const maxWidth = cellWidthPx - 4
      const maxHeight = 80
      let finalWidth = imgWidth
      let finalHeight = imgHeight
      if (finalWidth > maxWidth) {
        finalHeight = (finalHeight * maxWidth) / finalWidth
        finalWidth = maxWidth
      }
      if (finalHeight > maxHeight) {
        finalWidth = (finalWidth * maxHeight) / finalHeight
        finalHeight = maxHeight
      }
      
      // 设置行高（单位：磅，1磅≈1.33像素，调整行高容纳图片）
      const rowHeightPoints = Math.max(45, finalHeight * 0.75)
      worksheet.getRow(rowNumber).height = rowHeightPoints
      
      // 将图片锚定到单元格
      worksheet.addImage(imageId, {
        tl: { col: IMAGE_COL_INDEX - 1, row: rowNumber - 1 },
        br: { col: IMAGE_COL_INDEX - 1 + 0.8, row: rowNumber - 1 + 0.6 },
        ext: { width: finalWidth, height: finalHeight }
      })
    } catch (error) {
      console.error(`插入图片失败 (行${rowNumber}):`, error)
    }
  }
}

// 主导出函数
export  const exportToExcelSpipment = async (data:any) => {
  try {
    // 1. 从原始数据构建行数据
    const rowsData = buildRowsData(data)
    if (rowsData.length === 0) {
      alert('没有可导出的数据')
      return
    }
    
    // 2. 加载所有图片（异步，预留处理URL/Base64）
    const imageMap = await loadAllImages(rowsData)
    
    // 3. 创建工作簿和工作表
    const workbook = new ExcelJS.Workbook()
    workbook.creator = '质量检验'
    workbook.created = new Date()
    const worksheet = workbook.addWorksheet('出货检验报告')
    
    // 4. 定义列（顺序与表头完全匹配）
    worksheet.columns = [
      { header: '批次', key: 'ContainerName', width: 15 },
      { header: 'SN码', key: 'SN', width: 18 },
      { header: '合格率', key: 'PassRate', width: 10 },
      { header: '检验结果', key: 'JudgmentResult', width: 12 },
      { header: '创建人', key: 'Creator', width: 12 },
      { header: '项目名称', key: 'ProjectName', width: 15 },
      { header: '测验方法', key: 'MeasurementMethod', width: 12 },
      { header: '目标值', key: 'TargetValue', width: 12 },
      { header: '最大值', key: 'MaxiMum', width: 10 },
      { header: '最小值', key: 'MiniMum', width: 10 },
      { header: '实际值', key: 'ActualValue', width: 12 },
      { header: '单位', key: 'Unit', width: 8 },
      { header: '图片', key: 'Image', width: 15 },
      { header: '备注', key: 'Remark', width: 20 }
    ]
    
    // 5. 设置表头样式
    const headerRow = worksheet.getRow(1)
    headerRow.font = { bold: true, size: 11 }
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    }
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        })
      }
    })
    
    // 6. 添加数据行（除图片列外，先填文本）
    rowsData.forEach(rowData => {
      const row = worksheet.addRow({
        ContainerName: rowData.ContainerName,
        SN: rowData.SN,
        PassRate: rowData.PassRate,
        JudgmentResult: rowData.JudgmentResult,
        Creator: rowData.Creator,
        ProjectName: rowData.ProjectName,
        MeasurementMethod: rowData.MeasurementMethod,
        TargetValue: rowData.TargetValue,
        MaxiMum: rowData.MaxiMum,
        MiniMum: rowData.MiniMum,
        ActualValue: rowData.ActualValue,
        Unit: rowData.Unit,
        Image: '', // 图片列留空，稍后插入图片对象
        Remark: rowData.Remark
      })
      // 设置行样式（垂直居中）
      row.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    })
    
    // 7. 合并相同SN的单元格（从第2行开始）
    if (rowsData.length > 0) {
      mergeSameSnCells(worksheet, rowsData, 2)
    }
    
    // 8. 自适应列宽
    autoFitColumns(worksheet, rowsData, headerRow)
    
    // 9. 插入图片（必须在合并单元格和列宽设置之后）
    await insertImagesToWorksheet(worksheet, workbook, rowsData, imageMap, 2)
    
    // 10. 导出文件
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    saveAs(blob, `出货检验报告_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`)
  } catch (error) {
    console.error('导出失败:', error)
    alert('导出Excel失败，请查看控制台错误')
  } finally {
  }
}