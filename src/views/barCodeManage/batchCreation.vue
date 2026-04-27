<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :inline="true" size="small" label-width="auto" @submit.native.prevent>
                <el-form-item :label="$t('batchCreation.OrderCode')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.MfgOrderName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.OrderProduct')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.productName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductDec" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.ES_MaterialSpecifications')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.Specifications" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>

                <el-form-item :label="$t('batchCreation.PlannedStartDate')" class="mb-2">
                    <el-date-picker :shortcuts="shortcuts" v-model="searchDate" value-format="YYYY-MM-DD"
                        type="daterange" range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <el-form-item :label="$t('batchCreation.PlannedCompletionStartDate')" class="mb-2">
                    <el-date-picker :shortcuts="shortcuts" v-model="searchDate2" value-format="YYYY-MM-DD"
                        type="daterange" range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <el-form-item :label="$t('batchCreation.MoveinStartDate')" class="mb-2">
                    <el-date-picker :shortcuts="shortcuts" v-model="searchDate3" value-format="YYYY-MM-DD"
                        type="daterange" range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <el-form-item :label="$t('batchCreation.MoveStdStartDate')" class="mb-2">
                    <el-date-picker :shortcuts="shortcuts" v-model="searchDate4" value-format="YYYY-MM-DD"
                        type="daterange" range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <el-form-item :label="$t('batchCreation.workCenterName')" class="mb-2">
                    <!-- <el-input style="width: 200px" v-model="getForm.WorkCenterName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input> -->
                    <el-select v-model="getForm.WorkCenterName" placeholder="" filterable style="width: 200px" clearable
                        @change="getData">
                        <el-option v-for="w in workCenterList" :label="w.WorkCenterName" :value="w.WorkCenterName"
                            :key="w.WorkCenterName" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.mfgLineName')" class="mb-2">
                    <el-select v-model="getForm.MfgLineName" placeholder="" filterable style="width: 200px" clearable
                        @change="getData">
                        <el-option v-for="line in mfgLineList" :label="line.MfgLinename" :value="line.MfgLinename"
                            :key="line.MfgLinename" />
                    </el-select>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="primary" @click="getData">{{
                        $t("publicText.query")
                    }}</el-button>
                    <el-button type="" @click="resetData">{{
                        $t("publicText.reset")
                    }}</el-button>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.Printer')" prop="Printer" class="mb-2">
                    <el-select v-model="batchPrintForm.PrinterName" placeholder="" filterable style="width: 200px"
                        clearable>
                        <el-option v-for="p in printList" :label="p.PrintQueueName" :value="p.PrintQueueName"
                            :key="p.PrintQueueId" />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item class="mb-2">
                    <el-radio-group v-model="batchPrintForm.PackagingType">
                        <el-radio :value="0">{{
                            $t("batchCreation.AccordingSmallBox")
                            }}</el-radio>
                        <el-radio :value="1">{{
                            $t("batchCreation.AccordingBox")
                            }}</el-radio>
                        <el-radio :value="2">{{
                            $t("batchCreation.AccordingOrder")
                            }}</el-radio>
                    </el-radio-group>
                </el-form-item> -->

                <el-form-item class="mb-2">
                    <el-button type="warning" :disabled="selectList.length == 0" size="small" @click="submitPrint">{{
                        $t("batchCreation.ProduceBatchPrint") }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="primary" :disabled="selectList.length != 1" size="small" @click="previewPrint">{{
                        $t("batchCreation.previewPrint") }}</el-button>
                </el-form-item>
            </el-form>
            <!-- <el-form ref="formRef" :inline="true" size="small" label-width="84px">
                
            </el-form> -->
            <div></div>
            <el-table :data="tableData.slice(
                (pageObj.currentPage - 1) * pageObj.pageSize,
                pageObj.currentPage * pageObj.pageSize,
            )
                " size="small" :style="{ width: '100%' }" :height="tableHeight" :tooltip-effect="'light'" border fit
                highlight-current-row ref="multipleTableRef" @selection-change="handleSelectionChange"
                :row-class-name="tableRowClassName">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    <template #default="scope">
                        <span>{{
                            scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="MfgOrderName" fixed :label="$t('batchCreation.OrderCode')"
                    :min-width="getColumnWidth1('MfgOrderName')">
                    <template #default="scope">
                        <span class="underline cursor-pointer text-cyan-800" @click="cellClick(scope.row)">{{
                            scope.row.MfgOrderName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ProductName" fixed :label="$t('batchCreation.OrderProduct')"
                    :min-width="getColumnWidth1('ProductName')" />
                <el-table-column prop="DefaultLot" :label="$t('batchCreation.DefaultLot')"
                    :min-width="getColumnWidth1('DefaultLot')" />

                <el-table-column prop="Description" :label="$t('batchCreation.ProductDsc')" width="100"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="Qty" :label="'生产数量'" />
                <!-- <el-table-column prop="Qty2" :label="'订单数量'" /> -->
                <el-table-column prop="UOMName" :label="$t('batchCreation.OrderUnit')" />
                <el-table-column prop="WorkflowName" :label="$t('batchCreation.ProcessFlow')"
                    :min-width="getColumnWidth1('WorkflowName')" />
                <el-table-column prop="OrderStatusName" :label="$t('batchCreation.orderStatus')" />
                <el-table-column prop="OrderTypeName" :label="$t('batchCreation.orderType')" />
                <!-- <el-table-column prop="ES_CustomerPO" :label="$t('batchCreation.purchaseOrderNumber')" width="120" /> -->
                <el-table-column prop="CustomerName" :label="$t('batchCreation.customer')"
                    :min-width="getColumnWidth1('CustomerName')" />
                <el-table-column prop="ES_MaterialSpecifications" :label="$t('batchCreation.ES_MaterialSpecifications')"
                    :min-width="getColumnWidth1('ES_MaterialSpecifications')" />
                <el-table-column prop="MfgLineName" :label="$t('batchCreation.mfgLineName')"
                    :min-width="getColumnWidth1('MfgLineName')" />
                <el-table-column prop="WorkCenterName" :label="$t('batchCreation.workCenterName')"
                    :min-width="getColumnWidth1('WorkCenterName')" />
                <el-table-column prop="CreateDate" :label="$t('batchCreation.CreateDate')"
                    :min-width="getColumnWidth1('CreateDate')" />
                <el-table-column prop="PlannedStartDate" :label="$t('batchCreation.PlannedStartDate')" width="150" />
                <el-table-column prop="PlannedCompletionDate" :label="$t('batchCreation.PlannedCompletionStartDate')"
                    width="150" />
                <el-table-column prop="MoveInDATE" :label="$t('batchCreation.MoveinStartDate')" width="150" />
                <el-table-column prop="MoveStdDATE" :label="$t('batchCreation.MoveStdStartDate')" width="150" />
                <el-table-column prop="CreateBy" :label="$t('batchCreation.CreateBy')"
                    :min-width="getColumnWidth1('CreateBy')" />
                <el-table-column prop="PublishBy" :label="$t('batchCreation.PublishBy')"
                    :min-width="getColumnWidth1('PublishBy')" />

                <template #empty>
                    <div class="flex items-center justify-center h-100%">
                        <el-empty />
                    </div>
                </template>
            </el-table>
            <div class="mt-2">
                <el-pagination :size="'small'" background @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" :pager-count="5" :current-page="pageObj.currentPage"
                    :page-size="pageObj.pageSize" :page-sizes="[30, 50, 100, 200, 300]"
                    layout="total,sizes, prev, pager, next" :total="tableData.length">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog v-model="printVisible" :title="$t('batchCreation.OrderCode') + '：' + chooseOrder" width="75%"
            align-center draggable :append-to-body="true" :close-on-click-modal="false" :close-on-press-escape="false"
            @close="closePrint">
            <el-form ref="resetFormRef" :inline="true" :model="resetPrintForm" :rules="rules">
                <el-form-item :label="$t('batchCreation.Printer')" prop="Printer">
                    <el-select v-model="resetPrintForm.Printer" placeholder="" filterable style="width: 200px"
                        clearable>
                        <el-option v-for="p in printList" :label="p.PrintQueueName" :value="p.PrintQueueName"
                            :key="p.PrintQueueId" />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item :label="$t('batchCreation.PrintingTemplate')"  prop="PrintTemplate">
                    <el-select v-model="resetPrintForm.PrintTemplate" placeholder="" filterable style="width: 200px"
                        clearable>
                        <el-option v-for="p in printTemplate" :label="p.PrinterLabelDefinitionName"
                            :value="p.PrinterLabelDefinitionName" :key="p.PrinterLabelDefinitionId" />
                    </el-select>
                </el-form-item> -->
            </el-form>
            <el-table :data="barchTable" size="small" :style="{ width: '100%' }" height="450px"
                :tooltip-effect="'light'" border fit highlight-current-row ref="barchRef"
                @selection-change="handleSelectionChange1">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                </el-table-column>
                <el-table-column prop="ContainerName"  :min-width="getColumnWidth2('ContainerName')" :label="$t('batchCreation.BatchName')" />
                <el-table-column prop="Qty" :label="$t('batchCreation.BatchNumber')"  :min-width="getColumnWidth2('Qty')"/>
                <el-table-column prop="UOMName" :label="$t('batchCreation.BatchUnit')" width="100" />
                <el-table-column prop="ProductName" :label="$t('batchCreation.BatchProduct')" :min-width="getColumnWidth2('ProductName')"/>
                <el-table-column prop="Description" :label="$t('batchCreation.ProductDsc')" width="180"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="CarrierName" :label="$t('batchCreation.CarrierName')" :min-width="getColumnWidth2('CarrierName')" />    
                <el-table-column prop="SpecName" :label="$t('batchCreation.CurrentProcess')"  :min-width="getColumnWidth2('SpecName')" />
                <el-table-column prop="Status" :label="$t('batchCreation.CurrentStatus')" :min-width="getColumnWidth2('Status')"/>
                <template #empty>
                    <div class="flex items-center justify-center h-100%">
                        <el-empty />
                    </div>
                </template>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closePrint">{{
                        $t("publicText.close")
                    }}</el-button>
                    <el-button type="warning" :disabled="resetList.length == 0" @click="resetPrint">
                        {{ $t("batchCreation.printPreview") }}
                    </el-button>
                      <el-button type="primary" :disabled="resetList.length == 0"  @click="handlePrintBatch">
                        {{ $t("batchCreation.Reprint") }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="previewVisible" :title="previewTitle" width="80%" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center>
            <iframe :src="previewUrl" width="100%" height="650px" frameborder="0"></iframe>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handlePreviewClose">{{
                        $t("publicText.close")
                    }}</el-button>
                    <el-button type="primary" @click="handlePreviewDawnload">
                        {{ $t("publicText.dawnload") }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="previewOrderVisible" :title="'工单打印预览'" width="80%" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handlePreviewOrderClose">
            <!-- <div style="height: 600px; overflow: auto">
                <VueOfficeExcel :src="excelSrc" style="width: 100%"></VueOfficeExcel>
            </div> -->
             <iframe :src="excelSrc" width="100%" height="600px" frameborder="0"></iframe>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handlePreviewOrderClose">{{
                        $t("publicText.close")
                    }}</el-button>
                    <el-button type="primary" @click="handlePrintExcel">
                        {{ $t("batchCreation.Reprint") }}
                    </el-button>
                    
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="previewBatchVisible" :title="'打印预览'" width="80%" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handlePreviewBatchClose">
            <!-- <div style="height: 600px; overflow: auto">
                <VueOfficeExcel :src="excelSrc" style="width: 100%"></VueOfficeExcel>
            </div> -->
            <el-form ref="resetFormRef" :inline="true" :model="resetPrintForm" :rules="rules">
                <el-form-item :label="$t('batchCreation.Printer')" prop="Printer">
                    <el-select v-model="resetPrintForm.Printer" placeholder="" filterable style="width: 200px"
                        clearable>
                        <el-option v-for="p in printList" :label="p.PrintQueueName" :value="p.PrintQueueName"
                            :key="p.PrintQueueId" />
                    </el-select>
                </el-form-item>
            </el-form>
             <iframe :src="batchSrc" width="100%" height="550px" frameborder="0"></iframe>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handlePreviewBatchClose">{{
                        $t("publicText.close")
                    }}</el-button>
                    <el-button type="primary" @click="handlePrintBatch">
                        {{ $t("batchCreation.Reprint") }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { FTPSearchAndDownloadSpecificationDocumentFile } from "@/api/smtSpotCheck/oqc";
import {
    getOrderTypeQuery,
    getOrderStatusQuery,
    getCustomerQuery,
    getMfgOrderInformationQuery,
    getMfgOrderContainerQuery,
    getPrintQuery,
    getPrintTemplateQuery,
    AddMfgOrderContainer,
    ReprintMfgOrderContainer,
    getWorkflowQuery,
    GetMfgLineQuery,
    GetWorkCenterQuery,
    DownloadMfgOrderReportAsync,
    DownloadContainerReportAsyncPDF
} from "@/api/barCodeManage/batchCreation";
import { calculateColumnsWidth } from "@/utils/tableminWidth";
import { printPDF } from '@/utils/excelPrinter'
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
import {
    shortcuts,
    setTodayDate,
    setLastDate,
    disabledDate,
} from "@/utils/dataMenu";
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useUserStoreWithOut } from "@/stores/modules/user";
const userStore = useUserStoreWithOut();
const multipleTableRef = ref();
const barchRef = ref();
const resetFormRef = ref();
const getForm = ref({
    PlannedStartDate: "", //开始
    PlannedEndDate: "",
    PlannedCompletionStartDate: "", //完成
    PlannedCompletionEndDate: "",
    MoveinStartDate: "", //实际开始
    MoveinEndDate: "",
    MoveStdStartDate: "", //实际结束
    MoveStdEndDate: "",
    MfgOrderName: '',
    ProductName: "",
    ProductDec: "",
    Specifications: "",
    MfgLineName: "",
    WorkCenterName: "",
});
const searchDate = ref<any[]>([]);
const searchDate2 = ref<any[]>([]);
const searchDate3 = ref<any[]>([]);
const searchDate4 = ref<any[]>([]);
const orderTypeList = ref<any[]>([]);
const orderStatusList = ref<any[]>([]);
const customerList = ref<any[]>([]);
const tableHeight = ref(0);
const tableData = ref([]);
const pageObj = ref({
    pageSize: 50,
    currentPage: 1,
});
interface BatchPrintForm {
    PackagingType: number;
    PrinterName: string;
    mfgOrderStartLists: any[];
}
const batchPrintForm = ref<BatchPrintForm>({
    PackagingType: 2,
    PrinterName: "",
    mfgOrderStartLists: [],
});
const selectList = ref<any[]>([]);
const printVisible = ref(false);
const barchTable = ref([]);
const printList = ref<any[]>([]);
const printTemplate = ref<any[]>([]);
const chooseOrder = ref("");
const resetList = ref<any[]>([]);

