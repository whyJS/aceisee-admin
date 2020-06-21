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
              <el-input readonly :size="size" v-model="formQuery.wordRoot.name" placeholder="请选择词根"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick2">选择</el-button>
            </el-col>

          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="发音:">
            <el-upload :on-success="uploadSuccess" :limit="1" class="upload-demo" :action="url" :headers="headers">
              <el-button size="small" type="primary">点击上传</el-button>
              <div v-if="formQuery.fileUrl">音频链接：{{formQuery.fileUrl}}</div>
            </el-upload>

          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>

      <el-row>
        <el-col :span="16">
          <el-form-item label="所属项目：">
            <!-- <div v-for="(c1,i1) in treeName" :key="i1">
              <ul v-if="c1.isShow">
                <li>{{c1.name}}</li>
                <ul v-if="c1.children">
                  <div v-for="(c2,i2) in c1.children" :key="i2">
                    <li v-if="c2.isShow">
                      {{c2.name}}
                      <ul v-if="c2.children">
                        <span v-for="(c3,i3) in c2.children" :key="i3">
                          <li style="display:inline-block;" v-if="c3.isShow">
                            {{c3.name}}；&nbsp;&nbsp;
                          </li>
                        </span>

                      </ul>
                    </li>
                  </div>
                </ul>
              </ul>
            </div> -->
            <div v-for="(c,i) in formQuery.categoryInfo" :key="i">
              {{c.c1Name}}&nbsp;&nbsp;-->&nbsp;&nbsp;{{c.c2Name}}&nbsp;&nbsp;-->&nbsp;&nbsp;{{c.c3name}}
            </div>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="dialogVisible3 = true">选择分类</el-button>
        </el-col>
      </el-row>

      <div class="line"></div>
      <el-row>
        <el-form-item label="词性:">
          <el-col :span="24">
            <el-checkbox-group v-model="kindList" size="small">
              <el-checkbox-button v-for="val in kind" :key="val.id" :label="val.id">{{val.name}}
              </el-checkbox-button>
            </el-checkbox-group>

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
            <el-col :span="14">
              <el-input :size="size" readonly v-model="similarName" placeholder="请选择反义词"></el-input>
            </el-col>
            <el-col :span="10">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(0)">选择</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(0,'clear')">重选</el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item label="近义词	">
            <el-col :span="14">
              <el-input :size="size" readonly v-model="antonymName" placeholder="请选择近义词"></el-input>
            </el-col>
            <el-col :span="10">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(1)">选择</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="woderClick(1,'clear')">重选</el-button>
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
          <el-button type="primary" @click="onSubWord()">添加单词</el-button>
          <!-- <el-button icon="el-icon-delete">取消</el-button> -->
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

    <!-- 选择分类 -->
    <el-dialog title="选择分类" :visible.sync="dialogVisible3" append-to-body width="60%">
      <basic-container v-for="(c1,i1) in treeList" :key="i1">
        <!-- {{c1}} -->
        <el-checkbox @change="treeChange1(i1)" v-model="treeList[i1].isShow" :label="c1.code">
          <h2>{{c1.name}}</h2>
        </el-checkbox>
        <div v-if="c1.children">
          <el-row v-for="(c2,i2) in c1.children" :key="i2">
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="23">
              <el-checkbox @change="treeChange2(i1,i2)" v-model="treeList[i1].children[i2].isShow" :label="c2.code">
                <h4>{{c2.name}}</h4>
              </el-checkbox>
              <el-row v-if="c2.children">
                <el-col :span="1">&nbsp; </el-col>
                <el-col :span="23">
                  <el-checkbox @change="treeChange3(i1,i2,i3)" v-model="treeList[i1].children[i2].children[i3].isShow"
                    v-for="(c3,i3) in c1.children" :key="i3" :label="c3.code">
                    {{c3.name}}
                  </el-checkbox>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>

      </basic-container>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="cSub()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getWordList, getRootList, getCategoryTree, wordSave } from '@/api/word'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const defaultForm = {
  enDesc: "",//英文
  example: "",//例句
  fileUrl: "",//发音地址
  frequency: 0,//出现频率
  name: "",//拼写
  phonetic: "",//音标
  zhDesc: "",//中文
  wordRoot: {
    id: null
  },
  categoryInfo: [],//分类
  similarIdList: [],
  antonymIdList: [],
};
export default {
  // name: ,
  components: {
    Pagination
  },
  watch: {
    // treeList: {
    //   handler (newTree) {


    //   },
    //   deep: true,
    //   immediate: true

    // }
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
    similarName () {
      let ids = [];
      let names = []
      this.similarList.forEach(ele => {
        ids.push({
          id: ele.id
        });
        names.push(ele.name)
      });
      this.formQuery.similarIdList = ids
      return names.join(",");
    },
    antonymName () {
      let ids = [];
      let names = []
      this.antonymList.forEach(ele => {
        ids.push({
          id: ele.id
        });
        names.push(ele.name)
      });
      this.formQuery.antonymIdList = ids
      return names.join(",");

    }
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

    kind: {
      default: []
    },
    tree: {
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


      // 选择近义词 反义词
      similarList: [],
      antonymList: [],
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
      // wordRootName: '',
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

      //选择词性
      kindList: [],


      // 单词分类
      dialogVisible3: false,
      treeList: [],
      treeName: [],
      categoryList: []
    }
  },
  created () {
    // this.before()
    this.headers = {
      "aceisee-pfuser-ticket": getToken()
    }

    getCategoryTree().then((res) => {
      this.treeList = this.filterTrees(res.data)
      // console.log(this.tree)
    })
  },

  // watch: {

  // },
  methods: {
    //关闭弹框
    closeView () {
      this.$emit("closeView")
    },
    //加载详情
    before () {

    },

    //选择近义词，反义词

    woderClick (i, j) {
      this.dialogVisible = true
      this.similarType = i
      if (i == 0) {
        if (j == "clear") {
          this.similarList = []

        }
      } else {
        if (j == "clear") {

          this.antonymList = []
        }
      }
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
      // console.log(row)
    },
    setUserClick () {

      if (this.selectionItem.id) {

        let obj = Object.assign({}, this.selectionItem)
        if (this.similarType == 0) {
          this.similarList.push(obj)

        } else {
          this.antonymList.push(obj)
        }
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
        this.formQuery.wordRoot = this.selectionItem2
        this.dialogVisible2 = false
      } else {
        this.$message({
          type: "success",
          message: "请选择词根"
        });
      }

    },


    //选择分类确定
    cSub () {
      this.treeName = this.treeList
      let arr = this.havaTreeList(this.treeList);
      if (arr.length > 0) {
        this.formQuery.categoryInfo = arr
        this.dialogVisible3 = false
      } else {
        this.$message({
          message: '请选择，正确分类，三级分类不能为空！！！！',
          type: 'success'
        });
      }

    },
    //处理树状结构
    filterTrees (data) {
      const res = []

      data.forEach(item => {
        let obj = Object.assign({}, item)
        obj.isShow = false
        if (item.children) {
          obj.children = this.filterTrees(obj.children)
        }

        res.push(obj)
      })

      return res
    },
    treeChange1 (i1) {
      if (!this.treeList[i1].isShow) {
        if (this.treeList[i1].children) {
          this.treeList[i1].children.forEach((item, index) => {
            this.treeList[i1].children[index].isShow = false
            if (this.treeList[i1].children[index].children) {
              this.treeList[i1].children[index].children.forEach((item2, index2) => {
                this.treeList[i1].children[index].children[index2].isShow = false
              })
            }
          })
        }

      }
    },
    treeChange2 (i1, i2) {

      if (this.treeList[i1].children[i2].isShow) {
        this.treeList[i1].isShow = true
      } else {
        if (this.treeList[i1].children[i2].children) {
          for (let i = 0; i < this.treeList[i1].children.length; i++) {
            this.treeList[i1].children[i2].children[i].isShow = false
          }
        }
      }

    },
    treeChange3 (i1, i2, i3) {
      if (this.treeList[i1].children[i2].children[i3].isShow) {
        this.treeList[i1].isShow = true
        this.treeList[i1].children[i2].isShow = true
      }
    },
    //获取分类数据方法
    havaTreeList (newTree) {
      let arr = []
      newTree.forEach(item => {
        if (item.isShow) {
          if (item.children) {
            item.children.forEach(item2 => {
              if (item2.isShow) {
                if (item2.children) {
                  item2.children.forEach(item3 => {
                    if (item3.isShow) {
                      arr.push({
                        c1: item.code,
                        c2: item2.code,
                        c3: item3.code,
                        c1Name: item.name,
                        c2Name: item2.name,
                        c3name: item3.name,
                      })
                    } else {
                      arr.push({
                        c1: item.code,
                        c2: item2.code,
                        c3: "",
                        c1Name: item.name,
                        c2Name: item2.name,
                        c3name: "",
                      })
                    }
                  })
                } else {
                  arr.push({
                    c1: item.code,
                    c2: item2.code,
                    c3: "",
                    c1Name: item.name,
                    c2Name: item2.name,
                    c3name: "",
                  })
                }
              } else {
                arr.push({
                  c1: item.code,
                  c2: "",
                  c3: "",
                  c1Name: item.name,
                  c2Name: "",
                  c3name: "",
                })
              }
            })
          } else {
            arr.push({
              c1: item.code,
              c2: "",
              c3: "",
              c1Name: item.name,
              c2Name: "",
              c3name: "",
            })
          }
        }
      })
      let newarr = []
      arr.forEach((item) => {
        if (item.c3) {
          newarr.push(item)
        }
      })
      return newarr
    },




    onSubWord () {
      let arr = []
      this.kindList.forEach((item) => {
        arr.push({
          id: item
        })
      })

      let query = Object.assign({}, this.formQuery, { wordKindList: arr })
      console.log('asasasasas')
      wordSave(query).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
      console.log(query)
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

        this.formQuery.fileUrl = res.data.url
      }
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
