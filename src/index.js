const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

document.addEventListener("DOMContentLoaded", () => {
  getDogImages();
  getBreeds();
  handleDropDown();
});

function getDogImages() {
  fetch(imgUrl) //Fetch images returns
    .then((resp) => resp.json()) //parses response to json
    .then((dogData) => addDogImages(dogData.message)); // pass the data to the CEO
}

function addDogImages(dogData) {
  dogData.forEach((dogData) => {
    const dogPic = document.createElement("img"); // create img element
    const imgContainer = document.querySelector("#dog-image-container");
    dogPic.src = dogData; // set img src
    imgContainer.appendChild(dogPic); // appending img to parent container
  });
}

function getBreeds() {
  fetch(breedUrl) //Fetch images returns promise
    .then((resp) => resp.json()) // parses response to json
    .then((breedData) => {
      const arrOfBreeds = Object.keys(breedData.message); // convert obj to array
      breeds = arrOfBreeds;
      updateBreedList(breeds); //send breeds to updateBreedList
    });
}

function updateBreedList(breeds) {
  const breedList = document.querySelector("#dog-breeds"); // selecting the ul
  removeChildren(breedList); // clear the list
  breeds.forEach((breed) => addBreed(breed)); // send each breed to addBreed
}

function removeChildren(element) {
  let child = element.lastElementChild; // sets child to last element
  while (child) {
    // while child is NOT undefined
    element.removeChild(child); // remove the child
    child = element.lastElementChild; // sets child back to last element
  }
}

function addBreed(breed) {
  const breedList = document.querySelector("#dog-breeds"); // selecting the ul
  const dog = document.createElement("li"); //creating li for each breed
  dog.textContent = breed; // set text content to current dog for each li item
  dog.addEventListener("click", updateColor); // event listener to update color
  breedList.append(dog); // appending the dog li's to the list of dog breeds
}

// updating color of li when clicked
function updateColor(e) {
  const dog = e.target;
  if (dog.style.color === "red") {
    dog.style.color = "green";
  } else if (dog.style.color === "green") {
    dog.style.color = "blue";
  } else if (dog.style.color === "blue") {
    dog.style.color = "orange";
  } else if (dog.style.color === "orange") {
    dog.style.color = "black";
  } else {
    dog.style.color = "red";
  }
}

function handleDropDown() {
  const letterSelect = document.getElementById("breed-dropdown"); // grab menu
  letterSelect.addEventListener("change", handleFilter); // addEventListener for changing dropdown menu
}

function handleFilter(e) {
  let selection = e.target.value; // value that was selected from the dropdown
  let filteredBreeds = breeds.filter((breed) => {
    if (breed.charAt(0) === selection) {
      return breed;
    } else if (selection === "all") {
      return breed;
    }
  });
  updateBreedList(filteredBreeds);
}
