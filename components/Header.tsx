import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">THU Scooter 101</Link>
          <ul className="hidden md:flex space-x-8">
            <li><Link href="/buying-guide" className="text-gray-600 hover:text-gray-900 transition-colors">购买指南</Link></li>
            <li><Link href="/usage-guide" className="text-gray-600 hover:text-gray-900 transition-colors">使用指南</Link></li>
            <li><Link href="/repair-maintenance" className="text-gray-600 hover:text-gray-900 transition-colors">维修与保养</Link></li>
            <li><Link href="/laws-safety" className="text-gray-600 hover:text-gray-900 transition-colors">法规与安全</Link></li>
            <li><Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}