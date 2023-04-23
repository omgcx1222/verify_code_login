export type EmailCodeInfo = {
  id: number
  email: string
  code: string
  send_time: Date | null
  create_time: Date
  update_time: Date
}

export type UserInfo = {
  id: number
  email: string
  password: string
  send_time: Date | null
  create_time: Date
  update_time: Date
}
