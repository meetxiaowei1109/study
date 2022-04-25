<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="时间选择" prop="field104">
        <el-time-picker v-model="formData.field104" format="HH:mm:ss" value-format="HH:mm:ss"
          :picker-options='{"selectableRange":"00:00:00-23:59:59"}' :style="{width: '100%'}"
          placeholder="请选择时间选择" clearable></el-time-picker>
      </el-form-item>
      <el-form-item label="颜色选择" prop="field101" required>
        <el-color-picker v-model="formData.field101" size="medium"></el-color-picker>
      </el-form-item>
      <el-form-item label="密码" prop="field105">
        <el-input v-model="formData.field105" placeholder="请输入密码" clearable show-password
          :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="按钮" prop="field103">
        <el-button type="primary" icon="el-icon-search" size="medium"> 主要按钮 </el-button>
      </el-form-item>
      <el-row gutter="15">
      </el-row>
      <el-row gutter="15">
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field104: '17:15:27',
        field101: '#A44444',
        field105: '',
        field103: undefined,
      },
      rules: {
        field104: [{
          required: true,
          message: '请选择时间选择',
          trigger: 'change'
        }],
        field105: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
