import connection from '../../app/database'

export const selectSendCodeInfo = async (email: string) => {
  const sql = 'SELECT * FROM email_code WHERE email = ?'
  try {
    const [res] = await connection.execute(sql, [email])

    return res
  } catch (error) {
    // throw new Error(error.message)
    throw new Error('出错')
  }
}

export const updateSendTime = async (email: string, code: string, time: Date) => {
  const sql = 'UPDATE email_code SET send_time = ?, code = ? WHERE email = ?'
  try {
    const [res] = await connection.execute(sql, [time, code, email])

    return res
  } catch (error) {
    // throw new Error(error.message)
    throw new Error('更新验证码发送时间出错')
  }
}

export const createSendEmailRecord = async (email: string) => {
  const sql = 'INSERT INTO `email_code` (email) VALUES (?)'
  try {
    await connection.execute(sql, [email])
  } catch (error) {
    // throw new Error(error.message)
    throw new Error('新增发送验证码出错')
  }
}

export const selectUserInfo = async (email: string) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  try {
    const [res] = await connection.execute(sql, [email])
    return res
  } catch (error) {
    throw new Error('查询用户信息出错')
  }
}

export const createUser = async (email: string, pwd: string) => {
  const sql = 'INSERT INTO `users` (email, password) VALUES (?, ?, ?)'
  try {
    const [res] = await connection.execute(sql, [email, pwd])
    return res
  } catch (error) {
    throw new Error('新增用户出错')
  }
}

export const changePwd = async (email: string, pwd: string) => {
  const sql = 'UPDATE users SET password = ? WHERE email = ?'
  try {
    await connection.execute(sql, [pwd, email])
    return
  } catch (error) {
    throw new Error('修改密码出错')
  }
}