interface ResetPrintForm {
    Printer: string;
    PrintTemplate: string;
    reprintContianerLists: any[];
}
const resetPrintForm = ref<ResetPrintForm>({
    Printer: "",
    PrintTemplate: "",
    reprintContianerLists: [],
});
const previewVisible = ref(false);
const previewUrl = ref("");
const previewTitle = ref("");
const workflowList = ref<any>([]);
const mfgLineList = ref<any>([]);
const workCenterList = ref<any>([]);
const rules = reactive({
    Printer: [
        {
            required: true,
            message: t("publicText.pleaseSelect") + t("batchCreation.Printer"),
            trigger: "change",
        },
    ],
    PrintTemplate: [
        {
            required: true,
            message:
                t("publicText.pleaseSelect") + t("batchCreation.PrintingTemplate"),
            trigger: "change",
        },
    ],
});
const previewOrderVisible = ref(false);
const excelSrc = ref("");
const previewBatchVisible = ref(false);
const batchSrc = ref("");
watch(
    () => searchDate.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.PlannedStartDate = "";
            getForm.value.PlannedEndDate = "";

            return;
        }
        if (newVal !== oldVal) {
            getForm.value.PlannedStartDate = newVal[0];
            getForm.value.PlannedEndDate = newVal[1] + " 23:59:59";
        }
    },
);
watch(
    () => searchDate2.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.PlannedCompletionStartDate = "";
            getForm.value.PlannedCompletionEndDate = "";

            return;
        }
        if (newVal !== oldVal) {
            getForm.value.PlannedCompletionStartDate = newVal[0];
            getForm.value.PlannedCompletionEndDate = newVal[1] + " 23:59:59";
        }
    },
);
watch(
    () => searchDate3.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.MoveinStartDate = "";
            getForm.value.MoveinEndDate = "";

            return;
        }
        if (newVal !== oldVal) {
            getForm.value.MoveinStartDate = newVal[0];
            getForm.value.MoveinEndDate = newVal[1] + " 23:59:59";
        }
    },
);
watch(
    () => searchDate4.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.MoveStdStartDate = "";
            getForm.value.MoveStdEndDate = "";

            return;
        }
        if (newVal !== oldVal) {
            getForm.value.MoveStdStartDate = newVal[0];
            getForm.value.MoveStdEndDate = newVal[1] + " 23:59:59";
        }
    },
);
onBeforeMount(() => {
    getScreenHeight();
    getWorkCenterData()
    getMfgLineData()
    // let end: string = setTodayDate(true);
    // let start: string = setLastDate(true);
    // searchDate.value = [start, end];
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
    getOrderType();
    getOrderStatus();
    getCustomer();
    getPrint();
    getPrintTemp();
    getWorkFlowData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
});
const tableRowClassName = (val: any) => {
    let row = val.row;
    if (row.PriorityCodeName == 1 && row.OrderStatusName !== "完工入库") {
        return "bulelist-1";
    } else if (row.PriorityCodeName == 2 && row.OrderStatusName !== "完工入库") {
        return "bulelist-2";
    } else if (row.PriorityCodeName == 3 && row.OrderStatusName !== "完工入库") {
        return "bulelist-3";
    } else {
        return "";
    }
};
//获取工单类型
const getOrderType = () => {
    getOrderTypeQuery({}).then((res: any) => {
        orderTypeList.value = res.content;
    });
};
//获取工单状态
const getOrderStatus = () => {
    getOrderStatusQuery({}).then((res: any) => {
        orderStatusList.value = res.content;
    });
};
//获取客户
const getCustomer = () => {
    getCustomerQuery({
        CustomerName: "",
        CustomerPO: "",
        CustomerProduct: "",
    }).then((res: any) => {
        customerList.value = res.content;
    });
};
//获取打印机
const getPrint = () => {
    getPrintQuery({}).then((res: any) => {
        printList.value = res.content;
    });
};
//获取工艺流程
const getWorkFlowData = () => {
    getWorkflowQuery({}).then((res: any) => {
        workflowList.value = res.content;
    });
};
//获取产线
const getMfgLineData = () => {
    GetMfgLineQuery({}).then((res: any) => {
        mfgLineList.value = res.content;
    });
};
//获取工作中心
const getWorkCenterData = () => {
    GetWorkCenterQuery({}).then((res: any) => {
        workCenterList.value = res.content;
    });
};
const getPrintTemp = () => {
    getPrintTemplateQuery({}).then((res: any) => {
        printTemplate.value = res.content;
    });
};
const getData = () => {
    getMfgOrderInformationQuery(getForm.value).then((res: any) => {
        tableData.value = res.content;
    });
};
const resetData = () => {
    getForm.value = {
        PlannedStartDate: "", //开始
        PlannedEndDate: "",
        PlannedCompletionStartDate: "", //完成
        PlannedCompletionEndDate: "",
        MoveinStartDate: "", //实际开始
        MoveinEndDate: "",
        MoveStdStartDate: "", //实际结束
        MoveStdEndDate: "",
        MfgOrderName: '',
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        MfgLineName: "",
        WorkCenterName: "",
    };
    searchDate.value = [];
    searchDate2.value = [];
    searchDate3.value = [];
    searchDate4.value = [];
    tableData.value = [];
    getData();
};

