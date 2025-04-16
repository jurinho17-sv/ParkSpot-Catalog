/**
 * ParkSpot Catalog page
 * 
 * Ju Ho Kim (2025 SEA applicant)
 * 
 * This contains JS code for my ParkSpot catalog.
 * I used arrays and objects to store and display data about parking spots in Pasadena.
 */

/**
 * ========== REFERENCES ==========
 * 
 * Used throughout this scripts.js,
 * - Spread operator(...) - to copy arrays easily
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * - document.getElementById()
 * here: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
 * here: (15:53 timestamp) https://youtu.be/0ik6X4DJKCc?si=CxKQUicosSj8rDft
 * - document.querySelector()
 * here: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * here: (29:14 timestamp) https://youtu.be/0ik6X4DJKCc?si=CxKQUicosSj8rDft
 * - element.textContent property
 * here: https://www.w3schools.com/jsref/prop_node_textcontent.asp
 * here: (17:04 timestamp) https://youtu.be/0ik6X4DJKCc?si=pSQXoDQxNc6v8FNP
 * - document.createElement()
 * here: https://www.w3schools.com/jsref/met_document_createelement.asp
 * here: (14:40 timestamp) https://youtu.be/mPd2aJXCZ2g?si=Wv1uJgbEkkh1Twov
 * - element.appendChild()
 * here: https://www.w3schools.com/jsref/met_node_appendchild.asp
 * here: (17:27 timestamp) https://youtu.be/mPd2aJXCZ2g?si=7_P7KhfeRneGgLJU
 *
 * 
 * Used for parkingSpots array,
 * - JS Array of Objects
 * here: https://youtu.be/w9078dAjcrY?si=zqzokE5pMQVlKqUO
 * 
 * 
 * Used for updateCard(),
 * - Object Destructuring
 * here: https://www.w3schools.com/js/js_destructuring.asp
 * here: (1:01 timestamp) https://youtu.be/UgEaJBz3bjY?si=wgo2xmCCbCiphKev
 * - number.toFixed()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
 * 
 * 
 * Used for updateCard() and searchSpots(),
 * - Template Literals (to make strings cleaner)
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 * 
 * 
 * Used for OPERATION 1,
 * - Array.filter()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 * - string.toLowerCase()
 * here: https://www.w3schools.com/jsref/jsref_tolowercase.asp
 * here: (6:15 timestamp) https://youtu.be/VRz0nbax0uI?si=1-be4RWBdF39c-Pa
 * - string.includes()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
 * here: (1:41 timestamp) https://youtu.be/VRz0nbax0uI?si=QGP3t3gqFv0021Ha
 * - Arrow function with array methods (to make a simpler code)
 * here: (5:14 timestamp) https://youtu.be/WnP_ssWDBWU?si=jA_8L5zK6deMqI7K --> this is the GOAT
 * 
 * 
 * Used for OPERATION 2,
 * - Array.prototype.slice()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice 
 * - Array.prototype.map()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 * - Array.prototype.sort()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * - JS Comparator Function (explains how to sort in ascending/descending order) 
 * here: (9:53 timestamp) https://youtu.be/kxUNQtheCxM?si=gwWVmVYCmFYbMpMF --> this made my OPERATION2 concise
 * 
 * 
 * Used for parkingTipAlert() (inspired by template's quoteAlert() function)
 * - Math.floor()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
 * - Math.random()
 * here: (5:49 timestamp) https://youtu.be/e8WKbyCEQVE?si=e6a_FjSYWpRhfPfY
 * - alert()
 * here: https://www.w3schools.com/jsref/met_win_alert.asp
 * 
 * 
 * Used for hideSpot() (inspired by template's removeLastCard() function),
 * - Array.prototype.splice()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 * here: https://youtu.be/FFas8cMHVwg?si=90qHzMJ4x4fUClDp
 * - Array.prototype.findIndex()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * here: (0:27 timestamp) https://youtu.be/fwpSme-VPp0?si=BFJ0mclEilSqE2-F
 * 
 *
 * Used for INITIALIZATION,
 * - element.addEventListener()
 * here: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
 * here: (0:44 timestamp) https://youtu.be/wK2cBMcDTss?si=D-r3e4wZpzgkjQeP
 * 
 * 
 * Used for debugging,
 * - console.log()
 * here: (0:33 timestamp) https://youtu.be/H5zRF_Yk_LE?si=TAonqnqoP4Tk9bMF
 * - Array.isArray()
 * here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 * - console.clear()
 * here: https://www.w3schools.com/jsref/met_console_clear.asp
 */


