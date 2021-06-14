
it('should calculate the monthly rate correctly', function () {
    expect(calculateMonthlyPayment({amount: 1000, years: 3, rate: 36})).toEqual('45.80'); 
  });

it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 400, years: 1, rate: 0})).toEqual('33.33');
});

it("should return 0 when loan amount is 0", function() {
  expect(calculateMonthlyPayment({amount: 0, years: 0, rate: 5})).toEqual('0.00');
  expect(calculateMonthlyPayment({amount: 0, years: 0, rate: 0})).toEqual('0.00');
});

it('should return NaN if no input from a user or strings instead of numbers', function () {
  
  expect(calculateMonthlyPayment({amount: "", years: "", rate: ""})).toEqual('NaN');
  expect(calculateMonthlyPayment({amount: "ghghkhg", years: "", rate: ""})).toEqual('NaN');

});

