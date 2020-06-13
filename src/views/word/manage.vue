<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" :size="size" icon="el-icon-add" @click="handleClick(0)">添加</el-button>
        <!-- <el-button type="primary" :size="size" icon="el-icon-edit" @click="dialogVisible=true">编辑</el-button> -->
        <el-button type="danger" :size="size" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="词根拼写：">
            <el-input :size="size" v-model="query.search" placeholder="词根拼写"></el-input>
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
      <el-table-column label="拼写">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <!-- 英文解释 -->
      <el-table-column label="英文解释">
        <template slot-scope="scope">
          <span>{{ scope.row.zhDesc }}</span>
        </template>
      </el-table-column>

      <!-- 中文解释 -->
      <el-table-column label="英文解释">
        <template slot-scope="scope">
          <span>{{ scope.row.enDesc }}</span>
        </template>
      </el-table-column>

      <!-- 中文解释 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="small" @click="handleClick(1, scope.row)">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />

    <el-dialog title="添加词根" :visible.sync="dialogVisible" append-to-body width="60%">
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :model="form" class="demo-form-inline">
            <el-col :span="24">
              <el-form-item label="单词拼写：">
                <el-input :size="size" v-model="form.name" placeholder="单词拼写"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="中文释义">
                <el-input type="textarea" v-model="form.zhDesc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="英文释义	">
                <el-input type="textarea" v-model="form.enDesc"></el-input>
              </el-form-item>
            </el-col>

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
import { getRootList, rootSave, rootDele } from '@/api/word'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {

  },
  data () {
    return {
      size: 'mini',

      query: {//参数
        search: "",
      },
      data: [], //列表
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      selectionList: [],

      form: {
        id: '',
        name: "",
        enDesc: "",
        zhDesc: ""
      },
      dialogVisible: false
    }

  },
  computed: {
    ids () {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      getRootList(
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
    searchChange () {
      this.page.pageNum = 1;
      this.onLoad();
    },
    searchReset () {
      this.query = {
        search: ""
      }
      this.onLoad();
    },

    selectionChange (list) {
      this.selectionList = list;
    },
    selectionClear () {
      this.selectionList = [];

    },
    handleClick (i, item) {
      this.dialogVisible = true
      if (i == 0) {
        this.form = {
          id: '',
          name: "",
          enDesc: "",
          zhDesc: ""
        }
        this.dialogVisible = true

      } else {
        this.form = item
        this.dialogVisible = true
      }
    },
    //新增
    handleAdd () {
      rootSave(this.form).then((res) => {
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
          return rootDele(this.ids);
        })
        .then(() => {
          this.data = [];
          this.onLoad();
          this.$message({
            type: "success",
            message: "操作成功!"
          });

        });
    }
  },
}
</script>
