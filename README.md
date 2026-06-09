# T-nuxt4

面向前后端分离场景的标准 Nuxt 4 项目模板。

这个模板默认约定：

- 前端基于 Nuxt 4 + TypeScript
- 后端接口由独立服务提供
- 前端通过统一请求层调用后端 API
- 使用运行时环境变量管理不同环境的接口地址
- 内置基础目录规范、状态管理、错误处理和文档说明
- 内置 ESLint、Prettier、单元测试、E2E 测试
- 内置登录流、权限路由、组件库和 CI/CD 工作流

## 技术栈

- Nuxt 4
- Vue 3
- TypeScript
- Pinia
- Nuxt UI
- 原生 `ofetch` / `$fetch`
- ESLint + Prettier
- Vitest + Playwright
- GitHub Actions + Docker

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，并按实际后端地址修改：

```bash
NUXT_PUBLIC_API_BASE=https://api.example.com
NUXT_PUBLIC_APP_TITLE=T Nuxt 4
```

### 3. 启动开发环境

```bash
pnpm dev
```

### 4. 构建生产版本

```bash
pnpm build
```

## 项目结构

```text
.
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ stores/
│  ├─ types/
│  ├─ utils/
│  └─ app.vue
├─ tests/
│  ├─ e2e/
│  └─ unit/
├─ .github/
│  └─ workflows/
├─ docs/
│  ├─ api-spec.md
│  ├─ architecture.md
│  └─ development.md
├─ public/
├─ .env.example
├─ nuxt.config.ts
├─ package.json
└─ tsconfig.json
```

## 核心约定

### 1. 后端独立提供接口

本模板不以内置 `server/api` 作为业务主接口层，业务数据默认来自独立后端服务。

### 2. 接口统一从请求层进入

统一通过 `app/composables/useApi.ts` 发起请求，便于：

- 注入公共请求头
- 统一错误处理
- 携带 token
- 维护请求日志与扩展能力

### 3. 接口地址由环境变量控制

不同环境通过 `NUXT_PUBLIC_API_BASE` 切换后端地址，不在业务代码里写死。

### 4. 页面优先使用组合式能力

页面只处理展示和交互逻辑，接口调用与数据组织尽量沉淀到 composables 或 stores。

### 5. 权限控制默认走中间件

路由鉴权与权限校验通过 `middleware` 完成：

- `auth` 负责未登录跳转
- `guest` 负责已登录用户避开登录页
- `permission` 负责角色权限校验

### 6. 组件优先复用 Nuxt UI

模板已经接入 `@nuxt/ui`，表单、按钮、卡片、标签等基础交互优先使用组件库能力。

## 示例能力

模板内置了一个首页，演示以下内容：

- 读取环境变量
- 展示项目规范
- 调用后端健康检查接口
- 使用 Pinia 管理全局基础状态
- 登录页和受保护的仪表盘页
- 管理员角色示例页
- 单元测试和 E2E 测试示例
- 自动化 CI 与 Docker 发布工作流

## 常用命令

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
```

## 文档索引

- 架构说明：`docs/architecture.md`
- API 约定：`docs/api-spec.md`
- 开发规范：`docs/development.md`

## 登录与权限

默认登录流约定后端提供：

- `POST /auth/login`

默认会话存储：

- `access_token`
- `auth_user`

示例受保护路由：

- `/dashboard`
- `/admin/users`

## 自动化发布

仓库已提供：

- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `Dockerfile`

默认发布流程会在 `main` 分支构建 Docker 镜像，并推送到 GHCR。

## 适合的使用场景

- 管理后台
- 企业官网前台
- 中后台运营系统
- 与 Java / Go / Node / Python 后端分离协作的业务项目

## 后续建议

如果你准备把这个模板作为团队标准脚手架继续演进，建议下一步补充：

- 国际化
- 细粒度菜单权限
- 刷新 token 与会话续期
- OpenAPI 类型生成
- 监控告警与埋点
