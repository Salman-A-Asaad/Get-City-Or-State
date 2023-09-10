let endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let searchInput = document.querySelector(".search input");
let resultDiv = document.querySelector(".result");
async function getData() {
  let result = await fetch(endpoint);
  let data = await result.json();
  printData(data);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function printData(data) {
  let allCitiesOrState = ``;
  let number = 1;
  data.forEach((element) => {
    if (
      element.city.toLowerCase().includes(searchInput.value) ||
      element.state.toLowerCase().includes(searchInput.value)
    ) {
      number % 2 == 0
        ? (allCitiesOrState += `<div class="even item"><p>${
            element.city
          }</p><span>${numberWithCommas(element.population)}</span></div>`)
        : (allCitiesOrState += `<div class="odd item"><p>${
            element.city
          }</p><span>${numberWithCommas(element.population)}</span></div>`);
      number++;
    }
  });
  resultDiv.innerHTML = allCitiesOrState;
}

function getTheCityOrState() {
  if (searchInput.value != "") {
    getData();
  } else {
    resultDiv.innerHTML = `        <div class="odd item">Filter For A City</div>
        <div class="even item">Or A State</div>`;
  }
}
searchInput.addEventListener("change", getTheCityOrState);
searchInput.addEventListener("keyup", getTheCityOrState);
