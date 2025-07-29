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

interface TemplateCProps {
  resumeData: ResumeData
  settings: ResumeSettings
}

export default function TemplateC({ resumeData, settings }: TemplateCProps) {
  const { personalInfo, experience, education, skills, customSections } = resumeData

  const getColorClasses = () => {
    switch (settings.colorScheme) {
      case 'blue':
        return { primary: 'text-blue-600', accent: 'bg-blue-50', border: 'border-blue-200' }
      case 'green':
        return { primary: 'text-green-600', accent: 'bg-green-50', border: 'border-green-200' }
      case 'purple':
        return { primary: 'text-purple-600', accent: 'bg-purple-50', border: 'border-purple-200' }
      case 'gray':
        return { primary: 'text-gray-600', accent: 'bg-gray-50', border: 'border-gray-200' }
      case 'red':
        return { primary: 'text-red-600', accent: 'bg-red-50', border: 'border-red-200' }
      default:
        return { primary: 'text-blue-600', accent: 'bg-blue-50', border: 'border-blue-200' }
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
    <div className={`p-12 ${getFontSizeClasses()} ${getSpacingClasses()} font-${settings.fontFamily} bg-white`}>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-wide">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && (
              <p className="text-gray-600 leading-relaxed text-lg max-w-3xl font-light">
                {personalInfo.summary}
              </p>
            )}
          </div>
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ml-8">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {personalInfo.email && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${colors.primary} bg-current`}></div>
              <span className="text-gray-900">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${colors.primary} bg-current`}></div>
              <span className="text-gray-900">{formatPhone(personalInfo.phone)}</span>
            </div>
          )}
          {personalInfo.address && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${colors.primary} bg-current`}></div>
              <span className="text-gray-900">
                {personalInfo.address}, {personalInfo.city} {personalInfo.state} {personalInfo.zipCode}
              </span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${colors.primary} bg-current`}></div>
              <span className="text-gray-900">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${colors.primary} bg-current`}></div>
              <span className="text-gray-900">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="resume-section">
          <h2 className={`text-2xl font-light mb-8 ${colors.primary} tracking-wide`}>
            工作經驗
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">{exp.position}</h3>
                    <p className="text-lg text-gray-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{formatDate(exp.startDate)} - {exp.current ? '現在' : formatDate(exp.endDate)}</div>
                    <div className="text-xs">{formatDuration(exp.startDate, exp.endDate, exp.current)}</div>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-3 text-gray-700">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.primary} bg-current mt-2 flex-shrink-0`}></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="resume-section">
          <h2 className={`text-2xl font-light mb-8 ${colors.primary} tracking-wide`}>
            教育背景
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-200 pl-8">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-1">{edu.degree} - {edu.field}</h3>
                    <p className="text-lg text-gray-600 mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{formatDate(edu.startDate)} - {edu.current ? '現在' : formatDate(edu.endDate)}</div>
                    {edu.gpa && <div>GPA: {edu.gpa}</div>}
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
        <div className="resume-section">
          <h2 className={`text-2xl font-light mb-8 ${colors.primary} tracking-wide`}>
            技能專長
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  {skill.category && (
                    <span className="text-sm text-gray-500 ml-2">({skill.category})</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${getSkillLevelColor(skill.level)}`}>
                  {getSkillLevelText(skill.level)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map((section) => (
        <div key={section.id} className="resume-section">
          <h2 className={`text-2xl font-light mb-8 ${colors.primary} tracking-wide`}>
            {section.title}
          </h2>
          <div className="border-l-2 border-gray-200 pl-8">
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 