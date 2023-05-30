const btn = document.querySelector('.btn-open'); //@todo finish teh course
btn.addEventListener('click', () => {
	const form = document.querySelector('.fact-form');
	if (form.classList.contains('hidden')) {
		btn.textContent = 'close';
	} else {
		btn.textContent = 'share a fact';
	}
	form.classList.toggle('hidden');
});

const fact = ['Libson is the capital of portugal', 2015, true];

console.log(fact);
console.log(fact[0]);
console.log(fact[1]);
console.log(fact.length);
const newFact = [...fact, 'society'];
console.log(newFact);

const factObj = {
	text: 'Libson is the capital of portugal',
	isCorrect: true,
	category: 'society',
	createSummary: function () {
		return `The fact ${this.text} is ${this.isCorrect
			.toString()
			.toUpperCase()}`;
	},
};

console.log(factObj.text);
console.log(factObj['text']);

const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());
