<template>
    <div class="p-2">
        <el-card shadow="always" :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :inline="true" :model="getForm" size="small" label-width="auto"
                @submit.native.prevent>
                <el-form-item :label="$t('shipmentInspect.shipmentInspectionNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ShipmentInspectionNo" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.product')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.Product" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.productName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.workCenterName')" class="mb-2">
                    <el-select v-model="getForm.WorkCenterName" @change="getData" placeholder="请选择" clearable filterable
                        size="small" style="width: 200px">
                        <el-option :label="p.WorkCenterName" :value="p.WorkCenterName" :key="p.WorkCenterName"
                            v-for="p in workCenterList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.lotNo')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.LotNo" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.inspectionType')" class="mb-2">
                    <el-select v-model="getForm.InspectionType" @change="getData" placeholder="请选择" clearable filterable
                        size="small" style="width: 200px">
                        <el-option :label="p.inspectType" :value="p.inspectType" :key="p.inspectType"
                            v-for="p in inspectTypeList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.mfgOrderName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.MfgOrderName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.creatTime')" class="mb-2"><el-date-picker
                        :shortcuts="shortcuts" v-model="searchDate" value-format="YYYY-MM-DD" type="daterange"
                        range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.customerName')" class="mb-2">
                    <el-select v-model="getForm.CustomerName" @change="getData" placeholder="请选择" clearable filterable
                        size="small" style="width: 200px">
                        <el-option :label="p.CustomerName" :value="p.CustomerName" :key="p.CustomerId"
                            v-for="p in customerList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.status')" class="mb-2">
                    <el-select v-model="getForm.Status" placeholder="" style="width: 200px" clearable @change="getData">
                        <el-option label="未检验" value="未检验" />
                        <el-option label="检验中" value="检验中" />
                        <el-option label="检验完成" value="检验完成" />
                    </el-select>
                    <!-- <el-input style="width: 200px" v-model="getForm.Status" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input> -->
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="primary" size="small" @click="getData">
                        {{ $t("publicText.query") }}
                    </el-button>
                    <el-button type="info" size="small" @click="resetFormData">
                        {{ $t("publicText.reset") }}
                    </el-button>
                    <el-button type="warning" size="small" @click="openAdd">
                        {{ $t("publicText.add") }}
                    </el-button>
                    <!-- <el-button type="success" :disabled="tableData.length == 0" size="small" @click="exportTable">
                        导出Excel
                    </el-button> -->
                    <!-- <el-button type="Danger" size="small" @click="testVisible = true">
                        {{ $t("processInspect.orderInterrupt") }}
                    </el-button> -->
                </el-form-item>
            </el-form>
            <el-table :data="tableData.slice(
                (pageObj.currentPage - 1) * pageObj.pageSize,
                pageObj.currentPage * pageObj.pageSize,
            )
                " size="small" :style="{ width: '100%' }" :height="tableHeight" :tooltip-effect="'light'" border fit
                highlight-current-row ref="multipleTableRef">
                <!-- <el-table-column type="selection" width="55" align="center" /> -->
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    <template #default="scope">
                        <span>{{
                            scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ShipmentInspectionNo" fixed :label="$t('shipmentInspect.shipmentInspectionNo')"
                    :min-width="getColumnWidth1('ShipmentInspectionNo')" />
                <el-table-column prop="MfgOrder" fixed :label="$t('shipmentInspect.mfgOrderName')"
                    :min-width="getColumnWidth1('MfgOrder')" />
                <el-table-column prop="BusinessDivision" fixed :label="$t('shipmentInspect.workCenterName')"
                    :min-width="getColumnWidth1('BusinessDivision')" />
                <el-table-column prop="InspectionType" fixed :label="$t('shipmentInspect.inspectionType')"
                    :min-width="getColumnWidth1('InspectionType')" />
                <el-table-column prop="Product" :label="$t('shipmentInspect.product')"
                    :min-width="getColumnWidth1('Product')" />
                <el-table-column prop="ProductName" :label="$t('shipmentInspect.productName')"
                    :min-width="getColumnWidth1('ProductName')" />
                <el-table-column prop="LotNo" :label="$t('shipmentInspect.lotNo')"
                    :min-width="getColumnWidth1('LotNo')" />
                <el-table-column prop="Qty" :label="$t('shipmentInspect.qty')" :min-width="getColumnWidth1('Qty')" />
                <el-table-column prop="Customer" :label="$t('shipmentInspect.customerName')"
                    :min-width="getColumnWidth1('Customer')" />
                <el-table-column prop="Status" :label="$t('shipmentInspect.status')"
                    :min-width="getColumnWidth1('Status')" />
                <el-table-column prop="InspectionResult" :label="$t('shipmentInspect.InspectionResult')"
                    :min-width="getColumnWidth1('InspectionResult')" />
                <el-table-column prop="Creator" :label="$t('shipmentInspect.creator')"
                    :min-width="getColumnWidth1('Creator')" />
                <el-table-column prop="CreateTime" :label="$t('shipmentInspect.creatTime')"
                    :min-width="getColumnWidth1('CreateTime')" />
                <el-table-column :label="$t('publicText.operation')" width="80" fixed="right" align="center">
                    <template #default="{ row }">
                        <el-tooltip :content="$t('shipmentInspect.inspect')" placement="top">
                            <el-button type="primary" icon="EditPen" size="small" :disabled="row.Status == ''"
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
        <el-dialog v-model="addVisible" :title="$t('publicText.add')" width="580px" align-center :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" @close="closeAdd">
            <el-form ref="addFormRef" :inline="true" :model="addForm" :rules="rules" label-width="auto">
                <el-form-item :label="$t('shipmentInspect.workCenterName')" prop="BusinessDivision">
                    <el-select v-model="addForm.BusinessDivision" placeholder="请选择" filterable
                        @change="changeWorkCenter" style="width: 400px">
                        <el-option :label="p.WorkCenterName" :value="p.WorkCenterName" :key="p.WorkCenterName"
                            v-for="p in workCenterList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.mfgOrderName')" prop="MfgOrder">
                    <el-select v-model="addForm.MfgOrder" placeholder="请选择" filterable @change="changeOrderInfo"
                        style="width: 400px">
                        <el-option :label="p.MfgOrderName" :value="p.MfgOrderName" :key="p.MfgOrderName"
                            v-for="p in orderList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.inspectionType')" prop="InspectionType">
                    <el-select v-model="addForm.InspectionType" placeholder="请选择" filterable style="width: 400px">
                        <el-option :label="p.inspectType" :value="p.inspectType" :key="p.inspectType"
                            v-for="p in inspectTypeList" />
                    </el-select>
                </el-form-item>
                <el-row :gutter="0">
                    <el-col :span="12">
                        <el-form-item :label="$t('shipmentInspect.product')" prop="Product">
                            <el-input v-model="addForm.Product" placeholder="" disabled style="width: 200px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('shipmentInspect.productName')" prop="ProductName">
                            <el-input v-model="addForm.ProductName" placeholder="" disabled style="width: 200px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('shipmentInspect.customerName')" prop="Customer">
                            <el-input v-model="addForm.Customer" placeholder="" disabled style="width: 200px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('shipmentInspect.qty')" prop="Qty">
                            <el-input v-model="addForm.Qty" placeholder="" disabled style="width: 200px" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('shipmentInspect.lotNo')" prop="LotNo">
                            <el-input v-model="addForm.LotNo" placeholder="" disabled style="width: 200px" />
                        </el-form-item>
                    </el-col>
                </el-row>
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
        <el-dialog v-model="editVisible" :title="InspectionType" width="95%" align-center :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" @close="closeEdit">
            <el-form ref="editFormRef" :inline="true" :model="editForm" label-width="auto" :size="'small'"
                @submit.native.prevent>
                <el-form-item :label="$t('shipmentInspect.shipmentInspectionNo')" prop="ShipmentInspectionNo"
                    class="mb-2">
                    <el-input v-model="editForm.ShipmentInspectionNo" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.product')" prop="Product" class="mb-2">
                    <el-input v-model="editForm.Product" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.productName')" prop="ProductName" class="mb-2">
                    <el-input v-model="editForm.ProductName" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.workCenterName')" prop="BusinessDivision" class="mb-2">
                    <el-input v-model="editForm.BusinessDivision" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.lotNo')" prop="LotNo" class="mb-2">
                    <el-input v-model="editForm.LotNo" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.qty')" prop="Qty" class="mb-2">
                    <el-input v-model="editForm.Qty" placeholder="" disabled style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('shipmentInspect.containerName')" prop="sn" class="mb-2"
                    v-if="InspectionType == '出货检验'">
                    <el-input v-model="SN" placeholder="" style="width: 200px" @keyup.enter.native="queryBySN" clearable
                        @clear="queryBySN" />
                </el-form-item>
                <el-form-item class="mb-2">
                    <el-button type="primary" @click="queryBySN" v-if="InspectionType == '出货检验'">
                        {{ $t("publicText.query") }}
                    </el-button>
                    <el-button type="warning" @click="openAddBatch" v-if="InspectionType == '出货检验'">
                        {{ $t("shipmentInspect.addBatch") }}
                    </el-button>
                    <el-button type="success" :disabled="titleData.length == 0" size="small"
                        @click="exportTableInspect">
                        导出Excel
                    </el-button>
                </el-form-item>
                <el-form ref="editFormRef" :inline="true" :model="editForm" label-width="60px" :size="'small'"
                    @submit.native.prevent>
                    <el-form-item class="mb-2" :label="t('shipmentInspect.Organization')">
                        <el-select v-model="OrganizationId" placeholder="请选择" style="width: 200px"
                            @change="changeOrganization">
                            <el-option v-for="employee in OrganizationList" :key="employee.OrganizationId"
                                :label="employee.OrganizationName" :value="employee.OrganizationId" />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="mb-2" :label="t('shipmentInspect.Inspector')">
                        <el-select v-model="selectedEmployees" multiple placeholder="请选择" style="width: 200px">
                            <el-option v-for="employee in EmployeeList" :key="employee.FullName"
                                :label="employee.FullName" :value="employee.FullName" />
                        </el-select>
                    </el-form-item></el-form>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-table :data="titleData" border stripe style="width: 100%" size="small" :height="520"
                        highlight-current-row @row-click="rowClickTitle">
                        <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50" />
                        <el-table-column prop="ContainerName" fixed :label="$t('shipmentInspect.containerName')"
                            :min-width="getColumnWidth2('ContainerName')" v-if="InspectionType == '出货检验'" />
                        <el-table-column prop="SN" fixed :label="$t('shipmentInspect.snbox')"
                            :min-width="getColumnWidth2('SN')" v-if="InspectionType == '出货检验'" />
                        <el-table-column prop="PassRate" :label="$t('shipmentInspect.passRate')"
                            :min-width="getColumnWidth2('PassRate')">
                        </el-table-column>
                        <el-table-column prop="JudgmentResult" :label="$t('shipmentInspect.InspectionResult')"
                            width="100">
                            <template #default="{ row }">
                                <el-select v-model="row.JudgmentResult" placeholder="" filterable size="small"
                                    style="width: 80px" @change="onJudgmentChange">
                                    <el-option :label="t('shipmentInspect.status0')" :value="'合格'" />
                                    <el-option :label="t('shipmentInspect.status1')" :value="'不合格'" />
                                    <el-option :label="t('shipmentInspect.status2')" :value="'报废'" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="PictureName" :label="$t('shipmentInspect.pictureName')" /> -->
                        <el-table-column prop="Creator" :label="$t('shipmentInspect.creator')"
                            :min-width="getColumnWidth2('Creator')" />
                        <el-table-column prop="Inspector" :label="$t('shipmentInspect.Inspector')"
                            :min-width="getColumnWidth2('Inspector')" />
                        <el-table-column prop="InspectionTime" :label="$t('shipmentInspect.InspectionTime')"
                            :min-width="getColumnWidth2('InspectionTime')" />

                        <!-- <el-table-column prop="Remark" :label="$t('shipmentInspect.remark')"
                            :min-width="getColumnWidth2('Remark')" /> -->
                    </el-table>
                </el-col>
                <el-col :span="14">
                    <el-tabs v-model="activeName" type="border-card">
                        <el-tab-pane :label="'计量'+(measureData.length)" name="first">
                            <el-table :data="measureData" border stripe style="width: 100%" size="small" :height="450">
                                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')"
                                    width="50" />
                                <el-table-column prop="SN" fixed :label="$t('shipmentInspect.sn')"
                                    :min-width="getColumnWidth3('SN')" v-if="InspectionType == '出货检验'" />
                                <el-table-column prop="ProjectName" :label="$t('shipmentInspect.projectName')"
                                    :min-width="getColumnWidth3('ProjectName')" />
                                <el-table-column prop="MeasurementMethod"
                                    :label="$t('shipmentInspect.measurementMethod')"
                                    :min-width="getColumnWidth3('MeasurementMethod')" />
                                <el-table-column prop="TargetValue" :label="$t('shipmentInspect.targetValue')"
                                    :min-width="getColumnWidth3('TargetValue')" />
                                <el-table-column prop="MaxiMum" :label="$t('shipmentInspect.maxiMum')"
                                    :min-width="getColumnWidth3('MaxiMum')" />
                                <el-table-column prop="MiniMum" :label="$t('shipmentInspect.miniMum')"
                                    :min-width="getColumnWidth3('MiniMum')" />
                                <el-table-column prop="ActualValue" :label="$t('shipmentInspect.actualValue')"
                                    width="120">
                                    <template #default="{ row, $index }">
                                        <el-input-number v-model="row.ActualValue" :min="1" :size="'small'"
                                            style="width: 100px" @change="onRightDataChange"
                                            :ref="(el: any) => setInputRef(el, $index)"
                                            @keyup.enter.native="handleEnterInput($event, $index)" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Unit" :label="$t('shipmentInspect.unit')"
                                    :min-width="getColumnWidth3('Unit')" />
                                <el-table-column prop="PictureName" :label="$t('shipmentInspect.pictureName')"
                                    width="120">
                                    <template #default="{ row }">
                                        <span class="underline text-[#006487]" @click="previewImg(row)">{{
                                            row.PictureName
                                        }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Remark" :label="$t('shipmentInspect.remark')" width="150">
                                    <template #default="{ row }">
                                        <el-input v-model="row.Remark" :size="'small'" style="width: 120px" />
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('publicText.push')" width="80" fixed="right" align="center">
                                    <template #default="{ row }">
                                        <el-upload v-model:file-list="fileList" :limit="1" :auto-upload="false"
                                            :on-change="(file: any, fileList: any) =>
                                                handleUploadChange(file, fileList, row)
                                                " :on-remove="(file: any, fileList: any) =>
                                                    handleUploadRemove(file, fileList, row)
                                                    " :before-upload="beforeUpload" accept=".jpg,.png"
                                            list-type="picture">
                                            <el-button icon="Upload" type="primary" :size="'small'"></el-button>
                                        </el-upload></template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane :label="'计数'+(countData.length)" name="second">
                            <el-table :data="countData" border stripe style="width: 100%" size="small" :height="450">
                                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')"
                                    width="50" />
                                <el-table-column prop="SN" fixed :label="$t('shipmentInspect.sn')"
                                    :min-width="getColumnWidth4('SN')" v-if="InspectionType == '出货检验'" />
                                <el-table-column prop="ProjectName" :label="$t('shipmentInspect.projectName')"
                                    :min-width="getColumnWidth4('ProjectName')" />
                                <el-table-column prop="MeasurementMethod"
                                    :label="$t('shipmentInspect.measurementMethod')"
                                    :min-width="getColumnWidth4('MeasurementMethod')" />
                                <el-table-column prop="TargetValue" :label="$t('shipmentInspect.targetValue')"
                                    :min-width="getColumnWidth4('TargetValue')" />
                                <el-table-column prop="MaxiMum" :label="$t('shipmentInspect.maxiMum')"
                                    :min-width="getColumnWidth4('MaxiMum')" />
                                <el-table-column prop="MiniMum" :label="$t('shipmentInspect.miniMum')"
                                    :min-width="getColumnWidth4('MiniMum')" />
                                <el-table-column prop="TestResults" :label="$t('shipmentInspect.testResults')"
                                    width="100">
                                    <template #default="{ row }">
                                        <el-select v-model="row.TestResults" placeholder="请选择"
                                            @change="onRightDataChange" filterable size="small" style="width: 80px">
                                            <el-option :label="'合格'" :value="'合格'" />
                                            <el-option :label="'不合格'" :value="'不合格'" />
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Unit" :label="$t('shipmentInspect.unit')"
                                    :min-width="getColumnWidth3('Unit')" />
                                <el-table-column prop="PictureName" :label="$t('shipmentInspect.pictureName')"
                                    width="120">
                                    <template #default="{ row }">
                                        <span class="underline text-[#006487]" @click="previewImg(row)">{{
                                            row.PictureName
                                        }}</span>
                                        <!-- <el-upload v-model:file-list="fileList" :limit="1" :auto-upload="false"
                                            :on-change="(file: any, fileList: any) => handleUploadChange(file, fileList, row)"
                                            :on-remove="(file: any, fileList: any) => handleUploadRemove(file, fileList, row)"
                                            :before-upload="beforeUpload" accept=".jpg,.png" list-type="picture">
                                            <el-button icon="Plus" :size="'small'"></el-button>
                                        </el-upload> -->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Remark" :label="$t('shipmentInspect.remark')" width="150">
                                    <template #default="{ row }">
                                        <el-input v-model="row.Remark" :size="'small'" style="width: 120px" />
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('publicText.push')" width="80" fixed="right" align="center">
                                    <template #default="{ row }">
                                        <el-upload v-model:file-list="fileList" :limit="1" :auto-upload="false"
                                            :on-change="(file: any, fileList: any) =>
                                                handleUploadChange(file, fileList, row)
                                                " :on-remove="(file: any, fileList: any) =>
                                                    handleUploadRemove(file, fileList, row)
                                                    " :before-upload="beforeUpload" accept=".jpg,.png"
                                            list-type="picture">
                                            <el-button icon="Upload" type="primary" :size="'small'"></el-button>
                                        </el-upload></template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeEdit">{{ $t("publicText.close") }}</el-button>
                    <el-button type="warning" @click="handleInspectSave" :disabled="Status == '检验完成'">
                        {{ $t("publicText.save") }}
                    </el-button>
                    <el-button type="primary" @click="handleInspectConfirm" :disabled="Status == '检验完成'">
                        {{ $t("publicText.submit") }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="batchVisible" :title="t('publicText.add') + t('shipmentInspect.containerName')"
            width="400px" :append-to-body="true" :close-on-click-modal="false" :close-on-press-escape="false"
            align-center @close="handleAddClose">
            <el-form ref="batchformRef" :model="batchForm" label-width="auto" :inline="true" @submit.native.prevent>
                <el-form-item :label="$t('shipmentInspect.containerName')" prop="ContainerName">
                    <el-input v-model="batchForm.ContainerName" placeholder="请输入" style="width: 250px" />
                </el-form-item>
            </el-form>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleAddClose">{{
                        $t("publicText.cancel")
                    }}</el-button>
                    <el-button type="primary" @click="handleAddConfirm">
                        {{ $t("publicText.confirm") }}
                    </el-button>
                </div>
            </template>
        </el-dialog>

        <el-image-viewer v-if="showPreview" show-progress :url-list="srcList" @close="showPreview = false">
            <template #viewer-error="{ activeIndex, src }">
                <div class="image-slot viewer-error">
                    <el-icon><icon-picture /></el-icon>
                    <!-- <span>
            this is viewer-error slot. current index: {{ activeIndex }}. src:
            {{ src }}
          </span> -->
                </div>
            </template>
        </el-image-viewer>
    </div>
</template>

<script setup lang="ts">
import { exportToExcelSpipment } from "@/utils/inspectionExcel"
import {
    ShipmentInspectionWorkCenterQuery,
    ShipmentInspectionMfgOrderQuery,
    ShipmentInspectionQuery,
    ShipmentInspectionContainerSNQuery,
    ShipmentInspectionContainerSNAdd,
    ShipmentInspectionExecute,
    LabelPrintDownloadFtpServer,
    ShipmentInspectionOrganizationQuery,
    ShipmentInspectionEmployeeQuery
} from "@/api/smtSpotCheck/oqcApi";
import { GetCustomerQuery } from "@/api/incomingManage/aqlrules";
import {
    shortcuts,
    setTodayDate,
    setLastDate,
    disabledDate,
} from "@/utils/dataMenu";
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
    ShipmentInspectionNo: "",
    CustomerName: "",
    MfgOrderName: "",
    InspectionType: "",
    Status: "",
    Product: "",
    ProductName: "",
    WorkCenterName: "",
    LotNo: "",
    CreateStartTime: "",
    CreateEndTime: "",
});
const searchDate = ref<any[]>([]);
const tableHeight = ref(0);
const tableData = ref([]);
const pageObj = ref({
    pageSize: 50,
    currentPage: 1,
});
const customerList = ref<any[]>([]);
const workCenterList = ref<any[]>([]);
const inspectTypeList = ref([
    {
        inspectType: "出货检验",
    },
    {
        inspectType: "抽检",
    },
]);
const getOrderForm = ref({
    MfgOrderName: "",
    WorkCenterName: "",
});
const orderList = ref<any[]>([]);
const addVisible = ref(false);
const addFormRef = ref();
const addForm = ref({
    ShipmentInspectionNo: "",
    BusinessDivision: "",
    MfgOrder: "",
    InspectionType: "",
    Product: "",
    ProductName: "",
    Customer: "",
    Qty: "",
    LotNo: "",
    CreateTime: "",
    Creator: userStore.getUserInfo,
    Status: 0,
});
const editForm = ref({
    ShipmentInspectionNo: "",
    BusinessDivision: "",
    MfgOrder: "",
    InspectionType: "",
    Product: "",
    ProductName: "",
    Customer: "",
    Qty: "",
    LotNo: "",
    Inspector: "",
    InspectionTime: "",
    Status: 0,
    InspectionResult: "",
    // shipmentInspectionSNEntities: [ ],
    // shipmentInspectionSNDetailEntities: []
});
const editVisible = ref(false);
const SN = ref("");
const titleData = ref<any[]>([]);
const originalTitleData = ref<any[]>([]);
const activeName = ref("first");
const measureData = ref([]);
const countData = ref([]);
const ShipmentInspectionNo = ref("");
const Status = ref('');
const InspectionType = ref("");
const batchVisible = ref(false);
const batchForm = ref({
    MfgOrderName: "",
    ProductName: "",
    CustomerName: "",
    ContainerName: "",
    SN: "",
    ShipmentInspectionNo: "",
    Creator: "",
});
const fileList = ref<any[]>([]);
const currentSelectedRow = ref<any>(null);
const rules = reactive({
    InspectionType: [
        {
            required: true,
            message: "请选择",
            trigger: "change",
        },
    ],
});
const showPreview = ref(false);
const srcList = ref<string[]>([]);
const inputRefs = ref<any[]>([]);
const OrganizationId = ref("");
const OrganizationList = ref<any[]>([]);
const EmployeeList = ref<any[]>([]);
const selectedEmployees = ref<string[]>([]);
watch(
    () => searchDate.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.CreateStartTime = "";
            getForm.value.CreateEndTime = "";
            return;
        }
        if (newVal !== oldVal) {
            getForm.value.CreateStartTime = newVal[0];
            getForm.value.CreateEndTime = newVal[1] + " 23:59:59";
        }
    },
);
onBeforeMount(() => {
    getScreenHeight();
    getCustomerData();
    getWorkCenterData();
    getOrganizationData()
});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
});
//获取品质ID
const getOrganizationData = () => {
    ShipmentInspectionOrganizationQuery({ OrganizationName: "品质部" }).then((res: any) => {
        OrganizationList.value = res.content;

    })
}
const changeOrganization = (val: any) => {

    getEmployeeData();
}
//获取员工数据
const getEmployeeData = () => {
    EmployeeList.value = [];
    ShipmentInspectionEmployeeQuery({ OrganizationId: OrganizationId.value }).then((res: any) => {
        EmployeeList.value = res.content;
    })
}
//获取事业部
const getWorkCenterData = () => {
    ShipmentInspectionWorkCenterQuery({}).then((res: any) => {
        workCenterList.value = res.content;
    });
};
//获取客户
const getCustomerData = () => {
    GetCustomerQuery({}).then((res: any) => {
        customerList.value = res.content;
    });
};
//获取工单
const getOrderData = () => {
    orderList.value = [];
    ShipmentInspectionMfgOrderQuery(getOrderForm.value).then((res: any) => {
        orderList.value = res.content;
    });
};
//获取主数据
const getData = () => {
    pageObj.value.currentPage = 1;
    ShipmentInspectionQuery(getForm.value).then((res: any) => {
        tableData.value = res.content;
    });
};
const resetFormData = () => {
    getForm.value = {
        ShipmentInspectionNo: "",
        CustomerName: "",
        MfgOrderName: "",
        InspectionType: "",
        Status: "",
        Product: "",
        ProductName: "",
        WorkCenterName: "",
        LotNo: "",
        CreateStartTime: "",
        CreateEndTime: "",
    };
    searchDate.value = [];
};
const openAdd = () => {
    getOrderForm.value.WorkCenterName = "";
    getOrderData();
    addVisible.value = true;
};
const closeAdd = () => {
    getData();
    getOrderForm.value.WorkCenterName = "";
    addVisible.value = false;
    addFormRef.value.resetFields();
};
const changeWorkCenter = (val: any) => {
    getOrderForm.value.WorkCenterName = val;
};
const changeOrderInfo = (val: any) => {
    let data = orderList.value.find((v) => v.MfgOrderName == val);
    addForm.value.Product = data.ProductName;
    addForm.value.ProductName = data.Description;
    addForm.value.Customer = data.CustomerName;
    addForm.value.Qty = data.Qty;
    addForm.value.LotNo = data.LotNo;
};
const handleAdd = () => {
    console.log(addForm.value);

    addFormRef.value.validate((valid: any) => {
        if (valid) {
            addForm.value.Creator = userStore.getUserInfo;
            addForm.value.CreateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
            ShipmentInspectionExecute(addForm.value).then((res: any) => {
                // ElNotification({
                //     title: '提示信息',
                //     type: res.success ? 'success' : 'error',
                //     message: res.success ? '新增成功' : res.msg
                // })
                ElMessage({
                    type: res.success ? "success" : "error",
                    message: res.success ? "新增成功" : res.msg,
                });
                getData();
                if (res.success) {
                    addVisible.value = false;
                    addFormRef.value.resetFields();
                }
            });
        }
    });
};
const closeEdit = () => {
    editVisible.value = false;
};
// 新增：加载容器SN数据，同时备份原始数据并清空搜索框
const loadTitleData = () => {
    if (!ShipmentInspectionNo.value) return;
    ShipmentInspectionContainerSNQuery({
        ShipmentInspectionNo: ShipmentInspectionNo.value,
    }).then((res: any) => {
        const data = res.content || [];
        originalTitleData.value = data; // 保存原始数据
        titleData.value = data;
        SN.value = ""; // 清空搜索框
        setOverallPassRate(titleData.value);
    });
};

