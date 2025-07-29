# C# PDF 生成設置完成

## 🎉 設置完成

已成功為您的ResumeCraft專案設置了完整的C# PDF生成後端！

## 📁 新增的檔案結構

```
ResumeCraft/
├── ResumeCraftPdfApi/           # C# 後端專案
│   ├── Controllers/
│   │   └── PdfController.cs     # PDF生成控制器
│   ├── Models/
│   │   ├── PdfRequest.cs        # 請求模型
│   │   └── PdfResponse.cs       # 回應模型
│   ├── Services/
│   │   ├── IPdfService.cs       # PDF服務介面
│   │   └── PdfService.cs        # PDF服務實現
│   ├── Program.cs               # 應用程式入口
│   ├── appsettings.json         # 配置文件
│   ├── ResumeCraftPdfApi.csproj # 專案文件
│   └── README.md                # C# API說明
├── start-csharp-api.bat         # Windows啟動腳本
├── start-csharp-api.sh          # Linux/Mac啟動腳本
└── app/csharp-pdf-test/         # C# PDF測試頁面
    └── page.tsx
```

## 🚀 啟動步驟

### 1. 安裝 .NET SDK

首先需要安裝 .NET 8.0 SDK：
- **下載地址**: https://dotnet.microsoft.com/download/dotnet/8.0
- **選擇**: .NET 8.0 SDK (不是 Runtime)

### 2. 啟動 C# API

#### Windows 用戶
```bash
# 雙擊執行
start-csharp-api.bat
```

#### Linux/Mac 用戶
```bash
# 執行腳本
chmod +x start-csharp-api.sh
./start-csharp-api.sh
```

#### 手動啟動
```bash
cd ResumeCraftPdfApi
dotnet restore
dotnet build
dotnet run
```

### 3. 驗證服務

API 啟動後，您可以訪問：
- **API 端點**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger
- **健康檢查**: http://localhost:5000/api/pdf/health

## 🧪 測試功能

### 1. 訪問測試頁面
```
http://localhost:3000/csharp-pdf-test
```

### 2. 測試步驟
1. **檢查 API 狀態**: 點擊「檢查 API 狀態」
2. **測試 C# API**: 點擊「測試 C# API」
3. **完整匯出測試**: 點擊「測試完整 C# PDF 匯出」

## 🔧 技術特色

### C# 後端優勢
- ✅ **高性能**: .NET 8.0 提供優異的性能
- ✅ **穩定可靠**: 企業級框架，生產環境驗證
- ✅ **自動管理**: 自動下載和管理 Chromium
- ✅ **完整文檔**: 內建 Swagger UI 文檔
- ✅ **樣式平面化**: 完整的CSS樣式處理

### PDF 生成功能
- 📄 **高品質輸出**: 2x deviceScaleFactor 高解析度
- 🎨 **樣式平面化**: 自動移除陰影、邊框、圓角
- 📱 **模板支援**: 支援所有履歷模板 (A-F)
- 🔧 **A4 格式**: 標準 A4 紙張格式
- 📊 **邊距控制**: 10mm 標準邊距

## 📋 前端配置

### 已修改的檔案
- `hooks/useResumeExport.ts`: 強制使用C#後端
- `app/csharp-pdf-test/page.tsx`: 新增C#測試頁面

### API 端點
- **PDF生成**: `http://localhost:5000/api/pdf/generate-pdf`
- **健康檢查**: `http://localhost:5000/api/pdf/health`

## 🛠️ 故障排除

### 常見問題

1. **.NET SDK 未安裝**
   ```
   錯誤: dotnet 命令未找到
   解決方案: 安裝 .NET 8.0 SDK
   ```

2. **端口被佔用**
   ```
   錯誤: 端口 5000 已被使用
   解決方案: 修改 appsettings.json 中的端口
   ```

3. **PuppeteerSharp 下載失敗**
   ```
   錯誤: 無法下載 Chromium
   解決方案: 檢查網路連接，首次運行會下載約 200MB
   ```

4. **記憶體不足**
   ```
   錯誤: 記憶體不足
   解決方案: 確保系統有至少 2GB 可用記憶體
   ```

### 日誌查看
C# API 會輸出詳細的日誌：
```
info: ResumeCraftPdfApi.Controllers.PdfController[0]
      開始生成PDF: resume.pdf
info: ResumeCraftPdfApi.Controllers.PdfController[0]
      PDF生成成功: resume.pdf, 大小: 123456 bytes
```

## 📈 性能優化

### 已實施的優化
- 🔄 **資源管理**: 使用 `using` 語句自動釋放資源
- 💾 **Chromium 快取**: 自動快取下載的瀏覽器
- ⚡ **並發處理**: 支援多個並發請求
- 🎯 **記憶體優化**: 高效的記憶體使用

## 🔄 切換回 Node.js

如果您需要切換回 Node.js PDF生成器，請修改 `hooks/useResumeExport.ts`：

```typescript
// 將這行：
return await generateCSharpPDF(targetElement, options)

// 改為：
return await generateNodePDF(targetElement, options)
```

## 📚 相關文檔

- [C# API README](./ResumeCraftPdfApi/README.md)
- [PDF 修復總結](./PDF_FIX_SUMMARY.md)
- [PDF 故障排除](./PDF_TROUBLESHOOTING.md)

## 🎯 下一步

1. **測試所有模板**: 驗證所有履歷模板的PDF生成
2. **性能測試**: 測試並發PDF生成性能
3. **部署準備**: 準備生產環境部署
4. **監控設置**: 添加API監控和日誌

---

**設置完成時間**: 2024年12月
**狀態**: ✅ 已完成
**測試狀態**: 🧪 可測試 