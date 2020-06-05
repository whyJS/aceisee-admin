<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" :size="size" icon="el-icon-add" @click="dialogVisible = true">添加</el-button>
        <el-button type="primary" :size="size" icon="el-icon-edit">编辑</el-button>
        <el-button type="danger" :size="size" icon="el-icon-delete">删除</el-button>
      </el-col>
    </el-row>
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
      <el-table-column label="类型名称">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 音标 -->
      <el-table-column label="所属课程	">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 词根 -->
      <el-table-column label="所属项目	">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

      <!-- 出现频率 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize"
      @pagination="onLoad" />

    <el-dialog title="添加单词类型" :visible.sync="dialogVisible" append-to-body width="60%">
      <!-- 搜索框 -->
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :model="query2" class="demo-form-inline" label-width="100px">
            <el-col :span="24">
              <el-form-item label="类型名称：">
                <el-input :size="size" v-model="query2.a1" placeholder="单词拼写"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属项目：">
                <el-select style="width:100%" :size="size" v-model="query.type1" placeholder="请选择"
                  @change="changeSelect1($event)">
                  <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="24">
              <el-form-item label="所属课程：">
                <el-select style="width:100%" :size="size" v-model="query.type2" placeholder="请选择"
                  @change="changeSelect2($event)">
                  <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="所属课程：">
                <el-radio-group v-model="query2.a2">
                  <el-radio :label="3">备选项</el-radio>
                  <el-radio :label="6">备选项</el-radio>
                  <el-radio :label="9">备选项</el-radio>
                </el-radio-group>
                &nbsp; &nbsp; &nbsp;<el-checkbox v-model="query2.a3">备选项</el-checkbox>

              </el-form-item>
            </el-col>

          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      select1: [{
        name: 'select',
        id: 1
      },
      {
        name: 'select',
        id: 2
      }],
      select2: [],

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

      query2: {
        a1: '',
        a2: '',
        a3: ''
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

    // 三级联动选择框
    changeSelect1 (val) {
      console.log(val)
      this.query.type1 = val
      this.query.type2 = ''
      this.select2 = []

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

    },

  },
}
</script>
