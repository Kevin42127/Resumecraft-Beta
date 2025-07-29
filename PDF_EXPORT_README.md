# PDF 匯出功能說明

## 功能概述

ResumeCraft 提供兩種 PDF 匯出方案：

1. **前端方案**（預設）：使用 `html2canvas` + `jsPDF`
2. **後端方案**：使用 `Puppeteer` 進行高品質 PDF 生成

## 技術架構

### 核心 Hook：`useResumeExport`

```typescript
const { 
  exportResume, 
  isExporting, 
  progress, 
  error, 
  resetExportState 
} = useResumeExport()
```

### 配置方式

在 `key.env` 文件中設置：

```env
# 設為 true 使用後端 PDF 生成（Puppeteer）
# 設為 false 使用前端 PDF 生成（html2canvas + jsPDF）
NEXT_PUBLIC_USE_BACKEND_PDF=false
```

## 使用方式

### 1. 基本使用

```typescript
import { useResumeExport } from '@/hooks/useResumeExport'

const { exportResume, isExporting, progress, error } = useResumeExport()

const handleExport = async () => {
  try {
    await exportResume({ filename: 'resume.pdf' })
    console.log('PDF 匯出成功！')
  } catch (error) {
    console.error('匯出失敗:', error)
  }
}
```

### 2. 進階選項

```typescript
await exportResume({
  filename: 'my-resume.pdf',
  quality: 1.0,    // 圖片品質 (0-1)
  scale: 2         // 解析度倍數
})
```

## 功能特點

### 前端方案優勢
- ✅ **即時匯出**：無需等待伺服器
- ✅ **離線可用**：完全在瀏覽器中處理
- ✅ **開發友好**：便於測試和除錯
- ✅ **成本低廉**：無需額外伺服器資源

### 後端方案優勢
- ✅ **高品質輸出**：Puppeteer 提供更精確的渲染
- ✅ **完整樣式支援**：支援所有 CSS 特性
- ✅ **字體完整**：伺服器端字體支援更完整
- ✅ **穩定可靠**：不受瀏覽器限制

## 目標元素

PDF 匯出會自動尋找 `#resume-preview` 元素：

```html
<div id="resume-preview" className="flex-1 overflow-auto bg-gray-100 p-6">
  <div className="max-w-4xl mx-auto">
    <div className="resume-preview bg-white shadow-material">
      <!-- 履歷內容 -->
    </div>
  </div>
</div>
```

## 進度追蹤

Hook 提供完整的進度追蹤：

```typescript
// 匯出狀態
{
  isExporting: boolean    // 是否正在匯出
  progress: number        // 進度百分比 (0-100)
  error: string | null    // 錯誤訊息
}
```

## 錯誤處理

### 自動錯誤提示
- 使用 `ExportErrorModal` 組件顯示錯誤
- 支援重試功能
- 自動重置狀態

### 常見錯誤
1. **找不到目標元素**：確保 `#resume-preview` 存在
2. **樣式載入失敗**：檢查 CSS 注入是否正常
3. **記憶體不足**：降低 `scale` 參數
4. **網路錯誤**：後端方案時檢查 API 連線

## 開發建議

### 開發階段
- 使用前端方案（`NEXT_PUBLIC_USE_BACKEND_PDF=false`）
- 便於快速測試和除錯
- 無需額外伺服器配置

### 正式部署
- 考慮切換到後端方案（`NEXT_PUBLIC_USE_BACKEND_PDF=true`）
- 提供更高品質的 PDF 輸出
- 確保伺服器有足夠資源運行 Puppeteer

## API 端點

### 後端 PDF 生成 API

**端點**：`POST /api/generate-pdf`

**請求格式**：
```json
{
  "html": "<完整的HTML內容>",
  "filename": "resume.pdf"
}
```

**回應**：
- 成功：PDF 檔案（`application/pdf`）
- 失敗：JSON 錯誤訊息

## 檔案結構

```
hooks/
  └── useResumeExport.ts          # 主要 Hook
components/
  ├── Header.tsx                  # 匯出按鈕
  ├── PreviewPanel.tsx           # 預覽面板（含 #resume-preview）
  └── ExportErrorModal.tsx       # 錯誤提示
app/api/
  └── generate-pdf/
      └── route.ts               # 後端 PDF API
```

## 未來擴展

1. **多頁支援**：改進分頁處理邏輯
2. **自訂模板**：支援更多 PDF 格式
3. **批次匯出**：支援多個履歷同時匯出
4. **雲端儲存**：整合雲端 PDF 儲存功能 