'use strict';

//========== Global Variables ==========
let voteRounds = 25;
let productArray = [];

//========== DOM References ============
let imgContainer = document.getElementById('gridItem2');
let imgOne = document.getElementById('image1');
let imgTwo = document.getElementById('image2');
let imgThree = document.getElementById('image3');
let resultsButton = document.getElementById('resultsButton');
let resultsList = document.getElementById('resultList');

//========== Constructor ===============
function Product(name, fileExtension = 'jpg') {
  this.productName = name;
  this.image = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


//========== Helper Functions ==========
function getRandomIndex(){
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs(){
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  while(productOneIndex === productTwoIndex){
    productTwoIndex = getRandomIndex();
  }
  while(productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex){
    productThreeIndex = getRandomIndex();
  }

  imgOne.src = productArray[productOneIndex].image;
  imgOne.alt = productArray[productOneIndex].productName;
  productArray[productOneIndex].views++;

  imgTwo.src = productArray[productTwoIndex].image;
  imgTwo.alt = productArray[productTwoIndex].productName;
  productArray[productTwoIndex].views++;

  imgThree.src = productArray[productThreeIndex].image;
  imgThree.alt = productArray[productThreeIndex].productName;
  productArray[productThreeIndex].views++;
}
renderImgs();

//========== Event Handlers ============
function handleClick(event){
  let imgClicked = event.target.alt;

  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }
  voteRounds--;
  if(voteRounds === 0){
    imgContainer.removeEventListener('click',handleClick);
    let finishText = document.createElement('p');
    finishText.textContent = ('Alright, That\' all for now! Thank You for Taking Our Survey! Click the Show Results button to check out the stats.');
    imgContainer.appendChild(finishText);
    return;
  }
  renderImgs();
}

function handleShowResults(){
  if(voteRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].productName} was seen ${productArray[i].views} and had ${productArray[i].clicks} votes.`;
      resultsList.appendChild(liElem);
    }
  }
}

//========== Event Listeners ===========
imgContainer.addEventListener('click', handleClick);
resultsButton.addEventListener('click', handleShowResults);

