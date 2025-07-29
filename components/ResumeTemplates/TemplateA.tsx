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

interface TemplateAProps {
  resumeData: ResumeData
  settings: ResumeSettings
}

export default function TemplateA({ resumeData, settings }: TemplateAProps) {
  const { personalInfo, experience, education, skills, customSections } = resumeData

  const getColorClasses = () => {
    switch (settings.colorScheme) {
      case 'blue':
        return 'text-blue-600'
      case 'green':
        return 'text-green-600'
      case 'purple':
        return 'text-purple-600'
      case 'gray':
        return 'text-gray-600'
      case 'red':
        return 'text-red-600'
      default:
        return 'text-blue-600'
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
    <div className={`p-8 ${getFontSizeClasses()} ${getSpacingClasses()} font-${settings.fontFamily}`}>
      {/* Header */}
      <div className={`pb-4 mb-6 ${getColorClasses()}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && (
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                {personalInfo.summary}
              </p>
            )}
          </div>
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          <div className="space-y-1">
            {personalInfo.email && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Email:</span>
                <span className="text-gray-900">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-900">{formatPhone(personalInfo.phone)}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Address:</span>
                <span className="text-gray-900">
                  {personalInfo.address}, {personalInfo.city} {personalInfo.state} {personalInfo.zipCode}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">LinkedIn:</span>
                <a
                  className="text-blue-600 underline break-all"
                  href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {personalInfo.linkedin}
                </a>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Website:</span>
                <a
                  className="text-blue-600 underline break-all"
                  href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {personalInfo.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="resume-section">
          <h2 className={`text-2xl font-bold mb-6 ${getColorClasses()}`}>工作經驗</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className={`pl-4 ${getColorClasses()}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{formatDate(exp.startDate)} - {exp.current ? '現在' : formatDate(exp.endDate)}</div>
                    <div>{exp.location}</div>
                    <div>{formatDuration(exp.startDate, exp.endDate, exp.current)}</div>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 mb-2">{exp.description}</p>
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
          <h2 className={`text-2xl font-bold mb-6 ${getColorClasses()}`}>教育背景</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className={`pl-4 ${getColorClasses()}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} - {edu.field}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{formatDate(edu.startDate)} - {edu.current ? '現在' : formatDate(edu.endDate)}</div>
                    <div>{edu.location}</div>
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

      {/* Skills */}
      {skills.length > 0 && (
        <div className="resume-section">
          <h2 className={`text-2xl font-bold mb-6 ${getColorClasses()}`}>技能專長</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  {skill.category && (
                    <span className="text-sm text-gray-500 ml-2">({skill.category})</span>
                  )}
                </div>
                <span className={`text-sm ${getSkillLevelColor(skill.level)}`}>
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
          <h2 className={`text-2xl font-bold mb-6 ${getColorClasses()}`}>{section.title}</h2>
          <div className={`pl-4 ${getColorClasses()}`}>
            <div className="text-gray-700 whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
