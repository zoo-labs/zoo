;(async function(){
  const elems = Array.from(document.querySelectorAll('.bank-js')).reduce((obj, elem) => {
    obj[elem.dataset.name] = elem
    return obj
  }, {}),
  user = JSON.parse(localStorage.czUser),
  { creatures } = await window.EndpointManager.get(`/data/creatures/${user.id}/true`),
  dummyData = [
    'Made offer on PUGORILLA for 2109.155 ZOOTOKENS',
    'Sold LITTEN for 4024.121 ZOOTOKENS',
    'Deposited 12 ETH to account',
    'Purchased 4 eggs'
  ]

  elems.dailyyield.textContent = '200'

  elems.topearners.innerHTML = creatures.slice(0, 10).map(creature => `
    <li>${creature.name} - ${(Math.random() * 100).toString().slice(0, 5)}/day</li>
  `).join('')

  elems.transactionhistory.innerHTML = dummyData.slice(0, 10).map(text => `
    <li>${text}</li>
  `).join('')
}());