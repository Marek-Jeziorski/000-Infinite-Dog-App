// FETCH is not just going to return the data that lives at this url
// instead the fetch function is going to return a PROMISE

// PROMISE is a way of letting this operation run in the background and we don't care how long it takes
// it's not going to block any of our other code from running

/* -------------------------------------------------------------------------- */
// PROMISE - OLD WAY
/* -------------------------------------------------------------------------- */

// PROMISE has a METHOD named THEN()
// we can give THEN() a FUNCTION as ARGUMENT
// it will WAIT TO CALL this function UNTIL FETCH() has completed

fetch('https://dog.ceo/api/breeds/list/all')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// response.json = we want deal with actual data it sent (RETURN another PROMISE itself)
// response is connection data (HEADERS) => we have to now pull out actual data BODY

/* -------------------------------------------------------------------------- */
// PROMISE NEW WAY
/* -------------------------------------------------------------------------- */
// we need to be inside ASYNCHRONOUS FUNCTION

async function start() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  console.log(data);
}
start();

// code inside ASYNC FUNCTION won't be run until AWAIT --> FETCH's PROMISE RETURNS OR RESOLVE
// follow by code outside the function won't wait and will be execute

// JSON = JAVA SCRIPT OBJECT NOTATION = response.json() =  extract JSON from RESPONSE (give me an JS OBJECT)

/* -------------------------------------------------------------------------- */

Object.keys(ourObject);
// returns ARRAY from OBJECT KEYS

/* -------------------------------------------------------------------------- */

ARRAY.join(''); // makes STRING LIST from an array with CUSTOM SEPARATOR

let myArray = ['Ann', 'Danil', 'Luna'];
console.log(myArray);

console.log(myArray.join(' '));

/* -------------------------------------------------------------------------- */
// DISPLAYING IMAGES IN SLIDE SHOW
// Markup <div> x 3 with background-image url's from [IMAGES]
// We could do it by adding <img> but
// to take up this full available space and i want the image to scale to fit
// inside this not just horizontally but also vertically  (background-image: contain )

function createSlideShow(images) {
  document.getElementById(
    'slideshow'
  ).innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide" style="background-image: url('${images[1]}');"></div>`;
}

/* -------------------------------------------------------------------------- */
/* css to write a selector that says the second to last  
   slide div should be the one that's visible
   so then every three seconds we add the new photo to the end
   and remove oldest

*/

/* -------------------------------------------------------------------------- */
// CREATE SLIDE SHOW FUNCTION
/* -------------------------------------------------------------------------- */

function createSlideShow(images) {
  /* -------------------------------------------------------------------------- */
  // RESET TIMERS AND COUNTS, MAP <ELEM>, INIT VARIABLES

  clearInterval(nextSlideTimer);
  clearTimeout(removeFirstSlideTimer);
  let currentPosition = 0;
  let slideShow = document.getElementById('slideshow');

  /* -------------------------------------------------------------------------- */
  //  MARKUP <DIV-IMAGES> , EDGE-LOGIC, COUNT INIT, EXE-INTERVAL(ADD NEXT SLIDE)

  if (images.length > 1) {
    slideShow.innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div> <div class="slide" style="background-image: url('${images[1]}');"></div>`;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    nextSlideTimer = setInterval(nextSlide, 3000);
  } else {
    slideShow.innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide" ></div>`;
  }

  /* -------------------------------------------------------------------------- */
  // INTERVAL (ADD NEXT & REMOVE FIRST SLIDE, COUNT UP)
  function nextSlide() {
    slideShow.insertAdjacentHTML(
      'beforeend',
      `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`
    );
    removeFirstSlideTimer = setTimeout(() => {
      document.querySelector('.slide').remove();
    }, 1000);

    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
