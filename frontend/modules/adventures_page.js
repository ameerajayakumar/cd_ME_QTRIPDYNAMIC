
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const cityName = new URLSearchParams(search);
  return cityName.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    return await res.json();
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parent = document.getElementById('data');
  adventures.forEach((adventure) => {
    let divEle = document.createElement('div');
    divEle.className = 'col-6 col-lg-3 mb-4';
    divEle.innerHTML = `<a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
              <div class="activity-card">
               <div class="category-banner">${adventure.category}</div>
                <img src="${adventure.image}" alt="" class="card-img-top img-fluid" />
                  <div class="card-body d-md-flex text-center justify-content-between align-items-center w-100 mt-3">
                  <h5 class="card-title mb-0">${adventure.name}</h5>
                  <p class="card-text">${adventure.currency} ${adventure.costPerHead}</p>
                </div>
                <div class="card-body d-md-flex text-center justify-content-between align-items-center w-100 pt-0">
                  <h5 class="card-title">Duration</h5>
                  <p class="card-text">${adventure.duration} hours</p>
                </div>
              </div>
            </a>`;
    parent.append(divEle);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((adventure)=>{
    return low<=adventure.duration && adventure.duration<=high
  });
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((adventure)=>{
    return categoryList.find((category)=>{
      return category === adventure.category;
    }) 
  });
return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
  if(filters.duration.length !== 0 && filters.category.length !== 0){
    let cat = filterByCategory(list,filters.category);
    let dur = filterByDuration(list, filters.duration.split('-')[0], filters.duration.split('-')[1]);
    let filteredList = cat.filter((catAd)=>{
        return dur.find((durAd)=>{
        return catAd.id === durAd.id;
      })
  })
  return filteredList;
  }
  else if(filters.category.length !== 0){
    let catList = filters.category;
    return filterByCategory(list,catList);
  }
  else if(filters.duration.length !== 0){
    let low = filters.duration.split('-')[0];
    let high = filters.duration.split('-')[1];
    return filterByDuration(list, low, high);
  }
  else{
    return list;
  }  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filter = JSON.parse(localStorage.getItem("filters"));
  if(filter !== null){
  document.getElementById("duration-select").value = filter.duration;
  return filter;
  }
  else return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryParent = document.getElementById('category-list');
  let catArr = filters.category;
  catArr.forEach((cat)=>{
    let pillEle = document.createElement('div');
    pillEle.className="category-filter";
    pillEle.textContent=cat;
    categoryParent.append(pillEle);
  })
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
