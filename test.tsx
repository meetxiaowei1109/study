import FormBuilder, { FBProps, FBHandleType } from '@/components/FormBuilder';
import EnhanceTable, { ETableProps, ETHandle } from '@/components/EnhanceTable';
import { defineComponent, ref } from '@vue/composition-api';
import { Button, Message } from 'element-ui';
import { format, separateDateRangeMax } from '@/utils';
import { enum2options } from 'base/utils';
import moment from 'moment';
import { RowRecord, formModelType } from './type';

import {
  AccountGroup,
} from '../fundAccount/types';
import {
  getClassifyCategory,
  getMainBodyCategory,
} from '../fundAccount/utils';

export default defineComponent({
  name: 'AccountFlow',
  setup() {
    const tableHandle = {} as ETHandle;
    const formHandle = {} as FBHandleType;
    const defaultTime = [moment().subtract(1, 'day').format('yyyy-MM-DD'),
      moment().format('yyyy-MM-DD')];
    // const createTime = ref([...defaultTime]);

    const {
      model: formModel,
      category1List,
      category2List,
    } = getClassifyCategory.use({ form: { createTime: [...defaultTime] } });
    const { list: mainBodyCategoryList } = getMainBodyCategory.use();

    const paramsify = ({ ...p }) => {
      separateDateRangeMax(p, ['createTime', 'createTimeBegin', 'createTimeEnd']);
      return p;
    };

    const clickExport = () => {
      console.log(123);
    };

    const onSubmit = async () => {
      const { createTime } = formModel as formModelType;
      const [start, end] = createTime;
      if (Array.isArray(createTime) && createTime.length > 0) {
        if ((new Date(end).getTime() - new Date(start).getTime())
          > (60 * 60 * 1000 * 24 * 90)) {
          Message.warning('时间范围在九十天内');
          (formModel as formModelType).createTime = [];
          return;
        }
      }
      try { await formHandle.validate(); } catch (error) { return; }
      tableHandle.refresh();
    };

    return {
      formModel,
      formHandle,
      tableHandle,
      // createTime,
      category1List,
      category2List,
      mainBodyCategoryList,
      clickExport,
      onSubmit,
      paramsify,
    };
  },
  render() {
    // const { createTime } = this;

    const formProps:FBProps = {
      model: this.formModel,
      labelWidth: '100px',
      onSubmit: this.onSubmit,
      onReset: this.onSubmit,
      enable: { paramsCache: true },
      elements: [
        {
          label: '查询时间',
          name: 'createTime',
          datePicker: {
            type: 'daterange',
            format: 'yyyy-MM-dd',
            clearable: false,
            // pickerOptions: {
            //   disabledDate(time) {
            //     let currentTime = new Date();
            //     const threeMonths = 60 * 60 * 1000 * 24 * 90;
            //     if (Array.isArray(createTime) && createTime.length > 0) {
            //       currentTime = new Date(createTime[0]);
            //     } else {
            //       return true;
            //     }
            //     return time.getTime() > currentTime.getTime() + threeMonths
            //         || time.getTime() < currentTime.getTime() - threeMonths;
            //   },
            //   onPick({ maxDate, minDate }) {
            //     if (minDate && !maxDate) {
            //       createTime[0] = moment(minDate).format('yyyy-MM-DD');
            //     }
            //     if (maxDate) {
            //       createTime[1] = moment(maxDate).format('yyyy-MM-DD');
            //     }
            //   },
            // },
          },
          rules: { required: true, message: '请选择查询时间' },
        },
        {
          label: '所属集团',
          name: 'accountGroup',
          select: {
            options: enum2options(AccountGroup),
          },
        },
        {
          label: '账号主体',
          name: 'corporationCode',
          select: {
            options: this.mainBodyCategoryList,
          },
        },
        {
          label: '账户一级分类',
          name: 'firstClassify',
          select: {
            options: this.category1List,
          },
        },
        {
          label: '账户二级分类',
          name: 'secondClassify',
          select: {
            options: this.category2List,
            placeholder: '请选择账户一级分类',
          },
        },
        {
          label: '账号',
          name: 'bankAccount',
        },
        {
          label: '余额类型',
          name: 'balanceType',
          select: {
            options: [{ value: 1, label: '实时余额' }, { value: 2, label: '期末余额' }],
          },
        },
        {
          label: '数据类型',
          name: 'dataSource',
          select: {
            options: [{ value: 1, label: '系统查询' }, { value: 2, label: '手工导入' }],
          },
        },
      ],
    };

    const tableProps: ETableProps<RowRecord> = {
      query: {
        // https://yapi.hellobike.cn/project/2554/interface/api/251610
        url: '/fundCore/accountBalanceFlow/pageQuery',
        params: this.formModel,
        onRequest: (params) => this.paramsify(params),
      },
      columns: [
        {
          label: '余额日期',
          prop: 'operatorDate',
          render: ({ row }) => format.ymdhms(row.operatorDate),
          width: '135px',
        },
        {
          label: '查询时间',
          prop: 'createTime',
          render: ({ row }) => format.ymdhms(row.createTime),
          width: '135px',
        },
        {
          label: '所属集团',
          prop: 'accountGroup',
        },
        {
          label: '账户一级分类',
          prop: 'firstClassifyDesc',
          width: '95px',
        },
        {
          label: '账户二级分类',
          prop: 'secondClassifyDesc',
          width: '95px',
        },
        {
          label: '账户主体',
          prop: 'accountMainBody',
          width: '195px',
        },
        {
          label: '账户名称',
          prop: 'accountName',
        },
        {
          label: '银行账号/商户号',
          prop: 'bankAccount',
          width: '150px',
        },
        {
          label: '银行类别',
          prop: 'bankType',
        },
        {
          label: '币种',
          prop: 'currencyType',
        },
        {
          label: '余额类型',
          prop: 'balanceType',
        },
        {
          label: '数据类型',
          prop: 'dataSource',
        },
        {
          label: '余额',
          prop: 'cnyMoney',
        },
        {
          label: '可用余额',
          prop: 'availableBalance',
        },
      ],
      handle: this.tableHandle,
    };


    return <div class={['parameter-container overflow-auto bg-gray p-3'].join(' ')}>
        <div class='bg-white p-3'>
        <FormBuilder formProps={formProps} handle={this.formHandle}/>
        </div>
        <div class='p-3 mt-2 bg-white'>
          <div class="mb-2">
            <Button type='primary' onClick={this.clickExport}>导出</Button>
            <Button type='primary' onClick={this.clickExport}>导入余额</Button>
          </div>
          <EnhanceTable {...{ props: tableProps }} />
        </div>
      </div>;
  },
});
