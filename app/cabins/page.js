import Link from 'next/link';

export default async function Page () {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();

	return (
		<div>
			<h1>Cabins</h1>
			<p>Find your perfect cabin</p>
			<ul>
				{data.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};