import request from "@/request/packageRequest";
//查询事业部
export function ShipmentInspectionWorkCenterQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionWorkCenterQuery",
        method: "post",
        data,
    });
}
//查询工单
export function ShipmentInspectionMfgOrderQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionMfgOrderQuery",
        method: "post",
        data,
    });
}
//查询主数据
export function ShipmentInspectionQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionQuery",
        method: "post",
        data,
    });
}
//查询明细
export function ShipmentInspectionContainerSNQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionContainerSNQuery",
        method: "post",
        data,
    });
}
//出货添加批次
export function ShipmentInspectionContainerSNAdd(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionContainerSNAdd",
        method: "post",
        data,
    });
}
//创建 保存  提交 
export function ShipmentInspectionExecute(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionExecute",
        method: "post",
        data,
    });
}


export function LabelPrintDownloadFtpServer(data: any) {
    return request({
        url: "/api/ShipmentInspection/LabelPrintDownloadFtpServer",
        method: "post",
        params:{
            PictureId:data
        }
    });
}


export function ShipmentInspectionOrganizationQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionOrganizationQuery",
        method: "post",
        data
    });
}
export function ShipmentInspectionEmployeeQuery(data: any) {
    return request({
        url: "/api/ShipmentInspection/ShipmentInspectionEmployeeQuery",
        method: "post",
        data
    });
}