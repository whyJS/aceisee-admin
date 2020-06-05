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
          </el-row>

        </el-card>
        <el-row>
          <el-col :span="24">
            <div class="__btn">
              <el-button type="primary"
                         icon="el-icon-edit">确定修改</el-button>

            </div>
          </el-col>

        </el-row>

      </div>
    </el-form>

  </div>
</template>

<script>

const defaultForm = {

  parentId: '', // 上级菜单

  roleName: '',//角色名称
  // tenantId: '',//租户id
  roleCode: '',//角色别名
}

import { getRuleRequired } from '@/util/validator'
export default {
  // name: ,
  components: {

  },
  props: {

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


    }
  },
  created () {

  },

  watch: {

  },
  methods: {
    before () {
      this.postForm = this.content || {};
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
