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
              <el-input readonly :size="size" v-model="formQuery.phonetic" placeholder="请输入词根"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="dialogVisible2 = true">选择</el-button>
            </el-col>

          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="发音:">
            <el-col :span="16">
              <el-input readonly :size="size" v-model="formQuery.phonetic" placeholder="请输入发音"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size">选择</el-button>
            </el-col>

          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属项目：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c1" placeholder="请选择"
              @change="changeSelect1($event)">
              <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所属课程：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c2" placeholder="请选择"
              @change="changeSelect2($event)">
              <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 所属类型：">
            <el-select style="width:100%" :size="size" v-model="formQuery.categoryList.c3" placeholder="请选择"
              @change="changeSelect3($event)">
              <el-option v-for="(item,index) in select3" :key="index" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <div class="line"></div>
      <el-row>
        <el-form-item label="词根:">
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
              <el-input :size="size" v-model="formQuery.antonymId" placeholder="请选择反义词"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="dialogVisible = true">选择</el-button>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">

          <el-form-item label="近义词	">
            <el-col :span="16">
              <el-input :size="size" v-model="formQuery.similarId" placeholder="请选择近义词"></el-input>
            </el-col>
            <el-col :span="8">
              &nbsp;&nbsp;&nbsp;&nbsp;<el-button :size="size" @click="dialogVisible = true">选择</el-button>
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
              <el-input :size="size" v-model="query.a1" placeholder="单词拼写"></el-input>
            </el-form-item>
            <el-form-item label="所属项目：">
              <el-select style="width:100px" :size="size" v-model="query.a2" placeholder="请选择"
                @change="changeSelect1($event)">
                <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出现频率	:">
              <el-select :size="size" style="width:100%;" v-model="query.a3" placeholder="请选择">
                <el-option v-for="item in frequencyList" :key="item.value" :label="item.label" :value="item.value">
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
        <el-table-column label="拼写">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

        <!-- 音标 -->
        <el-table-column label="音标">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

        <!-- 词根 -->
        <el-table-column label="词根">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

        <!-- 出现频率 -->
        <el-table-column label="出现频率">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <!-- 所属项目 -->
        <el-table-column label="所属项目">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <!-- 发音 -->
        <el-table-column label="发音">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize"
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
              <el-input :size="size" v-model="query2.a1" placeholder="单词拼写"></el-input>
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
        <el-table-column label="拼写">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <!-- 英文解释 -->
        <el-table-column label="拼写">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>
        <!-- 中文解释 -->
        <el-table-column label="拼写">
          <template slot-scope="scope">
            <span>{{ scope.row }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="page.total > 0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize"
        @pagination="onLoad" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import { getDetailList, setUser, setClearing } from "@/api/account";
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const defaultForm = {
  "name": "",//单词
  "phonetic": "",//音标
  "frequency": 0,
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
      size: 'mini',
      fetching: false,
      formQuery: Object.assign({}, defaultForm),


      // 选择近义词 反义词
      query: {
        a1: '',
        a2: '',
        a3: ''
      },
      data: [1, 2, 3, 4, 5],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 100
      },
      appendToBody: true,
      dialogVisible: false,
      selectionList: [],

      // 选择词根
      query2: {
        a1: '',
        a2: '',
        a3: ''
      },
      data2: [1, 2, 3, 4, 5],
      page2: {
        pageSize: 10,
        currentPage: 1,
        total: 100
      },
      appendToBody2: true,
      dialogVisible2: false,
      selectionList2: [],


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
    }
  },
  created () {
    // this.before()
  },

  watch: {

  },
  methods: {
    before () {
      this.fetching = true;
      // getDetailList(this.batchNo).then(res => {
      //   this.data = res.data.data;
      //   this.fetching = false;
      // });
    },
    closeView () {
      this.$emit("closeView")
    },

    onLoad () {
      // this.loading = true;
      // console.log(this.page);
      // getList(
      //   this.page.currentPage,
      //   this.page.pageSize,
      //   Object.assign({}, this.query)
      // ).then(res => {
      //   const data = res.data.data;
      //   this.page.total = data.total;
      //   this.data = data.records;
      //   this.loading = false;
      //   this.selectionClear();
      // });
    },

    selectionChange (list) {
      this.selectionList = list;
    },
    setUserClick () {

    },


    // 三级联动选择框
    changeSelect1 (val) {
      console.log(val)
      this.formQuery.categoryList.c1 = val
      this.formQuery.categoryList.c2 = ''
      this.formQuery.categoryList.c3 = ''
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
      this.formQuery.categoryList.c2 = val
      this.formQuery.categoryList.c3 = ''
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
      this.formQuery.categoryList.c3 = val
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
