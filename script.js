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
