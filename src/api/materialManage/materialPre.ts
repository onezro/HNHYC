import request from "@/request/request24/index";//24
//查询备料单
export function QueryMaterialPreplanInfo(data: any) {
    return request({
        url: "/api/Material/QueryMaterialPreplanInfo",
        method: "post",
        data,
    });
}
//新增，修改
export function MaterialPreplanCreate(data: any) {
    return request({
        url: "/api/Material/MaterialPreplanCreate",
        method: "post",
        data,
    });
}
//删除
export function MaterialPreplanDelete(data: any) {
    return request({
        url: "/api/Material/MaterialPreplanDelete",
        method: "post",
        data,
    });
}
//发布
export function MaterialPreplanPublic(data: any) {
    return request({
        url: "/api/Material/MaterialPreplanPublic",
        method: "post",
        data,
    });
}
//查询工单信息
export function QueryMfgOrderInfo(data: any) {
    return request({
        url: "/api/Material/QueryMfgOrderInfo",
        method: "post",
        data,
    });
}
//查询明细
export function QueryMaterialPreplanDelInfo(data: any) {
    return request({
        url: "/api/Material/QueryMaterialPreplanDelInfo",
        method: "post",
        data,
    });
}
//获取备料单号
export function GetMaterialPreplanNo(data: any) {
    return request({
        url: "/api/Material/GetMaterialPreplanNo",
        method: "post",
        data,
    });
}
//查询工单BOM

export function QueryMfgOrderBOMOrProductBOM(data: any) {
    return request({
        url: "/api/Material/QueryMfgOrderBOMOrProductBOM",
        method: "post",
        data,
    });
}
//打印A4
export function DownloadMaterialPreplanNoReport(data: any) {
    return request({
        url: "/api/Material/DownloadMaterialPreplanNoReport",
        method: "post",
        params:{
            MaterialPreplanNo:data
        }
    });
}

