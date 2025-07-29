# QuestPDF API - 現代化PDF生成服務

## 🚀 概述

QuestPDF API 是一個基於 QuestPDF 庫的高性能 PDF 生成服務，專為 ResumeCraft 項目設計。QuestPDF 是一個開源、免費的 C# PDF 生成庫，提供卓越的性能和品質。

## ✨ 主要特性

- **🎯 開源免費**: 基於 MIT 授權，無需付費
- **⚡ 高性能**: 比 IronPDF 更快的生成速度
- **🪶 輕量級**: 更少的記憶體使用和依賴
- **🎨 現代化API**: 聲明式、強類型的設計
- **🌏 中文支援**: 完整的中文字體支援
- **📱 響應式**: 支援多種紙張大小和方向
- **🎭 自定義樣式**: 豐富的樣式配置選項

## 🏗️ 技術架構

- **.NET 8.0**: 最新的 .NET 框架
- **QuestPDF**: 核心 PDF 生成引擎
- **ASP.NET Core**: Web API 框架
- **Swagger**: API 文檔和測試

## 📁 項目結構

```
QuestPdfApi/
├── Controllers/
│   └── PdfController.cs          # API 控制器
├── Models/
│   └── PdfRequest.cs             # 請求/響應模型
├── Services/
│   ├── IPdfService.cs            # 服務接口
│   └── QuestPdfService.cs        # QuestPDF 服務實現
├── Program.cs                    # 應用程序入口
└── README.md                     # 項目文檔
```

## 🚀 快速開始

### 1. 啟動服務

```bash
cd QuestPdfApi
dotnet run
```

服務將在 `http://localhost:5000` 啟動。

### 2. 測試服務

訪問 Swagger UI: `http://localhost:5000/swagger`

### 3. 健康檢查

```bash
curl http://localhost:5000/api/pdf/health
```

## 📚 API 端點

### 生成 PDF

#### POST `/api/pdf/generate`
生成 PDF 文檔並直接下載

**請求體:**
```json
{
  "html": "<html>...</html>",
  "filename": "resume.pdf",
  "config": {
    "paperSize": "A4",
    "orientation": "Portrait",
    "marginTop": 20,
    "marginBottom": 20,
    "marginLeft": 20,
    "marginRight": 20,
    "enableHeader": false,
    "enableFooter": false,
    "headerText": "頁眉文字",
    "footerText": "頁腳文字",
    "fontFamily": "Microsoft YaHei",
    "fontSize": 12,
    "enablePageNumbers": false
  },
  "styles": {
    "removeShadows": true,
    "removeBorders": false,
    "removeRoundedCorners": true,
    "removeAnimations": true,
    "flattenBackgrounds": true,
    "convertToGrayscale": false,
    "backgroundColor": "#ffffff",
    "textColor": "#000000",
    "primaryFont": "Microsoft YaHei",
    "fallbackFont": "Arial"
  }
}
```

#### POST `/api/pdf/generate-detailed`
生成 PDF 並返回詳細響應

**響應:**
```json
{
  "success": true,
  "message": "PDF generated successfully",
  "pdfData": "base64_encoded_pdf_data",
  "fileSize": 12345,
  "generationTime": "00:00:01.234",
  "generatedAt": "2024-01-01T12:00:00Z"
}
```

### 驗證 HTML

#### POST `/api/pdf/validate-html`
驗證 HTML 內容的有效性

**請求體:**
```json
{
  "html": "<html>...</html>"
}
```

### 服務信息

#### GET `/api/pdf/health`
獲取服務健康狀態

#### GET `/api/pdf/info`
獲取服務詳細信息

#### GET `/api/pdf/config/default`
獲取默認 PDF 配置

#### GET `/api/pdf/styles/default`
獲取默認樣式配置

#### GET `/api/pdf/test`
測試端點，返回示例請求

## 🎨 配置選項

### PDF 配置 (PdfConfig)

