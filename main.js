async function getAllBreedsList() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  createBreedListMarkup(data.message);
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

function createSlideShow(breedImages) {
  let currentImage = 0;
  let slideShow = document.getElementById('slideshow');
  slideShow.innerHTML = `<div class="slide" style="background-image: url('${breedImages[0]}');"></div>
  <div class="slide" style="background-image: url('${breedImages[1]}');"></div>`;

  currentImage += 2;
  setInterval(nextSlide, 3000);

  function nextSlide() {
    console.log('next slide after 3sec');
    slideShow.insertAdjacentHTML(
      'beforeend',
      `<div class="slide" style="background-image: url('${breedImages[currentImage]}');"></div>`
    );
    setTimeout(() => {
      document.querySelector('.slide').remove();
      console.log('remove slide after 1sec');
    }, 1000);

    if (currentImage + 1 >= breedImages.length) {
      currentImage = 0;
    } else {
      currentImage++;
    }
  }
}
