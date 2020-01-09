<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 高后果区工作计划
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="searchInfo" placeholder="输入任意信息" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                        type="success"
                        icon="el-icon-circle-plus-outline"
                        class="handle-del el-icon--right"
                        @click="handleAdd"
                        style="float:right"
                >详情</el-button>
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
                <el-table-column prop="制定单位" label="制定单位"></el-table-column>
                <el-table-column prop="工作名称" label="工作名称"></el-table-column>
                <el-table-column prop="管线名称" label="管线名称">
                </el-table-column>
                <el-table-column prop="管段" label="管段">
                </el-table-column>
                <el-table-column prop="计划识别开始时间"  label="计划识别开始时间"></el-table-column>
                <el-table-column prop="计划识别结束时间"  label="计划识别开始时间">
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
                <el-form-item label="制定单位">
                    <el-input v-model="form.制定单位"></el-input>
                </el-form-item>
                <el-form-item label="工作名称">
                    <el-input v-model="form.工作名称"></el-input>
                </el-form-item>
                <el-form-item label="管线名称">
                    <el-input v-model="form.管线名称"></el-input>
                </el-form-item>
                <el-form-item label="起始里程">
                    <el-input v-model="form.起始里程"></el-input>
                </el-form-item>
                <el-form-item label="终止里程">
                    <el-input v-model="form.终止里程"></el-input>
                </el-form-item>
                <el-form-item label="计划识别开始时间">
                    <el-input v-model="form.计划识别开始时间"></el-input>
                </el-form-item>
                <el-form-item label="计划识别结束时间">
                    <el-input v-model="form.计划识别结束时间"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="详情" :visible.sync="addVisible" width="60%">
            <table border="1" cellpadding="0" cellspacing="0" color="#000000" style="width: 100%">
                <tr>
                    <td colspan="4" class="tt" style="text-align: left">
                        <div class="title">查看工作计划</div>
                        <div class="subTitle">详细信息</div>
                    </td>
                </tr>
                <tr>
                    <td class="tm">工作单位</td>
                    <td>高后果区识别工作计划</td>
                    <td class="tm"> 制定单位</td>
                    <td>管道完整性办公室</td>
                </tr>
                <tr>
                    <td class="tm">识别单位</td>
                    <td>花管输油站</td>
                    <td class="tm">识别负责人</td>
                    <td>王长喜</td>
                </tr>
                <tr>
                    <td class="tm">识别依据</td>
                    <td>识别要求</td>
                    <td class="tm">所在管线</td>
                    <td>东辛输油管线（新线）</td>
                </tr>
                <tr>
                    <td class="tm">起始里程</td>
                    <td></td>
                    <td class="tm">结束里程</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="tm">坐标(x,y)</td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td class="tm">计划识别开始时间</td>
                    <td>2014-02-11</td>
                    <td class="tm">计划识别结束时间</td>
                    <td>2014-03-11</td>
                </tr>
                <tr>
                    <td class="tm">实际识别开始时间</td>
                    <td>2014-02-11</td>
                    <td class="tm">实际识别结束时间</td>
                    <td>2014-03-10</td>
                </tr>
                <tr>
                    <td class="tm">再次识别计划</td>
                    <td></td>
                    <td class="tm">备注</td>
                    <td></td>
                </tr>
            </table>
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
                fetchData(process.env.BASE_URL + '/高后果区工作计划.json',this.query).then(res => {
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
    tr{

    }
    .title{
        font-size: 30px;
    }

    td{
        color:#000000;
        height: 40px;
        padding:5px;
    }

    .tt{
        background: rgb(179,216,255);
    }

    .tm{
        text-align:right;
        /*background: rgb(254,235,196);*/
        background: rgb(179,216,255);

    }

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
