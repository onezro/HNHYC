import request from "@/request/warehouseRequest";
import request1 from "@/request/request24/index";//24


//物料来源
export function getVendorQuery(data: any) {
    return request({
        url: "/api/warehouse/getVendorQuery",
        method: "post",
        data,
    });
}
//物料类型
export function getProductFamilyQuery(data: any) {
    return request({
        url: "/api/warehouse/getProductFamilyQuery",
        method: "post",
        data,
    });
}
//存放位置
export function getWarehouseStorageLocationQuery(data: any) {
    return request({
        url: "/api/warehouse/getWarehouseStorageLocationQuery",
        method: "post",
        data,
    });
}

//原材料
export function GetRawMaterialInventoryQuery(data: any) {
    return request({
        url: "/api/warehouse/GetRawMaterialInventoryQuery",
        method: "post",
        data,
    });
}
//成品入库
export function GetFinishedProductInventoryQuery(data: any) {
    return request({
        url: "/api/warehouse/GetFinishedProductInventoryQuery",
        method: "post",
        data,
    });
}

//物料库存
export function QueryInventoryMaterialInfo(data: any) {
    return request1({
        url: "/api/InventoryBalance/QueryInventoryMaterialInfo",
        method: "post",
        data,
    });
}
export function QueryInventoryProductInfo(data: any) {
    return request1({
        url: "/api/InventoryBalance/QueryInventoryProductInfo",
        method: "post",
        data,
    });
}
//获取打印机
export function InventoryPrinterQuery(data: any) {
    return request1({
        url: "/api/InventoryBalance/InventoryPrinterQuery",
        method: "post",
        data,
    });
}

//物料打印
export function MaterialContainerPrinter(data: any) {
    return request1({
        url: "/api/InventoryBalance/MaterialContainerPrinter",
        method: "post",
        params:data
    });
}
//成品打印
export function ProductContainerPrinter(data: any) {
    return request1({
        url: "/api/InventoryBalance/ProductContainerPrinter",
        method: "post",
         params:data
    });
}