// 修改原有 getTitleData，统一使用 loadTitleData
const getTitleData = () => {
    loadTitleData();
};

// 新增：根据 SN 搜索过滤 titleData
const queryBySN = () => {
    const keyword = SN.value?.trim();
    console.log(keyword);

    if (!keyword) {
        // 如果搜索框为空，恢复全部数据
        titleData.value = [...originalTitleData.value];
    } else {
        // 模糊匹配 SN 字段（根据实际数据结构，这里使用 SN 属性）
        titleData.value = originalTitleData.value.filter(
            (item) => item.SN && item.SN.includes(keyword),
        );
        countData.value = [];
        measureData.value = [];
        currentSelectedRow.value = null;
    }
};
const handleEdit = (row: any) => {
    countData.value = [];
    measureData.value = [];
    InspectionType.value = row.InspectionType;
    ShipmentInspectionNo.value = row.ShipmentInspectionNo;
    Status.value = row.Status;
    editForm.value.ShipmentInspectionNo = row.ShipmentInspectionNo;
    editForm.value.MfgOrder = row.MfgOrder;
    editForm.value.BusinessDivision = row.BusinessDivision;
    editForm.value.InspectionType = row.InspectionType;
    editForm.value.Product = row.Product;
    editForm.value.ProductName = row.ProductName;
    editForm.value.LotNo = row.LotNo;
    editForm.value.Qty = row.Qty;
    editForm.value.Customer = row.Customer;
    editForm.value.Status = row.Status;
    editForm.value.InspectionResult = row.InspectionResult;
    selectedEmployees.value = row.Inspector == null ? "" : row.Inspector.split(',')
    loadTitleData();
    activeName.value = "first";
    editVisible.value = true;
};
const rowClickTitle = (val: any) => {
    currentSelectedRow.value = val;
    countData.value = val.DetailData.filter(
        (v: any) => v.OperationType == "计数",
    );
    measureData.value = val.DetailData.filter(
        (v: any) => v.OperationType == "计量",
    );
    updateDerivedFields(measureData.value);
    updateCurrentRowInspectionResult();
};

