let avaiableInput = document.querySelector('.converter-input');
let desirableInput = document.querySelector('.js-converter-input');
let currencyAv = document.querySelectorAll('.calc__switcher_l div');
let currencyDes = document.querySelectorAll('.calc__switcher div');
const number = document.getElementById("number");
    const output = document.getElementById("output");

    avaiableInput.value = '1';


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
      if(event.target.classList.contains('available') == true) {
        getCurrencyCourse(true);
    } else {
        getCurrencyCourse(false);
    }
  }
  } );
});


function getCurrencyCourse(isAvailable = true){
  let rightCurrency = document.querySelector('.calc__switcher div.active').innerText;
  let leftCurrency = document.querySelector('.calc__switcher_l div.active').innerText;

  let avaliableCourse = document.querySelector('.js-converter-rate-from');
  let desirableCourse = document.querySelector('.js-converter-rate-to');
  
  if(rightCurrency == leftCurrency){
    avaliableCourse.innerText = `1 ${leftCurrency} = 1.00 ${rightCurrency}`;
    desirableCourse.innerText = `1 ${rightCurrency} = 1.00 ${leftCurrency}`;
    desirableInput.value = avaiableInput.value;
  } else{
    let requestUrl = `https://api.exchangerate.host/latest?base=${rightCurrency}&symbols=${leftCurrency}`;
    fetch(requestUrl)
.then(response => response.json())
.then(data => {
  console.log(data);
  let rateAmount = data.rates[leftCurrency];

avaliableCourse.innerText = `1 ${leftCurrency} = ${(1 / rateAmount).toFixed(4)} ${rightCurrency}`;
            desirableCourse.innerText = `1 ${rightCurrency} = ${rateAmount.toFixed(4)} ${leftCurrency}`;

            if(isAvailable) {
                return desirableInput.value = (avaiableInput.value / rateAmount).toFixed(4);
            } else {
                return avaiableInput.value = (desirableInput.value * rateAmount).toFixed(4);
                }
})
.catch(error => {
  alert(`Произошла ошибка: ${error.message}`);
  });
  }
}

getCurrencyCourse(true);
