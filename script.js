// Selectors
const dateInput = document.querySelector("#date-input");
const nameInput = document.querySelector("#name-input");
const weeklyInput = document.querySelector("#weekly-expense-input");
const weeklyLabel = document.querySelector(".weekly-label");
const monthlyInput = document.querySelector("#monthly-expense-input");
const monthlyLabel = document.querySelector(".monthly-label");
const yearlyInput = document.querySelector("#yearly-expense-input");
const yearlyLabel = document.querySelector(".yearly-label");
const plusButton = document.querySelector("#plus-button");
const expenseArea = document.querySelector(".expense-area");
// totals
const yearlyTotal = document.querySelector(".yearly-total");
const monthlyTotal = document.querySelector(".monthly-total");
const weeklyTotal = document.querySelector(".weekly-total");
// income
const weeklyIncome = document.querySelector(".weekly-income-input");
const monthlyIncome = document.querySelector(".monthly-income-input");
const yearlyIncome = document.querySelector(".yearly-income-input");
// food
const weeklyFood = document.querySelector(".weekly-food-input");
const monthlyFood = document.querySelector(".monthly-food-input");
const yearlyFood = document.querySelector(".yearly-food-input");
// saving
const weeklySaving = document.querySelector(".weekly-saving-input");
const monthlySaving = document.querySelector(".monthly-saving-input");
const yearlySaving = document.querySelector(".yearly-saving-input");
// Spend
const spendTitle = document.querySelector(".spend-title");
const yearlySpend = document.querySelector(".yearly-spend");
const monthlySpend = document.querySelector(".monthly-spend");
const weeklySpend = document.querySelector(".weekly-spend");

const everything = document.querySelector("html");
//
//
//data storage
var yearlyTotalStorage = 0;
var moneySign = "£ ";
var totals = [0, 0, 0];
var income = [0, 0, 0];
var food = [0, 0, 0];
var saving = [0, 0, 0];
var spend = [0, 0, 0];

//
//
//listeners

//turn off other input fields
weeklyInput.addEventListener("input", turnOffOther);
monthlyInput.addEventListener("input", turnOffOther);
yearlyInput.addEventListener("input", turnOffOther);
//create an expense line
plusButton.addEventListener("click", addExpense);
// income update data
weeklyIncome.addEventListener("input", fromWeeklyIncome);
monthlyIncome.addEventListener("input", fromMonthlyIncome);
yearlyIncome.addEventListener("input", fromYearlyIncome);
// food update data
weeklyFood.addEventListener("input", fromWeeklyFood);
monthlyFood.addEventListener("input", fromMonthlyFood);
yearlyFood.addEventListener("input", fromYearlyFood);
// saving update data
weeklySaving.addEventListener("input", fromWeeklySaving);
monthlySaving.addEventListener("input", fromMonthlySaving);
yearlySaving.addEventListener("input", fromYearlySaving);
//spend
everything.addEventListener("input", spendCalculation);
//delete
expenseArea.addEventListener("click", puffIt);

//
//
// functions

///adds a new line
function addExpense(event) {
  event.preventDefault();
  const expenseBox = document.createElement("div");
  expenseBox.classList.add("expense");

  //   date
  const date = document.createElement("div");
  const dateText = dateInput.value;
  date.innerText = dateText;
  date.classList.add("expense-item");

  //   name
  const name = document.createElement("div");
  const nameText = nameInput.value;
  name.innerText = nameText;
  name.classList.add("expense-item");

  //   week
  const week = document.createElement("div");
  const weekText = weeklyInput.value;
  week.classList.add("expense-item");

  //   month
  const month = document.createElement("div");
  const monthText = monthlyInput.value;
  month.classList.add("expense-item");

  //   year
  const year = document.createElement("div");
  const yearText = yearlyInput.value;
  year.classList.add("expense-item");

  // no mater what input get yearly cost of the row
  let allCosts = inputCounter(weekText, monthText, yearText);
  yearlyTotalStorage += allCosts[2];
  displayTotals(yearlyTotalStorage);

  week.innerText = moneySign + allCosts[0].toFixed(2);
  month.innerText = moneySign + allCosts[1].toFixed(2);
  year.innerText = moneySign + allCosts[2].toFixed(2);

  // empty the inputs
  dateInput.value = "";
  nameInput.value = "";
  weeklyInput.value = "";
  monthlyInput.value = "";
  yearlyInput.value = "";
  turnOffOther();

  // append inputs
  expenseBox.appendChild(date);
  expenseBox.appendChild(name);
  expenseBox.appendChild(week);
  expenseBox.appendChild(month);
  expenseBox.appendChild(year);

  //   delete
  const puff = document.createElement("div");
  const puffText = "delete";
  puff.innerText = puffText;
  puff.classList.add("puff");
  expenseBox.appendChild(puff);

  expenseArea.appendChild(expenseBox);
  spendCalculation();
}