// Configuration options
// makes the code more maintainable
// no need to dig throughout the file, if I need to modify tips or original sort state
// defaultSort is used in resetFilters(), 
// and parkingTips are used in parkingTipAlert()
const CONFIG = {

  // default sort order
  defaultSort: "default",

  // random tips to display
  parkingTips: [
    "Pro tip: Old Pasadena parking is free after 8pm on most weekdays!",
    "Did you know? Many Pasadena parking structures offer the first 30 minutes free!",
    "Parking tip: Street parking in Pasadena is enforced until 8pm Monday-Saturday.",
    "Save money: Weekend parking at most Pasadena city lots is a flat $6 all day!"
  ]
};



// ========== DATA ==========
// Main data structure: Array of Objects
// I used an array to store multiple parking spots, where each spot is an object
//  - Store different properties for each spot (name, location, price, etc)
//  - Add or remove spots from the display easily
//  - Implement search functionality with the array's filter() method (in searchSpots() function)
//  - Implement sorting operations using the array's sort() method (in sortSpots() function)
//
// Each parking spot object has consistent properties:
// id / name / location / price / rating /
// available / imageURL (I used placeholder images) / description (brief info about the spot)
//
// I've created fictional data based on real locations in Pasadena
// and used placeholder images
const parkingSpots = [
  {
    id: 1,
    name: "Old Pasadena Parking Garage",
    location: "35 S Raymond Ave, Pasadena",
    price: 3.00,
    rating: 4.3,
    available: 150,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Old+Pasadena+Parking+Garage",
    description: "Convenient garage near Pasadena City Hall and Old Town shopping areas"
  },
  {
    id: 2,
    name: "Marengo Parking Lot",
    location: "155 E Green St, Pasadena",
    price: 2.50,
    rating: 3.8,
    available: 75,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Marengo+Parking+Lot",
    description: "Affordable parking with easy access to shopping and restaurants"
  },
  {
    id: 3,
    name: "DeLacey Parking Structure",
    location: "45 S DeLacey Ave, Pasadena",
    price: 2.00,
    rating: 3.9,
    available: 60,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=DeLacey+Parking+Structure",
    description: "Great option for nightlife and restaurants in Old Pasadena"
  },
  {
    id: 4,
    name: "Playhouse District Parking",
    location: "686 E Union St, Pasadena",
    price: 2.50,
    rating: 4.0,
    available: 100,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Playhouse+District+Parking",
    description: "Close to Pasadena Playhouse and local coffee shops"
  },
  {
    id: 5,
    name: "Pasadena Convention Center Garage",
    location: "300 E Green St, Pasadena",
    price: 3.50,
    rating: 4.5,
    available: 200,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Pasadena+Convention+Center+Garage",
    description: "Large parking structure near Pasadena Convention Center and shops"
  },
  {
    id: 6,
    name: "Lake Avenue Parking",
    location: "60 S Lake Ave, Pasadena",
    price: 2.25,
    rating: 3.5,
    available: 85,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Lake+Avenue+Parking",
    description: "Shopping district parking with many food options nearby"
  },
  {
    id: 7,
    name: "Holly Street Garage",
    location: "150 E Holly St, Pasadena",
    price: 3.25,
    rating: 4.2,
    available: 110,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Holly+Street+Garage",
    description: "Centrally located near City Hall and popular restaurants"
  },
  {
    id: 8,
    name: "Schoolhouse Parking",
    location: "33 E Green St, Pasadena",
    price: 2.75,
    rating: 3.7,
    available: 65,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Schoolhouse+Parking",
    description: "Historic building with convenient access to shopping"
  },
  {
    id: 9,
    name: "Colorado Boulevard Parking",
    location: "245 E Colorado Blvd, Pasadena",
    price: 4.00,
    rating: 3.2,
    available: 90,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Colorado+Boulevard+Parking",
    description: "Located on Pasadena's main shopping street"
  },
  {
    id: 10,
    name: "Fair Oaks Parking Center",
    location: "88 S Fair Oaks Ave, Pasadena",
    price: 2.50,
    rating: 3.9,
    available: 70,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Fair+Oaks+Parking",
    description: "Right in the heart of Old Pasadena's entertainment district"
  },
  {
    id: 11,
    name: "Arcade Lane Parking",
    location: "41 Arcade Ln, Pasadena",
    price: 1.75,
    rating: 3.4,
    available: 40,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Arcade+Lane+Parking",
    description: "Hidden gem with cheaper rates than surrounding lots"
  },
  {
    id: 12,
    name: "Plaza Las Fuentes Parking",
    location: "121 S Los Robles Ave, Pasadena",
    price: 3.75,
    rating: 4.1,
    available: 180,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Plaza+Las+Fuentes+Parking",
    description: "Hotel and office complex with ample parking space"
  },
  {
    id: 13,
    name: "Memorial Park Station",
    location: "85 E Holly St, Pasadena",
    price: 2.00,
    rating: 4.0,
    available: 95,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Memorial+Park+Station",
    description: "Convenient for Metro Gold Line and local attractions"
  },
  {
    id: 14,
    name: "Union Street Garage",
    location: "501 E Union St, Pasadena",
    price: 2.75,
    rating: 3.6,
    available: 60,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Union+Street+Garage",
    description: "Near Paseo Colorado and Pasadena Civic Auditorium"
  },
  {
    id: 15,
    name: "Arroyo Parkway Lot",
    location: "135 S Arroyo Pkwy, Pasadena",
    price: 3.25,
    rating: 3.8,
    available: 55,
    imageURL: "https://placehold.co/400x300/fffc00/black?text=Arroyo+Parkway+Lot",
    description: "Close to Whole Foods Market and office buildings"
  }
];

