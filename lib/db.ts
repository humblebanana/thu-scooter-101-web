import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db: any = null;

export async function getDb() {
  if (db) {
    return db;
  }

  db = await open({
    filename: path.join(process.cwd(), 'data', 'charging-masters.db'),
    driver: sqlite3.Database
  });

  // 启用外键和WAL模式
  await db.exec('PRAGMA foreign_keys = ON');
  await db.exec('PRAGMA journal_mode = WAL');
  
  return db;
}

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}

export type ChargingMaster = {
  id: number;
  name: string;
  phone: string;
  location: string;
  available_time: string;
}

export type PurchaseGuide = {
  id: number;
  title: string;
  content: string;
  category: string;
  price_range: string;
  recommendations: string;
  created_at: string;
}

export type Scooter = {
  id: number;
  name: string;
  brand: string;
  price: number;
  range: string;
  image: string;
}

export type PurchaseChannel = {
  id: number;
  name: string;
  location: string;
  contact: string;
  priceRange: string;
  description?: string;
}

export type Promotion = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
