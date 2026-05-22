<template>
  <div class="p-2">
    <el-card shadow="always" :body-style="{ padding: '8px' }">
      <el-form ref="formRef" :inline="true" size="small" label-width="auto" @submit.native.prevent>
        <el-form-item :label="t('reportBoard.productTraceBack.OrderNumber')" prop="OrderNo" class="mb-2">
          <el-input v-model="getForm.OrderNo" placeholder="" clearable @clear="getData" @keyup.enter.native="getData"
            style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.ProductName')" prop="ProductName" class="mb-2">
          <el-input v-model="getForm.ProductName" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.ProductDec')" prop="ProductDescription" class="mb-2">
          <el-input v-model="getForm.ProductDescription" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.CustomerName')" prop="Customer" class="mb-2">
          <el-input v-model="getForm.CustomerName" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.BoxBarcode')" prop="ContainerName" class="mb-2">
          <el-input v-model="getForm.ContainerName" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.StartDate')" prop="PlanStartDate" class="mb-2">
          <el-date-picker :shortcuts="shortcuts" v-model="searchDate1" value-format="YYYY-MM-DD" type="daterange"
            range-separator="-" size="small" style="width: 190px" :clearable="false" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.EndDate')" prop="PlanEndDate" class="mb-2">
          <el-date-picker :shortcuts="shortcuts" v-model="searchDate2" value-format="YYYY-MM-DD" type="daterange"
            range-separator="-" size="small" style="width: 190px" :clearable="false" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.BatchNumber')" prop="LotNumber" class="mb-2">
          <el-input v-model="getForm.LotNumber" placeholder="" clearable @clear="getData" @keyup.enter.native="getData"
            style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.SnBarcode')" prop="SerialNumber" class="mb-2">
          <el-input v-model="getForm.SerialNumber" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="MfgOrderName" class="mb-2">
          <el-input v-model="getForm.MfgOrderName" placeholder="" clearable @clear="getData"
            @keyup.enter.native="getData" style="width: 190px" />
        </el-form-item>
        <el-form-item class="mb-2">
          <el-button :type="'primary'" @click="getData">{{ t("publicText.query") }}</el-button>
          <el-button :type="'primary'" @click="resetForm">{{ t("publicText.reset") }}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData.slice(
        (pageObj.currentPage - 1) * pageObj.pageSize,
        pageObj.currentPage * pageObj.pageSize,
      )
        " size="small" :style="{ width: '100%' }" :height="tableHeight" :tooltip-effect="'dark'" border fit
        @cell-click="cellClick" highlight-current-row>
        <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
          <template #default="scope">
            <span>{{
              scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" fixed prop="ES_OrderNo"
          :min-width="getColumnWidth1('ES_OrderNo')" />
        <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" fixed prop="CustomerName"
          :min-width="getColumnWidth1('CustomerName')" />
        <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="MfgOrderName"
          :min-width="getColumnWidth1('MfgOrderName')" />
        <el-table-column :label="t('reportBoard.productTraceBack.BatchNumber')" prop="DefaultLot"
          :min-width="getColumnWidth1('DefaultLot')" />
        <el-table-column :label="t('reportBoard.productTraceBack.ProductName')" prop="ProductName"
          :min-width="getColumnWidth1('ProductName')" />
        <el-table-column :label="t('reportBoard.productTraceBack.ProductDec')" prop="ProductDec"
          :min-width="getColumnWidth1('ProductDec')" />
        <el-table-column :label="t('reportBoard.productTraceBack.Specification')" prop="ES_MaterialSpecifications"
          :min-width="getColumnWidth1('ES_MaterialSpecifications')" />
        <el-table-column :label="t('reportBoard.productTraceBack.Unit')" prop="UOMName"
          :min-width="getColumnWidth1('UOMName')" />
        <el-table-column :label="t('reportBoard.productTraceBack.ProductBoxBarcode')" prop="ContainerName_List"
          :min-width="getColumnWidth1('ContainerName_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.SnBarcode')" prop="SN_List"
          :min-width="getColumnWidth1('SN_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="Qty"
          :min-width="getColumnWidth1('Qty')" />
        <!-- <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialBarcode')"
          prop="IssueContainerName_List" :min-width="getColumnWidth1('IssueContainerName_List')" /> -->
        <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialCode')" prop="IssueProductName_List"
          :min-width="getColumnWidth1('IssueProductName_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialName')" prop="IssueProductDec_List"
          :min-width="getColumnWidth1('IssueProductDec_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialProductType')"
          prop="IssueProductTypeName_List" :min-width="getColumnWidth1('IssueProductTypeName_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialSpec')" prop="IssueSpecifications_List"
          :min-width="getColumnWidth1('IssueSpecifications_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.RawMaterialBatch')" prop="IssueLotNumber_List"
          :min-width="getColumnWidth1('IssueLotNumber_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.OriginalQty')" prop="IssueQty_List"
          :min-width="getColumnWidth1('IssueQty_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.MaterialInputQty')" prop="skipqty_List"
          :min-width="getColumnWidth1('skipqty_List')" />
        <el-table-column :label="t('reportBoard.productTraceBack.StartDate')" prop="MoveInDATE"
          :min-width="getColumnWidth1('MoveInDATE')" />
        <el-table-column :label="t('reportBoard.productTraceBack.EndDate')" prop="MoveStdDATE"
          :min-width="getColumnWidth1('MoveStdDATE')" />

        <template #empty>
          <div class="flex items-center justify-center h-100%">
            <el-empty />
          </div>
        </template>
      </el-table>
      <div class="mt-2 mb-1">
        <el-pagination :size="'small'" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :pager-count="5" :current-page="pageObj.currentPage" :page-size="pageObj.pageSize"
          :page-sizes="[30, 50, 100, 200, 300]" layout="total,sizes, prev, pager, next" :total="tableData.length">
        </el-pagination>
      </div>
      <el-tabs v-model="activeName" type="border-card" @tab-change="tabChange">
        <el-tab-pane :label="t('reportBoard.productTraceBack.Material')" name="first">
          <el-table :data="tableData2" style="width: 100%" size="small" border fit :height="tableHeight2" stripe>
            <el-table-column type="index" label="序号" width="60" fixed />
            <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" fixed prop="ParentOrderNo"
              :min-width="getColumnWidth2('ParentOrderNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" fixed prop="ParentCustomerName"
              :min-width="getColumnWidth2('ParentCustomerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="ParentMfgOrderName"
              :min-width="getColumnWidth2('ParentMfgOrderName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ProductName')" prop="ParentProductName"
              :min-width="getColumnWidth2('ParentProductName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ProductDec')" prop="ParentProductDec"
              :min-width="getColumnWidth2('ParentProductDec')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Specification')" prop="ParentSpecification"
              :min-width="getColumnWidth2('ParentSpecification')" />
            <el-table-column :label="t('reportBoard.productTraceBack.BatchNumber')" prop="DefaultLot"
              :min-width="getColumnWidth2('DefaultLot')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="Qty"
              :min-width="getColumnWidth2('Qty')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Unit')" prop="UOMName"
              :min-width="getColumnWidth2('UOMName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ChildContainerName')" prop="ChildContainerName"
              :min-width="getColumnWidth2('ChildContainerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.FinisProductCode')" prop="ChildProductName"
              :min-width="getColumnWidth2('ChildProductName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.FinisProductName')" prop="ChildProductDec"
              :min-width="getColumnWidth2('ChildProductDec')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Specification')" prop="ChildSpecification"
              :min-width="getColumnWidth2('ChildSpecification')" />
            <el-table-column :label="t('reportBoard.productTraceBack.SnBarcode')" prop="SN_List"
              :min-width="getColumnWidth2('SN_List')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="IssueQty"
              :min-width="getColumnWidth2('IssueQty')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Unit')" prop="UOMName1"
              :min-width="getColumnWidth2('IssueSpecifications_List')" />
            <el-table-column :label="t('reportBoard.productTraceBack.BatchNumber')" prop="ChildLotNumber"
              :min-width="getColumnWidth2('IssueLotNumber_List')" />
            <el-table-column :label="t('reportBoard.productTraceBack.StartDate')" prop="MoveInDATE"
              :min-width="getColumnWidth2('MoveInDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.EndDate')" prop="MoveStdDATE"
              :min-width="getColumnWidth2('MoveStdDATE')" />
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('reportBoard.productTraceBack.Process')" name="second">
          <el-table :data="tableData3" style="width: 100%" size="small" border fit :height="tableHeight2" stripe>
            <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="60" />
            <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" fixed prop="ParentOrderNo"
              :min-width="getColumnWidth3('ParentOrderNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" fixed prop="ParentCustomerName"
              :min-width="getColumnWidth3('ParentCustomerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="ParentMfgOrderName"
              :min-width="getColumnWidth3('ParentMfgOrderName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ProcessRoute')" prop="WorkflowName"
              :min-width="getColumnWidth3('WorkflowName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Process')" prop="WorkflowStepName"
              :min-width="getColumnWidth3('WorkflowStepName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ProductName')" prop="ParentProductName"
              :min-width="getColumnWidth3('ParentProductName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.ProductDec')" prop="ParentProductDec"
              :min-width="getColumnWidth3('ParentProductDec')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Specification')" prop="ParentSpecification"
              :min-width="getColumnWidth3('ParentSpecification')" />
            <el-table-column :label="t('reportBoard.productTraceBack.StartDate')" prop="MoveInDATE"
              :min-width="getColumnWidth3('MoveInDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.EndDate')" prop="MoveStdDATE"
              :min-width="getColumnWidth3('MoveStdDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="Qty"
              :min-width="getColumnWidth3('Qty')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Operator')" prop="EmployeeName"
              :min-width="getColumnWidth3('EmployeeName')" />
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('reportBoard.productTraceBack.Quality')" name="third">
          <el-table :data="tableData3" style="width: 100%" size="small" border fit :height="tableHeight2" stripe
            @row-click="inspectionRowClick">
            <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="60" />
            <el-table-column :label="t('reportBoard.productTraceBack.InspectionNo')" prop="InspectionNo"
              :min-width="getColumnWidth3('InspectionNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.InspectionType')" prop="InspectionType"
              :min-width="getColumnWidth3('InspectionType')" />
            <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" fixed prop="OrderNo"
              :min-width="getColumnWidth3('OrderNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" fixed prop="CustomerName"
              :min-width="getColumnWidth3('CustomerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="MfgorderName"
              :min-width="getColumnWidth3('MfgorderName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.InspectionResult')" prop="InspectionResult"
              :min-width="getColumnWidth3('InspectionResult')" />
            <el-table-column :label="t('reportBoard.productTraceBack.RelatedWorkOrder')" prop="MfgorderName"
              :min-width="getColumnWidth3('MfgorderName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.InspectionTime')" prop="InspectionTime"
              :min-width="getColumnWidth3('InspectionTime')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Inspector')" prop="Creator"
              :min-width="getColumnWidth3('Creator')" />
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('reportBoard.productTraceBack.Personnel')" name="fourth">
          <el-table :data="tableData4" style="width: 100%" size="small" border fit :height="tableHeight2" stripe>
            <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="60" />
            <el-table-column :label="t('reportBoard.productTraceBack.Personnel')" prop="EmployeeName"
              :min-width="getColumnWidth4('EmployeeName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" prop="ParentOrderNo"
              :min-width="getColumnWidth4('ParentOrderNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" prop="ParentCustomerName"
              :min-width="getColumnWidth4('ParentCustomerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="ParentMfgOrderName"
              :min-width="getColumnWidth4('ParentMfgOrderName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Process')" prop="WorkflowStepName"
              :min-width="getColumnWidth4('WorkflowStepName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.StartDate')" prop="MoveInDATE"
              :min-width="getColumnWidth4('MoveInDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.EndDate')" prop="MoveStdDATE"
              :min-width="getColumnWidth4('MoveStdDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="Qty"
              :min-width="getColumnWidth4('Qty')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Equipment')" prop="ResourceName"
              :min-width="getColumnWidth4('ResourceName')" />
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="t('reportBoard.productTraceBack.Equipment')" name="fifth">
          <el-table :data="tableData5" style="width: 100%" size="small" border fit :height="tableHeight2" stripe
            @row-click="equipmentRowClick">
            <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="60" />
            <el-table-column :label="t('reportBoard.productTraceBack.DeviceCode')" prop="ResourceName"
              :min-width="getColumnWidth5('ResourceName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.OrderNumber')" prop="ParentOrderNo"
              :min-width="getColumnWidth5('ParentOrderNo')" />
            <el-table-column :label="t('reportBoard.productTraceBack.CustomerName')" prop="ParentCustomerName"
              :min-width="getColumnWidth5('ParentCustomerName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.MfgOrderName')" prop="ParentMfgOrderName"
              :min-width="getColumnWidth5('ParentMfgOrderName')" />
            <el-table-column label="设备名称" prop="ResourceName" :min-width="getColumnWidth5('ResourceName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Process')" prop="WorkflowStepName"
              :min-width="getColumnWidth5('WorkflowStepName')" />
            <el-table-column :label="t('reportBoard.productTraceBack.StartDate')" prop="MoveInDATE"
              :min-width="getColumnWidth5('MoveInDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.EndDate')" prop="MoveStdDATE"
              :min-width="getColumnWidth5('MoveStdDATE')" />
            <el-table-column :label="t('reportBoard.productTraceBack.Qty')" prop="Qty"
              :min-width="getColumnWidth5('Qty')" />
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty />
              </div>
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 设备参数弹窗 -->
    <el-dialog v-model="paramDialogVisible" title="设备参数" width="600px" destroy-on-close>
      <el-table :data="paramData" size="small" border height="400">
        <el-table-column :label="t('reportBoard.productTraceBack.ParameterName')" prop="DataName" />
        <el-table-column label="参数值" prop="DataValue" />
      </el-table>
      <template #footer>
        <el-button @click="paramDialogVisible = false">{{ t("publicText.cancel") }}</el-button>
        <el-button type="primary" @click="paramDialogVisible = false">{{ t("publicText.confirm") }}</el-button>
      </template>
    </el-dialog>
    
    <!-- 首检/巡检检验明细弹窗 -->
    <el-dialog v-model="inspectionDialogVisible" :title="t('reportBoard.productTraceBack.InspectionDetail')"
      destroy-on-close width="80%">
      <el-table :data="inspectionDetailData" size="small" border height="400">
        <el-table-column :label="t('reportBoard.productTraceBack.InspectItem')" prop="PROJECTNAME" />
        <el-table-column :label="t('reportBoard.productTraceBack.ActualSituation')" prop="OBSERVEDVALUE" />
        <el-table-column :label="t('reportBoard.productTraceBack.InspectionResult')" prop="INSPECTIONRESULT" />
        <el-table-column :label="t('reportBoard.productTraceBack.Inspector')" prop="INSPECTIONBY" />
      </el-table>
      <template #footer>
        <el-button @click="inspectionDialogVisible = false">{{ t("publicText.close") }}</el-button>
      </template>
    </el-dialog>

    <!-- OQC检验明细弹窗 -->
    <el-dialog v-model="oqcDialogVisible" title="OQC检验明细" destroy-on-close width="80%">
      <el-row :gutter="20">
        <el-col :span="14">
          <el-table 
            :data="oqcMainData" 
            size="small" 
            border 
            height="400" 
            @row-click="oqcMainRowClick" 
            highlight-current-row
          >
            <el-table-column label="桶编码/批次" prop="ContainerName" />
            <el-table-column label="SN码" prop="SN" />
            <el-table-column label="检验结果" prop="JudgmentResult"  width="80"/>
            <el-table-column label="检验员" prop="Inspector" />
          </el-table>
        </el-col>
        <el-col :span="10">
          <el-table :data="oqcDetailData" size="small" border height="400">
            <el-table-column label="检测项" prop="InspectionType" />
            <el-table-column label="检验内容" prop="ProjectName" />
            <el-table-column label="实际情况" prop="TargetValue" />
          </el-table>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="oqcDialogVisible = false">{{ t("publicText.close") }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  GetReverseTraceabilityMainQuery,
  GetReverseTraceabilityMaterialQuerys,
  GetReverseTraceabilityProcessQuerys,
  GetReverseTraceabilityEmployeeQuerys,
  GetReverseTraceabilityResourceQuerys,
  GetReverseTraceabilityResourceDelQuerys,
  GetReverseInspectionQuerys,
  GetReverseInspectionDelQuerys,
  GetShipmentInspectionQuery
} from "@/api/reportsBoards/productTraceBack";
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
import { shortcuts } from "@/utils/dataMenu";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import { useUserStoreWithOut } from "@/stores/modules/user";
const userStore = useUserStoreWithOut();
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const tableHeight = ref(0);
const tableData = ref([]);

const pageObj = reactive({
  currentPage: 1,
  pageSize: 50,
});
const getForm = ref({
  OrderNo: "",
  MfgOrderName: "",
  ProductName: "",
  ProductDescription: "",
  CustomerName: "",
  LotNumber: "",
  ContainerName: "",
  SerialNumber: "",
  StartTime: "",
  EndTime: "",
  FinshStartTime: "",
  FinshEndTime: "",
});
const addVisible = ref(false);
const editVisible = ref(false);
const addForm = ref({});
const editForm = ref({});
const tableHeight2 = ref(0);
const tableData2 = ref([]);
const searchDate1 = ref([]);
const searchDate2 = ref([]);
const activeName = ref("first");
const tableData3 = ref([
]);
const tableData4 = ref([]);
const tableData5 = ref([]);

// 设备参数弹窗
const paramDialogVisible = ref(false);
const paramData = ref([]);
const getTabForm = ref({
  OrderNo: "",
  MfgOrderName: "",
});
// 检验明细弹窗（首检/巡检）
const inspectionDialogVisible = ref(false)
const inspectionDetailData = ref([])

// OQC检验明细弹窗
const oqcDialogVisible = ref(false)
const oqcMainData = ref([])
const oqcDetailData = ref([])

watch(
  () => searchDate1.value,
  (newVal: any, oldVal: any) => {
    if (newVal === null) {
      getForm.value.StartTime = "";
      getForm.value.EndTime = "";
      return;
    }
    if (newVal !== oldVal) {
      getForm.value.StartTime = newVal[0] + " 00:00:00";
      getForm.value.EndTime = newVal[1] + " 23:59:59";
    }
  },
);
watch(
  () => searchDate2.value,
  (newVal: any, oldVal: any) => {
    if (newVal === null) {
      getForm.value.FinshStartTime = "";
      getForm.value.FinshEndTime = "";
      return;
    }
    if (newVal !== oldVal) {
      getForm.value.FinshStartTime = newVal[0] + " 00:00:00";
      getForm.value.FinshEndTime = newVal[1] + " 23:59:59";
    }
  },
);

onBeforeMount(() => {
  getScreenHeight();
});
onMounted(() => {
  window.addEventListener("resize", getScreenHeight);
  getData();
});
onBeforeUnmount(() => {
  window.addEventListener("resize", getScreenHeight);
});

const getData = () => {
  GetReverseTraceabilityMainQuery(getForm.value).then((res: any) => {
    tableData.value = res.content || [];
  });
};

const resetForm = () => {
  getForm.value = {
    OrderNo: "",
    MfgOrderName: "",
    ProductName: "",
    ProductDescription: "",
    CustomerName: "",
    LotNumber: "",
    ContainerName: "",
    SerialNumber: "",
    StartTime: "",
    EndTime: "",
    FinshStartTime: "",
    FinshEndTime: "",
  };
  searchDate1.value = [];
  searchDate2.value = [];
  getData();
};

const cellClick = (row: any) => {
  getTabForm.value = {
    OrderNo: row.ES_OrderNo,
    MfgOrderName: row.MfgOrderName,
  };
  switch (activeName.value) {
    case "first":
      GetReverseTraceabilityMaterialQuerys(getTabForm.value).then((res: any) => {
        tableData2.value = res.content || [];
      });
      break;
    case "second":
      GetReverseTraceabilityProcessQuerys(getTabForm.value).then((res: any) => {
        tableData3.value = res.content || [];
      });
      break;
    case "third":
      GetReverseInspectionQuerys(getTabForm.value).then((res: any) => {
        tableData3.value = res.content || [];
      });
      break;
    case "fourth":
      GetReverseTraceabilityEmployeeQuerys(getTabForm.value).then((res: any) => {
        tableData4.value = res.content || [];
      });
      break;
    case "fifth":
      GetReverseTraceabilityResourceQuerys(getTabForm.value).then((res: any) => {
        tableData5.value = res.content || [];
      });
      break;
    default:
      break;
  }
};
const tabChange = (tab: any) => {
  console.log(tab);

  switch (tab) {
    case "first":
      GetReverseTraceabilityMaterialQuerys(getTabForm.value).then((res: any) => {
        tableData2.value = res.content || [];
      });
      break;
    case "second":
      GetReverseTraceabilityProcessQuerys(getTabForm.value).then((res: any) => {
        tableData3.value = res.content || [];
      });
      break;
    case "third":
      GetReverseInspectionQuerys(getTabForm.value).then((res: any) => {
        tableData3.value = res.content || [];
      });
    case "fourth":
      GetReverseTraceabilityEmployeeQuerys(getTabForm.value).then((res: any) => {
        tableData4.value = res.content || [];
      });
      break;
    case "fifth":
      GetReverseTraceabilityResourceQuerys(getTabForm.value).then((res: any) => {
        tableData5.value = res.content || [];
      });
      break;
    default:
      break;
  }
};

const equipmentRowClick = (row: any) => {
  const data = {
   ContainerName:row.ContainerName
  };
  GetReverseTraceabilityResourceDelQuerys(data).then((res: any) => {
    paramData.value = res.content || [];
    paramDialogVisible.value = true;
  });
};

// 品质 Tab 行点击事件
const inspectionRowClick = (row: any) => {
  const params = { InspectionNo: row.InspectionNo }
  if (row.InspectionType === '首检' || row.InspectionType === '巡检') {
    GetReverseInspectionDelQuerys(params).then((res: any) => {
      inspectionDetailData.value = res.content || []
      inspectionDialogVisible.value = true
    })
  } else if (row.InspectionType === 'OQC') {
    GetShipmentInspectionQuery(params).then((res: any) => {
      oqcMainData.value = res.content || []
      if (oqcMainData.value.length > 0) {
        // 默认选中第一行并展示其明细
        oqcMainRowClick(oqcMainData.value[0])
      } else {
        oqcDetailData.value = []
      }
      oqcDialogVisible.value = true
    }).catch(() => {
      ElMessage.error('获取OQC明细失败')
    })
  } else {
    ElMessage.warning('暂不支持该检验类型的明细查看')
  }
}

// OQC弹窗左边表格行点击事件
const oqcMainRowClick = (row: any) => {
  oqcDetailData.value = row.DetailData || []
}

const addCancel = () => {
  addVisible.value = false;
};
const addSubmit = () => { };
const editCancel = () => {
  editVisible.value = false;
};
const editSubmit = () => { };
const handleSizeChange = (val: any) => {
  pageObj.pageSize = val;
};
const handleCurrentChange = (val: any) => {
  pageObj.currentPage = val;
};
const getScreenHeight = () => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 500;
    tableHeight2.value = window.innerHeight - tableHeight.value - 320;
  });
};

