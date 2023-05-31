import { useState } from 'react';
import './style.css';

const initialFacts = [
	{
		id: 1,
		text: 'React is being developed by Meta (formerly facebook)',
		source: 'https://opensource.fb.com/',
		category: 'technology',
		votesInteresting: 24,
		votesMindblowing: 9,
		votesFalse: 4,
		createdIn: 2021,
	},
	{
		id: 2,
		text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
		source:
			'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
		category: 'society',
		votesInteresting: 11,
		votesMindblowing: 2,
		votesFalse: 0,
		createdIn: 2019,
	},
	{
		id: 3,
		text: 'Lisbon is the capital of Portugal',
		source: 'https://en.wikipedia.org/wiki/Lisbon',
		category: 'society',
		votesInteresting: 8,
		votesMindblowing: 3,
		votesFalse: 1,
		createdIn: 2015,
	},
];

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<span style={{ fontSize: '40px' }}>{count}</span>
			<button
				className='btn btn-large'
				onClick={() => {
					setCount(count + 1);
				}}
			>
				+1
			</button>
		</div>
	);
}
function App() {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState(initialFacts);
	return (
		<>
			{/* HEADER */}
			<Header
				setShowForm={setShowForm}
				showForm={showForm}
			/>

			{showForm && (
				<NewFactForm
					facts={facts}
					setFacts={setFacts}
				/>
			)}
			<main className='main'>
				<CategoryFilter />
				<FactList facts={facts} />
				{false && <Counter />}
			</main>
		</>
	);
}

function Header({ setShowForm, showForm }) {
	const appTitle = 'Today I learned!';

	return (
		<header className='header'>
			<div className='logo'>
				<img
					src='logo.png'
					alt='the site logo'
				/>
				<h1>{appTitle}</h1>
			</div>

			<button
				className='btn btn-large btn-open'
				onClick={() => {
					setShowForm((show) => !show);
				}}
			>
				{showForm ? 'Close' : 'Share a fact'}
			</button>
		</header>
	);
}

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

function NewFactForm({ facts, setFacts }) {
	const [text, setText] = useState('');
	const [source, setSource] = useState('');
	const [category, setCategory] = useState('');
	function handleSubmit(e) {
		e.preventDefault();
		setFacts((facts) => [
			...facts,
			{ id: initialFacts.length + 1, text, source, category },
		]);
		console.log(initialFacts);
		setText('');
		setSource('');
		setCategory('');
	}
	return (
		<form
			className='fact-form'
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				placeholder='SHare a fact with the world...'
				value={text}
				onChange={(e) =>
					setText((text) =>
						e.target.value.length <= 200 ? e.target.value : text
					)
				}
			/>
			<span>{200 - text.length}</span>
			<input
				type='text'
				placeholder='Trustworthy source'
				value={source}
				onChange={(e) => setSource(e.target.value)}
			/>
			<select
				value={category}
				onChange={(e) => {
					setCategory(e.target.value);
				}}
			>
				<option>Select a category:</option>

				{CATEGORIES.map((cat) => (
					<option
						value={cat.name}
						key={cat.name}
					>
						{cat.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className='btn btn-large'>Post</button>
		</form>
	);
}

function CategoryFilter() {
	return (
		<aside>
			<ul>
				<li className='category'>
					<button className='btn btn-all-categories'>All</button>
				</li>
				{CATEGORIES.map((category) => (
					<li
						className='category'
						key={category.name}
					>
						<button
							className='btn btn-category'
							style={{ backgroundColor: category.color }}
						>
							{category.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function FactList({ facts }) {
	//TEMPORARY

	return (
		<section>
			<ul className='facts-list'>
				{facts.map((fact) => (
					<Fact
						fact={fact}
						key={fact.id}
					/>
				))}
			</ul>
			<p>There are {facts.length} facts in the database</p>
		</section>
	);
}

function Fact({ fact }) {
	return (
		<li className='fact'>
			<p>
				{fact.text}
				<a
					className='source'
					href={fact.source}
					target='_blank'
					rel='noreferrer'
				>
					(Source)
				</a>
			</p>
			<span
				className='tag'
				style={{
					backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
						?.color,
				}}
			>
				{fact.category}
			</span>
			<div className='vote-buttons'>
				<button>👍 {fact.votesInteresting}</button>
				<button>🤯 {fact.votesMindblowing}</button>
				<button>⛔️ {fact.votesFalse}</button>
			</div>
		</li>
	);
}

export default App;
