'use client'

import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle, Clock, Copy, MessageSquare } from 'lucide-react'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ImageSlider = dynamic(() => import('@/components/ImageSlider'), { ssr: false });

// 定义ChargingMaster类型
interface ChargingMaster {
  id: number;
  name: string;
  phone: string;
  area: string;
  rating: number;
  price: number;
  description: string;
}

// 定义充电站类型
interface ChargingStation {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  review: string;
}

interface ParkingArea {
  name: string;
  locations: string[];
  note: string;
}

export default function UsageGuide() {
  const { t, language } = useLanguage();
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [chargingMasters, setChargingMasters] = useState<ChargingMaster[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = "⚠️请不要携带电动车电池进入公寓！不要在公寓内给电动车电池充电！⚠️😠";
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);

  // 获取充电站数据
  useEffect(() => {
    async function fetchChargingStations() {
      try {
        const response = await fetch('/api/charging-stations');
        if (!response.ok) {
          throw new Error('Failed to fetch charging stations');
        }
        const data = await response.json();
        setChargingStations(data[language]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '获取充电站数据失败';
        setError(errorMessage);
        console.error('获取充电站数据失败:', e);
      }
    }

    fetchChargingStations();
  }, [language]);

  // 获取充电师傅数据
  useEffect(() => {
    async function fetchChargingMasters() {
      try {
        const response = await fetch('/api/charging-masters');
        if (!response.ok) {
          throw new Error('Failed to fetch charging masters');
        }
        const data = await response.json();
        setChargingMasters(data[language]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '获取充电师傅数据失败';
        setError(errorMessage);
        console.error('获取充电师傅数据失败:', e);
      }
    }

    fetchChargingMasters();
  }, [language]);

  useEffect(() => {
    // 1. 先移除 URL 中的 hash
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // 2. 强制滚动到顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 使用 instant 而不是 smooth 来避免视觉跳动
    });
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // 获取停车区域数据
  useEffect(() => {
    async function fetchParkingAreas() {
      try {
        const response = await fetch('/api/parking-areas');
        if (!response.ok) {
          throw new Error('Failed to fetch parking areas');
        }
        const data = await response.json();
        setParkingAreas(data[language]);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '获取停车区域数据失败';
        setError(errorMessage);
        console.error('获取停车区域数据失败:', e);
      }
    }

    fetchParkingAreas();
  }, [language]);

  const copyToClipboard = (text: string, id: number) => {
    try {
      // 首先尝试使用 navigator.clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 1500);
        });
      } else {
        // 后备方案：创建一个临时的 textarea 元素
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';  // 避免页面滚动
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
          document.execCommand('copy');
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 1500);
        } catch (err) {
          console.error('复制失败:', err);
        } finally {
          document.body.removeChild(textarea);
        }
      }
    } catch (error) {
      console.error('复制过程出错:', error);
    }
  };

  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-6 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {t('usageGuide.title')}
          </h1>
          <p className="text-sm sm:text-xl text-gray-600">
            {t('usageGuide.subtitle')}
          </p>
        </section>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 mb-4 sm:mb-8">
          <p className="text-base sm:text-xl font-bold text-red-700 typing-animation">
            {t('usageGuide.warning')}
          </p>
        </div>

        <section id="parking-rules" className="space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">
            {t('usageGuide.parkingRules.title')}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            {t('usageGuide.parkingRules.subtitle')}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 禁止停车区域 */}
            <div className="bg-red-100 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500">
              <h3 className="text-base sm:text-2xl font-semibold mb-4 text-red-600">
                {t('usageGuide.parkingRules.forbiddenAreas.title')}
              </h3>
              <ul className="list-disc list-inside font-semibold space-y-2">
                {t('usageGuide.parkingRules.forbiddenAreas.areas').map((area, index) => (
                  <li key={index} className="text-sm sm:text-lg text-red-800 font-bold">
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            {/* 违规停车处置方式和处罚标准 */}
            <div className="bg-orange-100 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-base sm:text-2xl font-semibold mb-4 text-orange-600">
                {t('usageGuide.parkingRules.penalties.title')}
              </h3>
              <ul className="space-y-2">
                {t('usageGuide.parkingRules.penalties.items').map((item, index) => (
                  <li key={index} className="text-sm sm:text-lg text-orange-800 font-semibold">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 允许停车区域 */}
          <h2 className="text-lg sm:text-3xl font-bold">
            {t('usageGuide.parkingRules.allowedAreas')}
          </h2>
          <section className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
              {parkingAreas.map((area, index) => (
                <div key={index} className="bg-transparent rounded-lg p-3 sm:p-6 border-l-4 border-gray-500 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-sm sm:text-xl font-bold text-gray-700 mb-2 sm:mb-4">
                    {area.name}
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-4">
                    {area.locations.map((location, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-black rounded-full mr-1.5 sm:mr-2"></span>
                        <span className="text-xs sm:text-base text-gray-700">{location}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[10px] sm:text-sm text-gray-500 italic">
                    📌 {area.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </section>
        <section id="charging-stations" className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">
            {t('usageGuide.chargingStations.sectionTitle')}
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="hidden sm:block w-full h-[600px] mb-6 rounded-lg overflow-hidden">
              <iframe
                src="https://map.baidu.com/@12959238.56,4825347.47,15z"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
            <div className="block sm:hidden mb-4 text-sm text-gray-600 font-semibold">
              <p>将以下内容的地址一键复制到您的地图中，即可快速导航到充电站。充电桩信息持续更新，如有补充可点击右下角反馈🙏</p>
            </div>
            <h3 className="text-base sm:text-2xl font-semibold mb-4">
              {t('usageGuide.chargingStations.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {chargingStations.map((station) => (
                <div key={station.id} className="bg-gray-50 rounded-lg p-2 sm:p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2">{station.name}</h4>
                  <div className="space-y-0.5 sm:space-y-1 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-grow truncate mr-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" /> 
                        <span className="truncate">{station.location}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(station.location, station.id)}
                        className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-md transition-colors"
                        title="复制地址"
                        aria-label="复制地址"
                      >
                        {copiedId === station.id ? (
                          <span className="text-green-500 text-xs whitespace-nowrap">已复制!</span>
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 hover:text-gray-700" />
                        )}
                      </button>
                    </div>
                    <p className="flex items-center">
                      <Battery className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" /> 
                      ¥{station.price}/次
                    </p>
                    <div className="mt-2 border-t pt-2">
                      <div className="flex items-center mb-1">
                        <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500">★</span>
                        <span className="font-semibold">{station.rating}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                        {station.review}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="charging-services" className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">
            {t('usageGuide.chargingMasters.title')}
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-4">
            {t('usageGuide.chargingMasters.subtitle')}
          </p>
          {error ? (
            <p className="text-red-500">{t('usageGuide.chargingMasters.error', { error })}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chargingMasters.map((master) => (
                <div key={master.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{master.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{master.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{master.area}</span>
                      </div>
                      <div className="flex items-center">
                        <Battery className="w-4 h-4 mr-1" />
                        <span>¥{master.price}/次</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="truncate">{master.phone}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(master.phone, master.id)}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {copiedId === master.id ? (
                          <span className="text-green-500 text-xs">已复制!</span>
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-3xl font-bold">
            {t('usageGuide.safetyTips.title')}
          </h2>
          
          <div className="space-y-6">
            {t('usageGuide.safetyTips.tips').map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
