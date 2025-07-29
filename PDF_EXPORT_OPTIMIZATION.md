# PDF 匯出平面化優化

## 概述

本次更新針對專案中的多樣化模板進行了全面的PDF匯出平面化處理，確保所有模板（Template A-F）都能穩定且一致地匯出PDF檔案。

## 問題描述

原本的PDF匯出功能主要針對經典模板（Template A）進行了優化，但對於其他更複雜的模板（如Template B、C、D、E、F等）存在以下問題：

- 樣式衝突和渲染問題
- 陰影、邊框、圓角等視覺效果在PDF中顯示異常
- 複雜的佈局和定位問題
- 顏色主題不一致
- 響應式設計在PDF中失效

## 解決方案

### 1. 改進 PDF 生成器 (`lib/pdfGenerator.ts`)

- **全面樣式重置**：移除所有陰影、邊框、圓角等視覺效果
- **定位修復**：將絕對定位和固定定位轉換為相對定位
- **背景色處理**：保留主題色，移除裝飾性背景
- **文字顏色優化**：確保所有文字顏色在PDF中正確顯示
- **佈局修復**：確保網格和flex佈局正確工作

### 2. 更新匯出 Hook (`hooks/useResumeExport.ts`)

- **樣式平面化**：與PDF生成器保持一致的樣式處理
- **HTML清理**：移除可能導致渲染問題的CSS類別
- **響應式修復**：確保所有響應式設計在PDF中正確工作

### 3. 專用PDF樣式檔案 (`styles/pdf-export.css`)

- **基礎重置**：統一的樣式重置規則
- **模板特定處理**：針對不同模板的特殊樣式處理
- **顏色主題支援**：完整的顏色主題支援
- **字體和間距**：確保字體大小和間距正確

## 支援的模板

### Template A - 經典模板
- 簡潔的單欄佈局
- 基本的顏色主題支援
- 穩定的PDF匯出

### Template B - 側邊欄模板
- 雙欄佈局（主內容 + 側邊欄）
- 側邊欄背景色處理
- 響應式網格修復

### Template C - 現代模板
- 左邊框裝飾元素
- 圓點裝飾處理
- 現代化間距和字體

### Template D - 創意模板
- 複雜的頭部設計
- 裝飾性幾何元素
- 漸變背景處理

### Template E - 專業模板
- 表格式聯絡資訊
- 卡片式經驗展示
- 專業色彩搭配

### Template F - 技術模板
- 終端機風格設計
- 程式碼區塊樣式
- 等寬字體支援

## 平面化處理規則

### 移除的視覺效果
- 所有陰影 (`box-shadow`)
- 所有邊框 (`border`)
- 所有圓角 (`border-radius`)
- 所有外框 (`outline`)
- 所有 ring 效果
- 所有漸變背景
- 所有透明度效果
- 所有動畫和過渡效果

### 保留的重要樣式
- 主題顏色（藍、綠、紫、灰、紅）
- 字體大小和粗細
- 間距和佈局
- 文字對齊
- 列表樣式
- 表格樣式

### 修復的佈局問題
- 絕對定位轉相對定位
- 網格列設定修復
- Flex 佈局修復
- 響應式設計修復
- 文字截斷處理

## 測試頁面

新增了 `/pdf-consistency-test` 測試頁面，提供：

- 所有模板的即時預覽
- 一鍵PDF匯出測試
- 模板切換功能
- 錯誤提示和狀態顯示

## 使用方法

1. 訪問 `/pdf-consistency-test` 頁面
2. 選擇要測試的模板
3. 點擊「匯出 Template X PDF」按鈕
4. 檢查生成的PDF檔案
5. 驗證平面化效果是否正確

## 技術細節

### CSS 選擇器優化
使用高效的CSS選擇器來確保樣式覆蓋：
```css
/* 移除所有視覺效果 */
* {
  box-shadow: none !important;
  border-radius: 0 !important;
  /* ... */
}

/* 特定類別處理 */
[class*='bg-'] { background-color: transparent !important; }
[class*='border'] { border: none !important; }
[class*='shadow'] { box-shadow: none !important; }
```

### 響應式設計處理
確保所有響應式類別在PDF中正確工作：
```css
.lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
.md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
```

### 字體處理
確保所有字體在PDF中正確顯示：
```css
* {
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif !important;
}
```

## 注意事項

1. **字體依賴**：PDF生成依賴於系統字體，建議使用常見字體
2. **圖片處理**：確保圖片URL可訪問，否則可能顯示為空白
3. **內容長度**：過長的內容會自動分頁
4. **瀏覽器相容性**：建議使用現代瀏覽器進行PDF匯出

## 未來改進

- 支援更多字體選項
- 優化圖片處理
- 增加PDF品質設定
- 支援自定義頁面大小
- 增加水印功能

## 相關檔案

- `lib/pdfGenerator.ts` - PDF生成核心邏輯
- `hooks/useResumeExport.ts` - PDF匯出Hook
- `styles/pdf-export.css` - PDF專用樣式
- `app/pdf-consistency-test/page.tsx` - 測試頁面
- `components/ResumeTemplates/` - 所有模板組件 