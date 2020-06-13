<template>
  <div v-loading="fetching" class="createPost-container">
    <el-form :model="formQuery" label-width="100px" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item label="拼写:">
            <el-input :size="size" v-model="formQuery.name" placeholder="请输入单词"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="音标:">
            <el-input :size="size" v-model="formQuery.phonetic" placeholder="请输入音标"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="出现频率	:">
            <el-select :size="size" style="width:100%;" v-model="formQuery.frequency" placeholder="请选择">
              <el-option v-for="(item,index) in frequencyList" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="词根:">
            <el-col :span="16">
              <el-input readonly :size="size" v-model="formQuery.wordRoot" placeholder="请选择词根"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick2">选择</el-button>
            </el-col>

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="发音:">
            <!-- <el-col :span="16">
              <el-input readonly :size="size" v-model="formQuery.fileUrl" placeholder="请选择发音"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size">选择</el-button>
            </el-col> -->

            <el-upload class="upload-demo" :action="url" :headers="headers">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属课程：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c2" placeholder="请选择"
              @change="changeSelect2($event)">
              <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 所属类型：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c3" placeholder="请选择">
              <el-option v-for="(item,index) in select3" :key="index" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-row>
        <el-form-item label="词性:">
          <el-col :span="24">
            <el-radio-group v-model="formQuery.wordRoot" size="mini">
              <el-radio-button label="上海"></el-radio-button>
              <el-radio-button label="北京"></el-radio-button>
              <el-radio-button label="广州"></el-radio-button>
              <el-radio-button label="深圳"></el-radio-button>
            </el-radio-group>
            &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" type="primary">添加</el-button>
          </el-col>
        </el-form-item>
      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="中文释义">
            <el-input type="textarea" v-model="formQuery.zhDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文释义	">
            <el-input type="textarea" v-model="formQuery.enDesc"></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="反义词">
            <el-col :span="16">
              <el-input :size="size" readonly v-model="similarObj.name" placeholder="请选择反义词"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(0)">选择</el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item label="近义词	">
            <el-col :span="16">
              <el-input :size="size" readonly v-model="antonymObj.name" placeholder="请选择近义词"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(1)">选择</el-button>
            </el-col>
          </el-form-item>
        </el-col>

      </el-row>

      <div class="line"></div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="例句">
            <el-input type="textarea" v-model="formQuery.example"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-row class="topWrapper">
        <el-col :span="24" class="btnCls">
          <el-button type="primary">添加单词</el-button>
          <el-button icon="el-icon-delete">取消</el-button>
        </el-col>
      </el-row>

    </el-form>

    <!-- 选择单词 -->
    <el-dialog title="选择单词" :visible.sync="dialogVisible" append-to-body width="60%">
      <!-- 搜索框 -->
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :inline="true" :model="query" class="demo-form-inline">
            <el-form-item label="单词拼写：">
              <el-input :size="size" v-model="query.search" placeholder="单词拼写"></el-input>
            </el-form-item>
            <el-form-item label="所属项目：">
              <el-select style="width:100px" :size="size" v-model="query.c1" placeholder="请选择">
                <el-option v-for="(item,index) in select" :key="index" :label="item.name" :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出现频率	:">
              <el-select :size="size" style="width:100%;" v-model="query.frequency" placeholder="请选择">
                <el-option v-for="(item,index) in frequencyList" :key="index" :label="item.name" :value="item.val">
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
      <el-table :data="data" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>

        <el-table-column label="选择" width="55">
          <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp</el-radio>
          </template>
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

      </el-table>
      <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.pageNum" :limit.sync="page.pageSize"
        @pagination="onLoad" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setUserClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 选择词根 -->
    <el-dialog title="选择词根" :visible.sync="dialogVisible2" append-to-body width="60%">
      <!-- 搜索框 -->
      <el-row style="margin-top:20px;">
        <el-col :span="24">
          <el-form :inline="true" :model="query2" class="demo-form-inline">
            <el-form-item label="单词拼写：">
              <el-input :size="size" v-model="query2.search" placeholder="单词拼写"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :size="size" @click="searchChange2">查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" :size="size">重置</el-button>
            </el-form-item> -->

          </el-form>
        </el-col>
      </el-row>
      <el-table :data="data2" ref="crud" :header-cell-style="{
            color: '#333',
            fontWeight: 700,
            background: '#f5f5f5'
          }" row-key="id" border lazy>
        <el-table-column label="选择" width="55">
          <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow2(scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>

        <!-- 拼写 -->
        <el-table-column label="拼写">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <!-- 英文解释 -->
        <el-table-column label="英文解释">
          <template slot-scope="scope">
            <span>{{ scope.row.zhDesc }}</span>
          </template>
        </el-table-column>

        <!-- 中文解释 -->
        <el-table-column label="英文解释">
          <template slot-scope="scope">
            <span>{{ scope.row.enDesc }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="page2.total > 0" :total="page2.total" :page2.sync="page.pageNum" :limit.sync="page2.pageSize"
        @pagination="onLoad2" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="setUserClick2">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getWordList, getCategoryList, getRootList } from '@/api/word'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const defaultForm = {
  "name": "",//单词
  "phonetic": "",//音标
  "frequency": "0",
  "wordRoot": "",
  "zhDesc": "",
  "enDesc": "",
  "example": "",
  "similarId": 1,
  "antonymId": "",
  "fileUrl": "",
  "categoryList": {
    "c1": "",
    "c2": "",
    "c3": ""
  },
  "id": 1,
  "kindList": [
    {
      "kindId": 1
    }
  ]
};
export default {
  // name: ,
  components: {
    Pagination
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
    fileUploadList: {
      default: []
    },

  },
  data () {
    return {
      url: '/api/upload/file',
      headers: {},
      size: 'mini',
      fetching: false,
      formQuery: Object.assign({}, defaultForm),
      //类别下拉选
      select2: [],
      select3: [],


      // 选择近义词 反义词
      similarObj: {//近义词
        id: '',
        name: ''
      },
      antonymObj: {//反义词
        id: '',
        name: ''
      },
      similarType: 0,
      radio: "",
      query: {
        search: "",
        c1: "",
        frequency: "0"
      },
      data: [],
      page: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      appendToBody: true,
      dialogVisible: false,
      selectionItem: null,
      selectionList: [],

      // 选择词根
      query2: {
        search: "",
      },
      data2: [],
      page2: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      appendToBody2: true,
      dialogVisible2: false,
      selectionItem2: null,
      selectionList2: [],



    }
  },
  created () {
    // this.before()
    this.headers = {
      "aceisee-pfuser-ticket": getToken()
    }
  },

  watch: {

  },
  methods: {
    //关闭弹框
    closeView () {
      this.$emit("closeView")
    },
    //加载详情
    before () {

    },

    //选择近义词，反义词

    woderClick (i) {
      this.dialogVisible = true
      this.similarType = i
      this.onLoad()
    },
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
    selectionClear () {
      this.selectionList = [];
      this.selectionItem = null
      this.radio = ""
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
        frequency: "0"
      }
      this.onLoad();
    },
    getCurrentRow (row) { //获取选中数据
      this.selectionItem = row;
      console.log(row)
    },
    setUserClick () {

      if (this.selectionItem.id) {

        let { id, name } = this.selectionItem
        if (this.similarType == 0) {
          this.similarObj = {//近义词
            id,
            name
          }

        } else {
          this.antonymObj = {//近义词
            id,
            name
          }
        }
        console.log(this.similarObj)
        this.dialogVisible = false
      } else {
        this.$message({
          type: "success",
          message: "请选择单词"
        });
      }

    },


    //选择词根
    woderClick2 () {
      this.dialogVisible2 = true
      this.selectionItem2 = null
      this.onLoad2()
    },
    onLoad2 () {
      getRootList(
        this.page2.pageNum,
        this.page2.pageSize,
        Object.assign({}, this.query2)
      ).then(res => {
        const data = res.data;
        this.page2.total = data.totalNum;
        this.data2 = data.content;
        this.selectionClear2()
      });
    },
    selectionClear2 () {

      this.selectionItem2 = null

    },
    //查询
    searchChange2 () {
      this.page2.pageNum = 1;
      this.onLoad2();
    },
    getCurrentRow2 (row) { //获取选中数据
      this.selectionItem2 = row;
      console.log(row)
    },
    setUserClick2 () {

      if (this.selectionItem2.id) {

        let { name } = this.selectionItem2
        console.log(name)

        this.formQuery.wordRoot = name
        console.log(this.formQuery)
        this.dialogVisible2 = false
      } else {
        this.$message({
          type: "success",
          message: "请选择词根"
        });
      }

    },


    // 类别选择框选择框
    changeSelect1 (val) {
      this.formQuery.categoryList.c1 = val
      this.formQuery.categoryList.c2 = ''
      this.formQuery.categoryList.c3 = ''
      this.select2 = []
      this.select3 = []
      getCategoryList(val).then((res) => {
        this.select2 = res.data
      })
    },
    changeSelect2 (val) {
      this.formQuery.categoryList.c2 = val
      this.formQuery.categoryList.c3 = ''
      this.select3 = []
      getCategoryList(val).then((res) => {
        this.select3 = res.data
      })
    },


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
