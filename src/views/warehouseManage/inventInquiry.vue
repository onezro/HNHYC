<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '0px' }">
            <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-change="tabChange">
                <el-tab-pane :label="$t('inventInquiry.rawMaterialInvent')" name="raw">
                    <el-form ref="formRawRef" :model="getRawForm" :inline="true" size="small" @submit.native.prevent
                        label-width="auto">
                        <el-form-item :label="$t('inventInquiry.ProductName')" class="mb-2" prop="ProductName">
                            <el-input v-model.trim="getRawForm.ProductName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getRawData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ProductDes')" class="mb-2" prop="ProductDec">
                            <el-input v-model.trim="getRawForm.ProductDec" style="width: 180px" placeholder=""
                                @keyup.enter.native="getRawData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_MaterialSpecifications')" class="mb-2"
                            prop="Specifications">
                            <el-input v-model.trim="getRawForm.Specifications" style="width: 180px" placeholder=""
                                @keyup.enter.native="getRawData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ContainerName')" class="mb-2" prop="ContainerName">
                            <el-input v-model.trim="getRawForm.ContainerName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getRawData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_LotNumber')" class="mb-2" prop="LotNumber">
                            <el-input v-model.trim="getRawForm.LotNumber" style="width: 180px" placeholder=""
                                @keyup.enter.native="getRawData" />
                        </el-form-item>
                        <el-form-item class="mb-2">
                            <el-button type="primary" @click="getRawData">{{
                                $t("publicText.query")
                                }}</el-button>
                            <el-button type="" @click="handleRawReset">{{
                                $t("publicText.reset")
                                }}</el-button>
                            <!-- <el-button type="success" size="small" :disabled="tableData.length == 0"
                                @click="exportList">{{ $t("publicText.export") }}</el-button> -->
                        </el-form-item>
                        <el-form-item class="mb-2">
                            <el-select v-model="printIp" placeholder="请选择" style="width: 180px">
                                <el-option v-for="v in printList" :label="v.PrintQueueName" :value="v.IP" />

                            </el-select>

                        </el-form-item>
                        <el-form-item class="mb-2">
                            <el-button type="warning" @click="handlePrintMater"
                                :disabled="printMaterData.length !== 1">{{
                                    $t("publicText.print")
                                }}</el-button></el-form-item>
                    </el-form>
                    <el-table :data="tableData.slice(
                        (pageObj.currentPage - 1) * pageObj.pageSize,
                        pageObj.currentPage * pageObj.pageSize,
                    )
                        " size="small" :style="{ width: '100%' }" ref="rawRef" :height="tableHeight" border fit
                        :row-class-name="tableRowClassName" @selection-change="handleSelectionMaterial">
                        <el-table-column type="selection" width="55" align="center" />
                        <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                            <template #default="scope">
                                <span>{{
                                    scope.$index +
                                    pageObj.pageSize * (pageObj.currentPage - 1) +
                                    1
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ContainerName" fixed :label="$t('inventInquiry.ContainerName')"
                            :min-width="getColumnWidth('ContainerName')" />
                        <el-table-column prop="ProductName" fixed :label="$t('inventInquiry.ProductName')"
                            :min-width="getColumnWidth('ProductName')" />
                        <el-table-column prop="ProductDes" fixed :label="$t('inventInquiry.ProductDes')"
                            :min-width="getColumnWidth('ProductDes')" />
                        <el-table-column prop="ES_MaterialSpecifications"
                            :label="$t('inventInquiry.ES_MaterialSpecifications')"
                            :min-width="getColumnWidth('ES_MaterialSpecifications')" />
                        <el-table-column prop="ES_LotNumber" :label="$t('inventInquiry.ES_LotNumber')"
                            :min-width="getColumnWidth('ES_LotNumber')" />
                        <el-table-column prop="ProductTypeName" :label="$t('inventInquiry.ProductTypeName')"
                            :min-width="getColumnWidth('ProductTypeName')" />
                        <el-table-column prop="Qty" :label="$t('inventInquiry.Qty')"
                            :min-width="getColumnWidth('Qty')" />
                        <el-table-column prop="UOMName" :label="$t('inventInquiry.UOMName')"
                            :min-width="getColumnWidth('UOMName')" />
                        <el-table-column prop="ProductionDate" :label="$t('inventInquiry.ProductionDate')"
                            width="155" />
                        <el-table-column prop="ExpiryDate" :label="$t('inventInquiry.ExpiryDate')" width="155" />
                        <el-table-column prop="ES_ValidTime" :label="$t('inventInquiry.ES_ValidTime')" width="155" />
                        <template #empty>
                            <div class="flex items-center justify-center h-100%">
                                <el-empty />
                            </div>
                        </template>
                    </el-table>
                    <div class="mt-2 flex items-center">
                        <el-pagination :size="'small'" background @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" :pager-count="5" :current-page="pageObj.currentPage"
                            :page-size="pageObj.pageSize" :page-sizes="[30, 50, 100, 200, 300]"
                            layout="total,sizes, prev, pager, next" :total="tableData.length">
                        </el-pagination>
                         <div>总数量：{{ TotalQty1}}</div>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$t('inventInquiry.finishGoodsInvent')" name="finish">
                    <el-form ref="formFinishRef" :model="getFinishForm" :inline="true" size="small"
                        @submit.native.prevent label-width="auto">
                        <el-form-item :label="$t('inventInquiry.ProductName')" class="mb-2" prop="ProductName">
                            <el-input v-model.trim="getFinishForm.ProductName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ProductDes')" class="mb-2" prop="ProductDec">
                            <el-input v-model.trim="getFinishForm.ProductDec" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_MaterialSpecifications')" class="mb-2"
                            prop="Specifications">
                            <el-input v-model.trim="getFinishForm.Specifications" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ContainerName')" class="mb-2" prop="ContainerName">
                            <el-input v-model.trim="getFinishForm.ContainerName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_LotNumber')" class="mb-2" prop="LotNumber">
                            <el-input v-model.trim="getFinishForm.LotNumber" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_SN')" class="mb-2" prop="SNName">
                            <el-input v-model.trim="getFinishForm.SNName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.TJResourceName')" class="mb-2" prop="TJResourceName">
                            <el-input v-model.trim="getFinishForm.TJResourceName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.PJResourceName')" class="mb-2" prop="PJResourceName">
                            <el-input v-model.trim="getFinishForm.PJResourceName" style="width: 180px" placeholder=""
                                @keyup.enter.native="getFinishData" />
                        </el-form-item>
                        <el-form-item :label="$t('inventInquiry.ES_Status')" class="mb-2" prop="ES_Status">
                            <el-select v-model="getFinishForm.ES_Status" placeholder="请选择" style="width: 180px">
                                <el-option :label="$t('inventInquiry.status0')" :value="$t('inventInquiry.status0')" />
                                <el-option :label="$t('inventInquiry.status1')" :value="$t('inventInquiry.status1')" />
                            </el-select></el-form-item>
                        <el-form-item class="mb-2">
                            <el-button type="primary" @click="getFinishData">{{
                                $t("publicText.query")
                                }}</el-button>
                            <el-button type="" @click="handleFinishReset">{{
                                $t("publicText.reset")
                                }}</el-button>
                            <!-- <el-button type="success" size="small" :disabled="tableData2.length == 0"
                                @click="exportFinishList">{{
                                    $t("publicText.export") }}</el-button> -->
                        </el-form-item>
                        <el-form-item class="mb-2">
                            <el-select v-model="printIp" placeholder="请选择" style="width: 180px">
                                <el-option v-for="v in printList" :label="v.PrintQueueName" :value="v.IP" />

                            </el-select>

                        </el-form-item>
                        <el-form-item class="mb-2">
                            <el-button type="warning" @click="handlePrintProduct"
                                :disabled="printProductData.length !== 1">{{
                                    $t("publicText.print")
                                }}</el-button></el-form-item>
                    </el-form>
                    <el-table :data="tableData2.slice(
                        (pageObj2.currentPage - 1) * pageObj2.pageSize,
                        pageObj2.currentPage * pageObj2.pageSize,
                    )
                        " size="small" :style="{ width: '100%' }" ref="finishRef" :height="tableHeight2"
                        :tooltip-effect="'light'" border fit :row-class-name="tableRowClassName"
                        @selection-change="handleSelectionProduct">
                        <el-table-column type="selection" width="55" align="center" />
                        <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                            <template #default="scope">
                                <span>{{
                                    scope.$index +
                                    pageObj2.pageSize * (pageObj2.currentPage - 1) +
                                    1
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ContainerName" fixed :label="$t('inventInquiry.ContainerName')"
                            :min-width="getColumnWidth2('ContainerName')" />
                        <el-table-column prop="ProductName" :label="$t('inventInquiry.ProductName')"
                            :min-width="getColumnWidth2('ProductName')" />
                        <el-table-column prop="ProductDes" fixed :label="$t('inventInquiry.ProductDes')"
                            :min-width="getColumnWidth2('ProductDes')" />
                        <el-table-column prop="ES_MaterialSpecifications"
                            :label="$t('inventInquiry.ES_MaterialSpecifications')"
                            :min-width="getColumnWidth2('ES_MaterialSpecifications')" />
                        <el-table-column prop="ES_LotNumber" :label="$t('inventInquiry.ES_LotNumber')"
                            :min-width="getColumnWidth2('ES_LotNumber')" />
                        <el-table-column prop="ES_SN" :label="$t('inventInquiry.ES_SN')"
                            :min-width="getColumnWidth2('ES_SN')" />
                        <!-- <el-table-column prop="ProductTypeName" :label="$t('inventInquiry.ProductTypeName')"
                            :min-width="getColumnWidth2('ProductTypeName')" /> -->
                        <el-table-column prop="Qty" :label="$t('inventInquiry.Qty1')"
                            :min-width="getColumnWidth2('Qty')" />
                        <el-table-column prop="UOMName" :label="$t('inventInquiry.UOMName')"
                            :min-width="getColumnWidth2('UOMName')" />
                        <el-table-column prop="TJResourceName" :label="$t('inventInquiry.TJResourceName')"
                            :min-width="getColumnWidth2('TJResourceName')" />
                        <el-table-column prop="PJResourceName" :label="$t('inventInquiry.PJResourceName')"
                            :min-width="getColumnWidth2('PJResourceName')" />
                        <el-table-column prop="ProductionDate" :label="$t('inventInquiry.ProductionDate')"
                            width="155" />
                        <el-table-column prop="ExpiryDate" :label="$t('inventInquiry.ExpiryDate')" width="155" />
                        <el-table-column prop="ES_ValidTime" :label="$t('inventInquiry.ES_ValidTime')" width="155" />
                        <el-table-column prop="ES_Status" :label="$t('inventInquiry.ES_Status')" width="100" />
                        <template #empty>
                            <div class="flex items-center justify-center h-100%">
                                <el-empty />
                            </div>
                        </template>
                    </el-table>
                    <div class="mt-2 flex items-center">
                        <el-pagination :size="'small'" background @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2" :pager-count="5" :current-page="pageObj2.currentPage"
                            :page-size="pageObj2.pageSize" :page-sizes="[30, 50, 100, 200, 300]"
                            layout="total,sizes, prev, pager, next" :total="tableData2.length">
                        </el-pagination>
                        <div>总数量：{{ TotalQty2 }}</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import {
    QueryInventoryMaterialInfo,
    QueryInventoryProductInfo,
    InventoryPrinterQuery,
    MaterialContainerPrinter,
    ProductContainerPrinter
} from "@/api/warehouseManage/inventInquiry";
import {
    ref,
    reactive,
    watch,
    computed,
    nextTick,
    onMounted,
    onBeforeMount,
    onBeforeUnmount,
} from "vue";
import { ElNotification, ElMessageBox } from "element-plus";
import {
    calculateColumnsWidth,
    clearTextWidthCache,
} from "@/utils/tableminWidth";
import { exportTableToExcel } from "@/utils/exportExcel";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const formRawRef = ref();
const formFinishRef = ref();
const rawRef = ref();
const finishRef = ref();
const tableHeight = ref(0);
const tableData = ref([]);
const tableHeight2 = ref(0);
const tableData2 = ref([]);
const activeName = ref("raw");

const pageObj = reactive({
    currentPage: 1,
    pageSize: 50,
});
const pageObj2 = reactive({
    currentPage: 1,
    pageSize: 50,
});
const getRawForm = ref({
    SNName: "",
    ProductName: "",
    ProductDec: "",
    Specifications: "",
    ContainerName: "",
    LotNumber: "",
});
const sourceList = ref<any[]>([]);
const typeRawList = ref<any[]>([]);
const posRawList = ref<any[]>([]);
const searchRawDate = ref<any[]>([]);
const getFinishForm = ref({
    SNName: "",
    ProductName: "",
    ProductDec: "",
    Specifications: "",
    ContainerName: "",
    LotNumber: "",
    TJResourceName: "",
    PJResourceName: "",
    ES_Status: ''
});
const searchFinishDate = ref<any[]>([]);
const printList = ref<any[]>([]);
const printIp = ref('')
const printMaterData = ref<any[]>([])
const printProductData = ref<any[]>([])
const TotalQty1=ref(0)
const TotalQty2=ref(0)
onBeforeMount(() => {
    getScreenHeight();
    getPrintData()
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getRawData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
    clearTextWidthCache();
});
const tabChange = (val: any) => {
    // console.log(val);
    if (val == "raw") {
        getRawData();
    } else {
        getFinishData();
    }
};
const getPrintData = () => {
    InventoryPrinterQuery({}).then((res: any) => {
        printList.value = res.content
    })
}
const getRawData = () => {
    QueryInventoryMaterialInfo(getRawForm.value).then((res: any) => {
        TotalQty1.value=res.content[0]?.TotalQty || 0
        tableData.value = res.content.map((v: any) => {
            return {
                ...v,
                ProductionDate: v.ProductionDate == null ? null : dayjs(v.ProductionDate).format("YYYY-MM-DD HH:mm:ss"),
                ExpiryDate: v.ExpiryDate == null ? null : dayjs(v.ExpiryDate).format("YYYY-MM-DD HH:mm:ss"),
            }
        })
    });
};
const tableRowClassName = (val: any) => {
    let row = val.row;
    let today = dayjs().startOf('day');          // 当天开始时间
    let expiryDate = dayjs(row.ExpiryDate).startOf('day');
    let daysDiff = expiryDate.diff(today, 'day'); // 剩余天数（可为负数）

    if (daysDiff <= 0) {
        return "danger-row-invent";   // 红色（已过期或当天到期）
    } else if (daysDiff <= 10) {
        return "warning-row-invent";  // 黄色（剩余 ≤10 天）
    }
    return ""; // 默认无样式
};
const handleRawReset = () => {
    getRawForm.value = {
        SNName: "",
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        ContainerName: "",
        LotNumber: "",
    };
    searchRawDate.value = [];
};
const exportList = () => {
    exportTableToExcel({
        tableRef: rawRef.value,
        fetchAllData: fetchRowAllData,
        fileName: `${t("inventInquiry.rawMaterialInvent")}_${dayjs().format(
            "YYYYMMDDHHmmss",
        )}`,
        styles: {
            headerBgColor: "", // 灰色表头
            headerFont: {
                color: { argb: "" }, // 红色文字
                bold: false,
                size: 12,
            }, // 白色文字
            cell: { numFmt: "@" }, // 强制文本格式
        },
        t,
    });
};
const fetchRowAllData = async () => {
    let data = await QueryInventoryMaterialInfo(getRawForm.value).then(
        (res: any) => {
            return res.content;
        },
    );
    return data;
};
const getFinishData = () => {
     
    QueryInventoryProductInfo(getFinishForm.value).then((res: any) => {
        TotalQty2.value=res.content[0]?.TotalQty || 0
        tableData2.value = res.content.map((v: any) => {
            return {
                ...v,
                ProductionDate: v.ProductionDate == null ? null : dayjs(v.ProductionDate).format("YYYY-MM-DD HH:mm:ss"),
                ExpiryDate: v.ExpiryDate == null ? null : dayjs(v.ExpiryDate).format("YYYY-MM-DD HH:mm:ss"),
            }
        })
    });
};
const handleFinishReset = () => {
    getFinishForm.value = {
        SNName: "",
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        ContainerName: "",
        LotNumber: "",
        TJResourceName: "",
        PJResourceName: "",
        ES_Status: ''
    };
    searchFinishDate.value = [];
    tableData2.value = [];
    getFinishData();
};
const handleSelectionMaterial = (val: any) => {
    printMaterData.value = val
    // printProductData.value = []
}
const handlePrintMater = () => {
    if (!printIp.value) {
        ElNotification({
            type: 'warning',
            message: '请选择打印机'
        })
        return
    }
    let data = {
        IP: printIp.value,
        ContainerName: printMaterData.value[0].ContainerName,
    }
    MaterialContainerPrinter(data).then((res: any) => {
        if (res.success) {
            ElNotification({
                type: 'success',
                message: '打印成功'
            })
            printMaterData.value = []
            getRawData()
        } else {
            ElNotification({
                type: 'error',
                message: '打印失败'
            })
        }
    })

}
const handleSelectionProduct = (val: any) => {
    printProductData.value = val
    // printMaterData.value = []
}
const handlePrintProduct = () => {
    if (!printIp.value) {
        ElNotification({
            type: 'warning',
            message: '请选择打印机'
        })
        return
    }
    let data = {
        IP: printIp.value,
        ContainerName: printProductData.value[0].ContainerName,
    }
    ProductContainerPrinter(data).then((res: any) => {
        if (res.success) {
            ElNotification({
                type: 'success',
                message: '打印成功'
            })
            printProductData.value = []
            getFinishData()
        } else {
            ElNotification({
                type: 'error',
                message: '打印失败'
            })
        }
    })

}
const exportFinishList = () => {
    exportTableToExcel({
        tableRef: finishRef.value,
        fetchAllData: fetchFinishAllData,
        fileName: `${t("inventInquiry.finishGoodsInvent")}_${dayjs().format(
            "YYYYMMDDHHmmss",
        )}`,
        styles: {
            headerBgColor: "", // 灰色表头
            headerFont: {
                color: { argb: "" }, // 红色文字
                bold: false,
                size: 12,
            }, // 白色文字
            cell: { numFmt: "@" }, // 强制文本格式
        },
        t,
    });
};
const fetchFinishAllData = async () => {
    let data = await QueryInventoryProductInfo(getFinishForm.value).then(
        (res: any) => {
            return res.content;
        },
    );
    return data;
};
const handleSizeChange = (val: any) => {
    pageObj.pageSize = val;
};
const handleCurrentChange = (val: any) => {
    pageObj.currentPage = val;
};
const handleSizeChange2 = (val: any) => {
    pageObj2.pageSize = val;
};
const handleCurrentChange2 = (val: any) => {
    pageObj2.currentPage = val;
};
const getScreenHeight = () => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 270;
        tableHeight2.value = window.innerHeight - 250;
    });
};
// 使用计算属性缓存列宽计算结果
const columnWidths = computed(() => {
    const columns = [
        { label: "容器名称", prop: "ContainerName" },
        { label: "物料名称", prop: "ProductName" },
        { label: "物料描述", prop: "ProductDes" },
        { label: "物料规格", prop: "ES_MaterialSpecifications" },
        { label: "批次号", prop: "ES_LotNumber" },
        { label: "物料类型", prop: "ProductTypeName" },
        { label: "数量", prop: "Qty" },
        { label: "单位", prop: "UOMName" },

        // 添加其他需要自适应宽度的列
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, tableData.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth = (prop: string) => {
    return columnWidths.value[prop] || "auto";
};
const columnWidths2 = computed(() => {
    const columns = [
        { label: "物料批次", prop: "ContainerName" },
        { label: "物料名称", prop: "ProductName" },
        { label: "物料描述", prop: "ProductDes" },
        { label: "物料规格", prop: "ES_MaterialSpecifications" },
        { label: "批次号", prop: "ES_LotNumber" },
        { label: "物料类型", prop: "ProductTypeName" },
        { label: "数量", prop: "Qty" },
        { label: "单位", prop: "UOMName" },
        { label: "容器名称", prop: "ContainerName" },
        { label: t('inventInquiry.ES_SN'), prop: "ES_SN" },
        { label: "配胶桶", prop: "TJResourceName" },
        { label: "泡胶桶", prop: "PJResourceName" },
        // 添加其他需要自适应宽度的列
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, tableData2.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth2 = (prop: string) => {
    return columnWidths2.value[prop] || "auto";
};
</script>

<style lang="scss" scoped></style>
<style scoped>
.el-pagination {
    justify-content: center;
}
</style>
<style>
.el-table .danger-row-invent {
    --el-table-tr-bg-color: var(--el-color-danger-light-3);
}

.el-table .success-row-invent {
    --el-table-tr-bg-color: var(--el-color-success-light-5);
}

.warning-row-invent {
    --el-table-tr-bg-color: var(--el-color-warning-light-5);
}
</style>
