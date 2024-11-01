'use client'

import React, { useState } from 'react'
import AppleStyleChat from '@/components/AppleStyleChat'
import Link from 'next/link'
import Image from 'next/image'
import { Bike, Book, Wrench, Shield, HelpCircle } from 'lucide-react'


export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const sections = [
    { title: "购买指南", icon: Bike, href: "/buying-guide", description: "找到适合您的电动车和购买渠道" },
    { title: "使用指南", icon: Book, href: "/usage-guide", description: "了解校园的停车规则和如何给电动车" },
    { title: "维修与保养", icon: Wrench, href: "/repair-maintenance", description: "获取维修点信息和保养电动车的建议" },
    { title: "法规与安全", icon: Shield, href: "/laws-safety", description: "了解校园和北京市的电动车法规" },
    { title: "常见问题", icon: HelpCircle, href: "/faq", description: "获取电动车相关的常见问题解答" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {!showContent ? (
        <div className="flex-grow flex items-center justify-center p-8 sm:p-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-t from-gray-800 to-gray-400 text-transparent bg-clip-text">
              你的下一个代步工具，何必只能脚踏
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Empowering with Scooter in Tsinghua
            </p>
            <button
              onClick={() => setShowContent(true)}
              className="px-6 py-3 bg-gradient-to-t font-bold from-gray-800 to-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300 mt-4"
            >
              开始探索
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-12">
          <div className="w-full max-w-4xl mx-auto mb-12 pt-[50px]">
            <AppleStyleChat />
          </div>
          <section className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-6xl">
            {sections.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <item.icon className="w-10 h-10 text-gray-500 mb-5" />
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
                <Link
                  href={item.href}
                  className="inline-block bg-gray-400 text-white px-3 py-2 text-sm rounded-full hover:bg-black transition-colors duration-300"
                >
                  了解更多
                </Link>
              </div>
            ))}
          </section>
        </div>
      )}

      <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
        © 2024 THU Scooter 101. 版权所有。
      </footer>
    </div>
  );
}
