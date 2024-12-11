'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Tag, FileText, Clipboard, AlertTriangle, Phone } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// 定义Scooter类型
interface Scooter {
  id: number;
  name: string;
  brand: string;
  price: number;
  range: string;
  image: string;
  description: string;
}

// 定义PurchaseChannel类型
interface PurchaseChannel {
  name: string;
  location: string;
  contact: string;
  priceRange: string;
}

// 在文件顶部添加类型定义
interface RegistrationStep {
  step: string;
}

interface RegistrationNotice {
  notice: string;
}

async function getScooters(language: string): Promise<Scooter[]> {
  const response = await fetch('/api/scooters')
  const data = await response.json()
  return data[language]
}

async function getPurchaseChannels(language: string): Promise<PurchaseChannel[]> {
  const response = await fetch('/api/purchase-channels')
  const data = await response.json()
  return data[language]
}

export default function BuyingGuide() {
  const { t, tArray, language } = useLanguage();
  const [scooters, setScooters] = useState<Scooter[]>([]);
  const [purchaseChannels, setPurchaseChannels] = useState<PurchaseChannel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [scootersData, channelsData] = await Promise.all([
          getScooters(language),
          getPurchaseChannels(language)
        ]);
        setScooters(scootersData);
        setPurchaseChannels(channelsData);
      } catch (e) {
        setError(e instanceof Error ? e.message : '获取数据时发生未知错误');
        console.error('获取数据失败:', e);
      }
    }
    fetchData();
  }, [language]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('buyingGuide.title')}</h1>
        <p className="text-red-500">{t('errors.dataFetch')}: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <section className="text-center space-y-2 sm:space-y-4 mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold">{t('buyingGuide.title')}</h1>
        <p className="text-sm sm:text-xl text-gray-600">
          {t('buyingGuide.subtitle')}
        </p>
      </section>

      <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">
        {t('buyingGuide.recommendedScooters.title')}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-8 italic">
        {t('buyingGuide.recommendedScooters.subtitle')}
      </p>

      {/* Scooters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
        {scooters.map((scooter) => (
          <div key={scooter.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative w-full h-32 sm:h-56 md:h-64 lg:h-72">
              <Image 
                src={`/scooter-images/${scooter.image}`} 
                alt={scooter.name} 
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-2 sm:p-4">
              <h2 className="text-base sm:text-lg font-semibold">{scooter.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {t('buyingGuide.recommendedScooters.details.brand')}: {scooter.brand}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
                {t('buyingGuide.recommendedScooters.details.price')}: ¥{scooter.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
                {t('buyingGuide.recommendedScooters.details.range')}: {scooter.range}
              </p>
              <div className="border-t border-gray-200 my-2"></div>
              <p className="text-xs sm:text-xs text-gray-500 font-semibold">
                {t('buyingGuide.recommendedScooters.details.seniorSays')}: {scooter.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Channels Section */}
      <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">
        {t('buyingGuide.purchaseChannels.title')}
      </h2>
      <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8 italic">
        {t('buyingGuide.purchaseChannels.subtitle')}
      </p>

      {purchaseChannels.length === 0 ? (
        <p>暂无购买渠道数据</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {purchaseChannels.map((channel, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-2 sm:p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-3 min-h-[2.5em] flex items-center">{channel.name}</h3>
              <div className="space-y-1.5">
                <div className="flex items-start">
                  <MapPin className="shrink-0 mr-1.5 mt-0.5" size={14} /> 
                  <span className="text-xs sm:text-sm text-gray-600 flex-1 break-words">{channel.location}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="shrink-0 mr-1.5 mt-0.5" size={14} /> 
                  <span className="text-xs sm:text-sm text-gray-600 flex-1 break-words">{channel.contact}</span>
                </div>
                <div className="flex items-start">
                  <Tag className="shrink-0 mr-1.5 mt-0.5" size={14} /> 
                  <span className="text-xs sm:text-sm text-gray-600 flex-1 break-words">{channel.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Guide Section */}
      <section id="registration-guide" className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-3xl font-bold">{t('buyingGuide.registration.title')}</h2>
        <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
            <Clipboard className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> 
            {t('buyingGuide.registration.process.title')}
          </h3>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-4 text-sm sm:text-base">
            {tArray('buyingGuide.registration.process.steps').map((step: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-1 sm:mr-2 shrink-0">{index + 1}.</span>
                <span className="break-words">{step}</span>
              </li>
            ))}
          </ol>
          
          <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-4 flex items-center">
            <AlertTriangle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> 
            {t('buyingGuide.registration.notices.title')}
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {tArray('buyingGuide.registration.notices.items').map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 shrink-0">
                  {index === 0 ? <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> :
                   index === 1 ? <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> :
                   <Clipboard className="w-4 h-4 sm:w-5 sm:h-5" />}
                </span>
                <span className="break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
