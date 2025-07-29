# ResumeCraft Netlify 部署檔案總結

## 📁 新增的部署檔案

### 1. `netlify.toml`
- **用途**: Netlify 主要配置檔案
- **內容**: 建置設定、環境變數、重定向規則、安全標頭
- **重要設定**:
  - 建置命令: `npm run build`
  - 發布目錄: `.next`
  - Node.js 版本: `18`

### 2. `public/_redirects`
- **用途**: Netlify 重定向規則
- **內容**: SPA 路由支援，確保所有路由都指向 `index.html`

### 3. `public/_headers`
- **用途**: Netlify 安全標頭設定
- **內容**: 
  - 安全標頭 (XSS 保護、內容類型保護等)
  - 快取策略 (靜態資源長期快取，API 路由不快取)

### 4. `NETLIFY_DEPLOYMENT.md`
- **用途**: 詳細部署指南
- **內容**: 
  - 部署步驟
  - 環境變數設定
  - 功能支援說明
  - 故障排除指南

### 5. `deploy.sh` (Linux/Mac)
- **用途**: Unix 系統部署腳本
- **功能**: 自動化建置和部署準備

### 6. `deploy.bat` (Windows)
- **用途**: Windows 系統部署腳本
- **功能**: 自動化建置和部署準備

## 🔧 修改的檔案

### 1. `next.config.js`
- **修改**: 移除了靜態導出設定，保持 API 路由支援
- **原因**: 專案包含伺服器端 API，需要完整 Next.js 功能

### 2. `package.json`
- **修改**: 移除了 `export` 腳本
- **原因**: 不再使用靜態導出

### 3. `app/api/test-email/route.ts`
- **修改**: 重新創建，修復建置錯誤
- **改進**: 使用環境變數而非硬編碼憑證

## 🌐 部署步驟

### 1. 準備工作
```bash
# 確保建置成功
npm run build
```

### 2. 推送到 Git
```bash
git add .
git commit -m "Add Netlify deployment files"
git push origin main
```

### 3. Netlify 設定
1. 登入 [Netlify](https://netlify.com)
2. 點擊 "New site from Git"
3. 選擇您的 Git 提供商和倉庫
4. 設定建置參數:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

### 4. 環境變數設定
在 Netlify 的 Site settings > Environment variables 中設定:
```
NEXT_PUBLIC_USE_BACKEND_PDF=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NEXTAUTH_URL=https://your-site.netlify.app
NEXTAUTH_SECRET=your-secret-key
```

## ✅ 功能支援狀態

### 完全支援
- ✅ 履歷編輯器
- ✅ 模板切換 (6 種模板)
- ✅ 顏色主題
- ✅ 本地儲存
- ✅ 前端 PDF 匯出
- ✅ 討論區功能
- ✅ 意見回饋
- ✅ 郵件功能

### 需要外部服務
- ⚠️ C# PDF 生成 (需要外部 API)
- ⚠️ 自訂網域 (需要 DNS 設定)

## 🔒 安全性

### 已設定的安全標頭
- `X-Frame-Options: DENY` - 防止點擊劫持
- `X-XSS-Protection: 1; mode=block` - XSS 保護
- `X-Content-Type-Options: nosniff` - 內容類型保護
- `Referrer-Policy: strict-origin-when-cross-origin` - 引用來源政策

### 快取策略
- 靜態資源: 長期快取 (1 年)
- API 路由: 不快取
- 確保資料安全性和即時性

## 📊 效能優化

### 建置優化
- 26 個頁面預渲染
- 靜態資源優化
- 程式碼分割

### 部署優化
- 自動建置和部署
- 版本控制整合
- 回滾功能

## 🚀 下一步

1. **測試部署**: 確認所有功能在 Netlify 上正常運作
2. **設定自訂網域**: 如果需要自訂網域
3. **監控效能**: 使用 Netlify Analytics
4. **設定通知**: 部署成功/失敗通知

## 📞 支援

如有問題，請參考:
- `NETLIFY_DEPLOYMENT.md` - 詳細部署指南
- Netlify 官方文件
- 專案 GitHub Issues 