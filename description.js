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
