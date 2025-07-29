'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function PDFFixTest() {
  const { formData } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()
  const [exportResult, setExportResult] = useState<string>('')
  const [apiTestResult, setApiTestResult] = useState<string>('')

  const handleExport = async () => {
    try {
      setExportResult('開始匯出...')
      console.log('開始PDF匯出測試')
      
      await exportResume({ filename: 'resume-fix-test.pdf' })
      
      setExportResult('✅ PDF 匯出成功！')
      console.log('PDF 匯出成功！')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ 匯出失敗: ${errorMessage}`)
      console.error('PDF 匯出失敗:', error)
    }
  }

  const testAPI = async () => {
    try {
      setApiTestResult('測試中...')
      console.log('開始API測試...')
      
      const testHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>API測試履歷</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { background: #f0f0f0; padding: 20px; text-align: center; }
              .content { padding: 20px; }
            </style>
          </head>
          <body>
            <div id="resume-preview">
              <div class="header">
                <h1>API測試履歷</h1>
                <p>這是一個API測試履歷</p>
              </div>
              <div class="content">
                <h2>工作經驗</h2>
                <p>測試工作經驗內容</p>
              </div>
            </div>
          </body>
        </html>
      `

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: testHTML,
          filename: 'api-test-resume.pdf'
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        setApiTestResult(`✅ API測試成功！PDF大小: ${blob.size} bytes`)
        
        // 下載測試PDF
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'api-test-resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
        console.log('API測試成功！')
      } else {
        const errorText = await response.text()
        setApiTestResult(`❌ API測試失敗: ${response.status} - ${errorText}`)
        console.error('API測試失敗:', response.status, errorText)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setApiTestResult(`❌ API測試錯誤: ${errorMessage}`)
      console.error('API測試錯誤:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF 匯出修復測試
          </h1>
          <p className="text-gray-600 mb-6">
            測試修復後的PDF匯出功能
          </p>

          {/* API測試 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">API 測試</h3>
            <div className={`p-4 rounded-lg mb-3 ${
              apiTestResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : apiTestResult.includes('失敗') || apiTestResult.includes('錯誤')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{apiTestResult || '尚未測試API'}</p>
            </div>
            <button
              onClick={testAPI}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              測試 API
            </button>
          </div>

          {/* 匯出狀態 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">匯出測試</h3>
            <div className={`p-4 rounded-lg mb-3 ${
              exportResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : exportResult.includes('失敗')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{exportResult || '尚未開始匯出'}</p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isExporting ? '匯出中...' : '測試 PDF 匯出'}
            </button>
            {error && (
              <div className="mt-2 text-red-600 text-sm">
                錯誤: {error}
              </div>
            )}
          </div>

          {/* 技術資訊 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              技術資訊
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• 使用內建的 Node.js PDF 生成器</li>
              <li>• API 端點: /api/generate-pdf</li>
              <li>• 使用 Puppeteer 生成高品質 PDF</li>
              <li>• 已修復 C# 後端連接問題</li>
              <li>• 支援所有模板的平面化處理</li>
            </ul>
          </div>
        </div>

        {/* 預覽面板 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              履歷預覽 (Template A)
            </h2>
          </div>
          <div id="resume-preview" className="bg-gray-100 p-6">
            <TemplateA resumeData={formData.resumeData} settings={formData.settings} />
          </div>
        </div>
      </div>
    </div>
  )
} 