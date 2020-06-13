<template>
  <!-- <div class="app-container"> -->
  <basic-container>

    <!-- 列表 -->
    <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>

      <!-- id -->
      <el-table-column type="index" label="#" width="40">

      </el-table-column>

      <!-- 拼写 -->
      <el-table-column label="拼写">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <!-- 音标 -->
      <el-table-column label="音标">
        <template slot-scope="scope">
          <span>{{ scope.row.phonetic }}</span>
        </template>
      </el-table-column>

      <!-- 词根 -->
      <el-table-column label="词性">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 出现频率 -->
      <el-table-column label="单词类型	">
        <template slot-scope="scope">
          <span>{{ scope.row.wordKind }}</span>
        </template>
      </el-table-column>

      <!-- 出现频率 -->
      <el-table-column label="导入时间	">
        <template slot-scope="scope">
          <span>{{ scope.row.importTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">

          <el-button type="text" icon="el-icon-delete" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />
  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getRepeatList, wordDele } from '@/api/word'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {

  components: { Pagination },
  filters: {

  },
  data () {
    return {
      size: 'mini',
      data: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
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
    this.onLoad()
  },
  methods: {
    onLoad () {
      getRepeatList(
        this.page.pageNum,
        this.page.pageSize
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
      });
    },

    handleDelete (row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return wordDele(row.id)
        })
        .then(() => {
          this.data = []
          this.onLoad();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },


  },
}
</script>
