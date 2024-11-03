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
              { name: "清芬旁维修点", location: "清芬食堂北侧出口", contact: "暂无", rating: "4.5" },
              { name: "上门维修张师傅", location: "所有位置，随叫随到", contact: "13730048215", rating: "4.7" },
              { name: "正在更新ing", location: "N/A", contact: "NA", rating: "N/A" },
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
                  <h3 className="font-semibold">日常检查</h3>
                  <p className="text-gray-600">每次骑行前检查刹车是否灵敏、轮胎气压是否正常（建议保持在2.5-2.8bar）。特别是在雨天骑行前，一定要测试刹车性能。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">电池使用建议</h3>
                  <p className="text-gray-600">电量保持在20%-80%之间最佳，避免经常性充满或耗尽。冬季尤其注意：电量低于20%时及时充电，防止低温导致电池损坏。夏季避免阳光直射，可用遮阳伞等遮挡。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">防雨</h3>
                  <p className="text-gray-600">雨天记得给车座套上防水套，特别注意仪表盘和电池仓要做好防水。长期露天停放建议购买防晒防雨的车衣。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">定期保养</h3>
                  <p className="text-gray-600">每学期至少做一次全面检修（约300-500元），包括更换刹车片、调整链条松紧度、检查电机等。遇到异响或操控不适要及时去维修点检查。定期给链条上油可以延长使用寿命。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">冬季使用注意</h3>
                  <p className="text-gray-600">冬季温度低，要特别注意：电池预热后再骑行，避免冷启动；路面结冰时谨慎骑行，保持低速；长时间不用时将电池取下室内保管；做好防寒保暖，戴手套骑行。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
