import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Tag, FileText, Clipboard, AlertTriangle, Phone } from 'lucide-react'

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
              { name: "九号电动A2z", brand: "九号", price: "¥2,899起", range: "85km", image: "/scooter-images/ninebot-a2z.jpg" },
              { name: "绿源小果粒", brand: "绿源", price: "¥1,500左右", range: "45km", image: "/scooter-images/luyuan-xiaoguoli.jpg" },
              { name: "爱玛小坦克", brand: "爱玛", price: "¥1,300左右", range: "40km", image: "/scooter-images/aima-xiaotank.jpg" },
              { name: "爱玛A500", brand: "爱玛", price: "¥3,599", range: "70km", image: "/scooter-images/aima-a500.jpg" },
              { name: "雅迪DT6", brand: "雅迪", price: "¥3,999", range: "50-60km", image: "/scooter-images/yadea-dt6.jpg" },
              { name: "雅迪DT3", brand: "雅迪", price: "¥3,699起", range: "40-60km", image: "/scooter-images/yadea-dt3.jpg" },
            ].map((scooter, index) => (
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
              { name: "校内二手电动车", location: "校园内", contact: "朋友圈、水木助手、水木汇", priceRange: "比全新车低很多", description: "学长姐毕业季会大量出售" },
              { name: "九号电动车 (椿白旗舰店)", location: "距离学校1.9公里，海淀区", contact: "黄师傅 (19876280229)", priceRange: "¥3,999 - ¥5,399" },
              { name: "雅迪电动车 (中关村未来科技店)", location: "距离学校2公里，中关村商圈", contact: "吴师傅 (17244799886)", priceRange: "¥4,299 - ¥4,899" },
              { name: "五道口爱玛电动车 (东升园公寓)", location: "距离学校1.5公里，五道口商圈", contact: "杨师傅 (15939363430)", priceRange: "¥2,999 - ¥3,699" },
              { name: "新日电动车", location: "距离学校1.6公里，五道口商圈", contact: "赵师傅 (15502885189)", priceRange: "暂无具体价格信息" },
              { name: "台铃电动车 (中关村店)", location: "距离学校1.8公里，海淀区", contact: "杨师傅 (17713317688)", priceRange: "暂无具体价格信息" },
              { name: "雅迪电动车 (五道口店)", location: "距离学校1.4公里，五道口商圈", contact: "陈师傅 (13213509632)", priceRange: "¥2,999 - ¥3,699" },
              { name: "小驹车行爱玛电动车", location: "距离学校3公里，海淀区", contact: "张师傅 (15620695345)", priceRange: "暂无具体价格信息" },
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
            <p className="text-sm text-gray-600">效期：2024年9月1日 - 2024年9月30日</p>
          </div>
        </section>
        <section id="registration-guide" className="space-y-6">
          <h2 className="text-3xl font-bold">北京电动车注册挂牌指南</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Clipboard className="mr-2" /> 注册流程
            </h3>
            <ol className="list-decimal list-inside space-y-4">
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
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <h3 className="text-xl font-semibold mt-6 mb-4 flex items-center">
              <AlertTriangle className="mr-2" /> 注意事项
            </h3>
            <ul className="space-y-2">
              {[
                { icon: <MapPin size={18} />, text: "确保您的电动车符合北京市电动自行车管理规定,不得超标或非法改装" },
                { icon: <Phone size={18} />, text: "办理过程中如有问题,可咨询车管所工作人员或拨打咨询电话" },
                { icon: <Clipboard size={18} />, text: "请关注北京市交通管理局官方网站,了解最新政策动态和办理流程变化" }
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
