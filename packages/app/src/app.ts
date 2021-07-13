import { ethers, Contract } from 'ethers'
import { breedTimeouts, rarityTable } from './zoo/constants'
import { getMilliseconds, getDaysHours } from './zoo/utils'

import API from './zoo/api'
import Form from './zoo/form'
import Modal from './zoo/modal'

const api = new API()

console.log('app wired')

// Wire up forms and modals
document.querySelectorAll('.modal').forEach(elem => new Modal(elem))
document.querySelectorAll('.js-form').forEach(elem => new Form(elem))
