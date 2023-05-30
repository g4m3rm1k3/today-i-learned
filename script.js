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
let filter = '';
const allCategories = CATEGORIES.map((x) => x.name);
function defFilter(x) {
	filter = x;
	loadFacts();
}
CATEGORIES.forEach((cat) => {
	const listItem = document.createElement('li');
	const lastButton = document.querySelector('.category:last-child');
	listItem.innerHTML = `<button class="btn btn-category" onClick="defFilter('${cat.name}')" style="background-color: ${cat.color}; margin-bottom: 16px">${cat.name}</button>`;
	lastButton.appendChild(listItem);
});

const factsList = document.querySelector('.facts-list');

// Load data from supabase
async function loadFacts() {
	factsList.innerHTML = '';
	const res = await fetch(
		'https://kxasevsmwxwkvohajnhl.supabase.co/rest/v1/facts',
		{
			headers: {
				apikey:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXNldnNtd3h3a3ZvaGFqbmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUzNjEyNDgsImV4cCI6MjAwMDkzNzI0OH0.gk9CFyG_z5LEL8fb4MOImg4aTCYTo6nVIqSS34OdiNs',
				authorizaiton:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXNldnNtd3h3a3ZvaGFqbmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUzNjEyNDgsImV4cCI6MjAwMDkzNzI0OH0.gk9CFyG_z5LEL8fb4MOImg4aTCYTo6nVIqSS34OdiNs',
			},
		}
	);
	const data = await res.json();
	createFactsList(data);
}

function createFactsList(dataArray) {
	factsList.innerHTML = '';
	// create DOM elements
	const htmlArr = dataArray
		.filter((x) => {
			console.log(filter);
			if (filter !== '') {
				return x.category.toLowerCase() === filter.toLowerCase();
			} else {
				return true;
			}
		})
		.map((fact) => {
			const backgroundColor = CATEGORIES.find(
				(cat) => cat.name == fact.category
			)?.color;
			return `
	<li class="fact">
		<p>${fact.text}
			<a
			class="source"
			rel="noopener"
			href=${fact.source}
			target="_blank">(Source)
			</a>
		</p>
		<span
			class="tag"
			style="background-color: ${backgroundColor}"
			>${fact.category}
		</span>
		<div class="vote-buttons">
			<button>👍${fact.votesInteresting}</button>
			<button>🤯 ${fact.votesMindblowing}</button>
			<button>⛔️ ${fact.votesFalse}</button>
		</div>
	</li>
						`;
		});
	console.log(htmlArr);
	const html = htmlArr.join('');
	factsList.insertAdjacentHTML('afterbegin', html);
}
// createFactsList(initialFacts, CATEGORIES);
// createFactsList([{ text: 'MIke' }], CATEGORIES);
loadFacts();