// To verify my data structure is correctly set up (for debugging purposes)
console.log("Is parkingSpots an array?", Array.isArray(parkingSpots));

// This array will hold the parking spots I want to display
// initially, it contains all spots
// this array will change with filtering/sorting, that's why I used "let" instead of "const"
// used spread operator (...) to copy array with minimal code
let spotsToDisplay = [...parkingSpots];



// ========== FUNCTIONS ==========
// Display all parking lots from the spotsToDisplay array
function displayParkingSpots() {
  console.log("Displaying spots:", spotsToDisplay.length);

  // get the container where to put cards
  const cardContainer = document.getElementById("card-container");

  // clear any existing cards
  cardContainer.innerHTML = "";

  // get template card
  const templateCard = document.querySelector(".card");

  // check if there's any spots to display
  if (spotsToDisplay.length === 0) {
    // if no spots match, show a message
    const message = document.createElement("p");
    message.textContent = "No parking spots match your search.";
    message.style.textAlign = "center";
    message.style.fontSize = "18px";
    cardContainer.appendChild(message);
    return;
  }

  // loop through each parking spot and create a card for it
  for (let i = 0; i < spotsToDisplay.length; i++) {
    // get the current spot from the array
    const spot = spotsToDisplay[i];

    // copy the template card with parameter "true" to avoid redundant code which is already in HTML
    const newCard = templateCard.cloneNode(true);

    // update the card with this spot's information
    updateCard(newCard, spot);

    // add the card to container
    cardContainer.appendChild(newCard);
  }
}

// Update a card with information from a parking spot
function updateCard(card, spot) {
  console.log("Updating card for:", spot.name);

  // make the card visible
  card.style.display = "block";

  // use Object Destructuring to make cleaner code
  const { id, name, location, price, rating, imageURL, description} = spot;

  card.querySelector("h2").textContent = name;

  // update the image
  const cardImage = card.querySelector("img");
  cardImage.src = imageURL;
  cardImage.alt = name;

  // parking details
  // Template literals using backticks and ${} (for cleaner string formatting)
  card.querySelector(".description").textContent = description;
  card.querySelector(".location").textContent = `📍 ${location}`;
  card.querySelector(".price").textContent = `💰 $${price.toFixed(2)} / hour`;
  card.querySelector(".rating").textContent = `⭐ ${rating.toFixed(1)} / 5`;


  // add buttons by using a separate function
  addCardButtons(card, id);
}

// Create and add buttons to a card
function addCardButtons(card, spotId) {
  // create buttons container div
  const cardButtons = document.createElement("div");
  cardButtons.className = "card-buttons";

  // create "Parking Tips" button using helper function
  const tipButton = createButton("Parking Tips", () => parkingTipAlert());

  // create hide spot button using helper fuhnction
  const hideButton = createButton("Hide Spot", () => hideSpot(spotId));

  // add buttons to container
  cardButtons.appendChild(tipButton);
  cardButtons.appendChild(hideButton);

  // add button container to card
  card.querySelector(".card-content").appendChild(cardButtons);
}

// Helper function to create buttons (to make code more DRY)
function createButton(text, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = clickHandler;
  return button;
}



