# Netlify 部署指南

## 部署前準備

### 1. 環境變數設定
在 Netlify 的環境變數中設定以下變數：

```
NEXT_PUBLIC_USE_BACKEND_PDF=false
NEXT_PUBLIC_CSHARP_PDF_API=https://your-csharp-api.com/generate-pdf
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your-secret-key
```

### 2. 功能支援

✅ **完全支援的功能**
- 所有 API 路由 (`/api/*`)
- 討論區功能
- 意見回饋提交
- PDF 生成 (Node.js 後端)
- 郵件功能

### 3. 替代方案

#### PDF 生成
- 使用前端 PDF 生成 (html2canvas + jsPDF)
- 設定 `NEXT_PUBLIC_USE_BACKEND_PDF=false`

#### 討論區功能
- 考慮使用外部服務如 Supabase 或 Firebase
- 或使用 Netlify Functions

#### 意見回饋
- 使用 Netlify Forms
- 或整合外部表單服務

## 部署步驟

### 1. 連接到 Git 倉庫
1. 登入 Netlify
2. 點擊 "New site from Git"
3. 選擇您的 Git 提供商 (GitHub, GitLab, Bitbucket)
4. 選擇您的 ResumeCraft 倉庫

### 2. 建置設定
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `18`

### 3. 環境變數
在 Netlify 的 Site settings > Environment variables 中設定：
```
NEXT_PUBLIC_USE_BACKEND_PDF=false
```

### 4. 部署
點擊 "Deploy site" 開始部署

## 部署後檢查

### 1. 功能測試
- ✅ 首頁載入
- ✅ 履歷編輯器
- ✅ 模板切換
- ✅ 顏色主題
- ✅ 前端 PDF 匯出
- ✅ 本地儲存

### 2. 功能狀態
- ✅ 討論區功能 (完全支援)
- ✅ 意見回饋提交 (完全支援)
- ✅ 後端 PDF 生成 (Node.js 版本)
- ⚠️ C# PDF 生成 (需要外部 API)

## 自訂網域

1. 在 Netlify 的 Domain settings 中設定自訂網域
2. 更新 DNS 記錄指向 Netlify
3. 等待 DNS 傳播 (通常 24-48 小時)

## 效能優化

### 1. 快取設定
- 靜態資源已設定長期快取
- API 路由設定為不快取

### 2. 安全性
- 已設定基本安全標頭
- XSS 保護
- 內容類型保護

## 故障排除

### 建置失敗
1. 檢查 Node.js 版本 (需要 18+)
2. 確認所有依賴已安裝
3. 檢查環境變數設定

### 功能異常
1. 確認 API 路由限制
2. 檢查瀏覽器控制台錯誤
3. 驗證環境變數

### 效能問題
1. 檢查圖片優化
2. 確認快取設定
3. 使用 Netlify Analytics 分析

## 更新部署

每次推送到主分支時，Netlify 會自動重新部署。

## 支援

如有問題，請檢查：
1. Netlify 部署日誌
2. 瀏覽器開發者工具
3. 專案 GitHub Issues 