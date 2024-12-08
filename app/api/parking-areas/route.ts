import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    // 获取JSON文件的路径
    const jsonPath = path.join(process.cwd(), 'public/data/parking-areas.json');
    
    // 读取JSON文件
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    
    // 解析JSON数据
    const data = JSON.parse(jsonData);
    
    // 返回数据
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取停车区域数据失败:', error);
    return NextResponse.json(
      { error: '获取停车区域数据失败' },
      { status: 500 }
    );
  }
} 