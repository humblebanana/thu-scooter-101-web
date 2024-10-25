import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bike, Book, Wrench, Shield, ShoppingCart } from 'lucide-react'
import AppleStyleChat from '@/components/AppleStyleChat'

export default function Home() {
  const sections = [
    { title: "购买指南", icon: Bike, href: "/buying-guide", description: "找到适合您的电动车和购买渠道" },
    { title: "使用指南", icon: Book, href: "/usage-guide", description: "了解停车规则和充电站位置" },
    { title: "维修与保养", icon: Wrench, href: "/repair-maintenance", description: "获取维修点信息和保养建议" },
    { title: "法规与安全", icon: Shield, href: "/laws-safety", description: "了解校园和北京市的电动车法规" },
    { title: "二手市场", icon: ShoppingCart, href: "/second-hand-market", description: "买卖二手电动车" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 via-gray-550 to-gray-900">
         你的下一个代步工具，何必只能脚踏
        </h1>
        <p className="text-xl text-gray-600">
          Empowering with Scooter in Tsinghua
        </p>
      </section>

      <section className="max-w-3xl mx-auto">
        <AppleStyleChat />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sections.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <item.icon className="w-8 h-8 text-gray-500 mb-2" />
            <h2 className="text-base font-semibold mb-1">{item.title}</h2>
            <p className="text-gray-600 mb-2 text-xs">{item.description}</p>
            <Link
              href={item.href}
              className="inline-block bg-gray-400 text-white px-2 py-1 text-xs rounded-full hover:bg-black transition-colors duration-300"
            >
              了解更多
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
