<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 高后果区识别计划处理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="searchInfo" placeholder="输入任意信息" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                        type="danger"
                        icon="el-icon-delete"
                        class="handle-del el-icon--right"
                        @click="delAllSelection"
                        style="float:right"
                >批量删除</el-button>
                <el-button
                        type="success"
                        icon="el-icon-circle-plus-outline"
                        class="handle-del el-icon--right"
                        @click="handleAdd"
                        style="float:right"
                >新增</el-button>
            </div>
            <el-table
                    :data="tableDataR"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @row-click="handleRowClick"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="管段编号" label="管段编号"></el-table-column>
                <el-table-column prop="管段名称" label="管段名称"></el-table-column>
                <el-table-column prop="起始里程" label="起始里程">
                </el-table-column>
                <el-table-column prop="结束里程" label="结束里程">
                </el-table-column>
                <el-table-column prop="高后果区长度"  label="高后果区长度"></el-table-column>
                <el-table-column prop="识别日期"  label="识别日期">
                </el-table-column>
                <el-table-column prop="HCAs总分" label="HCAs总分"></el-table-column>
                <el-table-column prop="级别" label="级别"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="管道名称">
                    <el-input v-model="form.管道名称"></el-input>
                </el-form-item>
                <el-form-item label="所属任务">
                    <el-input v-model="form.所属任务"></el-input>
                </el-form-item>
                <el-form-item label="识别时间">
                    <el-input v-model="form.识别时间"></el-input>
                </el-form-item>
                <el-form-item label="识别负责人">
                    <el-input v-model="form.识别负责人"></el-input>
                </el-form-item>
                <el-form-item label="管段">
                    <el-input v-model="form.管段"></el-input>
                </el-form-item>
                <el-form-item label="高后果区类型">
                    <el-input v-model="form.高后果区类型"></el-input>
                </el-form-item>
                <el-form-item label="分类区域">
                    <el-input v-model="form.分类区域"></el-input>
                </el-form-item>
                <el-form-item label="HCAs识别评分">
                    <table border="1" cellspacing="0" cellpadding="0" style="width: 100%">
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>总分</td>
                        </tr>
                        <tr style="width: 100%">
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.a" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.b" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.c" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.d" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.e" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.f" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.g" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.h" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="form.总分"></input></td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="高后果区特征描述">
                    <el-input v-model="form.高后果区特征描述"></el-input>
                </el-form-item>
                <el-form-item label="高后果区特征描述">
                    <el-input v-model="form.HCAs识别分类评分说明"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addForm" label-width="140px">
                <el-form-item label="管道名称">
                    <el-input v-model="addForm.管道名称"></el-input>
                </el-form-item>
                <el-form-item label="所属任务">
                    <el-input v-model="addForm.所属任务"></el-input>
                </el-form-item>
                <el-form-item label="识别时间">
                    <el-input v-model="addForm.识别时间"></el-input>
                </el-form-item>
                <el-form-item label="识别负责人">
                    <el-input v-model="addForm.识别负责人"></el-input>
                </el-form-item>
                <el-form-item label="管段">
                    <el-input v-model="addForm.管段"></el-input>
                </el-form-item>
                <el-form-item label="高后果区类型">
                    <el-input v-model="addForm.高后果区类型"></el-input>
                </el-form-item>
                <el-form-item label="分类区域">
                    <el-input v-model="addForm.分类区域"></el-input>
                </el-form-item>
                <el-form-item label="HCAs识别评分">
                    <table border="1" cellspacing="0" cellpadding="0" style="width: 100%">
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>总分</td>
                        </tr>
                        <tr style="width: 100%">
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.a" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.b" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.c" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.d" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.e" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.f" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.g" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.h" ></td>
                            <td><input style="width: calc(100% - 4px);border: none;" v-model="addForm.总分"></input></td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="高后果区特征描述">
                    <el-input v-model="addForm.高后果区特征描述"></el-input>
                </el-form-item>
                <el-form-item label="高后果区特征描述">
                    <el-input v-model="addForm.HCAs识别分类评分说明"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addForm.备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData } from '../../api/index';
    export default {
        name: 'ghgqshjh',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                tableDataR: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible:false,
                pageTotal: 0,
                form: {},
                searchInfo:'',
                addForm:{},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(process.env.BASE_URL + '/高后果区识别计划处理.json',this.query).then(res => {
                    this.tableData = res.list;
                    this.tableDataR = res.list;
                    this.pageTotal = res.pageTotal || 50;
                });
            },
            handleAdd(){
                this.addVisible=true
            },
            // 触发搜索按钮
            handleSearch() {
                let c= this
                this.tableDataR=this.tableData.filter((item)=>{
                    for(let i in item){
                        if(item[i].toString().indexOf(c.searchInfo)!=-1){
                            return true
                        }
                    }
                    return false
                })
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRowClick(row,column,event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            delAllSelection() {
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.tableData=this.tableData.filter(v =>{
                        return this.multipleSelection.every(x=>{
                            return v['id']!=x['id']
                        })
                    })
                    this.$message.success(`删除成功`);
                    this.multipleSelection = [];
                }).catch(() => {});

                // const length = this.multipleSelection.length;
                // console.log(this.multipleSelection)
                // let str = '';
                // this.delList = this.delList.concat(this.multipleSelection);
                // for (let i = 0; i < length; i++) {
                //     str += this.multipleSelection[i].name + ' ';
                // }

            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = Object.assign({},row);
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$set(this.tableData, this.idx, this.form);
                this.$message.success(`修改成功`);
            },
            //保存新增
            saveAdd(){
                this.addForm['id']=parseInt(this.tableData[this.tableData.length-1]['id']) + 1
                this.tableData.push(Object.assign({},this.addForm))
                this.addVisible = false;
                this.$message.success('新增成功');
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
