<template>
  <basic-container>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :model="query" label-width="80px">
          <el-form-item label="用户名：">
            <el-input v-model="query.chName" placeholder="用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码：">
            <el-input v-model="query.chName" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
import { getList } from '@/api/word'

export default {
  name: 'ComplexTable',
  filters: {

  },
  data () {
    return {
      size: 'mini',


      query: {//参数
        chName: "",

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


  },
}
</script>
