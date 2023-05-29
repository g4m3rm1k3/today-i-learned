console.log('Hello World!');

const btn = document.querySelector('.btn-open');
btn.addEventListener('click', () => {
	console.log('CLICK');
	const form = document.querySelector('.fact-form');
	form.classList.toggle('hidden');
});
