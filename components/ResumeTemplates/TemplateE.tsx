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

interface TemplateEProps {
  resumeData: ResumeData
  settings: ResumeSettings
}

export default function TemplateE({ resumeData, settings }: TemplateEProps) {
  const { personalInfo, experience, education, skills, customSections } = resumeData

  const getColorClasses = () => {
    switch (settings.colorScheme) {
      case 'blue':
        return { 
          primary: 'text-blue-700', 
          bg: 'bg-blue-700', 
          accent: 'bg-blue-50', 
          border: 'border-blue-300',
          header: 'bg-blue-800'
        }
      case 'green':
        return { 
          primary: 'text-green-700', 
          bg: 'bg-green-700', 
          accent: 'bg-green-50', 
          border: 'border-green-300',
          header: 'bg-green-800'
        }
      case 'purple':
        return { 
          primary: 'text-purple-700', 
          bg: 'bg-purple-700', 
          accent: 'bg-purple-50', 
          border: 'border-purple-300',
          header: 'bg-purple-800'
        }
      case 'gray':
        return { 
          primary: 'text-gray-700', 
          bg: 'bg-gray-700', 
          accent: 'bg-gray-50', 
          border: 'border-gray-300',
          header: 'bg-gray-800'
        }
      case 'red':
        return { 
          primary: 'text-red-700', 
          bg: 'bg-red-700', 
          accent: 'bg-red-50', 
          border: 'border-red-300',
          header: 'bg-red-800'
        }
      default:
        return { 
          primary: 'text-blue-700', 
          bg: 'bg-blue-700', 
          accent: 'bg-blue-50', 
          border: 'border-blue-300',
          header: 'bg-blue-800'
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
      {/* Professional Header */}
      <div className={`${colors.header} text-white p-8`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && (
              <p className="text-lg opacity-90 leading-relaxed max-w-3xl">
                {personalInfo.summary}
              </p>
            )}
          </div>
          {settings.showPhoto && personalInfo.photoUrl && (
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center ml-8">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Contact Information Table */}
      <div className="p-8">
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-0 font-semibold text-gray-700 w-24">Email:</td>
              <td className="py-3 px-0 text-gray-900">{personalInfo.email || 'N/A'}</td>
              <td className="py-3 px-0 font-semibold text-gray-700 w-24">Phone:</td>
              <td className="py-3 px-0 text-gray-900">{formatPhone(personalInfo.phone) || 'N/A'}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="py-3 px-0 font-semibold text-gray-700">Address:</td>
              <td className="py-3 px-0 text-gray-900">
                {personalInfo.address ? `${personalInfo.address}, ${personalInfo.city} ${personalInfo.state} ${personalInfo.zipCode}` : 'N/A'}
              </td>
              <td className="py-3 px-0 font-semibold text-gray-700">LinkedIn:</td>
              <td className="py-3 px-0 text-gray-900">{personalInfo.linkedin || 'N/A'}</td>
            </tr>
            <tr>
              <td className="py-3 px-0 font-semibold text-gray-700">Website:</td>
              <td className="py-3 px-0 text-gray-900">{personalInfo.website || 'N/A'}</td>
              <td className="py-3 px-0"></td>
              <td className="py-3 px-0"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="px-8 pb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colors.primary} border-b-2 ${colors.border} pb-2`}>
            專業經驗
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className={`${colors.bg} text-white p-4`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{exp.position}</h3>
                      <p className="text-lg opacity-90">{exp.company}</p>
                      <p className="text-sm opacity-75">{exp.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {formatDate(exp.startDate)} - {exp.current ? '現在' : formatDate(exp.endDate)}
                      </div>
                      <div className="text-xs opacity-75">
                        {formatDuration(exp.startDate, exp.endDate, exp.current)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  {exp.description && (
                    <p className="text-gray-700 mb-4 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">主要成就：</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="leading-relaxed">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="px-8 pb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colors.primary} border-b-2 ${colors.border} pb-2`}>
            教育背景
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className={`p-6 ${colors.accent} rounded-lg border ${colors.border}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree} - {edu.field}</h3>
                    <p className="text-lg text-gray-600 mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 font-medium">
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
        <div className="px-8 pb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colors.primary} border-b-2 ${colors.border} pb-2`}>
            技能專長
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className={`p-4 border ${colors.border} rounded-lg bg-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{skill.name}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${colors.accent} ${colors.primary}`}>
                    {getSkillLevelText(skill.level)}
                  </span>
                </div>
                {skill.category && (
                  <p className="text-sm text-gray-500">{skill.category}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.length > 0 && customSections.map((section) => (
        <div key={section.id} className="px-8 pb-8">
          <h2 className={`text-2xl font-bold mb-6 ${colors.primary} border-b-2 ${colors.border} pb-2`}>
            {section.title}
          </h2>
          <div className={`p-6 ${colors.accent} rounded-lg border ${colors.border}`}>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 