import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Tag, FileText, Clipboard, AlertTriangle, Phone } from 'lucide-react'

// 定义Scooter类型
interface Scooter {
  id: number;
  name: string;
  brand: string;
  price: number;
  range: string;
  image: string;
  description: string;
}

async function getScooters(): Promise<Scooter[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/scooters`;
  console.log('Fetching scooters from:', apiUrl);
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
      console.error('API response not ok:', res.status, res.statusText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log('Fetched scooters data:', data);
    return data;
  } catch (error) {
    console.error('获取电动车数据时发生错误:', error);
    throw new Error(`获取电动车数据失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}


export default async function BuyingGuide() {
  
  let scooters: Scooter[] = [];
  let error: string | null = null;

  try {
    scooters = await getScooters();
  } catch (e) {
    error = e instanceof Error ? e.message : '获取电动车数据时发生未知错误';
    console.error('获取电动车数据失败:', e);
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">电动车购买指南</h1>
        <p className="text-red-500">错误: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">电动车购买指南</h1>
        <p className="text-xl text-gray-600">
          找到适合您的电动车和最佳购买渠道
        </p>
      </section>

      <h2 className="text-3xl font-bold mb-6">电动车推荐列表</h2>
      {scooters.length === 0 ? (
        <p>暂无电动车数据</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scooters.map((scooter) => (
            <div key={scooter.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative w-full h-56 md:h-64 lg:h-72">
                <Image 
                  src={`/scooter-images/${scooter.image}`} 
                  alt={scooter.name} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold mb-2">{scooter.name}</h2>
                <p className="text-sm text-gray-600 mb-1">品牌: {scooter.brand}</p>
                <p className="text-sm text-gray-600 mb-1">价格: ¥{scooter.price}</p>
                <p className="text-sm text-gray-600 mb-1">续航: {scooter.range}</p>
                <p className="text-sm text-gray-700">{scooter.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
