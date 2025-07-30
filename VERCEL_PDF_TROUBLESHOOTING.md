# Vercel PDF 故障排除指南

## 🚨 問題描述
本地環境 (`http://localhost:3000/`) PDF 匯出正常，但 Vercel 部署後顯示 PDF 產出失敗。

## 🔍 常見原因和解決方案

### 1. **Puppeteer 啟動問題**

#### 問題症狀：
- 函數執行超時
- Puppeteer 無法啟動
- 瀏覽器進程失敗

#### 解決方案：
```typescript
// 優化的 Puppeteer 配置
const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor',
    '--disable-extensions',
    '--disable-plugins',
    '--disable-images',
    '--disable-javascript',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--disable-field-trial-config',
    '--disable-ipc-flooding-protection',
    '--memory-pressure-off',
    '--max_old_space_size=4096'
  ],
  timeout: 25000, // 25秒超時（Vercel 限制 30秒）
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
})
```

### 2. **函數執行時間限制**

#### 問題症狀：
- 函數執行超過 30 秒
- 請求被中斷

#### 解決方案：
```json
// vercel.json
{
  "functions": {
    "app/api/generate-pdf/route.ts": {
      "maxDuration": 30,
      "memory": 3008
    }
  }
}
```

### 3. **記憶體不足**

#### 問題症狀：
- 函數崩潰
- 瀏覽器無法啟動

#### 解決方案：
- 增加函數記憶體限制
- 優化 HTML 內容大小
- 減少並發請求

### 4. **CORS 問題**

#### 問題症狀：
- 瀏覽器阻止請求
- 跨域錯誤

#### 解決方案：
```json
// vercel.json
{
  "headers": [
    {
      "source": "/api/generate-pdf",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "POST, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        }
      ]
    }
  ]
}
```

## 🛠️ 診斷步驟

### 1. 檢查 Vercel 函數日誌
```bash
# 在 Vercel 控制台查看函數日誌
# 路徑: Dashboard > 專案 > Functions > generate-pdf > Logs
```

### 2. 測試 API 端點
```bash
# 使用 curl 測試
curl -X POST https://your-site.vercel.app/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"html":"<html><body><h1>Test</h1></body></html>","filename":"test.pdf"}'
```

### 3. 檢查環境變數
確保以下環境變數已設置：
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`
- `NODE_ENV=production`

## 🔧 優化建議

### 1. **減少 HTML 大小**
```typescript
// 移除不必要的樣式和腳本
const cleanHtml = html.replace(/<script[^>]*>.*?<\/script>/gs, '')
                     .replace(/<style[^>]*>.*?<\/style>/gs, '')
```

### 2. **使用緩存**
```typescript
// 緩存生成的 PDF
const cacheKey = `pdf_${hash(html)}`
const cachedPdf = await getFromCache(cacheKey)
if (cachedPdf) return cachedPdf
```

### 3. **錯誤處理**
```typescript
try {
  // PDF 生成邏輯
} catch (error) {
  console.error('PDF 生成錯誤:', error)
  
  // 詳細錯誤信息
  const errorMessage = error instanceof Error ? error.message : '未知錯誤'
  
  return NextResponse.json(
    { 
      error: 'PDF 生成失敗，請稍後再試',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}
```

## 📊 性能監控

### 1. **函數執行時間**
- 目標：< 25 秒
- 監控：Vercel Analytics

### 2. **記憶體使用**
- 目標：< 3GB
- 監控：Vercel Functions 日誌

### 3. **成功率**
- 目標：> 95%
- 監控：錯誤率和重試次數

## 🚀 部署檢查清單

- [ ] 更新 `vercel.json` 配置
- [ ] 設置環境變數
- [ ] 測試 API 端點
- [ ] 檢查函數日誌
- [ ] 驗證 CORS 設置
- [ ] 監控性能指標

## 📞 支援

如果問題持續存在：
1. 檢查 Vercel 函數日誌
2. 查看錯誤詳情
3. 聯繫 Vercel 支援
4. 考慮使用備用 PDF 生成方案

---

**注意**: Vercel 的無伺服器環境與本地環境不同，需要特定的優化和配置。 