'use client'

import { ResumeData, ResumeSettings } from '@/types/resume'
import { 
  formatDate, 
  formatPhone, 
  formatDuration, 
  getInitials,
  getSkillLevelText,
  getSkillLevelColor
} from '@/utils/formatter'

interface TemplateFProps {
  resumeData: ResumeData
  settings: ResumeSettings
}

export default function TemplateF({ resumeData, settings }: TemplateFProps) {
  const { personalInfo, experience, education, skills, customSections } = resumeData

  const getColorClasses = () => {
    switch (settings.colorScheme) {
      case 'blue':
        return { 
          primary: 'text-blue-600', 
          bg: 'bg-blue-600', 
          accent: 'bg-blue-50', 
          border: 'border-blue-200',
          code: 'bg-blue-900',
          terminal: 'bg-gray-900'
        }
      case 'green':
        return { 
          primary: 'text-green-600', 
          bg: 'bg-green-600', 
          accent: 'bg-green-50', 
          border: 'border-green-200',
          code: 'bg-green-900',
          terminal: 'bg-gray-900'
        }
      case 'purple':
        return { 
          primary: 'text-purple-600', 
          bg: 'bg-purple-600', 
          accent: 'bg-purple-50', 
          border: 'border-purple-200',
          code: 'bg-purple-900',
          terminal: 'bg-gray-900'
        }
      case 'gray':
        return { 
          primary: 'text-gray-600', 
          bg: 'bg-gray-600', 
          accent: 'bg-gray-50', 
          border: 'border-gray-200',
          code: 'bg-gray-900',
          terminal: 'bg-gray-900'
        }
      case 'red':
        return { 
          primary: 'text-red-600', 
          bg: 'bg-red-600', 
          accent: 'bg-red-50', 
          border: 'border-red-200',
          code: 'bg-red-900',
          terminal: 'bg-gray-900'
        }
      default:
        return { 
          primary: 'text-blue-600', 
          bg: 'bg-blue-600', 
          accent: 'bg-blue-50', 
          border: 'border-blue-200',
          code: 'bg-blue-900',
          terminal: 'bg-gray-900'
        }
    }
  }

  const getFontSizeClasses = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-sm'
      case 'large':
        return 'text-lg'
      default:
        return 'text-base'
    }
  }

  const getSpacingClasses = () => {
    switch (settings.spacing) {
      case 'compact':
        return 'space-y-3'
      case 'spacious':
        return 'space-y-8'
      default:
        return 'space-y-6'
    }
  }

  const colors = getColorClasses()

  return (
    <div className={`${getFontSizeClasses()} ${getSpacingClasses()} font-${settings.fontFamily} bg-white`}>
      {/* Terminal-style Header */}
      <div className={`${colors.terminal} text-green-400 p-6 font-mono`}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm opacity-75">resume.terminal</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">$</span>
            <span className="text-white">whoami</span>
          </div>
          <div className="text-white font-bold text-2xl ml-4">
            {personalInfo.firstName} {personalInfo.lastName}
          </div>
          {personalInfo.summary && (
            <div className="flex items-start space-x-2">
              <span className="text-green-400">$</span>
              <span className="text-white">cat about.txt</span>
            </div>
          )}
          {personalInfo.summary && (
            <div className="text-gray-300 ml-4 leading-relaxed max-w-2xl">
              {personalInfo.summary}
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
              <span className="text-gray-900 font-mono">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
              <span className="text-gray-900 font-mono">{formatPhone(personalInfo.phone)}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
              <span className="text-gray-900 font-mono">
                {personalInfo.city}, {personalInfo.state}
              </span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
              <span className="text-gray-900 font-mono">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
              <span className="text-gray-900 font-mono">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Experience */}
        {experience.length > 0 && (
          <div className="resume-section mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${colors.primary} font-mono flex items-center`}>
              <span className="mr-2">{'//'}</span>
              工作經驗
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className={`border-l-4 ${colors.border} pl-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-mono">{exp.position}</h3>
                      <p className="text-lg text-gray-600 mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 font-mono">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-mono">
                        {formatDate(exp.startDate)} - {exp.current ? '現在' : formatDate(exp.endDate)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDuration(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <div className={`p-4 ${colors.code} text-white rounded-lg font-mono text-sm`}>
                      <div className="text-green-400 mb-2">{'// 主要成就'}</div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-yellow-400">•</span>
                            <span className="text-gray-200">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="resume-section mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${colors.primary} font-mono flex items-center`}>
              <span className="mr-2">{'//'}</span>
              教育背景
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className={`p-4 ${colors.accent} rounded-lg border ${colors.border}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 font-mono">{edu.degree} - {edu.field}</h3>
                      <p className="text-lg text-gray-600 mb-1">{edu.institution}</p>
                      <p className="text-sm text-gray-500 font-mono">{edu.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-mono">
                        {formatDate(edu.startDate)} - {edu.current ? '現在' : formatDate(edu.endDate)}
                      </div>
                      {edu.gpa && <div className="text-xs text-gray-400">GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="resume-section mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${colors.primary} font-mono flex items-center`}>
              <span className="mr-2">{'//'}</span>
              技能專長
            </h2>
            <div className={`p-4 ${colors.code} text-white rounded-lg font-mono`}>
              <div className="text-green-400 mb-4">const skills = {'{'}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-yellow-400">&quot;{skill.name}&quot;:</span>
                    <span className={`text-sm px-2 py-1 rounded ${colors.accent} ${colors.primary}`}>
                      &quot;{getSkillLevelText(skill.level)}&quot;
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-green-400 mt-4">{'}'}</div>
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && customSections.map((section) => (
          <div key={section.id} className="resume-section">
            <h2 className={`text-2xl font-bold mb-6 ${colors.primary} font-mono flex items-center`}>
              <span className="mr-2">{'//'}</span>
              {section.title}
            </h2>
            <div className={`p-4 ${colors.accent} rounded-lg border ${colors.border}`}>
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 