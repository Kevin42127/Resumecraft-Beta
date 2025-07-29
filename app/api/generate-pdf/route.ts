import { NextRequest, NextResponse } from 'next/server'

// ResumeCraft 簡化 PDF 產生 API
// 由於 Netlify 環境限制，改為返回前端生成指令

export async function POST(request: NextRequest) {
  try {
    const { html, filename = 'resume.pdf' } = await request.json()

    if (!html) {
      return NextResponse.json(
        { error: 'HTML 內容為必填欄位' },
        { status: 400 }
      )
    }

    // 由於 Netlify 環境限制，建議使用前端 PDF 生成
    return NextResponse.json({
      success: false,
      error: '建議使用前端PDF生成',
      code: 'USE_FRONTEND',
      suggestion: 'useFrontendPdf',
      message: 'Netlify環境限制，請使用前端PDF生成功能'
    }, { status: 200 })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'PDF 生成失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
