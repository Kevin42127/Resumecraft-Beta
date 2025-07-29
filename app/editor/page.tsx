'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FormEditor from '@/components/FormEditor'
import PreviewPanel from '@/components/PreviewPanel'
import Header from '@/components/Header'
import FeedbackModal from '@/components/FeedbackModal'
import { ResumeFormProvider } from '@/hooks/useResumeForm'
import WelcomeBanner from '@/components/WelcomeBanner'

export default function EditorPage() {
  const [showFeedback, setShowFeedback] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const handleFeedbackClick = () => {
    setShowFeedback(true)
  }

  const handleExampleClick = () => {
    // 在編輯器頁面，範例功能可以導向首頁的範例
    window.open('/', '_blank')
  }

  return (
    <ResumeFormProvider>
      <div className="min-h-screen bg-gray-50">
        <WelcomeBanner 
          variant="compact" 
          onFeedbackClick={handleFeedbackClick}
          onExampleClick={handleExampleClick}
        />
        <Header 
          onFeedbackClick={() => setShowFeedback(true)} 
          showPreview={showPreview}
          onTogglePreview={() => setShowPreview(!showPreview)}
        />
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
          {/* Form Editor */}
          <motion.div
            className={`bg-white border-r border-gray-200 overflow-y-auto ${
              showPreview ? 'w-full lg:w-1/2' : 'w-full'
            }`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FormEditor />
          </motion.div>
          {/* Preview Panel */}
          <motion.div
            className={`w-full lg:w-1/2 bg-gray-100 overflow-y-auto ${showPreview ? '' : 'hidden'}`}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PreviewPanel />
          </motion.div>
        </div>
        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      </div>
    </ResumeFormProvider>
  )
} 