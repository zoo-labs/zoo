import {modals} from './modal'
import DialogBox from './dialog'

import API from './api'

const api = new API()

export function quickFormPromise (txt, fields, cta) {
  return new Promise(resolve => {
    new DialogBox(txt, fields, resolve, cta)
  })
}

// Forms
const formCallbacks = {
  login: function(data) {
    console.log(data)
    modals['login'].close()
    localStorage.czUser = JSON.stringify(data.user)
    location.href = '/feed'
  },
  register: function(data) {
    modals['register'].close()
    localStorage.czUser = JSON.stringify(data.user)
    location.href = '/feed'
  }
}

export default class Form {
  elem: any
  action: any
  callback: any
  method: any

  constructor(elem) {
    this.elem = elem
    this.action = elem.dataset.action
    this.method = elem.dataset.method
    this.callback = formCallbacks[elem.dataset.cbKey]

    this.elem.querySelector('.formbutton').addEventListener('click', () => {
      let isOK = true
      const data = Array.from(this.elem.querySelectorAll('.formfield input')).reduce((obj: any, field: any) => {
        const val = field.value.trim()
        if (!val.length && field.required) {
          isOK = false
        }
        obj[field.name] = val
        return obj
      }, {})

      if (isOK) {
        api[this.method.toLowerCase()](this.action, data).then(resp => {
          if(resp.error) {
            alert(resp.error)
          } else {
            this.callback(resp)
          }
        })
      }
    })
  }
}
