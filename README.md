# zhiyin

## Getting Started

Install dependencies,

```bash
yarn
```

Start the dev server,

```bash
yarn start
```

## 合法的提交日志格式如下(emoji 和 模块可选填)

`[<emoji>] [revert: ?]<type>[(scope)?]: <message>`

- 💥 feat(模块): 添加了个很棒的功能
- 🐛 fix(模块): 修复了一些 bug
- 📝 docs(模块): 更新了一下文档
- 🌷 UI(模块): 修改了一下样式
- 🏰 chore(模块): 对脚手架做了些更改
- 🌐 locale(模块): 为国际化做了微小的贡献

## 请求

- 请求工具类：`services/axios`
- 具体请求方法在 `services/*` 下的文件夹

## global.less

Umi 中约定 `src/global.css` 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。

## pxtorem

config 文件中配置了 `pxtorem`, 但是现在 antd 的 px 没有被转换
