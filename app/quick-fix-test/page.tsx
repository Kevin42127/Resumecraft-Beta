'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function QuickFixTest() {
  const { formData } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()
  const [exportResult, setExportResult] = useState<string>('')

  const handleExport = async () => {
    try {
      setExportResult('開始匯出...')
      console.log('開始快速修復PDF匯出測試')
      
      await exportResume({ filename: 'quick-fix-resume.pdf' })
      
      setExportResult('✅ PDF 匯出成功！')
      console.log('PDF 匯出成功！')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setExportResult(`❌ 匯出失敗: ${errorMessage}`)
      console.error('PDF 匯出失敗:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 快速修復 PDF 匯出
          </h1>
          <p className="text-gray-600 mb-6">
            使用 Node.js PDF 生成器，立即解決匯出問題
          </p>

          {/* 狀態顯示 */}
          <div className="mb-6">
            <div className={`p-4 rounded-lg ${
              exportResult.includes('成功') 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : exportResult.includes('失敗')
                ? 'bg-red-50 border border-red-200 text-red-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }`}>
              <h3 className="font-semibold mb-2">匯出狀態</h3>
              <p>{exportResult || '尚未開始匯出'}</p>
            </div>
          </div>

          {/* 匯出按鈕 */}
          <div className="mb-6">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isExporting ? '匯出中...' : '🚀 立即測試 PDF 匯出'}
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
              快速修復說明
            </h3>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>✅ 已切換到 Node.js PDF 生成器</li>
              <li>✅ 使用內建的 Puppeteer API</li>
              <li>✅ 支援所有模板的平面化處理</li>
              <li>✅ 無需額外安裝 .NET SDK</li>
              <li>✅ 立即可用，無需等待</li>
            </ul>
          </div>

          {/* C# 後端說明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              💡 關於 C# 後端
            </h3>
            <p className="text-blue-700 text-sm mb-2">
              如果您想使用 C# 後端，需要：
            </p>
            <div className="text-sm text-blue-700">
              <p>1. 安裝 .NET 8.0 SDK</p>
              <p>2. 啟動 C# API 服務器</p>
              <p>3. 修改匯出邏輯使用 C# 後端</p>
            </div>
            <a 
              href="/csharp-pdf-test" 
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              查看 C# 測試頁面
            </a>
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