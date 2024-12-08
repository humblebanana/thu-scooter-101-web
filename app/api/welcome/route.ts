import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function GET() {
  try {
    // 读取JSON文件
    const filePath = path.join(process.cwd(), 'public/data/welcome-content.json')
    const jsonData = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(jsonData)

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load welcome content' },
      { status: 500 }
    )
  }
} 