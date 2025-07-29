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

interface TemplateBProps {
  resumeData: ResumeData
  settings: ResumeSettings
}

export default function TemplateB({ resumeData, settings }: TemplateBProps) {
  const { personalInfo, experience, education, skills, customSections } = resumeData

  const getColorClasses = () => {
    switch (settings.colorScheme) {
      case 'blue':
        return { bg: 'bg-blue-600', text: 'text-blue-600' }
      case 'green':
        return { bg: 'bg-green-600', text: 'text-green-600' }
      case 'purple':
        return { bg: 'bg-purple-600', text: 'text-purple-600' }
      case 'gray':
        return { bg: 'bg-gray-600', text: 'text-gray-600' }
      case 'red':
        return { bg: 'bg-red-600', text: 'text-red-600' }
      default:
        return { bg: 'bg-blue-600', text: 'text-blue-600' }
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
        return 'space-y-2'
      case 'spacious':
        return 'space-y-6'
      default:
        return 'space-y-4'
    }
  }

  return (
    <div className={`${getFontSizeClasses()} ${getSpacingClasses()} font-${settings.fontFamily}`}>
      {/* Header with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 p-8">
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && (
              <p className="text-gray-600 leading-relaxed text-lg">
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <div className="resume-section">
              <h2 className={`text-2xl font-bold mb-6 ${getColorClasses().text}`}>
                工作經驗
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{exp.position}</h3>
                        <p className="text-lg text-gray-600 mb-1">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.location}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{formatDate(exp.startDate)} - {exp.current ? '現在' : formatDate(exp.endDate)}</div>
                        <div>{formatDuration(exp.startDate, exp.endDate, exp.current)}</div>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mb-3">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
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
              <h2 className={`text-2xl font-bold mb-6 ${getColorClasses().text}`}>
                教育背景
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="pl-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{edu.degree} - {edu.field}</h3>
                        <p className="text-lg text-gray-600 mb-1">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.location}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{formatDate(edu.startDate)} - {edu.current ? '現在' : formatDate(edu.endDate)}</div>
                        {edu.gpa && <div>GPA: {edu.gpa}</div>}
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className={`lg:col-span-1 p-8 ${getColorClasses().bg} text-white`}>
          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">聯絡資訊</h3>
            <div className="space-y-3">
              {personalInfo.email && (
                <div>
                  <div className="text-sm opacity-80">Email</div>
                  <div className="font-medium">{personalInfo.email}</div>
                </div>
              )}
              {personalInfo.phone && (
                <div>
                  <div className="text-sm opacity-80">Phone</div>
                  <div className="font-medium">{formatPhone(personalInfo.phone)}</div>
                </div>
              )}
              {personalInfo.address && (
                <div>
                  <div className="text-sm opacity-80">Address</div>
                  <div className="font-medium">
                    {personalInfo.address}, {personalInfo.city} {personalInfo.state} {personalInfo.zipCode}
                  </div>
                </div>
              )}
              {personalInfo.linkedin && (
                <div>
                  <div className="text-sm opacity-80">LinkedIn</div>
                  <div className="font-medium">{personalInfo.linkedin}</div>
                </div>
              )}
              {personalInfo.website && (
                <div>
                  <div className="text-sm opacity-80">Website</div>
                  <div className="font-medium">{personalInfo.website}</div>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">技能專長</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm opacity-80">
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                    {skill.category && (
                      <div className="text-sm opacity-70">({skill.category})</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Custom Sections */}
      {customSections.length > 0 && (
        <div className="lg:col-span-2 p-8">
          {customSections.map((section) => (
            <div key={section.id} className="resume-section">
              <h2 className={`text-2xl font-bold mb-6 ${getColorClasses().text}`}>
                {section.title}
              </h2>
              <div className="pl-6">
                <div className="text-gray-700 whitespace-pre-wrap">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
