<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :inline="true" :model="getForm" size="small" label-width="auto"
                @submit.native.prevent>
                <el-form-item :label="$t('shipmentCheck.PackingContainer')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.PackingContainer" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentCheck.OrderNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.OrderNo" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                   <el-form-item :label="$t('shipmentCheck.OrderNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                   <el-form-item :label="$t('shipmentCheck.OrderNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductDec" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.customerName')" class="mb-2">
                    <el-select v-model="getForm.Customer" @change="getData" placeholder="请选择" clearable filterable
                        size="small" style="width: 200px">
                        <el-option :label="p.CustomerName" :value="p.CustomerName" :key="p.CustomerId"
                            v-for="p in customerList" />
                    </el-select>
                </el-form-item>

                <el-form-item :label="$t('shipmentCheck.ContainerName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ContainerName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="primary" size="small" @click="getData">
                        {{ $t("publicText.query") }}
                    </el-button>
                    <el-button type="success" size="small" @click="handlePublish" :disabled="selection.length == 0">
                        {{ $t("shipmentCheck.Publish") }}
                    </el-button>
                </el-form-item>
                <el-form-item :label="$t('batchCreation.Printer')" prop="Printer" class="mb-2">
                    <el-select v-model="Printer" placeholder="" filterable style="width: 200px" clearable>
                        <el-option v-for="p in printList" :label="p.PrintQueueName" :value="p.PrintQueueName"
                            :key="p.PrintQueueId" />
                    </el-select>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-select v-model="PrintTemplate" placeholder="请选择" clearable filterable size="small"
                        style="width: 200px">
                        <el-option :label="p.label" :value="p.value" :key="p.value" v-for="p in printTemppList" />
                    </el-select>

                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="warning" size="small" @click="handlePrint" :disabled="selection.length == 0">
                        {{ $t("shipmentCheck.print") }}
                    </el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.slice(
                (pageObj.currentPage - 1) * pageObj.pageSize,
                pageObj.currentPage * pageObj.pageSize,
            )
                " size="small" :style="{ width: '100%' }" :height="tableHeight"  border fit
                highlight-current-row ref="multipleTableRef" :span-method="objectSpanMethod"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    <template #default="scope">
                        <span>{{
                            scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
                        }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="ES_PackingContainer" fixed :label="$t('shipmentCheck.PackingContainer')"
                    :min-width="getColumnWidth1('ES_PackingContainer')" />
                <el-table-column prop="ES_ContainerName" fixed :label="$t('shipmentCheck.ContainerName')"
                    :min-width="getColumnWidth1('ES_ContainerName')" />
                <el-table-column prop="ES_OrderNo" fixed :label="$t('shipmentCheck.OrderNo')"
                    :min-width="getColumnWidth1('ES_OrderNo')" />
                <el-table-column prop="ES_ProductName" :label="$t('shipmentCheck.ES_ProductName')"
                    :min-width="getColumnWidth1('ES_ProductName')" />
                <el-table-column prop="ES_ProductDec" :label="$t('shipmentCheck.ES_ProductDec')" width="200"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="ES_Specification" :label="$t('shipmentCheck.ES_Specification')"
                    :min-width="getColumnWidth1('ES_Specification')" />
                <el-table-column prop="ES_DefaultLot" :label="$t('shipmentCheck.ES_DefaultLot')"
                    :min-width="getColumnWidth1('ES_DefaultLot')" />
                     <el-table-column prop="ES_Customer" :label="$t('shipmentCheck.ES_Customer')"
                    :min-width="getColumnWidth1('ES_Customer')" />
                <el-table-column prop="ES_Status" :label="$t('shipmentCheck.ES_Status')"
                    :min-width="getColumnWidth1('ES_Status')" />
                <el-table-column prop="ES_CreateBy" :label="$t('shipmentCheck.ES_CreateBy')"
                    :min-width="getColumnWidth1('ES_CreateBy')" />
                <el-table-column prop="ES_CreateTime" :label="$t('shipmentCheck.ES_CreateTime')" width="155" />
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
    </div>
</template>

<script setup lang="ts">
import {
    GetPackingShipInfoModelQuery,
    PackingShipSend,
    ReprintPackingShip,
} from "@/api/warehouseManage/shipmentCheck";
import {

    getPrintQuery

} from "@/api/barCodeManage/batchCreation";
import { GetCustomerQuery } from "@/api/incomingManage/aqlrules";
import { calculateColumnsWidth } from "@/utils/tableminWidth";
import dayjs from "dayjs";
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
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useUserStoreWithOut } from "@/stores/modules/user";
const userStore = useUserStoreWithOut();

const getForm = ref({
    ContainerName: "",
    PackingContainer: "",
    Customer: "",
    OrderNo: "",
    ProductName: "",
    ProductDec: "",
});
const searchDate = ref<any[]>([]);
const tableHeight = ref(0);
const tableData = ref<any[]>([]);
const pageObj = ref({
    pageSize: 50,
    currentPage: 1,
});
const customerList = ref<any[]>([]);
const spanArr = ref<any[]>([]);
const selection = ref<any[]>([]);
const PrintTemplate = ref("");
const printTemppList = ref<any[]>([
    {
        label: "河南环宇昌电子科技有限公司",
        value: "河南环宇昌电子科技有限公司",
    },
    {
        label: "苏州市深宇晟电子科技有限公司",
        value: "苏州市深宇晟电子科技有限公司",
    },
    {
        label: "深圳环宇昌电子科技有限公司",
        value: "深圳环宇昌电子科技有限公司",
    },
]);
const printList = ref<any[]>([]);
const Printer = ref("");
onBeforeMount(() => {
    getScreenHeight();
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
    getPrint()
    getCustomerData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
});
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
    if (columnIndex === 2) {
        const _row = spanArr.value[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
            rowspan: _row,
            colspan: _col,
        };
    }
};
//获取客户
const getCustomerData = () => {
    GetCustomerQuery({}).then((res: any) => {
        customerList.value = res.content;
    });
};
//获取打印机
const getPrint = () => {
    getPrintQuery({}).then((res: any) => {
        printList.value = res.content;
    });
};
const getData = () => {
    GetPackingShipInfoModelQuery(getForm.value).then((res: any) => {
        tableData.value = res.content;
        spanArr.value = [];
        let pos = 0;
        for (let i = 0; i < res.content.length; i++) {
            if (i === 0) {
                spanArr.value.push(1);
                pos = 0;
            } else {
                // 判断当前元素与上一个元素是否相同
                if (
                    tableData.value[i].ES_PackingContainer ===
                    tableData.value[i - 1].ES_PackingContainer
                ) {
                    spanArr.value[pos] += 1;
                    spanArr.value.push(0);
                } else {
                    spanArr.value.push(1);
                    pos = i;
                }
            }
        }
    });
};
const handleSelectionChange = (val: any) => {
    selection.value = val;
    console.log(val);
};
const handlePublish = () => {
    console.log(selection.value);
    let data = selection.value.map((item: any) => {
        return {
            ES_PackingContainer: item.ES_PackingContainer,
            ES_ContainerName: item.ES_ContainerName,
        };
    });
    PackingShipSend(data).then((res: any) => {
        if (res.success) {
            ElMessage.success(res.msg);
            getData();
        } else {
            ElMessage.error(res.msg);
        }
    });
};
const handlePrint = () => {
    if (!PrintTemplate.value || !Printer.value) {
        ElMessage.warning("请选择打印模板");
        return;
    }

    // 去重：根据 ES_PackingContainer 过滤
    const uniqueContainers = Array.from(
        new Set(selection.value.map(item => item.ES_PackingContainer))
    );

    const packingShipLists = uniqueContainers.map(container => ({
        BoxContainerName: container,
    }));

    const data = {
        packingShipLists,
        Printer: Printer.value,
        PrintTemplate: PrintTemplate.value,
    };

    ReprintPackingShip(data).then((res: any) => {
        if (res.success) {
            ElMessage.success(res.msg);
            getData();
        } else {
            ElMessage.error(res.msg);
        }
    });
};
const handleSizeChange = (val: any) => {
    pageObj.value.pageSize = val;
};
const handleCurrentChange = (val: any) => {
    pageObj.value.currentPage = val;
};
const getScreenHeight = () => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 210;
    });
};
const columnWidths1 = computed(() => {
    const columns = [
        { label: "箱条码", prop: "ES_PackingContainer" },
        { label: "箱条码", prop: "ES_ContainerName" },
        { label: "订单号", prop: "ES_OrderNo" },
        { label: "产品名称", prop: "ES_ProductName" },
        { label: "产品描述", prop: "ES_ProductDec" },
        { label: "规格型号", prop: "ES_Specification" },
        { label: "默认批次", prop: "ES_DefaultLot" },
        { label: "客户", prop: "ES_Customer" },
        { label: "状态", prop: "ES_Status" },
        { label: "创建人", prop: "ES_CreateBy" },
        { label: "创建时间", prop: "ES_CreateTime" },
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
</script>
<style scoped>
.el-pagination {
    justify-content: center;
}
</style>
<style lang="scss" scoped></style>
