# 開發者功能說明

## 🛡️ 開發者身份驗證

ResumeCraft 討論區現在支援開發者身份驗證，提供管理所有貼文的權限。

### 可用的開發者令牌

| 令牌 | 權限 | 說明 |
|------|------|------|
| `dev-token-2024` | 開發者 | 基本管理權限 |
| `admin-token-2024` | 管理員 | 完整管理權限 |

## 🔧 功能特色

### 1. 開發者管理面板
- **統計資訊**：查看討論區的詳細統計數據
- **內容管理**：刪除和恢復討論
- **用戶分析**：查看活躍用戶數量

### 2. 軟刪除系統
- **安全刪除**：刪除的討論不會永久消失
- **可恢復**：管理員可以恢復已刪除的討論
- **刪除記錄**：記錄刪除原因和時間

### 3. 權限控制
- **身份驗證**：需要有效的開發者令牌
- **操作記錄**：所有管理操作都會記錄
- **安全保護**：防止未授權訪問

## 🚀 使用方式

### 1. 訪問開發者面板
1. 進入討論區頁面 (`/forum`)
2. 按下快捷鍵 `Ctrl + Shift + D` 開啟開發者面板
3. 輸入開發者令牌進行驗證

**注意**：開發者功能對一般訪客是隱藏的，只有知道快捷鍵的人才能訪問。

### 2. 管理討論
- **刪除討論**：在討論列表中，只有開發者身份驗證後才會顯示刪除按鈕
- **恢復討論**：在管理面板中查看已刪除的討論並恢復
- **查看統計**：在管理面板中查看詳細統計資訊

### 3. 身份驗證
```javascript
// 驗證開發者身份
const response = await fetch('/api/forum/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: 'dev-token-2024' }),
})
```

## 📊 API 端點

### 身份驗證
- `POST /api/forum/auth` - 驗證開發者身份

### 管理操作
- `DELETE /api/forum/admin/posts/[id]` - 刪除討論
- `PATCH /api/forum/admin/posts/[id]` - 恢復討論
- `GET /api/forum/admin/stats` - 獲取統計數據

### 請求範例
```javascript
// 刪除討論
const response = await fetch(`/api/forum/admin/posts/${postId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify({ reason: '違反討論區規則' }),
})

// 獲取統計數據
const stats = await fetch('/api/forum/admin/stats', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
```

## 🔒 安全考量

### 1. 令牌管理
- 開發者令牌應該妥善保管
- 定期更換令牌以提高安全性
- 不要在前端代碼中硬編碼令牌

### 2. 權限控制
- 所有管理操作都需要身份驗證
- 使用 Bearer Token 進行授權
- 記錄所有管理操作

### 3. 資料保護
- 使用軟刪除保護資料
- 提供恢復機制
- 記錄操作歷史

## 📈 統計數據

管理面板提供以下統計資訊：

- **總討論數**：所有討論的數量
- **總留言數**：所有留言的數量
- **已刪除討論**：被刪除的討論數量
- **活躍用戶**：過去7天內有活動的用戶數量
- **今日新增**：今天新增的討論和留言數量

## 🎯 未來擴展

### 短期目標
- [ ] 添加更多統計圖表
- [ ] 實現批量操作功能
- [ ] 添加操作日誌查看

### 中期目標
- [ ] 實現用戶管理功能
- [ ] 添加內容審核工具
- [ ] 實現自動化規則

### 長期目標
- [ ] 整合機器學習內容審核
- [ ] 實現高級分析功能
- [ ] 添加多語言支援

## 🛠️ 技術實現

### 前端技術
- **React Hooks**：狀態管理
- **Framer Motion**：動畫效果
- **LocalStorage**：身份持久化

### 後端技術
- **Next.js API Routes**：API 端點
- **Bearer Token**：身份驗證
- **軟刪除**：資料保護

### 資料結構
```typescript
interface DeveloperAuth {
  token: string
  role: 'developer' | 'admin'
  name: string
}

interface AdminStats {
  totalPosts: number
  totalComments: number
  deletedPosts: number
  deletedComments: number
  todayPosts: number
  todayComments: number
  activeUsers: number
}
```

## 📞 支援

如有問題或建議，請聯繫開發團隊或提交 Issue。

---

*此功能由 ResumeCraft 團隊開發，旨在提供更好的討論區管理體驗。* 