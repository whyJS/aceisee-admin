<template>
  <!-- <div class="app-container"> -->
  <basic-container>

    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input :size="size" v-model="query.name" placeholder="用户名"></el-input>
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
            <el-button type="primary" :size="size" @click="search">查询</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5" class="listLeft">
        <!-- 列表 -->
        <el-table :data="data" :current-row-key="1" row-key="1" ref="user" highlight-current-row @row-click="btn"
          :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" border>

          <!-- 选择学生 -->
          <el-table-column label="选择学生" align="center">
            <template slot-scope="scope">
              <div class="study">{{ scope.row.name }}（{{scope.row.nickName}}）</div>
            </template>
          </el-table-column>

        </el-table>
        <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
          @pagination="onLoad" />
      </el-col>

      <el-col :span="13">
        <!-- 列表 -->
        <el-table :data="unassignedList" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy @selection-change="selectionChange">

          <!-- 拼写 -->
          <el-table-column align="center" label="拼写">
            <!-- <template slot="header" slot-scope="scope">
              通过比例：
              <el-input style="width:50px;" size="mini" />
              <el-button size="mini" type="primary">设置</el-button>
            </template> -->
            <template slot="header" slot-scope="scope">
              未分配list
            </template>
            <el-table-column align="center" fixed="left" type="selection" width="40"> </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单词数量">
              <template slot-scope="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="允许错误数量">
              <template slot-scope="scope">
                <span>
                  <el-input :size="size" v-model="scope.row.errorNum" placeholder="用户名"></el-input>
                </span>
              </template>
            </el-table-column>
          </el-table-column>

        </el-table>
        <div style="width:100%;text-align:center;padding-top:10px;">
          <el-button style="width:100%" type="primary" @click="addList">添加</el-button>
        </div>

      </el-col>

      <el-col :span="6">
        <!-- 列表 -->
        <el-table :data="assignedList" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border @selection-change="selectionChange2">
          <el-table-column align="center" fixed="left" type="selection" width="40"> </el-table-column>
          <!-- 拼写 -->
          <el-table-column label="已分配list" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>

        </el-table>

        <div style="width:100%;text-align:center;padding-top:10px;">
          <el-button style="width:100%" type="danger" @click="deleList">删除</el-button>
        </div>

      </el-col>

    </el-row>

  </basic-container>
  <!-- </div> -->
</template>

<script>

import { getCategoryList } from '@/api/word'
import { getUserList } from '@/api/study'
import { getList, getAssignList, listFen } from '@/api/list'


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
      select1: [],
      select2: [],
      select3: [],

      //参数
      query: {
        name: '',
        c1: "",
        c2: "",
        c3: "",
      },

      //学生
      data: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      user: {},

      //list
      list: [],
      unassignedList: [],
      assignedList: [],
      selectionList: [],

      selectionList2: [],

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
  mounted () {
    this.$refs.user.toggleRowSelection(this.data[0], true);
  },
  created () {

    this._getCategoryList("")
  },
  methods: {
    //加载学生列表
    onLoad () {
      getUserList(
        this.page.pageNum,
        this.page.pageSize,
        this.query.name
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
      });
    },
    firstOnload () {
      getUserList(
        this.page.pageNum,
        this.page.pageSize,
        this.query.name
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;


        this.$nextTick(() => {
          setTimeout(() => {
            if (this.data.length > 0) {
              this.user = this.data[0]
              this.$refs.user.setCurrentRow(this.data[0]);
              this._getAssignList(this.data[0].name)
            }
          }, 10)
        });

      });
    },

    selectionClear () {
      this.selectionList = [];
    },
    _getAssignList (name) {
      if (!name) {
        name = this.user.name
      }
      getAssignList(
        name,
        {
          c1: this.query.c1,
          c2: this.query.c2,
          c3: this.query.c3,
        }
      ).then(res => {
        console.log(res)
        this.unassignedList = res.data.unassignedList
        this.assignedList = res.data.assignedList

      });
    },
    //查询list
    _getList () {
      this.firstOnload()

    },
    //查询
    searchChange () {
      this.page.currentPage = 1;
      this.onLoad();
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




    _getCategoryList (code) {
      getCategoryList(code).then((res) => {
        this.select1 = res.data
        if (this.select1.length > 0) {
          this.query.c1 = this.select1[0].code
          getCategoryList(this.select1[0].code).then((res2) => {
            this.select2 = res2.data
            if (this.select2.length > 0) {
              this.query.c2 = this.select2[0].code
              getCategoryList(this.select2[0].code).then((res3) => {
                this.select3 = res3.data
                if (this.select3.length > 0) {
                  this.query.c3 = this.select3[0].code
                }
                this._getList()
              })
            } else {
              this._getList()
            }
          })
        }
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


    //选择学生
    btn (row) {
      this.user = row
      this._getAssignList(row.name)

    },
    search () {
      getUserList(
        this.page.pageNum,
        this.page.pageSize,
        this.query.name
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;

        this.$nextTick(() => {
          setTimeout(() => {
            if (this.data.length > 0) {
              this.user = this.data[0]
              this.$refs.user.setCurrentRow(this.data[0]);
              this._getAssignList(this.data[0].name)
            }

          }, 10)
        });
      });
    },

    //分配list
    addList () {
      if (!this.user.id) {
        this.$message({
          message: "请选择学生",
          type: 'error'
        });
        return
      }
      if (this.selectionList.length == 0) {
        this.$message({
          message: "请选择list",
          type: 'error'
        });
        return
      }
      listFen({
        userId: this.user.id,
        assignedList: [...this.selectionList, ...this.assignedList]
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });

        this._getAssignList()
      })
    },
    selectionChange (list) {
      this.selectionList = list

    },

    //删除list
    deleList () {
      if (!this.user.id) {
        this.$message({
          message: "请选择学生",
          type: 'success'
        });
        return
      }
      let list = [...this.assignedList]
      this.assignedList.forEach((item, index) => {
        this.selectionList2.forEach((val) => {
          if (item.id == val.id) {
            list.splice(index, 1);
          }
        })
      })


      listFen({
        userId: this.user.id,
        assignedList: list
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });

        this._getAssignList()
      })

    },
    selectionChange2 (list) {
      this.selectionList2 = list

    },
  },
}
</script>
<style lang="scss" scoped>
.study {
  width: 100%;
  text-align: left;
}
</style>

<style lang="scss">
.listLeft {
  height: calc(100vh - 500px);
  overflow: auto;
  /* 用来设置当前页面element全局table 选中某行时的背景色*/
  .el-table__body tr.current-row > td {
    background-color: #409eff !important;
    color: #fff;
  }
  /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #409eff;
    /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
    color: #fff;
  }
}
</style>
