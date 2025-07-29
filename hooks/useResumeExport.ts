import { useState } from 'react'

const USE_CSHARP_PDF = process.env.NEXT_PUBLIC_USE_BACKEND_PDF === 'true'
const CSHARP_PDF_API = process.env.NEXT_PUBLIC_CSHARP_PDF_API || 'http://localhost:5000/generate-pdf'
const NODE_PDF_API = '/api/generate-pdf'

interface ExportOptions {
  filename?: string
}

interface ExportState {
  isExporting: boolean
  progress: number
  error: string | null
}

// 取得所有 <link rel="stylesheet"> 指向的 CSS 內容，合併進 <style>
async function getAllStylesAsString(): Promise<string> {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[]
  let css = ''
  for (const link of links) {
    try {
      const res = await fetch(link.href)
      if (res.ok) {
        css += await res.text() + '\n'
      }
    } catch (e) {
      // 忽略無法取得的 CSS
    }
  }
  // 也可加載 <style> 內容
  const styleTags = Array.from(document.querySelectorAll('style')) as HTMLStyleElement[]
  for (const styleTag of styleTags) {
    css += styleTag.innerHTML + '\n'
  }
  return css
}

// 組合完整 HTML，內嵌所有 CSS
async function getFullHtmlForExport(targetElement: HTMLElement): Promise<string> {
  const headHtml = document.head.innerHTML
  const previewHtml = targetElement.outerHTML
  const allCss = await getAllStylesAsString()
  
  // 移除所有邊框和陰影相關的 class，但保留必要的樣式
  const cleanHtml = previewHtml
    .replace(/shadow-material/g, '')
    .replace(/shadow-[a-z-]+/g, '')
    .replace(/ring-[a-z-]+/g, '')
    .replace(/outline-[a-z-]+/g, '')
    .replace(/border-[a-z-]+/g, '')
    .replace(/rounded-[a-z-]+/g, '')
    .replace(/bg-gray-[0-9]+/g, 'bg-white')
    .replace(/overflow-hidden/g, '')
    .replace(/overflow-auto/g, '')
    .replace(/overflow-scroll/g, '')
  
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${headHtml}
<style>
${allCss}

/* 載入 PDF 專用樣式 */
@import url('/styles/pdf-export.css');

/* 額外的 PDF 優化 */
body { 
  background: transparent !important; 
  margin: 0 !important; 
  padding: 0 !important; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  line-height: 1.5 !important;
  color: #000 !important;
}

#resume-preview, .resume-preview { 
  overflow: visible !important; 
  height: auto !important; 
  max-height: none !important; 
  background: transparent !important; 
  padding: 0 !important; 
  margin: 0 !important; 
  box-shadow: none !important;
  border: none !important;
  border-width: 0 !important;
  border-style: none !important;
  border-color: transparent !important;
  outline: none !important;
  outline-width: 0 !important;
  outline-style: none !important;
  outline-color: transparent !important;
}

/* 確保所有元素在 PDF 中正確顯示 */
* { 
  box-shadow: none !important; 
  filter: none !important; 
  outline: none !important; 
  outline-width: 0 !important;
  outline-style: none !important;
  outline-color: transparent !important;
  border: none !important;
  border-width: 0 !important;
  border-style: none !important;
  border-color: transparent !important;
  background: transparent !important;
}

/* 移除所有背景色 */
[class*='bg-'] {
  background: transparent !important;
  background-color: transparent !important;
}

/* 移除所有邊框和外框 */
[class*='border'] {
  border: none !important;
  border-width: 0 !important;
  border-style: none !important;
  border-color: transparent !important;
}

[class*='outline'] {
  outline: none !important;
  outline-width: 0 !important;
  outline-style: none !important;
  outline-color: transparent !important;
}

[class*='shadow'] {
  box-shadow: none !important;
  filter: none !important;
}

[class*='ring'] {
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
  border-width: 0 !important;
  border-style: none !important;
  border-color: transparent !important;
}

[class*='rounded'] {
  border-radius: 0 !important;
}

