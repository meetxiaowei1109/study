/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import {
  defineComponent,
  reactive,
  ref,
  watch,
  h,
} from '@vue/composition-api';
import {
  Table,
  TableColumn,
  Input,
  Select,
  Option,
  Pagination,
  Tooltip,
} from 'element-ui';
import { ElTableColumn } from 'element-ui/types/table-column';
import { ElInput } from 'element-ui/types/input';
import { ElSelect } from 'element-ui/types/select';
import { ElOption } from 'element-ui/types/option';
import { ElTable } from 'element-ui/types/table';
import { ElTooltip } from 'element-ui/types/tooltip';
import { ElFormItem } from 'element-ui/types/form-item';
import Ax, { AxResult, AxQueryData } from 'base/api/axios-ts';
import { removeEmptyStringProperty } from '@/utils';

export type KV<T = unknown> = Record<string, T>;

export interface ETColumn<RecordType = KV<any>> extends Partial<ElTableColumn>, KV {
  // 与元素签名一致
  input?: Partial<ElInput> & { rules?: ElFormItem['rules']; };
  select?: Partial<ElSelect> & {
    options:
    | (OptionRecord & Partial<ElOption>)[]
    | ((...args: Parameters<ETColumn<RecordType>['render']>) => (OptionRecord & Partial<ElOption>)[]);
    rules?: ElFormItem['rules'];
  };
  // TODO: datePicker?: Partial<ElDatePicker>;
  tooltip?:
  | Partial<ElTooltip>
  | ((...args: Parameters<ETColumn<RecordType>['render']>) => Partial<ElTooltip>);
  render?: (props: {
    $index: number;
    /** 当前列属性 */
    column: ETColumn<RecordType>;
    /** 当前列数据 */
    row: RecordType;
  }) => JSX.Element | number | string | null;
}
export interface ETQueryResultDT<RecordType> {
  list: RecordType[];
  pageSize: number;
  pageNum: number;
  total: number;
}

export interface ETHandle {
  refresh: (pagination?: ETPagination) => void;
  pagination: ETPagination;
}

export interface ETPagination {
  pageSize?: number;
  currentPage?: number;
  total?: number;
}

export interface ETableProps<RecordType = KV<any>> extends KV {
  columns?: ETColumn<RecordType>[];
  data?: RecordType[];
  pagination?: boolean | ETPagination;
  query?: {
    url: string;
    params?: KV;
    onRequest?: AxQueryData<unknown, KV>['onRequest'];
    onResponse?: AxQueryData<unknown, AxResult<ETQueryResultDT<RecordType>>>['onResponse'];
    autorun?: boolean;
  };
  handle?: ETHandle;
  /** 泛化 table props */
  props?: Partial<ElTable & KV>;
}

function noop() { } // eslint-disable-line

function argumentify(scope: KV<any>) {
  Object.assign(scope.column, { prop: scope.column.property });
  return scope as any;
}

function ensureNodeValueVNode(node: JSX_ELEMENT) {
  return typeof node !== 'object' ? h('span', node as string) : node;
}

/**
 * !!! 组件中使用 type 尽量从 ETableProps['xxx'] 中获取，不要直接使用
 */
