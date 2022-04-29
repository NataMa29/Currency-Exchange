let avaiableInput = document.querySelector('.converter-input');
let desirableInput = document.querySelector('.js-converter-input');
let currencyAv = document.querySelectorAll('.calc__switcher_l div');
let currencyDes = document.querySelectorAll('.calc__switcher div');
const number = document.getElementById("number");
    const output = document.getElementById("output");

currencyAv.forEach(item => {
  item.addEventListener('click', (event) => {
    currencyAv.forEach(item => {
      item.classList.remove('active');
    });
    event.target.classList.add('active');
    getCurrencyCourse(true);
  });
});

currencyDes.forEach(item => {
  item.addEventListener('click', (event) => {
    currencyDes.forEach(item => {
      item.classList.remove('active');
    });
    event.target.classList.add('active');
    getCurrencyCourse(true);
  });
});

document.querySelectorAll('input').forEach(item => {
  item.addEventListener('keydown', (event) => {
    if (event.key == 'Enter'){
    getCurrencyCourse(true);
  }
  } );
});


function getCurrencyCourse(isAvaliableInput = true){
  let rightCurrency = document.querySelector('.calc__switcher div.active').innerText;
  let leftCurrency = document.querySelector('.calc__switcher_l div.active').innerText;

  let avaliableCourse = document.querySelector('.js-converter-rate-from');
  let desirableCourse = document.querySelector('.js-converter-rate-to');
  
  if(rightCurrency == leftCurrency){
    avaliableCourse.innerText = `1 ${leftCurrency} = 1.00 ${rightCurrency}`;
    desirableCourse.innerText = `1 ${leftCurrency} = 1.00 ${rightCurrency}`;
    desirableInput.value = avaiableInput.value;
  }
  else{
    let requestUrl = `https://api.exchangerate.host/convert?from=${leftCurrency}&to=${rightCurrency}`;
    fetch(requestUrl)
.then(response => response.json())
.then(data => {
  console.log(data);
let rateAmount = data.result;
desirableInput.innerText = `${avaiableInput.value}`* `${rateAmount}`;
});
  }
}

