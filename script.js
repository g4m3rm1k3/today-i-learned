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

// const fact = ['Libson is the capital of portugal', 2015, true];

// console.log(fact);
// console.log(fact[0]);
// console.log(fact[1]);
// console.log(fact.length);
// const newFact = [...fact, 'society'];
// console.log(newFact);

// const factObj = {
// 	text: 'Libson is the capital of portugal',
// 	isCorrect: true,
// 	category: 'society',
// 	createSummary: function () {
// 		return `The fact ${this.text} is ${this.isCorrect
// 			.toString()
// 			.toUpperCase()}`;
// 	},
// };

// console.log(factObj.text);
// console.log(factObj['text']);

// const { category, isCorrect } = factObj;
// console.log(category);
// console.log(factObj.createSummary());

// [2, 4, 6, 8].forEach((x) => console.log(x));
// const timesTen = [2, 4, 6, 8].map((x) => x * 10);
// console.log(timesTen);

const CATEGORIES = [
	{ name: 'technology', color: '#3b82f6' },
	{ name: 'science', color: '#16a34a' },
	{ name: 'finance', color: '#ef4444' },
	{ name: 'society', color: '#eab308' },
	{ name: 'entertainment', color: '#db2777' },
	{ name: 'health', color: '#14b8a6' },
	{ name: 'history', color: '#f97316' },
	{ name: 'news', color: '#8b5cf6' },
];

const allCategories = CATEGORIES.map((x) => x.name);
console.log(allCategories);
CATEGORIES.forEach((cat) => {
	const listItem = document.createElement('li');
	const lastButton = document.querySelector('.category');
	console.log(lastButton);
	listItem.innerHTML = `<button class="btn btn-category" style="background-color: ${cat.color}; margin-bottom: 16px">${cat.name}</button>`;
	lastButton.appendChild(listItem);
});
