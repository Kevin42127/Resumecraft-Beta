'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Settings, 
  MessageCircle, 
  Palette,
  Eye,
  EyeOff
} from 'lucide-react'
import { useResumeForm } from '@/hooks/useResumeForm'
import { useResumeExport } from '@/hooks/useResumeExport'
import ExportErrorModal from './ExportErrorModal'

interface HeaderProps {
  onFeedbackClick: () => void
  showPreview: boolean
  onTogglePreview: () => void
}

export default function Header({ onFeedbackClick, showPreview, onTogglePreview }: HeaderProps) {
  const { formData, updateSettings } = useResumeForm()
  const { exportResume, isExporting, progress, error, resetExportState } = useResumeExport()
  const [showSettings, setShowSettings] = useState(false)
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false)
  const templateButtonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  const templates = [
    { id: 'template-a', name: '經典模板', color: 'blue' },
    { id: 'template-b', name: '現代模板', color: 'green' },
    { id: 'template-c', name: '簡約模板', color: 'gray' },
    { id: 'template-d', name: '創意模板', color: 'purple' },
    { id: 'template-e', name: '商務模板', color: 'blue' },
    { id: 'template-f', name: '技術模板', color: 'red' },
  ]

  const handleExportPDF = async () => {
    try {
      await exportResume({ filename: 'resume.pdf' })
      console.log('PDF 匯出成功！')
    } catch (error) {
      console.error('PDF 匯出失敗:', error)
      // 錯誤處理已在Hook中完成
    }
  }

  const handleTemplateDropdownToggle = () => {
    if (templateButtonRef.current) {
      const rect = templateButtonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 192 // 192px = w-48
      })
    }
    setShowTemplateDropdown(!showTemplateDropdown)
  }

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (templateButtonRef.current && !templateButtonRef.current.contains(event.target as Node)) {
        setShowTemplateDropdown(false)
      }
    }

    if (showTemplateDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTemplateDropdown])

  return (
    <header className="relative z-50 px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">ResumeCraft</span>
          </Link>
          
          <nav className="items-center hidden space-x-4 md:flex">
            <Link href="/" className="text-gray-600 transition-colors hover:text-primary-600">
              首頁
            </Link>
            <Link href="/editor" className="font-medium text-primary-600">
              編輯器
            </Link>
            <Link href="/forum" className="text-gray-600 transition-colors hover:text-primary-600">
              討論區
            </Link>
            <Link href="/template-test" className="text-gray-600 transition-colors hover:text-primary-600">
              模板測試
            </Link>
          </nav>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Template Switcher */}
          <div className="relative">
            <button
              ref={templateButtonRef}
              onClick={handleTemplateDropdownToggle}
              className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-colors hover:text-primary-600"
            >
              <Palette className="w-5 h-5" />
              <span className="hidden sm:inline">模板</span>
            </button>
          </div>

          {/* Preview Toggle */}
          <button
            onClick={onTogglePreview}
            className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-colors hover:text-primary-600"
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span className="hidden sm:inline">預覽</span>
          </button>

          {/* Export Button */}
          <motion.button
            onClick={handleExportPDF}
            disabled={isExporting}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isExporting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
            whileHover={!isExporting ? { scale: 1.05 } : {}}
            whileTap={!isExporting ? { scale: 0.95 } : {}}
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                <span className="hidden sm:inline">匯出中... {progress}%</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">匯出 PDF</span>
              </>
            )}
          </motion.button>

          {/* Feedback Button */}
          <button
            onClick={onFeedbackClick}
            className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-colors hover:text-primary-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">意見回饋</span>
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-30 pt-4 mt-4 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                字體大小
              </label>
              <select
                value={formData.settings.fontSize}
                onChange={(e) => updateSettings('fontSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500"
              >
                <option value="small">小</option>
                <option value="medium">中</option>
                <option value="large">大</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                間距
              </label>
              <select
                value={formData.settings.spacing}
                onChange={(e) => updateSettings('spacing', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500"
              >
                <option value="compact">緊湊</option>
                <option value="normal">正常</option>
                <option value="spacious">寬鬆</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                顏色主題
              </label>
              <select
                value={formData.settings.colorScheme}
                onChange={(e) => {
                  console.log('Header: Color changed to:', e.target.value)
                  updateSettings('colorScheme', e.target.value)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500"
              >
                <option value="blue">藍色</option>
                <option value="green">綠色</option>
                <option value="purple">紫色</option>
                <option value="gray">灰色</option>
                <option value="red">紅色</option>
              </select>
            </div>
            <div className="relative z-10">
  <label className="relative z-20 block pr-1 mb-2 text-sm font-medium text-gray-700 bg-white">
    字體
  </label>
  <select
    value={formData.settings.fontFamily}
    onChange={(e) => updateSettings('fontFamily', e.target.value)}
    className="relative z-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500"
  >
    <option value="sans">無襯線</option>
    <option value="serif">襯線</option>
  </select>
</div>
          </div>
        </motion.div>
      )}

      {/* Export Error Modal */}
      <ExportErrorModal 
        error={error} 
        onClose={resetExportState} 
      />

      {/* Template Dropdown Portal */}
      <AnimatePresence>
        {showTemplateDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed w-48 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-[99999]"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999
            }}
          >
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  updateSettings('template', template.id)
                  setShowTemplateDropdown(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                  formData.settings.template === template.id ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                }`}
              >
                {template.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