const ninePointProjects = [
    '左侧数据1', '右侧数据1', '中间数据1',
    '左侧数据2', '右侧数据2', '中间数据2',
    '左侧数据3', '右侧数据3', '中间数据3'
];
const derivedProjects = ['厚度上限', '厚度下限', '最大厚度差'];
const isNinePointProject = (projectName: string): boolean => {
    return ninePointProjects.includes(projectName);
};
// 判断是否为派生指标
const isDerivedProject = (projectName: string): boolean => {
    return derivedProjects.includes(projectName);
};
// 获取当前容器计量数据中的九点实际值列表（过滤掉无效值）
const getNinePointValues = (measureData: any[]): number[] => {
    const values: number[] = [];
    for (const item of measureData) {
        if (isNinePointProject(item.ProjectName)) {
            const val = item.ActualValue;
            if (val !== null && val !== undefined && val !== '' && !isNaN(Number(val))) {
                values.push(Number(val));
            }
        }
    }
    return values;
};
// 更新派生指标（厚度上限、厚度下限、最大厚度差）
const updateDerivedFields = (measureData: any[]) => {
    const nineValues = getNinePointValues(measureData);
    let maxVal: number | null = null;
    let minVal: number | null = null;

    if (nineValues.length > 0) {
        maxVal = Math.max(...nineValues);
        minVal = Math.min(...nineValues);
    }

    // 更新厚度上限、厚度下限、最大厚度差
    for (const item of measureData) {
        if (item.ProjectName === '厚度上限') {
            item.ActualValue = maxVal !== null ? maxVal : null;
        } else if (item.ProjectName === '厚度下限') {
            item.ActualValue = minVal !== null ? minVal : null;
        } else if (item.ProjectName === '最大厚度差') {
            if (maxVal !== null && minVal !== null) {
                item.ActualValue = Number((maxVal - minVal)); // 保留两位小数.toFixed(2)
            } else {
                item.ActualValue = null;
            }
        }
    }
};
const onJudgmentChange = () => {
    // 当检验结果改变时，重新计算整体合格率
    setOverallPassRate(titleData.value);
};
// 计算整体合格率并设置到每一行的 PassRate 字段
const setOverallPassRate = (dataList: any[]) => {
    if (!dataList || dataList.length === 0) {
        return;
    }
    const total = dataList.length;
    const qualifiedCount = dataList.filter(item => item.JudgmentResult === '合格').length;
    const rate = total === 0 ? 0 : (qualifiedCount / total) * 100;
    const rateStr = `${rate.toFixed(2)}%`;
    dataList.forEach(item => {
        item.PassRate = rateStr;
    });
};
const updateCurrentRowInspectionResult = () => {
    if (!currentSelectedRow.value) return;

    const detailData = currentSelectedRow.value.DetailData || [];
    let total = 0;
    let qualified = 0;

    for (const item of detailData) {
        // 计量类型判断
        if (item.OperationType === "计量") {
            const actual = item.ActualValue;
            // 只有当实际值存在时才参与计算
            if (actual !== null && actual !== undefined && actual !== "") {
                // 特殊处理：九点数据只要有值就算合格
                if (isNinePointProject(item.ProjectName)) {
                    total++;
                    qualified++;
                }
                // 派生指标不参与合格率统计
                else if (isDerivedProject(item.ProjectName)) {
                    // 跳过，不计入total和qualified
                    continue;
                }
                // 其他常规计量项：按最大最小值范围判定
                else {
                    total++;
                    const min = item.MiniMum;
                    const max = item.MaxiMum;
                    if (
                        min !== null &&
                        min !== undefined &&
                        max !== null &&
                        max !== undefined &&
                        Number(actual) >= Number(min) &&
                        Number(actual) <= Number(max)
                    ) {
                        qualified++;
                    }
                }
            }
        }
        // 计数类型判断（保持不变）
        else if (item.OperationType === "计数") {
            const result = item.TestResults;
            if (result !== null && result !== undefined && result !== "") {
                total++;
                if (result === "合格") {
                    qualified++;
                }
            }
        }
    }

    // 计算合格率和检验结果
    let passRate = "";
    let inspectionResult = "";
    if (total === 0) {
        passRate = "100%";
        inspectionResult = "";
        console.log("没信息");
    } else {
        const rate = (qualified / total) * 100;
        passRate = rate.toFixed(2) + "%";
        inspectionResult = qualified === total ? "合格" : "不合格";
        console.log(qualified, total);
    }
    // 注意：PassRate字段如需更新可在此添加，当前UI未使用该字段
    currentSelectedRow.value.JudgmentResult = inspectionResult;
};
// 根据右侧数据更新当前选中行的检验结果和合格率
// const updateCurrentRowInspectionResult = () => {
//     if (!currentSelectedRow.value) return;

