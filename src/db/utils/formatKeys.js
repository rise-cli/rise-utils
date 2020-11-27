const uuid = require('./uuid')

/**
 * FormatKeys
 *
 * FormatKeys allows someone to put @id, which will
 * automatically replace it with a uuid
 *
 */
module.exports = (oldInput) => {
  const input = { ...oldInput }
  if (input.PK && input.PK !== '@id' && input.PK.includes('@id')) {
    input.PK = input.PK.replace('@id', uuid())
  }

  if (input.PK && input.PK === '@id') {
    input.PK = uuid()
  }

  if (input.SK && input.SK !== '@id' && input.SK.includes('@id')) {
    input.SK = input.SK.replace('@id', uuid())
  }

  if (input.SK && input.SK === '@id') {
    input.SK = uuid()
  }

  return input
}
