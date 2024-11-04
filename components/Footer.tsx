import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left Section: Logo and Name */}
          <div className="flex items-center space-x-2">
            <Image src="/icon.svg" alt="Logo" width={24} height={24} />
            <span className="text-lg font-medium text-gray-800">THU Scooter 101</span>
          </div>

          {/* Center Section: Mission Statement */}
          <div className="text-lg text-gray-600 text-center">
            您的清华校园电动车出行一站式信息平台
          </div>

          {/* Right Section: Contact */}
          <div className="flex items-center">
            <a 
              href="mailto:humbleguava@qq.com" 
              className="text-lg text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              联系方式：humbleguava@qq.com
              
            </a>
          </div>
        </div>

        {/* Bottom Copyright - Centered */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} THU Scooter 101. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}