<template>
  <div v-loading="fetching"
       class="createPost-container">
    <el-form ref="postForm"
             :model="postForm"
             :rules="rules"
             :inline-message="false"
             label-width="120px"
             class="form-container">

      <div class="createPost-main-container">
        <el-card shadow="never">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称:"
                            prop="roleName">
                <el-input v-model.trim="postForm.roleName"
                          :size="eleSize"
                          maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="角色别名:"
                            prop="roleCode">
                <el-input v-model.trim="postForm.roleCode"
                          :size="eleSize"
                          maxlength="50" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-form-item label="上级角色:">
                <select-tree v-model="postForm.parentId"
                             :size="eleSize"
                             :options="treeList"
                             @selected="selectedTree"
                             :props="defaultProps" />
              </el-form-item>
            </el-col> -->
            <!-- <el-col :span="24">
              <el-form-item label="角色排序:"
                            prop="name">
                <el-input v-model.trim="postForm.name"
                          :size="eleSize"
                          maxlength="50" />
              </el-form-item>
            </el-col> -->
          </el-row>

        </el-card>
        <el-row>
          <el-col :span="24">
            <div class="__btn">
              <el-button v-if="isEdit == 0"
                         type="primary"
                         icon="el-icon-edit"
                         :loading="addLoading"
                         @click="rowSave">保存</el-button>
              <el-button v-if="isEdit == 1"
                         type="primary"
                         icon="el-icon-edit"
                         :loading="addLoading"
                         @click="rowUpdate">确定</el-button>
              <!-- <el-button icon="el-icon-delete">取消</el-button> -->
            </div>
          </el-col>

        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>
import selectTree from '@/components/selectTree/index.vue';
import selectIcon from '@/components/selectIcon/index.vue';
const defaultForm = {

  parentId: '', // 上级菜单

  roleName: '',//角色名称
  // tenantId: '',//租户id
  roleCode: '',//角色别名
}
// import { update, add, getMenu } from "@/api/system/menu";
import { add, update, } from "@/api/system/role";
import { getRuleRequired } from '@/util/validator'
export default {
  // name: ,
  components: {
    'select-tree': selectTree,
    'select-icon': selectIcon
  },
  props: {
    isEdit: {
      type: Number,
      default: 0
    },
    treeList: {
      type: Array,
      default: null
    },
    content: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      postForm: Object.assign({}, defaultForm),
      eleSize: 'small',
      fetching: false,
      rules: {
        roleName: [getRuleRequired('请输入角色名称')],
        roleCode: [getRuleRequired('请输入角色别名')],

      },
      // 数据默认字段
      defaultProps: {
        parent: 'parentId',   // 父级唯一标识
        value: 'id',          // 唯一标识
        label: 'title',       // 标签显示
        children: 'children', // 子级
      },

      addLoading: false,
      updataLoading: false

    }
  },
  created () {
    if (this.isEdit == 1 || this.isEdit == 2) {
      this.before()
    }
  },

  watch: {
    // form: {
    //   handler (form) {
    //     if (this.isShowSelect) {
    //       this.$refs.selectTree.filter(form.input1);
    //     }
    //   },
    //   deep: true,//深度监听，重要
    // },
  },
  methods: {
    before () {
      this.postForm = this.content || {};
    },
    // selectedTree (val, label) {
    //   console.log(val)
    //   // this.postForm.$parentId = label
    // },

    rowSave () {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.addLoading = true
          add(this.postForm).then(() => {
            // this.onLoad(this.page);
            this.$emit("closeEdit")
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.addLoading = false
          }).catch(() => {
            this.addLoading = false
          });
        } else {
          return false;
        }
      });

    },
    rowUpdate () {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.addLoading = true
          update(this.postForm).then(() => {
            this.$emit("closeEdit")
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.addLoading = false
          }).catch(() => {
            this.addLoading = false
          });

        } else {
          return false;
        }
      });

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
  .__btn {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }

  /*下拉框选择树*/
  .objectTree {
    margin-left: 97px;
    position: absolute;
    overflow: auto;
    z-index: 100;
    height: 200px;
    border: 1px solid #ddd;
    line-height: normal;
    z-index: 204;
  }
  .width-220 {
    width: 220px;
  }
}
</style>
