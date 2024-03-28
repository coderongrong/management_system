<template>
    <el-form
        ref="ruleFormRef"
        style="max-width: 100%"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
    >

        <el-row :gutter="20">
            <el-col :span="4">
                <el-form-item
                    label="图书分类"
                    prop="bookType"
                >
                    <el-select
                        v-model="ruleForm.bookType"
                        autocomplete="off"
                        placeholder="请选择"
                    >
                        <el-option
                            label="Zone one"
                            value="shanghai"
                        />
                        <el-option
                            label="Zone two"
                            value="beijing"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item
                    label="书名"
                    prop="name"
                >
                    <el-input
                        v-model="ruleForm.name"
                        autocomplete="off"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item
                    label="作者"
                    prop="autor"
                >
                    <el-input v-model.number="ruleForm.autor" />
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item
                    label="语言"
                    prop="lang"
                >
                    <el-input v-model.number="ruleForm.lang" />
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitForm(ruleFormRef)"
                    >查询</el-button>
                    <el-button @click="resetForm(ruleFormRef)">创建</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
    <div style='margin-top: 20px;'>
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="date"
                label="书名"
                width="120"
            />
            <el-table-column
                prop="name"
                label="作者"
                width="100"
            />
            <el-table-column
                prop="address"
                label="出版社"
            />
            <el-table-column
                prop="name"
                label="出版时间"
            />
            <el-table-column
                prop="name"
                label="语言"
            />
            <el-table-column
                prop="name"
                label="价格"
            />
            <el-table-column
                prop="name"
                label="库存"
            />
            <el-table-column
                prop="name"
                label="简介"
            />
            <el-table-column
                prop="name"
                label="创建时间"
            />
            <el-table-column
                prop="name"
                label="分类名称"
            />
            <el-table-column
                prop="name"
                label="分类名称"
                width="180"
            >
                <template #default>
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="handleClick"
                    >详情</el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                    >借阅</el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                    >编辑</el-button>
                    <el-button
                        link
                        type="primary"
                        size="small"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang='ts'>
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const input = ref("");
const value = ref("");

const ruleForm = reactive({
    bookType: "",
    name: "",
    autor: "",
    lang: "",
});

const options = [
    {
        value: "Option1",
        label: "Option1",
    },
    {
        value: "Option2",
        label: "Option2",
        disabled: true,
    },
    {
        value: "Option3",
        label: "Option3",
    },
    {
        value: "Option4",
        label: "Option4",
    },
    {
        value: "Option5",
        label: "Option5",
    },
];

const rules = reactive<FormRules<typeof ruleForm>>({
    bookType: [
        {
            required: false,
            message: "Please select Activity zone",
            trigger: "change",
        },
    ],
    name: [
        {
            required: false,
            message: "Please select Activity zone",
            trigger: "change",
        },
    ],
    autor: [
        {
            required: false,
            message: "Please select Activity zone",
            trigger: "change",
        },
    ],
    lang: [
        {
            required: false,
            message: "Please select Activity zone",
            trigger: "change",
        },
    ],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log("submit!", toRaw(ruleForm));
        } else {
            console.log("error submit!");
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

// table 表格
const tableData = [
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grov",
    },
    {
        date: "2016-05-02",
        name: "Tom",
        address: "No. 189, Gr",
    },
    {
        date: "2016-05-04",
        name: "Tom",
        address: "No. 189, Gro",
    },
    {
        date: "2016-05-01",
        name: "Tom",
        address: "No. 189",
    },
];
</script>

<style scoped lang='less'>
</style>