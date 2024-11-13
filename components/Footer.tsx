import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* 将 flex-wrap 改为 flex-col，在 sm 断点处恢复为 row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 sm:justify-between">
          {/* Left Section: Logo and Name */}
          <div className="flex items-center space-x-2">
            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]">
              <Image src="/icon.svg" alt="Logo" width={24} height={24} className="w-full h-full" />
            </div>
            <span className="text-base sm:text-lg font-medium text-gray-800">THU Scooter 101</span>
          </div>

          {/* Center Section: Mission Statement */}
          <div className="text-base sm:text-lg text-gray-600 text-center">
            您的清华校园电动车出行一站式信息平台
          </div>

          {/* Right Section: Contact */}
          <div className="flex items-center">
            <a 
              href="mailto:humbleguava@qq.com" 
              className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              联系方式：humbleguava@qq.com
            </a>
          </div>
        </div>

        {/* Bottom Copyright - Centered */}
        <div className="mt-3 sm:mt-4 text-center">
          <div className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} THU Scooter 101. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}