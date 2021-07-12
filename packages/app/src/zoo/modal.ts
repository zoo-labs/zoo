export const modals = {}

export default class Modal {
  elem: any
  name: string

  constructor(elem) {
    this.elem = elem
    this.name = this.elem.dataset.modalName

    modals[this.name] = this

    document.querySelectorAll(`.modal-trigger[data-modal-name='${this.name}']`).forEach(elem => {
      elem.addEventListener('click', () => this.open())
    })

    const closeButton = this.elem.querySelector('.modal-close')
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close())
    }
  }

  close() {
    this.elem.classList.add('hidden')
  }

  open() {
    this.elem.classList.remove('hidden')
  }
}
