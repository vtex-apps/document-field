export const CPF_MASK = '999.999.999-99'

export const unmaskCPF = (value: string) => value.replace(/\D/g, '')

export const validateCPF = (value: string) => {
  const unmaskedValue = unmaskCPF(value)

  if (unmaskedValue.length < 11) {
    return false
  }

  let [secondDigit, firstDigit, ...digits] = unmaskedValue
    .split('')
    .map(digit => parseInt(digit, 10))
    .reverse()

  digits = digits.reverse()

  const firstDigitSum = digits.reduce(
    (acc, digit, index) => acc + digit * (10 - index),
    0
  )
  const firstDigitRemainder = ((firstDigitSum * 10) % 11) % 10

  if (firstDigitRemainder !== firstDigit) return false

  const secondDigitSum = digits
    .concat([firstDigit])
    .reduce((acc, digit, index) => acc + digit * (11 - index), 0)
  const secondDigitRemainder = ((secondDigitSum * 10) % 11) % 10

  if (secondDigitRemainder !== secondDigit) return false

  return true
}
