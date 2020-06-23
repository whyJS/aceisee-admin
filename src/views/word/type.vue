<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" :size="size" icon="el-icon-add" @click="handleClick">添加</el-button>
        <!-- <el-button type="primary" :size="size" icon="el-icon-edit">编辑</el-button> -->
        <el-button type="danger" :size="size" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="类型名称：	">
            <el-input :size="size" v-model="query.name" placeholder="类型名称"></el-input>
          </el-form-item>

          <el-form-item label="所属项目：">
            <el-select style="width:100px" :size="size" v-model="query.c1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属课程：">
            <el-select style="width:100px" :size="size" v-model="query.c2" placeholder="请选择">
              <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchChange" :size="size">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchReset" :size="size">重置</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy @selection-change="selectionChange">
      <el-table-column type="selection" width="40"> </el-table-column>
      <!-- id -->
      <el-table-column type="index" label="#" width="40">

      </el-table-column>

      <!-- 拼写 -->
      <el-table-column label="类型名称">
        <template slot-scope="scope">
          <span>{{ scope.row.c3Name }}</span>
        </template>
      </el-table-column>

      <!-- 音标 -->
      <el-table-column label="所属课程	">
        <template slot-scope="scope">
          <span>{{ scope.row.c2Name }}</span>
        </template>
      </el-table-column>

      <!-- 词根 -->
      <el-table-column label="所属项目	">
        <template slot-scope="scope">
          <span>{{ scope.row.c1Name }}</span>
        </template>
      </el-table-column>

      <!-- 类型编码 -->
      <el-table-column label="类型编码">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />

    <el-dialog title="添加单词类型" :visible.sync="dialogVisible" append-to-body width="60%">
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :model="form" class="demo-form-inline" label-width="100px">
            <el-col :span="24">
              <el-form-item label="类型名称：">
                <el-input :size="size" v-model="form.name" placeholder="类型名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="类型编码：">
                <el-input :size="size" v-model="form.code" placeholder="类型编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属项目：">
                <el-select style="width:100%" :size="size" v-model="c1" placeholder="请选择" @change="addSelect1($event)">
                  <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="24">
              <el-form-item label="所属课程：">
                <el-select style="width:100%" :size="size" v-model="form.pCode" placeholder="请选择">
                  <el-option v-for="(item,index) in c2List" :key="index" :label="item.name" :value="item.code">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="所属课程：">
                <el-radio-group v-model="query2.a2">
                  <el-radio :label="3">备选项</el-radio>
                  <el-radio :label="6">备选项</el-radio>
                  <el-radio :label="9">备选项</el-radio>
                </el-radio-group>
                &nbsp; &nbsp; &nbsp;<el-checkbox v-model="query2.a3">备选项</el-checkbox>

              </el-form-item>
            </el-col> -->

          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getCategorysearchList, getCategoryList, addCat, deleCat } from '@/api/word'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {

  },
  data () {
    return {
      size: 'mini',
      select1: [],//一级分类
      select2: [],//二级分类
      query: {//参数
        name: "",
        c1: "",
        c2: ""
      },

      data: [], //列表
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      selectionList: [],

      form: {//新增，编辑
        code: "",
        pCode: "",
        name: ""
      },
      c1: '',//所属项目
      c2List: [],
      dialogVisible: false
    }
  },
  computed: {
    ids () {
      let ids = [];
      this.selectionList.forEach(ele => {
        console.log(ele)
        ids.push(ele.code);
      });
      return ids.join(",");
    },
  },
  created () {
    this.onLoad()
    this._getCategoryList("")
  },
  methods: {
    onLoad () {
      getCategorysearchList(
        this.page.pageNum,
        this.page.pageSize,
        Object.assign({}, this.query)
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
        this.selectionClear()
      });
    },
    //查询
    searchChange () {
      this.page.pageNum = 1;
      this.onLoad();
    },
    //重置
    searchReset () {
      this.query = {//参数
        name: "",
        c1: "",
        c2: ""
      }

      this.onLoad();
    },
    //选择列表
    selectionChange (list) {
      this.selectionList = list;
    },
    selectionClear () {
      this.selectionList = [];
    },
    handleClick () {
      this.dialogVisible = true
      // if (i == 0) {
      //   this.dialogVisible = true
      // } else {
      //   if (this.selectionList.length != 1) {
      //     this.$message.warning("请选择一条数据");
      //     return;
      //   }
      //   this.dialogVisible = true
      // }
    },
    //新增
    handleAdd () {
      let obj = Object.assign({}, this.form)
      if (this.c1 == "") {
        this.$message({
          type: "error",
          message: "请选择所属项目!"
        });
        return
      }
      if (this.form.pCode == '') {
        obj.pCode = this.c1
      }
      addCat(obj).then((res) => {
        console.log(res)
        this.data = [];
        this.onLoad();
        this.dialogVisible = false
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      })
    },
    addSelect1 (val) {
      this.c1 = val
      this.form.pCode = ''
      this.c2List = []
      getCategoryList(val).then((res) => {
        this.c2List = res.data
      })
    },

    //删除列表
    handleDelete () {
      if (this.selectionList.length != 1) {
        this.$message.warning("请选择一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return deleCat(this.ids);
        })
        .then(() => {
          this.data = [];
          this.onLoad();
          this.$message({
            type: "success",
            message: "操作成功!"
          });

        });
    },

    // 类别选择框选择框
    _getCategoryList (code) {
      getCategoryList(code).then((res) => {
        this.select1 = res.data

      })
    },
    changeSelect1 (val) {
      this.query.c1 = val
      this.query.c2 = ''
      this.select2 = []
      getCategoryList(val).then((res) => {
        this.select2 = res.data
      })
    }



  },
}
</script>
