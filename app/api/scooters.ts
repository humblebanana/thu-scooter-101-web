import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scooters.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const scooters = JSON.parse(jsonData);

  return NextResponse.json(scooters);
}
