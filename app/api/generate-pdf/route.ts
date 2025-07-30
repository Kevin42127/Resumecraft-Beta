import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

// Vercel 優化的簡化 PDF 生成 API
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

    console.log('📋 啟動 Puppeteer...')

    // 極簡化的 Puppeteer 配置
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-images',
        '--disable-javascript',
        '--memory-pressure-off'
      ],
      timeout: 20000, // 20秒超時
    })

    console.log('✅ Puppeteer 啟動成功')

    try {
      const page = await browser.newPage()
      console.log('📄 頁面創建成功')

      // 設置視口
      await page.setViewport({
        width: 794,
        height: 1123,
        deviceScaleFactor: 1,
      })

      console.log('📝 載入 HTML...')
      
      // 載入 HTML
      await page.setContent(html, {
        waitUntil: 'domcontentloaded',
        timeout: 10000,
      })

      console.log('🎨 添加樣式...')

      // 簡化的樣式優化
      await page.addStyleTag({
        content: `
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          #resume-preview {
            background: white !important;
          }
        `
      })

      console.log('⏳ 等待渲染...')
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('📄 生成 PDF...')

      // 生成 PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm',
        },
        timeout: 15000,
      })

      console.log(`✅ PDF 生成成功！大小: ${pdf.length} bytes`)

      return new NextResponse(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      })
    } finally {
      console.log('🧹 清理資源...')
      await browser.close()
    }
  } catch (error) {
    console.error('❌ PDF 生成錯誤:', error)
    
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    
    return NextResponse.json(
      { 
        error: 'PDF 生成失敗',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
