let nextSlideTimer;
let removeFirstSlideTimer;

async function getAllBreedsList() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    createBreedListMarkup(data.message);
  } catch (e) {
    console.log('There was a problem ' + e);
  }
}
getAllBreedsList();

function createBreedListMarkup(apiAllBreedsList) {
  const allBreedsList = Object.keys(apiAllBreedsList);
  document.getElementById('breed').innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Wybierz rasę psa</option>
    ${allBreedsList
      .map(function (curentBreed) {
        return `<option> ${curentBreed}</option>`;
      })
      .join(' ')}
  </select>  
  `;
}

// Function called by <select> onchange event
async function loadByBreed(selectedBreed) {
  if (selectedBreed != 'Wybierz rasę psa') {
    const response = await fetch(
      `https://dog.ceo/api/breed/${selectedBreed}/images`
    );
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  clearInterval(nextSlideTimer);
  clearTimeout(removeFirstSlideTimer);
  let currentPosition = 0;
  let slideShow = document.getElementById('slideshow');

  if (images.length > 1) {
    slideShow.innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide" style="background-image: url('${images[1]}');"></div>`;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    nextSlideTimer = setInterval(nextSlide, 3000);
  } else {
    slideShow.innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide" ></div>`;
  }

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
