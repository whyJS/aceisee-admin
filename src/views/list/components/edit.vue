<template>
  <div v-loading="fetching" class="createPost-container">

    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="名称：">
            <el-input :size="size" v-model="query.name" placeholder="名称"></el-input>
          </el-form-item>

          <el-form-item label="所属项目：">
            <el-select style="width:100px" :size="size" v-model="query.c1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select" :key="index" :label="item.name" :value="item.code">
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
          <el-form-item label="排序：">
            <el-input :size="size" v-model="query.sort" type="number" placeholder="排序"></el-input>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <!-- 列表 -->
      <el-table :data="list" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>

        <!-- id -->
        <el-table-column type="index" label="排序" width="60"></el-table-column>

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
        <el-table-column label="词根">
          <template slot-scope="scope">
            <span>{{ scope.row.wordRoot }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-delete" size="small" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>

    <el-row style="margin-top:20px;text-align:center;">
      <!-- <el-button type="primary">自动分配单词</el-button> -->
      <el-button type="success" @click="autoWord">自动分配单词</el-button>
      <el-button type="success" @click="addWord">添加单词</el-button>
      <span>单词容量:</span>
      <el-input style="width:100px;" :size="size" v-model="wordSize" type="number" placeholder="单词容量"></el-input>
    </el-row>

    <el-row style="margin-top:20px;text-align:center;">
      <el-button @click="handleAdd">保存list</el-button>
    </el-row>

    <!-- 选择单词 -->
    <el-dialog title="选择单词" :visible.sync="dialogVisible" append-to-body width="60%">
      <!-- 搜索框 -->
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="单词拼写：">
              <el-input :size="size" v-model="form.search" placeholder="单词拼写"></el-input>
            </el-form-item>
            <el-form-item label="出现频率	:">
              <el-select :size="size" style="width:100%;" v-model="form.frequency" placeholder="请选择">
                <el-option v-for="(item,index) in frequencyList" :key="index" :label="item.name" :value="item.val">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属项目：">
              <el-select disabled style="width:100px" :size="size" v-model="query.c1" placeholder="请选择"
                @change="changeSelect1($event)">
                <el-option v-for="(item,index) in select" :key="index" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属课程：">
              <el-select disabled style="width:100px" :size="size" v-model="query.c2" placeholder="请选择"
                @change="changeSelect2($event)">
                <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.code">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label=" 所属类型：">
              <el-select disabled style="width:100px" :size="size" v-model="query.c3" placeholder="请选择">
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
      <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy @selection-change="selectionChange">
        <el-table-column type="selection" width="40"> </el-table-column>
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
        <el-table-column label="词根">
          <template slot-scope="scope">
            <span>{{ scope.row.wordRoot }}</span>
          </template>
        </el-table-column>

        <!-- 出现频率 -->
        <el-table-column label="出现频率">
          <template slot-scope="scope">
            <span>{{ scope.row.frequency }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
        @pagination="onLoad" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUserClick">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { getWordList, getCategoryList } from '@/api/word'
import { listSave, getListDetail, autoWord } from '@/api/list'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getRuleRequired } from '@/utils/validator'
const defaultForm = {

};
export default {
  // name: ,
  components: {
    Pagination
  },
  watch: {

  },
  filters: {

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
  props: {
    typeDrawer: {
      default: 0
    },
    select: {
      default: []
    },
    frequencyList: {
      default: []
    },
    id: {
      default: ''
    }

  },
  data () {
    return {
      size: 'mini',
      fetching: false,
      formQuery: Object.assign({}, defaultForm),
      wordSize: 80,
      select2: [],
      select3: [],
      query: {
        name: "",
        sort: 1,
        c1: "",
        c2: "",
        c3: ""
      },
      list: [],
      rules: {
        name: [getRuleRequired('请输入list名称')],
        sort: [getRuleRequired('请输入排序')],
        c1: [getRuleRequired('请选择所属项目', "change")],
        c2: [getRuleRequired('请选择所属课程', "change")],
        c3: [getRuleRequired('请选择所属类型', "change")]
      },


      dialogVisible: false,
      selectionList: [],
      form: {
        search: "",
        frequency: 0,
      },
      data: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },

    }
  },
  created () {
    this.before()
  },

  methods: {
    //加载详情
    before () {
      console.log('asasasasasas')
      getListDetail(this.id).then((res) => {
        this.query = res.data
        this.list = res.data.wordList
        getCategoryList(this.query.c1).then((res2) => {
          this.select2 = res2.data
          getCategoryList(this.query.c2).then((res3) => {
            this.select3 = res3.data
          })
        })
      })
    },
    //添加list
    handleAdd () {
      this.query.sort = parseInt(this.query.sort)
      let wordList = []
      this.list.forEach((item) => {
        let obj = {
          id: item.id
        }
        wordList.push(obj)
      })
      console.log(wordList)
      this.query.wordList = wordList
      listSave({
        ...this.query,
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
    },



    //删除
    handleDelete (row) {
      this.list.splice(row.$index, 1);
    },
    selectionChange (list) {
      this.selectionList = list;

    },
    addWord () {
      this.dialogVisible = true
      this.selectionList = []
      this.onLoad()
    },
    //查询
    searchChange () {
      this.page.pageNum = 1;
      this.onLoad();
    },
    setUserClick () {
      this.list = [...this.list, ...this.selectionList]
      this.dialogVisible = false
      this.selectionList = []
    },
    //加载列表
    onLoad () {
      getWordList(
        this.page.pageNum,
        this.page.pageSize,
        Object.assign({}, {
          c1: this.query.c1,
          c2: this.query.c2,
          c3: this.query.c3,
        }, this.form)
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
        this.selectionList = []

      });
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
    autoWord () {
      let wordList = []
      this.list.forEach((item) => {
        let obj = {
          id: item.id
        }
        wordList.push(obj)
      })
      autoWord({
        c1: this.query.c1,
        c2: this.query.c2,
        c3: this.query.c3,
        size: this.wordSize,
        wordList: wordList
      }).then((res => {
        console.log(res)
        this.list = this.list.concat(res.data || [])
      }))
    }
  }

}
</script>

<style lang="scss" scoped>
.createPost-container {
  position: relative;
  z-index: 1000;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 200px;
  padding-left: 20px;
  overflow-y: scroll;
  padding-right: 20px;
  .btnArr {
    text-align: center;
  }
}

.topWrapper {
  padding-top: 20px;
  .btnCls {
    text-align: center;
  }
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dotted blue;
  margin-bottom: 10px;
}
</style>
<style>
/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
.el-drawer__body {
  overflow: auto;
  /* overflow-x: auto; */
}

/*2.隐藏滚动条，太丑了*/
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>
