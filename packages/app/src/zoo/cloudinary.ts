export function cloudinaryImgURL(_basename, name) {
  let basename
  switch (_basename) {
    case 'Duckling':
      basename = 'Duck'
      break;
    case 'Kitten':
      basename = 'Kittens'
      break;
    case 'Pug':
      basename = 'Pugs'
      break;
    default:
      basename = _basename;
  }
  return `http://res.cloudinary.com/htcif1pyx/image/upload/w_600/v1/CryptoZoo/9:16%20Aspect%20Ratio/${encodeURIComponent(basename)}/${encodeURIComponent(name)}.jpg`
}
