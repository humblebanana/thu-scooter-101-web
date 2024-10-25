import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'charging-master.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const chargingMasters = JSON.parse(jsonData);

  return NextResponse.json(chargingMasters);
}
