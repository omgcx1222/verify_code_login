import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

// 加载.env文件
dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

const {
  APP_PORT,
  APP_URL,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CONNECTIONLIMIT,
  EMAIL,
  EMAIL_PASSWORD,
  EMAIL_CODE_VALIDITY
} = process.env

export {
  APP_PORT,
  APP_URL,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_CONNECTIONLIMIT,
  EMAIL,
  EMAIL_PASSWORD,
  PRIVATE_KEY,
  PUBLIC_KEY,
  EMAIL_CODE_VALIDITY
}

// module.exports.PRIVATE_KEY = PRIVATE_KEY
// module.exports.PUBLIC_KEY = PUBLIC_KEY
