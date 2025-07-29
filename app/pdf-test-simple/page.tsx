'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'

export default function PDFTestSimple() {
  const { formData } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()

  const handleExport = async () => {
    try {
      await exportResume({ filename: 'resume-test.pdf' })
      console.log('PDF 匯出成功！')
    } catch (error) {
      console.error('PDF 匯出失敗:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF 匯出測試
          </h1>
          <p className="text-gray-600 mb-6">
            使用內建的 Node.js PDF 生成器測試匯出功能
          </p>

          {/* 匯出按鈕 */}
          <div className="mb-6">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isExporting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isExporting ? '匯出中...' : '匯出 PDF'}
            </button>
            {error && (
              <div className="mt-2 text-red-600 text-sm">
                錯誤: {error}
              </div>
            )}
          </div>

          {/* 狀態顯示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              當前設定
            </h3>
            <ul className="text-blue-700 space-y-1">
              <li>• 使用內建的 Node.js PDF 生成器</li>
              <li>• API 端點: /api/generate-pdf</li>
              <li>• 使用 Puppeteer 生成高品質 PDF</li>
              <li>• 支援所有模板的平面化處理</li>
            </ul>
          </div>
        </div>

        {/* 預覽面板 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              履歷預覽
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