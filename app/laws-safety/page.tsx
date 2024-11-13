import { Shield, AlertTriangle } from 'lucide-react'

export default function LawsSafety() {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="space-y-6 sm:space-y-12">
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold">法规与安全</h1>
          <p className="text-sm sm:text-xl text-gray-600">
            了解校园和北京市的电动车相关法规，确保安全合规骑行
          </p>
        </section>

        <section className="space-y-3 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">清华大学电动车管理规定</h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">电动车进入校园规定</h3>
                  <p className="text-xs sm:text-base text-gray-600">自2021年11月1日起，禁止未悬挂正规号牌的电动自行车进入校园。未持有电子标签的电动自行车禁止进入学生生活区。</p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">骑行规则</h3>
                  <p className="text-xs sm:text-base text-gray-600">校园内限速15公里/小时，避让行人和自行车，禁止鸣笛噪音，禁止边行驶边使用手机，提倡骑行时佩戴安全头盔。</p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">充电管理</h3>
                  <p className="text-xs sm:text-base text-gray-600">电动自行车及电池不得进入所有教学、科研、办公场所和学生公寓。未经学校审核批准，不得私自建设和运行电动车充电设施。</p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">违规处理</h3>
                  <p className="text-xs sm:text-base text-gray-600">对违反相关规定和拒不服从管理的情况，学校将采取提醒劝阻、登记记录、挪移车辆并集中停放等措施，并追究相关责任。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3 sm:space-y-6">
          <h2 className="text-xl sm:text-3xl font-bold">北京市电动车相关法规</h2>
          <div className="bg-white rounded-lg p-3 sm:p-6 shadow-md">
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">电动车上牌要求</h3>
                  <p className="text-xs sm:text-base text-gray-600">在北京市使用电动车需要进行注册上牌。未上牌的电动车将被禁止上路行驶。</p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">骑行头盔</h3>
                  <p className="text-xs sm:text-base text-gray-600">北京市法规要求电动车骑行者必须佩戴头盔。</p>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">禁行区域</h3>
                  <p className="text-xs sm:text-base text-gray-600">电动车禁止在机动车道和部分主要道路上行驶，请注意观察交通标志。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
