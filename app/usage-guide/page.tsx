import Image from 'next/image'
import { MapPin, Battery, User, Shield, AlertTriangle } from 'lucide-react'

export default function UsageGuide() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">电动车使用指南</h1>
          <p className="text-xl text-gray-600">
            了解校园内的停车规则、充电站位置和安全骑行建议
          </p>
        </section>
        <section id="parking-rules" className="space-y-6">
          <h2 className="text-3xl font-bold">停车规则</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <Image 
                  src="/images/parking-rules.jpg" 
                  alt="停车规则示意图" 
                  layout="fill"
                  objectFit="cover"
                  className="absolute top-0 left-0"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <h3 className="text-xl font-semibold mb-4">允许停车区域</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>各教学楼指定电动车停车场</li>
                  <li>宿舍区专用电动车停车位</li>
                  <li>图书馆周边划定的停车区域</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-4">禁止停车区域</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>主要道路两侧</li>
                  <li>建筑物入口处</li>
                  <li>消防通道</li>
                  <li>绿化带</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-50 p-6">
              <h3 className="text-lg font-semibold mb-2">处罚标准</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>首次违规：警告</li>
                <li>第二次违规：罚款50元</li>
                <li>第三次违规：罚款100元并暂扣车辆3天</li>
                <li>多次违规：可能吊销校内电动车使用权</li>
              </ul>
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
              <li>紫荆公寓充电站</li>
              <li>清华学堂充电站</li>
              <li>图书馆北侧充电站</li>
              <li>综合体育馆充电站</li>
              <li>清华科技园充电站</li>
            </ul>
          </div>
        </section>

        <section id="charging-services" className="space-y-6">
          <h2 className="text-3xl font-bold">充电师傅服务信息</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "张师傅", area: "紫荆公寓", contact: "135-1234-5678", price: "¥5/次", rating: "4.8/5" },
              { name: "李师傅", area: "清华学堂", contact: "136-2345-6789", price: "¥5/次", rating: "4.7/5" },
              { name: "王师傅", area: "图书馆", contact: "137-3456-7890", price: "¥6/次", rating: "4.9/5" },
              { name: "赵师傅", area: "综合体育馆", contact: "138-4567-8901", price: "¥5/次", rating: "4.6/5" },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600"><MapPin className="inline-block w-4 h-4 mr-1" /> 服务区域: {service.area}</p>
                <p className="text-gray-600"><User className="inline-block w-4 h-4 mr-1" /> 联系电话: {service.contact}</p>
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
                  <p className="text-gray-600">头盔可以在发生意外时保护您的头部，大幅降低严重伤害的风险。</p>
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
