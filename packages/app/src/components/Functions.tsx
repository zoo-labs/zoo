export function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}
