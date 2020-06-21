<template>
  <basic-container>
    <el-row style="margin-top:20px;">
      <el-col :span="24">
        <el-form ref="postForm" :model="query" :rules="rules" label-width="80px">
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="query.name" placeholder="用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="pwd">
            <el-input type="password" v-model="query.pwd" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </basic-container>
</template>

<script>
import { add } from '@/api/study'
import { getRuleRequired } from '@/utils/validator'

export default {
  name: 'ComplexTable',
  filters: {

  },
  data () {
    return {
      size: 'mini',


      query: {//参数
        name: "",
        pwd: ""

      },
      rules: {
        name: [getRuleRequired('请输入用户名')],
        pwd: [getRuleRequired('请输入密码')],

      },

    }
  },
  computed: {

  },
  created () {
    // this.getList()
  },
  methods: {
    add () {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          add(
            this.query
          ).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.query = {
              name: "",
              pwd: ""
            }
          });
        } else {
          return false;
        }
      });

    },


  },
}
</script>
