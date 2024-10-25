'use client'

import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle } from 'lucide-react'
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
  { name: "各教学楼指定电动车停车场", image: parking1 },
  { name: "宿舍区专用电动车停车位", image: dormParking1 },
  { name: "图书馆周边划定的停车区域", image: libraryParking1 },
];

export default function UsageGuide() {
  const [typedText, setTypedText] = useState('');
  const [chargingMasters, setChargingMasters] = useState<ChargingMaster[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fullText = "不要把电池带进室内充电！ 不要把电动车停在宿舍楼下！ 不要拔别人正在充电的插座！";

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
          
          {/* 禁止停车区域和处罚标准并排 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 禁止停车区域 */}
            <div className="bg-red-100 rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">禁止停车区域</h3>
              <ul className="list-disc list-inside space-y-2 text-lg text-red-800 text-bold">
                <li>紫荆公寓宿舍楼下及楼外</li>
                <li>教学楼特定区域</li>
                <li>古建筑旁（清华学堂，明斋，大礼堂……）</li>
                <li>马路中间</li>
              </ul>
            </div>

            {/* 处罚标准 */}
            <div className="bg-yellow-50 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">违规停车处置方式和处罚标准</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>停在违规区域将会被拖走</li>
                <li>拖走后将要通过学生卡去取车</li>
                <li>一个人只有一次机会取车的机会</li>
                <li>第二次再被拖将要收到处罚</li>
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
                    <img 
                      src={area.image} 
                      alt={area.name} 
                      className="w-full h-full object-cover"
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
            <p className="text-gray-600 mb-4">点击地图上的标记可查看充电站详细信息，包括收费标准和实时可用性。</p>
            <h3 className="text-xl font-semibold mb-2">主要充电站位置：</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>北大充电站</li>
              <li>清华家属区充电桩</li>
              <li>五道口地铁站充电桩</li>
              <li>东升大厦充电桩</li>
              <li>清华科技园充电站</li>
            </ul>
          </div>
        </section>

        <section id="charging-services" className="space-y-6">
          <h2 className="text-3xl font-bold">充电师傅服务信息</h2>
          {error ? (
            <p className="text-red-500">错误: {error}</p>
          ) : chargingMasters.length === 0 ? (
            <p>正在加载充电师傅数据...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {chargingMasters.map((master) => (
                <div key={master.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-2">{master.name}</h3>
                  <p className="text-gray-600"><MapPin className="inline-block w-4 h-4 mr-1" /> 服务区域: {master.area}</p>
                  <p className="text-gray-600"><User className="inline-block w-4 h-4 mr-1" /> 联系��式: {master.phone}</p>
                  <p className="text-gray-600"><Battery className="inline-block w-4 h-4 mr-1" /> 价格: ¥{master.price}/次</p>
                  <p className="text-gray-600"><span className="inline-block w-4 h-4 mr-1">★</span> 用户评价: {master.rating}/5</p>
                  <p className="text-gray-600">{master.description}</p>
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
                  <p className="text-gray-600">遵守交通信号，注意行人安全，不要逆行或闯红灯。</p>
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
