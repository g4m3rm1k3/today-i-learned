console.log('Hello World!');

const btn = document.querySelector('.btn-open');
btn.addEventListener('click', () => {
	const form = document.querySelector('.fact-form');
	if (form.classList.contains('hidden')) {
		btn.textContent = 'close';
	} else {
		btn.textContent = 'share a fact';
	}
	form.classList.toggle('hidden');
});

function calcFactAge(year) {
	const date = new Date().getFullYear();
	console.log('The age of the fact is ', date - year);
	return date - year;
}

const age1 = calcFactAge(2015);
console.log(age1);
