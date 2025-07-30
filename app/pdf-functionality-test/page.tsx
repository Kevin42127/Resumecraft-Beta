'use client'

import { useState, useEffect } from 'react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import { useQuestPdfExport } from '@/hooks/useQuestPdfExport'
import { ResumeFormProvider } from '@/hooks/useResumeForm'
import TemplateA from '@/components/ResumeTemplates/TemplateA'
import TemplateB from '@/components/ResumeTemplates/TemplateB'
import TemplateC from '@/components/ResumeTemplates/TemplateC'
import TemplateD from '@/components/ResumeTemplates/TemplateD'
import TemplateE from '@/components/ResumeTemplates/TemplateE'
import TemplateF from '@/components/ResumeTemplates/TemplateF'
import Link from 'next/link'

const templates = [
  { id: 'template-a', name: '經典模板', component: TemplateA },
  { id: 'template-b', name: '現代模板', component: TemplateB },
  { id: 'template-c', name: '簡約模板', component: TemplateC },
  { id: 'template-d', name: '創意模板', component: TemplateD },
  { id: 'template-e', name: '商務模板', component: TemplateE },
  { id: 'template-f', name: '技術模板', component: TemplateF },
]

function PDFFunctionalityTestContent() {
  const { formData } = useResumeForm()
  const { exportResume, exportState, resetExportState } = useResumeExport()
  const { 
    isLoading: questPdfLoading, 
    error: questPdfError, 
    apiStatus: questPdfStatus,
    checkQuestPdfStatus,
    downloadPdf: questPdfDownload
  } = useQuestPdfExport()
  
  const [selectedTemplate, setSelectedTemplate] = useState('template-a')
  const [testResults, setTestResults] = useState<any>({})
  const [isRunningTests, setIsRunningTests] = useState(false)

  // 載入範例資料
  const loadSampleData = () => {
    const sampleData = {
      personalInfo: {
        firstName: '張',
        lastName: '小明',
        email: 'zhang.xiaoming@email.com',
        phone: '0912345678',
        city: '台北市',
        state: '台灣',
        linkedin: 'linkedin.com/in/zhangxiaoming',
        website: 'zhangxiaoming.com',
        summary: '資深前端工程師，擁有5年以上的網頁開發經驗，專精於React、TypeScript和現代前端技術。曾帶領團隊完成多個大型專案，具備良好的溝通能力和問題解決能力。'
      },
      experience: [
        {
          id: '1',
          company: '科技公司',
          position: '資深前端工程師',
          startDate: '2022-01',
          endDate: '2024-12',
          current: false,
          description: '負責公司主要產品的前端開發，使用React和TypeScript技術棧。帶領5人團隊完成多個重要功能模組，提升用戶體驗和系統效能。'
        },
        {
          id: '2',
          company: '新創公司',
          position: '前端工程師',
          startDate: '2020-03',
          endDate: '2021-12',
          current: false,
          description: '參與電商平台的開發，負責用戶介面設計和前端功能實作。使用Vue.js和Vuex進行狀態管理，確保代碼品質和可維護性。'
        }
      ],
      education: [
        {
          id: '1',
          school: '國立台灣大學',
          degree: '資訊工程學系',
          startDate: '2016-09',
          endDate: '2020-06',
          current: false,
          description: '主修軟體工程，副修人工智慧。畢業專題獲得系上優秀獎。'
        }
      ],
      skills: [
        { id: '1', name: 'React', level: 'expert' },
        { id: '2', name: 'TypeScript', level: 'expert' },
        { id: '3', name: 'JavaScript', level: 'expert' },
        { id: '4', name: 'Vue.js', level: 'advanced' },
        { id: '5', name: 'Node.js', level: 'advanced' },
        { id: '6', name: 'CSS/SCSS', level: 'expert' }
      ],
      projects: [
        {
          id: '1',
          name: '電商管理系統',
          description: '使用React和Node.js開發的全端電商管理系統，包含商品管理、訂單處理、用戶管理等模組。',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
          url: 'https://github.com/example/ecommerce-system'
        },
        {
          id: '2',
          name: '任務管理App',
          description: '基於Vue.js開發的任務管理應用，支援團隊協作和進度追蹤。',
          technologies: ['Vue.js', 'Vuex', 'Firebase'],
          url: 'https://github.com/example/task-manager'
        }
      ],
      customSections: [
        {
          id: '1',
          title: '證照與認證',
          content: 'AWS Certified Developer Associate\nGoogle Cloud Professional Developer\nMicrosoft Azure Developer Associate'
        },
        {
          id: '2',
          title: '語言能力',
          content: '中文（母語）\n英文（流利）\n日文（基礎）'
        }
      ]
    }
    
    Object.assign(formData, sampleData)
  }

  // 測試內建PDF API
  const testBuiltInPDFAPI = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: '<html><body><h1>測試PDF</h1><p>內建API測試</p></body></html>',
          filename: 'builtin-test.pdf'
        })
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'builtin-test.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        return { success: true, message: '內建PDF API測試成功' }
      } else {
        return { success: false, message: `內建PDF API測試失敗: ${response.status}` }
      }
    } catch (error) {
      return { success: false, message: `內建PDF API測試失敗: ${error}` }
    }
  }

  // 測試QuestPDF API
  const testQuestPDFAPI = async () => {
    try {
      await checkQuestPdfStatus()
      if (questPdfStatus === 'available') {
        const success = await questPdfDownload(
          '<html><body><h1>測試PDF</h1><p>QuestPDF API測試</p></body></html>',
          undefined,
          undefined,
          'questpdf-test.pdf'
        )
        return { 
          success, 
          message: success ? 'QuestPDF API測試成功' : 'QuestPDF API測試失敗' 
        }
      } else {
        return { success: false, message: 'QuestPDF API不可用' }
      }
    } catch (error) {
      return { success: false, message: `QuestPDF API測試失敗: ${error}` }
    }
  }

  // 測試主要匯出功能
  const testMainExport = async () => {
    try {
      await exportResume({ filename: 'main-export-test.pdf' })
      return { success: true, message: '主要匯出功能測試成功' }
    } catch (error) {
      return { success: false, message: `主要匯出功能測試失敗: ${error}` }
    }
  }

  // 運行所有測試
  const runAllTests = async () => {
    setIsRunningTests(true)
    setTestResults({})
    
    const results = {}
    
    // 測試1: 內建PDF API
    console.log('測試1: 內建PDF API')
    results.builtinAPI = await testBuiltInPDFAPI()
    
    // 測試2: QuestPDF API
    console.log('測試2: QuestPDF API')
    results.questPDFAPI = await testQuestPDFAPI()
    
    // 測試3: 主要匯出功能
    console.log('測試3: 主要匯出功能')
    results.mainExport = await testMainExport()
    
    setTestResults(results)
    setIsRunningTests(false)
  }

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || TemplateA

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← 返回首頁
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">PDF 功能完整性測試</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadSampleData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                載入範例資料
              </button>
              <button
                onClick={runAllTests}
                disabled={isRunningTests}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRunningTests ? '測試中...' : '運行所有測試'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {exportState.isExporting && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportState.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">匯出進度: {exportState.progress}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {exportState.error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{exportState.error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={resetExportState}
                  className="text-red-400 hover:text-red-600"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Test Results */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">測試結果</h2>
              
              {/* API 狀態 */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">API 狀態</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">內建PDF API:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      testResults.builtinAPI?.success ? 'bg-green-100 text-green-800' : 
                      testResults.builtinAPI ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {testResults.builtinAPI?.success ? '✅ 正常' : 
                       testResults.builtinAPI ? '❌ 失敗' : '⏳ 未測試'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">QuestPDF API:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      questPdfStatus === 'available' ? 'bg-green-100 text-green-800' :
                      questPdfStatus === 'unavailable' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {questPdfStatus === 'available' ? '✅ 可用' :
                       questPdfStatus === 'unavailable' ? '❌ 不可用' : '⏳ 檢查中'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">主要匯出功能:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      testResults.mainExport?.success ? 'bg-green-100 text-green-800' : 
                      testResults.mainExport ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {testResults.mainExport?.success ? '✅ 正常' : 
                       testResults.mainExport ? '❌ 失敗' : '⏳ 未測試'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 詳細結果 */}
              {Object.keys(testResults).length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">詳細結果</h3>
                  <div className="space-y-2">
                    {Object.entries(testResults).map(([key, result]: [string, any]) => (
                      <div key={key} className="text-xs">
                        <div className="font-medium">{key}:</div>
                        <div className={`mt-1 p-2 rounded ${
                          result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                        }`}>
                          {result.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 模板選擇 */}
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">選擇模板</h3>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedTemplate === template.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">測試說明</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 點擊「載入範例資料」載入測試內容</li>
                  <li>• 點擊「運行所有測試」執行完整測試</li>
                  <li>• 檢查各項PDF功能是否正常</li>
                  <li>• 查看測試結果和錯誤信息</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  預覽: {templates.find(t => t.id === selectedTemplate)?.name}
                </h2>
              </div>
              <div id="resume-preview" className="resume-preview">
                <SelectedTemplateComponent resumeData={formData.resumeData} settings={formData.settings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PDFFunctionalityTestPage() {
  return (
    <ResumeFormProvider>
      <PDFFunctionalityTestContent />
    </ResumeFormProvider>
  )
} 