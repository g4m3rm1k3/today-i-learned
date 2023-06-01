import { useEffect, useState } from 'react';
import supabase from './supabase';
import './style.css';

const initialFacts = [
	{
		id: 1,
		text: 'React is being developed by Meta (formerly facebook)',
		source: 'https://opensource.fb.com/',
		category: 'technology',
		votesInteresting: 24,
		votesMindBlowing: 9,
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
		votesMindBlowing: 2,
		votesFalse: 0,
		createdIn: 2019,
	},
	{
		id: 3,
		text: 'Lisbon is the capital of Portugal',
		source: 'https://en.wikipedia.org/wiki/Lisbon',
		category: 'society',
		votesInteresting: 8,
		votesMindBlowing: 3,
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

function Loader() {
	return <p className='message'>Loading...</p>;
}

function App() {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [isLoading, setIsLoading] = useState(true);
	useEffect(
		function () {
			async function getFacts() {
				let query = supabase.from('facts').select('*');
				if (categoryFilter !== 'all')
					query = query.eq('category', categoryFilter);

				let { data: facts, error } = await query.order('votesInteresting', {
					ascending: false,
				});
				if (!error) {
					setIsLoading(false);
					setFacts(facts);
				} else alert('There was a problem getting data');
			}
			getFacts();
		},
		[categoryFilter]
	);
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
					setShowForm={setShowForm}
				/>
			)}
			<main className='main'>
				<CategoryFilter setCategoryFilter={setCategoryFilter} />
				{!isLoading ? (
					<FactList
						facts={facts}
						setFacts={setFacts}
						categoryFilter={categoryFilter}
					/>
				) : (
					<Loader />
				)}
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

function NewFactForm({ facts, setFacts, setShowForm }) {
	const [text, setText] = useState('');
	const [source, setSource] = useState('http://localhost:3000/');
	const [category, setCategory] = useState('');
	const [isUploading, setIsUploading] = useState(false);
	function isValidHttpUrl(string) {
		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}

		return url.protocol === 'http:' || url.protocol === 'https:';
	}
	async function handleSubmit(e) {
		e.preventDefault();
		if (text && category && source && isValidHttpUrl(source)) {
			setIsUploading(true);
			const { data: newFact, error } = await supabase
				.from('facts')
				.insert([{ text, source, category }])
				.select();
			console.log(newFact);
			if (!error) {
				setFacts((facts) => [...facts, ...newFact]);
				setText('');
				setSource('');
				setCategory('');
				setIsUploading(false);
				setShowForm(false);
			} else alert(error);
		}
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
				disabled={isUploading}
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
				disabled={isUploading}
				value={source}
				onChange={(e) => setSource(e.target.value)}
			/>
			<select
				value={category}
				disabled={isUploading}
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
			<button
				className='btn btn-large'
				disabled={isUploading}
			>
				Post
			</button>
		</form>
	);
}

function CategoryFilter({ setCategoryFilter }) {
	return (
		<aside>
			<ul>
				<li className='category'>
					<button
						className='btn btn-all-categories'
						onClick={() => setCategoryFilter('all')}
					>
						All
					</button>
				</li>
				{CATEGORIES.map((category) => (
					<li
						className='category'
						key={category.name}
					>
						<button
							className='btn btn-category'
							onClick={() => setCategoryFilter(category.name)}
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

function FactList({ facts, categoryFilter, setFacts }) {
	if (facts.length === 0) {
		return (
			<p className='message'>
				No facts for this category yet! Create the first one!
			</p>
		);
	}

	return (
		<section>
			<p>There are {facts.length} facts in the database</p>
			<ul className='facts-list'>
				{facts
					.filter((fact) =>
						categoryFilter
							? fact.category === categoryFilter || categoryFilter === 'all'
							: true
					)
					.map((fact) => (
						<Fact
							setFacts={setFacts}
							fact={fact}
							key={fact.id}
						/>
					))}
			</ul>
		</section>
	);
}

function Fact({ fact, setFacts }) {
	const [isUpdating, setIsUpdating] = useState(false);
	async function handleVote(vote) {
		setIsUpdating(true);
		const { data: updatedFact, error } = await supabase
			.from('facts')
			.update({ [vote]: fact[vote] + 1 })
			.eq('id', fact.id)
			.select();
		if (!error) setIsUpdating(false);
		setFacts((facts) =>
			facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
		);
	}
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
				<button
					onClick={() => handleVote('votesInteresting')}
					disabled={isUpdating}
				>
					👍 {fact.votesInteresting}
				</button>
				<button
					onClick={() => handleVote('votesMindBlowing')}
					disabled={isUpdating}
				>
					🤯 {fact.votesMindBlowing}
				</button>
				<button
					onClick={() => handleVote('votesFalse')}
					disabled={isUpdating}
				>
					⛔️ {fact.votesFalse}
				</button>
			</div>
		</li>
	);
}

export default App;
