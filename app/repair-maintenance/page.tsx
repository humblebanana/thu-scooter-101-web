import { Wrench, MapPin } from 'lucide-react'

export default function RepairMaintenance() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">维修与保养</h1>
          <p className="text-xl text-gray-600">
            获取维修点信息和保养建议，延长您的电动车使用寿命
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">维修点推荐</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "校内维修点", location: "紫荆公寓附近", contact: "010-1234-5678", rating: "4.8" },
              { name: "官方售后服务中心", location: "五道口", contact: "400-123-4567", rating: "4.9" },
              { name: "老张电动车修理", location: "中关村", contact: "135-1234-5678", rating: "4.7" },
              { name: "快修侠", location: "学院路", contact: "138-2345-6789", rating: "4.6" },
            ].map((shop, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold">{shop.name}</h3>
                <p className="text-gray-600"><MapPin className="inline-block w-4 h-4 mr-1" /> {shop.location}</p>
                <p className="text-gray-600"><Wrench className="inline-block w-4 h-4 mr-1" /> {shop.contact}</p>
                <p className="text-gray-600"><span className="inline-block w-4 h-4 mr-1">★</span> {shop.rating}/5</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">保养建议</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">定期检查轮胎</h3>
                  <p className="text-gray-600">每月检查轮胎气压，保持在建议范围内。及时更换磨损严重的轮胎。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">电池保养</h3>
                  <p className="text-gray-600">避免电池完全放电，定期充电。不要在极端温度下给电池充电。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">清洁与润滑</h3>
                  <p className="text-gray-600">定期清洁车身，特别是链条和齿轮。适当润滑移动部件。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
