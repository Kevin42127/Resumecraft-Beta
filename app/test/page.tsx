'use client'

import { useState } from 'react'
import TemplateA from '@/components/ResumeTemplates/TemplateA'
import TemplateB from '@/components/ResumeTemplates/TemplateB'
import { ResumeData, ResumeSettings } from '@/types/resume'

export default function TestPage() {
  const [currentTemplate, setCurrentTemplate] = useState<'template-a' | 'template-b'>('template-a')
  
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
    template: currentTemplate,
    fontSize: 'medium',
    spacing: 'normal',
    colorScheme: 'blue',
    fontFamily: 'sans',
    showPhoto: false,
    photoUrl: '',
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">模板測試頁面</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentTemplate('template-a')}
              className={`px-4 py-2 rounded-lg ${
                currentTemplate === 'template-a'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              經典模板
            </button>
            <button
              onClick={() => setCurrentTemplate('template-b')}
              className={`px-4 py-2 rounded-lg ${
                currentTemplate === 'template-b'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              現代模板
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {currentTemplate === 'template-a' ? (
            <TemplateA resumeData={sampleResumeData} settings={sampleSettings} />
          ) : (
            <TemplateB resumeData={sampleResumeData} settings={sampleSettings} />
          )}
        </div>
      </div>
    </div>
  )
} 