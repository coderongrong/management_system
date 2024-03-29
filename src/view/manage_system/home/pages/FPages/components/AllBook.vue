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
                    prop="book_name"
                >
                    <el-input
                        v-model="ruleForm.book_name"
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
                    <el-button @click="dialogFormVisible = true">创建</el-button>
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>

    <el-dialog
        v-model="dialogFormVisible"
        title="新增"
        width="500"
    >
        <el-form :model="formModel">
            <el-form-item
                label="书名："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.book_name"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="作者："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.author"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="出版社："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.publish"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="语言："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.language"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="价格："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.price"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="库存："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.stock"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="简介："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.introduction"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="出版时间："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.publish_time"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="分类："
                :label-width="formLabelWidth"
            >
                <el-input
                    v-model="formModel.book_class_id"
                    autocomplete="off"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button
                    type="primary"
                    @click="handleOk"
                >
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <div style='margin-top: 20px;'>
        <el-table
            :data="tableData"
            style="width: 100%"
        >
            <el-table-column
                prop="book_name"
                label="书名"
                width="120"
            />
            <el-table-column
                prop="author"
                label="作者"
                width="100"
            />
            <el-table-column
                prop="publish"
                label="出版社"
            />
            <el-table-column
                prop="publish_time"
                label="出版时间"
            />
            <el-table-column
                prop="language"
                label="语言"
            />
            <el-table-column
                prop="price"
                label="价格"
            />
            <el-table-column
                prop="stock"
                label="库存"
            />
            <el-table-column
                prop="introduction"
                label="简介"
            />
            <el-table-column
                prop="name"
                label="创建时间"
            />
            <el-table-column
                prop="book_class_id"
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
import { getAddList, getList } from "@/request/api";
import type { FormInstance, FormRules } from "element-plus";
import { regionData } from "element-china-area-data";
import { ElMessage } from "element-plus";

interface IForm {
    bookType: string;
    name: string;
    autor: string;
    lang: string;
}

const ruleFormRef = ref<FormInstance>();
const input = ref("");
const value = ref("");
const dialogFormVisible = ref(false);
const formLabelWidth = ref(100);

const ruleForm: IForm = reactive({
    bookType: "",
    book_name: "",
    autor: "",
    lang: "",
});

const formModel = ref({});

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

const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0])

// mounted
onMounted(async () => {
    getListData();
});

const submitForm = (formEl: FormInstance | undefined) => {
    console.log('formEl', formEl);
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

// table 表格
const tableData = ref([]);
//详情
const handleClick = () => {};

const handleCancel = () => {
    formModel.value = {};
    dialogFormVisible.value = false;
};

const getListData = async () => {
    const res = await getList({
        page: 1,
        size: 10,
        ...toRaw(ruleForm),
    });
    tableData.value = res;
};

const handleOk = async () => {
    const res = await getAddList(toRaw(formModel.value));
    if (res.code == 200) {
        ElMessage({
            message: "创建成功",
            type: "success",
        });
        formModel.value = {};
        getListData();
    } else {
        ElMessage({
            message: "创建失败",
            type: 'error'
        });
    }
    dialogFormVisible.value = false;
};
</script>

<style scoped lang='less'>
</style>