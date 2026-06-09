# API 协作约定

## 目标

本文档用于约束前后端接口对接方式，降低联调成本。

## 基础约定

### 1. 接口域名

前端不写死后端域名，统一由环境变量提供：

```env
NUXT_PUBLIC_API_BASE=https://api.example.com
```

### 2. 响应结构

建议后端统一返回以下结构：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

字段说明：

- `code`: 业务状态码，`0` 表示成功
- `message`: 响应消息
- `data`: 业务数据

### 3. 错误处理

建议区分两类错误：

- HTTP 错误：如 `401`、`403`、`404`、`500`
- 业务错误：HTTP 成功但 `code !== 0`

前端处理建议：

- `401`: 跳转登录或触发重新鉴权
- `403`: 提示无权限
- `500`: 显示通用错误提示并记录日志

### 4. 鉴权方式

建议采用 Bearer Token：

```http
Authorization: Bearer <token>
```

模板中的 `useApi` 已预留 token 注入位置。

### 5. 登录接口

建议提供：

```http
POST /auth/login
```

请求示例：

```json
{
  "email": "admin@example.com",
  "password": "ChangeMe123!"
}
```

响应示例：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token",
    "user": {
      "id": "u_1",
      "name": "Demo Admin",
      "email": "admin@example.com",
      "roles": ["admin"]
    }
  }
}
```

## 示例接口

### 健康检查

```http
GET /health
```

示例返回：

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "status": "ok",
    "timestamp": "2026-06-09T09:00:00Z"
  }
}
```

## 联调建议

- 后端先提供接口文档
- 前端先写类型和请求方法
- 约定字段命名风格
- 提前确认分页、排序、筛选字段规范
- 明确时区、金额、枚举值含义

## 后续可扩展项

- OpenAPI / Swagger 文档接入
- 错误码字典
- 上传下载接口约定
- 分页结构统一
- refresh token 续期协议