const columnWidths1 = computed(() => {
  const columns = [
    { label: t("reportBoard.productTraceBack.OrderNumber"), prop: "ES_OrderNo" },
    { label: t("reportBoard.productTraceBack.CustomerName"), prop: "CustomerName" },
    { label: t("reportBoard.productTraceBack.MfgOrderName"), prop: "MfgOrderName" },
    { label: t("reportBoard.productTraceBack.BatchNumber"), prop: "DefaultLot" },
    { label: t("reportBoard.productTraceBack.ProductName"), prop: "ProductName" },
    { label: t("reportBoard.productTraceBack.ProductDec"), prop: "ProductDec" },
    { label: t("reportBoard.productTraceBack.Specification"), prop: "ES_MaterialSpecifications" },
    { label: t("reportBoard.productTraceBack.Unit"), prop: "UOMName" },
    { label: t("reportBoard.productTraceBack.ProductBoxBarcode"), prop: "ContainerName_List" },
    { label: t("reportBoard.productTraceBack.SnBarcode"), prop: "SN_List" },
    { label: t("reportBoard.productTraceBack.Qty"), prop: "Qty" },
    { label: t("reportBoard.productTraceBack.RawMaterialBarcode"), prop: "IssueContainerName_List" },
    { label: t("reportBoard.productTraceBack.RawMaterialCode"), prop: "IssueProductName_List" },
    { label: t("reportBoard.productTraceBack.RawMaterialName"), prop: "IssueProductDec_List" },
    { label: t("reportBoard.productTraceBack.RawMaterialProductType"), prop: "IssueProductTypeName_List" },
    { label: t("reportBoard.productTraceBack.RawMaterialSpec"), prop: "IssueSpecifications_List" },
    { label: t("reportBoard.productTraceBack.RawMaterialBatch"), prop: "IssueLotNumber_List" },
    { label: t("reportBoard.productTraceBack.OriginalQty"), prop: "IssueQty_List" },
    { label: t("reportBoard.productTraceBack.MaterialInputQty"), prop: "skipqty_List" },
    { label: t("reportBoard.productTraceBack.StartDate"), prop: "MoveInDATE" },
    { label: t("reportBoard.productTraceBack.EndDate"), prop: "MoveStdDATE" },
  ];
  return calculateColumnsWidth(columns, tableData.value, { padding: 25, fontSize: 13 });
});
const getColumnWidth1 = (prop: string) => columnWidths1.value[prop] || "auto";

