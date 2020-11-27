const uuid = require('./uuid')

const makePass = () => {
  const id = uuid().split('-').join('').slice(0, 10)
  const addCharacter = (x, char) => {
    const i = Math.floor(Math.random() * 10) + 1
    const arr = x.split('')
    arr.splice(i, 0, char)
    return arr.join('')
  }

  const withUppercaseLetter = addCharacter(id, 'C')
  const withSpecialCharacter = addCharacter(withUppercaseLetter, '!')
  return withSpecialCharacter
}

module.exports = makePass
