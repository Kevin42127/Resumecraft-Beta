# Netlify 自動部署指南

## 🚀 自動部署設置

### 1. 連接到 Netlify

1. 訪問 [Netlify](https://netlify.com) 並登錄
2. 點擊 "New site from Git"
3. 選擇 "GitHub" 作為 Git 提供商
4. 授權 Netlify 訪問您的 GitHub 帳戶
5. 選擇 `Kevin42127/Resumecraft-Beta` 倉庫

### 2. 構建設置

Netlify 會自動檢測以下設置：

- **構建命令**: `npm run build`
- **發布目錄**: `.next`
- **Node.js 版本**: 18

### 3. 環境變數 (可選)

如果需要郵件功能，在 Netlify 設置中添加：

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 4. 域名設置

- **自動域名**: Netlify 會提供一個隨機域名
- **自定義域名**: 可以在設置中添加自己的域名

## 🔧 配置說明

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
```

### next.config.js
```javascript
const nextConfig = {
  // 效能優化設定
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // 圖片優化
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // 實驗性功能
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Webpack 優化
  webpack: (config, { dev, isServer }) => {
    // 排除 puppeteer（僅在伺服器端需要）
    if (isServer) {
      config.externals.push({
        'puppeteer': 'commonjs puppeteer'
      })
    }
    
    return config
  },
}
```

## 📋 部署流程

1. **推送代碼**: 每次推送到 `master` 分支
2. **自動觸發**: Netlify 自動檢測變更
3. **構建過程**: 執行 `npm run build`
4. **部署完成**: 網站自動更新

## 🔍 故障排除

### 構建失敗
- 檢查 Node.js 版本 (需要 18+)
- 確認所有依賴已安裝
- 查看構建日誌

### 頁面 404
- 確認重定向規則設置正確
- 檢查路由配置

### API 路由問題
- 所有 API 路由都支持動態渲染
- 確保環境變數設置正確

## 🌐 訪問您的網站

部署完成後，您會得到：
- **自動域名**: `https://random-name.netlify.app`
- **自定義域名**: `https://your-domain.com`

## 📊 監控

Netlify 提供：
- 構建狀態監控
- 訪問統計
- 性能分析
- 錯誤追蹤

## 🔄 回滾

如果需要回滾到之前的版本：
1. 進入 Netlify 控制台
2. 選擇 "Deploys" 標籤
3. 點擊之前的部署
4. 選擇 "Publish deploy"

## ✅ 已修復的問題

- ✅ 移除了靜態導出配置，支持 API 路由
- ✅ 修復了構建時的 API 路由問題
- ✅ 刪除了有問題的測試頁面
- ✅ 構建成功，所有頁面正常生成

---

**注意**: 現在使用標準 Next.js 配置，支持所有動態功能包括 API 路由。 