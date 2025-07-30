import { useState } from 'react'
import { generatePDFFromCanvas } from '@/lib/pdfGenerator'

interface ExportOptions {
  filename?: string
  useBackend?: boolean
}

export const useResumeExport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleExportPDF = async (options: ExportOptions = {}) => {
    const { filename = 'resume.pdf', useBackend = false } = options
    
    setIsExporting(true)
    setError(null)

    try {
      // 優先使用前端 PDF 生成（更穩定）
      if (!useBackend) {
        console.log('📄 使用前端 PDF 生成...')
        await generateFrontendPDF(filename)
        return
      }

      // 備用：嘗試後端 API
      console.log('📄 嘗試後端 PDF 生成...')
      const success = await generateBackendPDF(filename)
      
      if (!success) {
        console.log('⚠️ 後端失敗，切換到前端生成...')
        await generateFrontendPDF(filename)
      }
    } catch (err) {
      console.error('❌ PDF 匯出失敗:', err)
      setError(err instanceof Error ? err.message : 'PDF 匯出失敗')
    } finally {
      setIsExporting(false)
    }
  }

  const generateFrontendPDF = async (filename: string) => {
    const element = document.getElementById('resume-preview')
    if (!element) {
      throw new Error('找不到履歷預覽元素')
    }

    await generatePDFFromCanvas(element, filename)
  }

  const generateBackendPDF = async (filename: string): Promise<boolean> => {
    try {
      const element = document.getElementById('resume-preview')
      if (!element) {
        throw new Error('找不到履歷預覽元素')
      }

      const html = element.outerHTML
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, filename }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error('後端 PDF 生成失敗:', error)
      return false
    }
  }

  return {
    handleExportPDF,
    isExporting,
    error,
  }
} 