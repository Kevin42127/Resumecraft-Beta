'use client'

import { useState, useEffect } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { ResumeFormProvider } from '@/hooks/useResumeForm'

function TemplateDebugPageContent() {
  const { formData, updateSettings, loadSampleData } = useResumeForm()
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    setDebugInfo(JSON.stringify(formData.settings, null, 2))
  }, [formData.settings])

  const handleTemplateChange = (templateId: string) => {
    console.log('Changing template to:', templateId)
    updateSettings('template', templateId)
  }

  const handleColorChange = (color: string) => {
    console.log('Changing color to:', color)
    updateSettings('colorScheme', color)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">模板除錯頁面</h1>
        
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-material p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">模板切換</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTemplateChange('template-a')}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    formData.settings.template === 'template-a'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  經典模板 (template-a)
                </button>
                <button
                  onClick={() => handleTemplateChange('template-b')}
                  className={`w-full px-4 py-2 rounded-lg transition-colors ${
                    formData.settings.template === 'template-b'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  現代模板 (template-b)
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">顏色主題</h3>
              <div className="grid grid-cols-2 gap-2">
                {['blue', 'green', 'purple', 'gray', 'red'].map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      formData.settings.colorScheme === color
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={loadSampleData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              載入範例資料
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-white rounded-lg shadow-material p-6">
          <h3 className="text-lg font-semibold mb-4">當前設定</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
            {debugInfo}
          </pre>
        </div>

        {/* Current Template Info */}
        <div className="bg-white rounded-lg shadow-material p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">模板資訊</h3>
          <div className="space-y-2">
            <p><strong>當前模板：</strong> {formData.settings.template}</p>
            <p><strong>顏色主題：</strong> {formData.settings.colorScheme}</p>
            <p><strong>字體大小：</strong> {formData.settings.fontSize}</p>
            <p><strong>間距：</strong> {formData.settings.spacing}</p>
            <p><strong>字體：</strong> {formData.settings.fontFamily}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TemplateDebugPage() {
  return (
    <ResumeFormProvider>
      <TemplateDebugPageContent />
    </ResumeFormProvider>
  )
} 