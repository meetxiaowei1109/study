<template>
  <div class="wrap">
    <section class="header">
      <div class="title">
        {{ title }}
      </div>
      <div>
        <el-button
          v-if="(pageType==='2'||pageType==='3')"
          type="primary"
          @click="update"
        >
          {{ pageType==='3'?'保 存':'新 建' }}
        </el-button>
        <el-button
          @click="back"
        >
          返 回
        </el-button>
      </div>
    </section>
    <section class="contain">
      <div class="form">
        <el-form
          ref="form"
          :model="searchform"
          :rules="isFour?formRules:newRules"
          label-width="130px"
          :disabled="!(pageType==='2'||pageType==='3')"
          size="medium"
          :inline="true"
        >
          <el-form-item
            label="使用人"
            prop="driverName"
          >
            <el-input
              v-model="searchform.driverName"
              placeholder="使用人"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="车辆类型"
            prop="vehicleType"
          >
            <el-select
              v-model="searchform.vehicleType"
              placeholder="请选择"
              filterable
              clearable
              :disabled="!(pageType==='2')"
              @change="changeVehicleType"
            >
              <el-option
                v-for="item in options.vehicleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="驾驶证准驾车型"
            prop="driverType"
          >
            <el-select
              v-model="searchform.driverType"
              multiple
              filterable
              clearable
              placeholder="请选择"
              @change="changedriverType"
            >
              <el-option
                v-for="item in options.driverType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="车型名称"
            prop="vehicleId"
          >
            <el-select
              v-model="searchform.vehicleId"
              placeholder="请选择"
              filterable
              clearable
            >
              <el-option
                v-for="item in options.modelName"
                :key="item.vehicleId"
                :label="item.vehicleName"
                :value="item.vehicleId"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="车牌号"
            prop="carNumber"
          >
            <el-input
              v-model="searchform.carNumber"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="行驶证证件号"
            prop="carLicenseNumber"
          >
            <el-input
              v-model.number="searchform.carLicenseNumber"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="行驶证有效期"
            prop="carLicenseTime"
          >
            <el-date-picker
              v-model="searchform.carLicenseTime"
              clearable
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
          <el-form-item
            label="行驶证品牌型号"
            prop="carBrand"
          >
            <el-input
              v-model="searchform.carBrand"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="驾驶证证件号"
            prop="driverLicense"
          >
            <el-input
              v-model.number="searchform.driverLicense"
              clearable
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item
            label="驾驶证有效期"
            prop="driverLicenseTime"
          >
            <el-date-picker
              v-model="searchform.driverLicenseTime"
              clearable
              type="date"
              placeholder="请选择"
            />
          </el-form-item>
          <div>
            <el-form-item
              label="用途"
              prop="useType"
            >
              <el-select
                v-model="searchform.useType"
                placeholder="请选择"
                filterable
                clearable
                multiple
              >
                <el-option
                  v-for="item in options.useType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <el-divider
            content-position="left"
          >
            <span class="tip">提示:可上传1M以内大小的JPG/JPEG/PNG格式的图片</span>
          </el-divider>
          <el-form-item
            label="车辆照片:"
            prop="carPhoto"
            style="margin-top: 10px;"
          >
            <el-upload
              v-if="(pageType==='2'||pageType==='3')"
              :action="uploadUrl"
              :limit="1"
              :on-success="carPhotoUpload"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              :before-remove="carPhotoRemove"
              accept=".jpg, .png, .jpeg"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <div
              v-if="!(pageType==='2')"
              style="margin-top: 20px;"
            >
              <el-image
                class="img"
                :src="searchform.carPhoto"
                :preview-src-list="[searchform.carPhoto]"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="行驶证照片:"
            prop="carLicensePhoto"
            style="margin-top: 10px;"
          >
            <el-upload
              v-if="(pageType==='2'||pageType==='3')"
              :action="uploadUrl"
              :limit="1"
              :on-success="carLicensePhotoUpload"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              :before-remove="carLicensePhotoRemove"
              accept=".jpg, .png, .jpeg"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <div
              v-if="!(pageType==='2')"
              style="margin-top: 20px;"
            >
              <el-image
                class="img"
                :src="searchform.carLicensePhoto"
                :preview-src-list="[searchform.carLicensePhoto]"
              />
            </div>
          </el-form-item>
          <el-form-item
            label="驾驶证照片:"
            prop="driverLicensePhoto"
            style="margin-top: 10px;"
          >
            <el-upload
              v-if="(pageType==='2'||pageType==='3')"
              :action="uploadUrl"
              :limit="1"
              :on-success="driverLicensePhotoUpload"
              :on-error="uploadError"
              :before-upload="beforeUpload"
              :before-remove="driverLicensePhotoRemove"
              accept=".jpg, .png, .jpeg"
              list-type="picture-card"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <div
              v-if="!(pageType==='2')"
              style="margin-top: 20px;"
            >
              <el-image
                class="img"
                :src="searchform.driverLicensePhoto"
                :preview-src-list="[searchform.driverLicensePhoto]"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import {
  queryDriverVehicleRelationByID, queryModelName, add, update,
} from '@/api/vehicleManagement';
import config from '@/env.config';
import { formatDateTime } from '@/utils/index';
import {
  vehicleType, driverType, useType, licenseType, vehicleStatus,
} from './config';

