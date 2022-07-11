1. 工单系统 (https://ticket.hellobike.cn/#/istarted)  申请wiki
2. 工时查看 https://metis2.hellobike.cn/research/worklog/list
3. 权限平台 https://pivotauth.hellobike.cn/home
4. 波塞冬 https://poseidon.hellobike.cn/#/
5. 菜单权限配置 https://config.hellobike.cn/
6. 发布平台 https://deploy.hellobike.cn/#/webapp
7. oss上传平台 http://carfee-utils.hellobike.cn/#/image-manage-old/index

8. 淘宝镜像  https://registry.npm.taobao.org/
9. 哈啰镜像  http://nodepackages.hellobike.cn:4873/
10. npm config set registry http://registry.npmjs.org

11. git branch -a 查看所有分支
12. git fetch 同步分支

13. const name = obj?.name;
14. ifconfig | grep "inet"

15. https://github.com/yu-tou/antd-visual-editor
16. https://github.com/unlayer/react-email-editor
17. https://github.com/KerryCodes/leggo

18. 参数
  a.map(({name,type})=>(JSON.stringify({[`${name}`]:type.toLowerCase()}).slice(1, -1))).join(',')
19. 返回data
  a.filter(e=>e.name==='data').children.map(e=>({[e.name]:e.desc})).forEach(e=>{ x={...x,...e} })