import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Tag, FileText, Clipboard, AlertTriangle, Phone } from 'lucide-react'
import fs from 'fs/promises'
import path from 'path'

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

async function getScooters(): Promise<Scooter[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scooters.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

async function getPurchaseChannels(): Promise<PurchaseChannel[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'purchase-channels.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(jsonData);
}

export default async function BuyingGuide() {
  let scooters: Scooter[] = [];
  let purchaseChannels: PurchaseChannel[] = [];
  let error: string | null = null;

  try {
    scooters = await getScooters();
    purchaseChannels = await getPurchaseChannels();
  } catch (e) {
    error = e instanceof Error ? e.message : '获取数据时发生未知错误';
    console.error('获取数据失败:', e);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">电动车购买指南</h1>
        <p className="text-red-500">错误: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <section className="text-center space-y-2 sm:space-y-4 mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold">电动车购买指南</h1>
        <p className="text-sm sm:text-xl text-gray-600">
          找到适合您的电动车和最佳购买渠道
        </p>
      </section>

      <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">电动车推荐列表</h2>
      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-8 italic">
        ———看看学长学姐都在骑什么电动车（持续更新ing，如有补充可点击右下角反馈🙏）
      </p>
      {scooters.length === 0 ? (
        <p>暂无电动车数据</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {scooters.map((scooter) => (
            <div 
              key={scooter.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative w-full h-32 sm:h-56 md:h-64 lg:h-72">
                <Image 
                  src={`/scooter-images/${scooter.image}`} 
                  alt={scooter.name} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-2 sm:p-4 flex-grow">
                <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{scooter.name}</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">品牌: {scooter.brand}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">价格: ¥{scooter.price}</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">续航: {scooter.range}</p>
                <div className="border-t border-gray-200 my-2"></div>
                <p className="text-xs sm:text-xs text-gray-500 font-semibold">学长学姐说：{scooter.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">购买渠道</h2>
      <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8 italic">
        ———哪里能买到电动车？
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

      <section id="registration-guide" className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-3xl font-bold">北京电动车注册挂牌指南</h2>
        <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4 flex items-center">
            <Clipboard className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> 
            注册流程
          </h3>
          <ol className="list-decimal list-inside space-y-2 sm:space-y-4 text-sm sm:text-base">
            {[
              "准备所需材料:购车发票、身份证原件及复印件、车辆购置税完税证明、交强险保单原件、车辆合格证原件等",
              "前往北京市车辆管理所或各分所(建议提前预约)",
              "填写《机动车登记申请表》",
              "缴纳相关费用(如车辆购置税、车船税等)",
              "配合工作人员进行车辆验车",
              "等待受理和审核(请保持电话畅通)",
              "审核通过后,领取号牌和机动车行驶证",
              "按规定在车辆上安装号牌和检验合格标志"
            ].map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-1 sm:mr-2 shrink-0">{index + 1}.</span>
                <span className="break-words">{step}</span>
              </li>
            ))}
          </ol>
          
          <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-4 flex items-center">
            <AlertTriangle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> 
            注意事项
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {[
              { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, text: "确保您的电动车符合北京市电动自行车管理规定,不得超标或非法改装" },
              { icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />, text: "办理过程中如有问题,可咨询车管所工作人员或拨打咨询电话" },
              { icon: <Clipboard className="w-4 h-4 sm:w-5 sm:h-5" />, text: "请关注北京市交通管理局官方网站,了解最新政策动态和办理流程变化" }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 shrink-0">{item.icon}</span>
                <span className="break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
