# PDF 匯出故障排除指南

## 問題診斷

### 1. "Failed to fetch" 錯誤

**症狀**：
- 匯出PDF時出現"Failed to fetch"錯誤
- 瀏覽器控制台顯示"CONNECTION REFUSED"
- 錯誤指向 `:5000/generate-pdf`

**原因**：
- 應用程式嘗試連接到C#後端服務（localhost:5000）
- 但該服務沒有運行或無法訪問

**解決方案**：

#### 方案A：使用內建的Node.js PDF生成器（推薦）

1. **確認環境變數設定**：
   ```bash
   # 在專案根目錄創建 .env.local 檔案
   NEXT_PUBLIC_USE_BACKEND_PDF=false
   ```

2. **重新啟動開發伺服器**：
   ```bash
   npm run dev
   ```

3. **測試PDF匯出**：
   - 訪問 `/pdf-test-simple` 頁面
   - 點擊「匯出 PDF」按鈕
   - 檢查是否成功下載PDF

#### 方案B：啟動C#後端服務

如果您有C#後端服務：

1. **啟動C#服務**：
   ```bash
   # 在C#專案目錄中
   dotnet run
   ```

2. **設定環境變數**：
   ```bash
   NEXT_PUBLIC_USE_BACKEND_PDF=true
   NEXT_PUBLIC_CSHARP_PDF_API=http://localhost:5000/generate-pdf
   ```

3. **重新啟動Next.js開發伺服器**：
   ```bash
   npm run dev
   ```

### 2. 其他常見錯誤

#### "找不到履歷預覽元素"

**症狀**：
- 錯誤訊息：找不到履歷預覽元素 (#resume-preview)

**解決方案**：
- 確保頁面中有 `id="resume-preview"` 的元素
- 檢查模板組件是否正確渲染

#### "PDF生成失敗"

**症狀**：
- 伺服器端錯誤，PDF生成失敗

**解決方案**：
1. **檢查Puppeteer安裝**：
   ```bash
   npm install puppeteer
   ```

2. **檢查伺服器日誌**：
   - 查看終端機中的錯誤訊息
   - 檢查瀏覽器開發者工具的Network標籤

3. **重新啟動開發伺服器**：
   ```bash
   npm run dev
   ```

## 測試步驟

### 1. 基本功能測試

1. **訪問測試頁面**：
   ```
   http://localhost:3000/pdf-test-simple
   ```

2. **檢查預覽**：
   - 確認履歷內容正確顯示
   - 確認沒有JavaScript錯誤

3. **測試匯出**：
   - 點擊「匯出 PDF」按鈕
   - 等待匯出完成
   - 檢查下載的PDF檔案

### 2. 進階功能測試

1. **訪問一致性測試頁面**：
   ```
   http://localhost:3000/pdf-consistency-test
   ```

2. **測試所有模板**：
   - 切換不同模板
   - 測試每個模板的PDF匯出
   - 檢查平面化效果

## 環境檢查清單

### 開發環境

- [ ] Node.js 版本 >= 16
- [ ] npm 或 yarn 已安裝
- [ ] 所有依賴已安裝：`npm install`
- [ ] 開發伺服器正常運行：`npm run dev`
- [ ] 沒有端口衝突

### 依賴檢查

- [ ] puppeteer 已安裝
- [ ] html2canvas 已安裝
- [ ] jspdf 已安裝

### 檔案檢查

- [ ] `/app/api/generate-pdf/route.ts` 存在
- [ ] `/hooks/useResumeExport.ts` 存在
- [ ] `/styles/pdf-export.css` 存在

## 性能優化

### 1. 減少PDF生成時間

- 使用較小的圖片
- 減少複雜的CSS動畫
- 優化字體載入

### 2. 提高PDF品質

- 確保高解析度設定
- 使用適當的字體
- 檢查顏色對比度

## 常見問題FAQ

### Q: 為什麼PDF中的文字模糊？

**A**: 檢查字體設定和解析度設定，確保使用高品質字體。

### Q: 為什麼PDF中的顏色不正確？

**A**: 確保CSS中使用了 `-webkit-print-color-adjust: exact`。

### Q: 為什麼PDF中的佈局錯亂？

**A**: 檢查響應式設計設定，確保所有佈局類別正確應用。

### Q: 為什麼PDF生成很慢？

**A**: 檢查圖片大小和數量，考慮優化圖片或使用較小的圖片。

## 聯絡支援

如果以上解決方案都無法解決問題，請：

1. **收集錯誤資訊**：
   - 瀏覽器控制台錯誤
   - 伺服器端錯誤日誌
   - 網路請求狀態

2. **提供環境資訊**：
   - 作業系統版本
   - Node.js版本
   - 瀏覽器版本

3. **重現步驟**：
   - 詳細的操作步驟
   - 預期的結果
   - 實際的結果 