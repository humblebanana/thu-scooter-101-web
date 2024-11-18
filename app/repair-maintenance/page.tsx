import { Wrench, MapPin } from 'lucide-react'

export default function RepairMaintenance() {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-8 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">维修与保养</h1>
          <p className="text-sm sm:text-xl text-gray-600">
            获取维修点信息和保养建议，延长您的电动车使用寿命
          </p>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">维修点推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {[
              { 
                name: "清芬北边维修点1（靠近宿舍离；更北边）", 
                location: "清芬食堂北侧出口", 
                contact: "暂无", 
                rating: "4.7",
                reviews: [
                  { text: "师傅很专业，维修速度快，且价格实惠，还能拖车", date: "2024-10-15" }
                ]
              },
              {
                name: "清芬北边维修点2（靠近清芬圆；更南边）", 
                location: "清芬食堂北侧出口", 
                contact: "暂无", 
                rating: "3.5",
                reviews: [
                  { text: "师傅比较敷衍，态度一般，价格也蛮贵的", date: "2024-09-12" }
                ]
              },
              { 
                name: "上门维修张师傅", 
                location: "所有位置，随叫随到", 
                contact: "13730048215", 
                rating: "4.7",
                reviews: [
                  { text: "上门很快，很方便，唯一不好的地方因为是校外的师傅，所以需要帮忙预约", date: "2024-03-14" },
                ]
              },
              { name: "持续更新ing，如有补充可点击右下角反馈🙏", location: "N/A", contact: "NA", rating: "N/A" ,reviews: [{text: "正在更新ing", date: "2024-11-04"}]},
            ].map((shop, index) => (
              <div key={index} className="bg-white rounded-lg p-3 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-base sm:text-lg font-semibold">{shop.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  <MapPin className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {shop.location}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <Wrench className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {shop.contact}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                  <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1">★</span> {shop.rating}/5
                </p>
                
                <div className="mt-2 sm:mt-4 border-t pt-2 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">学长姐评价</h4>
                  <div className="space-y-1 sm:space-y-2">
                    {shop.reviews?.map((review, idx) => (
                      <div key={idx} className="text-xs sm:text-sm">
                        <p className="text-gray-700">{review.text}</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">保养建议</h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <Wrench className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">日常检查</h3>
                  <p className="text-xs sm:text-base text-gray-600">每次骑行前检查刹车是否灵敏、轮胎气压是否正常（建议保持在2.5-2.8bar）。特别是在雨天骑行前，一定要测试刹车性能。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">电池使用建议</h3>
                  <p className="text-xs sm:text-base text-gray-600">电量保持在20%-80%之间最佳，避免经常性充满或耗尽。冬季尤其注意：电量低于20%时及时充电，防止低温导致电池损坏。夏季避免阳光直射，可用遮阳伞等遮挡。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">防雨</h3>
                  <p className="text-xs sm:text-base text-gray-600">雨天记得给车座套上防水套，特别注意电池仓和充电器要做好防水。长期露天停放建议购买防晒防雨的车衣。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">定期保养</h3>
                  <p className="text-xs sm:text-base text-gray-600">每年至少做一次全面检修，包括更换刹车片、调整链条松紧度、检查电机等。遇到异响或操控不适要及时去维修点检查。定期给链条上油可以延长使用寿命。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold">冬季使用注意</h3>
                  <p className="text-xs sm:text-base text-gray-600">冬季温度低，要特别注意：电池容易受低温影响，电量锐减，请最好电量安排。路面结冰时谨慎骑行，保持低速；长时间不用时将电池取下室内保管；做好防寒保暖，戴手套骑行。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
