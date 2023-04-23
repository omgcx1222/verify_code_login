import crypto from 'crypto'

import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

import { EMAIL, EMAIL_PASSWORD, PRIVATE_KEY } from '../app/config'

export const sendEmailCode = (email: string) => {
  const codeArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const length = 6
  let code = ''
  for (let i = 0; i < length; i++) {
    let randomI = Math.floor(Math.random() * 10)
    code += codeArr[randomI]
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    auth: {
      user: EMAIL, // qq邮箱名
      pass: EMAIL_PASSWORD // 授权码
    }
  })

  return new Promise<string>(async (resolve, reject) => {
    await transporter.sendMail(
      {
        from: EMAIL, // 发送源邮箱
        to: email, //目标邮箱号
        subject: 'sqgg验证码', // 邮箱主题
        text: '验证码：' + code // 发送的内容
        //html: "<b>Hello world?</b>", //编写网页，作为内容
      },
      (err, success) => {
        if (err) {
          resolve('')
        } else {
          resolve(code)
        }
      }
    )
  })
}

export const md5Password = (password: string) => {
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

export const issueToken = (obj: any) => {
  const token = jwt.sign(obj, PRIVATE_KEY, {
    expiresIn: 60 * 60 * 24 * 30, // 一个月
    // expiresIn: 10,
    algorithm: 'RS256'
  })

  return token
}