| 屬性 | 類型 | 默認值 | 描述 |
|------|------|--------|------|
| `paperSize` | string | "A4" | 紙張大小 (A3, A4, A5, LETTER, LEGAL) |
| `orientation` | string | "Portrait" | 方向 (Portrait, Landscape) |
| `marginTop` | float | 20 | 上邊距 (mm) |
| `marginBottom` | float | 20 | 下邊距 (mm) |
| `marginLeft` | float | 20 | 左邊距 (mm) |
| `marginRight` | float | 20 | 右邊距 (mm) |
| `enableHeader` | bool | false | 是否啟用頁眉 |
| `enableFooter` | bool | false | 是否啟用頁腳 |
| `headerText` | string | null | 頁眉文字 |
| `footerText` | string | null | 頁腳文字 |
| `fontFamily` | string | "Microsoft YaHei" | 字體族 |
| `fontSize` | float | 12 | 字體大小 |
| `enablePageNumbers` | bool | false | 是否啟用頁碼 |

### 樣式配置 (StyleConfig)

| 屬性 | 類型 | 默認值 | 描述 |
|------|------|--------|------|
| `removeShadows` | bool | true | 移除陰影效果 |
| `removeBorders` | bool | false | 移除邊框 |
| `removeRoundedCorners` | bool | true | 移除圓角 |
| `removeAnimations` | bool | true | 移除動畫 |
| `flattenBackgrounds` | bool | true | 扁平化背景 |
| `convertToGrayscale` | bool | false | 轉為灰度 |
| `backgroundColor` | string | null | 背景顏色 |
| `textColor` | string | null | 文字顏色 |
| `primaryFont` | string | "Microsoft YaHei" | 主要字體 |
| `fallbackFont` | string | "Arial" | 備用字體 |

## 🔧 開發指南

### 添加新的紙張大小

在 `QuestPdfService.cs` 的 `ConfigurePage` 方法中添加：

```csharp
case "CUSTOM":
    page.Size(PageSizes.Custom(width, height));
    break;
```

### 自定義樣式處理

在 `ApplyFlatteningStyles` 方法中添加新的樣式處理邏輯：

```csharp
// 自定義樣式處理
if (styles.CustomStyle)
{
    processedHtml = Regex.Replace(processedHtml, @"custom-property:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
}
```

### 擴展服務功能

1. 在 `IPdfService` 接口中添加新方法
2. 在 `QuestPdfService` 中實現方法
3. 在 `PdfController` 中添加對應的端點

## 🚀 性能優化

### 1. 記憶體管理
- QuestPDF 使用流式處理，減少記憶體使用
- 自動垃圾回收優化

### 2. 並發處理
- 服務註冊為 Scoped，支援並發請求
- 異步處理提高響應速度

### 3. 快取策略
- 可考慮添加配置快取
- 字體快取優化

## 🔒 安全考慮

### 1. 輸入驗證
- HTML 內容驗證
- 文件大小限制
- 惡意代碼檢測

### 2. 訪問控制
- CORS 配置
- 身份驗證（可選）
- 速率限制（可選）

## 📊 監控和日誌

### 1. 性能監控
- 生成時間追蹤
- 文件大小統計
- 錯誤率監控

### 2. 日誌記錄
- 請求日誌
- 錯誤日誌
- 性能指標

## 🚀 部署

### 1. 本地部署
```bash
dotnet publish -c Release
dotnet QuestPdfApi.dll
```

### 2. Docker 部署
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY bin/Release/net8.0/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "QuestPdfApi.dll"]
```

### 3. 雲端部署
- Azure App Service
- AWS Lambda
- Google Cloud Run

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License - 詳見 LICENSE 文件

## 🔗 相關鏈接

- [QuestPDF 官方文檔](https://www.questpdf.com/)
- [QuestPDF GitHub](https://github.com/QuestPDF/QuestPDF)
- [ASP.NET Core 文檔](https://docs.microsoft.com/en-us/aspnet/core/) 