'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FileText, Palette, Download, Eye, Zap, Shield, ChevronLeft, ChevronRight, Star, Users, Award } from 'lucide-react'

// 懶載入組件以提升初始載入速度
const WelcomeBanner = lazy(() => import('@/components/WelcomeBanner'))
const FeedbackModal = lazy(() => import('@/components/FeedbackModal'))

export default function HomePage() {
  const [showExamples, setShowExamples] = useState(false)
  const [currentExample, setCurrentExample] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: '多樣化模板',
      description: '提供多種專業履歷模板，適合不同產業與職位需求',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: '即時預覽',
      description: '編輯時即時預覽履歷效果，確保完美呈現',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: '自訂樣式',
      description: '自由調整字體、顏色、間距，打造專屬履歷',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'PDF 匯出',
      description: '一鍵匯出高品質 PDF 檔案，適合列印與分享',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: '快速製作',
      description: '簡潔直觀的操作介面，快速完成履歷製作',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '隱私保護',
      description: '資料僅儲存在您的瀏覽器中，確保隱私安全',
    },
  ]

  const examples = [
    {
      title: '軟體工程師履歷',
      description: '適合前端、後端、全端工程師使用的專業履歷模板',
      template: 'template-a',
      colorScheme: 'blue',
      preview: {
        name: '王小明',
        title: '資深前端工程師',
        experience: '5年經驗',
        skills: ['React', 'TypeScript', 'Node.js'],
        highlights: ['優化網站效能提升40%', '帶領3人團隊完成專案', '建立前端開發規範']
      }
    },
    {
      title: '行銷專員履歷',
      description: '專為行銷、公關、品牌管理職位設計的履歷模板',
      template: 'template-b',
      colorScheme: 'green',
      preview: {
        name: '李小華',
        title: '數位行銷專員',
        experience: '3年經驗',
        skills: ['社群媒體行銷', 'Google Analytics', '內容創作'],
        highlights: ['提升品牌知名度30%', '管理10萬粉絲社群', '策劃成功行銷活動']
      }
    },
    {
      title: '設計師履歷',
      description: '適合UI/UX設計師、平面設計師的創意履歷模板',
      template: 'template-d',
      colorScheme: 'purple',
      preview: {
        name: '張小美',
        title: 'UI/UX設計師',
        experience: '4年經驗',
        skills: ['Figma', 'Adobe Creative Suite', '使用者研究'],
        highlights: ['設計獲獎App介面', '提升使用者體驗評分', '建立設計系統']
      }
    },
    {
      title: '簡約風格履歷',
      description: '極簡設計風格，適合追求簡潔專業的求職者',
      template: 'template-c',
      colorScheme: 'gray',
      preview: {
        name: '陳小強',
        title: '產品經理',
        experience: '6年經驗',
        skills: ['產品策略', '用戶研究', '數據分析'],
        highlights: ['帶領產品從0到1', '用戶滿意度提升50%', '年度最佳產品獎']
      }
    },
    {
      title: '商務專業履歷',
      description: '傳統商務風格，適合金融、法律等專業領域',
      template: 'template-e',
      colorScheme: 'blue',
      preview: {
        name: '林小雅',
        title: '財務分析師',
        experience: '7年經驗',
        skills: ['財務建模', '風險評估', '投資分析'],
        highlights: ['管理10億投資組合', '降低風險成本20%', 'CFA認證持有者']
      }
    },
    {
      title: '技術專精履歷',
      description: '程式碼風格設計，專為技術人員打造的履歷模板',
      template: 'template-f',
      colorScheme: 'red',
      preview: {
        name: '黃小偉',
        title: '資深後端工程師',
        experience: '8年經驗',
        skills: ['Java', 'Spring Boot', '微服務架構'],
        highlights: ['設計高併發系統', '優化資料庫效能', '開源專案貢獻者']
      }
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const handleFeedbackClick = () => {
    setShowFeedback(true)
  }

  const handleExampleClick = () => {
    setShowExamples(true)
  }

  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-16 bg-blue-50 animate-pulse" />}>
        <WelcomeBanner 
          onFeedbackClick={handleFeedbackClick}
          onExampleClick={handleExampleClick}
        />
      </Suspense>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container px-4 mx-auto">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary-100">
                <FileText className="w-10 h-10 text-primary-600" />
              </div>
              <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
                Resume
                <span className="text-gradient">Craft</span>
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 md:text-2xl">
                現代化履歷製作工具，讓您的專業能力完美呈現
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/editor">
                <motion.button
                  className="px-8 py-4 text-lg btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  開始製作履歷
                </motion.button>
              </Link>
              <motion.button
                onClick={() => setShowExamples(true)}
                className="px-8 py-4 text-lg btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                查看範例
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-primary-200 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute rounded-full top-40 right-10 w-72 h-72 bg-secondary-200 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bg-yellow-200 rounded-full -bottom-8 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              為什麼選擇 ResumeCraft？
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              我們提供專業的履歷製作工具，讓您輕鬆打造完美的求職履歷
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 text-center transition-all duration-300 card hover:shadow-material-lg"
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Examples Section */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowExamples(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">履歷範例展示</h2>
                  <p className="text-gray-600">查看不同職位的專業履歷範例</p>
                </div>
                <button
                  onClick={() => setShowExamples(false)}
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setCurrentExample(prev => prev > 0 ? prev - 1 : examples.length - 1)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>上一個</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    {examples.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentExample(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentExample ? 'bg-primary-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentExample(prev => prev < examples.length - 1 ? prev + 1 : 0)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
                  >
                    <span>下一個</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Example Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview */}
                  <div className="space-y-4">
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <h3 className="mb-4 text-xl font-semibold text-gray-900">
                        {examples[currentExample].title}
                      </h3>
                      <p className="mb-6 text-gray-600">
                        {examples[currentExample].description}
                      </p>
                      
                      {/* Resume Preview */}
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900">
                            {examples[currentExample].preview.name}
                          </h4>
                          <p className="text-primary-600 font-medium">
                            {examples[currentExample].preview.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {examples[currentExample].preview.experience}
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="mb-2 text-sm font-semibold text-gray-700">技能專長</h5>
                          <div className="flex flex-wrap gap-2">
                            {examples[currentExample].preview.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="mb-2 text-sm font-semibold text-gray-700">主要成就</h5>
                          <ul className="space-y-1 text-sm text-gray-600">
                            {examples[currentExample].preview.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Star className="w-3 h-3 mt-1 text-primary-500 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-xl font-semibold text-gray-900">模板特色</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Award className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">專業設計</h4>
                            <p className="text-sm text-gray-600">符合業界標準的專業履歷格式</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">適合職位</h4>
                            <p className="text-sm text-gray-600">針對特定職位優化的內容結構</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Palette className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">自訂樣式</h4>
                            <p className="text-sm text-gray-600">可調整顏色、字體、間距等樣式</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary-50 rounded-xl">
                      <h4 className="mb-2 font-semibold text-primary-900">開始製作</h4>
                      <p className="mb-4 text-sm text-primary-700">
                        選擇此模板開始製作您的專業履歷
                      </p>
                      <Link href="/editor">
                        <motion.button
                          className="w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-primary-600 rounded-lg hover:bg-primary-700"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          使用此模板
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              準備好製作您的專業履歷了嗎？
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-primary-100">
              立即開始，幾分鐘內就能完成一份專業的履歷
            </p>
            <Link href="/editor">
              <motion.button
                className="px-8 py-4 text-lg font-semibold transition-colors duration-200 bg-white rounded-lg text-primary-600 hover:bg-gray-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                免費開始製作
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <p className="mb-4 text-gray-400">
              網站由 ChatGPT 建立專案結構，程式碼由 Cursor 撰寫，最後由人工進行網站測試。
            </p>
            <div className="flex flex-wrap items-center justify-center mb-4 space-x-6">
              <Link href="/privacy" className="text-gray-400 transition-colors hover:text-white">
                隱私政策
              </Link>
              <Link href="/terms" className="text-gray-400 transition-colors hover:text-white">
                服務條款
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/about" className="text-gray-400 transition-colors hover:text-white">
                關於我們
              </Link>
              <span className="text-gray-400">|</span>
              <a href="mailto:tyouxipindao@gmail.com" className="text-gray-400 transition-colors hover:text-white">
                聯絡我們
              </a>
            </div>
            <p className="text-gray-400">
              © 2025 ResumeCraft. 保留所有權利。
            </p>
          </div>
        </div>
      </footer>

            {/* Feedback Modal */}
      <Suspense fallback={null}>
        <FeedbackModal 
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      </Suspense>
    </div>
  )
}
