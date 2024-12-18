// index.js
/* Deliverables: 
1. When the page loads, make a GET request to /ramens to get all the ramen.
2. Display the image for each ramen in the DOM.
3. When a user clicks on the image of a ramen, the name, restaurant, rating, and comment for that ramen should display on the page.
4. When a user submits the new ramen form, a POST request should be made to /ramens to add the new ramen to the backend and the new ramen should be displayed on the page. */


// Global variables
const baseURL = 'http://localhost:3000/'
let ramenData = [] // Stores fetched ramen data globally

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded')
  //main() <- I think this is causing my code to run twice....
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

// Add event listener to ramen menu
const addRamenMenuClickListener = () => {
  document.getElementById('ramen-menu').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      const ramenId = event.target.dataset.id
      const selectedRamen = ramenData.find(ramen => ramen.id == ramenId)
      handleClick(selectedRamen)
    }
  })
}

// Add submit listener to new ramen form
const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen')
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
      id: ramenData.length + 1,
    }

    // Add new ramen to the DOM / Create the new "ramen rating"
    const ramenMenu = document.getElementById('ramen-menu')
    const img = document.createElement('img')
    img.src = newRamen.image
    img.alt = newRamen.name
    img.dataset.id = newRamen.id

    // Append it to the body and add it to the ramenData array
    ramenMenu.appendChild(img)
    ramenData.push(newRamen)

    // Run newRamen through the handleClick function to display it
    handleClick(newRamen)
    
    // New ramen form reset
    newRamenForm.reset()
  })
}


// Main function
const main = () => {
  displayRamens()
  addRamenMenuClickListener()
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

