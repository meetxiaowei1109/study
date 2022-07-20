<template>
  <el-main>
    <el-table
      v-loading="dataLoading"
      :data="tableData"
    >
      <template v-for="({label,prop,minWidth,render},index) in tableConfig">
        <el-table-column
          v-if="label==='操作'"
          :key="index"
          :label="label"
          :prop="prop"
          :min-width="minWidth"
          fixed="right"
        >
          <template slot-scope="scope">
            <slot
              :name="prop"
              :row="scope.row"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="label"
          :prop="prop"
          :min-width="minWidth"
        >
          <template slot-scope="scope">
            <template v-if="typeof render === 'function'">
              {{ render(scope.row[prop]) }}
            </template>
            <template v-else>
              {{ scope.row[prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :current-page.sync="pageIndex"
      :page-sizes="[10, 20, 50]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 15px;text-align: right;"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
    />
  </el-main>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import MallRequest from 'base/api/mallRequest';
import { merchantId, businessLine } from '../../config';
// eslint-disable-next-line no-unused-vars
import { TableConfigType, KV } from '../../types';

export type TableHandle = {refresh: ()=>void};

@Component({
  name: 'BillTable',
})
export default class BillTable extends Vue {
  @Prop()
  private form!: KV<string>;

  @Prop()
  private tableConfig!: TableConfigType[];

  @Prop()
  private handle!:TableHandle;

  @Prop()
  private beforeRequest!: (form:KV<string>)=>KV<string>;

  @Prop()
  private url!:string;

  private pageSize = 10;

  private pageIndex = 1;

  private totalCount = 0;

  private tableData = [];

  private dataLoading = false;

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
    this.dataLoading = true;
    const {
      data: {
        result, pageSize, pageIndex, totalCount,
      },
    } = await MallRequest.post(this.url, {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      data: {
        ...this.beforeRequest(this.form),
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

  private mounted() {
    Object.assign(this.handle, { refresh: () => { this.getTableData(); } });
  }
}
</script>
