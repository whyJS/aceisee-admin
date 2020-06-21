<template>
  <!-- <div class="app-container"> -->
  <basic-container>
    <!-- 新增 删除 -->
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="handleAdd" :size="size" icon="el-icon-add">添加单词</el-button>
        <el-button type="primary" @click="handleUpload" :size="size" icon="el-icon-add">导入单词</el-button>
        <!-- <el-button type="primary" :size="size" icon="el-icon-edit">编辑单词</el-button> -->
        <!-- <el-button type="danger" :size="size" icon="el-icon-delete">删除</el-button> -->
      </el-col>
    </el-row>
    <!-- 搜索框 -->
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="单词拼写：">
            <el-input :size="size" v-model="query.search" placeholder="单词拼写"></el-input>
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

          <el-form-item label="出现频率：">
            <el-select style="width:100px" :size="size" v-model="query.frequency" placeholder="请选择">
              <el-option v-for="(item,index) in frequencyList" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发音：">
            <el-select style="width:100px" :size="size" v-model="query.fileUpload" placeholder="请选择">
              <el-option v-for="(item,index) in fileUploadList" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="size" @click="searchChange">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :size="size" @click="searchReset">重置</el-button>
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
      <!-- <el-table-column type="index" label="#" width="40">

      </el-table-column> -->

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
      <!-- 所属项目 -->
      <el-table-column label="所属项目">
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <!-- 发音 -->
      <el-table-column label="发音">
        <template slot-scope="scope">
          <span>{{ scope.row.fileUrl }}</span>
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
      direction="rtl" @close="closedrawer" :append-to-body="appendToBody" size="80%">
      <word-add @closeView="closeView" :kind="kind" :tree="tree" :select="select1" :typeDrawer="type"
        :frequencyList="frequencyList" :fileUploadList="fileUploadList"></word-add>
    </el-drawer>

    <!-- 编辑 -->
    <el-drawer ref="detailDrawer2" :title="isEditTitle2" :visible.sync="editdrawer" :destroy-on-close="destroyOnClose"
      direction="rtl" @close="closedrawer" :append-to-body="appendToBody" size="80%">
      <word-edit @closeView="closeView" :kind="kind" :tree="tree" :select="select1" :typeDrawer="type"
        :frequencyList="frequencyList" :fileUploadList="fileUploadList" :wordId="wordId"></word-edit>
    </el-drawer>

    <!-- 选择分类 -->
    <el-dialog title="导入单词" :destroy-on-close="destroyOnClose" :visible.sync="uploadShow" append-to-body width="60%">
      <el-row style="margin-top:20px;padding-bottom:40px;">
        <el-col :span="24">
          <el-form :inline="true" :model="query" class="demo-form-inline">
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

            <el-upload class="upload-demo" :on-success="uploadSuccess" ref="upload" :limit="1" :data="uploadData"
              :action="url" :headers="headers" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

            </el-upload>

          </el-form>
        </el-col>
      </el-row>

    </el-dialog>

  </basic-container>
  <!-- </div> -->
</template>

<script>
import { getToken } from '@/utils/auth'
import { getWordList, getCategoryList, wordDele, getKindList } from '@/api/word'
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
      kind: [],
      tree: [],
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
      fileUploadList: [
        {
          name: '默认',
          val: '0'
        },
        {
          name: '上传',
          val: '1'
        },
        {
          name: '未上传',
          val: '2'
        },
      ],//是否上传

      //参数
      query: {
        search: "",
        c1: "",
        c2: "",
        c3: "",
        fileUpload: '0',
        frequency: 0
      },
      data: [], //列表
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      selectionList: [],

      // 添加
      adddrawer: false,
      appendToBody: true,
      destroyOnClose: true,
      isEditTitle: '添加单词',
      type: 0,

      editdrawer: false,
      wordId: '',
      isEditTitle2: "编辑单词",


      //单词导入
      uploadShow: false,
      url: '/api/word/import',
      headers: {},
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
    uploadData () {
      return {
        categoryJson: [
          {
            c1: this.query.c1,
            c2: this.query.c2,
            c3: this.query.c3
          }
        ]

      }
    }
  },
  created () {
    this.headers = {
      "aceisee-pfuser-ticket": getToken()
    }
    this.onLoad()
    this._getCategoryList("")
    getKindList().then((res) => {
      this.kind = res.data
    })

  },
  methods: {
    //加载列表
    onLoad () {
      getWordList(
        this.page.pageNum,
        this.page.pageSize,
        Object.assign({}, this.query)
      ).then(res => {
        const data = res.data;
        this.page.total = data.totalNum;
        this.data = data.content;
        this.selectionClear()
      });
    },
    //查询
    searchChange () {
      this.page.pageNum = 1;
      this.onLoad();
    },
    //重置
    searchReset () {
      this.query = {
        search: "",
        c1: "",
        c2: "",
        c3: "",
        fileUpload: '0',
        frequency: 0
      }
      this.onLoad();
    },

    selectionChange (list) {
      this.selectionList = list;
    },
    selectionClear () {
      this.selectionList = [];
      // this.$refs.crud.toggleSelection();
    },
    //删除
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
      console.log('添加')
      this.adddrawer = true;
    },
    // 关闭弹框
    closeView () {
      this.$refs.detailDrawer.closeDrawer();
      this.adddrawer = false;
    },
    handleUpload () {
      this.uploadShow = true
    },
    submitUpload () {
      this.$refs.upload.submit();
    },

    uploadSuccess (res) {

      if (res.result != 200) {
        this.$message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          message: "上传成功！！！",
          type: 'success',
          duration: 5 * 1000
        })
      }
    },



    //编辑单词
    handleUpdata (item) {
      console.log(item)
      console.log('添加')
      this.editdrawer = true;
      this.wordId = item.id
    },
    // 关闭弹框
    closeView2 () {
      this.$refs.detailDrawer2.closeDrawer();
      this.editdrawer = false;
    },

    closedrawer () {
      this.onLoad()
    }




  },
}
</script>