//     const detailData = currentSelectedRow.value.DetailData || [];
//     let total = 0;
//     let qualified = 0;

//     for (const item of detailData) {
//         // 计量类型判断
//         if (item.OperationType === "计量") {
//             const actual = item.ActualValue;
//             // 只有当实际值存在时才参与计算
//             if (actual !== null && actual !== undefined && actual !== "") {
//                 total++;
//                 const min = item.MiniMum;
//                 const max = item.MaxiMum;
//                 if (
//                     min !== null &&
//                     min !== undefined &&
//                     max !== null &&
//                     max !== undefined &&
//                     Number(actual) >= Number(min) &&
//                     Number(actual) <= Number(max)
//                 ) {
//                     qualified++;
//                 }
//             }
//         }
//         // 计数类型判断
//         else if (item.OperationType === "计数") {
//             const result = item.TestResults;
//             // 只有当选择了结果时才参与计算
//             if (result !== null && result !== undefined && result !== "") {
//                 total++;
//                 if (result === "合格") {
//                     qualified++;
//                 }
//             }
//         }
//     }

//     // 计算合格率
//     let passRate = "";
//     let inspectionResult = "";
//     if (total === 0) {
//         // 没有任何有效数据时，可视为未检验？业务上可能需要特殊处理，比如保持原值或空
//         // 这里按照之前逻辑默认为100%合格
//         passRate = "100%";
//         inspectionResult = "";
//         console.log("没信息");
//     } else {
//         const rate = (qualified / total) * 100;
//         passRate = rate.toFixed(2) + "%";
//         inspectionResult = qualified === total ? "合格" : "不合格";
//         console.log(qualified, total);
//     }
//     currentSelectedRow.value.JudgmentResult = inspectionResult;
// };

