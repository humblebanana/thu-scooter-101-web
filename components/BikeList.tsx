'use client'

import { useState, useEffect } from 'react'

interface IScooter {
  id: number;
  name: string;
  brand: string;
  price: number;
  range: string;
  image: string;
}

const BikeList: React.FC = () => {
  const [scooters, setScooters] = useState<IScooter[]>([])

  useEffect(() => {
    async function fetchScooters() {
      try {
        const response = await fetch('/api/scooters')
        if (!response.ok) {
          throw new Error('获取电动车列表失败')
        }
        const data = await response.json()
        setScooters(data)
      } catch (error) {
        console.error('获取电动车列表时出错:', error)
        // 这里可以添加一些用户友好的错误处理,比如显示一个错误消息
      }
    }
    fetchScooters()
  }, [])

  return (
    <div>
      {scooters.map((scooter) => (
        <div key={scooter.id}>
          <h2>{scooter.name}</h2>
          <p>品牌: {scooter.brand}</p>
          <p>价格: ¥{scooter.price}</p>
          <p>续航: {scooter.range}</p>
          <img src={scooter.image} alt={scooter.name} />
        </div>
      ))}
    </div>
  )
}

export default BikeList
