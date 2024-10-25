'use client'

import dynamic from 'next/dynamic'

interface DynamicImageSliderProps {
  images: string[]
}

const ImageSlider = dynamic(() => import('./ImageSlider'), { 
  ssr: false,
  loading: () => <p>加载中...</p>
});

export default function DynamicImageSlider({ images }: DynamicImageSliderProps) {
  return <ImageSlider images={images} />
}
