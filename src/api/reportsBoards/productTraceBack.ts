import request from "@/request/request23";

export function GetReverseTraceabilityMainQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityMainQuery",
        method: "post",
        data,
    });
}
//物料
export function GetReverseTraceabilityMaterialQuerys(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityMaterialQuerys",
        method: "post",
        data,
    });
}
//制程
export function GetReverseTraceabilityProcessQuerys(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityProcessQuerys",
        method: "post",
        data,
    });
}
//人员
export function GetReverseTraceabilityEmployeeQuerys(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityEmployeeQuerys",
        method: "post",
        data,
    });
}
//设备参数
export function GetReverseTraceabilityResourceQuerys(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityResourceQuerys",
        method: "post",
        data,
    });
}
//设备参数
export function GetReverseTraceabilityResourceDelQuerys(data: any) {
    return request({
        url: "/api/ReportQuery/GetReverseTraceabilityResourceDelQuerys",
        method: "post",
        data,
    });
}
