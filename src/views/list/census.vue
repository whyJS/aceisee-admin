<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="单词：	">
            <el-input :size="size" v-model="query.search" placeholder="单词"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="searchChange" :size="size">查询</el-button>
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

      <el-table-column label="单词	">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="错误次数	">
        <template slot-scope="scope">
          <span>{{ scope.row.testErrorNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="测试次数		">
        <template slot-scope="scope">
          <span>{{ scope.row.testNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="错误比率">
        <template slot-scope="scope">
          <span>{{ scope.row.rate }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />

  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getStatisticsList } from '@/api/list'
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

    }
  },
  computed: {

  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {

      getStatisticsList(
        this.page.pageNum,
        this.page.pageSize,
        Object.assign({}, this.query)
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
      });
    },
    searchChange () {
      this.page.currentPage = 1;
      this.onLoad();
    },


  },
}
</script>
