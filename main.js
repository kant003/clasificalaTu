import './style.css'

document.querySelector('#search').addEventListener('click', search)

const request = await fetch('https://raw.githubusercontent.com/fosskers/myshroom-api/master/public/mushrooms.json')
const mushrooms = await request.json()

function search(event){

  const listCheckbox= document.querySelectorAll('input[type=checkbox]')
  //const checkboxes = Array.from(listCheckbox)
  const checkboxes = [...listCheckbox]
  const filterCheckboxes = checkboxes
    .filter(e=>e.checked)
    .map(e=>e.value)

  const hymenium = document.querySelector('#hymenium').value
  const spore = document.querySelector('#spore').value
  console.log(hymenium,spore,filterCheckboxes)
  const filterMushrooms = mushrooms
  .filter(s=>s.attributes.hymenium.includes(hymenium))
  .filter(s=>s.attributes.sporePrint.includes(spore))
  .filter(s=>checkArrayIntoArray(s.attributes.cap, filterCheckboxes))
  
  console.log(filterMushrooms)
  document.querySelector('#result').innerHTML = filterMushrooms
    .map(s=>`${s.common[0]} 
            ${s.attributes.poisonous?'Venenosa':'No venenosa'}
            `).join('<br/>')
}

function checkArrayIntoArray(a,b){
  return b.every(e=>a.includes(e))
}