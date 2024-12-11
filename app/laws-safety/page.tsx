'use client'

import { Shield, AlertTriangle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LawsSafety() {
  const { t } = useLanguage()

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-6 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {t('lawsSafety.title')}
          </h1>
          <p className="text-sm sm:text-xl text-gray-600">
            {t('lawsSafety.subtitle')}
          </p>
        </section>

        <section className="space-y-3 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">
            {t('lawsSafety.campusRules.title')}
          </h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.entry.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.entry.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.riding.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.riding.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.charging.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.charging.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.campusRules.violations.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.campusRules.violations.description')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">
            {t('lawsSafety.cityRegulations.title')}
          </h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.registration.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.registration.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.helmet.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.helmet.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">
                    {t('lawsSafety.cityRegulations.restrictedAreas.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('lawsSafety.cityRegulations.restrictedAreas.description')}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
