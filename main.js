// CONSTRUCT
let slideShow = document.querySelector('.slideshow');

async function talkToDogsAPI() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  createBreedList(data.message);
}
talkToDogsAPI();

// EVENT
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

// ACTION
async function loadByBreed(clickedBreed) {
  if (clickedBreed != 'Wybierz rasę psa') {
    const response = await fetch(
      `https://dog.ceo/api/breed/${clickedBreed}/images`
    );
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(imagesObject) {
  console.log(imagesObject);
  imagesObject.map(() => {});
}
