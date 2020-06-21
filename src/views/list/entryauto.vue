<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleAdd" :size="size" icon="el-icon-add">添加List</el-button>
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="名称：">
            <el-input :size="size" v-model="query.search" placeholder="名称"></el-input>
          </el-form-item>

          <el-form-item label="所属项目：">
            <el-select style="width:100px" :size="size" v-model="query.c1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属课程：">
            <el-select style="width:100px" :size="size" v-model="query.c2" placeholder="请选择"
              @change="changeSelect2($event)">
              <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label=" 所属类型：">
            <el-select style="width:100px" :size="size" v-model="query.c3" placeholder="请选择">
              <el-option v-for="(item,index) in select3" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="size" @click="searchChange">查询</el-button>
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

      <!-- 名称 -->
      <el-table-column label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <!-- 所属项目 -->
      <el-table-column label="所属项目">
        <template slot-scope="scope">
          <span>{{ scope.row.c1Name }}</span>
        </template>
      </el-table-column>

      <!-- 所属课程 -->
      <el-table-column label="所属课程">
        <template slot-scope="scope">
          <span>{{ scope.row.c2Name }}</span>
        </template>
      </el-table-column>

      <!-- 所属类型 -->
      <el-table-column label="所属类型">
        <template slot-scope="scope">
          <span>{{ scope.row.c3Name }}</span>
        </template>
      </el-table-column>

      <!-- 排序（第几个要过的list） -->
      <el-table-column label="排序（第几个要过的list）">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="small" @click="handleUpdata(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />

    <!-- 添加 -->
    <el-drawer ref="detailDrawer" :title="isEditTitle" :visible.sync="adddrawer" :destroy-on-close="destroyOnClose"
      direction="rtl" :append-to-body="appendToBody" size="80%" @close="closedrawer">
      <word-add @closeView="closeView" :select="select1" :typeDrawer="type" :frequencyList="frequencyList">
      </word-add>
    </el-drawer>

    <!-- 编辑 -->
    <el-drawer ref="detailDrawer2" :title="isEditTitle2" :visible.sync="editdrawer" @close="closedrawer"
      :destroy-on-close="destroyOnClose" direction="rtl" :append-to-body="appendToBody" size="80%">
      <word-edit @closeView="closeView" :select="select1" :typeDrawer="type" :frequencyList="frequencyList"
        :id="wordId"></word-edit>
    </el-drawer>

  </basic-container>
  <!-- </div> -->
</template>

<script>

import { getCategoryList } from '@/api/word'
import { getList, listDele } from '@/api/list'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import WordAdd from "./components/add";
import WordEdit from "./components/edit";
export default {
  name: 'ComplexTable',
  components: { Pagination, WordAdd, WordEdit },
  filters: {

  },
  data () {
    return {
      size: 'mini',
      //下拉选
      select1: [],
      select2: [],
      select3: [],
      frequencyList: [//出现频率
        {
          name: '默认',
          val: 0
        },
        {
          name: '最低',
          val: 1
        },
        {
          name: '低',
          val: 2
        },
        {
          name: '中',
          val: 3
        },
        {
          name: '高',
          val: 4
        },
        {
          name: '最高',
          val: 5
        },
      ],


      //参数
      query: {
        search: "",
        c1: "",
        c2: "",
        c3: ""
      },
      data: [], //列表
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },


      // 添加
      adddrawer: false,
      appendToBody: true,
      destroyOnClose: true,
      isEditTitle: '添加单词',
      type: 0,

      editdrawer: false,
      wordId: '',
      isEditTitle2: "编辑单词",



    }
  },
  computed: {

  },
  created () {
    this.onLoad()
    this._getCategoryList("")
  },
  methods: {
    //加载列表
    onLoad () {
      getList(
        this.page.pageNum,
        this.page.pageSize,
        Object.assign({}, this.query)
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;

      });
    },
    //查询
    searchChange () {
      this.page.pageNum = 1;
      this.onLoad();
    },

    //删除
    handleDelete (row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return listDele(row.id)
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



    // 类别选择框选择框
    _getCategoryList (code) {
      getCategoryList(code).then((res) => {
        this.select1 = res.data
      })
    },
    changeSelect1 (val) {
      this.query.c1 = val
      this.query.c2 = ''
      this.query.c3 = ''
      this.select2 = []
      this.select3 = []
      getCategoryList(val).then((res) => {
        this.select2 = res.data
      })
    },
    changeSelect2 (val) {

      this.query.c2 = val
      this.query.c3 = ''
      this.select3 = []
      getCategoryList(val).then((res) => {
        this.select3 = res.data
      })
    },


    // 添加
    handleAdd () {

      this.adddrawer = true;
    },
    // 关闭弹框
    closeView () {
      this.$refs.detailDrawer.closeDrawer();
      this.adddrawer = false;
      this.onLoad()
    },





    //编辑单词
    handleUpdata (item) {
      this.editdrawer = true;
      this.wordId = item.id
    },
    // 关闭弹框
    closeView2 () {
      this.$refs.detailDrawer2.closeDrawer();
      this.editdrawer = false;
      this.onLoad()
    },

    closedrawer () {
      this.onLoad()
    }


  },
}
</script>
