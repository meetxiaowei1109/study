import { defineComponent, reactive } from '@vue/composition-api';
import FormBuilder, { FBHandleType, FBProps } from '@/components/FormBuilder';
import EnhanceTable, { ETableProps, ETHandle } from '@/components/EnhanceTable';
import { CommonTooltip } from '@/components/snippets';
import { format, separateDateRangeMax } from '@/utils';
import { getGeneralModel1 } from '@/api/common-ts';
import Ax from 'base/api/axios-ts';
import { Button, Message, Input } from 'element-ui';
import { RowRecord } from './types';
import {
  getCityList,
  getPayTypeList,
  getPayStatusList,
} from '../utils';

export default defineComponent({
  name: 'PayOrder',
  setup(props, ctx) {
    const { $router } = ctx.root;
    const formModel = reactive({ businessLineCode: 'BIKE' });
    const formHandle = {} as FBHandleType;
    const tableHandle = {} as ETHandle;
    const { options: cityList } = getCityList.hooks();
    const { options: payTypeList } = getPayTypeList.hooks();
    const { options: payStatusList } = getPayStatusList.hooks();
    const { buList: businessLineList } = getGeneralModel1.hooks();

    const paramsify = ({ ...p }) => {
      separateDateRangeMax(p, ['createTime', 'createStartTime', 'createEndTime']);
      separateDateRangeMax(p, ['payFinishTime', 'payFinishStartTime', 'payFinishEndTime']);
      return p;
    };

    const toSettlementBillDetail = (row:RowRecord) => {
      $router.push({
        path: `/settlement/settlementBillDetail/${row.settlementId}`,
      });
    };

    const toAccountingDetails = (row: RowRecord) => {
      $router.push({
        path: '/accountingCenter/accountingVoucher/details',
        query: { voucherCode: row.voucherEntityCode },
      });
    };

    const rePushVoucher = async (row: RowRecord) => {
      const { error } = await Ax.post(
        // https://yapi.hellobike.cn/project/5865/interface/api/248475
        '/arap/voucherFacade/pushVoucher',
        { billType: 'PAYABLE_BILL', billNo: row.id },
      );
      if (!error) {
        Message.success('推送凭证成功');
        tableHandle.refresh();
      }
    };

    const onSubmit = async () => {
      try { await formHandle.validate(); } catch (error) { return; } // eslint-disable-line
      tableHandle.refresh();
    };

    return {
      formModel,
      formHandle,
      tableHandle,
      paramsify,
      onSubmit,
      cityList,
      payTypeList,
      payStatusList,
      businessLineList,
      toSettlementBillDetail,
      toAccountingDetails,
      rePushVoucher,
    };
  },
  render() {
    const formProps: FBProps = {
      model: this.formModel,
      labelWidth: '87px',
      onSubmit: this.onSubmit,
      onReset: this.onSubmit,
      enable: { paramsCache: true },
      elements: [
        {
          // label: '付款单ID',
          label: '付款单号', // 字符串必须是数字
          name: 'paymentId',
          render: () => <Input clearable
            onInput={(e) => { this.formModel.paymentId = e.replace(/[^\d]/g, ''); }}
            v-model={this.formModel.paymentId} placeholder='请输入' />,
        },
        {
          // label: '结算单ID',
          label: '结算单号', // 字符串必须是数字
          name: 'settlementId',
        },
        {
          label: '付款指令单',
          name: 'instructionCode',
        },
        {
          label: '业务线',
          name: 'businessLineCode',
          select: {
            options: this.businessLineList,
          },
          rules: { required: true, message: '请选择业务线' },
        },
        {
          label: '商户主体',
          name: 'merchantId',
        },
        {
          label: '结算对象',
          name: 'stlMerchantId',
        },
        {
          label: '支付类型',
          name: 'payType',
          select: {
            options: this.payTypeList,
          },
        },
        {
          label: '支付状态',
          name: 'status',
          select: {
            options: this.payStatusList,
          },
        },
        {
          label: '城市编码',
          name: 'cityCode',
          select: {
            options: this.cityList,
          },
        },
        {
          label: '创建时间', // 默认显示近一个月
          name: 'createTime',
          datePicker: {
            type: 'daterange',
          },
        },
        {
          label: '支付时间',
          name: 'payFinishTime',
          datePicker: {
            type: 'daterange',
          },
        },
      ],
      // footer: [<Button type='primary' onClick={this.onSubmit}>查询</Button>],
    };

    const tableProps: ETableProps = {
      query: {
        // https://yapi.hellobike.cn/project/5865/interface/api/236051
        url: '/arap/payFacade/queryPaymentOrderList',
        params: this.formModel,
        onRequest: (params) => this.paramsify(params),
        // autorun: false,
      },
      columns: [
        {
          // label: '付款单ID',
          label: '付款单号',
          prop: 'id',
          width: '170px',
        },
        {
          label: '业务付款单号',
          prop: 'paymentId',
          width: '170px',
        },
        {
          // label: '结算单ID',
          label: '结算单号',
          prop: 'settlementId',
          width: '160px',
          render: ({ row }) => <Button type="text" onClick={() => { this.toSettlementBillDetail(row); } }>{row.settlementId}</Button>,
        },
        {
          label: '付款主体',
          prop: '付款主体',
          render: ({ row }) => CommonTooltip([row.payerName, row.payerId].filter(Boolean).join('/')),
          width: '290px',
        },
        {
          label: '收款主体',
          prop: '收款主体',
          render: ({ row }) => CommonTooltip([row.merchantName, row.merchantId].filter(Boolean).join('/')),
          width: '290px',
        },
        {
          label: '结算商户',
          prop: '结算商户',
          width: '290px',
          render: ({ row }) => CommonTooltip([row.stlMerchantName, row.stlMerchantId].filter(Boolean).join('/')),
        },
        {
          label: '付款账号',
          prop: 'remittanceAccount',
          width: '170px',
        },
        {
          label: '收款账号',
          prop: 'beneficiaryAccount',
          width: '170px',
        },
        {
          label: '支付金额',
          prop: 'payAmount',
        },
        {
          label: '支付类型',
          prop: 'payTypeName',
          width: '117px',
          tooltip: {},
        },
        {
          label: '支付状态',
          prop: 'statusName',
          width: '117px',
          tooltip: {},
        },
        {
          label: '支付失败原因',
          prop: 'payFailReason',
          width: '147px',
          tooltip: {},
        },
        {
          label: '支付完成时间',
          prop: 'payFinishTime',
          width: '144px',
          render: ({ row }) => format.ymdhms(row.payFinishTime),
        },
        {
          label: '付款指令号',
          prop: 'instructionCode',
          width: '170px',
        },
        {
          label: '凭证推送状态',
          prop: 'voucherStatusName',
          width: '100px',
        },
        {
          label: '凭证推送时间',
          prop: 'voucherTime',
          width: '144px',
          render: ({ row }) => format.ymdhms(row.voucherTime),
        },
        {
          label: '凭证推送失败原因',
          prop: 'voucherReason',
          width: '170px',
          tooltip: {},
        },
        {
          label: '业务线',
          prop: '业务线',
          render: ({ row }) => [row.businessLineName, row.businessLineCode].filter(Boolean).join('/'),
        },
        {
          label: '城市',
          prop: 'cityName',
          render: ({ row }) => [row.cityName, row.cityCode].filter(Boolean).join('/'),
          width: '170px',
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: '144px',
          render: ({ row }) => format.ymdhms(row.createTime),
        },
        {
          label: '审批状态',
          prop: 'approveStatusName',
        },
        {
          label: '审批拒绝的原因',
          prop: 'approveReason',
          width: '170px',
          tooltip: {},
        },
        {
          label: '操作',
          prop: '操作',
          width: '120px',
          render: ({ row }) => (
            <div>
              {
                {
                  推送失败: <Button onClick={() => { this.rePushVoucher(row); }}>重新推送凭证</Button>,
                  推送成功: <Button onClick={() => { this.toAccountingDetails(row); }}>查看凭证</Button>,
                }[row.voucherStatusName]
              }
            </div>
          ),
        },
      ],
      handle: this.tableHandle,
    };

    return (
      <div class={['parameter-container overflow-auto bg-gray p-3'].join(' ')}>
        <div class='bg-white p-3'>
          <FormBuilder handle={this.formHandle} formProps={formProps} />
        </div>
        <div class='p-3 mt-2 bg-white'>
          {/* <div class="mb-2">
            <Button>导出</Button>
          </div> */}
          <EnhanceTable {...{ props: tableProps }} />
        </div>
      </div>
    );
  },
});
