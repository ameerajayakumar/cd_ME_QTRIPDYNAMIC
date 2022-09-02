import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventureID = new URLSearchParams(search);
  return adventureID.get('adventure');
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let adventureResponse = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
  return await adventureResponse.json();
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').textContent = adventure.name;
  document.getElementById('adventure-subtitle').textContent = adventure.subtitle;
  document.getElementById('adventure-content').textContent = adventure.content;
  const gallery = document.getElementById('photo-gallery');
  adventure.images.forEach(image => {
    const imgDiv = document.createElement('div');
    imgDiv.innerHTML = `<img src=${image} class="activity-card-image">`;
    gallery.append(imgDiv);
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousalStarter = `<div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators">
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`;

  document.getElementById('photo-gallery').innerHTML = carousalStarter;
  const indicDiv = document.getElementById('carousel-indicators');
  const innerDiv = document.getElementById('carousel-inner');

  images.forEach((img, index) =>{
    const indicButton = document.createElement('div');
    if(index === 0){
      indicButton.classList.add("active");
      indicButton.setAttribute('aria-current','true');
    }
    indicButton.innerHTML = `<button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to=${index} aria-label="Slide ${index+1}"></button>`;
    indicDiv.append(indicButton);

    const imgDiv = document.createElement('div');
    index === 0 ? imgDiv.classList.add('carousel-item' ,'active') : imgDiv.classList.add('carousel-item');
    imgDiv.innerHTML = `<img src=${img} class="d-block w-100" alt=image${index}/>`;
    innerDiv.append(imgDiv);
  })

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