// OPERATION 1: Search fuction (filter spots by name or location)
function searchSpots() {
  // get what the user typed in the search box
  const searchText = document.getElementById("search-input").value.toLowerCase();
  console.log("Search text: ", searchText); // log what the user is searching for

  // if the search box is empty, show all spots
  if (searchText === "") {
    spotsToDisplay = [...parkingSpots];
    console.log("Search box empty, showing all spots"); // log when showing all
  } else {
    // otherwise, filter the spots to only show ones that match the search
    console.log("Filtering spots by: ", searchText); // log before filtering

    // .filter() takes a callback function
    // used an arrow function (spot => {}) as that callback
    // .filter() returns a NEW array with only elements that pass the test in the arrow function right below
    spotsToDisplay = parkingSpots.filter(spot => {
      // I used toLowerCase() first to make the search case-insehsitive
      // check if the name or location contains the searchText
      // then .includes() returns true / false
      // declared two boolean variables(nameMatch, locationMatch)
      const nameMatch = spot.name.toLowerCase().includes(searchText);
      const locationMatch = spot.location.toLowerCase().includes(searchText);

      // to track which matching condition(name / location) is being triggered for each spot
      console.log(`Spot: ${spot.name}, nameMatch: ${nameMatch}, locationMatch: ${locationMatch}`);

      return nameMatch || locationMatch;
      // return true if EITHER condition matches
      // then that spot is KEPT in the new array
      // which will be restored in the "spotsToDisplay" array
      // otherwise, others will not remain in the array
    });

    console.log("Found", spotsToDisplay.length, "matching spots"); // log results count
  }

  // update the display with filtered spots
  displayParkingSpots();
}



// OPERATION 2: Sort function (sort spots by price or rating)
function sortSpots() {
  // get the selected sort option
  const sortOption = document.getElementById("sort-select").value;
  console.log("Sorting by: ", sortOption); // log the sort option

  // log the number of spots before sorting (for verification)
  console.log("Spots to sort: ", spotsToDisplay.length);

  // store first three spots for before/after comparaison
  const firstThreeBefore = spotsToDisplay.slice(0, 3).map(spot => spot.name);
  console.log("First three spots BEFORE sorting: ", firstThreeBefore);

  // sort spots based on the sortOption
  // using Array.prototype.sort() with JS comparator functions
  if (sortOption === "price-low") {
    // sort by price from low to high
    console.log("Applying 'Price: Low to High' sort");
    spotsToDisplay.sort((a, b) => a.price - b.price); // ascending order
  } else if (sortOption === "price-high") {
    // sort by price from high to low
    console.log("Applying 'Price: High to Low' sort");
    spotsToDisplay.sort((a, b) => b.price - a.price); // descending order
  } else if (sortOption === "rating-high") {
    // sort by rating from high to low
    console.log("Applying 'Rating: High to Low' sort");
    spotsToDisplay.sort((a, b) => b.rating - a.rating); // descending order
  } else if (sortOption === "rating-low") {
    // sort by rating from low to high
    console.log("Applying 'Rating: Low to High' sort");
    spotsToDisplay.sort((a, b) => a.rating - b.rating); // ascending order
  } else {
    // by default
    console.log("No sorting applied yet");
  }

  // log first three spots after sorting (to verify the sort worked)
  const firstThreeAfter = spotsToDisplay.slice(0, 3).map(spot => spot.name);
  console.log("First three spots AFTER sorting: ", firstThreeAfter);

  // update the display with sorted spots
  displayParkingSpots();
}

// Reset all filters and show all spots
function resetFilters() {
  console.log("Reset Filter!");

  // clear the search input
  document.getElementById("search-input").value = "";

  // reset the sort dropdown
  document.getElementById("sort-select").value = CONFIG.defaultSort; // original state

  // show all parking spots
  spotsToDisplay = [...parkingSpots];
  displayParkingSpots();
}

// Show parking tips alert (inspired by template's quoteAlert() function)
function parkingTipAlert() {
  console.log("Tip Button Clicked!");

  // get a random tip from the configuration
  // parkingTips.length === 4
  // 0 <= Math.random() * CONFIG.parkingTips.length < 4
  // Math.floor(Math.random() * CONFIG.parkingTips.length): 0, 1, 2, or 3
  const randomTip = CONFIG.parkingTips[Math.floor(Math.random() * CONFIG.parkingTips.length)];

  // show the tip
  alert(randomTip);
}

// Hide a spot from the display (inspired by template's removeLastCard() function)
function hideSpot(spotId) {
  console.log("Hiding spot with ID:", spotId);

  // find the index of the spot with this ID
  const spotIndex = spotsToDisplay.findIndex(spot => spot.id === spotId);

  // remove that spot from the display array if found
  if (spotIndex !== -1) {
    spotsToDisplay.splice(spotIndex, 1);
    displayParkingSpots(); // refresh the display
  }
}



// ========== INITIALIZATION ==========
// Display all parking spots and set up event listeners
function initializeApp() {
  //console.clear(); // clear previous console messages
  console.log("Let's get started!");

  // display all parking spots
  displayParkingSpots();

  // set up event listener for search input
  document.getElementById("search-input").addEventListener("input", searchSpots); // OPERATION 1

  // set up event listener for sort dropdown
  document.getElementById("sort-select").addEventListener("change", sortSpots); // OPERATION 2
}

// Calls the initializaApp() function above when the page is first loaded
// runs only after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", initializeApp);


// Thanks for your time :)