import { ethers, Contract } from 'ethers'
import { breedTimeouts, rarityTable } from './constants'
import { getMilliseconds, getDaysHours } from './utils'

import API from './api'
import Form from './form'
import Modal from './modal'

const api = new API()

// Wire up forms and modals
document.querySelectorAll('.modal').forEach(elem => new Modal(elem))
document.querySelectorAll('.js-form').forEach(elem => new Form(elem))
