## 一个现代的纯客户端渲染的 react ts 脚手架

### 技术选型
- **基础框架:** react + react-router v7 + typescript + vite
- **包管理器:** pnpm
- **代码 lint:** biome
- **git 规范:** commitlint + lefthook
- **ui 库:** shadcn ui + tailwindcss v4
- **请求库:** axios + react-query
- **时间库:** dayjs
- **国际化:** i18next

### 约定式路由
- layout.tsx
- index.tsx
- [id].tsx
- xxx.tsx

### 使用方法
复制整个项目到文件夹中
``` shell
pnpm i
```

### 如何自己一步一步搭建
#### 1. 使用 vite 初步搭建一个 react ts 项目
``` shell
pnpm create vite react-csr-starter --template react-ts
```

#### 2. 安装 shadcn ，并安装基础组件
参考 https://ui.shadcn.com/docs/installation/vite

#### 3. 安装 react-router v7
参考 https://reactrouter.com/start/data/installation

#### 4. 安装配置 biome commitlint lefthook
参考 https://biomejs.dev/guides/getting-started/

参考 https://commitlint.js.org/guides/getting-started.html

参考https://github.com/evilmartians/lefthook

#### 5. 安装 i18n 库
参考 https://react.i18next.com/getting-started

#### 6. 安装 axios 和 react-query，并封装
参考 https://tanstack.com/query/v5/docs/framework/react/installation

#### 7. 实现 design token
参考 https://vanilla-extract.style/documentation/getting-started
``` shell
pnpm add -D @vanilla-extract/css @vanilla-extract/vite-plugin
```

#### 8. 安装一些 utils 库
``` shell
pnpm add date-fns dayjs ramda react-use zustand react-hook-form react-helmet-async numeral
```
