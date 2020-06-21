<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input :size="size" v-model="query.userName" placeholder="用户名"></el-input>
          </el-form-item>

          <el-form-item label="List名称">
            <el-input :size="size" v-model="query.listName" placeholder="List名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :size="size" @click="searchChange">查询</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-table :data="data" ref="crud" align="center" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>

      <el-table-column label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="list名称">
        <template slot-scope="scope">
          <span>{{ scope.row.listName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="错误数量	">
        <template slot-scope="scope">
          <span>{{ scope.row.errorNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="通过状态">
        <template slot-scope="scope">
          <span>{{ scope.row.result ==1?"通过":"未通过" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试用时">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="测试时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" size="small" @click="handleDetail(scope.row)">详情</el-button>

        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
      @pagination="onLoad" />

    <!-- 详情 -->
    <el-dialog title="测试详情" :visible.sync="show" append-to-body width="60%">
      <table width="100%" class="table" align="center" cellspacing="0" cellpadding="0">
        <tbody style="width：100%">
          <tr v-for="(item,index) in detailArr" :key="index" align="center">
            <td v-for="(val,i) in item" :key="i">
              <div class="div">
                <div class="d1">{{val.name}}</div>
                <div class="d2" v-if="val.value==1">正确</div>
                <div class="d3" v-else>错误</div>
              </div>

            </td>

          </tr>
        </tbody>
      </table>

    </el-dialog>

  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getRecordList } from '@/api/list'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  filters: {

  },
  data () {
    return {
      size: 'mini',
      show: false,
      query: {//参数
        userName: "",
        listName: ""
      },
      data: [], //列表
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      selectionList: [],
      detailArr: []
    }
  },
  computed: {

  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      getRecordList(
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

    handleDetail (val) {
      this.show = true


      this.detailArr = this.arrTrans(7, [...this.arrKeys(JSON.parse(val.detail))])
      // this.detailArr = this.arrKeys(JSON.parse(val.detail))

      // this.detailArr = this.arrTrans(6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 27, 18, 19, 20, 14, 34, 35, 45, 67, 56, 43, 44, 9])
      console.log(this.detailArr)

    },
    arrTrans (num, arr) { // 一维数组转换为二维数组
      console.log(arr)
      const iconsArr = []; // 声明数组
      arr.forEach((item, index) => {
        const page = Math.floor(index / num); // 计算该元素为第几个素组内
        if (!iconsArr[page]) { // 判断是否存在
          iconsArr[page] = [];
        }
        iconsArr[page].push(item);
      });
      return iconsArr;
    },
    arrKeys (arr) { // 一维数组转换为二维数组
      let a = [];
      arr.forEach((item) => {
        let obj = {
          name: Object.keys(item)[0],
          value: item[Object.keys(item)[0]]
        }
        a.push(obj)

      });
      return a
    }

  },
}
</script>
<style lang="scss" scoped>
.table {
  border: 1px solid rgb(229, 229, 229);
  border-bottom: 0px solid rgb(229, 229, 229);
  border-right: 0px solid rgb(229, 229, 229);
  .tableheader {
    width: 100%;
    font-weight: bold;
    background-color: rgb(229, 229, 229);
    padding: 10px;
    box-sizing: border-box;
  }
  td {
    border-bottom: 1px solid rgb(229, 229, 229);
    border-right: 1px solid rgb(229, 229, 229);
    padding: 0px 6px;
    box-sizing: border-box;

    .div {
      display: flex;
      align-items: center;
      height: 100%;

      .d1 {
        flex: 1;
        text-align: left;
        box-sizing: border-box;
        border-right: 1px solid rgb(229, 229, 229);
        padding: 6px 0px;
      }
      .d2 {
        width: 50px;
        padding: 6px 0px;
        color: green;
      }
      .d3 {
        width: 50px;
        padding: 6px 0px;
        color: red;
      }
    }
  }
}
</style>
