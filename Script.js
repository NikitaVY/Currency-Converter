const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".From select");
const toCurrency = document.querySelector(".To select");
const msg = document.querySelector(".msg");

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


const updateExchangeRate =  async () => {
    const amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal = "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurrency.value.toLowerCase()];
    
    let finalAmount = amtVal * rate ;
    msg.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency}`;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.document.addEventListener("load", () => {
    updateExchangeRate();
})