/* 修復特定模板的樣式 */
.absolute, .fixed { position: relative !important; }

/* 確保文字顏色正確 */
.text-white { color: #000 !important; }
.text-gray-900, .text-gray-800, .text-gray-700, .text-gray-600, .text-gray-500, .text-gray-400 { color: #000 !important; }

/* 確保背景色正確 */
.bg-white { background: transparent !important; }
.bg-gray-50 { background: transparent !important; }
.bg-gray-100 { background: transparent !important; }

/* 修復網格佈局 */
.grid { display: grid !important; }
.flex { display: flex !important; }
.block { display: block !important; }
.inline-block { display: inline-block !important; }

/* 確保間距正確 */
.p-6 { padding: 1.5rem !important; }
.p-4 { padding: 1rem !important; }
.p-8 { padding: 2rem !important; }
.p-12 { padding: 3rem !important; }
.mb-6 { margin-bottom: 1.5rem !important; }
.mb-4 { margin-bottom: 1rem !important; }
.mb-8 { margin-bottom: 2rem !important; }
.mb-12 { margin-bottom: 3rem !important; }
.space-y-6 > * + * { margin-top: 1.5rem !important; }
.space-y-4 > * + * { margin-top: 1rem !important; }
.space-y-8 > * + * { margin-top: 2rem !important; }

/* 確保字體大小正確 */
.text-4xl { font-size: 2.25rem !important; line-height: 1.2 !important; }
.text-3xl { font-size: 1.875rem !important; line-height: 1.3 !important; }
.text-2xl { font-size: 1.5rem !important; line-height: 1.4 !important; }
.text-xl { font-size: 1.25rem !important; line-height: 1.4 !important; }
.text-lg { font-size: 1.125rem !important; line-height: 1.5 !important; }
.text-base { font-size: 1rem !important; line-height: 1.5 !important; }
.text-sm { font-size: 0.875rem !important; line-height: 1.6 !important; }

/* 確保字體粗細正確 */
.font-bold { font-weight: 700 !important; }
.font-semibold { font-weight: 600 !important; }
.font-medium { font-weight: 500 !important; }
.font-light { font-weight: 300 !important; }

/* 修復特定模板的顏色主題 */
.text-blue-600 { color: #2563eb !important; }
.text-green-600 { color: #16a34a !important; }
.text-purple-600 { color: #9333ea !important; }
.text-gray-600 { color: #4b5563 !important; }
.text-red-600 { color: #dc2626 !important; }

.bg-blue-600 { background-color: #2563eb !important; }
.bg-green-600 { background-color: #16a34a !important; }
.bg-purple-600 { background-color: #9333ea !important; }
.bg-gray-600 { background-color: #4b5563 !important; }
.bg-red-600 { background-color: #dc2626 !important; }

.bg-blue-50 { background-color: transparent !important; }
.bg-green-50 { background-color: transparent !important; }
.bg-purple-50 { background-color: transparent !important; }
.bg-gray-50 { background-color: transparent !important; }
.bg-red-50 { background-color: transparent !important; }

/* 確保列表樣式正確 */
.list-disc { list-style-type: disc !important; }
.list-inside { list-style-position: inside !important; }
ul, ol { margin: 0.5rem 0 !important; padding-left: 1.5rem !important; }
li { margin: 0.25rem 0 !important; }

/* 修復表格樣式 */
table { border-collapse: collapse !important; width: 100% !important; }
td, th { padding: 0.5rem !important; text-align: left !important; vertical-align: top !important; }

/* 確保圖片正確顯示 */
img { max-width: 100% !important; height: auto !important; display: block !important; }

/* 修復特定模板的裝飾元素 */
.w-2, .w-3, .w-4, .w-5, .w-6, .w-8 { width: auto !important; }
.h-1, .h-2, .h-3, .h-4, .h-5, .h-6, .h-8 { height: auto !important; }

/* 修復網格列設定 */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
.lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
.lg\\:col-span-2 { grid-column: span 2 / span 2 !important; }
.lg\\:col-span-1 { grid-column: span 1 / span 1 !important; }

/* 修復 flex 佈局 */
.flex-wrap { flex-wrap: wrap !important; }
.items-center { align-items: center !important; }
.items-start { align-items: flex-start !important; }
.justify-between { justify-content: space-between !important; }
.justify-center { justify-content: center !important; }
.space-x-2 > * + * { margin-left: 0.5rem !important; }
.space-x-3 > * + * { margin-left: 0.75rem !important; }
.space-x-4 > * + * { margin-left: 1rem !important; }

/* 修復文字對齊 */
.text-left { text-align: left !important; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }

/* 修復文字截斷 */
.truncate { overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }

/* 修復空白處理 */
.whitespace-pre-wrap { white-space: pre-wrap !important; }

/* 修復特定模板的特殊樣式 */
.relative { position: relative !important; }
.overflow-hidden { overflow: visible !important; }
.font-mono { font-family: "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace !important; }

/* 確保響應式設計在 PDF 中正確工作 */
@media print {
  * { 
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body { background: transparent !important; }
  
  /* 確保分頁正確 */
  .resume-section { page-break-inside: avoid !important; }
  
  /* 避免標題在頁面底部 */
  h1, h2, h3, h4, h5, h6 { page-break-after: avoid !important; }
}
</style>
</head>
<body style="background:transparent; margin:0; padding:0;">
${cleanHtml}
</body>
</html>`
}

export const useResumeExport = () => {
  const [exportState, setExportState] = useState<ExportState>({
    isExporting: false,
    progress: 0,
    error: null
  })

  // 呼叫 C# API
  const generateCSharpPDF = async (element: HTMLElement, options: ExportOptions = {}) => {
    const { filename = 'resume.pdf' } = options
    try {
      setExportState({ isExporting: true, progress: 10, error: null })
      const htmlContent = await getFullHtmlForExport(element)
      setExportState(prev => ({ ...prev, progress: 30 }))
      const response = await fetch(CSHARP_PDF_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlContent, filename })
      })
      setExportState(prev => ({ ...prev, progress: 70 }))
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setExportState({ isExporting: false, progress: 100, error: null })
      return { success: true, filename }
    } catch (error) {
      setExportState({ isExporting: false, progress: 0, error: 'PDF生成失敗，請稍後再試' })
      throw error
    }
  }

  // 保留 Node.js Puppeteer 方案（可選）
  const generateNodePDF = async (element: HTMLElement, options: ExportOptions = {}) => {
    const { filename = 'resume.pdf' } = options
    try {
      setExportState({ isExporting: true, progress: 10, error: null })
      const htmlContent = await getFullHtmlForExport(element)
      setExportState(prev => ({ ...prev, progress: 30 }))
      const response = await fetch(NODE_PDF_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: htmlContent, filename })
      })
      setExportState(prev => ({ ...prev, progress: 70 }))
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setExportState({ isExporting: false, progress: 100, error: null })
      return { success: true, filename }
    } catch (error) {
      setExportState({ isExporting: false, progress: 0, error: 'PDF生成失敗，請稍後再試' })
      throw error
    }
  }

  // 匯出主流程
  const exportResume = async (options: ExportOptions = {}) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 0))
      const targetElement = document.querySelector('#resume-preview') as HTMLElement
      if (!targetElement) throw new Error('找不到履歷預覽元素 (#resume-preview)')
      if (USE_CSHARP_PDF) {
        return await generateCSharpPDF(targetElement, options)
      } else {
        return await generateNodePDF(targetElement, options)
      }
    } catch (error) {
      setExportState({ isExporting: false, progress: 0, error: error instanceof Error ? error.message : '匯出失敗' })
      throw error
    }
  }

  const resetExportState = () => setExportState({ isExporting: false, progress: 0, error: null })

  return {
    exportResume,
    exportState,
    resetExportState,
    isExporting: exportState.isExporting,
    progress: exportState.progress,
    error: exportState.error
  }
} 