export default defineComponent<ETableProps<KV>>({
  name: 'EnhanceTable',
  props: {
    columns: {
      type: Array as { (): ETableProps['columns'] },
      default: () => [],
    },
    data: {
      type: Array as { (): ETableProps['data'] },
      default: () => [],
    },
    pagination: {
      type: [Object, Boolean],
      default: undefined,
    },
    query: {
      type: Object as { (): ETableProps['query'] },
      default: () => ({}),
    },
    handle: Object,
    props: {
      type: Object as { (): KV },
      default: () => ({}),
    },
  },
  setup(props) {
    const loading = ref(false);
    const pagination2 = reactive<ETPagination>({
      pageSize: 10,
      currentPage: 1,
      total: 0,
      ...(props.pagination === false ? undefined : props.pagination as ETPagination),
    });
    const tableData = ref<ETableProps['data']>(props.data || []);

    const queryHandle = async (page: ETPagination = pagination2) => {
      try {
        loading.value = true;
        const postResult = await Ax.post<ETQueryResultDT<KV>>(props.query.url, {
          ...(props.pagination === false ? undefined : {
            pageSize: page.pageSize,
            pageNum: page.currentPage,
          }),
          ...removeEmptyStringProperty(props.query.params),

          onRequest: props.query.onRequest as any,
          onResponse: props.query.onResponse as any,
        });

        if (!postResult) { return; }
        const { error, result } = postResult;
        if (error) return;

        tableData.value = result.data.list;
        pagination2.total = result.data.total;
        pagination2.currentPage = result.data.pageNum;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    if (typeof props.handle === 'object') {
      Object.assign(props.handle, {
        refresh(handelPGA: ETPagination = { ...pagination2, currentPage: 1 }) {
          setTimeout(() => { queryHandle(handelPGA); }, 49); // 避开手动先设置 params 后马上调用 refresh
        },
        pagination: pagination2,
      });
    }

    // 换页自动请求 (pagination2.total 会导致触发请求)
    /* watch(pagination2, (page) => { queryHandle(props.query.params, page); }); */

    if (props.query.params?.__ob__) {
      // 这两种写法均不生效
      // watch(props.query.params, ()` => {
      // watch([props.query.params], () `=> {
      // 生效，但是有重复触发问题
      /* watch(() => props.query.params, () => {
        // 变参请求
        queryHandle({ ...pagination2, currentPage: 1 });
      }); */
    }

    watch(() => props.data, () => { tableData.value = props.data; });

    if (props.query.url) {
      if (typeof props.query.autorun === 'boolean') {
        if (props.query.autorun) {
          queryHandle();
        }
      } else {
        queryHandle();
      }
    }

    return {
      loading,
      tableData,
      pagination2: props.pagination === false ? false : pagination2,
      pageCurrentChange(page) {
        pagination2.currentPage = page;
        queryHandle();
      },
      /** @todo 触发两次 BUG */
      pageSizeChange(size) {
        pagination2.pageSize = size;
        queryHandle();
      },
    };
  },
  render() {
    // 最后一列如果是 "操作"; 自动右侧固定
    const autoFixed = (arg0: {
      column: ETableProps['columns'][0];
      index: number;
      columns: ETableProps['columns'];
    }): ETColumn => {
      if (arg0.index === arg0.columns.length - 1 && arg0.column.label === '操作') {
        if (!Object.keys(arg0.column).includes('fixed')) {
          arg0.column.fixed = 'right';
        }
      }
      return arg0.column;
    };

    const renderColumnCell = (column: ETColumn, colIdx) => {
      const {
        prop,
        input,
        select,
        tooltip: _tooltip,
        render,
      } = column;
      let tooltip = _tooltip;

      // 🤔 The `node` should always be render-function
      let node: ETableProps['columns'][0]['render'];

      if (typeof render === 'function') {
        node = render;
      } else if (typeof input === 'object') {
        const {
          placeholder = '请输入',
          ...inputOmit
        } = input;
        node = ({ row }) => <Input
          v-model={row[prop as string]}
          placeholder={placeholder}
          {...{ props: inputOmit }}
        />;
      } else if (typeof select === 'object') {
        const {
          options,
          placeholder = '请选择',
          ...selectOmit
        } = select;
        node = (scope) => {
          const { row } = scope;
          const opts = typeof options === 'function' ? options(argumentify(scope)) : options;
          return <Select
            v-model={row[prop as string]}
            placeholder={placeholder}
            {...{ props: selectOmit }}
          >
            {opts.map((opt, idx) => {
              const {
                value,
                label,
                ...optOmit
              } = opt;
              return <Option
                key={idx}
                value={value}
                {...{ props: optOmit }}
              >
                {label}
              </Option>;
            })}
          </Select>;
        };
      }
      // render raw string
      if (!node) {
        node = ({ row }) => <span>{row[prop as string]}</span>;
      }
      // 前两列可以点击，第一列有时候是选框
      if (colIdx <= 1) {
        const originNode = node;
        node = (obj) => {
          const n = ensureNodeValueVNode(originNode(obj));
          if (!n.data) { n.data = {}; }
          if (!n.data.on) { n.data.on = {}; }
          const originClick = n.data.on.click;
          n.data.on.click = (...args2) => {
            // Keep origin onClick
            if (originClick) {
              if (typeof originClick === 'function') {
                originClick(...args2);
              } else {
                originClick.forEach((fn) => { fn(...args2); });
              }
            }
            // 将当前行输出到 log
            console.log(obj.row);
          };
          return n;
        };
      }
      // Wrapped <Tooltip/>
      if (tooltip) {
        const originNode = node;
        const style = 'overflow:hidden; text-overflow:ellipsis; white-space:nowrap;';

        node = (obj) => {
          if (typeof tooltip === 'function') {
            tooltip = tooltip(obj);
          }
          const child = obj.row[prop as string];
          const { placement = 'top', content = child, ...omitTooltip } = tooltip;
          let n = ensureNodeValueVNode(originNode(obj));
          n = <Tooltip
            placement={placement}
            // content={content}
            {...omitTooltip}
          >
            <div slot="content">{content}</div>
            <div style={style}>{n}</div>
          </Tooltip>;
          return n;
        };
      }

      return node;
    };

    return (
      <div class="cxmh-enhance-table">
        <Table
          v-loading={this.loading}
          data={this.tableData}
          on-selection-change={this.$props.props['on-selection-change'] || noop}
          {...{ props: this.$props.props }}
        >
          {this.$props.columns.map((col, idx, arr) => (
            col.type === 'selection'
              // 暂时用空的 TableColumn 修复复选排版 BUG - 21-08-17
              ? <TableColumn key={idx} {...{ props: col }} />
              : <TableColumn
                key={idx}
                {...{ props: autoFixed({ column: col, index: idx, columns: arr }) }}
              >
                {renderColumnCell(col, idx)}
              </TableColumn>
          ))}
        </Table>
        {this.$props.pagination === false
          ? null
          : <Pagination
            background
            style="margin-top:15px;text-align:right;"
            current-page={this.pagination2.currentPage}
            page-sizes={[10, 20, 50, 100, 200]}
            page-size={this.pagination2.pageSize}
            total={this.pagination2.total}
            layout="total, sizes, prev, pager, next, jumper"
            on-current-change={this.pageCurrentChange}
            on-size-change={this.pageSizeChange}
          />}
      </div>
    );
  },
});
