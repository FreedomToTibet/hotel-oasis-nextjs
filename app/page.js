import Link from "next/link";

export default function Home() {
  return (
	<div>
	  <h1>Hello</h1>
	  <p>
		<Link href="/cabins">Explore cabins</Link>
	  </p>
	</div>
  );
}
