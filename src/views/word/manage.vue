<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" :size="size" icon="el-icon-add">添加</el-button>
        <el-button type="primary" :size="size" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" :size="size" icon="el-icon-delete">删除</el-button>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="词根拼写：">
            <el-input :size="size" v-model="query.chName" placeholder="词根拼写"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="size">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="size">重置</el-button>
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
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 英文解释 -->
      <el-table-column label="英文解释">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 中文解释 -->
      <el-table-column label="英文解释">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize"
      @pagination="onLoad" />
  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getList } from '@/api/word'
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
        chName: "",
        type1: "",
        type2: "",
        type3: "",
        type4: "",
        type5: "",
      },


      data: [1, 2, 3, 4, 5, 6], //列表
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 100
      },
      selectionList: [],
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
    // this.getList()
  },
  methods: {
    onLoad () {
      this.loading = true;
      console.log(this.page);
      getList(
        this.page.currentPage,
        this.page.pageSize,
        Object.assign({}, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        // this.selectionClear();
      });
    },
    searchChange () {
      this.page.currentPage = 1;
      this.onLoad();
    },
    searchReset () {
      this.query = {
        clientId: "",
        clientSecret: ""
      }
      this.onLoad();
    },

    selectionChange (list) {
      this.selectionList = list;
    },
    selectionClear () {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    handleDelete () {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
    },

    refreshChange () {
      this.onLoad();
    },
  },
}
</script>
