'use client'

import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle } from 'lucide-react'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const ImageSlider = dynamic(() => import('../../components/ImageSlider'), { ssr: false });

export default function UsageGuide() {
  const [typedText, setTypedText] = useState('');
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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">电动车使用指南</h1>
          <p className="text-xl text-gray-600">
            了解校园内的停车规则、充电站位置和安全骑行建议
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
              <ul className="list-disc list-inside space-y-2 text-lg text-red-800">
                <li>紫荆公寓宿舍楼下及楼外</li>
                <li>教学楼特定区域</li>
                <li>古建筑旁（清华学堂，明斋，大礼堂……）</li>
                <li>路中间</li>
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
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">允许停车区域</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "各教学楼指定电动车停车场", images: ["/images/parking1.jpg", "/images/parking2.jpg"] },
                { name: "宿舍区专用电动车停车位", images: ["/images/dorm-parking1.jpg", "/images/dorm-parking2.jpg"] },
                { name: "图书馆周边划定的停车区域", images: ["/images/library-parking1.jpg", "/images/library-parking2.jpg"] },
              ].map((area, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 relative">
                    <ImageSlider images={area.images} />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">{area.name}</h4>
                    <p className="text-sm text-gray-600">
                      这里是关于{area.name}的详细说明。您可以在这里停放您的电动车，请遵守相关规定。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "刑师傅", area: "紫荆公寓及南区", contact: "xing13269096502", price: "¥15/次", rating: "4.9/5" },
              { name: "李师傅", area: "紫荆公寓及南区", contact: "l1664019171", price: "¥18/次", rating: "4.7/5" },
              { name: "刘师傅", area: "紫荆公寓及南区", contact: "LPM572689", price: "¥20/次", rating: "4.5/5" },
              { name: "x师傅", area: "紫荆公寓及南区", contact: "000-4567-0000", price: "¥12/次", rating: "4.6/5" },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600"><MapPin className="inline-block w-4 h-4 mr-1" /> 服务区域: {service.area}</p>
                <p className="text-gray-600"><User className="inline-block w-4 h-4 mr-1" /> 联系方式（微信）: {service.contact}</p>
                <p className="text-gray-600"><Battery className="inline-block w-4 h-4 mr-1" /> 价格: {service.price}</p>
                <p className="text-gray-600"><span className="inline-block w-4 h-4 mr-1">★</span> 用户评价: {service.rating}</p>
              </div>
            ))}
          </div>
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
