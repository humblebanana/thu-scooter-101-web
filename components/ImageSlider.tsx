'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt={`停车区域图片 ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={goToPrevious}
          className="p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
