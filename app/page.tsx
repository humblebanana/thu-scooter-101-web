import Link from 'next/link'
import { Bike, Book, Wrench, Shield } from 'lucide-react'

export default function Home() {
  const sections = [
    { title: "购买指南", icon: Bike, href: "/buying-guide", description: "找到适合您的电动车和购买渠道" },
    { title: "使用指南", icon: Book, href: "/usage-guide", description: "了解校园内的停车规则和充电站位置" },
    { title: "维修与保养", icon: Wrench, href: "/repair-maintenance", description: "获取维修点信息和保养建议" },
    { title: "法规与安全", icon: Shield, href: "/laws-safety", description: "了解校园和北京市的电动车相关法规" },
  ]

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">欢迎来到 THU Scooter 101</h1>
        <p className="text-xl text-muted-foreground">
          您的清华大学电动车全方位指南，从购买到维护，我们为您提供全面的信息和支持。
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <item.icon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <Link
              href={item.href}
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              了解更多
            </Link>
          </div>
        ))}
      </section>
    </div>
  )
}