import mysql from 'mysql2'
import { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_CONNECTIONLIMIT } from './config'

// 创建数据库连接池
const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  connectionLimit: Number(MYSQL_CONNECTIONLIMIT)
  // 2022-03-01T17:31:04.000Z
  // timezone: '+00:00'
})

connection.getConnection((err, conn) => {
  if (err) {
    console.log('连接数据库失败：', err)
  } else {
    console.log('连接数据库成功')
  }
})

export default connection.promise()
