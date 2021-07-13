
export default class WaitButton {
  elem: any
  originalText: any
  renderInterval: any

  constructor(elem) {
    this.elem = elem
  }

  start() {
    this.originalText = this.elem.textContent
    let i = 0
    const dots = '...'

    this.renderInterval = window.setInterval(() => {
      ++i
      this.elem.textContent = `Wait${dots.slice(0,i)}`
      if (i === 3) i = 0
    }, 300)
  }

  stop() {
    window.clearInterval(this.renderInterval)
    this.elem.textContent = this.originalText
  }
}

