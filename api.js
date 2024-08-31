let dropdowns = document.querySelectorAll(".dropdown select");
let msgTxt = document.querySelector(".msg");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
                newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async() => {
    let amount =document.querySelector("form input");
    let amountVal =amount.value;
    if(amountVal == "" || amountVal < 1){
        amountVal = 1;
        amount.value = "1";
    }
    msgTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/ff14a83ffedbd3e9f7eb2312/latest/${fromCurr.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurr.value];
      let total = amountVal * exchangeRate;
      msgTxt.innerText = `${amountVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
    })
    .catch(() => {
      msgTxt.innerText = "something went wrong";
    });
}



const updateFlag = (element) => {
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png` ;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
    });
    