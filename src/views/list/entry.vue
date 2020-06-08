<template>
  <div class="">
    <basic-container>
      <el-row style="margin-top:20px;">

        <el-form :model="query" label-width="120px" class="demo-form-inline">
          <el-col :span="24">
            <h1 style="width:100%;text-align:center;">分配单词</h1>
            <el-col :span="8">
              <el-form-item label="所属项目：">
                <el-select style="width:100%" :size="size" v-model="query.type1" placeholder="请选择"
                  @change="changeSelect1($event)">
                  <el-option v-for="(item,index) in select1" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属课程：">
                <el-select style="width:100%" :size="size" v-model="query.type2" placeholder="请选择"
                  @change="changeSelect2($event)">
                  <el-option v-for="(item,index) in select2" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 所属类型：">
                <el-select style="width:100%" :size="size" v-model="query.type3" placeholder="请选择"
                  @change="changeSelect3($event)">
                  <el-option v-for="(item,index) in select3" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分配规则">
                <el-select style="width:100%" :size="size" v-model="query.type4" placeholder="请选择">
                  <el-option v-for="(item,index) in select4" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单词容量：">
                <el-select style="width:100%" :size="size" v-model="query.type5" placeholder="请选择">
                  <el-option v-for="(item,index) in select5" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button style="width:100%" type="primary" :size="size">开始分配</el-button>
              </el-form-item>
            </el-col>

          </el-col>
        </el-form>

      </el-row>

    </basic-container>
    <basic-container>
      <el-row style="margin-top:20px;">

        <el-form :model="query" label-width="120px" class="demo-form-inline">
          <el-col :span="24">
            <h1 style="width:100%;text-align:center;">当前所选类型列表信息</h1>

            <el-col :span="8">
              <el-form-item label="List数量	">
                <el-select style="width:100%" :size="size" v-model="query.type5" placeholder="请选择">
                  <el-option v-for="(item,index) in select5" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="未分配单词数量		">
                <el-select style="width:100%" :size="size" v-model="query.type5" placeholder="请选择">
                  <el-option v-for="(item,index) in select5" :key="index" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button style="width:100%" type="primary" :size="size">重新分配</el-button>
              </el-form-item>
            </el-col>

          </el-col>
        </el-form>

      </el-row>

      <el-row :gutter="20">

        <el-col style="margin-top:20px;" :span="12">
          <table width="100%" class="table" align="center" cellspacing="0" cellpadding="0">
            <caption class="tableheader">学生成绩表
            </caption>

            <tbody style="width：100%">
              <tr align="center">
                <td>小明</td>
                <td>89</td>
                <td>90</td>
                <td>98</td>
              </tr>

              <tr align="center">
                <td>小红</td>
                <td>96</td>
                <td>100</td>
                <td>99</td>
              </tr>

              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
            </tbody>
          </table>

        </el-col>
        <el-col style="margin-top:20px;" :span="12">
          <table width="100%" class="table" align="center" cellspacing="0" cellpadding="0">
            <caption class="tableheader">学生成绩表
            </caption>

            <tbody style="width：100%">
              <tr align="center">
                <td>小明</td>
                <td>89</td>
                <td>90</td>
                <td>98</td>
              </tr>

              <tr align="center">
                <td>小红</td>
                <td>96</td>
                <td>100</td>
                <td>99</td>
              </tr>

              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
            </tbody>
          </table>

        </el-col>
        <el-col style="margin-top:20px;" :span="12">
          <table width="100%" class="table" align="center" cellspacing="0" cellpadding="0">
            <caption class="tableheader">学生成绩表
            </caption>

            <tbody style="width：100%">
              <tr align="center">
                <td>小明</td>
                <td>89</td>
                <td>90</td>
                <td>98</td>
              </tr>

              <tr align="center">
                <td>小红</td>
                <td>96</td>
                <td>100</td>
                <td>99</td>
              </tr>

              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
              <tr align="center">
                <td>小张</td>
                <td>54</td>
                <td>23</td>
                <td>19</td>
              </tr>
            </tbody>
          </table>

        </el-col>

      </el-row>

    </basic-container>
  </div>
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
    padding: 6px;
    box-sizing: border-box;
  }
}
</style>
