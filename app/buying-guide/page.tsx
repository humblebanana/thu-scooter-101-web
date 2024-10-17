import Link from 'next/link'
import { ShoppingCart, MapPin, Tag, FileText } from 'lucide-react'
import Image from 'next/image'

export default function BuyingGuide() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">电动车购买指南</h1>
          <p className="text-xl text-gray-600">
            找到适合您的电动车和最佳购买渠道
          </p>
        </section>
        <section id="recommendations" className="space-y-6">
          <h2 className="text-3xl font-bold">电动车推荐列表</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "小米电动滑板车Pro", brand: "小米", price: "¥2,799", range: "45km", image: "/images/xiaomi-pro.jpg" },
              { name: "雅迪G5", brand: "雅迪", price: "¥3,299", range: "60km", image: "/images/yadea-g5.jpg" },
              { name: "爱玛A500", brand: "爱玛", price: "¥3,599", range: "70km", image: "/images/aima-a500.jpg" },
              { name: "九号电动滑板车Max", brand: "九号", price: "¥2,999", range: "65km", image: "/images/ninebot-max.jpg" },
              { name: "绿源MN5", brand: "绿源", price: "¥3,799", range: "80km", image: "/images/luyuan-mn5.jpg" },
              { name: "新日XC3", brand: "新日", price: "¥3,499", range: "55km", image: "/images/xinri-xc3.jpg" },
            ].slice(0, 6).map((scooter, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <Image src={scooter.image} alt={scooter.name} width={200} height={200} className="mb-4 rounded-md" />
                <h3 className="text-lg font-semibold">{scooter.name}</h3>
                <p>品牌: {scooter.brand}</p>
                <p>价格: {scooter.price}</p>
                <p>续航: {scooter.range}</p>
                <Link
                  href={`/scooter-details/${index}`}
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  查看详情
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="purchase-channels" className="space-y-6">
          <h2 className="text-3xl font-bold">购买渠道</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "校内电动车店", location: "紫荆公寓附近", contact: "张老板 (123-4567-8901)", priceRange: "¥2,500 - ¥4,000" },
              { name: "清华周边电动车市场", location: "五道口", contact: "李经理 (234-5678-9012)", priceRange: "¥2,000 - ¥5,000" },
              { name: "官方线上商城", location: "线上", contact: "www.thuscooter.com", priceRange: "¥2,800 - ¥4,500" },
              { name: "品牌直营店", location: "中关村", contact: "400-123-4567", priceRange: "¥3,000 - ¥6,000" },
            ].map((channel, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold">{channel.name}</h3>
                <p>地点: {channel.location}</p>
                <p>联系方式: {channel.contact}</p>
                <p>价格范围: {channel.priceRange}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="promotions" className="space-y-6">
          <h2 className="text-3xl font-bold">促销信息</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold">开学季大促</h3>
            <p>所有电动车型号9折优惠，另有免费头盔赠送！</p>
            <p className="text-sm text-gray-600">有效期：2024年9月1日 - 2024年9月30日</p>
          </div>
        </section>

        <section id="registration-guide" className="space-y-6">
          <h2 className="text-3xl font-bold">电动车注册指南</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <ol className="list-decimal list-inside space-y-2">
              <li>准备所需材料：购车发票、身份证、学生证</li>
              <li>前往校园管理处领取申请表</li>
              <li>填写申请表并附上所需材料复印件</li>
              <li>提交申请并等待审核（通常需要3-5个工作日）</li>
              <li>审核通过后，领取注册证明并在电动车上安装</li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  )
}