const columnWidths2 = computed(() => {
  const columns = [
    { label: t("reportBoard.productTraceBack.OrderNumber"), prop: "ParentOrderNo" },
    { label: t("reportBoard.productTraceBack.CustomerName"), prop: "ParentCustomerName" },
    { label: t("reportBoard.productTraceBack.MfgOrderName"), prop: "ParentMfgOrderName" },
    { label: t("reportBoard.productTraceBack.BatchNumber"), prop: "DefaultLot" },
    { label: t("reportBoard.productTraceBack.ProductName"), prop: "ParentProductName" },
    { label: t("reportBoard.productTraceBack.ProductDec"), prop: "ParentProductDec" },
    { label: t("reportBoard.productTraceBack.Specification"), prop: "ParentSpecification" },
    { label: t("reportBoard.productTraceBack.Unit"), prop: "UOMName" },
    { label: t("reportBoard.productTraceBack.FinisProductCode"), prop: "ChildProductName" },
    { label: t("reportBoard.productTraceBack.FinisProductName"), prop: "ChildProductDec" },
    { label: t("reportBoard.productTraceBack.Specification"), prop: "ChildSpecification" },
    { label: t("reportBoard.productTraceBack.Qty"), prop: "IssueQty" },
    { label: t("reportBoard.productTraceBack.Unit"), prop: "UOMName1" },
    { label: t("reportBoard.productTraceBack.BatchNumber"), prop: "ChildLotNumber" },
    { label: t("reportBoard.productTraceBack.StartDate"), prop: "MoveInDATE" },
    { label: t("reportBoard.productTraceBack.EndDate"), prop: "MoveStdDATE" },
    { label: t("reportBoard.productTraceBack.ChildContainerName"), prop: "ChildContainerName" },
    { label: t("reportBoard.productTraceBack.SnBarcode"), prop: "SN_List" },
  ];
  return calculateColumnsWidth(columns, tableData2.value, { padding: 25, fontSize: 13 });
});
const getColumnWidth2 = (prop: string) => columnWidths2.value[prop] || "auto";

