'use client'

import dynamic from 'next/dynamic'

const ImageSlider = dynamic(() => import('./ImageSlider'), { 
  ssr: false,
  loading: () => <p>加载中...</p>
});

export default function DynamicImageSlider() {
  return <ImageSlider />
}
