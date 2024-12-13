const apikey = "87bc0e4100e7e1f8dd6fc387";


const dropDownLi = document.querySelectorAll(".dropDown select");
const button = document.querySelector("button");
let fromcurr = document.querySelector(".fromDown select");
let tocurr = document.querySelector(".todown select");
let msg = document.querySelector(".msg");

for (let select of dropDownLi) {
  for (currenyC in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currenyC;
    newOption.value = currenyC;

    if (select.name === "form" && currenyC === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currenyC === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    undateFlag(evt.target);
  });
}

let undateFlag = (element) => {
  let cuurencyCode = element.value;
  let countrycoude = countryList[cuurencyCode];
  console.log(countrycoude);
  let imgNewSRC = `https://flagsapi.com/${countrycoude}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = imgNewSRC;
};

button.addEventListener("click", (event) => {
  event.preventDefault();
  let amount = document.querySelector("input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  console.log(fromcurr.value, tocurr.value);
  const URL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromcurr.value}`;
  fetch(URL).then(response =>(response.json()).then(result =>{
    let exchangerate = result.conversion_rates[tocurr.value];
    console.log(amtval);


    let finalrate = amtval * exchangerate;
    console.log(finalrate);
    msg.innerHTML = `${amtval} ${fromcurr.value} = ${finalrate}${tocurr.value}`;
  }))
});
