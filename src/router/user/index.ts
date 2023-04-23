import Router from 'koa-router'

import { isPassword } from '../../util/is'

const userRouter = new Router({ prefix: '/user' })

import {
  getSendCodeInfo,
  verifyCanSend,
  verifyFormat,
  sendEmail,
  getUserInfo,
  passwordLogin,
  verifyCode,
  hanldeSignIn,
  handleChangePassword
} from './middleware'

// 获取验证码 email
userRouter.post('/get-code', verifyFormat('email'), getSendCodeInfo, verifyCanSend, sendEmail)

// 注册 email password code
userRouter.post(
  '/sign-up',
  verifyFormat('email'),
  verifyFormat('password'),
  getSendCodeInfo,
  verifyCode,
  getUserInfo,
  hanldeSignIn
)

// 密码登录 email password
userRouter.post('/sign-in-pwd', verifyFormat('email'), verifyFormat('password'), getUserInfo, passwordLogin)

// 修改密码
userRouter.post(
  '/change-pwd',
  verifyFormat('email'),
  verifyFormat('password'),
  getSendCodeInfo,
  verifyCode,
  handleChangePassword
)

// userRouter.post('/sign-in-code', getSendCodeInfo, verifyCode, getUserInfo, hanldeLogin) // 验证码登录/注册

export default userRouter
