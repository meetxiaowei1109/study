### 已上线

1. 2022.04 应付和付款单管理后台 V1.1
   [status]已上线
   [branch]clear release/ww0412
   [yuque]https://hellobike.yuque.com/mqxgv1/hc72hk/rqoceg

2. 2022.04 清结算结算线上答疑问题整理
   [status]开发完成 fat 中, 21 已上线
   [branch]clear release/ww0408
   [yuque](https://hellobike.yuque.com/mqxgv1/at0uwh/gaa5ib)
   [jira](https://jira.hellobike.cn/browse/ALADDIN-4706)
   [增加需求]修改两个列表拼接带上 id 0.5d
   [增加需求]账单列表、结算单列表查询时间功能优化 0.5d 已上线

3. 应收应付 V1.4-管理后台优化 1.5d
   [status]27 晚上线 已上线
   [branch] release/ww0425
   [yuque](https://hellobike.yuque.com/docs/share/dc4fd5c1-f5ba-4da5-a3a9-5486da8dc1e6?#)
   [jira](https://jira.hellobike.cn/browse/ALADDIN-4898)
   [yapi]

4. 2022.04 供应链旧应用下线迁移专项计划
   [status]开发完成 fat 中, 4.21 已提测 5.6 已上线
   [branch]scm release/ww0406
   [yuque](https://hellobike.yuque.com/vo6hf0/gydhg1/mr7nm4)
   [增加问题] 域名修改为 scm.api 下载逻辑修改

5. 2022.04 4 月日常迭代 2.5d (出了一个 bug, 撤回成功后未关闭弹窗, 重新刷新页面)
   [status] 开发完成, 4.21 之前开发完成, 已提测 5.6 已上线
   审批撤回
   [wiki](http://wiki.cheyaoshicorp.com/pages/viewpage.action?pageId=292672030)
   [branch]clear release/ww0419
   SCM 支持查看结算明细
   [wiki](http://wiki.cheyaoshicorp.com/pages/viewpage.action?pageId=292675493)
   [branch]scm release/ww0406
   应收单导出增加字段
   [wiki](http://wiki.cheyaoshicorp.com/pages/viewpage.action?pageId=264057701)

6. 2022.04.22 通用下载功能(账单导出功能/清分明细导出功能/结算单导出功能/付款单导出功能) 加的提示 一定要用户点击确定
   2d - 2d
   [status] 4.28 上 pre 已在 pre
   [branch] clear release/ww0424
   [yuque](https://hellobike.yuque.com/hb3fga/newbie/mc33f5)
   [jira](https://jira.hellobike.cn/browse/ALADDIN-4295)
   [yapi]账单列表下载 https://yapi.hellobike.cn/project/2554/interface/api/250401
   [yapi]结算单列表下载 https://yapi.hellobike.cn/project/2554/interface/api/250407
   [yapi]账单明细范围下载 https://yapi.hellobike.cn/project/2554/interface/api/250419
   [yapi]付款单列表下载 https://yapi.hellobike.cn/project/2554/interface/api/250422

7. 2022.04 清结算全链路自助查询 5d - 4d = 0d, 收单信息是表单 其他事表格
   [menuConfig]看板菜单，流水菜单配置
   [status]联调中
   [branch]clear release/ww0420
   [yuque](https://hellobike.yuque.com/hb3fga/newbie/iwa6zg)
   [yapi](https://yapi.hellobike.cn/project/2554/interface/api/249732)
   [yapi](https://yapi.hellobike.cn/project/2554/interface/api/249804)
   [jira](https://jira.hellobike.cn/browse/ALADDIN-4706)
   [增加需求] 交易订单号 --> 采购单号 已做
   [增加需求] 业务线不要初始值 已做
   [增加需求] 收单信息 时间 已做
   [增加需求] 小伟，这边如果查询的时候 报错的话，下面的数据清理掉吧 已做
   JZ-CG-ST1DCJ-20201120-001(LX)
   业务订单号：TJJHBB-CG-TJJH-20220315-001(PC)
   入库/发货单号：sn_20220317821693101696307200
   HELLO_EXPRESSCAR
   TP20220126114955200000100030024

8. 应收单增加款项类型
   [menuConfig]
   [status] 开发中 已提测
   [branch] release/ww0520
   [yuque]
   [wiki] http://wiki.cheyaoshicorp.com/pages/viewpage.action?pageId=302076224
   [jira]
   [yapi]

9. 景交车接入清结算， 业务场景加一项，新建选择新的业务场景，合同不要了
   [status] 2d-2d 等待联调 已提测
   [branch] clear car0506
   [yuque](https://hellobike.yuque.com/hb3fga/newbie/gd3st9)
   [wiki]
   [jira](https://jira.hellobike.cn/browse/ALADDIN-4964)
   [yapi]
   [增加需求] 不要城市 已做
   [增加需求] 业务场景缓存问题

10. 资金看板 V1.2-余额获取功能优化 5d
    [menuConfig]看板菜单，流水菜单配置
    [status] 开发中， 上线时需要配置菜单 已提测 uat
    [branch] clear board0507
    [yuque](https://hellobike.yuque.com/hb3fga/newbie/gzevzp)
    [wiki]
    [jira](https://jira.hellobike.cn/browse/ALADDIN-4843)
    [yapi](https://hellobike.yuque.com/mqxgv1/hc72hk/se5bt5#j1F4E)
    [增加需求] 余额同步, 导出成功修改提示 已做
    [增加需求] 账户管理页面 增加字段 已做
    [增加需求] 时间格式化为年月日 已做
    [增加需求] 其他都是左对齐，就当前余额这里变成了右对齐啊 已做
    [增加需求] 总感觉改成“请先选择。。。” 已做
    [增加需求] 资金看板 滚动到标题(已做) 文字大小还原(已做) x 轴全显示(已做) x 轴亮度和虚线一致(已做) 集团去掉(已做)

11. 电商分销价格维护 上线需要发布波塞冬
    [menuConfig] 需要配置
    [status] 6.28 上线 6.27 上到了 pre 已提测 开发中 6.23,6.24
    [branch] release/price0620
    [yuque] (https://hellobike.yuque.com/hb3fga/newbie/zhfbwg)
    [wiki]
    [jira] (https://jira.hellobike.cn/browse/ALADDIN-5449)
    [yapi]
    [增加需求] 存货成本核算/成本单据管理/财务出入库单管理 增加销售单号 需要发布波塞冬(已上线)

12. 商户结算: 账单列表/结算单列表/付款单列表 业务线添加 充值-HELLO_RECHARGE 业务场景为空
    [jira] https://jira.hellobike.cn/browse/ALADDIN-5495

13. 规则管理: 合同管理 业务线增加 全网叫车 TAXI 表格增加分成比例

14. 存货成本核算/标准成本管理/标准价管理 批量导入接口更换
    [status] 已发 pro 开发完成在 fat 中 开发中
    [branch] release/ww0705
    [yapi] (https://yapi.hellobike.cn/project/2554/interface/api/255803)
    [jira] (https://jira.hellobike.cn/browse/ALADDIN-5685)

15. 好物商城接入清结算
    [menuConfig] 需要配置
    [status] 开发中
    [branch] AppMallAdminWeb feature/clear0627
    [yuque] (https://hellobike.yuque.com/hb3fga/newbie/iynkak)
    [wiki]
    [jira] (https://jira.hellobike.cn/browse/ALADDIN-5383)
    [yapi] (https://yapi.hellobike.cn/project/2554/interface/api/cat_42254)
    [增加需求] 这个顺便重构掉吧，把我们业财的 BaseInfo 搬过去
    AppAccountPlatform
    业务线：好物商城，HELLO_HAOWU_MALL
    业务场景：好物商城订单 HELLO_HAOWU_MALL_01
    商户中心 https://fat-mp-login.hellobike.com/  
     17600000000 验证码 888888
    13346181349 验证码 888888

    根据账单类型调用不同的账单明细接口
    调账单/acs/queryDetailListWithPage 传参{pageIndex: 1, pageSize: 10, periodStlId: "239281716213579777"}
    普通账单/SettlementHandleService.querySettlementListWithMerchantId
    https://yapi.hellobike.cn/project/2554/interface/api/256635

    能把我的账单放在资金管理下面么，然后把结算中心去掉

16. 账单、结算单、付款单能力改造
    0714 发布 (1) 手工调账管理 批量提交 (2) 手工调账管理 商户主体 拼接 商户 ID
    (3)账单, 付款单, 结算单 合计金额显示
    [menuConfig] 不需要
    [status] 部分开发 未开发
    [branch] release/ww0711
    [yuque] (https://hellobike.yuque.com/hb3fga/newbie/nxywkg)
    [wiki]
    [jira] (https://jira.hellobike.cn/browse/ALADDIN-5613)
    [yapi] (https://hellobike.yuque.com/mqxgv1/at0uwh/ldppg7)
    [增加需求]
    7.14 已发 pre 7.13 settlement branch release/ww0713  
    合同支持特殊协议文字输入查询, depreciationId 指定值 depreciationType 0:表示空值 1:表示非空

17. 更换手工账单批量导入下载模板 0714 发布
    [status] pre 7.14 已做 还未做
    [branch] release/ww0711
    https://m.hellobike.com/resource/AppSettlementWeb/AppSettlementWeb/yG-vxgp4zu0tk0ZflS95R.xlsx

### 已提测

1.

2.

3.

4.

### 开发中

1. 资金平台 V1.5-三方账户管理
   [menuConfig] 配置证书管理
   [status] 7.20 已发 pre 已提测 开发中
   [branch] release/tripartite0701
   [yuque] (https://hellobike.yuque.com/hb3fga/newbie/ldwve3)
   [wiki]
   [jira] (https://jira.hellobike.cn/browse/ALADDIN-5144)
   [yapi] (https://hellobike.yuque.com/mqxgv1/hc72hk/ggobqe#ppyr0)
   [增加需求]
   证书管理 tip 显示(已做)
   证书管理上传文件限制大小 10m, 类型不限制

2. 结算单 批量回退功能, 修改发起结算审批时 每一项结算金额>0 才可以
   [status] 7.19 发到 fat
   [branch] release/ww0711
   [yapi] (https://yapi.hellobike.cn/project/2554/interface/api/257179)
   [接口文档] (https://hellobike.yuque.com/mqxgv1/at0uwh/ldppg7)

3. PMS 租车系统结算, 账单明细 添加 驾驶人手机号, 驾驶人姓名(driverPhone, driverName)
   [status] 开发完成
   [branch] feature/clear0720

4. 存货成本核算/成本单据管理/财务出入库单管理 补录接口更换
   [status] 7.19 发到 fat
   [branch] release/ww0720
   新接口：(https://yapi.hellobike.cn/project/2554/interface/api/255803)

5. 资金平台 V1.6-宝付、易宝渠道资金账单对接
   [menuConfig] 需要配置两个菜单
   [status]
   [branch] release/docking0720
   [yuque]
   [wiki] (https://hellobike.yuque.com/hb3fga/newbie/ug6ng3)
   [jira] (https://jira.hellobike.cn/browse/ALADDIN-5753)
   [yapi] (https://hellobike.yuque.com/mqxgv1/hc72hk/rfqohh)
   [增加需求]

### 等待开发

1. 账单、结算单、付款单能力改造

小哈代扣账单 -> 代扣账单
助力车的详情页 账单类型
账单列表 已提交, 待审批 提交异常重新提交不要了
账单列表 状态前面添加审批状态, 条件筛选添加和结算单一样的筛选状态

2.

[menuConfig]
[status]
[branch]
[yuque]
[wiki]
[jira]
[yapi]
[增加需求]
