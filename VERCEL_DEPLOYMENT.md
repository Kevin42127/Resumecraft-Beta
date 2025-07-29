# Vercel 部署指南

## 🚀 Vercel 部署優勢

相比 Netlify，Vercel 對 Next.js 和 Puppeteer 有更好的支持：

- ✅ **原生 Next.js 支持**: 最佳性能和兼容性
- ✅ **Puppeteer 支持**: 完整的瀏覽器環境
- ✅ **更長的執行時間**: 最多30秒（vs Netlify的10秒）
- ✅ **更好的冷啟動**: 更快的函數啟動時間
- ✅ **自動優化**: 自動代碼分割和優化

## 📋 部署步驟

### 1. 準備 Vercel 帳戶

1. 訪問 [Vercel](https://vercel.com)
2. 使用 GitHub 帳戶登錄
3. 授權 Vercel 訪問您的 GitHub 倉庫

### 2. 導入項目

1. 點擊 "New Project"
2. 選擇 "Import Git Repository"
3. 選擇 `Kevin42127/Resumecraft-Beta`
4. 點擊 "Import"

### 3. 配置設置

Vercel 會自動檢測 Next.js 項目，配置如下：

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. 環境變數（可選）

如果需要郵件功能，添加以下環境變數：

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 5. 部署

點擊 "Deploy" 開始部署！

## 🔧 配置文件說明

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "functions": {
    "app/api/generate-pdf/route.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD": "true"
  }
}
```

### 配置說明：
- **maxDuration**: PDF生成函數最多執行30秒
- **PUPPETEER_SKIP_CHROMIUM_DOWNLOAD**: 跳過Chromium下載，使用Vercel內建版本

## 🌐 自動部署

設置完成後：
1. **推送代碼** 到 `master` 分支
2. **Vercel 自動檢測** 變更
3. **自動構建** 並部署
4. **即時更新** 網站

## 📊 性能優勢

| 功能 | Vercel | Netlify |
|------|--------|---------|
| Next.js 支持 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Puppeteer 支持 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 執行時間限制 | 30秒 | 10秒 |
| 冷啟動速度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 自動優化 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🔍 故障排除

### 構建失敗
- 檢查 Node.js 版本（需要 18+）
- 確認所有依賴已安裝
- 查看構建日誌

### PDF 生成問題
- 確認 Puppeteer 配置正確
- 檢查函數執行時間
- 查看函數日誌

### 環境變數
- 在 Vercel 控制台設置環境變數
- 重新部署以應用變更

## 🌐 訪問您的網站

部署完成後，您會得到：
- **自動域名**: `https://your-project.vercel.app`
- **自定義域名**: 可以添加自己的域名
- **HTTPS**: 自動SSL證書
- **CDN**: 全球內容分發

## 📈 監控和分析

Vercel 提供：
- 實時部署狀態
- 性能分析
- 訪問統計
- 錯誤追蹤
- 函數執行日誌

## 🔄 回滾

如果需要回滾：
1. 進入 Vercel 控制台
2. 選擇 "Deployments" 標籤
3. 點擊之前的部署
4. 選擇 "Promote to Production"

---

**注意**: Vercel 是 Next.js 的官方部署平台，提供最佳的開發和部署體驗。 