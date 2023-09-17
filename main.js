// GET API-DATA (all-breeds list)
/* -------------------------------------------------------------------------- */

async function getDogList() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  createBreedList(data.message);
}
getDogList();

// MARKUP <SELECT> and fill with API-DATA (all-breeds list)
// <SELECT>-EVENT on CHANGE VALUE  (at choosing one breed)
/* -------------------------------------------------------------------------- */
function createBreedList(breedListObject) {
  const breedList = Object.keys(breedListObject);
  document.getElementById('breed').innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Wybierz rasę psa</option>
    ${breedList
      .map(function (breed) {
        return `<option> ${breed}</option>`;
      })
      .join(' ')}
  </select>  
  `;
}

// GET API-DATA (one breed [image's url-list]))
/* -------------------------------------------------------------------------- */
async function loadByBreed(clickedBreed) {
  if (clickedBreed != 'Wybierz rasę psa') {
    const response = await fetch(
      `https://dog.ceo/api/breed/${clickedBreed}/images`
    );
    const data = await response.json();
    createSlideShow(data.message);
  }
}

// MARKUP <div> x 3 with background-image url's from [IMAGES]
/* -------------------------------------------------------------------------- */
function createSlideShow(images) {
  let slideShow = document.getElementById('slideshow');
  let currentImage = 0;
  slideShow.innerHTML = `<div class="slide" style="background-image: url('${images[0]}');"></div>
  <div class="slide" style="background-image: url('${images[1]}');"></div>`;
  currentImage += 2;
  setInterval(nextSlide, 3000);

  function nextSlide() {
    slideShow.insertAdjacentHTML(
      'beforeend',
      `<div class="slide" style="background-image: url('${images[currentImage]}');"></div>`
    );
    setTimeout(() => document.querySelector('.slide').remove(), 1000);
    if (currentImage + 1 >= images.length) {
      currentImage = 0;
    } else {
      currentPosition++;
    }
  }
}