//calculates cost depending on input
function inputCounter(week, month, year) {
  let aWeek = 0;
  let aMonth = 0;
  let aYear = 0;

  if (week > 0) {
    aWeek = parseInt(week);
    aYear = aWeek * 52;
    aMonth = aYear / 12;
  } else if (month > 0) {
    aMonth = parseInt(month);
    aYear = aMonth * 12;
    aWeek = aYear / 52;
  } else if (year > 0) {
    aYear = parseInt(year);
    aMonth = aYear / 12;
    aWeek = aYear / 52;
  }
  return [aWeek, aMonth, aYear];
}
// disables other inputs if one selected
function turnOffOther() {
  let week = parseInt(weeklyInput.value);
  let month = parseInt(monthlyInput.value);
  let year = parseInt(yearlyInput.value);

  if (week > 0) {
    monthlyInput.classList.add("turn-off");
    yearlyInput.classList.add("turn-off");
  } else if (month > 0) {
    weeklyInput.classList.add("turn-off");
    yearlyInput.classList.add("turn-off");
  } else if (year > 0) {
    weeklyInput.classList.add("turn-off");
    monthlyInput.classList.add("turn-off");
  } else {
    weeklyInput.classList.remove("turn-off");
    monthlyInput.classList.remove("turn-off");
    yearlyInput.classList.remove("turn-off");
  }
}
// total expense display and storing
function displayTotals(yearlyCost) {
  totals = inputCounter(0, 0, yearlyCost);
  yearlyTotal.innerText = moneySign + totals[2].toFixed(2);
  monthlyTotal.innerText = moneySign + totals[1].toFixed(2);
  weeklyTotal.innerText = moneySign + totals[0].toFixed(2);
}
// income updater and storing
function fromWeeklyIncome() {
  let week = parseInt(weeklyIncome.value);
  income = inputCounter(week, 0, 0);
  monthlyIncome.value = income[1].toFixed(2);
  yearlyIncome.value = income[2].toFixed(2);
}
function fromMonthlyIncome() {
  let month = parseInt(monthlyIncome.value);
  income = inputCounter(0, month, 0);
  weeklyIncome.value = income[0].toFixed(2);
  yearlyIncome.value = income[2].toFixed(2);
}
function fromYearlyIncome() {
  let year = parseInt(yearlyIncome.value);
  income = inputCounter(0, 0, year);
  weeklyIncome.value = income[0].toFixed(2);
  monthlyIncome.value = income[1].toFixed(2);
}
// food updater and storing
function fromWeeklyFood() {
  let week = parseInt(weeklyFood.value);
  food = inputCounter(week, 0, 0);
  monthlyFood.value = food[1].toFixed(2);
  yearlyFood.value = food[2].toFixed(2);
}
function fromMonthlyFood() {
  let month = parseInt(monthlyFood.value);
  food = inputCounter(0, month, 0);
  weeklyFood.value = food[0].toFixed(2);
  yearlyFood.value = food[2].toFixed(2);
}
function fromYearlyFood() {
  let year = parseInt(yearlyFood.value);
  food = inputCounter(0, 0, year);
  weeklyFood.value = food[0].toFixed(2);
  monthlyFood.value = food[1].toFixed(2);
}
// Saving updater and storing
function fromWeeklySaving() {
  let week = parseInt(weeklySaving.value);
  saving = inputCounter(week, 0, 0);
  monthlySaving.value = saving[1].toFixed(2);
  yearlySaving.value = saving[2].toFixed(2);
}
function fromMonthlySaving() {
  let month = parseInt(monthlySaving.value);
  saving = inputCounter(0, month, 0);
  weeklySaving.value = saving[0].toFixed(2);
  yearlySaving.value = saving[2].toFixed(2);
}
function fromYearlySaving() {
  let year = parseInt(yearlySaving.value);
  saving = inputCounter(0, 0, year);
  weeklySaving.value = saving[0].toFixed(2);
  monthlySaving.value = saving[1].toFixed(2);
}
// spend
function spendCalculation() {
  let year = income[2] - totals[2] - food[2] - saving[2];
  spend = inputCounter(0, 0, year);
  yearlySpend.innerText = moneySign + spend[2].toFixed(2);
  monthlySpend.innerText = moneySign + spend[1].toFixed(2);
  weeklySpend.innerText = moneySign + spend[0].toFixed(2);

  if (income[2] > 0 && spend[2] < 1) {
    spendTitle.innerHTML = "<h3>You are spending too much!</h3>";
    spendTitle.style.background = "rgb(240, 166, 82)";
    yearlySpend.style.background = "rgb(240, 166, 82)";
    monthlySpend.style.background = "rgb(240, 166, 82)";
    weeklySpend.style.background = "rgb(240, 166, 82)";
    yearlySpend.innerHTML = "😢";
    monthlySpend.innerHTML = "😢";
    weeklySpend.innerHTML = "😢";
  } else {
    spendTitle.innerHTML = "<h3>spend the rest if you like :D</h3>";
    spendTitle.style.background = "rgb(142, 199, 168)";
    yearlySpend.style.background = "rgb(142, 199, 168)";
    monthlySpend.style.background = "rgb(142, 199, 168)";
    weeklySpend.style.background = "rgb(142, 199, 168)";
  }
}

//delete
function puffIt(event) {
  const item = event.target;
  const reduceCost = parseInt(item.previousElementSibling.innerText.slice(2));
  if (item.classList[0] === "puff") {
    const expenseRow = item.parentElement;
    let name = expenseRow.children[1].innerText;
    if (name === "") {
      name = "Unnamed";
    } else {
      name = expenseRow.children[1].innerText;
    }
    const sure = confirm(`${name} expense, delete?`);
    if (sure) {
      yearlyTotalStorage -= reduceCost;
      displayTotals(yearlyTotalStorage);
      spendCalculation();
      expenseRow.remove();
    }
  } else {
    return;
  }
}
