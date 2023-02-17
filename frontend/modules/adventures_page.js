
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const param  =new URLSearchParams(search);
  return param.get('city');
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
   let data = await fetch(config.backendEndpoint+'/adventures/?city='+city);
   return await data.json();
  }catch(e){
    return null;

  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
if(adventures.length == 0)
  return false;
let dataElv = document.getElementById('data');

adventures.forEach(adventure =>{
  dataElv.innerHTML  +=`
    <div class="col-6 col-lg-3 mb-4">
      <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
        <div class="category-banner">${adventure.category}</div>
        <div class="activity-card">
          <img src="${adventure.image}" alt="${adventure.name}">
          <div class="w-100 flex-grow-1">
            <div class="d-flex flex-wrap justify-content-between p-2">
              <h5 class="card-title">${adventure.name}</h5>
              <p class="card-text">${adventure.currency}${adventure.costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between px-2">
              <h5 class="card-title">Duration</h5>
              <p class="card-text">${adventure.duration}Hours</p>
            </div>
          </div>
        </div>
      </a>
    </div>  
  `;

  
});

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterlist = list.filter(function (e){
    return e.duration >= Number(low) && e.duration <= Number(high)
  });
  return filterlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
   let Categorylist = list.filter(function (e){
    return categoryList.includes(e.category);
  });
  return Categorylist;
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

  if(filters.category.length !== 0 && filters.duration ===""){
    return filterByCategory(list,filters['category']);
  }else if(filters.category.length === 0 && filters.duration !=="" &&  typeof(filters.duration) !='undefined'){
    console.log((filters['duration']).split('-'));
    return filterByDuration(list,(filters.duration).split('-')[0],(filters.duration).split('-')[1]);
  }else if(filters.category.length !== 0 && filters.duration !=="" && typeof(filters.duration) !='undefined'){
    let Categorylist = filterByCategory(list,filters['category']);
    return filterByDuration(Categorylist,(filters.duration).split('-')[0],(filters.duration).split('-')[1]);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));;
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let res = JSON.parse(localStorage.getItem('filters'));
  if(res){
    return res;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters['duration']){
    document.getElementById('duration-select').value = filters.duration;
  }

  if(filters['category'].length !==0){
    const catList = document.getElementById("category-list");
    filters['category'].forEach((name)=>{
      catList.innerHTML +=`<div class="pill">
                              ${name}
                              <span class="close">&times;</span>
                            </div>`;
    });
  }
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
