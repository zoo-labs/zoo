export default class DialogBox {
  elem: any
  fieldNames: any
  resolveFn: any

  constructor(txt, fields, resolve, cta = 'Submit') { // fields { name: type, }
    this.elem = document.createElement('div')
    this.elem.className = 'modal dialog-box'
    this.fieldNames = Object.keys(fields)
    this.resolveFn = resolve
    this.elem.innerHTML = `
      <h3>${txt}</h3>
      ${this.fieldNames.map(fieldName => {
        const obj = fields[fieldName],
          type = obj.type || 'text',
          defaultval = obj.default ? `value='${obj.default}'` : ''
        return `
        <div class='formfield'>
          <label>${obj.label || fieldName}</label>
          <input name='${fieldName}' type='${type}' ${defaultval} />
        </div>
      `}).join('')}
      <a class='formbutton'>${cta}</a>
      <div class='modal-close'></div>
    `

    const closeButton = this.elem.querySelector('.modal-close')
    if(closeButton){
      closeButton.addEventListener('click', () => {
        this.resolveFn(null)
        this.close()
      })
    }

    const submitButton = this.elem.querySelector('.formbutton')
    submitButton.addEventListener('click', () => {
      const data = this.fieldNames.reduce((obj, fieldName) => {
        const val = this.elem.querySelector(`[name='${fieldName}']`).value
        obj[fieldName] = val
        return obj
      }, {})

      this.resolveFn(data)
      this.close()
    })

    document.body.appendChild(this.elem)
  }
  close(){
    this.elem.remove()
  }
}
