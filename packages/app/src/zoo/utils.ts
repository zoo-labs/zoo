export const getMilliseconds = ({days, hours}) => {
  const total = (days * 24) + hours
  return total * 3600000
}

export const getDaysHours = (milliseconds) => {
  const total = Math.floor(milliseconds / 3600000),
    days = Math.floor(total / 24),
    hours = total % 24

  return { days, hours }
}

// Format large numbers
export const numberAbbreviations = ['k','M','B','T','Qa','Qi','Sx','Sp','Oc','No']

export const formatLargeNumber = n => {
  let idx = -1

  if (n < 1000) {
    return n
  }

  while (n >= 1000) {
    n /= 1000
    ++idx
  }

  return n.toString().replace(/(\.\d{3}).+/, '$1') + numberAbbreviations[idx]
}
