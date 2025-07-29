'use client'

import { useState } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import TemplateA from '@/components/ResumeTemplates/TemplateA'
import TemplateB from '@/components/ResumeTemplates/TemplateB'
import TemplateC from '@/components/ResumeTemplates/TemplateC'
import TemplateD from '@/components/ResumeTemplates/TemplateD'
import TemplateE from '@/components/ResumeTemplates/TemplateE'
import TemplateF from '@/components/ResumeTemplates/TemplateF'
import PreviewPanel from '@/components/PreviewPanel'

export default function PDFConsistencyTest() {
  const { formData, updateSettings } = useResumeForm()
  const { exportResume, isExporting, error } = useResumeExport()
  const [currentTemplate, setCurrentTemplate] = useState('A')

  const templates = {
    A: TemplateA,
    B: TemplateB,
    C: TemplateC,
    D: TemplateD,
    E: TemplateE,
    F: TemplateF
  }

  const CurrentTemplate = templates[currentTemplate as keyof typeof templates]

  const handleExport = async () => {
    try {
      await exportResume({ filename: `resume-template-${currentTemplate}.pdf` })
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            PDF 匯出一致性測試
          </h1>
          <p className="text-gray-600 mb-6">
            測試所有模板的 PDF 匯出功能，確保平面化處理正確
          </p>

          {/* 模板選擇器 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">選擇模板</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {Object.keys(templates).map((template) => (
                <button
                  key={template}
                  onClick={() => setCurrentTemplate(template)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    currentTemplate === template
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg font-bold">Template {template}</div>
                  <div className="text-sm opacity-75">
                    {template === 'A' && '經典'}
                    {template === 'B' && '側邊欄'}
                    {template === 'C' && '現代'}
                    {template === 'D' && '創意'}
                    {template === 'E' && '專業'}
                    {template === 'F' && '技術'}
                  </div>
                </button>
              ))}
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
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isExporting ? '匯出中...' : `匯出 Template ${currentTemplate} PDF`}
            </button>
            {error && (
              <div className="mt-2 text-red-600 text-sm">
                錯誤: {error}
              </div>
            )}
          </div>

          {/* 測試說明 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              測試說明
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• 點擊不同模板按鈕切換模板</li>
              <li>• 點擊匯出按鈕測試 PDF 生成</li>
              <li>• 檢查生成的 PDF 是否正確平面化</li>
              <li>• 確認所有樣式、顏色和佈局都正確</li>
              <li>• 驗證沒有陰影、邊框、圓角等視覺效果</li>
            </ul>
          </div>
        </div>

        {/* 預覽面板 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              預覽 - Template {currentTemplate}
            </h2>
          </div>
          <div id="resume-preview" className="bg-gray-100 p-6">
            <CurrentTemplate resumeData={formData.resumeData} settings={formData.settings} />
          </div>
        </div>
      </div>
    </div>
  )
} 