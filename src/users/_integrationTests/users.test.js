const users = require('../index')
const EMAIL = 'john@example.com'
process.env.USERPOOL_ID = 'us-east-1_1yVS8ntIm'

test('users works', async (done) => {
  /**
   * Test CreateUser
   *
   */
  const created = await users.create({
    email: EMAIL
  })

  expect(created.email).toBe(EMAIL)
  expect(created.password).toBeTruthy()

  /**
   * Test ResetPassword
   *
   */
  const reseted = await users.resetPassword({
    email: EMAIL
  })

  expect(reseted.email).toBe(EMAIL)
  expect(created.password !== reseted.password).toBe(true)

  /**
   * Test DeleteUser
   *
   */
  const removed = await users.remove({
    email: EMAIL
  })

  expect(removed).toBe(true)
  done()
})
