'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function QuickPdfTest() {
  const { formData } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()
  const [exportResult, setExportResult] = useState<string>('')

  const handleExport = async () => {
    try {
      setExportResult('開始匯出...')
      console.log('開始Node.js PDF匯出測試')
      
      await exportResume({ filename: 'nodejs-resume.pdf' })
      
      setExportResult('✅ Node.js PDF 匯出成功！')
      console.log('Node.js PDF 匯出成功！')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ 匯出失敗: ${errorMessage}`)
      console.error('Node.js PDF 匯出失敗:', error)
    }
  }

  const testNodeApi = async () => {
    try {
      setExportResult('測試Node.js API中...')
      
      const testHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Node.js PDF 測試</title>
            <style>
              body { 
                font-family: 'Microsoft YaHei', Arial, sans-serif; 
                margin: 20px; 
                background: white;
                color: #333;
              }
              .header { 
                background: #007bff;
                color: white;
                padding: 30px; 
                text-align: center; 
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .content { 
                padding: 20px; 
                line-height: 1.6;
              }
              .feature-list {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 4px;
                margin: 20px 0;
              }
              .feature-list h3 {
                color: #007bff;
                margin-top: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                background: white;
              }
              th, td {
                border: 1px solid #dee2e6;
                padding: 12px;
                text-align: left;
              }
              th {
                background: #e9ecef;
                font-weight: bold;
                color: #495057;
              }
            </style>
          </head>
          <body>
            <div id="resume-preview">
              <div class="header">
                <h1>🚀 Node.js PDF 生成測試</h1>
                <p>使用 Puppeteer 的高品質 PDF 生成</p>
              </div>
              
              <div class="content">
                <div class="feature-list">
                  <h3>✨ Node.js PDF 生成優勢</h3>
                  <ul>
                    <li>✅ 基於 Puppeteer (Chromium) 渲染引擎</li>
                    <li>✅ 與瀏覽器完全一致的渲染效果</li>
                    <li>✅ 支援所有現代 CSS 功能</li>
                    <li>✅ 高品質字體渲染</li>
                    <li>✅ 快速生成速度</li>
                    <li>✅ 穩定可靠</li>
                  </ul>
                </div>
                
                <h2>📊 技術規格</h2>
                <table>
                  <thead>
                    <tr>
                      <th>功能</th>
                      <th>規格</th>
                      <th>說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>渲染引擎</td>
                      <td>Puppeteer (Chromium)</td>
                      <td>與 Chrome 瀏覽器相同的渲染引擎</td>
                    </tr>
                    <tr>
                      <td>輸出格式</td>
                      <td>A4</td>
                      <td>標準 A4 紙張格式</td>
                    </tr>
                    <tr>
                      <td>解析度</td>
                      <td>高解析度</td>
                      <td>清晰的文字和圖形輸出</td>
                    </tr>
                    <tr>
                      <td>色彩模式</td>
                      <td>彩色</td>
                      <td>支援完整色彩輸出</td>
                    </tr>
                    <tr>
                      <td>字體支援</td>
                      <td>Microsoft YaHei</td>
                      <td>完美支援中文字體</td>
                    </tr>
                    <tr>
                      <td>CSS 支援</td>
                      <td>完整</td>
                      <td>支援所有現代 CSS 功能</td>
                    </tr>
                  </tbody>
                </table>
                
                <div class="feature-list">
                  <h3>🎯 品質保證</h3>
                  <ul>
                    <li>✅ 與瀏覽器渲染完全一致</li>
                    <li>✅ 高品質輸出</li>
                    <li>✅ 完整 CSS 樣式支援</li>
                    <li>✅ 準確的 A4 紙張格式</li>
                    <li>✅ 專業的排版效果</li>
                    <li>✅ 快速生成速度</li>
                  </ul>
                </div>
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
          filename: 'nodejs-test.pdf'
        })
      })

      if (response.ok) {
        const blob = await response.blob()
        setExportResult(`✅ Node.js API 測試成功！PDF大小: ${blob.size} bytes`)
        
        // 下載測試PDF
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'nodejs-test.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        
        console.log('Node.js API 測試成功！')
      } else {
        const errorText = await response.text()
        setExportResult(`❌ Node.js API 測試失敗: ${response.status} - ${errorText}`)
        console.error('Node.js API 測試失敗:', response.status, errorText)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ Node.js API 測試錯誤: ${errorMessage}`)
      console.error('Node.js API 測試錯誤:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 Node.js PDF 生成測試
          </h1>
          <p className="text-gray-600 mb-6">
            在安裝 .NET SDK 之前，使用 Node.js Puppeteer 進行 PDF 生成測試
          </p>

          {/* 狀態顯示 */}
          <div className="mb-6">
            <div className={`p-4 rounded-lg mb-3 ${
              exportResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : exportResult.includes('失敗') || exportResult.includes('錯誤')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <p>{exportResult || '尚未測試PDF生成'}</p>
            </div>
          </div>

          {/* 測試按鈕 */}
          <div className="space-y-4">
            <button
              onClick={testNodeApi}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              測試 Node.js PDF API
            </button>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isExporting ? '匯出中...' : '測試 Node.js 履歷匯出'}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              <strong>錯誤:</strong> {error}
            </div>
          )}

          {/* .NET SDK 安裝說明 */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🔧 安裝 .NET 8.0 SDK
            </h3>
            <p className="text-yellow-700 text-sm mb-2">
              要使用 IronPDF C# 後端，請先安裝 .NET 8.0 SDK：
            </p>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>方法 1:</strong> 官方下載 - https://dotnet.microsoft.com/download/dotnet/8.0</p>
              <p><strong>方法 2:</strong> winget install Microsoft.DotNet.SDK.8</p>
              <p><strong>方法 3:</strong> choco install dotnet-8.0-sdk</p>
            </div>
            <p className="text-yellow-700 text-sm mt-2">
              安裝完成後，重新啟動終端機並執行 <code>dotnet --version</code> 驗證安裝。
            </p>
          </div>

          {/* 技術資訊 */}
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Node.js PDF 技術資訊
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• 基於 Puppeteer (Chromium) 渲染引擎</li>
              <li>• 支援所有現代 CSS 功能</li>
              <li>• 高品質字體渲染</li>
              <li>• 完整中文字體支援</li>
              <li>• 響應式設計支援</li>
              <li>• 與瀏覽器渲染完全一致</li>
              <li>• 快速生成速度</li>
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