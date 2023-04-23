import { isEmail, isPassword } from '../../util/is'
import { sendEmailCode, md5Password, issueToken } from '../../util'
import {
  selectSendCodeInfo,
  updateSendTime,
  createSendEmailRecord,
  selectUserInfo,
  createUser,
  changePwd
} from './service'
import { EmailCodeInfo, UserInfo } from '../../types'
import { EMAIL_CODE_VALIDITY } from '../../app/config'

export const verifyFormat = (type: 'email' | 'password') => {
  return async (ctx, next) => {
    try {
      switch (type) {
        case 'email':
          const { email } = ctx.request.body as { email: string }
          if (!isEmail(email)) throw new Error('邮箱格式错误！')
          ctx.email = email
          break

        case 'password':
          const { password } = ctx.request.body as { password: string }

          if (!isPassword(password)) throw new Error('密码格式错误！')
          ctx.password = md5Password(password)
          break

        default:
          break
      }

      await next()
    } catch (error) {
      ctx.body = { status: 'Fail', message: error.message, data: null }
    }
  }
}

// 获取验证码表信息
export const getSendCodeInfo = async (ctx, next) => {
  try {
    const res = (await selectSendCodeInfo(ctx.email)) as [EmailCodeInfo] | []
    ctx.sendCodeInfo = res[0]

    await next()
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

// 获取用户表信息
export const getUserInfo = async (ctx, next) => {
  try {
    const res = (await selectUserInfo(ctx.email)) as [UserInfo] | []
    ctx.user = res[0]

    await next()
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

export const verifyCanSend = async (ctx, next) => {
  try {
    const info = ctx.sendCodeInfo as EmailCodeInfo | undefined
    if (info) {
      if (new Date().getTime() - new Date(info.send_time).getTime() <= 60000) {
        throw new Error('60s内只能发送一次验证码')
      }
    } else {
      await createSendEmailRecord(ctx.email)
    }
    await next()
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

export const sendEmail = async (ctx, next) => {
  try {
    const code = await sendEmailCode(ctx.email)
    if (!code) {
      throw new Error('发送验证码失败，请检查邮箱是否正确或稍后重试')
    }
    await updateSendTime(ctx.email, code, new Date())
    ctx.body = { status: 'Success', message: '已发送验证码', data: null }
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

export const passwordLogin = async (ctx, next) => {
  try {
    if (!ctx.user) {
      throw new Error('邮箱未注册')
    }

    if (ctx.password !== ctx.user.password) {
      throw new Error('密码错误')
    }

    const { id, email } = ctx.user as UserInfo
    const token = issueToken({ id, email })

    ctx.body = { status: 'Success', message: '登录成功', data: { id, email, token } }
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

// 验证验证码是否正确
export const verifyCode = async (ctx, next) => {
  try {
    const { code } = ctx.request.body as { code: string }

    const info = ctx.sendCodeInfo as EmailCodeInfo | undefined

    if (!info || info.code !== code) {
      throw new Error('验证码错误')
    }

    if (new Date().getTime() - new Date(info.send_time).getTime() > 60000 * Number(EMAIL_CODE_VALIDITY)) {
      throw new Error(`验证码仅${EMAIL_CODE_VALIDITY}分钟内有效`)
    }

    await next()
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

// 处理注册
export const hanldeSignIn = async (ctx, next) => {
  try {
    if (ctx.user) throw new Error('该用户已注册')

    await createUser(ctx.email, ctx.password)

    ctx.body = { status: 'Success', message: '注册成功', data: null }
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}

export const handleChangePassword = async (ctx, next) => {
  try {
    await changePwd(ctx.email, ctx.password)
    ctx.body = { status: 'Success', message: '密码修改成功', data: null }
  } catch (error) {
    ctx.body = { status: 'Fail', message: error.message, data: null }
  }
}
