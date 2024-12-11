'use client'

import { Shield } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useEffect, useState } from 'react'
import welcomeContent from '@/public/data/welcome-content.json'

export default function LawsSafety() {
  const { t, language } = useLanguage()
  const [content, setContent] = useState(welcomeContent[language])

  useEffect(() => {
    setContent(welcomeContent[language])
  }, [language])

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-8 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {t('lawsSafety.title')}
          </h1>
          <p className="text-sm sm:text-xl text-gray-600">
            {t('lawsSafety.subtitle')}
          </p>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-bold">
              {t('lawsSafety.campusRules.title')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {t('lawsSafety.campusRules.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.sections.entry.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.sections.entry.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.sections.parking.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.sections.parking.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.sections.charging.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.sections.charging.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.sections.violations.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.sections.violations.description')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-bold">
              {t('lawsSafety.cityRegulations.title')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {t('lawsSafety.cityRegulations.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.sections.registration.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.sections.registration.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.sections.standards.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.sections.standards.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.sections.traffic.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.sections.traffic.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.sections.penalties.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.sections.penalties.description')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold text-center">
            {t('lawsSafety.safetyTips.title')}
          </h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-2 sm:space-y-3 list-disc list-inside">
              {t('lawsSafety.safetyTips.items').map((tip, index) => (
                <li key={index} className="text-xs sm:text-base text-gray-600">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <h2 className="text-lg sm:text-xl font-bold mb-4">{content.title}</h2>
            {content.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-sm sm:text-lg mb-2">{section.title}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-xs sm:text-base text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {content.footer && (
              <p className="text-xs sm:text-sm text-gray-500 mt-4">{content.footer}</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
