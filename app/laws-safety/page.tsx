import { Shield, AlertTriangle } from 'lucide-react'

export default function LawsSafety() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">法规与安全</h1>
          <p className="text-xl text-gray-600">
            了解校园和北京市的电动车相关法规，确保安全合规骑行
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">清华大学电动车管理规定</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">停车规定</h3>
                  <p className="text-gray-600">电动车必须停放在指定区域，禁止在建筑物入口、消防通道等地方停放。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">骑行限速</h3>
                  <p className="text-gray-600">校园内电动车最高速度不得超过15km/h。</p>
                </div>
              </li>
              <li className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">禁止载人</h3>
                  <p className="text-gray-600">电动车严禁载人，违者将受到处罚。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">北京市电动车相关法规</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <ul className="space-y-4">
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">电动车上牌要求</h3>
                  <p className="text-gray-600">在北京市使用电动车需要进行注册上牌。未上牌的电动车将被禁止上路行驶。</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">骑行头盔</h3>
                  <p className="text-gray-600">北京市法规要求电动车骑行者必须佩戴头盔。</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold">禁行区域</h3>
                  <p className="text-gray-600">电动车禁止在机动车道和部分主要道路上行驶，请注意观察交通标志。</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
