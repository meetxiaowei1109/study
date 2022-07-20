<template>
  <el-form :model="fieldForm" ref="fieldForm">
    <el-form-item
      v-for="(item, index) in fieldForm.fieldEnums"
      :key="item.key"
      :label="'域名' + index"
      :prop="'fieldEnums.' + index + '.value'"
      :rules="{
        required: true,
        message: '域名不能为空',
        trigger: 'blur'
      }"
    >
      <el-input v-model="item.value" />
    </el-form-item>
  </el-form>
</template>
