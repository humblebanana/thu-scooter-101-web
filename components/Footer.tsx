'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">{t('footer.about.title')}</h3>
            <p className="text-gray-600 text-sm">{t('footer.about.description')}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact.title')}</h3>
            <p className="text-gray-600 text-sm">{t('footer.contact.email')}</p>
            <p className="text-gray-600 text-sm">{t('footer.contact.wechat')}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/feedback" className="text-gray-600 text-sm hover:text-gray-900">
                  {t('footer.links.feedback')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 text-sm hover:text-gray-900">
                  {t('footer.links.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer