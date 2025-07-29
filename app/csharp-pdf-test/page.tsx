'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function CSharpPdfTest() {
  const { formData } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()
  const [exportResult, setExportResult] = useState<string>('')
  const [apiStatus, setApiStatus] = useState<string>('')

  const checkApiHealth = async () => {
    try {
      setApiStatus('檢查中...')
      const response = await fetch('http://localhost:5000/api/pdf/health')
      
      if (response.ok) {
        const data = await response.json()
        setApiStatus(`✅ C# API 正常運行 - ${data.timestamp}`)
      } else {
        setApiStatus(`❌ C# API 回應錯誤: ${response.status}`)
      }
    } catch (error) {
      setApiStatus(`❌ C# API 連接失敗: ${error instanceof Error ? error.message : '未知錯誤'}`)
    }
  }

  const testCSharpApi = async () => {
    try {
      setExportResult('測試中...')
      console.log('開始C# API測試...')
      
      const testHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>C# API測試履歷</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { background: #f0f0f0; padding: 20px; text-align: center; }
              .content { padding: 20px; }
            </style>
          </head>
          <body>
            <div id="resume-preview">
              <div class="header">
                <h1>C# API測試履歷</h1>
                <p>這是由C#後端生成的PDF</p>
              </div>
              <div class="content">
                <h2>工作經驗</h2>
                <p>使用C# + PuppeteerSharp生成</p>
              </div>
            </div>
          </body>
        </html>
      `

      const response = await fetch('http://localhost:5000/api/pdf/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: testHTML,
          filename: 'csharp-test-resume.pdf'
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        setExportResult(`✅ C# API測試成功！PDF大小: ${blob.size} bytes`)
        
        // 下載測試PDF
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'csharp-test-resume.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
        console.log('C# API測試成功！')
      } else {
        const errorText = await response.text()
        setExportResult(`❌ C# API測試失敗: ${response.status} - ${errorText}`)
        console.error('C# API測試失敗:', response.status, errorText)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ C# API測試錯誤: ${errorMessage}`)
      console.error('C# API測試錯誤:', error)
    }
  }

  const handleExport = async () => {
    try {
      setExportResult('開始匯出...')
      console.log('開始C# PDF匯出測試')
      
      await exportResume({ filename: 'csharp-resume.pdf' })
      
      setExportResult('✅ C# PDF 匯出成功！')
      console.log('C# PDF 匯出成功！')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ 匯出失敗: ${errorMessage}`)
      console.error('C# PDF 匯出失敗:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            C# PDF API 測試
          </h1>
          <p className="text-gray-600 mb-6">
            測試C#後端PDF生成功能
          </p>

          {/* API狀態檢查 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">C# API 狀態</h3>
            <div className={`p-4 rounded-lg mb-3 ${
              apiStatus.includes('正常運行') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : apiStatus.includes('錯誤') || apiStatus.includes('失敗')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{apiStatus || '尚未檢查API狀態'}</p>
            </div>
            <button
              onClick={checkApiHealth}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              檢查 API 狀態
            </button>
          </div>

          {/* C# API測試 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">C# API 測試</h3>
            <div className={`p-4 rounded-lg mb-3 ${
              exportResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : exportResult.includes('失敗') || exportResult.includes('錯誤')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{exportResult || '尚未測試C# API'}</p>
            </div>
            <button
              onClick={testCSharpApi}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              測試 C# API
            </button>
          </div>

          {/* 匯出測試 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">完整匯出測試</h3>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isExporting ? '匯出中...' : '測試完整 C# PDF 匯出'}
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
              C# 技術資訊
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• 使用 .NET 8.0 Web API</li>
              <li>• 使用 PuppeteerSharp 生成高品質 PDF</li>
              <li>• API 端點: http://localhost:5000/api/pdf/generate-pdf</li>
              <li>• 支援完整的樣式平面化處理</li>
              <li>• 自動下載 Chromium 瀏覽器</li>
              <li>• 支援 A4 格式和高解析度輸出</li>
            </ul>
          </div>

          {/* 啟動說明 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🚀 啟動 C# API
            </h3>
            <p className="text-yellow-700 text-sm mb-2">
              在測試前，請確保C# API服務器正在運行：
            </p>
            <div className="text-sm text-yellow-700">
              <p><strong>Windows:</strong> 雙擊 <code>start-csharp-api.bat</code></p>
              <p><strong>Linux/Mac:</strong> 執行 <code>./start-csharp-api.sh</code></p>
              <p><strong>手動啟動:</strong> <code>cd ResumeCraftPdfApi && dotnet run</code></p>
            </div>
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