const columnWidths3 = computed(() => {
  const columns = [
    { label: t("reportBoard.productTraceBack.OrderNumber"), prop: "ParentOrderNo" },
    { label: t("reportBoard.productTraceBack.CustomerName"), prop: "ParentCustomerName" },
    { label: t("reportBoard.productTraceBack.MfgOrderName"), prop: "ParentMfgOrderName" },
    { label: t("reportBoard.productTraceBack.ProcessRoute"), prop: "WorkflowName" },
    { label: t("reportBoard.productTraceBack.Process"), prop: "WorkflowStepName" },
    { label: t("reportBoard.productTraceBack.ProductName"), prop: "ParentProductName" },
    { label: t("reportBoard.productTraceBack.ProductDec"), prop: "ParentProductDec" },
    { label: t("reportBoard.productTraceBack.Specification"), prop: "ParentSpecification" },
    { label: t("reportBoard.productTraceBack.StartDate"), prop: "MoveInDATE" },
    { label: t("reportBoard.productTraceBack.EndDate"), prop: "MoveStdDATE" },
    { label: t("reportBoard.productTraceBack.Qty"), prop: "Qty" },
    { label: t("reportBoard.productTraceBack.Operator"), prop: "EmployeeName" },
  ];
  return calculateColumnsWidth(columns, tableData3.value, { padding: 25, fontSize: 13 });
});
const getColumnWidth3 = (prop: string) => columnWidths3.value[prop] || "auto";

