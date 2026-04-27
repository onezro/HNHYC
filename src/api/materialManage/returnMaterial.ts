import request from "@/request/request24/index";//24

//查询退料单

export function GetReturnMaterial(data: any) {
    return request({
        url: "/api/Material/GetReturnMaterial",
        method: "post",
        data,
    });
}
//明细

export function GetReturnMaterialNoDel(data: any) {
    return request({
        url: "/api/Material/GetReturnMaterialNoDel",
        method: "post",
        data,
    });
}
//校验批次


export function GetContainerToBOM(data: any) {
    return request({
        url: "/api/Material/GetContainerToBOM",
        method: "post",
        data,
    });
}
//新建
export function ES_ReturnMaterialCreate(data: any) {
    return request({
        url: "/api/Material/ES_ReturnMaterialCreate",
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
export function GetReturnMaterialNo(data: any) {
    return request({
        url: "/api/Material/GetReturnMaterialNo",
        method: "post",
        data,
    });
}

//
export function DownloadReturnMaterialReport(data: any) {
    return request({
        url: "/api/Material/DownloadReturnMaterialReport",
        method: "post",
        params:{
            ReturnMaterialNo:data
        }
    });
}

