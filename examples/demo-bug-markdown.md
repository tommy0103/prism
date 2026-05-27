## 并发 refresh 导致合法用户 token 家族被撤销 [P0]

影响所有多 tab 用户。两个 tab 同时刷新 token 时，第二个请求被误判为 token 盗用，导致整个 token 家族（包括第一个 tab 刚拿到的新 token）被撤销。

### 复现链路

**触发条件**

用户在两个浏览器 tab 中同时触发 token 刷新。两个请求携带相同的 refresh token `T1 = "dGhpcyBpcyBh..."`。

**Tab A 请求先到达**

进入 `rotateRefreshToken`（`src/lib/refresh.ts:8-18`），参数 `token = "dGhpcyBpcyBh..."`：

```typescript
// src/lib/refresh.ts:8-18
export async function rotateRefreshToken(token: string) {
  const record = await db.refreshToken.findByHash(hash(token));
  // record = { id: 42, familyId: 7, consumedAt: null }
  if (!record) throw new AuthError('invalid_refresh');
  if (record.consumedAt) {                    // null → 跳过
    await db.refreshToken.revokeFamily(record.familyId);
    throw new AuthError('token_reuse_detected');
  }
  await db.refreshToken.markConsumed(record.id);  // id=42 标记为已消费
  return issueTokenPair(record.userId);            // 返回新 token 对 T2
}
```

Tab A 正常拿到新 token 对 T2。

**Tab B 请求随后到达（同一个 T1）**

再次进入同一函数，参数仍然是 `token = "dGhpcyBpcyBh..."`：

```typescript
// src/lib/refresh.ts:8-18（第二次调用）
export async function rotateRefreshToken(token: string) {
  const record = await db.refreshToken.findByHash(hash(token));
  // record = { id: 42, familyId: 7, consumedAt: "2025-05-24T..." }  ← 已被 Tab A 消费
  if (!record) throw new AuthError('invalid_refresh');
  if (record.consumedAt) {                    // 不为 null → 进入分支
    await db.refreshToken.revokeFamily(record.familyId);  // familyId=7 的所有 token 被撤销
    throw new AuthError('token_reuse_detected');           // ← Bug 在这里
  }
}
```

> 根本原因：函数无法区分合法并发和 token 被盗后重放，对两者执行了相同的撤销逻辑。

**结果**

1. ✅ Tab A: 拿到新 token T2 — 正常
2. ❌ Tab B: 触发 revokeFamily(7) — T2 也被撤销，Tab A 的新 token 失效
3. ❌ 两个 tab 都被强制登出 — 用户需要重新登录
