var isPrime = function (n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 if (n%2==0) return (n==2);
 var m=Math.sqrt(n);
 for (var i=3;i<=m;i+=2) {
  if (n%i==0) return false;
 }
 return true;
}

module.exports.isPrime = isPrime;

var sum = function (num1, num2) {
	return parseFloat(num1) + parseFloat(num2);
}

module.exports.sum = sum;

function calculateFibonacciUpto(goal) {
    var fibonacci = [1, 1];
    var next;
    while ((next =(fibonacci[fibonacci.length-2] + fibonacci[fibonacci.length-1])) < goal) {
        fibonacci.push(next);
    }
    return fibonacci;
}

module.exports.calculateFibonacciUpto = calculateFibonacciUpto;
