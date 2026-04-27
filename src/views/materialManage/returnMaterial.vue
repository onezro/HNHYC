<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :inline="true" size="small" label-width="auto" @submit.native.prevent>
                <el-form-item :label="$t('returnMaterial.eS_ReturnMaterialNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ES_ReturnMaterialNo" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_Status')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ES_Status" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>

                <el-form-item class="mb-2">
                    <el-button type="primary" @click="getData">{{
                        $t("publicText.query")
                    }}</el-button>
                    <el-button type="" @click="resetData">{{
                        $t("publicText.reset")
                    }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button color="#626aef" size="small" @click="openAdd">{{
                        $t("materialPre.add")
                    }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="warning" :disabled="selectList.length != 1" size="small" @click="previewPrint">{{
                        $t("materialPre.print") }}</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.slice(
                (pageObj.currentPage - 1) * pageObj.pageSize,
                pageObj.currentPage * pageObj.pageSize,
            )
                " size="small" :style="{ width: '100%' }" :height="tableHeight" :tooltip-effect="'light'" border fit
                highlight-current-row ref="multipleTableRef" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    <template #default="scope">
                        <span>{{
                            scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ES_ReturnMaterialNo" fixed :label="$t('returnMaterial.eS_ReturnMaterialNo')"
                    :min-width="getColumnWidth1('ES_ReturnMaterialNo')" />
                <el-table-column prop="ES_WorkCenter" fixed :label="$t('materialPre.workCenterName')"
                    :min-width="getColumnWidth1('ES_WorkCenter')" />
                <el-table-column prop="ES_ReturnMaterialType" :label="$t('returnMaterial.eS_ReturnMaterialType')"
                    :min-width="getColumnWidth1('ES_ReturnMaterialType')" />
                <el-table-column prop="ES_Status" :label="$t('returnMaterial.eS_Status')"
                    :min-width="getColumnWidth1('ES_Status')" />
                <el-table-column prop="ES_CreateBy" :label="$t('returnMaterial.eS_CreateBy')"
                    :min-width="getColumnWidth1('ES_CreateBy')" />
                <el-table-column prop="ES_CreateTime" :label="$t('returnMaterial.eS_CreateTime')"
                    :min-width="getColumnWidth1('ES_CreateTime')" />
                <el-table-column :label="$t('publicText.operation')" width="80" fixed="right" align="center">
                    <template #default="{ row }">
                        <el-tooltip :content="$t('publicText.detail')" placement="top">
                            <el-button type="warning" icon="Document" size="small"
                                @click.stop="handleEdit(row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
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
        <el-dialog v-model="addVisible" :title="$t('materialPre.add')" width="75%" align-center :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" @close="closeAdd">
            <el-form ref="addFormRef" :inline="true" :model="addForm" :size="'small'" label-width="auto">
                <el-form-item :label="$t('materialPre.mfgorderName')" prop="MfgorderName">
                    <el-select-v2 v-model="addForm.MfgorderName" :options="orderList" :props="props" placeholder=""
                        filterable style="width: 200px" clearable @change="changeOrder">
                        <!-- <el-option v-for="p in orderList" :label="p.MfgOrderName" :value="p.MfgOrderName"
                            :key="p.MfgOrderName" /> -->
                    </el-select-v2>
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_ReturnMaterialNo')" prop="ES_ReturnMaterialNo">
                    <el-input v-model="addForm.ES_ReturnMaterialNo" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_WorkCenter')" prop="ES_WorkCenter">
                    <el-select v-model="addForm.ES_WorkCenter" placeholder="" filterable style="width: 200px"
                        @change="getData">
                        <el-option v-for="w in workCenterList" :label="w.WorkCenterName" :value="w.WorkCenterName"
                            :key="w.WorkCenterName" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_ReturnMaterialType')" prop="ES_ReturnMaterialType">
                    <el-select v-model="addForm.ES_ReturnMaterialType" placeholder="" filterable style="width: 200px"
                        @change="getData">
                        <el-option v-for="w in returnTypeList" :label="w.ES_ReturnMaterialType"
                            :value="w.ES_ReturnMaterialType" :key="w.ES_ReturnMaterialType" />
                    </el-select>
                </el-form-item>
                <el-table :data="addForm.listItem" size="small" :style="{ width: '100%' }" height="300px"
                    :tooltip-effect="'light'" border fit highlight-current-row>
                    <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    </el-table-column>
                    <el-table-column prop="ES_ProductName" :label="$t('materialPre.MaterialName')" width="150">
                        <template #default="scope">
                            <el-select v-model="scope.row.ES_ProductName" placeholder="" filterable style="width: 120px"
                                @change="changeMaterial">
                                <el-option v-for="p in materialList" :label="p.MaterialName" :value="p.MaterialName"
                                    :key="p.MaterialName" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ES_ProductDec" :label="$t('materialPre.MaterialDec')"
                        :show-overflow-tooltip="true" />

                    <el-table-column prop="ES_ReturnMaterialQty" :label="$t('returnMaterial.eS_ReturnMaterialQty')"
                        width="80" />
                    <el-table-column prop="ES_UonName" :label="$t('materialPre.Uom')" width="80" />
                    <el-table-column prop="ES_StatusDel" :label="$t('materialPre.status')" width="100" />
                    <el-table-column prop="ES_ContainName" :label="$t('returnMaterial.eS_ContainName')" width="200">
                        <template #default="{ row, $index }">
                            <el-input v-model="row.ES_ContainName" placeholder="" style="width: 180px" size="small"
                                @keyup.enter.native="changContainName(row)" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('publicText.operation')" width="120" fixed="right" align="center">
                        <template #default="{ row, $index }">
                            <el-button type="primary" icon="Plus" size="small" @click.stop="addMaterial"
                                v-if="isLastDetail($index)"></el-button>
                            <el-button type="danger" icon="Delete" size="small"
                                @click.stop="deleteMaterial($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAdd">{{ $t("publicText.close") }}</el-button>
                    <el-button type="primary" @click="handleAdd">
                        {{ $t("publicText.confirm") }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="editVisible" :title="$t('materialPre.edit')" width="75%" align-center :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" @close="closeEdit">
            <el-form ref="editFormRef" :inline="true" :model="editForm" :size="'small'" label-width="auto">
                <el-form-item :label="$t('returnMaterial.eS_ReturnMaterialNo')" prop="ES_ReturnMaterialNo">
                    <el-input v-model="editForm.ES_ReturnMaterialNo" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_WorkCenter')" prop="ES_WorkCenter">
                    <el-input v-model="editForm.ES_WorkCenter" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_ReturnMaterialType')" prop="ES_ReturnMaterialType">
                    <el-input v-model="editForm.ES_ReturnMaterialType" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('returnMaterial.eS_Status')" prop="ES_Status">
                    <el-input v-model="editForm.ES_Status" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-table :data="editForm.listItem" size="small" :style="{ width: '100%' }" height="300px"
                    :tooltip-effect="'light'" border fit highlight-current-row>
                    <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    </el-table-column>
                    <el-table-column prop="ES_MfgOrderName" :label="$t('returnMaterial.eS_MfgOrderName')" width="150">
                    </el-table-column>
                    <el-table-column prop="ES_ProductName" :label="$t('materialPre.MaterialName')" width="150">
                    </el-table-column>
                    <el-table-column prop="ES_ProductDec" :label="$t('materialPre.MaterialDec')"
                        :show-overflow-tooltip="true" />
                    <el-table-column prop="ES_ContainName" :label="$t('returnMaterial.eS_ContainName')" width="200">
                    </el-table-column>
                    <el-table-column prop="ES_ReturnMaterialQty" :label="$t('returnMaterial.eS_ReturnMaterialQty')"
                        width="80" />
                    <el-table-column prop="ES_UonName" :label="$t('materialPre.Uom')" width="80" />


                    <el-table-column prop="ES_StatusDel" :label="$t('materialPre.status')" width="100" />
                </el-table>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeEdit">{{ $t("publicText.close") }}</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="previewOrderVisible" :title="'退料打印预览'" width="80%" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handlePreviewOrderClose">
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
    </div>
</template>

<script setup lang="ts">
import {
    GetReturnMaterial,
    GetReturnMaterialNoDel,
    GetContainerToBOM,
    ES_ReturnMaterialCreate,
    QueryMfgOrderBOMOrProductBOM,
    GetReturnMaterialNo,
    DownloadReturnMaterialReport
} from "@/api/materialManage/returnMaterial";
import { QueryMfgOrderInfo } from "@/api/materialManage/materialPre";
import {
    GetWorkCenterQuery
} from "@/api/barCodeManage/batchCreation";
import { calculateColumnsWidth } from "@/utils/tableminWidth";
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
import { printPDF } from "@/utils/excelPrinter";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useUserStoreWithOut } from "@/stores/modules/user";
const userStore = useUserStoreWithOut();
const tableHeight = ref(0);
const tableData = ref([]);
const pageObj = ref({
    pageSize: 50,
    currentPage: 1,
});
const getForm = ref({
    ES_ReturnMaterialNo: "",
    ES_Status: "",
});
const orderList = ref<any[]>([]);
const workCenterList = ref<any>([]);
const returnTypeList = ref([
    {
        ES_ReturnMaterialType: "报废退料",
    },
    {
        ES_ReturnMaterialType: "不合格退料",
    },
    {
        ES_ReturnMaterialType: "正常退料",
    },
    {
        ES_ReturnMaterialType: "其他退料",
    },
]);
const materialList = ref<any[]>([]);
const selectList = ref<any[]>([]);
const addVisible = ref(false);
const addForm = ref({
    MfgorderName: "",
    ES_ReturnMaterialNo: "",
    ES_WorkCenter: "",
    ES_ReturnMaterialType: "",
    ES_Status: "",
    ES_CreateTime: "",
    ES_CreateBy: userStore.getUserInfo,
    listItem: [
        {
            ES_MfgOrderName: "",
            ES_ProductName: "",
            ES_ProductDec: "",
            ES_UonName: "",
            ES_ContainName: "",
            ES_Location: "",
            ES_ReturnMaterialQty: "",
            ES_StatusDel: "",
        },
    ],
});
const props = ref({
    label: "MfgOrderName",
    value: "MfgOrderName",
});
const isLastDetail = computed(() => {
    return (index: number) => {
        return index === addForm.value.listItem.length - 1;
    };
});
const editForm = ref({
    ES_ReturnMaterialNo: "",
    ES_WorkCenter: "",
    ES_ReturnMaterialType: "",
    ES_Status: "",
    listItem: [

    ],
})
const editVisible = ref(false)
const previewOrderVisible = ref(false);
const excelSrc = ref("");
onBeforeMount(() => {
    getScreenHeight();
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
});
const getOrderData = () => {
    let data = {
        MaterialPreplanNO: "",
        MfgorderName: "",
        WorkCenterName: "",
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        CustomerName: "",
        Status: "",
        PlannedStartDate: "",
        PlannedEndDate: "",
    };
    QueryMfgOrderInfo(data).then((res: any) => {
        // console.log(res.content);
        orderList.value = res.content;
    });
};
//获取工作中心
const getWorkCenterData = () => {
    GetWorkCenterQuery({}).then((res: any) => {
        workCenterList.value = res.content;
    });
};
//获取工单bom
const getBomData = (val: any) => {
    QueryMfgOrderBOMOrProductBOM({ MfgorderName: val }).then((res: any) => {
        materialList.value = res.content;
    });
};
//获取退料单号
const getReturnOrder = () => {
    GetReturnMaterialNo({}).then((res: any) => {
        addForm.value.ES_ReturnMaterialNo = res.content[0].ReturnMaterialNo
    })
}
const getData = () => {
    GetReturnMaterial(getForm.value).then((res: any) => {
        tableData.value = res.content;
    });
};

const resetData = () => { };
const openAdd = () => {
    getOrderData();
    getWorkCenterData();
    getReturnOrder()
    addVisible.value = true;
};
const changeOrder = (val: any) => {
    materialList.value = [];
    getBomData(val);
};
const changeMaterial = (val: any) => {
    let material = materialList.value.find((m) => m.MaterialName == val);
    // console.log(material);

    if (material) {
        let item = addForm.value.listItem.find((i: any) => i.ES_ProductName == val);
        if (item) {
            item.ES_ProductDec = material.MaterialDec;
        }
    }

    // console.log( addForm.value.listItem);

};
//新增
const addMaterial = () => {
    addForm.value.listItem.push({
        ES_MfgOrderName: "",
        ES_ProductName: "",
        ES_ProductDec: "",
        ES_UonName: "",
        ES_ContainName: "",
        ES_Location: "",
        ES_ReturnMaterialQty: "",
        ES_StatusDel: "",
    });
};
//删除
const deleteMaterial = (index: number) => {
    addForm.value.listItem.splice(index, 1);
    if (addForm.value.listItem.length === 0) {
        addForm.value.listItem.push({
            ES_MfgOrderName: "",
            ES_ProductName: "",
            ES_ProductDec: "",
            ES_UonName: "",
            ES_ContainName: "",
            ES_Location: "",
            ES_ReturnMaterialQty: "",
            ES_StatusDel: "",
        });
    }
};
const closeAdd = () => {
    addVisible.value = false;
    materialList.value = [];
    addForm.value = {
        MfgorderName: "",
        ES_ReturnMaterialNo: "",
        ES_WorkCenter: "",
        ES_ReturnMaterialType: "",
        ES_Status: "",
        ES_CreateTime: "",
        ES_CreateBy: userStore.getUserInfo,
        listItem: [
            {
                ES_MfgOrderName: "",
                ES_ProductName: "",
                ES_ProductDec: "",
                ES_UonName: "",
                ES_ContainName: "",
                ES_Location: "",
                ES_ReturnMaterialQty: "",
                ES_StatusDel: "",
            },
        ],
    };
};
const changContainName = (row: any) => {
    let data = {
        ContainerName: row.ES_ContainName,
        MfgOrderName: addForm.value.MfgorderName,
    };
    GetContainerToBOM(data).then((res: any) => {
        if (res.success) {
            row.ES_ReturnMaterialQty = res.content[0].Qty
            row.ES_UonName = res.content[0].UOMName
        } else {
            ElMessage({
                type: 'error',
                message: `条码:【${row.ES_ContainName}】${res.msg}`,
                duration: 4500
            })
            row.ES_ContainName = ''
            row.ES_ReturnMaterialQty = ''
            row.ES_UonName = ''
        }
    });
};
const handleAdd = () => {
    addForm.value.listItem = addForm.value.listItem.map(v => {
        return {
            ...v,
            ES_MfgOrderName: addForm.value.MfgorderName
        }
    })
    // console.log(addForm.value);
    ES_ReturnMaterialCreate(addForm.value).then((res: any) => {
        if (res.success) {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "success",
            });
            closeAdd();
            getData();
        } else {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }
    })
};
const handleEdit = (val: any) => {
    editForm.value = {
        ES_ReturnMaterialNo: val.ES_ReturnMaterialNo,
        ES_WorkCenter: val.ES_WorkCenter,
        ES_ReturnMaterialType: val.ES_ReturnMaterialType,
        ES_Status: val.ES_Status,
        listItem: []
    }
    GetReturnMaterialNoDel({ ES_ReturnMaterialNo: val.ES_ReturnMaterialNo }).then((res: any) => {
        editForm.value.listItem = res.content
    })
    editVisible.value = true
};
const closeEdit = () => {
    editVisible.value = false
}
const handleSelectionChange = (val: any) => {
    // console.log(val);
    selectList.value = val;
};
const previewPrint = () => {
    const val = selectList.value[0];
    DownloadReturnMaterialReport(val.ES_ReturnMaterialNo).then((res: any) => {
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
}
const handlePreviewOrderClose = () => {
    previewOrderVisible.value = false;
    excelSrc.value = "";
};
const handlePrintExcel = () => {
    // const html = excelBase64ToHTML(excelSrc.value)
    // printHTML(html)
    printPDF(excelSrc.value)

}
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
        tableHeight.value = window.innerHeight - 180;
    });
};

const columnWidths1 = computed(() => {
    const columns = [
        { label: "工单编码", prop: "MfgOrderName" },
        { label: "工作中心", prop: "WorkCenterName" },
        { label: "备料单号", prop: "MaterialPreplanNo" },
        { label: "产品名称", prop: "ProductName" },
        { label: "产品描述", prop: "ProductDec" },
        { label: "客户名称", prop: "CustomerName" },
        { label: "规格型号", prop: "Specifications" },
        { label: "创建人", prop: "CreateBy" },
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