const columnWidths4 = computed(() => {
  const columns = [
    { label: t("reportBoard.productTraceBack.Personnel"), prop: "EmployeeName" },
    { label: t("reportBoard.productTraceBack.OrderNumber"), prop: "ParentOrderNo" },
    { label: t("reportBoard.productTraceBack.CustomerName"), prop: "ParentCustomerName" },
    { label: t("reportBoard.productTraceBack.MfgOrderName"), prop: "ParentMfgOrderName" },
    { label: t("reportBoard.productTraceBack.Process"), prop: "WorkflowStepName" },
    { label: t("reportBoard.productTraceBack.StartDate"), prop: "MoveInDATE" },
    { label: t("reportBoard.productTraceBack.EndDate"), prop: "MoveStdDATE" },
    { label: t("reportBoard.productTraceBack.Qty"), prop: "Qty" },
    { label: t("reportBoard.productTraceBack.Equipment"), prop: "ResourceName" },
  ];
  return calculateColumnsWidth(columns, tableData4.value, { padding: 25, fontSize: 13 });
});
const getColumnWidth4 = (prop: string) => columnWidths4.value[prop] || "auto";

const columnWidths5 = computed(() => {
  const columns = [
    { label: t("reportBoard.productTraceBack.DeviceCode"), prop: "ResourceName" },
    { label: t("reportBoard.productTraceBack.OrderNumber"), prop: "ParentOrderNo" },
    { label: t("reportBoard.productTraceBack.CustomerName"), prop: "ParentCustomerName" },
    { label: t("reportBoard.productTraceBack.MfgOrderName"), prop: "ParentMfgOrderName" },
    { label: "设备名称", prop: "ResourceName" },
    { label: t("reportBoard.productTraceBack.Process"), prop: "WorkflowStepName" },
    { label: t("reportBoard.productTraceBack.StartDate"), prop: "MoveInDATE" },
    { label: t("reportBoard.productTraceBack.EndDate"), prop: "MoveStdDATE" },
    { label: t("reportBoard.productTraceBack.Qty"), prop: "Qty" },
  ];
  return calculateColumnsWidth(columns, tableData5.value, { padding: 25, fontSize: 13 });
});
const getColumnWidth5 = (prop: string) => columnWidths5.value[prop] || "auto";
</script>

<style scoped>
.el-pagination {
  justify-content: center;
}
</style>