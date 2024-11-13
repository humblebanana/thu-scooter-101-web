'use client'

import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle, Clock, Copy, MessageSquare } from 'lucide-react'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

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

const parkingAreas = [
  { 
    name: "教学楼区域",
    locations: [
      "一教至五教周边指定区域",
      "六教（除架空层外）指定区域",
      "一般院系楼外皆能停车",
      "待补充……"
    ],
    note: "请注意观察每个教学楼附近的停车标识，严格遵守停放规范"
  },
  { 
    name: "宿舍区域",
    locations: [
      "紫荆篮球场旁停车带",
      "紫荆网球场旁停车带",
      "紫荆34号楼，紫荆8号楼，紫荆11号楼对面停车带（沿着紫操边缘）",
      "待补充……"
    ],
    note: "宿舍区请不要将车停到架空层"
  },
  { 
    name: "公共区域",
    locations: [
      "图书馆周边皆可停，除李文正馆和逸夫馆有特殊要求外",
      "综体北体周边暂无特殊规定皆可停车",
      "食堂周边规划区域",
      "待补充……"
    ],
    note: "公共区域停车需特别注意不要影响行人通行"
  }
];

export default function UsageGuide() {
  const [typedText, setTypedText] = useState('');
  const [chargingMasters, setChargingMasters] = useState<ChargingMaster[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fullText = "⚠️请不要携带电动车电池进入公寓！不要在公寓内给电动车电池充电！⚠️😠";

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

  useEffect(() => {
    async function fetchChargingMasters() {
      try {
        const response = await fetch('/api/charging-masters');
        if (!response.ok) {
          throw new Error('Failed to fetch charging masters');
        }
        const data = await response.json();
        setChargingMasters(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : '获取充电师傅数据时发生未知错误';
        setError(errorMessage);
        console.error('获取充电师傅数据失败:', e);
      }
    }

    fetchChargingMasters();
  }, []);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      // 1.5秒后重置复制状态
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold">电动车使用指南</h1>
          <p className="text-sm sm:text-xl text-gray-600">
            了解校园内的停车规则、充电站位置安全骑行建议
          </p>
        </section>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 sm:p-4 mb-4 sm:mb-8">
          <p className="text-base sm:text-xl font-bold text-red-700 typing-animation">
            {typedText}
          </p>
        </div>

        <section id="parking-rules" className="space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">停车规则</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 ">
            ———若要在清华内骑电动车，请务必一定要严格遵守以下规则：
          </p>
          {/* 禁止停车区域和处罚标准并排 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 禁止停车区域 */}
            <div className="bg-red-100 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500">
              <h3 className="text-base sm:text-2xl font-semibold mb-4 text-red-600">⚠️禁止停车区域</h3>
              <ul className="list-disc list-inside font-semibold space-y-2">
                <li className="text-sm sm:text-lg text-red-800 font-bold">紫荆公寓宿舍楼下及楼外，严禁停车</li>
                <li className="text-sm sm:text-lg text-red-800 font-bold">教学楼特定区域(如六教大楼旁不能停车，请在停车时注看告示)</li>
                <li className="text-sm sm:text-lg text-red-800 font-bold">古建筑旁（清华学堂，明斋，大礼堂……）</li>
              </ul>
            </div>

            {/* 处罚标准 */}
            <div className="bg-yellow-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
              <h3 className="text-base sm:text-xl font-semibold mb-4">👮违规停车处置方式和处罚标准</h3>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-sm sm:text-base text-gray-700 font-bold">停在违规区域的电动车将被拖走</li>
                <li className="text-sm sm:text-base text-gray-700 font-bold">第一次被拖走：需要持生活卡签取车单并签署承诺书</li>
                <li className="text-sm sm:text-base text-gray-700 font-bold">第二次被拖走：需要签署违纪单并递交情况说明</li>
                <li className="text-sm sm:text-base text-gray-700 font-bold">重要提醒：违规次数是累计的，不会重置</li>
                <li className="text-sm sm:text-base text-gray-700 font-bold">为避免处罚，请务必将电动车停放在指定区域 💪</li>
              </ul>
            </div>
          </div>

          {/* 允许停车区域 */}
          <section className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-3xl font-bold">允许停车区域</h2>
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
          <h2 className="text-lg sm:text-3xl font-bold">充电站位置</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                src="https://map.baidu.com/@12959238.56,4825347.47,15z"
                width="100%"
                height="300"
                className="sm:height-700"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
            <p className="text-gray-600 mb-4 font-bold">将以下内容的地址一键复制到地图中，即可快速导航到充电站</p>
            <h3 className="text-base sm:text-xl font-semibold mb-4">主要充电站位置：</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {[
                {
                  name: "西王庄小区充电桩",
                  location: "西王庄小区12号楼",
                  price: "¥0.7/小时",
                  rating: "4.9分，超方便的！而且应该是最近的吧，就在东南门肯德基旁边，充电的时候还能去蹭个疯狂星期四，清华学生都爱来这"
                },
                {
                  name: "北大家园食堂充电站",
                  location: "北京大学44号楼", 
                  price: "¥0.6-0.9/小时",
                  rating: "4.8分，十分推荐！位置特别好找就在家园食堂旁边，旁边有家泊星地咖啡，充电的时候可以去喝杯咖啡，基本都有空位"
                },
                {
                  name: "清华家属区充电桩",
                  location: "清华大学照澜职工食堂",
                  price: "¥2/小时",
                  rating: "4.0分，劝退！没有家属充电卡根本充不了，而且僵尸车超多，想找个位置太难了"
                },
                {
                  name: "五道口地铁站充电桩",
                  location: "优盛大厦",
                  price: "¥1/小时",
                  rating: "4.6分，地铁站边上挺方便的，就是得跟外卖小哥抢位置，建议避开大晚上去充电"
                },
                {
                  name: "圆明园地铁站充电桩",
                  location: "地铁圆明园站c口",
                  price: "¥0.5/度",
                  rating: "4.3分，位置很好找，就在C出口旁边，充电也挺快，就是价格小贵"
                },
                {
                  name: "王庄路小区充电站 ",
                  location: "王庄路小区",
                  price: "¥1.8/小时",
                  rating: "4.4分，各个小区里面都能找到，住哪充哪，方便得很！就是得熟悉一下自己小区的位置"
                }
              ].map((station, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2 sm:p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2">{station.name}</h4>
                  <div className="space-y-0.5 sm:space-y-1 text-gray-600 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <p className="flex items-center">
                        <MapPin className="inline-block w-4 h-4 mr-1" /> 
                        {station.location}
                      </p>
                      <button
                        onClick={() => copyToClipboard(station.location, index)}
                        className="ml-2 p-1 hover:bg-gray-200 rounded-md transition-colors"
                        title="复制地址"
                      >
                        {copiedId === index ? (
                          <span className="text-green-500 text-xs">已复制!</span>
                        ) : (
                          <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                        )}
                      </button>
                    </div>
                    <p><Battery className="inline-block w-4 h-4 mr-1" /> {station.price}</p>
                    <p><span className="inline-block w-4 h-4 mr-1">★</span> {station.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="charging-services" className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">充电师傅服务信息</h2>
          <p className="text-sm sm:text-lg text-gray-600 mb-4">
            ———充电师傅可以在指定位置直接把电池取走后，隔天早上送回，单次服务费用较贵，一键复制联系方式
          </p>
          {error ? (
            <p className="text-red-500">错误: {error}</p>
          ) : chargingMasters.length === 0 ? (
            <p>正在加载充电师傅数据...</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {chargingMasters.map((master) => (
                <div 
                  key={master.id} 
                  className="bg-gray-100 rounded-lg p-2 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm sm:text-lg font-semibold">{master.name}</h3>
                      <div className="flex items-center text-xs sm:text-sm text-gray-600">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{master.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm truncate">{master.area}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{master.phone}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(master.phone, master.id)}
                        className="p-1 hover:bg-gray-200 rounded-md transition-colors"
                        title="复制联系方式"
                      >
                        {copiedId === master.id ? (
                          <span className="text-green-500 text-xs">已复制!</span>
                        ) : (
                          <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 hover:text-gray-700" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <Battery className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{master.price}/次</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="safety-tips" className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-3xl font-bold">安全骑行建议</h2>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">始终佩戴头盔</h3>
                  <p className="text-xs sm:text-base text-gray-600">头盔可以在发生意外时保护您的头部，大降低严重伤害的风险。</p>
                </div>
              </li>

              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">遵守交通规则</h3>
                  <p className="text-xs sm:text-base text-gray-600">遵守交通信号，注意行人安全，不要逆行或闯红灯。</p>
                </div>
              </li>

              <li className="flex items-start">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">保持车速在15km/h以下</h3>
                  <p className="text-xs sm:text-base text-gray-600">校园内请控制车速，保证自己和他人的安全。</p>
                </div>
              </li>

              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">夜间骑行开启车灯</h3>
                  <p className="text-xs sm:text-base text-gray-600">确保他人能看到您，同时提高您的视野范围。</p>
                </div>
              </li>

              <li className="flex items-start">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-lg font-semibold mb-0.5 sm:mb-1">定期检查车辆状况</h3>
                  <p className="text-xs sm:text-base text-gray-600">确保刹车、轮胎等关键部件处于良好状态。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
