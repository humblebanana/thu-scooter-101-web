const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 确保使用绝对路径
const dbPath = path.join(process.cwd(), 'data', 'charging-masters.db');

// 创建data目录（如果不存在）
const fs = require('fs');
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接错误:', err);
    return;
  }
  console.log('已成功连接到数据库');
});

// 创建充电师傅表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS charging_masters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      location TEXT NOT NULL,
      available_time TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建表格错误:', err);
      return;
    }
    console.log('充电师傅表创建成功');
    
    // 插入示例数据
    const sampleData = [
      ['张师傅', '138xxxx1234', '紫荆公寓', '9:00-21:00'],
      ['李师傅', '139xxxx5678', '南门附近', '8:00-22:00'],
      ['王师傅', '137xxxx9012', '清华东路', '全天24小时']
    ];

    const stmt = db.prepare(`
      INSERT INTO charging_masters (name, phone, location, available_time)
      VALUES (?, ?, ?, ?)
    `);

    sampleData.forEach(row => {
      stmt.run(row, (err) => {
        if (err) console.error('插入数据错误:', err);
      });
    });

    stmt.finalize();
  });
});

// 创建购买渠道表并插入数据
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS purchase_channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      contact TEXT NOT NULL,
      priceRange TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建购买渠道表错误:', err);
      return;
    }
    console.log('购买渠道表创建成功');

    const channelData = [
      ['清华大学自行车店', '清华大学校内', '010-12345678', '2000-6000元', '校内官方授权店'],
      ['北京电动车专卖', '五道口商业区', '138xxxx5678', '3000-8000元', '品牌直营店']
    ];

    const stmt = db.prepare(`
      INSERT INTO purchase_channels (name, location, contact, priceRange, description)
      VALUES (?, ?, ?, ?, ?)
    `);

    channelData.forEach(row => {
      stmt.run(row, (err) => {
        if (err) console.error('插入购买渠道数据错误:', err);
      });
    });

    stmt.finalize();
  });
});

// 创建促销信息表并插入数据
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS promotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建促销信息表错误:', err);
      return;
    }
    console.log('促销信息表创建成功');

    const promotionData = [
      ['开学季特惠', '新生购车立减300元', '2024-02-01', '2024-03-01'],
      ['春季促销', '指定车型享8折优惠', '2024-03-01', '2024-04-01']
    ];

    const stmt = db.prepare(`
      INSERT INTO promotions (title, description, startDate, endDate)
      VALUES (?, ?, ?, ?)
    `);

    promotionData.forEach(row => {
      stmt.run(row, (err) => {
        if (err) console.error('插入促销信息数据错误:', err);
      });
    });

    stmt.finalize();
  });
});

// 创建电动车表并插入数据
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS scooters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price INTEGER NOT NULL,
      range TEXT NOT NULL,
      image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('创建电动车表错误:', err);
      return;
    }
    console.log('电动车表创建成功');

    const scooterData = [
      ['小牛 U1', '小牛', 2999, '40km', '/images/scooters/niu-u1.jpg'],
      ['雅迪 G5', '雅迪', 3499, '50km', '/images/scooters/yadea-g5.jpg']
    ];

    const stmt = db.prepare(`
      INSERT INTO scooters (name, brand, price, range, image)
      VALUES (?, ?, ?, ?, ?)
    `);

    scooterData.forEach(row => {
      stmt.run(row, (err) => {
        if (err) console.error('插入电动车数据错误:', err);
      });
    });

    stmt.finalize();
  });
});

// 创建购买指南表
db.run(`
  CREATE TABLE IF NOT EXISTS purchase_guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    price_range TEXT,
    recommendations TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 添加示例数据
const guideData = [
  ['入门级电动车选购', '适合新手的电动车推荐...', '入门指南', '2000-3000元', '小牛电动车'],
  ['高性能电动车推荐', '追求性能的玩家之选...', '进阶指南', '4000-6000元', '雅迪电动车'],
];

const stmt = db.prepare(`
  INSERT INTO purchase_guides (title, content, category, price_range, recommendations)
  VALUES (?, ?, ?, ?, ?)
`);

guideData.forEach(row => {
  stmt.run(row, (err) => {
    if (err) console.error('插入购买指南数据错误:', err);
  });
});

stmt.finalize();

// 关闭数据库连接
db.close((err) => {
  if (err) {
    console.error('关闭数据库错误:', err);
    return;
  }
  console.log('数据库连接已关闭');
});