const submitPrint = () => {
    batchPrintForm.value.mfgOrderStartLists = selectList.value.map((item) => {
        return {
            MfgOrderName: item.MfgOrderName,
            ProductName: item.ProductName,
            UserName: userStore.getUserInfo,
        };
    });

    AddMfgOrderContainer(batchPrintForm.value).then((res: any) => {
        if (res.success) {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "success",
            });
            batchPrintForm.value.mfgOrderStartLists = [];
            multipleTableRef.value!.clearSelection();
        } else {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }
    });
};
const cellClick = (val: any) => {
    // console.log(val.MfgOrderName);
    chooseOrder.value = val.MfgOrderName;
    getMfgOrderContainerQuery({ MfgOrderName: val.MfgOrderName }).then(
        (res: any) => {
            printVisible.value = true;
            barchTable.value = res.content;
        },
    );
};
const resetPrint = () => {
    let batchNames:any =[]
    resetList.value.forEach((item)=>{
        batchNames.push(item.ContainerName)
    })
    console.log(batchNames);
    
    DownloadContainerReportAsyncPDF(batchNames).then((res: any) => {
        if (res.success) {
            const base64Data = "data:application/pdf;base64," + res.content.FileData;
            batchSrc.value = base64Data;
            previewBatchVisible.value = true;
        } else {
            ElMessage({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }
    });
    // resetFormRef.value.validate((valid: any, fields: any) => {
    //     if (valid) {
    //         resetPrintForm.value.reprintContianerLists = resetList.value.map(
    //             (item) => {
    //                 return {
    //                     ContainerName: item.ContainerName,
    //                 };
    //             },
    //         );
    //         ReprintMfgOrderContainer(resetPrintForm.value).then((res: any) => {
    //             if (res.success) {
    //                 ElNotification({
    //                     title: t("message.tipTitle"),
    //                     message: res.msg,
    //                     type: "success",
    //                 });
    //                 resetPrintForm.value.reprintContianerLists = [];
    //                 barchRef.value!.clearSelection();
    //                 resetFormRef.value.resetFields();
    //             } else {
    //                 ElNotification({
    //                     title: t("message.tipTitle"),
    //                     message: res.msg,
    //                     type: "error",
    //                 });
    //             }
    //         });
    //     } else {
    //         ElNotification({
    //             title: t("message.tipTitle"),
    //             message: t("publicText.pleaseCompleSelect"),
    //             type: "error",
    //         });
    //     }
    // });
};
const closePrint = () => {
    resetFormRef.value.resetFields();
    printVisible.value = false;
    // resetPrintForm.value.PrintTemplate = ''
    // resetPrintForm.value.Printer = ''
};
const openFile = (val: any) => {
    FTPSearchAndDownloadSpecificationDocumentFile(val).then((res: any) => {
        if (res.success) {
            const base64Data = "data:application/pdf;base64," + res.content.FileData;
            previewUrl.value = base64Data;
            previewTitle.value = res.content.FileName;
            previewVisible.value = true;
        } else {
            ElMessage({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
            // ElNotification({
            //          title: t("message.tipTitle"),
            //     message: res.msg,
            //     type: "error",
            // })
        }
    });
};
const handlePreviewClose = () => {
    previewVisible.value = false;
    previewUrl.value = "";
};
const handlePreviewDawnload = () => {
    downloadPDF(previewUrl.value, previewTitle.value);
};
const downloadPDF = (base64Data: any, fileName: any) => {
    try {
        // 创建下载链接
        const link = document.createElement("a");

        // 设置下载属性
        link.href = base64Data;
        link.download = fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`;

        // 添加到页面（需要添加到页面才能触发下载）
        document.body.appendChild(link);

        // 触发点击下载
        link.click();

        // 清理 DOM
        document.body.removeChild(link);

        ElMessage.success("文件下载成功");
    } catch (error) {
        console.error("下载失败:", error);
        ElMessage.error("文件下载失败");
    }
};
const handlePreviewOrderClose = () => {
    previewOrderVisible.value = false;
    excelSrc.value = "";
};
const previewPrint = () => {
    const order = selectList.value[0];
    DownloadMfgOrderReportAsync(order.MfgOrderName).then((res: any) => {
        if (res.success) {
            const base64Data = "data:application/pdf;base64," + res.content.FileData;
            excelSrc.value = base64Data;
            console.log(excelSrc.value);

            previewOrderVisible.value = true;
        } else {
            ElMessage({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }
    });
};
const handlePrintExcel = () => {
    // const html = excelBase64ToHTML(excelSrc.value)
    // printHTML(html)
    printPDF(excelSrc.value)

}

const  handlePreviewBatchClose = () => {
    previewBatchVisible.value = false;
    batchSrc.value = "";
};
const handlePrintBatch = () => {
    // printPDF(batchSrc.value)
    resetFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
            resetPrintForm.value.reprintContianerLists = resetList.value.map(
                (item) => {
                    return {
                        ContainerName: item.ContainerName,
                    };
                },
            );
            ReprintMfgOrderContainer(resetPrintForm.value).then((res: any) => {
                if (res.success) {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "success",
                    });
                    resetPrintForm.value.reprintContianerLists = [];
                    barchRef.value!.clearSelection();
                    resetFormRef.value.resetFields();
                } else {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        } else {
            ElNotification({
                title: t("message.tipTitle"),
                message: t("publicText.pleaseCompleSelect"),
                type: "error",
            });
        }
    });
}


const handleSelectionChange = (val: any) => {
    // console.log(val);
    selectList.value = val;
};
const handleSelectionChange1 = (val: any) => {
    resetList.value = val;
};
const handleSizeChange = (val: any) => {
    pageObj.value.pageSize = val;

    // getForm.value.PageNumber = 1;
    // getForm.value.PageSize = val;
    // getData();
};
const handleCurrentChange = (val: any) => {
    pageObj.value.currentPage = val;
    // getForm.value.PageNumber = val;
    // getData();
};
const getScreenHeight = () => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 250;
    });
};

const columnWidths1 = computed(() => {
    const columns = [
        { label: "工单编码", prop: "MfgOrderName" },
        { label: "订单产品", prop: "ProductName" },
        { label: "工艺流程", prop: "WorkflowName" },
        { label: "客户", prop: "CustomerName" },
        { label: "产品规格", prop: "ES_MaterialSpecifications" },
        { label: "生产线", prop: "MfgLineName" },
        { label: "工作中心", prop: "WorkCenterName" },
        { label: "创建人", prop: "CreateBy" },
        { label: "发布人", prop: "PublishBy" },
        { label: "创建日期", prop: "CreateDate" },
        { label: "批次号", prop: "DefaultLot" },
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, tableData.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth1 = (prop: string) => {
    return columnWidths1.value[prop] || "auto";
};
const columnWidths2 = computed(() => {
    const columns = [
        { label: "批次名称", prop: "ContainerName" },
        { label: "批次数量", prop: "Qty" },
        { label: "批次单位", prop: "UOMName" },
        { label: "批次产品", prop: "ProductName" },
        { label: "产品描述", prop: "Description" },
        { label: "载具名称", prop: "CarrierName" },
        { label: "当前工序", prop: "SpecName" },
        { label: "当前状态", prop: "Status" },
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, barchTable.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth2 = (prop: string) => {
    return columnWidths2.value[prop] || "auto";
};
</script>

<style scoped>
.el-pagination {
    justify-content: center;
}
</style>
<style>
.el-table .danger-row-invent {
    --el-table-tr-bg-color: var(--el-color-danger-light-7);
}

.el-table .success-row-invent {
    --el-table-tr-bg-color: var(--el-color-success-light-5);
}

.el-table .bulelist-1 {
    --el-table-tr-bg-color: #79bbff;
}

.el-table .bulelist-2 {
    --el-table-tr-bg-color: #a0cfff;
}

.el-table .bulelist-3 {
    --el-table-tr-bg-color: #c6e2ff;
}
</style>
