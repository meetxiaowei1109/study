<template>
  <el-main>
    <el-header style="padding: 20px 0;">
      <el-form
        ref="form"
        :model="form"
        inline
        label-width="110px"
      >
        <el-form-item
          label="查询账单时间"
          prop="date"
          :rules="{ required: true, message: '查询账单时间不能为空', trigger: 'change' }"
        >
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :clearable="false"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="submitForm"
          >
            搜索
          </el-button>
          <el-button
            icon="el-icon-refresh"
            type="warning"
            plain
            @click="resetForm"
          >
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <main class="bill-main">
      <section class="card">
        <div
          v-for="e in amountList"
          :key="e.status"
          class="card-item"
        >
          <div class="card-label">
            {{ e.statusName }}
          </div>
          <div class="card-num">
            {{ e.amount }}
          </div>
        </div>
      </section>
      <section class="tabs">
        <div class="tabs-header">
          <div
            v-for="({value,label}) in settleStatus"
            :key="value"
            class="tabs-item"
            :class="choiceTab===value?'tabs-choice':''"
            @click="handleTabsChange(value)"
          >
            {{ label }}
          </div>
        </div>

        <div class="content">
          <!-- <el-table
            v-loading="dataLoading"
            :data="tableData"
          >
            <el-table-column
              v-for="({label,prop,minWidth},index) in billTableConfig"
              :key="index"
              :label="label"
              :prop="prop"
              :min-width="minWidth"
            />
            <el-table-column
              label="操作"
              width="85px"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="toDetail(scope.row)"
                >
                  明细
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="pageIndex"
            :page-sizes="[10, 20, 50]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin-top: 15px; text-align: right;"
            :total="totalCount"
            @size-change="handleSizeChange"
            @current-change="handleIndexChange"
          /> -->

          <BillTable
            :params="form"
            :table-config="billTableConfig"
            :handle="tableHandle"
            :before-request="beforeRequest"
          />
        </div>
      </section>
    </main>
  </el-main>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { ElForm } from 'element-ui/types/form';
import MallRequest from 'base/api/mallRequest';
// eslint-disable-next-line no-unused-vars
import { RowRecord, SettleStatus, KV } from '../../types';
import {
  billTableConfig, merchantId,
  businessLine, initDate,
} from '../../config';
import { enum2Options } from '../../utils';
// eslint-disable-next-line no-unused-vars
import BillTable, { TableHandle } from '../../components/BillTable.vue';

@Component({
  name: 'Bill',
  components: {
    BillTable,
  },
  data() {
    return {
      billTableConfig,
      settleStatus: enum2Options(SettleStatus),
    };
  },
})

export default class Bill extends Vue {
  private tableHandle = {} as TableHandle;

  private pageSize = 10;

  private pageIndex = 1;

  private totalCount = 0;

  private choiceTab = SettleStatus.全部;

  private form = { date: initDate };

  private tableData:RowRecord[] = [];

  private amountList = [];

  private dataLoading = false;

  private beforeRequest(params: KV<string>) {
    return {
      billStatus: this.choiceTab === -1 ? undefined : this.choiceTab,
      clearingStartDate: new Date(params.date[0]).getTime(),
      clearingEndDate: new Date(params.date[1]).getTime(),
    };
  }

  private handleTabsChange(value: number) {
    if (this.choiceTab === value) return;
    this.choiceTab = value;
    // this.getTableData();
    this.tableHandle.refresh();
  }

  private submitForm() {
    (this.$refs.form as ElForm).validate((valid:boolean):boolean => {
      if (valid) {
        // this.getTableData();
        this.getAmount();
        this.tableHandle.refresh();
        return true;
      }
      return false;
    });
  }

  private resetForm() {
    this.form = { date: initDate };
    // this.getTableData();
    this.getAmount();
    this.tableHandle.refresh();
  }

  private handleSizeChange(size:number) {
    this.pageIndex = 1;
    this.pageSize = size;
    this.getTableData();
  }

  private handleIndexChange(index:number) {
    this.pageIndex = index;
    this.getTableData();
  }

  private async getTableData() {
    const [startDate, endDate] = this.form.date;
    this.dataLoading = true;
    const {
      data: {
        result, pageSize, pageIndex, totalCount,
      },
    // https://yapi.hellobike.cn/project/2554/interface/api/256583
    } = await MallRequest.post('/SettlementQueryService.queryPageOrderBillWithMerchantId',
      {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        data: {
          billStatus: this.choiceTab === -1 ? undefined : this.choiceTab,
          clearingStartDate: new Date(startDate).getTime(),
          clearingEndDate: new Date(endDate).getTime(),
          businessLine,
          merchantId,
        },
      });
    this.dataLoading = false;
    this.tableData = result ?? [];
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.totalCount = totalCount;
  }

  private async getAmount() {
    const [startDate, endDate] = this.form.date;

    // https://yapi.hellobike.cn/project/2554/interface/api/256584
    const { data } = await MallRequest.post('/SettlementHandleService.queryMerchantPeriodSummaryWithMerchantId',
      {
        merchantId,
        businessLine,
        clearingStartDate: new Date(startDate).getTime(),
        clearingEndDate: new Date(endDate).getTime(),
      });

    this.amountList = data.statusList;
  }

  private toDetail(row: {billOrderNo: string, settleStatus:string}) {
    this.$router.push({
      path: '/settlement/bill/detail',
      query: {
        billOrderNo: row.billOrderNo,
        settleStatus: row.settleStatus,
      },
    });
  }

  private mounted() {
    // this.getTableData();
    this.getAmount();
  }
}
</script>

<style lang="less" scoped>
.bill-main {
  .card {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 5px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.29);
    border-radius: 3px;

    .card-item {
      font-size: 20px;
      padding: 20px;

      .card-label {
        color: #909399;
      }

      .card-num {
        margin-top: 10px;
        font-weight: 500;
      }
    }
  }

  .tabs {
    margin-top: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    border: 1px solid #dcdfe6;

    .tabs-header {
      display: flex;
      box-sizing: border-box;
      background: #f5f7fa;
      border-bottom: 1px solid #dcdfe6;

      .tabs-item {
        font-size: 14px;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        color: #909399;
        cursor: pointer;
        border: 1px solid transparent;

        &:first-child {
          border-left: 0;
        }
      }

      .tabs-item:hover {
        color: #409eff;
      }

      .tabs-choice {
        color: #409eff;
        background-color: #fff;
        border-right-color: #dcdfe6;
        border-left-color: #dcdfe6;
      }
    }

    .content {
      padding: 10px;
    }
  }
}
</style>
