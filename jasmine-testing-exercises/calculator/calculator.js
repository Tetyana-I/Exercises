window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

//get input and convert into numbers or NaN if a string
function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values  = { amount: 0, years: 0, rate: 0 };
  const amountUI = document.getElementById("loan-amount");
  amountUI.value = values.amount;
  const yearsUI = document.getElementById("loan-years");
  yearsUI.value = values.years;
  const rateUI = document.getElementById("loan-rate");
  rateUI.value = values.rate;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentUIValues = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentUIValues));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.

//(.Fixed() returns a string representing the given number)
function calculateMonthlyPayment(values) {
  let monthlyPayment = '';
  const months = values.years * 12;
  if (values.amount === 0) {monthlyPayment = 0;} 
    else if (values.years === 0) {monthlyPayment = values.amount;}
      else if (values.rate === 0) {monthlyPayment = values.amount/months;}  
        else {
            const monthlyRate = values.rate / 12 / 100;
            monthlyPayment = (values.amount * monthlyRate) / (1- (1+monthlyRate)**(-months));
        }

  monthlyPayment = monthlyPayment.toFixed(2);    
  return monthlyPayment;
 }

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyUIPayment = document.getElementById("monthly-payment");
  (isNaN(monthly)) ? monthlyUIPayment.innerText = "Invalid input" : monthlyUIPayment.innerText = "$"+ monthly; 
}