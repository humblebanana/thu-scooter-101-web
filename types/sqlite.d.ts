declare module 'sqlite' {
  import { Database as SQLiteDatabase } from 'sqlite3';
  
  export interface Database {
    exec(sql: string): Promise<void>;
    all<T = any>(sql: string, params?: any[]): Promise<T[]>;
    run(sql: string, params?: any[]): Promise<{ lastID: number; changes: number }>;
    close(): Promise<void>;
  }

  export function open(config: {
    filename: string;
    driver: typeof SQLiteDatabase;
  }): Promise<Database>;
}
