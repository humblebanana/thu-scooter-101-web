import Image from 'next/image';

// 定义 Scooter 类型
interface Scooter {
  image: string;
  title: string;
  price: number;
  usageTime: string;
  description: string;
}

// 定义 ScooterCardProps 类型
interface ScooterCardProps {
  scooter: Scooter;
}

export function ScooterCard({ scooter }: ScooterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={scooter.image} alt={scooter.title} width={300} height={200} className="w-full object-cover h-48" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{scooter.title}</h3>
        <p className="text-gray-600 mb-2">价格: ¥{scooter.price}</p>
        <p className="text-gray-600 mb-2">使用时长: {scooter.usageTime}</p>
        <p className="text-gray-600 mb-4">描述: {scooter.description}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          联系卖家
        </button>
      </div>
    </div>
  );
}
