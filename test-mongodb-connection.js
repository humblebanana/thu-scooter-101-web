const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('错误：MONGODB_URI 环境变量未设置');
    return;
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('成功连接到MongoDB!');
    
    // 尝试执行一个简单的数据库操作
    const database = client.db('test');
    const collection = database.collection('test_collection');
    
    const insertResult = await collection.insertOne({ test: 'Hello MongoDB' });
    console.log('插入文档成功:', insertResult);
    
    const findResult = await collection.findOne({ test: 'Hello MongoDB' });
    console.log('查询文档结果:', findResult);
    
  } catch (error) {
    console.error('连接MongoDB时出错:', error);
  } finally {
    await client.close();
  }
}

testConnection();
