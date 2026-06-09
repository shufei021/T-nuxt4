# 开发规范

## 基本原则

- 页面负责展示，逻辑尽量复用
- 请求统一进入 `useApi`
- 类型优先定义在 `app/types`
- 环境变量统一管理
- 登录态与权限统一通过 store + middleware 管理
- 优先复用 Nuxt UI 组件，而不是重复造基础 UI

## 新增页面建议流程

1. 在 `app/pages` 新建页面文件
2. 在 `app/types` 定义接口类型
3. 在 `app/composables` 封装接口调用
4. 如有登录或权限要求，补充 `middleware`
5. 如有全局共享数据，再放入 `app/stores`

## 命名建议

- 页面文件：语义化英文，如 `users/index.vue`
- 组件名：PascalCase，如 `UserTable.vue`
- composable：`useXxx`
- store：`useXxxStore`

## 接口开发建议

不要这样做：

- 在页面中直接写完整请求配置
- 在多个文件重复写同一接口
- 把接口返回的原始数据结构散落到多个页面中处理

建议这样做：

- 统一把请求收口到 composables
- 复杂业务转换在 composable 中完成
- 页面只消费处理后的数据

## Git 协作建议

- `main` 保持稳定
- 功能开发使用特性分支
- 合并前进行代码自测
- 每次提交聚焦单一目的

## 提交前检查

建议至少执行：

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:unit
```

涉及关键流程时再执行：

```bash
pnpm build
pnpm test:e2e
```

## 建议补充的工程能力

- Husky
- Commitlint
- OpenAPI 类型生成
- Storybook
