<template>
  <!-- <div class="app-container"> -->
  <basic-container>

    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="单词拼写：">
            <el-input :size="size" v-model="query.chName" placeholder="单词拼写"></el-input>
          </el-form-item>

          <el-form-item label="所属项目：">
            <el-select style="width:100px" :size="size" v-model="query.type1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属课程：">
            <el-select style="width:100px" :size="size" v-model="query.type2" placeholder="请选择"
              @change="changeSelect2($event)">
              <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label=" 所属类型：">
            <el-select style="width:100px" :size="size" v-model="query.type3" placeholder="请选择"
              @change="changeSelect3($event)">
              <el-option v-for="(item,index) in select3" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :size="size">查询</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <!-- 列表 -->
        <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border>

          <!-- 选择学生 -->
          <el-table-column label="选择学生" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row }}</span>
            </template>
          </el-table-column>

        </el-table>
        <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage"
          :limit.sync="page.pageSize" @pagination="onLoad" />
      </el-col>

      <el-col :span="10">
        <!-- 列表 -->
        <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>

          <!-- 拼写 -->
          <el-table-column align="center" label="拼写">
            <template slot="header" slot-scope="scope">
              <el-input size="mini" placeholder="输入关键字搜索" />
            </template>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <span>{{ scope.row }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单词数量">
              <template slot-scope="scope">
                <span>{{ scope.row }}</span>
              </template>
            </el-table-column>
            <el-table-column label="允许错误数量">
              <template slot-scope="scope">
                <span>{{ scope.row }}</span>
              </template>
            </el-table-column>
          </el-table-column>

        </el-table>

      </el-col>

      <el-col :span="6">
        <!-- 列表 -->
        <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border>

          <!-- 拼写 -->
          <el-table-column label="已分配list" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row }}</span>
            </template>
          </el-table-column>

        </el-table>

      </el-col>

    </el-row>

  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getList } from '@/api/word'
import Pagination from '@/components/Pagination/index2' // secondary package based on el-pagination
export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {

  },
  data () {
    return {
      size: 'mini',
      //下拉选
      select1: [{
        name: 'select',
        id: 1
      },
      {
        name: 'select',
        id: 2
      }],
      select2: [],
      select3: [],
      select4: [{
        name: '全部',
        id: 1
      },
      {
        name: 'select',
        id: 2
      }],
      select5: [{
        name: '全部',
        id: 1
      },
      {
        name: 'select',
        id: 2
      }],
      //参数
      query: {
        chName: "",
        type1: "",
        type2: "",
        type3: "",
        type4: "",
        type5: "",
      },

      //列表
      data: [1, 2, 3, 4, 5, 6],
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
    //加载列表
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
        this.selectionClear();
      });
    },
    //查询
    searchChange () {
      this.page.currentPage = 1;
      this.onLoad();
    },
    //重置
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
    //删除
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




    // 三级联动选择框
    changeSelect1 (val) {
      console.log(val)
      this.query.type1 = val
      this.query.type2 = ''
      this.query.type3 = ''
      this.select2 = []
      this.select3 = []
      setTimeout(() => {
        this.select2 = [
          {
            name: 'select2',
            id: 1
          },
          {
            name: 'select2',
            id: 2
          }, {
            name: 'select2',
            id: 3
          }
        ]
      })
    },
    changeSelect2 (val) {
      console.log(val)
      this.query.type2 = val
      this.query.type3 = ''
      this.select3 = []
      setTimeout(() => {
        this.select3 = [
          {
            name: 'select3',
            id: 1
          },
          {
            name: 'select3',
            id: 2
          }, {
            name: 'select3',
            id: 3
          }
        ]
      })
    },
    changeSelect3 (val) {
      console.log(val)
      this.type3 = val
    },

    // 添加
    handleAdd () {
      console.log('添加')
      this.adddrawer = true;
    },
    // 关闭弹框
    closeView () {
      this.$refs.detailDrawer.closeDrawer();
      this.adddrawer = false;
    },
  },
}
</script>
