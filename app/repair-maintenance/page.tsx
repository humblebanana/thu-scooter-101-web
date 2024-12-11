'use client'

import { Wrench, MapPin } from 'lucide-react'
import repairStationsData from '@/public/data/repair-stations.json'
import { RepairStation } from '../types/routes'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RepairMaintenance() {
  const { t, language } = useLanguage()
  const repairStations: RepairStation[] = repairStationsData[language].repairStations

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-8 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {t('repairMaintenance.title')}
          </h1>
          <p className="text-sm sm:text-xl text-gray-600">
            {t('repairMaintenance.subtitle')}
          </p>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">
            {t('repairMaintenance.repairStations.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {repairStations.map((station) => (
              <div key={station.id} className="bg-white rounded-lg p-3 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold">{station.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  <MapPin className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {station.location}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <Wrench className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {station.contact}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                  <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1">★</span> {station.rating}/5
                </p>
                
                <div className="mt-2 sm:mt-4 border-t pt-2 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                    {t('repairMaintenance.repairStations.seniorReviews')}
                  </h4>
                  <div className="space-y-1 sm:space-y-2">
                    {station.reviews?.map((review, idx) => (
                      <div key={idx} className="text-xs sm:text-sm">
                        <p className="text-gray-700">{review.text}</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">
            {t('repairMaintenance.maintenanceTips.title')}
          </h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    {t('repairMaintenance.maintenanceTips.dailyCheck.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('repairMaintenance.maintenanceTips.dailyCheck.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    {t('repairMaintenance.maintenanceTips.batteryUsage.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('repairMaintenance.maintenanceTips.batteryUsage.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    {t('repairMaintenance.maintenanceTips.rainProtection.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('repairMaintenance.maintenanceTips.rainProtection.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    {t('repairMaintenance.maintenanceTips.regularMaintenance.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('repairMaintenance.maintenanceTips.regularMaintenance.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">
                    {t('repairMaintenance.maintenanceTips.winterUsage.title')}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600">
                    {t('repairMaintenance.maintenanceTips.winterUsage.description')}
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
