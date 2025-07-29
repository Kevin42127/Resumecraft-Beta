'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import TemplateA from '@/components/ResumeTemplates/TemplateA'
import TemplateB from '@/components/ResumeTemplates/TemplateB'
import TemplateC from '@/components/ResumeTemplates/TemplateC'
import TemplateD from '@/components/ResumeTemplates/TemplateD'
import TemplateE from '@/components/ResumeTemplates/TemplateE'
import TemplateF from '@/components/ResumeTemplates/TemplateF'
import { ResumeData, ResumeSettings } from '@/types/resume'

export default function TemplateTestPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('template-a')
  const [selectedColor, setSelectedColor] = useState('blue')

  // 範例履歷資料
  const sampleResumeData: ResumeData = {
    personalInfo: {
      firstName: '王小明',
      lastName: '',
      email: 'xiaoming.wang@email.com',
      phone: '0912-345-678',
      address: '台北市信義區信義路五段7號',
      city: '台北市',
      state: '',
      zipCode: '110',
      country: '台灣',
      linkedin: 'linkedin.com/in/xiaoming-wang',
      website: 'xiaoming.dev',
      summary: '擁有5年軟體開發經驗，專精於前端技術與使用者體驗設計。曾參與多個大型專案開發，具備良好的團隊合作能力與問題解決能力。',
    },
    experience: [
      {
        id: '1',
        company: '科技公司',
        position: '資深前端工程師',
        location: '台北市',
        startDate: '2022-01-01',
        endDate: '',
        current: true,
        description: '負責公司主要產品的前端開發與維護，使用 React、TypeScript 等技術。',
        achievements: [
          '優化網站效能，提升載入速度 40%',
          '帶領 3 人團隊完成新功能開發',
          '建立前端開發規範與最佳實踐',
        ],
      },
    ],
    education: [
      {
        id: '1',
        institution: '台灣大學',
        degree: '學士',
        field: '資訊工程學系',
        location: '台北市',
        startDate: '2018-09-01',
        endDate: '2022-06-30',
        current: false,
        gpa: '3.8',
        description: '主修軟體工程，副修使用者體驗設計。',
      },
    ],
    skills: [
      {
        id: '1',
        name: 'React',
        level: 'advanced',
        category: '前端框架',
      },
      {
        id: '2',
        name: 'TypeScript',
        level: 'advanced',
        category: '程式語言',
      },
      {
        id: '3',
        name: 'Node.js',
        level: 'intermediate',
        category: '後端技術',
      },
    ],
    projects: [],
    certifications: [],
    languages: [],
    customSections: [],
  }

  const sampleSettings: ResumeSettings = {
    template: selectedTemplate as any,
    fontSize: 'medium',
    spacing: 'normal',
    colorScheme: selectedColor as any,
    fontFamily: 'sans',
    showPhoto: false,
    photoUrl: '',
  }

  const templates = [
    { id: 'template-a', name: '經典模板', component: TemplateA },
    { id: 'template-b', name: '現代模板', component: TemplateB },
    { id: 'template-c', name: '簡約模板', component: TemplateC },
    { id: 'template-d', name: '創意模板', component: TemplateD },
    { id: 'template-e', name: '商務模板', component: TemplateE },
    { id: 'template-f', name: '技術模板', component: TemplateF },
  ]

  const colors = [
    { id: 'blue', name: '藍色', class: 'bg-blue-500' },
    { id: 'green', name: '綠色', class: 'bg-green-500' },
    { id: 'purple', name: '紫色', class: 'bg-purple-500' },
    { id: 'gray', name: '灰色', class: 'bg-gray-500' },
    { id: 'red', name: '紅色', class: 'bg-red-500' },
  ]

  const renderTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return null

    const TemplateComponent = template.component
    return (
      <TemplateComponent 
        resumeData={sampleResumeData} 
        settings={sampleSettings} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 返回首頁按鈕 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回首頁</span>
          </Link>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">履歷模板測試</h1>
            <p className="text-gray-600">查看所有6個履歷模板的效果</p>
          </div>

          {/* 控制面板 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 模板選擇 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">選擇模板</h3>
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium">{template.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 顏色選擇 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">選擇顏色</h3>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedColor === color.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${color.class}`}></div>
                      <div className="text-xs font-medium">{color.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 模板預覽 */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                當前模板：{templates.find(t => t.id === selectedTemplate)?.name}
              </h2>
              <p className="text-gray-600 mt-1">
                顏色：{colors.find(c => c.id === selectedColor)?.name}
              </p>
            </div>
            
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="resume-preview bg-white border border-gray-200 rounded-lg overflow-hidden">
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 