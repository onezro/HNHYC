<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :inline="true" size="small" label-width="auto" @submit.native.prevent>
                <el-form-item :label="$t('materialPre.mfgorderName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.MfgorderName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.materialPreplanNO')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.MaterialPreplanNO" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.plannedDate')" class="mb-2">
                    <el-date-picker :shortcuts="shortcuts" v-model="searchDate" value-format="YYYY-MM-DD"
                        type="daterange" range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>

                <el-form-item :label="$t('materialPre.workCenterName')" class="mb-2">
                    <!-- <el-input style="width: 200px" v-model="getForm.WorkCenterName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input> -->
                    <el-select v-model="getForm.WorkCenterName" placeholder="" filterable style="width: 200px" clearable
                        @change="getData">
                        <el-option v-for="w in workCenterList" :label="w.WorkCenterName" :value="w.WorkCenterName"
                            :key="w.WorkCenterName" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('materialPre.customerName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.CustomerName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.productName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.productDec')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductDec" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.specifications')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.Specifications" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('materialPre.status')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.Status" placeholder="" clearable
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
                    <el-button color="#408EFF" size="small" @click="openAdd">{{
                        $t("materialPre.add")
                        }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="danger" size="small" :disabled="selectList.length == 0" @click="openDelete">{{
                        $t("materialPre.delete") }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button color="#626aef" :disabled="selectList.length != 1" size="small" @click="submitPublish">{{
                        $t("materialPre.publish") }}</el-button>
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="warning" :disabled="selectList.length != 1" size="small" @click="submitPrint">{{
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
                <el-table-column prop="MfgOrderName" fixed :label="$t('materialPre.mfgorderName')"
                    :min-width="getColumnWidth1('MfgOrderName')">
                    <!-- <template #default="scope">
                        <span class="underline cursor-pointer text-cyan-800" @click="cellClick(scope.row)">{{
                            scope.row.MfgOrderName }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="WorkCenterName" fixed :label="$t('materialPre.workCenterName')"
                    :min-width="getColumnWidth1('WorkCenterName')" />
                <el-table-column prop="MaterialPreplanNo" fixed :label="$t('materialPre.materialPreplanNO')"
                    :min-width="getColumnWidth1('MaterialPreplanNo')" />
                <el-table-column prop="ProductName" fixed :label="$t('materialPre.productName')"
                    :min-width="getColumnWidth1('ProductName')" />
                <el-table-column prop="ProductDec" :label="$t('materialPre.productDec')"
                    :min-width="getColumnWidth1('ProductDec')" width="100" :show-overflow-tooltip="true" />
                <el-table-column prop="MfgQty" :label="$t('materialPre.mfgQty')" width="80" />
                <el-table-column prop="UOMName" :label="$t('materialPre.Uom')" width="80"/>
                <el-table-column prop="Specifications" :label="$t('materialPre.specifications')"
                    :min-width="getColumnWidth1('Specifications')" />
                <el-table-column prop="Status" :label="$t('materialPre.status')" width="80" />
                <el-table-column prop="CustomerName" :label="$t('materialPre.customerName')"
                    :min-width="getColumnWidth1('CustomerName')" />
                <el-table-column prop="PlannedStartDate" :label="$t('materialPre.plannedDate')" width="150" />
                <el-table-column prop="PlannedCompletionDate" :label="$t('materialPre.plannedCompletionDate')"
                    width="150" />
                <el-table-column prop="UpdateTime" :label="$t('materialPre.updateTime')" width="150" />
                <el-table-column prop="CreateBy" :label="$t('materialPre.createBy')"  :min-width="getColumnWidth1('CreateBy')"  />
                <el-table-column :label="$t('publicText.operation')" width="80" fixed="right" align="center">
                    <template #default="scope">
                        <el-tooltip :content="$t('publicText.detail')" placement="top">
                            <el-button type="warning" icon="Document" size="small"
                                @click.stop="handleEdit(scope.row)"></el-button>
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
                    <el-select-v2 v-model="addForm.MfgorderName" :options="orderList" :props="props" placeholder="" filterable style="width: 200px" clearable
                        @change="changeOrder">
                        <!-- <el-option v-for="p in orderList" :label="p.MfgOrderName" :value="p.MfgOrderName"
                            :key="p.MfgOrderName" /> -->
                    </el-select-v2>
                </el-form-item>
                <el-form-item :label="$t('materialPre.materialPreplanNO')" prop="MaterialPreplanNO">
                     <el-input v-model="addForm.MaterialPreplanNO" placeholder="" disabled style="width: 200px" />
                    <!-- <el-select v-model="addForm.MaterialPreplanNO" placeholder="" filterable style="width: 200px"
                        clearable @change="changeOrder">
                        <el-option v-for="p in preplanNoList" :label="p.MaterialPreplanNo" :value="p.MaterialPreplanNo"
                            :key="p.MaterialPreplanNo" />
                    </el-select> -->
                </el-form-item>
               
                <el-form-item :label="$t('materialPre.productName')" prop="ProductName">
                    <el-input v-model="addForm.ProductName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.productDec')" prop="ProductDec">
                    <el-input v-model="addForm.ProductDec" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.specifications')" prop="Specifications">
                    <el-input v-model="addForm.Specifications" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.customerName')" prop="CustomerName">
                    <el-input v-model="addForm.CustomerName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.workCenterName')" prop="WorkCenterName">
                    <el-input v-model="addForm.WorkCenterName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.mfgQty')" prop="MfgQty">
                    <el-input v-model="addForm.MfgQty" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-table :data="addForm.listItem" size="small" :style="{ width: '100%' }" height="300px"
                    :tooltip-effect="'light'" border fit highlight-current-row>
                    <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    </el-table-column>
                    <el-table-column prop="MaterialName" :label="$t('materialPre.MaterialName')" width="150">
                        <template #default="scope">
                            <el-select v-model="scope.row.MaterialName" placeholder="" filterable style="width: 120px"
                                clearable @change="changeMaterial">
                                <el-option v-for="p in materialList" :label="p.MaterialName" :value="p.MaterialName"
                                    :key="p.MaterialName" />
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="MaterialDec" :label="$t('materialPre.MaterialDec')"  :show-overflow-tooltip="true"/>
                    <el-table-column prop="MaterialSpecifications" :label="$t('materialPre.MaterialSpecifications')" width="80"/>
                    <el-table-column prop="QtyRequired" :label="$t('materialPre.QtyRequire')"  width="100">
                         <template #default="scope">
                            <el-input v-model="scope.row.QtyRequired" placeholder="" style="width: 80px" />
                        </template>
                    </el-table-column>
                      <el-table-column prop="Uom" :label="$t('materialPre.Uom')" width="80"/>
                    <el-table-column prop="WareHouseQty" :label="$t('materialPre.WareHouseQty')" width="100">
                    </el-table-column>
                    <el-table-column prop="ReceivedQty" :label="$t('materialPre.ReceivedQty')" width="100">
                    </el-table-column>
                    <el-table-column prop="Status" :label="$t('materialPre.status')" width="100">
                    </el-table-column>
                    <el-table-column :label="$t('publicText.operation')" width="120" fixed="right" align="center">
                        <template #default="{row, $index}">
                            <el-button type="primary" icon="Plus" size="small"
                                @click.stop="addMaterial" v-if="isLastDetail($index)" ></el-button>
                            <el-button type="danger" icon="Delete" size="small"
                                @click.stop="deleteMaterial($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
               
            </el-form>
             <el-form-item :label="$t('materialPre.Notes')" prop="Notes">
                    <el-input v-model="addForm.Notes" placeholder=""  type="textarea"   :rows="3"/>
                </el-form-item>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAdd">{{
                        $t("publicText.close")
                        }}</el-button>
                    <el-button type="primary" @click="handleAdd">
                        {{ $t("publicText.confirm") }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
         <el-dialog v-model="editVisible" :title="$t('materialPre.detail')" width="75%" align-center :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" @close="closeEdit">
             <el-form ref="editFormRef" :inline="true" :model="editForm" :size="'small'" label-width="auto">
                <el-form-item :label="$t('materialPre.materialPreplanNO')" prop="MaterialPreplanNO">
                    <!-- <el-select v-model="editForm.MaterialPreplanNO" placeholder="" filterable style="width: 200px"
                        clearable @change="changeOrder">
                        <el-option v-for="p in preplanNoList" :label="p.MaterialPreplanNo" :value="p.MaterialPreplanNo"
                            :key="p.MaterialPreplanNo" />
                    </el-select> -->
                     <el-input v-model="editForm.MaterialPreplanNO" placeholder="" disabled style="width: 200px" />
         
                </el-form-item>
                <el-form-item :label="$t('materialPre.mfgorderName')" prop="MfgorderName">
                    <!-- <el-select v-model="editForm.MfgorderName" placeholder="" filterable style="width: 200px" clearable
                        @change="changeOrder">
                        <el-option v-for="p in orderList" :label="p.MfgOrderName" :value="p.MfgOrderName"
                            :key="p.MfgOrderName" />
                    </el-select> -->
                        <el-input v-model="editForm.MfgorderName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.productName')" prop="ProductName">
                    <el-input v-model="editForm.ProductName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.productDec')" prop="ProductDec">
                    <el-input v-model="editForm.ProductDec" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.specifications')" prop="Specifications">
                    <el-input v-model="editForm.Specifications" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.customerName')" prop="CustomerName">
                    <el-input v-model="editForm.CustomerName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.workCenterName')" prop="WorkCenterName">
                    <el-input v-model="editForm.WorkCenterName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('materialPre.mfgQty')" prop="MfgQty">
                    <el-input v-model="editForm.MfgQty" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-table :data="editForm.listItem" size="small" :style="{ width: '100%' }" height="300px"
                    :tooltip-effect="'light'" border fit >
                    <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    </el-table-column>
                    <el-table-column prop="MaterialName" :label="$t('materialPre.MaterialName')" width="150">
                        <!-- <template #default="scope">
                            <el-select v-model="scope.row.MaterialName" placeholder="" filterable style="width: 120px"
                                clearable @change="changeMaterial1">
                                <el-option v-for="p in materialList" :label="p.MaterialName" :value="p.MaterialName"
                                    :key="p.MaterialName" />
                            </el-select>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="MaterialDec" :label="$t('materialPre.MaterialDec')" :show-overflow-tooltip="true"/>
                    <el-table-column prop="MaterialSpecifications" :label="$t('materialPre.MaterialSpecifications')" width="80"/>
                    <el-table-column prop="QtyRequired" :label="$t('materialPre.QtyRequire')" width="100"/>
                    <el-table-column prop="Uom" :label="$t('materialPre.Uom')" width="80"/>
                    <el-table-column prop="WareHouseQty" :label="$t('materialPre.WareHouseQty')" width="100">
                    </el-table-column>
                    <el-table-column prop="ReceivedQty" :label="$t('materialPre.ReceivedQty')" width="100">
                    </el-table-column>
                    <el-table-column prop="Status" :label="$t('materialPre.status')" width="100">
                    </el-table-column>
                    <!-- <el-table-column :label="$t('publicText.operation')" width="120" fixed="right" align="center">
                        <template #default="{row, $index}">
                            <el-button type="primary" icon="Plus" size="small"
                                @click.stop="editAddMaterial" v-if="isLastDetail1($index)" ></el-button>
                            <el-button type="danger" icon="Delete" size="small"
                                @click.stop="editDeleteMaterial($index)"></el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeEdit">{{
                        $t("publicText.close")
                        }}</el-button>
                    <!-- <el-button type="primary" @click="handleEditSubmit">
                        {{ $t("publicText.confirm") }}
                    </el-button> -->
                </span>
            </template>
        </el-dialog>
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
            </el-form>
            <el-table :data="barchTable" size="small" :style="{ width: '100%' }" height="450px"
                :tooltip-effect="'light'" border fit highlight-current-row ref="barchRef"
                @selection-change="handleSelectionChange1">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                </el-table-column>
                <el-table-column prop="ContainerName" :label="$t('batchCreation.BatchName')" />
                <el-table-column prop="Qty" :label="$t('batchCreation.BatchNumber')" width="100" />
                <el-table-column prop="UOMName" :label="$t('batchCreation.BatchUnit')" width="100" />
                <el-table-column prop="ProductName" :label="$t('batchCreation.BatchProduct')" />
                <el-table-column prop="Description" :label="$t('batchCreation.ProductDsc')" width="180"
                    :show-overflow-tooltip="true" />
                <el-table-column prop="SpecName" :label="$t('batchCreation.CurrentProcess')" width="100" />
                <el-table-column prop="Status" :label="$t('batchCreation.CurrentStatus')" width="100" />
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
                    <el-button type="primary" :disabled="resetList.length == 0" @click="resetPrint">
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
            <div style="height: 600px; overflow: auto">
                <VueOfficeExcel :src="excelSrc" style="width: 100%"></VueOfficeExcel>
            </div>

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
import VueOfficeExcel from "@vue-office/excel";
import {
    QueryMaterialPreplanInfo,
    MaterialPreplanCreate,
    MaterialPreplanDelete,
    MaterialPreplanPublic,
    QueryMfgOrderInfo,
    QueryMaterialPreplanDelInfo,
    GetMaterialPreplanNo,
    QueryMfgOrderBOMOrProductBOM,
    DownloadMaterialPreplanNoReport,
} from "@/api/materialManage/materialPre";
import {
    getOrderStatusQuery,
    getCustomerQuery,
    getMfgOrderContainerQuery,
    getPrintQuery,
    AddMfgOrderContainer,
    ReprintMfgOrderContainer,
    GetWorkCenterQuery,
    DownloadMfgOrderReportAsync,
} from "@/api/barCodeManage/batchCreation";
import { calculateColumnsWidth } from "@/utils/tableminWidth";
import { excelBase64ToPdfAndPrint } from "@/utils/excelPrinter";
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
const addVisible = ref(false);
const editVisible = ref(false);
const addForm = ref({
    MaterialPreplanNO: "",
    MfgorderName: "",
    WorkCenterName: "",
    ProductName: "",
    ProductDec: "",
    Specifications: "",
    MfgQty: "",
    CustomerName: "",
    Status: "",
    Notes:'',
    CreateBy: userStore.getUserInfo,
    UpdateTime: "",
    listItem: [
        {
            MaterialPreplanDelName: "",
            MaterialName: "",
            MaterialDec: "",
            MaterialSpecifications: "",
            QtyRequired: "",
            Uom: "",
            WareHouseQty: "",
            ReceivedQty: "",
            Status: "",
        }
    ],
});
const orderList = ref<any[]>([]);
const preplanNoList = ref<any[]>([]);
const materialList = ref<any[]>([]);
const props = ref({
  label: "MfgOrderName",
  value: "MfgOrderName",
});
const editForm = ref({
    MaterialPreplanNO: "",
    MfgorderName: "",
    WorkCenterName: "",
    ProductName: "",
    ProductDec: "",
    Specifications: "",
    MfgQty: "",
    CustomerName: "",
    Status: "",
    CreateBy: userStore.getUserInfo,
    UpdateTime: "",
    listItem: [
        {
            MaterialPreplanDelName: "",
            MaterialName: "",
            MaterialDec: "",
            MaterialSpecifications: "",
            QtyRequired: "",
            Uom: "",
            WareHouseQty: "",
            ReceivedQty: "",
            Status: "",
        }
    ],
});
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
const isLastDetail = computed(() => {
    return (index: number) => {
        return index === addForm.value.listItem.length - 1
    }
})

onBeforeMount(() => {
    getScreenHeight();
    getWorkCenterData();
    // let end: string = setTodayDate(true);
    // let start: string = setLastDate(true);
    // searchDate.value = [start, end];
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
    getOrderStatus();
    getCustomer();
    getOrderData();
    // getPreplanNo()
    getPrint();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
});

const getData = () => {
    QueryMaterialPreplanInfo(getForm.value).then((res: any) => {
        tableData.value = res.content;
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

//获取工作中心
const getWorkCenterData = () => {
    GetWorkCenterQuery({}).then((res: any) => {
        workCenterList.value = res.content;
    });
};
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
//获取工单bom
const getBomData = (val: any) => {
    QueryMfgOrderBOMOrProductBOM({ MfgorderName: val }).then((res: any) => {
        materialList.value = res.content;
    });
};
//获取备料单号
const getPreplanNo = (val:any) => {
    GetMaterialPreplanNo({ MfgorderName: val}).then((res: any) => {
        // preplanNoList.value = res.content;
        addForm.value.MaterialPreplanNO=res.content[0].MaterialPreplanNo
        console.log(addForm.value);
        
    });
};
//
// const getPrintTemp = () => {
//     getPrintTemplateQuery({}).then((res: any) => {
//         printTemplate.value = res.content;
//     });
// };


const resetData = () => {
    getForm.value = {
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
    searchDate.value = [];
    searchDate2.value = [];
    searchDate3.value = [];
    searchDate4.value = [];
    tableData.value = [];
    getData();
};

const openAdd = () => {
    addVisible.value = true;
};

const closeAdd = () => {
    addVisible.value = false
    addForm.value = {
        MaterialPreplanNO: "",
        MfgorderName: "",
        WorkCenterName: "",
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        MfgQty: "",
        CustomerName: "",
        Status: "",
        Notes:'',
        CreateBy: userStore.getUserInfo,
        UpdateTime: "",
        listItem: [
            {
                MaterialPreplanDelName: "",
                MaterialName: "",
                MaterialDec: "",
                MaterialSpecifications: "",
                QtyRequired: "",
                Uom: "",
                WareHouseQty: "",
                ReceivedQty: "",
                Status: "",
            }
        ],
    };
     materialList.value=[]
}
const changeOrder = (val: any) => {
    materialList.value=[]
    let order = orderList.value.find((o) => o.MfgOrderName == val);
    if (order) {
        addForm.value.ProductName = order.ProductName;
        addForm.value.ProductDec = order.ProductDec;
        addForm.value.Specifications = order.ES_MaterialSpecifications;
        addForm.value.CustomerName = order.CustomerName;
        addForm.value.WorkCenterName = order.WorkCenterName;
        addForm.value.MfgQty = order.MfgQty;
    } else {
        addForm.value.ProductName = "";
        addForm.value.ProductDec = "";
        addForm.value.Specifications = "";
        addForm.value.CustomerName = "";
        addForm.value.WorkCenterName = "";
        addForm.value.MfgQty = "";
    }
    getBomData(val);
    getPreplanNo(val)
    // QueryMfgOrderBOMOrProductBOM({ MfgorderName: val }).then((res: any) => {
    //     addForm.value.listItem = res.content.map((item: any) => {
    //         return {
    //             MaterialPreplanDelName: "",
    //             MaterialName: item.MaterialName,
    //             MaterialDec: item.MaterialDec,
    //             MaterialSpecifications: item.MaterialSpecifications,
    //             QtyRequired: item.QtyRequired,
    //             Uom: "",
    //             WareHouseQty: "",
    //             ReceivedQty: "",
    //             Status: "",
    //         };
    //     });
    // });
};
const changeMaterial = (val: any) => {
    let material = materialList.value.find((m) => m.MaterialName == val);
    console.log(material);
    
    if (material) {
        let item = addForm.value.listItem.find((i: any) => i.MaterialName == val);
        if (item) {
            item.MaterialDec = material.MaterialDec;
            item.MaterialSpecifications = material.MaterialSpecifications;
            item.QtyRequired = material.QtyRequire;
            item.Uom=material.UOMName
        }
    }
    console.log(addForm.value.listItem);
    
};
const addMaterial = () => {
    addForm.value.listItem.push( {
        MaterialPreplanDelName: "",
        MaterialName: "",
        MaterialDec: "",
        MaterialSpecifications: "",
        QtyRequired: "",
        Uom: "",
        WareHouseQty: "",
        ReceivedQty: "",
        Status: "",
    });
};
const deleteMaterial = (index: number) => {
    addForm.value.listItem.splice(index, 1);
    if (addForm.value.listItem.length === 0) {
        addForm.value.listItem.push({
            MaterialPreplanDelName: "",
            MaterialName: "",
            MaterialDec: "",
            MaterialSpecifications: "",
            QtyRequired: "",
            Uom: "",
            WareHouseQty: "",
            ReceivedQty: "",
            Status: "",
        });
    }
};
const handleAdd = () => {
    console.log(addForm.value);

    MaterialPreplanCreate(addForm.value).then((res: any) => {
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
}
const closeEdit = () => {
    editVisible.value = false
    editForm.value = {
        MaterialPreplanNO: "",
        MfgorderName: "",
        WorkCenterName: "",
        ProductName: "",
        ProductDec: "",
        Specifications: "",
        MfgQty: "",
        CustomerName: "",
        Status: "",
        CreateBy: userStore.getUserInfo,
        UpdateTime: "",
        listItem: []
    };
     materialList.value=[]
}
const isLastDetail1 = computed(() => {
    return (index: number) => {
        return index === editForm.value.listItem.length - 1
    }
})
const changeMaterial1= (val: any) => {
    let material = materialList.value.find((m) => m.MaterialName == val);
    if (material) {
        let item = editForm.value.listItem.find((i: any) => i.MaterialName == val);
        if (item) {
            item.MaterialDec = material.MaterialDec;
            item.MaterialSpecifications = material.MaterialSpecifications;
            item.QtyRequired = material.QtyRequire;
        }
    }
};
const editAddMaterial=()=>{
    editForm.value.listItem.push( {
        MaterialPreplanDelName: "",
        MaterialName: "",
        MaterialDec: "",
        MaterialSpecifications: "",
        QtyRequired: "",
        Uom: "",
        WareHouseQty: "",
        ReceivedQty: "",
        Status: "",
    });
}
const editDeleteMaterial=(index:number)=>{
    editForm.value.listItem.splice(index, 1);
    if (editForm.value.listItem.length === 0) {
        editForm.value.listItem.push({
            MaterialPreplanDelName: "",
            MaterialName: "",
            MaterialDec: "",
            MaterialSpecifications: "",
            QtyRequired: "",
            Uom: "",
            WareHouseQty: "",
            ReceivedQty: "",
            Status: "",
        });
    }
}
const handleEditSubmit=()=>{
    console.log(editForm.value);
    // editForm.value.listItem= editForm.value.listItem.filter(v=>v.MaterialName=='')
    MaterialPreplanCreate(editForm.value).then((res: any) => {
        if (res.success) {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "success",
            });
            // closeAdd();
            closeEdit()
            getData();
        } else {
            ElNotification({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }
    })
}
const openDelete = () => {
    ElMessageBox.confirm(
        t("publicText.confirm") + t("publicText.delete"),
        t("publicText.confirm") + t("publicText.operation"),
        {
            confirmButtonText: t("publicText.confirm"),
            cancelButtonText: t("publicText.cancel"),
            type: "warning",
        },
    )
        .then(() => {
            let data = [];
            data = selectList.value.map((item) => {
                return {
                    MaterialPreplanNo: item.MaterialPreplanNo,
                };
            });
            MaterialPreplanDelete(data).then((res: any) => {
                if (res.success) {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "success",
                    });
                    getData();
                    selectList.value = [];
                } else {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        })
        .catch(() => {
            // on cancel
            ElMessage({
                title: t("message.tipTitle"),
                message: t("publicText.cancel"),
                type: "info",
            });
        });
};
const submitPublish = () => {
    let data = {
        MaterialPreplanNO: selectList.value[0].MaterialPreplanNo,
    };
    ElMessageBox.confirm(
        t("publicText.confirm") +
        t("materialPre.publish") +
        "：" +
        selectList.value[0].MaterialPreplanNo,
        t("publicText.confirm") + t("publicText.operation"),
        {
            confirmButtonText: t("publicText.confirm"),
            cancelButtonText: t("publicText.cancel"),
            type: "warning",
        },
    )
        .then(() => {
            MaterialPreplanPublic(data).then((res: any) => {
                if (res.success) {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "success",
                    });
                    getData();
                    selectList.value = [];
                } else {
                    ElNotification({
                        title: t("message.tipTitle"),
                        message: res.msg,
                        type: "error",
                    });
                }
            });
        })
        .catch(() => {
            // on cancel
            ElMessage({
                title: t("message.tipTitle"),
                message: t("publicText.cancel"),
                type: "info",
            });
        });
};
const submitPrint = () => {
    // console.log("print");
    ElMessage({
        title: t("message.tipTitle"),
        message: "敬请期待",
        type: "warning",
    });
};
const handleEdit = (row: any) => {
    editForm.value ={
        MaterialPreplanNO: row.MaterialPreplanNo,
        MfgorderName: row.MfgOrderName,
        WorkCenterName: row.WorkCenterName,
        ProductName: row.ProductName,
        ProductDec: row.ProductDec,
        Specifications: row.Specifications,
        CustomerName: row.CustomerName,
        MfgQty: row.MfgQty,
        Status: row.Status,
        CreateBy: userStore.getUserInfo,
        UpdateTime: "",
        listItem: [],
    }
    QueryMaterialPreplanDelInfo({ MaterialPreplanNO: row.MaterialPreplanNo }).then((res: any) => {
        editForm.value.listItem = res.content.map((item: any) => {
            return {
                MaterialPreplanDelName: item.ES_MaterialPreplanDelName,
                MaterialName: item.ES_MaterialName,
                MaterialDec: item.ES_MaterialDec,
                MaterialSpecifications: item.ES_MaterialSpecifications,
                QtyRequired: item.ES_QtyRequired,
                Uom: item.UOMName,
                WareHouseQty: item.WareHouseQty,
                ReceivedQty: item.ES_ReceivedQty,
                Status: item.StatusDel,
            };
        });
    });
    getBomData(row.MfgOrderName);
    editVisible.value = true;
};

// const submitPrint = () => {
//     batchPrintForm.value.mfgOrderStartLists = selectList.value.map((item) => {
//         return {
//             MfgOrderName: item.MfgOrderName,
//             ProductName: item.ProductName,
//             UserName: userStore.getUserInfo,
//         };
//     });

//     AddMfgOrderContainer(batchPrintForm.value).then((res: any) => {
//         if (res.success) {
//             ElNotification({
//                 title: t("message.tipTitle"),
//                 message: res.msg,
//                 type: "success",
//             });
//             batchPrintForm.value.mfgOrderStartLists = [];
//             multipleTableRef.value!.clearSelection();
//         } else {
//             ElNotification({
//                 title: t("message.tipTitle"),
//                 message: res.msg,
//                 type: "error",
//             });
//         }
//     });
// };
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
};
const closePrint = () => {
    resetFormRef.value.resetFields();
    printVisible.value = false;
    // resetPrintForm.value.PrintTemplate = ''
    // resetPrintForm.value.Printer = ''
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
            const base64Data =
                "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
                res.content.FileData;
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
    excelBase64ToPdfAndPrint(excelSrc.value);
};
const printHTML = (htmlContent: string) => {
    // 1. 创建隐藏 iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    // 2. 写入 HTML 内容
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
    }

    // 3. 等待内容加载后打印
    iframe.onload = () => {
        // 延迟确保样式渲染
        setTimeout(() => {
            iframe.contentWindow?.print();
        }, 200);
    };

    // 4. 清理（延迟释放，防止打印未触发）
    setTimeout(() => {
        if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
        }
    }, 30000); // 30秒后移除
};

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
        { label: "工作中心", prop: "WorkCenterName" },
        { label: "备料单号", prop: "MaterialPreplanNo" },
        { label: "产品名称", prop: "ProductName" },
        { label: "产品描述", prop: "ProductDec" },
        { label: "客户名称", prop: "CustomerName" },
        { label: "规格型号", prop: "Specifications" },
        {label: "创建人", prop: 'CreateBy'}
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
