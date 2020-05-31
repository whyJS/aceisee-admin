<template>

  <basic-container>

    <div style="margin:0 auto;width:100%;max-width:900px;">
      <div class="box-card">
        选择所属课程后开始导入单词
      </div>
      <div class="wrapper">
        <div class="wrapperHeader">TOFOLE</div>
        <div class="wrapperContent">
          <div class="listWrapper">
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="wrapper">
        <div class="wrapperHeader">TOFOLE</div>
        <div class="wrapperContent">
          <div class="listWrapper">
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="wrapper">
        <div class="wrapperHeader">TOFOLE</div>
        <div class="wrapperContent">
          <div class="listWrapper">
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
            <div class="list">
              <div class="listHeader">听力</div>
              <div class="listContent">
                <span>1</span> <span>1</span> <span>1</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <el-row>
        <el-col :span="24">
          <el-button type="primary" :size="size" icon="el-icon-add">开始添加单词</el-button>
          <el-button type="primary" :size="size" icon="el-icon-edit">导入单词</el-button>
          <el-button type="danger" :size="size" icon="el-icon-delete">取消</el-button>
        </el-col>
      </el-row>
    </div>

  </basic-container>

</template>

<script>
import { getList } from '@/api/word'


export default {
  name: 'ComplexTable',
  components: {},
  filters: {

  },
  data () {
    return {
      size: 'mini',

    }
  },
  computed: {

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


  },
}
</script>
<style lang="scss" scoped>
.box-card {
  width: 100%;
  height: 30px;
  background: #a9a9a9;
  color: #fff;
  font-weight: 700;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
}
.wrapper {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  margin-bottom: 10px;
  font-size: 12px;
  .wrapperHeader {
    width: 100%;
    height: 30px;
    background: #1890ff;
    color: #fff;
    font-weight: 700;
    line-height: 30px;
  }
  .wrapperContent {
    width: 100%;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    // border: 1px solid #a9a9a9;
    padding-bottom: 10px;
    .listWrapper {
      border: 1px solid #a9a9a9;

      margin-top: 10px;
      .list {
        .listHeader {
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          background: #a9a9a9;
          line-height: 20px;
        }
        .listContent {
          width: 100%;
          box-sizing: border-box;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
