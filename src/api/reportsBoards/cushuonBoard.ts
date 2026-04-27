import request from "@/request/request23";
export function GetSummaryOfQualityWorkOrdersQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetSummaryOfQualityWorkOrdersQuery",
        method: "post",
        data,
    });
}
export function GetSummaryOfQualityDataWithinSevenDaysQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetSummaryOfQualityDataWithinSevenDaysQuery",
        method: "post",
        data,
    });
}
//人员
export function GetSummaryOfPersonnelQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetSummaryOfPersonnelQuery",
        method: "post",
        data,
    });
}
//
export function GetSummaryOfDateMoveStdQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetSummaryOfDateMoveStdQuery",
        method: "post",
        data,
    });
}
export function GetSummaryOfSpecMoveStdQuery(data: any) {
    return request({
        url: "/api/ReportQuery/GetSummaryOfSpecMoveStdQuery",
        method: "post",
        data,
    });
}

