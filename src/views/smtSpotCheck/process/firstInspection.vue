<template>
    <div class="p-2">
        <el-card :body-style="{ padding: '8px' }">
            <el-form ref="formRef" :model="getForm" :inline="true" label-width="auto" size="small"
                @submit.native.prevent>

                <el-form-item :label="$t('processInspect.creatTime')" class="mb-2"><el-date-picker
                        :shortcuts="shortcuts" v-model="searchDate" value-format="YYYY-MM-DD" type="daterange"
                        range-separator="-" size="small" style="width: 200px" :clearable="false" />
                </el-form-item>
                <!-- <el-form-item :label="$t('oqcInspection.SpecName')" class="mb-2">
                    <el-select v-model="getForm.SpecName" placeholder="" clearable style="width: 200px"
                        @change="getData">
                        <el-option label="模切" value="模切" />
                        <el-option label="裁切" value="裁切" />
                    </el-select>
                </el-form-item> -->
                <el-form-item :label="'检验状态'" class="mb-2">
                    <el-select v-model="getForm.DocumentStatus" placeholder="" clearable style="width: 200px"
                        @change="getData">
                        <!-- <el-option label="待检验" value="待检验" /> -->
                        <el-option label="未完成" value="未完成" />
                        <el-option label="完成" value="完成" />
                    </el-select>
                </el-form-item>

                <el-form-item label="产品类型" prop="ProductType" class="mb-2">
                    <el-select style="width: 200px" v-model="getForm.ProductType" @change="getData" placeholder="请选择"
                        clearable filterable size="small">
                        <el-option :label="p.ProductTypeName" :value="p.ProductTypeName" :key="p.ProductTypeId"
                            v-for="p in produstTypeList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('oqcInspection.productName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.ProductName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('oqcInspection.customerName')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.CustomerName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('oqcInspection.LOtNO')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.LotNo" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
                </el-form-item>
                <el-form-item :label="$t('processInspect.workeOrder')" class="mb-2">
                    <el-input style="width: 200px" v-model="getForm.MfgorderName" placeholder="" clearable
                        @keyup.enter.native="getData"></el-input>
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
                    <el-button type="success" :disabled="tableData.length == 0" size="small" @click="exportTable">
                        导出Excel
                    </el-button>
                    <!-- <el-button type="Danger" size="small" @click="testVisible = true">
                        {{ $t("processInspect.orderInterrupt") }}
                    </el-button> -->
                </el-form-item>
            </el-form>
            <el-table :data="tableData.slice(
                (pageObj.currentPage - 1) * pageObj.pageSize,
                pageObj.currentPage * pageObj.pageSize
            )
                " size="small" :style="{ width: '100%' }" ref="firstInspectRef" :height="tableHeight" border fit
                :row-class-name="tableRowClassName">
                <el-table-column type="index" align="center" fixed :label="$t('publicText.index')" width="50">
                    <template #default="scope">
                        <span>{{
                            scope.$index + pageObj.pageSize * (pageObj.currentPage - 1) + 1
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ES_MfgorderName" :label="$t('processInspect.workeOrder')"
                    :min-width="getColumnWidth('ES_MfgorderName')" fixed>
                    <!-- <template #default="{ row }">
                        <span class="underline cursor-pointer text-cyan-800" @click="openOrder(row.ES_MfgorderName)">{{
                            row.ES_MfgorderName }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="ES_CustomerName" :label="$t('processInspect.customerName')"
                    :min-width="getColumnWidth('ES_CustomerName')" :align="'center'" fixed />
                <el-table-column prop="ES_ProductName" :label="$t('processInspect.productName')"
                    :min-width="getColumnWidth('ES_ProductName')" fixed />

                <el-table-column prop="ES_LotNo" :label="$t('processInspect.LOtNO')"
                    :min-width="getColumnWidth('ES_LotNo')" />
                <el-table-column prop="FirstArticleInspectionStatus" :label="$t('processInspect.firstInspectStatus')"
                    width="80" />
                <el-table-column prop="InProcessInspectionStatus" :label="$t('processInspect.patrolInspectStatus')"
                    width="80" />
                    <el-table-column prop="ES_InspectionResult" :label="$t('processInspect.ES_InspectionResult')"
                    width="80" />
                <el-table-column prop="ES_SpecName" :label="'工序'" />
                <el-table-column prop="ES_ProductType" :label="$t('processInspect.productType')" width="80" />
                <el-table-column prop="ES_CreateDate" :label="$t('processInspect.creatTime')" width="150" />
                <el-table-column :label="$t('publicText.operation')" width="150" fixed="right" align="center">
                    <template #default="scope">
                        <el-tooltip :content="'首检'" placement="top">
                            <el-button type="primary" icon="EditPen" size="small"
                                @click.stop="handleEdit(scope.row, '首检')"
                                :disabled="scope.row.FirstArticleInspectionNo == null">首</el-button>
                        </el-tooltip>
                        <el-tooltip :content="'巡检'" placement="top">
                            <el-button type="warning" icon="EditPen" size="small"
                                @click.stop="handleEdit(scope.row, '巡检')"
                                :disabled="scope.row.InProcessInspectionNo == null">巡</el-button>
                        </el-tooltip>
                        <!-- <el-tooltip :content="'尾检'" placement="top">
                            <el-button type="info" icon="EditPen" size="small" @click.stop="handleEdit(scope.row, '尾检')"
                                :disabled="scope.row.FinalInspectionNo == null">尾</el-button>
                        </el-tooltip>
                        <el-tooltip :content="'上传FA/CPK文件'" placement="top">
                            <el-button type="success" icon="Upload" size="small"
                                @click.stop="handleUpload(scope.row)"></el-button>
                        </el-tooltip> -->
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

        <el-dialog v-model="addVisible" title="添加检验" width="400px" draggable :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handleAddClose">
            <el-form ref="formRef" :model="addForm" label-width="auto" :inline="true">
                <el-form-item :label="$t('processInspect.workeOrder')" prop="MfgorderName">
                    <el-input v-model="addForm.MfgorderName" placeholder="请输入" style="width: 200px" />
                </el-form-item>
                <el-form-item :label="$t('processInspect.inspectType')" prop="InspectionType">
                    <el-select style="width: 200px" v-model="addForm.InspectionType" @change="getData" placeholder="请选择"
                        clearable filterable>
                        <el-option :label="v.inspectType" :value="v.inspectType" :key="v.inspectType"
                            v-for="v in inspectList" />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('processInspect.specName')" prop="SpecName">
                    <el-select style="width: 200px" v-model="addForm.SpecName" @change="getData" placeholder="请选择"
                        clearable filterable>
                        <el-option :label="v.SpecName" :value="v.SpecName" :key="v.SpecName" v-for="v in specList" />
                    </el-select>
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
        <el-dialog v-model="editVisible" :title="title" width="90%" :append-to-body="true" :close-on-click-modal="false"
            :close-on-press-escape="false" align-center @close="handleEditClose">
            <el-form ref="editFormRef" :model="editForm" label-width="auto" :inline="true" :size="'small'">
                <el-form-item :label="$t('processInspect.inspectOrder')" prop="InspectionNO">
                    <el-input v-model="editForm.InspectionNO" placeholder="" disabled />
                </el-form-item>
                <el-form-item :label="$t('processInspect.workeOrder')" prop="MfgorderName">
                    <el-input v-model="editForm.MfgorderName" placeholder="" disabled />
                </el-form-item>

                <el-form-item :label="$t('processInspect.LOtNO')" prop="LotNo">
                    <el-input v-model="editForm.LotNo" placeholder="" disabled />
                </el-form-item>
                <el-form-item :label="$t('processInspect.productType')" prop="ProductType">
                    <el-input v-model="editForm.ProductType" placeholder="" disabled />
                </el-form-item>
                <el-form-item :label="$t('processInspect.productName')" prop="ProductName">
                    <el-input v-model="editForm.ProductName" placeholder="" disabled />
                </el-form-item>
                 <el-form-item>
                   <el-button type="success"  size="small"
                        @click="exportTableInspect">
                        导出Excel
                    </el-button>
                </el-form-item>
                
            </el-form>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane :label="'计量检验'+(editForm.listItem.length)" name="first">
                    <el-table ref="tempMeasureRef" :data="editForm.listItem" style="width: 100%" :height="300"
                        size="small" border :span-method="objectSpanMethod" :tooltip-effect="'dark'"
                        :row-class-name="tableDetailRowClassName">
                        <el-table-column prop="LineNos" :label="'检验序列'" :align="'center'" :fixed="'left'" width="80">
                        </el-table-column>
                        <el-table-column prop="ProjectCategoryName" :label="$t('aqlrules.ProjectCategoryName')">
                        </el-table-column>
                        <el-table-column prop="ProjectName" :label="$t('aqlrules.ProjectName')"
                            :min-width="getColumnWidth2('ProjectName')">
                        </el-table-column>
                        <!-- <el-table-column prop="InspectionType" :label="$t('aqlrules.DBType')">
                        </el-table-column> -->
                        <el-table-column prop="CharaCteristicGrade" :label="$t('aqlrules.CharaCteristicGrade')">
                        </el-table-column>
                        <el-table-column prop="TargetValue" :label="$t('aqlrules.TargetValue')">
                        </el-table-column>

                        <el-table-column prop="MaxValue" :label="$t('aqlrules.MaxValue')">
                        </el-table-column>
                        <el-table-column prop="MinValue" :label="$t('aqlrules.MinValue')">
                        </el-table-column>

                        <el-table-column prop="ToolName" :label="$t('aqlrules.ToolName')"
                            :min-width="getColumnWidth2('ToolName')">
                        </el-table-column>
                        <el-table-column prop="InspectionBasis" :label="$t('aqlrules.InspectionBasis')"
                            :min-width="getColumnWidth2('InspectionBasis')">
                        </el-table-column>
                        <el-table-column prop="SampleNum" :label="$t('incomeSheet.numberOfSample')" width="150">
                            <template #default="scope">
                                <el-input-number v-model="scope.row.SampleNum" :min="1"
                                    @change="handleSampleSizeChange(scope.row)"
                                    :disabled="scope.row.InspectionResult == 'OK'" style="width: 100%;" size="small" />
                                <!-- <el-input v-model="scope.row.SampleNum" size="small" type="number" min="1" max="10"
                                    @change="handleSampleSizeChange(scope.row)"
                                    :disabled="scope.row.InspectionResult == 'OK'"></el-input> -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="DefectNum" :label="$t('incomeSheet.numberOfDefect')">
                            <template #default="scope">
                                {{ scope.row.DefectCount || calculateDefectCount(scope.row) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="ObservedValue" width="150" :label="$t('incomeSheet.MeasurementNumber')">
                            <template #default="scope">
                                <span>{{ scope.row.ObservedValue }}</span>
                                <el-button type="primary" icon="Plus" :size="'small'"
                                    :disabled="scope.row.InspectionResult == 'OK'"
                                    @click="openMeasurementDialog(scope.row, scope.$index)" />
                            </template>
                        </el-table-column>

                        <el-table-column prop="numberOfDefect" :label="'结果'">
                            <template #default="scope">
                                {{ getResultText2(scope.row) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="PictureName" :label="$t('shipmentInspect.pictureName')" width="120">
                            <template #default="{ row }">
                                <span class="underline text-[#006487]" @click="previewImg(row)">{{
                                    row.PictureName
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ResulthandLing" :label="'不良处理结果'" width="150">
                            <template #default="scope">
                                <el-input v-model="scope.row.ResulthandLing" size="small"
                                    :disabled="scope.row.InspectionResult == 'OK'"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('publicText.push')" width="80" fixed="right" align="center">
                            <template #default="{ row }">
                                <el-upload v-model:file-list="fileListImg" :limit="1" :auto-upload="false" :on-change="(file: any, fileList: any) =>
                                    handleUploadChange(file, fileList, row)
                                    " :on-remove="(file: any, fileList: any) =>
                                        handleUploadRemove(file, fileList, row)
                                        " :before-upload="beforeUploadImg" accept=".jpg,.png"
                                    list-type="picture">
                                    <el-button icon="Upload" type="primary" :size="'small'"></el-button>
                                </el-upload></template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="'计数检验'+(editForm.countItem.length)" name="second">
                    <el-table :data="editForm.countItem" style="width: 100%" :height="350" size="small" border
                        :span-method="objectSpanMethod2" :tooltip-effect="'dark'"
                        :row-class-name="tableDetailRowClassName2">
                        <el-table-column prop="LineNos" :label="'检验序列'" :align="'center'" :fixed="'left'" width="80">
                        </el-table-column>
                        <el-table-column prop="ProjectCategoryName" :label="$t('aqlrules.ProjectCategoryName')">
                        </el-table-column>
                        <el-table-column prop="ProjectName" :label="$t('aqlrules.ProjectName')"
                            :min-width="getColumnWidth2('ProjectName')">
                        </el-table-column>
                        <el-table-column prop="TargetValue" :label="$t('aqlrules.TargetValue')">
                        </el-table-column>
                        <el-table-column prop="CharaCteristicGrade" :label="$t('aqlrules.CharaCteristicGrade')">
                        </el-table-column>
                        <el-table-column prop="ToolName" :label="$t('aqlrules.ToolName')"
                            :min-width="getColumnWidth2('ToolName')">
                        </el-table-column>
                        <el-table-column prop="InspectionBasis" :label="$t('aqlrules.InspectionBasis')"
                            :min-width="getColumnWidth2('InspectionBasis')">
                        </el-table-column>
                        <el-table-column prop="SampleNum" :label="$t('incomeSheet.numberOfSample')" width="120">
                            <template #default="scope">
                                <el-input-number v-model="scope.row.SampleNum" :min="1"
                                    :disabled="scope.row.InspectionResult == 'OK'" style="width: 100%;" size="small" />
                                <!-- <el-input v-model="scope.row.SampleNum" size="small" type="number"
                                    :disabled="scope.row.InspectionResult == 'OK'"></el-input> -->
                                <!-- <el-input-number v-model="scope.row.SampleNum" size="small" style="width: 100%;"
                                    :min="0" :disabled="scope.row.InspectionResult == 'OK'" /> -->
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="DefectNum" :label="$t('incomeSheet.numberOfDefect')" width="120">
                            <template #default="scope">

                                <el-input-number v-model="scope.row.DefectNum" size="small" style="width: 100%;"
                                    :min="0" :disabled="scope.row.InspectionResult == 'OK'" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="DefectDec" :label="$t('incomeSheet.DefectDec')">
                            <template #default="scope">
                                <el-input v-model="scope.row.DefectDec" size="small"
                                    :disabled="scope.row.InspectionResult == 'OK'"></el-input>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="numberOfDefect" :label="'结果'" width="100">
                            <template #default="{ row }">
                                <el-select v-model="row.Status" placeholder="请选择" style="width: 100%;" size="small"
                                    :disabled="row.InspectionResult == 'OK'">
                                    <el-option label="OK" value="OK" />
                                    <el-option label="NG" value="NG" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PictureName" :label="$t('shipmentInspect.pictureName')" width="120">
                            <template #default="{ row }">
                                <span class="underline text-[#006487]" @click="previewImg(row)">{{
                                    row.PictureName
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ResulthandLing" :label="'不良处理结果'" width="150">
                            <template #default="scope">
                                <el-input v-model="scope.row.ResulthandLing" size="small"
                                    :disabled="scope.row.InspectionResult == 'OK'"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('publicText.push')" width="80" fixed="right" align="center">
                            <template #default="{ row }">
                                <el-upload v-model:file-list="fileListImg" :limit="1" :auto-upload="false" :on-change="(file: any, fileList: any) =>
                                    handleUploadChange(file, fileList, row)
                                    " :on-remove="(file: any, fileList: any) =>
                                        handleUploadRemove(file, fileList, row)
                                        " :before-upload="beforeUploadImg" accept=".jpg,.png"
                                    list-type="picture">
                                    <el-button icon="Upload" type="primary" :size="'small'"></el-button>
                                </el-upload></template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

            </el-tabs>
            <template #footer>
                <div class="flex justify-between">
                    <div>
                        <el-button type="primary" @click="handleEditConfirm"
                            :disabled="(editForm.InspectionType == '首检' && editForm.FirstArticleInspectionStatus == '完成')">
                            {{ "提交" }}
                        </el-button>
                    </div>
                    <div> <el-button @click="handleEditClose">{{
                        $t("publicText.close")
                            }}</el-button>
                        <el-button type="warning" @click="handleEditZQConfirm"
                            :disabled="(editForm.InspectionType == '首检' && editForm.FirstArticleInspectionStatus == '完成')">
                            {{ "暂存" }}
                        </el-button>
                    </div>


                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisible" :title="'输入测量值'" width="500px">
            <el-form ref="formRef" label-width="auto" size="small" @submit.native.prevent>
                <el-form-item :label="'样本值' + i" prop="name" v-for="i in currentSampleSize" :key="i">
                    <el-input :ref="(el: any) => setInputRef(el, i)" @keyup.enter.native="handleEnterInput($event, i)"
                        v-model="measurementValues[i - 1]" placeholder="请输入测量值" style="width: 200px" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="info" @click="resetMeasurement">重置</el-button>
                    <el-button type="primary" @click="saveMeasurements">保存</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="uploadVisible" :title="'上传FA/CPK文件'" width="650px" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handleUploadClose">
            <el-card :body-style="{ padding: '8px' }" class="mb-2">
                <template #header>
                    <div class="flex justify-between items-center ">
                        <div class="flex items-center gap-2">
                            <el-icon :size="18" color="#409eff">
                                <Document />
                            </el-icon>
                            <span class="text-lg font-extrabold">FA文件</span>
                            <el-tag size="small" :type="deleteFAForm.TemplateName ? 'success' : 'info'" class="ml-2">
                                {{ deleteFAForm.TemplateName ? '已上传' : '未上传' }}
                            </el-tag>
                        </div>
                        <el-button v-if="deleteFAForm.TemplateName" type="danger" size="small" plain
                            @click="handleDeleteFA">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </div>
                </template>

                <!-- 当前文件信息 -->
                <div v-if="uploadForm.TemplateName" class="current-file mb-3">
                    <div class="flex items-center">
                        <el-icon :size="28" color="#409eff">
                            <Document />
                        </el-icon>
                        <div class="flex-1">
                            <div class="file-name">{{ uploadForm.TemplateName }}</div>
                        </div>
                    </div>
                </div>

                <!-- 上传区域 -->
                <div class="upload-area">
                    <el-upload action="#" :limit="1" v-model:file-list="fileList" :auto-upload="false"
                        :on-change="file1UpChange" :on-remove="file1UpRemove" :before-upload="beforeUpload"
                        accept=".xlsx" :show-file-list="false" ref="upload1">
                        <div class="upload-content">
                            <div class="upload-icon-wrapper">
                                <el-icon class="upload-icon">
                                    <Upload />
                                </el-icon>
                            </div>
                            <div class="upload-text">
                                <div class="upload-main-text">点击上传FA文件</div>
                                <div class="upload-hint">支持 .xlsx 格式，最大5MB</div>
                            </div>
                        </div>
                    </el-upload>
                </div>

            </el-card>
            <el-card :body-style="{ padding: '8px' }">
                <template #header>
                    <div class="flex justify-between items-center ">
                        <div class="flex items-center gap-2">
                            <el-icon :size="18" color="#409eff">
                                <Document />
                            </el-icon>
                            <span class="text-lg font-extrabold">CPK文件</span>
                            <el-tag size="small" :type="deleteCPKForm.TemplateName ? 'success' : 'info'" class="ml-2">
                                {{ deleteCPKForm.TemplateName ? '已上传' : '未上传' }}
                            </el-tag>
                        </div>
                        <el-button v-if="deleteCPKForm.TemplateName" type="danger" size="small" plain
                            @click="handleDeleteCPK">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </div>
                </template>

                <!-- 当前文件信息 -->
                <div v-if="uploadForm2.TemplateName" class="current-file mb-3">
                    <div class="flex items-center">
                        <el-icon :size="28" color="#409eff">
                            <Document />
                        </el-icon>
                        <div class="flex-1">
                            <div class="file-name">{{ uploadForm2.TemplateName }}</div>
                        </div>
                    </div>
                </div>

                <!-- 上传区域 -->
                <div class="upload-area">
                    <el-upload action="#" :limit="1" v-model:file-list="fileList2" :auto-upload="false"
                        :on-change="file1UpChange2" :on-remove="file1UpRemove2" :before-upload="beforeUpload"
                        accept=".xlsx" :show-file-list="false" ref="upload2">
                        <div class="upload-content">
                            <div class="upload-icon-wrapper">
                                <el-icon class="upload-icon">
                                    <Upload />
                                </el-icon>
                            </div>
                            <div class="upload-text">
                                <div class="upload-main-text">点击上传CPK文件</div>
                                <div class="upload-hint">支持 .xlsx 格式，最大5MB</div>
                            </div>
                        </div>
                    </el-upload>
                </div>
            </el-card>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleUploadClose">取消</el-button>
                    <el-button type="primary" @click="handleUploadfirm">确定</el-button>
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
        <el-dialog v-model="productConVisit" :title="'工单信息：' + MfgOrderName" width="80%" :append-to-body="true"
            :close-on-click-modal="false" :close-on-press-escape="false" align-center @close="handleOtherClose">
            <el-tabs v-model="activeConName" @tab-change="handleClick" type="border-card">
                <el-tab-pane label="生产调控" name="first">
                    <el-table :data="ProControlTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="MfgOrder" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="Description" :label="'生产备注'"
                            :min-width="getColumnWidth3('Description')" />
                        <el-table-column prop="MfgOrderPO" :label="'工单PO'" :min-width="getColumnWidth3('MfgOrderPO')" />
                        <el-table-column prop="Quantity" :label="'生产数量'" />
                        <el-table-column prop="OrderQty" :label="'工单数量'" />
                        <el-table-column prop="ProductName" :label="$t('oqcInspection.productName')"
                            :min-width="getColumnWidth3('ProductName')" />
                        <el-table-column prop="ProductType" :label="$t('oqcInspection.productCategory')" />
                        <el-table-column prop="ProductDescription" :label="'产品描述'"
                            :min-width="getColumnWidth3('ProductDescription')" />
                        <el-table-column prop="CustomerName" :label="$t('oqcInspection.customerName')" />
                        <el-table-column prop="CustomerPO" :label="$t('oqcInspection.customerPO')" width="130" />
                        <el-table-column prop="CustomerPN" :label="$t('oqcInspection.customerPN')" width="130" />
                        <el-table-column prop="SpecName" :label="'工序'" width="130" />
                        <el-table-column prop="SpecificationNo" :label="'规格书编号'" width="130" />
                        <el-table-column prop="Tabulator" :label="$t('oqcInspection.CreateTime')" width="150" />
                        <el-table-column prop="AcceptOrdersDate" :label="'下单日期'" width="150" />
                        <el-table-column prop="PlaceAnOrderDate" :label="'排产日期'" width="150" />
                        <el-table-column prop="ShipmentDate" :label="'出货日期'" width="150" />
                        <el-table-column prop="SchedulingDate" :label="'接单日期'" width="150" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="物料出仓" name="second">
                    <el-table :data="MaterialDisTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="MfgOrderName" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="MfgOrderPO" :label="'产品分类'" />
                        <el-table-column prop="ProductName" :label="'原料名称'"
                            :min-width="getColumnWidth4('ProductName')" />
                        <el-table-column prop="MaterialSpecifications" :label="'原料规格'" />
                        <el-table-column prop="MaterialLot" :label="'原料批号'" width="130" />
                        <el-table-column prop="QtyRequired" :label="'申领数量'" />
                        <el-table-column prop="BatchLot" :label="'生产批号'" width="130" />
                        <el-table-column prop="MOSignForConfirmUserName" :label="'MO签收确认'" width="130" />
                        <el-table-column prop="MOSignForConfirmDate" :label="'MO签收确认时间'" width="130" />
                        <el-table-column prop="WareHouseConfirmUserName" :label="'仓管确认'" width="130" />
                        <el-table-column prop="WareHouseConfirmDate" :label="'仓管确认时间'" width="130" />
                        <el-table-column prop="LabelProductionConfirmUserName" :label="'标签制作确认'" width="130" />
                        <el-table-column prop="LabelSignForConfirmDate" :label="'标签制作确认时间'" width="150" />
                        <el-table-column prop="LabelSignForConfirmUserName" :label="'标签签收确认'" width="150" />
                        <el-table-column prop="LabelSignForConfirmDate" :label="'标签签收确认时间'" width="150" />
                        <el-table-column prop="CuttingQty" :label="'开料数量'" width="150" />
                        <el-table-column prop="MaterialReceiverName" :label="'领料人'" width="150" />
                        <el-table-column prop="MaterialRequisitionDate" :label="'领料时间'" width="150" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="生产过程" name="third">
                    <el-table :data="ProLineRealTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="MfgOrderName" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="ResourceName" :label="'设备编号'" />
                        <el-table-column prop="ProductName" :label="'模具编号'" />
                        <!-- <el-table-column prop="MaterialSpecifications" :label="'一模数'" />
                        <el-table-column prop="MaterialLot" :label="'片数/卷数'" width="130" /> -->
                        <el-table-column prop="MoveInDate" :label="'开始时间'" />
                        <el-table-column prop="TxnDate" :label="'终止时间'" width="130" />
                        <el-table-column prop="TimeDiff" :label="'时长'" />
                        <el-table-column prop="EmployeeName" :label="'工号'" width="130" />
                        <el-table-column prop="FullName" :label="'姓名'" width="130" />
                    </el-table></el-tab-pane>
                <el-tab-pane label="包装数据" name="fourth">
                    <el-table :data="FinishedProTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="MfgOrderName" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="count_records" :label="'整箱数量'" />
                        <el-table-column prop="avg_NumberOfBoxes" :label="'整箱箱数'" />
                        <el-table-column prop="MaterialSpecifications" :label="'尾箱数量'" />
                        <el-table-column prop="MaterialLot" :label="'尾箱箱数'" width="130" />
                        <el-table-column prop="QtyRequired" :label="'整包数量'" />
                        <el-table-column prop="BatchLot" :label="'整包包数'" width="130" />
                        <el-table-column prop="MOSignForConfirmUserName" :label="'尾箱：包/箱'" width="130" />
                        <el-table-column prop="MOSignForConfirmDate" :label="'整箱净重kg'" width="130" />
                        <el-table-column prop="WareHouseConfirmUserName" :label="'整箱毛重kg'" width="130" />
                        <el-table-column prop="BoxModlName" :label="'整箱外箱型'" width="100" />
                        <el-table-column prop="LabelProductionConfirmUserName" :label="'尾箱净重kg'" width="130" />
                        <el-table-column prop="LabelSignForConfirmDate" :label="'尾箱毛重kg'" width="150" />
                        <el-table-column prop="LabelSignForConfirmUserName" :label="'尾箱外箱型'" width="150" />
                        <el-table-column prop="total_gross_weight" :label="'整包净重kg'" width="150" />
                        <el-table-column prop="total_net_weight" :label="'整包毛重kg'" width="150" />
                        <el-table-column prop="MaterialReceiverName" :label="'尾包数量'" width="150" />
                        <el-table-column prop="MaterialRequisitionDate" :label="'尾包包数'" width="150" />
                        <el-table-column prop="MaterialReceiverName" :label="'尾包净重kg'" width="150" />
                        <el-table-column prop="MaterialRequisitionDate" :label="'尾包毛重kg'" width="150" />
                        <el-table-column prop="MaterialReceiverName" :label="'工号'" width="150" />
                        <el-table-column prop="MaterialRequisitionDate" :label="'姓名'" width="150" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="过程检验" name="five">
                    <el-table :data="ProStageTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="order_no" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="pass_rate_percent" label="合格率" />
                        <el-table-column prop="total_qty" label="总数量" />
                        <el-table-column prop="good_qty" label="良品数" />
                        <el-table-column prop="defect_qty" label="不良品数" />
                        <el-table-column prop="current_balance" label="本次结余" />
                        <el-table-column prop="process_defect_rate_percent" label="工序不良率" />
                        <el-table-column prop="process_defect_indentation" label="工序-压痕" />
                        <el-table-column prop="process_defect_uneven" label="工序-凹凸" />
                        <el-table-column prop="process_defect_burr" label="工序-毛边" />
                        <el-table-column prop="process_defect_crack" label="工序-开裂" />
                        <el-table-column prop="process_defect_foreign_matter" label="工序-异物" />
                        <el-table-column prop="process_defect_red_dot" label="工序-红点" />
                        <el-table-column prop="process_defect_over_cut" label="工序-多切" />
                        <el-table-column prop="process_defect_deformation" label="工序-变形" />
                        <el-table-column prop="process_defect_punch_break" label="工序-冲断" />
                        <el-table-column prop="raw_defect_bubble" label="工序-气泡" />
                        <el-table-column prop="process_defect_other" label="工序-其他" />
                        <el-table-column prop="raw_material_defect_rate_percent" label="原料不良率" />
                        <el-table-column prop="raw_defect_glue" label="原料-胶水" />
                        <el-table-column prop="raw_defect_scratch" label="原料-刮伤" />
                        <el-table-column prop="raw_defect_pinhole" label="原料-针孔" />
                        <el-table-column prop="raw_defect_stain" label="原料-污点" />
                        <el-table-column prop="raw_defect_bubble" label="原料-气泡" />
                        <el-table-column prop="raw_defect_broken_corner" label="原料-缺角" />
                        <el-table-column prop="raw_defect_uneven" label="原料-凹凸" />
                        <el-table-column prop="raw_defect_tilt" label="原料-倾斜" />
                        <el-table-column prop="process_defect_foreign_matter" label="原料-异物" />
                        <el-table-column prop="process_defect_red_dot" label="原料-红点" />
                        <el-table-column prop="raw_defect_other" label="原料-其他" />
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="生产备注" name="six">
                    <el-table :data="ManufactureTable" border stripe style="width: 100%" size="small" :height="350">
                        <el-table-column prop="MfgOrder" :label="$t('oqcInspection.workerOrder')" />
                        <el-table-column prop="DataValue" :label="'备注'" :min-width="getColumnWidth5('DataValue')" />
                        <el-table-column prop="LotNumber" :label="'出货批号'" />
                        <el-table-column prop="ShippingQty" :label="'送检数量'" />
                        <el-table-column prop="UnitOfMeasure" :label="'单位'" width="130" />
                        <el-table-column prop="FormattedDate" :label="'送检时间'" />
                        <el-table-column prop="SubmitterNo" :label="'送检人工号'" width="130" />
                        <el-table-column prop="Submitter" :label="'送检人'" />

                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleOtherClose">{{
                        $t("publicText.close")
                        }}</el-button>

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
import ExcelJS from 'exceljs';
import JSZip from "jszip";
import dayjs from "dayjs";
import { exportTableToExcel } from "@/utils/exportExcel";
import { exportMeasureTableToExcelVertical, exportInspectionToExcelVertical } from "@/utils/exportExcel1";
import { handleSplitExcelUpload, handleExcelUploadEnhanced, handleExcelUploadAllFormats } from "@/utils/analysisExcel"
import { saveAs } from "file-saver";
import {
    GetInspectionQuery,
    GetInspectionDelQuery,
    CreateInspectionNO,
    InspectionNOInfoSync,
    FAUploadFtpServer,
    CPKUploadFtpServer,
    FACPKDownloadFtpServer,
    UploadFtpServer,
    DelFtpServer,
    QuerySpecName,
    LabelPrintDownloadFtpServer
} from "@/api/smtSpotCheck/processFisrt";
import {
    GetProjectCategoryQuery,
    GetProjectQuery,
    GetResourceQuery,
    GetInspectionTypeQuery,
    GetProductQuery,
    GetProductTypeQuery
} from "@/api/incomingManage/aqlrules";
import {
    FTPSearchAndDownloadSpecificationDocumentFile,
    QueryProductionControlParameters,
    QueryMaterialDispatchDetails,
    QueryProductionLineRealTimeData,
    QueryProductionStageQCReports,
    QueryFinishedProductPackingData,
    QueryManufacturingNotesHistory,

} from "@/api/smtSpotCheck/oqc";
import {
    ref,
    watch,
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    nextTick,
    reactive,
    computed
} from "vue";
import {
    shortcuts,
    setTodayDate,
    setLastDate,
    disabledDate,
} from "@/utils/dataMenu";
import {showLoading, hideLoading} from "@/utils/loading";
import { calculateColumnsWidth, clearTextWidthCache } from '@/utils/tableminWidth'
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useUserStoreWithOut } from "@/stores/modules/user";
const userStore = useUserStoreWithOut();

const getForm = ref({
    InspectionNO: "",
    InspectionType: "",
    MfgorderName: "",
    ProductName: "",
    PartNo: "",
    CustomerPO: '',
    CustomerName: "",
    LotNo: "",
    ProductType: "",
    DocumentStatus: "未完成",
    StartTime: "",
    EndTime: "",
    SpecName: ''
});
const produstTypeList = ref<any[]>([])
const searchDate = ref<any[]>([]);
const tableHeight = ref(0);
const tableData = ref([]);
const pageObj = reactive({
    currentPage: 1,
    pageSize: 50,
});
const testVisible = ref(false);
const activeName = ref("first");
const productList = ref<any[]>([]);
const typetList = ref<any[]>([]);
const categoryList = ref<any[]>([]);
const resourceList = ref<any[]>([]);
const projectList = ref<any[]>([]);
const addVisible = ref(false);
const addFormRef = ref();
const addForm = ref({
    InspectionType: "",
    MfgorderName: "",
    SpecName: ""
});
const editVisible = ref(false);
const editFormRef = ref();
const editForm = ref<any>({
    InspectionNO: "",
    InspectionType: "",
    MfgorderName: "",
    ProductName: "",
    ProductDec: "",
    PartNo: "",
    CustomerName: "",
    LotNo: "",

    MaterialReQty: "",
    DocumentStatus: "待检验",
    ProductType: "",
    InspectionResult: "",
    CreateDate: "",
    listItem: [],
    countItem: [],
});
const dialogVisible = ref(false);
const currentRow = ref<any>(null);
const currentRowIndex = ref<any>(-1);
const currentSampleSize = ref(0);
const measurementValues = ref<any[]>([]);
const title = ref("");
const spanArr = ref<any[]>([]);
const spanArr2 = ref<any[]>([]);
const uploadForm = ref({
    InspectionNO: "",
    TemplateName: "",
    FileType: "FA",
    TemplateFile: "",
});
const uploadVisible = ref(false);
const uploadFormRef = ref();
const fileList = ref<any[]>([]);
const uploadForm2 = ref({
    InspectionNO: "",
    TemplateName: "",
    FileType: "CPK",
    TemplateFile: "",
});
const fileList2 = ref<any[]>([]);
const firstInspectRef = ref()
const tempMeasureRef = ref()
const fileList3 = ref<any[]>([]);
const previewVisible = ref(false);
const previewUrl = ref("");
const previewTitle = ref("");

const deleteCPKForm = ref({
    InspectionNO: "",
    TemplateName: "",
    FileType: "CPK",
    TemplateFile: "",
})
const deleteFAForm = ref({
    InspectionNO: "",
    TemplateName: "",
    FileType: "FA",
    TemplateFile: "",
})
const productConVisit = ref(false)
const activeConName = ref('first')
const ProControlTable = ref<any[]>([])
const MaterialDisTable = ref<any[]>([])
const ProLineRealTable = ref<any[]>([])
const FinishedProTable = ref<any[]>([])
const ProStageTable = ref<any[]>([])
const ManufactureTable = ref<any[]>([])
const MfgOrderName = ref('')
const inputRefs = ref<any[]>([])
const specList = ref<any[]>([])
const inspectList = ref([{
    inspectType: '首检'
}, {
    inspectType: '巡检'
}
])
const showPreview = ref(false);
const srcList = ref<string[]>([]);
const fileListImg = ref<any[]>([]);
watch(
    () => searchDate.value,
    (newVal: any, oldVal: any) => {
        if (newVal === null) {
            getForm.value.StartTime = "";
            getForm.value.EndTime = "";
            // getForm.value.PageNumber = 1

            return;
        }
        if (newVal !== oldVal) {
            getForm.value.StartTime = newVal[0];
            getForm.value.EndTime = newVal[1] + ' 23:59:59';
            // getForm.value.PageNumber = 1
        }
    }
);

onBeforeMount(() => {
    let end: string = setTodayDate();
    let start: string = setLastDate();
    searchDate.value = [start, end];
    getScreenHeight();
    getProduct();
    getType();
    getCategory();
    GetResource();
    getProject();
    getProductTypeData()

});
onMounted(() => {
    window.addEventListener("resize", getScreenHeight);
    getData();
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", getScreenHeight);
    clearTextWidthCache()
});
const tableRowClassName = (val: any) => {
    let row = val.row;
    if (row.StatusFlag == 1) {
        return "danger-row-invent";
    }
};
const tableDetailRowClassName = (val: any) => {
    let row = val.row;
    if (row.Status == 'NG') {
        return "danger-row-invent1";
    }
};
const tableDetailRowClassName2 = (val: any) => {
    let row = val.row;
    if (row.DefectNum > 0) {
        return "danger-row-invent1";
    }
};
const resetFormData = () => {
    getForm.value = {
        InspectionNO: "",
        InspectionType: "",
        MfgorderName: "",
        ProductName: "",
        PartNo: "",
        CustomerPO: '',
        CustomerName: "",
        LotNo: "",
        ProductType: "",
        DocumentStatus: "未完成",
        StartTime: "",
        EndTime: "",
        SpecName: '',
    }
}
const getData = () => {
    GetInspectionQuery(getForm.value).then((res: any) => {
        if (res.success
        ) {
            tableData.value = res.content;
        } else {
            tableData.value = [];
            ElMessage({
                title: t("message.tipTitle"),
                message: res.msg,
                type: "error",
            });
        }

    });
};
//获取产品类别
const getProductTypeData = () => {
    GetProductTypeQuery({}).then((res: any) => {
        produstTypeList.value = res.content;
    })
}
const getProduct = () => {
    GetProductQuery({}).then((res: any) => {
        productList.value = res.content;
    });
};
const getType = () => {
    GetInspectionTypeQuery({}).then((res: any) => {
        typetList.value = res.content;
    });
};
const getCategory = () => {
    GetProjectCategoryQuery({}).then((res: any) => {
        categoryList.value = res.content;
    });
};
const GetResource = () => {
    GetResourceQuery({}).then((res: any) => {
        resourceList.value = res.content;
    });
};
const getProject = () => {
    GetProjectQuery({}).then((res: any) => {
        projectList.value = res.content;
    });
};
//获取工序
const getSpecData = () => {
    QuerySpecName({}).then((res: any) => {
        specList.value = res.content
    })
}
// 替换原来的 exportTableInspect 方法
const exportTableInspect = async () => {
  // 准备数据行
  const rows: any[] = [];
  const measureItems = editForm.value.listItem || [];
  const countItems = editForm.value.countItem || [];

  // 计量数据
  measureItems.forEach((item: any) => {
    rows.push({
      ...item,
      InspectionType: '计量',         // 用于合并的检验类型
      TypeDisplay: '计量',            // 实际显示值
      Status: item.Status || (item.InspectionResult === 'OK' ? 'OK' : 'NG'), // 结果
    });
  });

  // 计数数据
  countItems.forEach((item: any) => {
    rows.push({
      ...item,
      InspectionType: '计数',
      TypeDisplay: '计数',
      Status: item.Status || (item.InspectionResult === 'OK' ? 'OK' : 'NG'),
    });
  });

  if (rows.length === 0) {
    ElMessage.warning('暂无数据可导出');
    return;
  }

  // 表头定义
  const headers = [
    'IPQC过程单号',
    '工单号',
    'LOT NO',
    '产品编码',
    '产品名称',
    '检验类型',
    '检验序列',
    '检验类别',
    '检验名称',
    '目标值',
    '最大值',
    '最小值',
    '检验工具',
    '检验依据',
    '样品数',
    '缺陷数',
    '测量值',
    '结果'
  ];
  showLoading('正在生成Excel文件...');
  // 创建工作簿和工作表
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('检验明细');

  // 添加表头行（第一行）
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle' };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFD9D9D9' }
  };
  headerRow.border = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  };

  // 添加数据行（从第二行开始）
  rows.forEach((row) => {
    const dataRow = worksheet.addRow([
      editForm.value.InspectionNO,
      editForm.value.MfgorderName,
      editForm.value.LotNo,
      editForm.value.PartNo,
      editForm.value.ProductName,
      row.TypeDisplay,
      row.LineNos,
      row.ProjectCategoryName,
      row.ProjectName,
      row.TargetValue,
      row.MaxValue,
      row.MinValue,
      row.ToolName,
      row.InspectionBasis,
      row.SampleNum,
      row.DefectNum ?? row.DefectCount ?? 0,
      row.ObservedValue,
      row.Status,
    ]);

    // 设置单元格样式
    dataRow.alignment = { horizontal: 'center', vertical: 'middle' };
    dataRow.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

  // 合并“检验类型”列（F列，索引6，从第2行开始）
  const typeColumnIndex = 6; // 检验类型在第6列（A=1）
  let startRow = 2; // 数据从第2行开始（第1行是表头）
  let currentType = rows[0]?.InspectionType;
  let count = 0;

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].InspectionType === currentType) {
      count++;
    } else {
      // 合并前一类型
      if (count > 1) {
        worksheet.mergeCells(startRow, typeColumnIndex, startRow + count - 1, typeColumnIndex);
      }
      // 重置
      currentType = rows[i].InspectionType;
      startRow = i + 2;
      count = 1;
    }
  }
  // 处理最后一组
  if (count > 1) {
    worksheet.mergeCells(startRow, typeColumnIndex, startRow + count - 1, typeColumnIndex);
  }

  // ========== 动态计算列宽 ==========
  // 获取每列的最大内容宽度（考虑表头和所有数据行）
  const colCount = headers.length;
  const minWidth = 10;   // 最小列宽
  const maxWidth = 50;   // 最大列宽（避免过宽）
  
  for (let col = 1; col <= colCount; col++) {
    let maxLength = 0;
    // 遍历工作表中该列的所有单元格（包括表头）
    worksheet.getColumn(col).eachCell({ includeEmpty: true }, (cell) => {
      let cellValue = cell.value?.toString() || '';
      // 计算字符长度（中文按2个字符宽度计算，英文数字按1个）
      const length = getCharWidth(cellValue);
      if (length > maxLength) {
        maxLength = length;
      }
    });
    // 设置列宽，加一些额外边距
    const colWidth = Math.min(maxWidth, Math.max(minWidth, maxLength + 2));
    worksheet.getColumn(col).width = colWidth;
  }

  // 生成并下载
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${editForm.value.InspectionNO}_检验明细_${dayjs().format('YYYYMMDDHHmmss')}.xlsx`);
hideLoading();
};

// 辅助函数：计算字符串显示宽度（中文占2，英文数字占1）
const getCharWidth = (str: string): number => {
  let width = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    // 中文字符范围判断 (粗略)
    if (charCode >= 0x4e00 && charCode <= 0x9fa5) {
      width += 2;
    } else {
      width += 1;
    }
  }
  return width;
};
const exportTable = () => {
    exportTableToExcel({
        tableRef: firstInspectRef.value,
        fetchAllData: fetchFinishAllData,
        fileName: `${'PQC过程检'}_${dayjs().format(
            "YYYYMMDDHHmmss"
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
}
const fetchFinishAllData = async () => {
    let data = await GetInspectionQuery(getForm.value).then(
        (res: any) => {
            return res.content.map((item: any) => {
                item.UpdateTime = dayjs(item.UpdateTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                );
                return item;
            });
        }
    );
    return data;
};
const handleUpload = (row: any) => {
    uploadForm.value.InspectionNO = row.FirstArticleInspectionNo;
    uploadForm2.value.InspectionNO = row.FirstArticleInspectionNo;
    uploadForm.value.TemplateName = row.ES_FaUrl == null ? '' : row.ES_FaUrl
    uploadForm2.value.TemplateName = row.ES_CPKUrl == null ? '' : row.ES_CPKUrl
    deleteCPKForm.value.InspectionNO = row.FirstArticleInspectionNo
    deleteCPKForm.value.TemplateName = row.ES_CPKUrl == null ? '' : row.ES_CPKUrl
    deleteFAForm.value.InspectionNO = row.FirstArticleInspectionNo
    deleteFAForm.value.TemplateName = row.ES_FaUrl == null ? '' : row.ES_FaUrl
    // console.log(deleteCPKForm.value);
    // console.log(deleteFAForm.value);

    uploadVisible.value = true;
};

const openFile = (val: any) => {
    console.log(val);

    FTPSearchAndDownloadSpecificationDocumentFile(val).then((res: any) => {
        if (res.success) {
            const base64Data = 'data:application/pdf;base64,' + res.content.FileData;
            previewUrl.value = base64Data
            previewTitle.value = res.content.FileName
            previewVisible.value = true
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
    })
}
const isDownload = (val: any, type: any) => {
    ElMessageBox.confirm(`是否下载${val}？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            let data = {
                fileName: val,
                fileType: type,
            };

            FACPKDownloadFtpServer(data).then((res: any) => {
                downloadSingleFile(res.content);
            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消下载",
            });
        });
};
const file1UpChange = (file: any, fileList1: any) => {
    if (file.raw) {
        convertToBase64(file.raw, 1);
    }
};
const file1UpRemove = (file: any, fileList1: any) => {
    uploadForm.value.TemplateFile = "";
    uploadForm.value.TemplateName = "";
    fileList.value = [];
};
const beforeUpload = (file: any) => {
    const isPDF = file.type === "application/xlsx";
    const isLt10M = file.size / 1024 / 1024 < 5;

    if (!isPDF) {
        console.error("只能上传 xlsx 文件");
        return false;
    }

    if (!isLt10M) {
        console.error("文件大小不能超过 10MB");
        return false;
    }

    return true;
};
const file1UpChange2 = (file: any, fileList1: any) => {
    if (file.raw) {
        convertToBase64(file.raw, 2);
    }
};
const file1UpRemove2 = (file: any, fileList1: any) => {
    uploadForm2.value.TemplateFile = "";
    uploadForm2.value.TemplateName = "";
    fileList2.value = [];
};

const convertToBase64 = (file: any, index: any) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
        const fullBase64 = event.target.result;
        if (index == 2) {
            uploadForm2.value.TemplateName = file.name;
            uploadForm2.value.TemplateFile = fullBase64.replace(
                /^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/,
                ""
            );
        } else {
            uploadForm.value.TemplateName = file.name;
            uploadForm.value.TemplateFile = fullBase64.replace(
                /^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/,
                ""
            );

        }
    };

    reader.onerror = (error) => {
        console.error("文件读取错误:", error);
    };
    reader.readAsDataURL(file);
};
const handleUploadClose = () => {
    uploadForm.value = {
        InspectionNO: "",
        TemplateName: "",
        FileType: "FA",
        TemplateFile: "",
    };
    fileList.value = [];
    uploadForm2.value = {
        InspectionNO: "",
        TemplateName: "",
        FileType: "CPK",
        TemplateFile: "",
    };
    fileList2.value = [];
    deleteCPKForm.value = {
        InspectionNO: "",
        TemplateName: "",
        FileType: "CPK",
        TemplateFile: "",
    }
    deleteFAForm.value = {
        InspectionNO: "",
        TemplateName: "",
        FileType: "FA",
        TemplateFile: "",
    }
    uploadVisible.value = false;
};
const handleUploadfirm = () => {
    let data = [];
    if (uploadForm.value.TemplateName !== "") {
        data.push(uploadForm.value);
    }
    if (uploadForm2.value.TemplateName !== "") {
        data.push(uploadForm2.value);
    }
    UploadFtpServer(data).then((res: any) => {
        ElMessage({
            title: t("publicText.success"),
            message: res.msg,
            type: res.success ? "success" : "error",
        });
        uploadVisible.value = false;
        uploadForm.value = {
            InspectionNO: "",
            TemplateName: "",
            FileType: "FA",
            TemplateFile: "",
        };
        fileList.value = [];
        uploadForm2.value = {
            InspectionNO: "",
            TemplateName: "",
            FileType: "CPK",
            TemplateFile: "",
        };
        fileList2.value = [];
        getData();
    });
};
const openAdd = () => {
    getSpecData()
    addVisible.value = true
}
const handleAddClose = () => {
    addVisible.value = false;
    addForm.value = {
        InspectionType: "首检",
        MfgorderName: "",
        SpecName: ""
    };
};
const handleAddConfirm = () => {
    CreateInspectionNO(addForm.value).then((res: any) => {
        ElMessage({
            title: t("publicText.success"),
            message: res.msg,
            type: res.success ? "success" : "error",
        });
        addVisible.value = false;
        addForm.value = {
            InspectionType: "首检",
            MfgorderName: "",
            SpecName: ""
        };
        getData();
    });
};
const resetMeasurement = () => {
    measurementValues.value = measurementValues.value.map(() => "");
}
const saveMeasurements = () => {
    if (currentRowIndex.value === null) return;

    const row = editForm.value.listItem[currentRowIndex.value];

    // 过滤空值并连接为字符串
    const validValues = measurementValues.value
        .filter((v) => v !== "" && v !== null && v !== undefined)
        .map((v) => v.toString().trim());

    row.ObservedValue = validValues.join(",");

    // 重新计算相关数值
    //   calculateRowValues(row)

    dialogVisible.value = false;
    measurementValues.value = [];
    currentRowIndex.value = null;
};
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }: any) => {
    if (columnIndex === 0) {
        const _row = spanArr.value[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
            rowspan: _row,
            colspan: _col,
        };
    }
};
const objectSpanMethod2 = ({ row, column, rowIndex, columnIndex }: any) => {
    if (columnIndex === 0) {
        const _row = spanArr2.value[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
            rowspan: _row,
            colspan: _col,
        };
    }
};
const handleEditClose = () => {
    editVisible.value = false;
    editForm.value = {
        InspectionNO: "",
        InspectionType: "",
        MfgorderName: "",
        ProductName: "",
        ProductDec: "",
        PartNo: "",
        CustomerName: "",
        LotNo: "",
        MaterialReQty: "",
        DocumentStatus: "",
        ProductType: "",
        InspectionResult: "",
        CreateDate: "",
        SpecName: '',
        listItem: [],
        countItem: [],
    };
    activeName.value = "first";
};
const handleEditZQConfirm = () => {
    // console.log(editForm.value);
    let data = {
        InspectionNO: editForm.value.InspectionNO,
        InspectionType: editForm.value.InspectionType,
        MfgorderName: editForm.value.MfgorderName,
        InspectionResult: "",
        DocumentStatus: "检验中",
        SpecName: editForm.value.SpecName,
        listItem: [...editForm.value.listItem],
    };
    data.listItem = editForm.value.listItem.map((item: any) => {
        return {
            LineNos: item.LineNos,
            MfgorderName: editForm.value.MfgorderName,
            ProjectName: item.ProjectName,
            ProjectCategoryName: item.ProjectCategoryName,
            TargetValue: item.TargetValue,
            MaxValue: item.MaxValue,
            MinValue: item.MinValue,
            CharaCteristicGrade: item.CharaCteristicGrade,
            ToolName: item.ToolName,
            InspectionBasis: item.InspectionBasis,
            SampleNum: item.SampleNum,
            MeasurementType: item.MeasurementType,
            DefectNum: item.DefectNum,
            ObservedValue: item.ObservedValue,
            ObservedValueSum: item.ObservedValueSum,
            AverageNum: item.AverageNum,
            DefectDec: item.DefectDec,
            SpecialCause: item.SpecialCause,
            InspectionResult: "",
            InspectionDate: "",
            InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            ResulthandLing: item.ResulthandLing,
            CPKMinL: item.CPKMinL,
            CPKMinW: item.CPKMinW,
            CPKMinThk: item.CPKMinThk,
        };
    });
    editForm.value.countItem.forEach((item: any) => {
        data.listItem.push({
            LineNos: item.LineNos,
            MfgorderName: editForm.value.MfgorderName,
            ProjectName: item.ProjectName,
            ProjectCategoryName: item.ProjectCategoryName,
            TargetValue: item.TargetValue,
            MaxValue: item.MaxValue,
            MinValue: item.MinValue,
            CharaCteristicGrade: item.CharaCteristicGrade,
            ToolName: item.ToolName,
            InspectionBasis: item.InspectionBasis,
            SampleNum: item.SampleNum,
            MeasurementType: item.MeasurementType,
            DefectNum: item.DefectNum,
            ObservedValue: item.ObservedValue,
            ObservedValueSum: item.ObservedValueSum,
            AverageNum: item.AverageNum,
            DefectDec: item.DefectDec,
            SpecialCause: item.SpecialCause,
            InspectionResult: "",
            InspectionDate: "",
            InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            ResulthandLing: item.ResulthandLing,
        });
    });

    // console.log(data);

    InspectionNOInfoSync(data).then((res: any) => {
        ElMessage({
            title: t("publicText.success"),
            message: res.success ? '暂存成功' : res.msg,
            type: res.success ? "success" : "error",
        });

        getData();
    });
};
const handleEditConfirm = () => {
    let data = {
        InspectionNO: editForm.value.InspectionNO,
        InspectionType: editForm.value.InspectionType,
        MfgorderName: editForm.value.MfgorderName,
        InspectionResult: "合格",
        DocumentStatus: "检验完成",
           SpecName: editForm.value.SpecName,
        listItem: [...editForm.value.listItem],
    };

    data.listItem = editForm.value.listItem.map((item: any) => {
        return {
            LineNos: item.LineNos,
            MfgorderName: editForm.value.MfgorderName,
            ProjectName: item.ProjectName,
            ProjectCategoryName: item.ProjectCategoryName,
            TargetValue: item.TargetValue,
            MaxValue: item.MaxValue,
            MinValue: item.MinValue,
            CharaCteristicGrade: item.CharaCteristicGrade,
            ToolName: item.ToolName,
            InspectionBasis: item.InspectionBasis,
            SampleNum: item.SampleNum,
            MeasurementType: item.MeasurementType,
            DefectNum: item.DefectNum,
            ObservedValue: item.ObservedValue,
            ObservedValueSum: item.ObservedValueSum,
            AverageNum: item.AverageNum,
            DefectDec: item.DefectDec,
            SpecialCause: item.SpecialCause,
            InspectionResult: item.Status,
            InspectionDate: "",
            InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            ResulthandLing: item.ResulthandLing,
            CPKMinL: item.CPKMinL,
            CPKMinW: item.CPKMinW,
            CPKMinThk: item.CPKMinThk,
        };
    });

    editForm.value.countItem.forEach((item: any) => {
        data.listItem.push({
            LineNos: item.LineNos,
            MfgorderName: editForm.value.MfgorderName,
            ProjectName: item.ProjectName,
            ProjectCategoryName: item.ProjectCategoryName,
            TargetValue: item.TargetValue,
            MaxValue: item.MaxValue,
            MinValue: item.MinValue,
            CharaCteristicGrade: item.CharaCteristicGrade,
            ToolName: item.ToolName,
            InspectionBasis: item.InspectionBasis,
            SampleNum: item.SampleNum,
            MeasurementType: item.MeasurementType,
            DefectNum: item.DefectNum,
            ObservedValue: item.ObservedValue,
            ObservedValueSum: item.ObservedValueSum,
            AverageNum: item.AverageNum,
            DefectDec: item.DefectDec,
            SpecialCause: item.SpecialCause,
            InspectionResult: item.Status,
            InspectionDate: "",
            InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
            ResulthandLing: item.ResulthandLing,
            CPKMinL: item.CPKMinL,
            CPKMinW: item.CPKMinW,
            CPKMinThk: item.CPKMinThk,
        });
    });
    console.log(data);
    let isEixt = data.listItem.findIndex((item: any) => {
        return item.InspectionResult !== "OK";
    });
    
    if (isEixt !== -1) {
        // ElMessage({
        //     title: t("message.tipTitle"),
        //     message: "检验结果，不通过！请检查",
        //     type: "error",
        // });

        // return;
        data.InspectionResult = "不合格";
    }
    // console.log(data);

    InspectionNOInfoSync(data).then((res: any) => {
        ElMessage({
            title: t("publicText.success"),
            message: res.success ? '提交成功' : res.msg,
            type: res.success ? "success" : "error",
        });

        handleEditClose();
        getData();
    });
};
const handleEdit = (row: any, type: any) => {
    activeName.value = "first";
    editForm.value.MfgorderName = row.ES_MfgorderName;
    editForm.value.ProductName = row.ES_ProductName;
    editForm.value.ProductType = row.ES_ProductType;
    editForm.value.PartNo = row.ES_PartNo;
    editForm.value.LotNo = row.ES_LotNo;
    editForm.value.SpecName = row.ES_SpecName;
    editForm.value.FirstArticleInspectionStatus = row.FirstArticleInspectionStatus || ''
    title.value = type + "检验";
    editForm.value.InspectionType = type;
    if (type === "首检") {
        editForm.value.InspectionNO = row.FirstArticleInspectionNo;
        editForm.value.InspectionType = "首检";
    } else if (type === "巡检") {
        editForm.value.InspectionNO = row.InProcessInspectionNo;
        editForm.value.InspectionType = "巡检";
    } else if (type === "尾检") {
        editForm.value.InspectionNO = row.FinalInspectionNo;
        editForm.value.InspectionType = "尾检";
    }

    GetInspectionDelQuery({
        MfgorderName: row.ES_MfgorderName,
        InspectionType: type,
        InspectionNO: editForm.value.InspectionNO
    }).then((res: any) => {
        let pos = 0;
        let pos2 = 0;
        spanArr.value = [];
        spanArr2.value = [];
        editForm.value.listItem = res.content
            .filter((item: any) => item && item.MEASUREMENTTYPE === "计量")
            .map((item: any) => {
                return {
                    LineNos: item.LINENOS,
                    MfgorderName: "",
                    ProjectName: item.PROJECTNAME,
                    ProjectCategoryName: item.PROJECTCATEGORYNAME,
                    TargetValue: item.TARGETVALUE,
                    MaxValue: item.MAXVALUE,
                    MinValue: item.MINVALUE,
                    CharaCteristicGrade: item.CHARACTERISTICGRADE,
                    ToolName: item.TOOLNAME,
                    InspectionBasis: item.INSPECTIONBASIS,
                    SampleNum: parseInt(item.SAMPLENUM == null || item.SAMPLENUM == '' ? '1' : item.SAMPLENUM),
                    MeasurementType: item.MEASUREMENTTYPE,
                    DefectNum: item.DEFECTNUM,
                    ObservedValue: item.OBSERVEDVALUE,
                    ObservedValueSum: item.OBSERVEDVALUESUM,
                    AverageNum: item.AVERAGENUM,
                    DefectDec: item.DEFECTDEC,
                    SpecialCause: item.SPECIALCAUSE,
                    InspectionResult: item.INSPECTIONRESULT,
                    Status: item.INSPECTIONRESULT,
                    InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
                    InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
                    InspectionDate: "",
                    ResulthandLing: item.RESULTHANDLING,
                    CPKMinL: item.CPKMinL,
                    CPKMinW: item.CPKMinW,
                    CPKMinThk: item.CPKMinThk,
                };
            })
            .sort((a: any, b: any) => a.LineNos - b.LineNos);

        for (let i = 0; i < editForm.value.listItem.length; i++) {
            if (i === 0) {
                spanArr.value.push(1);
                pos = 0;
            } else {
                // 判断当前元素与上一个元素是否相同
                if (
                    editForm.value.listItem[i].LineNos ===
                    editForm.value.listItem[i - 1].LineNos
                ) {
                    spanArr.value[pos] += 1;
                    spanArr.value.push(0);
                } else {
                    spanArr.value.push(1);
                    pos = i;
                }
            }
        }

        editForm.value.countItem = res.content
            .filter((item: any) => item && item.MEASUREMENTTYPE === "计数")
            .map((item: any) => {
                return {
                    LineNos: item.LINENOS,
                    MfgorderName: "",
                    ProjectName: item.PROJECTNAME,
                    ProjectCategoryName: item.PROJECTCATEGORYNAME,
                    TargetValue: item.TARGETVALUE,
                    MaxValue: item.MAXVALUE,
                    MinValue: item.MINVALUE,
                    CharaCteristicGrade: item.CHARACTERISTICGRADE,
                    ToolName: item.TOOLNAME,
                    InspectionBasis: item.INSPECTIONBASIS,
                    SampleNum: item.SAMPLENUM == null || item.SAMPLENUM == '' ? '1' : item.SAMPLENUM,
                    MeasurementType: item.MEASUREMENTTYPE,
                    DefectNum: item.DEFECTNUM == null || item.DEFECTNUM == '' ? '0' : item.DEFECTNUM,
                    ObservedValue: item.OBSERVEDVALUE,
                    ObservedValueSum: item.OBSERVEDVALUESUM,
                    AverageNum: item.AVERAGENUM,
                    DefectDec: item.DEFECTDEC,
                    SpecialCause: item.SPECIALCAUSE,
                    InspectionResult: item.INSPECTIONRESULT,
                        Status: item.INSPECTIONRESULT,
                    InspectionBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
                    InspectionUpdateBy: userStore.getUserInfo2 !== '' ? userStore.getUserInfo2 : userStore.getUserInfo,
                    InspectionDate: "",
                    ResulthandLing: item.RESULTHANDLING,
                };
            })
            .sort((a: any, b: any) => a.LineNos - b.LineNos);

        for (let i = 0; i < editForm.value.countItem.length; i++) {
            if (i === 0) {
                spanArr2.value.push(1);
                pos2 = 0;
            } else {
                // 判断当前元素与上一个元素是否相同
                if (
                    editForm.value.countItem[i].LineNos ===
                    editForm.value.countItem[i - 1].LineNos
                ) {
                    spanArr2.value[pos] += 1;
                    spanArr2.value.push(0);
                } else {
                    spanArr2.value.push(1);
                    pos2 = i;
                }
            }
        }
        editVisible.value = true;
        // console.log(res);
        // console.log(editForm.value);
    });
};
const openMeasurementDialog = (row: any, index: any) => {
    currentRow.value = row;
    currentRowIndex.value = index;
    currentSampleSize.value = parseInt(row.SampleNum) || 1;
    measurementValues.value = [];
    // for (let i = 0; i < currentSampleSize.value; i++) {
    //     measurementValues.value.push(row[`MeasuredValue${i + 1}`] || "");
    // }
    // 如果已有测量值，解析到数组中
    if (row.ObservedValue) {
        measurementValues.value = row.ObservedValue.split(",").map((v: any) =>
            v.trim()
        );
    } else {
        // 根据样件数初始化数组
        measurementValues.value = Array(currentSampleSize.value).fill("");
    }

    dialogVisible.value = true;
};
const getResultText = (row: any) => {
    const defectCount = calculateDefectCount(row);
    const sampleNum = row.SampleNum || 1;

    if (defectCount === 0 && row.ObservedValue !== "") {
        row.Status = "OK";
        return "OK";
    } else {
        row.Status = "NG";
        return "NG";
    }
};
const getResultText2 = (row: any) => {
    const defectCount = calculateDefectCount(row);
    // const sampleNum = row.SampleNum || 1;
    const observedValue = row.ObservedValue;
    // 处理空值
    if (observedValue === null || observedValue === '') {
        row.Status = "";
        return "";
    }

    // 根据缺陷数量判断状态
    const status = defectCount === 0 ? "OK" : "NG";
    row.Status = status;
    return status;
    // if (defectCount === 0 && row.ObservedValue !== "" && row.ObservedValue !== null) {
    //     row.Status = "OK";
    //     return "OK";
    // } else {
    //     row.Status = "NG";
    //     return "NG";
    // }
    // if(row.ObservedValue === null || row.ObservedValue === ''){
    //     row.Status = "";
    //     return "";
    // }
};
const handleSampleSizeChange = (row: any) => {
    // 确保样件数在1-10之间
    let sampleNum = parseInt(row.SampleNum) || 1;
    sampleNum = Math.max(1, Math.min(10, sampleNum));
    row.SampleNum = sampleNum;

    // 如果已有测量值，需要调整
    if (row.ObservedValue) {
        const values = row.ObservedValue.split(",").map((v: any) => v.trim());
        if (values.length > sampleNum) {
            // 如果新样件数小于原有测量值数量，截断
            row.ObservedValue = values.slice(0, sampleNum).join(",");
        } else if (values.length < sampleNum) {
            // 如果新样件数大于原有测量值数量，补充空值
            while (values.length < sampleNum) {
                values.push("");
            }
            row.ObservedValue = values.join(",");
        }
    }
};
const calculateDefectCount = (row: any) => {
    if (!row.ObservedValue || !row.MinValue || !row.MaxValue) {
        row.DefectNum = 0;
        return 0;
    }

    const min = parseFloat(row.MinValue);
    const max = parseFloat(row.MaxValue);

    if (isNaN(min) || isNaN(max)) {
        row.DefectNum = 0;
        return 0;
    }

    const values = row.ObservedValue.split(",")
        .map((v: any) => parseFloat(v.trim()))
        .filter((v: any) => !isNaN(v));

    const defectCount = values.filter((v: any) => v < min || v > max).length;
    row.DefectNum = defectCount;
    return defectCount;
};

const calculateSum = (row: any) => {
    if (!row.ObservedValue) {
        row.ObservedValueSum = "0";
        return "0";
    }

    const values = row.ObservedValue.split(",")
        .map((v: any) => parseFloat(v.trim()))
        .filter((v: any) => !isNaN(v));

    const sum = values.reduce((total: any, current: any) => total + current, 0);
    row.ObservedValueSum = sum.toFixed(2);
    return sum.toFixed(2);
};
const calculateAverage = (row: any) => {
    if (!row.ObservedValue) {
        row.AverageNum = "0";
        return "0";
    }

    const values = row.ObservedValue.split(",")
        .map((v: any) => parseFloat(v.trim()))
        .filter((v: any) => !isNaN(v));

    if (values.length === 0) {
        row.AverageNum = "0";
        return "0";
    }

    const sum = values.reduce((total: any, current: any) => total + current, 0);
    const avg = sum / values.length;
    row.AverageNum = avg.toFixed(2);
    return avg.toFixed(2);
};
const formatMeasuredValues = (row: any) => {
    // const values = [];
    // for (let i = 1; i <= 10; i++) {
    //     const value = row[`MeasuredValue${i}`];
    //     if (value !== null && value !== undefined && value !== "") {
    //         values.push(value);
    //     }
    // }
    // row.ObservedValue = values.join(",");
    const values = row.ObservedValue.split(",");
    return values.join(",");
};
const handlePreviewClose = () => {
    previewVisible.value = false
    previewUrl.value = ""
}
const handlePreviewDawnload = () => {
    downloadPDF(previewUrl.value, previewTitle.value)
}
const downloadPDF = (base64Data: any, fileName = '供应商报告.pdf') => {
    try {
        // 创建下载链接
        const link = document.createElement('a')

        // 设置下载属性
        link.href = base64Data
        link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`

        // 添加到页面（需要添加到页面才能触发下载）
        document.body.appendChild(link)

        // 触发点击下载
        link.click()

        // 清理 DOM
        document.body.removeChild(link)

        ElMessage.success('文件下载成功')

    } catch (error) {
        console.error('下载失败:', error)
        ElMessage.error('文件下载失败')
    }
}
const handleDeleteFA = () => {
    ElMessageBox.confirm(`是否删除FA文件？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            let data = [
                deleteFAForm.value
            ]
            DelFtpServer(data).then((res: any) => {
                ElMessage({
                    title: t("publicText.success"),
                    message: res.msg,
                    type: res.success ? "success" : "error",
                });
                if (res.success) {
                    deleteFAForm.value.TemplateName = ''
                    uploadForm.value.TemplateName = ''
                    getData();
                }

            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            });
        });
}
const handleDeleteCPK = () => {
    ElMessageBox.confirm(`是否删除CPK文件？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            let data = [
                deleteCPKForm.value
            ]
            DelFtpServer(data).then((res: any) => {
                ElMessage({
                    title: t("publicText.success"),
                    message: res.msg,
                    type: res.success ? "success" : "error",
                });
                if (res.success) {
                    getData();
                    deleteCPKForm.value.TemplateName = ''
                    uploadForm2.value.TemplateName = ""
                }

            });
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            });
        });
}
const openOrder = (val: any) => {
    MfgOrderName.value = val
    productConVisit.value = true
    handleClick('first')
}
const handleOtherClose = () => {

    MfgOrderName.value = ''
    ProControlTable.value = []
    MaterialDisTable.value = []
    ProLineRealTable.value = []
    FinishedProTable.value = []
    ProStageTable.value = []
    ManufactureTable.value = []
    activeConName.value = 'first'
    productConVisit.value = false
}
const handleClick = (val: any) => {
    console.log(val);
    if (val == "first") {
        QueryProductionControlParameters(MfgOrderName.value).then((res: any) => {
            ProControlTable.value = res.content
        })
    } else if (val == 'second') {
        QueryMaterialDispatchDetails(MfgOrderName.value).then((res: any) => {
            MaterialDisTable.value = res.content
        })
    } else if (val == 'third') {
        QueryProductionLineRealTimeData(MfgOrderName.value).then((res: any) => {
            ProLineRealTable.value = res.content
        })
    } else if (val == 'fourth') {
        QueryFinishedProductPackingData(MfgOrderName.value).then((res: any) => {
            FinishedProTable.value = res.content
        })

    } else if (val == 'five') {
        QueryProductionStageQCReports(MfgOrderName.value).then((res: any) => {

            ProStageTable.value = res.content
        })
    } else {
        QueryManufacturingNotesHistory(MfgOrderName.value).then((res: any) => {
            ManufactureTable.value = res.content
        })
    }

}
const handletestClose = () => {
    testVisible.value = false;
};
const handletestConfirm = () => {
    testVisible.value = false;
};
const handleSizeChange = (val: any) => {
    pageObj.pageSize = val;
};
const handleCurrentChange = (val: any) => {
    pageObj.currentPage = val;
};
const getScreenHeight = () => {
    nextTick(() => {
        tableHeight.value = window.innerHeight - 250;
    });
};
interface IQCFile {
    FileData: string; // Base64 数据
    FileName: string;
}

interface DownloadResponse {
    content: IQCFile[];
    success: boolean;
    message?: string;
}
const downloadSingleFile = async (file: IQCFile) => {
    try {
        // 确保 Base64 数据格式正确
        let base64Data = file.FileData;

        // 如果 Base64 数据不包含 data URL 前缀，添加它
        if (!base64Data.startsWith("data:")) {
            base64Data = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
        }

        // 使用更可靠的下载方式
        const response = await fetch(base64Data);
        const blob = await response.blob();

        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        // 设置文件名，确保有 .xlsx 扩展名
        let fileName = file.FileName;
        if (!fileName.toLowerCase().endsWith(".xlsx")) {
            fileName = `${fileName}.xlsx`;
        }

        link.href = url;
        link.download = fileName;
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();

        // 清理
        document.body.removeChild(link);

        ElMessage.success("文件下载成功");
    } catch (error) {
        console.error("文件下载失败:", error);
        ElMessage.error("文件下载失败");
    }
};
const downloadAsZip = async (files: IQCFile[]) => {
    try {
        const zip = new JSZip();

        files.forEach((file, index) => {
            // 移除 Base64 前缀（如果有）
            const base64Content = file.FileData.replace(/^data:.*;base64,/, "");
            const fileName = file.FileName.endsWith(".xlsx")
                ? file.FileName
                : `${file.FileName}.xlsx`;

            zip.file(fileName, base64Content, { base64: true });
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `IQC报告_${new Date().getTime()}.zip`);

        ElMessage.success("文件打包下载成功");
    } catch (error) {
        console.error("打包下载失败:", error);
        ElMessage.error("打包下载失败");
    }
};
const downloadTemp = () => {
    if (editForm.value.InspectionType == '巡检') {
        exportInspectionToExcelVertical({
            tableRef: tempMeasureRef.value,
            fetchAllData: tempData,
            fileName: editForm.value.InspectionNO,
            t,
            maxLineNosCount: 100,
        })
    } else {
        exportMeasureTableToExcelVertical({
            tableRef: tempMeasureRef.value,
            fetchAllData: tempData,
            fileName: editForm.value.InspectionNO,
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
            splitMeasurementColumns: false
        })
    }

}
const tempData = async () => {
    // console.log(editForm.value.listItem);

    const data = await Promise.all(
        editForm.value.listItem.map((item: any) => {
            const dataValues = item.ObservedValue?.split(',') || [];

            // 使用 reduce 动态创建 MeasuredValue 字段
            const measuredValues = dataValues.slice(0, 10).reduce((acc: any, value: any, index: any) => {
                acc[`MeasuredValue${index + 1}`] = value.trim();
                return acc;
            }, {});

            // 确保有 10 个字段
            for (let i = dataValues.length; i < 10; i++) {
                measuredValues[`MeasuredValue${i + 1}`] = '';
            }

            return {
                ...item,
                ...measuredValues
            };
        })
    );
    return data
}
const fileUpChange2 = async (file: any, fileList1: any) => {
    // if (file.raw) {
    //     convertToBase64(file.raw, 1);
    // }
    // uploadTemp(file.raw,'11')
    // const result = handleExcelUpload(file.raw)
    // // handleExcelUpload1(file.raw)
    // console.log(result);
    const fileNameList = file.name.split('_')
    //   console.log(fileNameList,editdetailForm.value.IQCNumber);
    if (fileNameList[0] !== editForm.value.InspectionNO) {
        ElMessage.error('导入失败，请导入检验对应的Excel')
        return
    }
    try {
        let result: any = {}
        if (editForm.value.InspectionType == '巡检') {
            result = await handleExcelUploadAllFormats(file.raw, { forceFormat: 'auto' })
        } else {
            result = await handleExcelUploadEnhanced(file.raw, { forceFormat: 'auto' })
        }

        if (result.success) {
            // parsedData.value = result.data
            console.log(result.data);
            assignValuesMulti(result.data, editForm.value.listItem)
            ElNotification.success({
                title: '导入成功',
                message: result.message,
                duration: 3000
            })
            fileList3.value = [];
            // 触发数据更新事件（如果需要传递给父组件）
            // emit('data-parsed', result.data)
        } else {
            ElMessage.error(result.message || '导入失败')
            fileList3.value = [];
        }
    } catch (error: any) {
        ElMessage.error(`导入失败: ${error.message}`)
        fileList3.value = [];
    } finally {
        fileList3.value = [];
    }

};
const fileUpRemove2 = (file: any, fileList1: any) => {

    fileList3.value = [];
};
const beforeUpload2 = (file: any) => {
    const isPDF = file.type === "application/xlsx";
    const isLt10M = file.size / 1024 / 1024 < 5;

    if (!isPDF) {
        console.error("只能上传 xlsx 文件");
        return false;
    }

    if (!isLt10M) {
        console.error("文件大小不能超过 10MB");
        return false;
    }

    return true;
};
const previewImg = (row: any) => {
   if(row.PictureFile !== null && row.PictureFile !== ''){
         let pureName64 =row.PictureName.split(".")[1];
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
const handleUploadChange = (file: any, fileList1: any, row: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        const fullBase64 = e.target.result; // 例如 "data:image/png;base64,iVBORw0KGgo..."
        // 去除前缀，只保留纯 base64 字符串
        const pureBase64 = fullBase64.split(",")[1];
        row.PictureFile = pureBase64;
        row.PictureName = file.name;
        fileListImg.value = [];
        console.log(row.PictureName, row.PictureFile);
    };
    reader.readAsDataURL(file.raw);
};
const handleUploadRemove = (file: any, fileList1: any, row: any) => {
    fileListImg.value = [];
    row.PictureFile = "";
    row.PictureName = "";
};
const beforeUploadImg = (file: any) => {
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

const assignValuesMulti = (sourceData: any, targetData: any) => {
    // 创建源数据的查找映射，提高查找效率
    const sourceMap = new Map();

    sourceData.forEach((item: any) => {
        const key = `${item.LineNos}_${item.ProjectName}`;
        sourceMap.set(key, item);
    });

    // 遍历目标数组并赋值
    targetData.forEach((targetItem: any) => {
        const key = `${targetItem.LineNos}_${targetItem.ProjectName}`;
        const sourceItem = sourceMap.get(key);

        if (sourceItem) {
            targetItem.SampleNum = sourceItem.SampleNum;
            targetItem.ObservedValue = sourceItem.ObservedValue;
            console.log(targetItem.MeasuredValue);
            let valData = (sourceItem.ObservedValue).split(',')
            console.log(valData);

            if (targetItem.SampleNum < valData.length) {
                targetItem.SampleNum = valData.length
            }
            //   targetItem.ResulthandLing = sourceItem.ResulthandLing;
        }
    });

    return targetData;
}
// 使用计算属性缓存列宽计算结果
const columnWidths = computed(() => {
    const columns = [
        { label: '工单名称', prop: 'ES_MfgorderName' },
        { label: '产品名称', prop: 'ES_ProductName' },
        { label: '客户名称', prop: 'ES_CustomerName' },
        { label: 'FA', prop: 'ES_FaUrl' },
        { label: 'CPK', prop: 'ES_CPKUrl' },
        { label: '原料批次', prop: 'LotNumber' },
        { label: '客户PN', prop: 'ES_PartNo' },
        { label: '客户PO', prop: 'ES_CustomerPO' },
        { label: 'LotNo', prop: 'ES_LotNo' }

        // 添加其他需要自适应宽度的列
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, tableData.value, {
        padding: 25,
        fontSize: 13
    });
});

// 在模板中使用
const getColumnWidth = (prop: string) => {
    return columnWidths.value[prop] || 'auto';
};

const columnWidths2 = computed(() => {
    const columns = [
        { label: '检验工具', prop: 'ToolName' },
        { label: '检验依据', prop: 'InspectionBasis' },
        { label: '项目名称', prop: 'ProjectName' },
        // { label: 'FA', prop: 'ES_FaUrl' },
        // { label: 'CPK', prop: 'ES_CPKUrl' },
        // 添加其他需要自适应宽度的列
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, editForm.value.listItem, {
        padding: 25,
        fontSize: 13
    });
});

// 在模板中使用
const getColumnWidth2 = (prop: string) => {
    return columnWidths2.value[prop] || 'auto';
};
const columnWidths3 = computed(() => {
    const columns = [
        { label: '生产备注', prop: 'Description' },
        { label: '产品名称', prop: 'ProductName' },
        { label: '产品描述', prop: 'ProductDescription' },
        { label: '工单PO', prop: 'MfgOrderPO' }
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, ProControlTable.value, {
        padding: 25,
        fontSize: 13
    });
});

// 在模板中使用
const getColumnWidth3 = (prop: string) => {
    return columnWidths3.value[prop] || 'auto';
};
const columnWidths4 = computed(() => {
    const columns = [
        { label: '原材料名称', prop: 'ProductName' },
    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, MaterialDisTable.value, {
        padding: 25,
        fontSize: 13
    });
});

// 在模板中使用
const getColumnWidth4 = (prop: string) => {
    return columnWidths4.value[prop] || 'auto';
};
const columnWidths5 = computed(() => {
    const columns = [
        { label: '备注', prop: 'DataValue' },

    ];

    // 批量计算列宽
    return calculateColumnsWidth(columns, ManufactureTable.value, {
        padding: 25,
        fontSize: 13
    });
});

// 在模板中使用
const getColumnWidth5 = (prop: string) => {
    return columnWidths5.value[prop] || 'auto';
};
const setInputRef = (el: any, index: any) => {
    if (el) {
        inputRefs.value[index - 1] = el
    }
}
const handleEnterInput = (e: any, currentIndex: any) => {
    e.preventDefault()
    console.log(currentIndex);

    if (currentIndex < currentSampleSize.value) {
        // 使用 nextTick 确保 DOM 已更新
        nextTick(() => {
            console.log(currentIndex);
            const nextInput = inputRefs.value[currentIndex]
            if (nextInput) {
                nextInput.focus()
            }
        })
    }
}
// const flexColumnWidth = (label: any, prop: any) => {
//     const arr = tableData?.value.map((x: { [x: string]: any }) => x[prop]);
//     arr.push(label); // 把每列的表头也加进去算
//     return getMaxLength(arr) + 25 + "px";
// };

// const getMaxLength = (arr: any) => {
//     return arr.reduce((acc: any, item: any) => {
//         if (item) {
//             const calcLen = getTextWidth(item);

//             if (acc < calcLen) {
//                 acc = calcLen;
//             }
//         }
//         return acc;
//     }, 0);
// };
// const getTextWidth = (str: string) => {
//     let width = 0;
//     const html = document.createElement("span");
//     html.style.cssText = `padding: 0; margin: 0; border: 0; line-height: 1; font-size: ${13}px; font-family: Arial, sans-serif;`;
//     html.innerText = str; // 去除字符串前后的空白字符
//     document.body?.appendChild(html);

//     const spanElement = html; // 无需再次查询，直接使用创建的元素
//     if (spanElement) {
//         width = spanElement.offsetWidth;
//         spanElement.remove();
//     }
//     // console.log(width);
//     return width;
// };
</script>
<style scoped>
.el-pagination {
    justify-content: center;
}

.table-container {
    display: flex;
    width: 100%;
    height: 100%;
}

.left {
    flex: 1;
}

.right {
    flex: 1;
}
</style>

<style lang="scss" scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.report-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}

.info-section {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.info-item {
    display: flex;
    margin-right: 30px;
    margin-bottom: 10px;
}

.info-label {
    font-weight: bold;
    margin-right: 5px;
    white-space: nowrap;
}

.table-container {
    overflow-x: auto;
}

.export-btn {
    margin-top: 20px;
    text-align: right;
}

.remark {
    margin-top: 15px;
    padding: 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
    color: #606266;
}

.el-table .header-row {
    background-color: #f0f9ff;
}

.el-table .header-row th {
    background-color: #f0f9ff !important;
}

.el-table .cell {
    padding: 4px 8px;
    font-size: 12px;
}

.el-table th {
    padding: 8px 0;
}

.el-table--border {
    border: 1px solid #ebeef5;
}

.el-table--border th,
.el-table--border td {
    border-right: 1px solid #ebeef5;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
    background-color: #ebeef5;
}

.header-cell {
    font-weight: bold;
    background-color: #f5f7fa;
}

.content-cell {
    background-color: #ffffff;
}

.info-row {
    display: flex;
    margin-bottom: 10px;
}

.info-box {
    flex: 1;
    padding: 5px 10px;
    border: 1px solid #ebeef5;
    margin-right: 10px;
}

.info-box:last-child {
    margin-right: 0;
}

.info-box-title {
    font-weight: bold;
    margin-bottom: 5px;
}

/* 上传区域 */
.current-file {
    padding: 12px;
    background: linear-gradient(135deg, #f6f9ff 0%, #f0f7ff 100%);
    border-radius: 8px;
    border: 1px solid #e4e7ed;
}

.upload-area {
    border: 2px dashed #dcdfe6;
    border-radius: 8px;
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #fafafa;
}

.upload-area:hover {
    border-color: #409eff;
    background-color: #f0f7ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.1);
}

.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.upload-icon-wrapper {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f0f7ff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.upload-area:hover .upload-icon-wrapper {
    background-color: #e6f3ff;
    transform: scale(1.05);
}

.upload-icon {
    color: #a0cfff;
    font-size: 28px;
}

.upload-area:hover .upload-icon {
    color: #409eff;
}

.upload-text {
    color: #606266;
}

.upload-main-text {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
}

.upload-hint {
    font-size: 12px;
    color: #909399;
}

/* 操作提示 */
.action-hint {
    margin-top: 20px;
}

.hint-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.hint-count {
    font-weight: 600;
    color: #409eff;
}
</style>
<style>
.el-table .danger-row-invent {
    --el-table-tr-bg-color: var(--el-color-danger-light-7);
}

.el-table .success-row-invent {
    --el-table-tr-bg-color: var(--el-color-success-light-5);
}

.el-table .danger-row-invent1 {
    --el-table-tr-bg-color: #F56C6C;
    /* color: #ffffff; */
}

.el-table .success-row-invent {
    --el-table-tr-bg-color: var(--el-color-success-light-5);
}
</style>
