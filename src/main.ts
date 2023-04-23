import Koa from 'koa'
import bodyParser from 'koa-bodyparser' // 解析json

import userRouter from './router/user'

const app = new Koa()

import './app/database' // 加载数据库连接池

app.use(bodyParser())

// 解决跨域问题
app.use(async (ctx, next) => {
  // 修改响应头
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  ctx.response.set('Access-Control-Allow-Methods', 'PATCH, POST, GET, DELETE, OPTIONS')

  if (ctx.request.method == 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(process.env.APP_PORT, () => {
  console.log(`服务器启动成功，端口为${process.env.APP_PORT}`)
})
