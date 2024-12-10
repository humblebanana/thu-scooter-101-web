import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'purchase-channels.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    return NextResponse.json(JSON.parse(jsonData))
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load purchase channels data' },
      { status: 500 }
    )
  }
} 