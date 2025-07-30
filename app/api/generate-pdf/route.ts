import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

// ResumeCraft 專用 PDF 產生 API
// Vercel 優化版本

export async function POST(request: NextRequest) {
  console.log('🚀 PDF 生成開始...')
  
  try {
    const { html, filename = 'resume.pdf' } = await request.json()

    if (!html) {
      console.error('❌ HTML 內容為空')
      return NextResponse.json(
        { error: 'HTML 內容為必填欄位' },
        { status: 400 }
      )
    }

    console.log('📋 準備啟動 Puppeteer...')

    // Vercel 環境優化的 Puppeteer 配置
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

    console.log('✅ Puppeteer 啟動成功')

    try {
      const page = await browser.newPage()
      console.log('📄 新頁面創建成功')

      // 設置視口大小
      await page.setViewport({
        width: 794, // A4 寬度 (72 DPI)
        height: 1123, // A4 高度 (72 DPI)
        deviceScaleFactor: 2, // 提高解析度
      })

      // 設置用戶代理（避免某些網站檢測）
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

      console.log('📝 載入 HTML 內容...')
      
      // 載入 HTML 內容
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      })

      console.log('🎨 添加 PDF 優化樣式...')

      // 添加 PDF 優化樣式
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
          
          /* Vercel 環境特定優化 */
          @media print {
            * { 
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        `
      })

      console.log('⏳ 等待內容完全載入...')
      
      // 等待內容完全載入
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('📄 開始生成 PDF...')

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
        preferCSSPageSize: false,
        scale: 1.0,
        timeout: 20000, // 20秒超時
      })

      console.log(`✅ PDF 生成成功！大小: ${pdf.length} bytes`)

      // 回傳 PDF Blob
      return new NextResponse(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      })
    } finally {
      console.log('🧹 清理瀏覽器資源...')
      await browser.close()
      console.log('✅ 瀏覽器資源清理完成')
    }
  } catch (error) {
    console.error('❌ PDF 生成錯誤:', error)
    
    // 詳細錯誤信息
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error('錯誤詳情:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL,
    })
    
    return NextResponse.json(
      { 
        error: 'PDF 生成失敗，請稍後再試',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
