export default class ConfirmBox {
  elem: any
  resolveFn: any

  constructor(txt, resolve) {
    this.elem = document.createElement('div')
    this.elem.className = 'modal dialog-box'
    this.resolveFn = resolve
    this.elem.innerHTML = `
      <h3>${txt}</h3>
      <div style="display: flex;">
        <a class="formbutton">Yes</a>
        <a class="formbutton" style="margin-left: 10px;">No</a>
      </div>
      <div class="modal-close"></div>
    `

    const closeButton = this.elem.querySelector('.modal-close')
    if(closeButton){
      closeButton.addEventListener('click', () => {
        this.resolveFn(null)
        this.close()
      })
    }

    const submitButtons = this.elem.querySelectorAll('.formbutton')
    submitButtons[0].addEventListener('click', () => {
      this.resolveFn(true)
      this.close()
    })
    submitButtons[1].addEventListener('click', () => {
      this.resolveFn(null)
      this.close()
    })

    document.body.appendChild(this.elem)
  }
  close(){
    this.elem.remove()
  }
}

export function quickConfirm(txt) {
  return new Promise(resolve => {
    new ConfirmBox(txt, resolve)
  })
}
