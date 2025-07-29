'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function CSharpNativePdfTest() {
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
      console.log('開始C#原生PDF API測試...')
      
      const testHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>C# 原生 PDF 測試</title>
            <style>
              body { 
                font-family: 'Microsoft YaHei', Arial, sans-serif; 
                margin: 20px; 
                background: white;
              }
              .header { 
                background: #f8f9fa; 
                padding: 20px; 
                text-align: center; 
                border-bottom: 2px solid #dee2e6;
              }
              .content { 
                padding: 20px; 
                line-height: 1.6;
              }
              .section {
                margin-bottom: 20px;
                padding: 15px;
                border-left: 4px solid #007bff;
                background: #f8f9fa;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
              }
              th, td {
                border: 1px solid #dee2e6;
                padding: 8px;
                text-align: left;
              }
              th {
                background: #e9ecef;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div id="resume-preview">
              <div class="header">
                <h1>C# 原生 PDF 生成測試</h1>
                <p>使用 DinkToPdf / IronPDF 生成高品質 PDF</p>
              </div>
              <div class="content">
                <div class="section">
                  <h2>技術特色</h2>
                  <ul>
                    <li>✅ 使用 C# 原生 PDF 生成庫</li>
                    <li>✅ 完整支援 HTML/CSS 排版</li>
                    <li>✅ 高品質 A4 格式輸出</li>
                    <li>✅ 自動樣式平面化處理</li>
                    <li>✅ 支援中文字體渲染</li>
                  </ul>
                </div>
                
                <div class="section">
                  <h2>測試表格</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>功能</th>
                        <th>狀態</th>
                        <th>說明</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>DinkToPdf</td>
                        <td>✅ 主要方案</td>
                        <td>基於 wkhtmltopdf 的高品質渲染</td>
                      </tr>
                      <tr>
                        <td>IronPDF</td>
                        <td>✅ 備用方案</td>
                        <td>基於 Chromium 的現代渲染引擎</td>
                      </tr>
                      <tr>
                        <td>樣式平面化</td>
                        <td>✅ 已實施</td>
                        <td>自動移除陰影、邊框、圓角等效果</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div class="section">
                  <h2>PDF 品質保證</h2>
                  <p>本測試使用 C# 原生 PDF 生成庫，確保：</p>
                  <ul>
                    <li>高解析度輸出 (300 DPI)</li>
                    <li>完整 CSS 樣式支援</li>
                    <li>準確的 A4 紙張格式</li>
                    <li>專業的排版效果</li>
                    <li>快速生成速度</li>
                  </ul>
                </div>
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
          filename: 'csharp-native-test.pdf'
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        setExportResult(`✅ C# 原生 PDF 測試成功！PDF大小: ${blob.size} bytes`)
        
        // 下載測試PDF
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'csharp-native-test.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
        console.log('C# 原生 PDF 測試成功！')
      } else {
        const errorText = await response.text()
        setExportResult(`❌ C# 原生 PDF 測試失敗: ${response.status} - ${errorText}`)
        console.error('C# 原生 PDF 測試失敗:', response.status, errorText)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ C# 原生 PDF 測試錯誤: ${errorMessage}`)
      console.error('C# 原生 PDF 測試錯誤:', error)
    }
  }

  const handleExport = async () => {
    try {
      setExportResult('開始匯出...')
      console.log('開始C#原生PDF匯出測試')
      
      await exportResume({ filename: 'csharp-native-resume.pdf' })
      
      setExportResult('✅ C# 原生 PDF 匯出成功！')
      console.log('C# 原生 PDF 匯出成功！')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ 匯出失敗: ${errorMessage}`)
      console.error('C# 原生 PDF 匯出失敗:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 C# 原生 PDF 生成測試
          </h1>
          <p className="text-gray-600 mb-6">
            測試 C# 原生 PDF 生成庫 (DinkToPdf / IronPDF)
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
            <h3 className="text-lg font-semibold text-gray-800 mb-3">C# 原生 PDF 測試</h3>
            <div className={`p-4 rounded-lg mb-3 ${
              exportResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : exportResult.includes('失敗') || exportResult.includes('錯誤')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{exportResult || '尚未測試C#原生PDF'}</p>
            </div>
            <button
              onClick={testCSharpApi}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              測試 C# 原生 PDF
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
              {isExporting ? '匯出中...' : '測試完整 C# 原生 PDF 匯出'}
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
              C# 原生 PDF 技術資訊
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• 使用 .NET 8.0 和 ASP.NET Core</li>
              <li>• 主要方案: DinkToPdf (基於 wkhtmltopdf)</li>
              <li>• 備用方案: IronPDF (基於 Chromium)</li>
              <li>• 完整支援 HTML/CSS 排版</li>
              <li>• 高品質 A4 格式輸出</li>
              <li>• 自動樣式平面化處理</li>
              <li>• 支援中文字體渲染</li>
            </ul>
          </div>

          {/* 啟動說明 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🚀 啟動 C# 原生 PDF API
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