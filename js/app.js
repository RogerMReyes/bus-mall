'use strict';

//========== Global Variables ==========
let voteRounds = 25;
let products = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let productArray = [];
let previousIndexes = [];

//========== DOM References ============
let imgContainer = document.getElementById('gridItem2');
let imgOne = document.getElementById('image1');
let imgTwo = document.getElementById('image2');
let imgThree = document.getElementById('image3');
let resultsButton = document.getElementById('resultsButton');
// let resultsList = document.getElementById('resultList');
let ctx = document.getElementById('myChart').getContext('2d');

//========== Local Storage Retrieval ===
let retrieveProducts = localStorage.getItem('products');
let parsedProducts = JSON.parse(retrieveProducts);
// console.log(parsedProducts);

//========== Constructor ===============
function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

//If no local storage runs new products through constructor; else runs previous data back through constructor
if (!retrieveProducts) {
  for (let i = 0; i < products.length; i++) {
    if (products[i] === 'sweep') {
      new Product('sweep', 'png');
    } else {
      new Product(`${products[i]}`);
    }
  }
} else {
  for (let i = 0; i < parsedProducts.length; i++) {
    if (parsedProducts[i].productName === 'sweep') {
      let updatedSweep = new Product(parsedProducts[i].productName, 'png');
      updatedSweep.views = parsedProducts[i].views;
      updatedSweep.clicks = parsedProducts[i].clicks;
    } else {
      let updatedProduct = new Product(parsedProducts[i].productName);
      updatedProduct.views = parsedProducts[i].views;
      updatedProduct.clicks = parsedProducts[i].clicks;
    }
  }
}

//

//========== Helper Functions ==========
function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  //Fills Array with 6 unique indexes
  while (previousIndexes.length < 6) {
    let imgIndex = getRandomIndex();
    if (!previousIndexes.includes(imgIndex)) {
      previousIndexes.push(imgIndex);
    }
  }

  //Removes the first 3 index is the array
  if (previousIndexes.length === 6) {
    previousIndexes.splice(0, 3);
  }

  //Inserts the unique index to populate the image
  imgOne.src = productArray[previousIndexes[0]].image;
  imgOne.alt = productArray[previousIndexes[0]].productName;
  productArray[previousIndexes[0]].views++;

  imgTwo.src = productArray[previousIndexes[1]].image;
  imgTwo.alt = productArray[previousIndexes[1]].productName;
  productArray[previousIndexes[1]].views++;

  imgThree.src = productArray[previousIndexes[2]].image;
  imgThree.alt = productArray[previousIndexes[2]].productName;
  productArray[previousIndexes[2]].views++;
}
renderImgs();

//========== Event Handlers ============
function handleClick(event) {
  let imgClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].productName) {
      productArray[i].clicks++;
    }
  }
  voteRounds--;
  if (voteRounds === 0) {
    imgContainer.removeEventListener('click', handleClick);
    let finishText = document.createElement('p');
    finishText.textContent = ('Alright, That\' all for now! Thank You for Taking Our Survey! Click the Show Results button to check out the stats.');
    imgContainer.appendChild(finishText);

    //Converting array into a string and storing in local storage with the key value of 'products'
    let productStringified = JSON.stringify(productArray);
    localStorage.setItem('products', productStringified);

    return;
  }
  renderImgs();
}

// Results button updated to now show a chart instead of a list
function handleShowResults() {
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].clicks);
  }

  if (voteRounds === 0) {
    let myChartObj = {
      type: 'bar',
      data: {
        labels: products,
        datasets: [{
          label: '# of Votes',
          data: productVotes,
          backgroundColor: [
            '#DE9B5D'
          ],
          borderColor: [
            '#DE9B5D'
          ],
          borderWidth: 1
        },
        {
          label: '# of Views',
          data: productViews,
          backgroundColor: [
            '#E3C2A4'
          ],
          borderColor: [
            '#E3C2A4'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    new Chart(ctx, myChartObj);
  }
}

//========== Event Listeners ===========
imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);
