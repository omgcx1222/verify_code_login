const isEmail = (email: string) => {
  const rule = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-])+\.([a-zA-Z0-9-.])+$/
  return rule.test(email)
}

const isPassword = (password: string) => {
  const rules = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,18}$/
  return rules.test(password)
}

export { isEmail, isPassword }
