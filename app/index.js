const calc = require('./calc')

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var first = 0;

rl.question('first nbr ?', (answer) => {
	rl.question('2nd nbr', (answer2)=>{
		console.log(`sum${Number(answer)+Number(answer2)}`)
		rl.close();
	})
});


const numbersToAdd = [
  3,
  4,
  10,
  2
]

const result = calc.sum(numbersToAdd)
//console.log(`The result is: ${result}`)