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


//========== Constructor ===============
function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

for (let i = 0; i < products.length; i++) {
  if (products[i] === 'sweep') {
    new Product('sweep', 'png');
  } else {
    new Product(`${products[i]}`);
  }
}

// new Product('bag');
// new Product('banana');
// new Product('bathroom');
// new Product('boots');
// new Product('breakfast');
// new Product('bubblegum');
// new Product('chair');
// new Product('cthulhu');
// new Product('dog-duck');
// new Product('dragon');
// new Product('pen');
// new Product('pet-sweep');
// new Product('scissors');
// new Product('shark');
// new Product('sweep', 'png');
// new Product('tauntaun');
// new Product('unicorn');
// new Product('water-can');
// new Product('wine-glass');


//========== Helper Functions ==========
function getRandomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  while (previousIndexes.length < 6) {
    let imgIndex = getRandomIndex();
    if (!previousIndexes.includes(imgIndex)) {
      previousIndexes.push(imgIndex);
    }
  }
  console.log(previousIndexes);
  if (previousIndexes.length === 6) {
    previousIndexes.splice(0, 3);
  }
  console.log(previousIndexes);
  imgOne.src = productArray[previousIndexes[0]].image;
  imgOne.alt = productArray[previousIndexes[0]].productName;
  productArray[previousIndexes[0]].views++;

  imgTwo.src = productArray[previousIndexes[1]].image;
  imgTwo.alt = productArray[previousIndexes[1]].productName;
  productArray[previousIndexes[1]].views++;

  imgThree.src = productArray[previousIndexes[2]].image;
  imgThree.alt = productArray[previousIndexes[2]].productName;
  productArray[previousIndexes[2]].views++;

  // let productOneIndex = getRandomIndex();
  // let productTwoIndex = getRandomIndex();
  // let productThreeIndex = getRandomIndex();

  // while(productOneIndex === productTwoIndex){
  //   productTwoIndex = getRandomIndex();
  // }
  // while(productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex){
  //   productThreeIndex = getRandomIndex();
  // }

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
    let myChart = new Chart(ctx, myChartObj);
  }
}


// for (let i = 0; i < productArray.length; i++) {
//   let liElem = document.createElement('li');
//   liElem.textContent = `${productArray[i].productName} was seen ${productArray[i].views} and had ${productArray[i].clicks} votes.`;
//   resultsList.appendChild(liElem);
// }

//========== Event Listeners ===========
imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);