export default {
  data() {
    const validateCarNumber = (rule, value, callback) => {
      const express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      if (value === '') {
        callback(new Error('请输入车牌号'));
      } else if (!express.test(value)) {
        callback(new Error('请注意车牌号格式!'));
      } else {
        callback();
      }
    };

    return {
      // 界面为查看(1), 新建(2), 编辑页面(3)
      pageType: '',
      id: '',
      options: {
        vehicleType,
        driverType,
        useType,
        licenseType,
        vehicleStatus,
        modelName: [],
      },
      uploadUrl: '',
      carPhotoUrl: '',
      carLicensePhotoUrl: '',
      driverLicenseUrl: '',
      searchform: {
        driverName: '',
        vehicleType: '',
        vehicleId: '',
        carNumber: '',
        carLicenseNumber: null,
        carBrand: '',
        carLicenseTime: '',
        driverLicense: null,
        driverType: [],
        useType: [],
        driverLicenseTime: '',
        carPhoto: '',
      },
      formRules: {
        driverId: [
          { required: true, message: '请输入使用人' },
        ],
        vehicleType: [
          { required: true, message: '请选择车辆类型' },
        ],
        vehicleId: [
          { required: true, message: '请选择车型名称' },
        ],
        carNumber: [
          { required: true, validator: validateCarNumber },
        ],
        carLicenseNumber: [
          {
            required: true, message: '请输入行驶证件号',
          },
          { type: 'number', message: '行驶证件号只能是数字' },
        ],
        carBrand: [
          { required: true, message: '请输入行驶证品牌型号' },
        ],
        carLicenseTime: [
          { required: true, message: '请选择行驶证有效期' },
        ],
        driverLicense: [
          {
            required: true, message: '请输入驾驶证证件号',
          },
          { type: 'number', message: '驾驶证证件号只能是数字' },
        ],
        driverType: [
          { required: true, message: '请选择车型' },
        ],
        driverLicenseTime: [
          { required: true, message: '选择行驶证有效期' },
        ],
        useType: [
          { required: true, message: '选择用途' },
        ],
      },
      newRules: {
        driverId: [
          { required: true, message: '请输入使用人' },
        ],
        vehicleType: [
          { required: true, message: '请选择车辆类型' },
        ],
        vehicleId: [
          { required: false },
        ],
        carNumber: [
          { required: false },
        ],
        carLicenseNumber: [
          {
            required: false,
          },
          { type: 'number' },
        ],
        carBrand: [
          { required: false },
        ],
        carLicenseTime: [
          { required: false },
        ],
        driverLicense: [
          {
            required: false,
          },
        ],
        driverType: [
          { required: false },
        ],
        driverLicenseTime: [
          { required: false },
        ],
        useType: [
          { required: true, message: '选择用途' },
        ],
      },
      // 车辆类型不是四轮 切换newRules规则.
      isFour: false,
    };
  },
  computed: {
    title() {
      switch (this.pageType) {
        case 2:
          return '编辑车辆详情';
        case 3:
          return '新建车辆详情';
        default:
          return '查看车辆详情';
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.uploadUrl = `${config.LC_HOST}/file/upload`;
      this.id = this.$route.query.id;
      this.pageType = this.$route.query.pageType;
      if (this.pageType !== '2') {
        this.queryDetail();
      }
      if (this.pageType === '2') {
        this.searchform.driverName = this.$route.query.name;
      }
    },
    async queryDetail() {
      const { data } = await queryDriverVehicleRelationByID({ id: this.id });
      const item = data.vehicleDetailList[0];
      if (item.carLicenseNumber) {
        item.carLicenseNumber = +item.carLicenseNumber;
      }
      if (item.driverLicense) {
        item.driverLicense = +item.driverLicense;
      }
      await this.changeVehicleType(item.vehicleType);
      this.searchform = item;
      if (!item.driverName) {
        this.searchform.driverName = this.$route.query.name;
      }
    },
    async changeVehicleType(value) {
      if (value === 'FOUR_WHEELED_VEHICLE') {
        this.isFour = true;
      } else {
        this.isFour = false;
      }
      if (value !== '') {
        const { data } = await queryModelName({ vehicleType: value });
        this.options.modelName = data.vehicleList;
      } else {
        this.options.modelName = [];
      }
      this.searchform.vehicleId = '';
    },

    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return isLt1M;
    },
    carPhotoRemove() {
      if (this.pageType === '2') {
        this.searchform.carPhoto = '';
      }
    },
    carLicensePhotoRemove() {
      if (this.pageType === '2') {
        this.searchform.carLicensePhoto = '';
      }
    },
    driverLicensePhotoRemove() {
      if (this.pageType === '2') {
        this.searchform.driverLicensePhoto = '';
      }
    },
    carPhotoUpload(res) {
      this.searchform.carPhoto = res.data.url;
    },
    carLicensePhotoUpload(res) {
      this.searchform.carLicensePhoto = res.data.url;
    },
    driverLicensePhotoUpload(res) {
      this.searchform.driverLicensePhoto = res.data.url;
    },
    uploadError() {
      this.$message.error('上传失败');
    },
    update() {
      const { searchform } = this;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!searchform.carPhoto
          || !searchform.carLicensePhoto
          || !searchform.driverLicensePhoto) {
            this.$message.error('请确认三张照片全部上传');
          } else {
            if (searchform.driverLicenseTime !== '') {
              searchform.carLicenseTime = formatDateTime(searchform.carLicenseTime, 'YYYY-mm-dd');
              searchform.driverLicenseTime = formatDateTime(searchform.driverLicenseTime, 'YYYY-mm-dd');
            } else {
              searchform.carLicenseTime = '';
              searchform.driverLicenseTime = '';
            }
            if (this.pageType === '3') {
              const { data } = await update(
                {
                  driverId: this.id,
                  vehicleIdList: [searchform.vehicleId],
                  car: searchform,
                },
              );
              if (data.updateResult) {
                this.$message.success('保存成功');
                this.searchform = '';
                window.parent.postMessage({
                  id: this.id,
                  type: searchform.vehicleType,
                }, '*');
              }
            } else {
            // 默认传车辆状态,0
              searchform.vehicleStatus = 0;
              const { data } = await add({
                vehicleIdList: [searchform.vehicleId],
                car: {
                  ...searchform,
                },
              });
              if (data.id) {
                this.$message.success('新建成功');
                this.searchform = '';
                window.parent.postMessage({
                  id: data.id,
                  type: data.vehicleType,
                }, '*');
              }
            }
          }
          return true;
        }
        return false;
      });
    },
    back() {
      this.$router.push('/scm/vehicleManagement');
    },
  },

};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  padding: 20px 40px;

  .header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .contain {
    display: flex;

    .tip {
      color: #606266;
      font-size: 12px;
    }

    .img {
      width: 150px;
      height: 150px;
      border: 1px solid #b4b7bd;
    }
  }
}

/deep/ .el-form-item {
  margin-top: 15px;
}
</style>
