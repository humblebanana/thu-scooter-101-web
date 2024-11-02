'use client'

import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle, Clock, Copy, MessageSquare } from 'lucide-react'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import parking1 from '@/public/parking-images/parking-1.jpg';
import dormParking1 from '@/public/parking-images/dorm-parking-1.jpg';
import libraryParking1 from '@/public/parking-images/library-parking-1.jpg';

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
  { name: "各教学楼指定电动车停车场", image: dormParking1 },
  { name: "宿舍区专用电动车停车位", image: dormParking1 },
  { name: "图书馆周边划定的停车区域", image: dormParking1 },
];

export default function UsageGuide() {
  const [typedText, setTypedText] = useState('');
  const [chargingMasters, setChargingMasters] = useState<ChargingMaster[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fullText = "不携带电动车电池进入公寓，不在公寓内给电动车电池充电！";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
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
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">电动车使用指南</h1>
          <p className="text-xl text-gray-600">
            了解校园内的停车规则、充电站位置安全骑行建议
          </p>
        </section>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <p className="text-xl font-bold text-red-700 typing-animation">
            {typedText}
          </p>
        </div>

        <section id="parking-rules" className="space-y-8">
          <h2 className="text-3xl font-bold">停车规则</h2>
          <p className="text-lg text-gray-600 mb-4 ">
            ———若要在清华内骑电动车，请务必一定要严格遵守以下规则：
          </p>
          {/* 禁止停车区域和处罚标准并排 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 禁止停车区域 */}
            <div className="bg-red-100 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">⚠️禁止停车区域</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-red-800 font-bold">
                <li>紫荆公寓宿舍楼下及楼外，严禁停车</li>
                <li>教学楼特定区域(如六教大楼旁不能停车，请在停车时注看告示)</li>
                <li>古建筑旁（清华学堂，明斋，大礼堂……）</li>
              </ul>
            </div>

            {/* 处罚标准 */}
            <div className="bg-yellow-50 rounded-lg shadow-md p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200">
              <h3 className="text-xl font-semibold mb-4">👮违规停车处置方式和处罚标准</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 font-bold">
                <li>停在违规区域的电动车将被拖走</li>
                <li>第一次被拖走：需要持生活卡签取车单并签署承诺书</li>
                <li>第二次被拖走：需要签署违纪单并递交情况说明</li>
                <li>重要提醒：违规次数是累计的，不会重置</li>
                <li>为避免处罚，请务必将电动车停放在指定区域 💪</li>
              </ul>
            </div>
          </div>

          {/* 允许停车区域 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">允许停车区域</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parkingAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="relative w-full h-56 md:h-64 lg:h-72">
                    <Image 
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{area.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      这里是关于{area.name}的详细说明。您可以在这里停放您的电动车，请遵守相关规定。
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      <li>停车时请整齐有序排列</li>
                      <li>注意不要阻碍他人通行</li>
                      <li>请使用车锁保护您的车辆安全</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section id="charging-stations" className="space-y-6">
          <h2 className="text-3xl font-bold">充电站地图</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                src="https://map.baidu.com/@12959238.56,4825347.47,15z"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
            <p className="text-gray-600 mb-4 font-bold">将以下内容的地址一键复制到地图中，即可快速导航到充电站</p>
            <h3 className="text-xl font-semibold mb-4">主要充电站位置：</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "西王庄小区充电桩",
                  location: "西王庄小区12号楼",
                  price: "¥0.7/小时",
                  rating: "4.9分，超方便的！而且应该是最近的吧，就在东南门肯德基旁边，充电的时候还能去蹭个疯狂星期四，清华学生都爱来这"
                },
                {
                  name: "北京大学家园食堂旁的充电站",
                  location: "北京大学44号楼", 
                  price: "¥0.6-0.9/小时",
                  rating: "4.8分，推荐，位置特别好找，就在家园食堂旁边，旁边有家泊星地咖啡，充电的时候可以去喝杯咖啡，基本都有空位"
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
                  name: "王庄路小区充电站（各个小区都有）",
                  location: "王庄路小区",
                  price: "¥1.8/小时",
                  rating: "4.4分，各个小区都能找到，住哪充哪，方便得很！就是得熟悉一下自己小区的位置"
                }
              ].map((station, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg mb-2">{station.name}</h4>
                  <div className="space-y-1 text-gray-600 text-sm">
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

        <section id="charging-services" className="space-y-6">
          <h2 className="text-3xl font-bold">充电师傅服务信息</h2>
          <p className="text-lg text-gray-600 mb-4 ">
            ———充电师傅可以在指定位置直接把电池取走后，隔天早上送回，单次服务费用较贵，一键复制联系方式
          </p>
          {error ? (
            <p className="text-red-500">错误: {error}</p>
          ) : chargingMasters.length === 0 ? (
            <p>正在加载充电师傅数据...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {chargingMasters.map((master) => (
                <div key={master.id} className="bg-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-2">{master.name}</h3>
                  <p className="text-gray-600"><MapPin className="inline-block w-4 h-4 mr-1" /> 服务区域: {master.area}</p>
                  <div className="flex items-center justify-between text-gray-600">
                    <p className="flex items-center">
                      <User className="inline-block w-4 h-4 mr-1" /> 
                      联系方式: {master.phone}
                    </p>
                    <button
                      onClick={() => copyToClipboard(master.phone, master.id)}
                      className="ml-2 p-1 hover:bg-gray-200 rounded-md transition-colors"
                      title="复制联系方式"
                    >
                      {copiedId === master.id ? (
                        <span className="text-green-500 text-xs">已复制!</span>
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600"><Battery className="inline-block w-4 h-4 mr-1" /> 单次价格: ¥{master.price}/次</p>
                  <p className="text-gray-600"><span className="inline-block w-4 h-4 mr-1">★</span> 用户评分: {master.rating}/5</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="safety-tips" className="space-y-6">
          <h2 className="text-3xl font-bold">安全骑行建议</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">始终佩戴头盔</h3>
                  <p className="text-gray-600">头盔可以在发生意外时保护您的头部，大降低严重伤害的风险。</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">遵守交通规则</h3>
                  <p className="text-gray-600">遵守交通信号，注意行人全，不要逆行或闯红灯。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">保持车速在15km/h以下</h3>
                  <p className="text-gray-600">校园内请控制车速，保证自己和他人的安全。</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">夜间骑行开启车灯</h3>
                  <p className="text-gray-600">确保他人能看到您，同时提高您的视野范围。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">定期检查车辆状况</h3>
                  <p className="text-gray-600">确保刹车、轮胎等关键部件处于良好状态。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