// 右侧数据变化时的统一回调
const onRightDataChange = () => {
    updateDerivedFields(measureData.value);
    updateCurrentRowInspectionResult();
};
// const getTitleData = () => {
//     ShipmentInspectionContainerSNQuery({
//         ShipmentInspectionNo: ShipmentInspectionNo.value,
//     }).then((res: any) => {
//         titleData.value = res.content;
//     });
// };
const handleUploadChange = (file: any, fileList1: any, row: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const fullBase64 = e.target.result; // 例如 "data:image/png;base64,iVBORw0KGgo..."
        // 去除前缀，只保留纯 base64 字符串
        const pureBase64 = fullBase64.split(",")[1];
        row.PictureFile = pureBase64;
        row.PictureName = file.name;
        fileList.value = [];
        console.log(row.PictureName, row.PictureFile);
    };
    reader.readAsDataURL(file.raw);
};
const handleUploadRemove = (file: any, fileList1: any, row: any) => {
    fileList.value = [];
    row.PictureFile = "";
    row.PictureName = "";
};
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        ElMessage({
            type: "error",
            message: "只能上传 JPG/PNG 格式的图片!",
        });
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
        ElMessage({
            type: "error",
            message: "上传图片大小不能超过 5MB!",
        });
        return false;
    }
    return true;
};
//保存
const handleInspectSave = () => {
    let val = dataForm(1);
    console.log(selectedEmployees.value);
    console.log(val);
    if (val.Inspector === "") {
        ElMessage({
            type: "error",
            message: "请选择检验员",
        });
        return
    }

    ElMessageBox.confirm("确定要保存吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        ShipmentInspectionExecute(val).then((res: any) => {
            ElMessage({
                type: res.success ? "success" : "error",
                message: res.success ? "保存成功" : res.msg,
            });
            if (res.success) {
                getTitleData();
                getData();
            }
        });
    }).catch(() => {
        // 取消操作
        ElMessage({
            type: "info",
            message: "已取消保存",
        });
    });
    // ShipmentInspectionExecute(val).then((res: any) => {

    //     ElMessage({
    //         type: res.success ? "success" : "error",
    //         message: res.success ? "保存成功" : res.msg,
    //     });
    //     if (res.success) {
    //         getTitleData();
    //         getData();
    //     }
    // });
};
//提交
const handleInspectConfirm = () => {
    let val = dataForm(2);
    if (val.Inspector === "") {
        ElMessage({
            type: "error",
            message: "请选择检验员",
        });
        return
    }
    ShipmentInspectionExecute(val).then((res: any) => {

        ElMessage({
            type: res.success ? "success" : "error",
            message: res.success ? "提交成功" : res.msg,
        });
        if (res.success) {
            // getTitleData()
            getData();
            selectedEmployees.value = []
            OrganizationId.value = ""
            editVisible.value = false;
        }
    });
};
// 修改 dataForm，增加整体检验结果汇总
const dataForm = (val: any) => {
    // if (selectedEmployees.value.length === 0) {
    //     ElMessage({
    //         type: "error",
    //         message: "请选择检验员",
    //     });
    //     return
    // }
    // selectedEmployees.value = [...new Set(selectedEmployees.value)]; // 去重
    const commonFields = {
        Status: val,
        Inspector: userStore.getUserInfo,
        InspectionTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    const data: any = {
        ...editForm.value,
        ...commonFields,
        shipmentInspectionSNEntities: [],
        shipmentInspectionSNDetailEntities: [],
    };

    // 统计所有容器的检验结果
    let allQualified = true;
    const { snEntities, detailEntities } = titleData.value.reduce(
        (acc, v: any) => {
            const { DetailData, ...snEntity } = v;
            acc.snEntities.push(snEntity);
            // 检查当前容器结果是否为合格
            if (snEntity.JudgmentResult !== "合格") {
                allQualified = false;
            }
            // 处理明细数据
            if (Array.isArray(DetailData)) {
                const processedDetails = DetailData.map((detail: any) => ({
                    ...detail,
                    ...commonFields,
                }));
                acc.detailEntities.push(...processedDetails);
            } else if (DetailData) {
                acc.detailEntities.push({
                    ...DetailData,
                    ...commonFields,
                });
            }
            return acc;
        },
        { snEntities: [], detailEntities: [] },
    );

    // 整体结果：如果没有容器或所有容器合格，则为合格，否则不合格
    data.InspectionResult =
        titleData.value.length === 0 || allQualified ? "合格" : "不合格";
    data.shipmentInspectionSNEntities = snEntities.map((item: any) => ({
        ...item,
        Inspector: selectedEmployees.value.length > 0 ? selectedEmployees.value.join(',') : ""
    }));
    data.shipmentInspectionSNDetailEntities = detailEntities;
    data.Inspector = selectedEmployees.value.length > 0 ? selectedEmployees.value.join(',') : "";

    return data;
};

const openAddBatch = () => {
    batchVisible.value = true;
    batchForm.value = {
        MfgOrderName: editForm.value.MfgOrder,
        ProductName: editForm.value.Product,
        CustomerName: editForm.value.Customer,
        ContainerName: "",
        SN: "",
        ShipmentInspectionNo: editForm.value.ShipmentInspectionNo,
        Creator: userStore.getUserInfo,
    };
};
const handleAddClose = () => {
    batchForm.value.ContainerName = "";
    batchVisible.value = false;
};
const handleAddConfirm = () => {
    ShipmentInspectionContainerSNAdd(batchForm.value).then((res: any) => {
        // ElNotification({
        //     title: '提示信息',
        //     type: res.success ? 'success' : 'error',
        //     message: res.success ? '新增成功' : res.msg
        // })
        ElMessage({
            type: res.success ? "success" : "error",
            message: res.success ? "添加成功" : res.msg,
        });
        if (res.success) {
            getTitleData();
            batchVisible.value = false;
        } else {
            batchForm.value.ContainerName = "";
        }
    });
};
const previewImg = (row: any) => {
    if (row.PictureFile !== null && row.PictureFile !== '') {
        let pureName64 = row.PictureName.split(".")[1];
        srcList.value = [`data:image/${pureName64};base64,${row.PictureFile}`];
        showPreview.value = true;
        return
    }
    srcList.value = []
    LabelPrintDownloadFtpServer(row.PictureId).then((res: any) => {
        if (res.success) {
            // row.PictureFile = res.content;
            let base64Data = res.content;
            let pureName64 = base64Data.FileName.split(".")[1];
            srcList.value = [`data:image/${pureName64};base64,${base64Data.FileData}`];
            showPreview.value = true;
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
        tableHeight.value = window.innerHeight - 250;
    });
};
const columnWidths1 = computed(() => {
    const columns = [
        { label: "检验单号", prop: "ShipmentInspectionNo" },
        { label: "工单号", prop: "MfgOrder" },
        { label: "事业部", prop: "BusinessDivision" },
        { label: "检验类型", prop: "InspectionType" },
        { label: "产品编码", prop: "Product" },
        { label: "产品名称", prop: "ProductName" },
        { label: "数量", prop: "Qty" },
        { label: "客户", prop: "Customer" },
        { label: "LotNo", prop: "LotNo" },
        { label: "状态", prop: "Status" },
        { label: "检验结果", prop: "InsnectionResult" },
        { label: "创建人", prop: "Creator" },
        { label: "创建时间", prop: "CreateTime" },
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
        { label: "批次号", prop: "LotNo" },
        { label: "批次", prop: "ContainerName" },
        { label: "SN码", prop: "SN" },
        { label: "合格率", prop: "PassRate" },
        { label: "备注", prop: "Remark" },
        { label: "创建人", prop: "Creator" },
        { label: "创建时间", prop: "CreateTime" },
        { label: "检验时间", prop: "InspectionTime" },
        { label: "检验员", prop: "Inspector" },
    ];
    // 批量计算列宽
    return calculateColumnsWidth(columns, titleData.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth2 = (prop: string) => {
    return columnWidths2.value[prop] || "auto";
};
const columnWidths3 = computed(() => {
    const columns = [
        { label: "批次", prop: "ContainerName" },
        { label: t('shipmentInspect.snbox'), prop: "SN" },
        { label: "项目名称", prop: "ProjectName" },
        { label: "检验方法", prop: "MeasurementMethod" },
        { label: "目标值", prop: "TargetValue" },
        { label: "上限", prop: "MaxiMum" },
        { label: "下限", prop: "MiniMum" },
        { label: "实际值", prop: "ActualValue" },
        { label: "单位", prop: "Unit" },
        { label: "备注", prop: "Remark" },

    ];
    // 批量计算列宽
    return calculateColumnsWidth(columns, measureData.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth3 = (prop: string) => {
    return columnWidths3.value[prop] || "auto";
};
const columnWidths4 = computed(() => {
    const columns = [
        { label: "sn码", prop: "ContainerName" },
        { label: "SN码", prop: "SN" },
        { label: "项目名称", prop: "ProjectName" },
        { label: "检验方法", prop: "MeasurementMethod" },
        { label: "目标值", prop: "TargetValue" },
        { label: "上限", prop: "MaxiMum" },
        { label: "下限", prop: "MiniMum" },
        { label: "实际值", prop: "ActualValue" },
        { label: "单位", prop: "Unit" },
        { label: "备注", prop: "Remark" },
    ];
    // 批量计算列宽
    return calculateColumnsWidth(columns, countData.value, {
        padding: 25,
        fontSize: 13,
    });
});

// 在模板中使用
const getColumnWidth4 = (prop: string) => {
    return columnWidths4.value[prop] || "auto";
};
const exportTableInspect = () => {
    ShipmentInspectionContainerSNQuery({
        ShipmentInspectionNo: ShipmentInspectionNo.value,
    }).then((res: any) => {
        const data = res.content || [];
        exportToExcelSpipment(data)
    });
}
const setInputRef = (el: any, index: number) => {
    if (el) {
        inputRefs.value[index] = el;   // 直接按索引存储
    }
};

const handleEnterInput = (e: any, currentIndex: number) => {
    e.preventDefault();
    nextTick(() => {
        const nextInput = inputRefs.value[currentIndex + 1];
        if (nextInput && typeof nextInput.focus === 'function') {
            nextInput.focus();   // el-input-number 组件实例具有 focus 方法
        }
    });
};
</script>
<style scoped>
.el-pagination {
    justify-content: center;
}
</style>
<style lang="scss" scoped></style>
