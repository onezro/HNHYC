import request from "@/request/request24/index";//24
//查询
export function GetPackingShipInfoModelQuery(data: any) {
    return request({
        url: "/api/BoxPackingController/GetPackingShipInfoModelQuery",
        method: "post",
        data,
    });
}
//发货
export function PackingShipSend(data: any) {
    return request({
        url: "/api/BoxPackingController/PackingShipSend",
        method: "post",
        data,
    });
}
//打印
export function ReprintPackingShip(data: any) {
    return request({
        url: "/api/BoxPackingController/ReprintPackingShip",
        method: "post",
        data,
    });
}

