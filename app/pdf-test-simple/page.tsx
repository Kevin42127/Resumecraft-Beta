'use client'

import { useResumeExport } from '@/hooks/useResumeExport'
import { useState } from 'react'

export default function PdfTestSimple() {
  const { exportResume, exportState } = useResumeExport()
  const [testContent, setTestContent] = useState('測試履歷內容')

  const handleExport = async () => {
    try {
      await exportResume({ filename: 'test-resume.pdf' })
      alert('PDF生成成功！')
    } catch (error) {
      console.error('PDF生成失敗:', error)
      alert('PDF生成失敗，請查看控制台')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">PDF生成測試</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">測試內容</h2>
          <textarea
            value={testContent}
            onChange={(e) => setTestContent(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg"
            placeholder="輸入測試內容..."
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">履歷預覽</h2>
          <div id="resume-preview" className="border-2 border-gray-300 p-6 bg-white">
            <h1 className="text-2xl font-bold mb-4">測試履歷</h1>
            <p className="text-gray-700 mb-4">{testContent}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">個人信息</h3>
                <p>姓名：測試用戶</p>
                <p>電話：123-456-7890</p>
                <p>郵箱：test@example.com</p>
              </div>
              <div>
                <h3 className="font-semibold">技能</h3>
                <ul className="list-disc list-inside">
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Next.js</li>
                  <li>TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">PDF生成</h2>
          <button
            onClick={handleExport}
            disabled={exportState.isExporting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {exportState.isExporting ? '生成中...' : '生成PDF'}
          </button>
          
          {exportState.isExporting && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportState.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">進度: {exportState.progress}%</p>
            </div>
          )}
          
          {exportState.error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">錯誤:</p>
              <p>{exportState.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 