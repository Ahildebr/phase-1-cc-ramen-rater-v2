// index.js

const baseURL = 'http://localhost:3000/'
let ramenData = [] // Store fetched ramen data globally

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded')
  // displayRamens()
  // addSubmitListener()
})

// Handle click on ramen images
const handleClick = (ramen) => {
  console.log('Ramen clicked:', ramen)
  const ramenImage = document.querySelector('.detail-image')
  const ramenName = document.querySelector('.name')
  const ramenRestaurant = document.querySelector('.restaurant')
  const ratingDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')

  ramenImage.src = ramen.image
  ramenImage.alt = ramen.name
  ramenName.textContent = ramen.name
  ramenRestaurant.textContent = ramen.restaurant
  ratingDisplay.textContent = ramen.rating
  commentDisplay.textContent = ramen.comment
}

// Fetch and display ramens
const displayRamens = () => {
  fetch(`${baseURL}ramens`)
    .then(response => response.json())
    .then(ramens => {
      ramenData = ramens
      const ramenMenu = document.getElementById('ramen-menu')
      ramens.forEach(ramen => {
        const img = document.createElement('img')
        img.src = ramen.image
        img.alt = ramen.name
        img.dataset.id = ramen.id // Add data-id attribute
        ramenMenu.appendChild(img)
      })
    })
    .catch(error => console.error('Error fetching ramens:', error))
}

// Event delegation for ramen menu
document.getElementById('ramen-menu').addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    const ramenId = event.target.dataset.id
    const selectedRamen = ramenData.find(ramen => ramen.id == ramenId)
    handleClick(selectedRamen)
  }
})

const addSubmitListener = () => {
  // Add code for form submission here
}

const main = () => {
  displayRamens()
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}
