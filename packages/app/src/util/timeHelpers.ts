export const getMilliseconds = ({ days, hours }) => {
  const total = days * 24 + hours
  return total * 3600000
}

export const getDaysHours = (milliseconds) => {
  const total = Math.floor(milliseconds / 3600000),
    days = Math.floor(total / 24),
    hours = total % 24

  return { days, hours }
}
