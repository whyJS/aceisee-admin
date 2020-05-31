<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="单词：	">
            <el-input :size="size" v-model="query.chName" placeholder="单词"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :size="size">查询</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>
      <el-table-column type="selection" width="40"> </el-table-column>

      <el-table-column label="单词	">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <el-table-column label="错误次数	">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <el-table-column label="测试次数		">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <el-table-column label="错误比率">
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

      },


      data: [1, 2, 3, 4, 5, 6], //列表
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 100
      },

    }
  },
  computed: {

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

  },
}
</script>
