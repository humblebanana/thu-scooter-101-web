// 添加数据库配置
const dbConfig = {
  // 启用WAL模式
  pragma: {
    journal_mode: 'WAL',
    synchronous: 'NORMAL'
  },
  // 定期备份
  backup: {
    enabled: true,
    interval: '24h'
  }
}
