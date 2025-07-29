import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

// ResumeCraft 專用 PDF 產生 API
// 僅使用 Puppeteer 於後端產生高品質 PDF
// 前端需傳送完整 HTML（含 head、CSS、resume-preview 區塊）

export async function POST(request: NextRequest) {
  try {
    const { html, filename = 'resume.pdf' } = await request.json()

    if (!html) {
      return NextResponse.json(
        { error: 'HTML 內容為必填欄位' },
        { status: 400 }
      )
    }

    // 啟動 Puppeteer 無頭瀏覽器
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()

    // 載入完整 HTML，等待所有資源載入
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    // 設定頁面大小和視窗大小
    await page.setViewport({
      width: 794, // A4 寬度 (72 DPI)
      height: 1123, // A4 高度 (72 DPI)
      deviceScaleFactor: 2, // 提高解析度
    })

    // 強制覆蓋 resume-preview 及全域 overflow/height，避免內容被截斷
    await page.addStyleTag({
      content: `
        #resume-preview, .resume-preview {
          overflow: visible !important;
          height: auto !important;
          max-height: none !important;
          background: transparent !important;
        }
        html, body {
          overflow: visible !important;
          height: auto !important;
          max-height: none !important;
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* 確保所有文字在 PDF 中清晰可見 */
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
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
        }
        
        /* 修復特定模板的樣式 */
        .absolute { position: relative !important; }
        .fixed { position: relative !important; }
        
        /* 確保顏色正確顯示 */
        .text-white { color: #000 !important; }
        .bg-white { background: transparent !important; }
        
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
        
        /* 確保間距正確 */
        .p-6 { padding: 1.5rem !important; }
        .p-4 { padding: 1rem !important; }
        .p-8 { padding: 2rem !important; }
        .mb-6 { margin-bottom: 1.5rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-8 { margin-bottom: 2rem !important; }
      `
    })

    // 等待內容完全載入
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 產生高品質 PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      preferCSSPageSize: false, // 使用固定 A4 格式
      scale: 1.0, // 確保 1:1 比例
    })

    await browser.close()

    // 回傳 PDF Blob
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'PDF 生成失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
