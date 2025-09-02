import { auth } from "@/app/_lib/auth";

export const metadata = {
	title: "Guest area",
	description: "Welcome to our luxury cabins!",
};

export default async function Page () {
	const session = await auth();
	console.log("Session:", session);
	const firstName = session?.user?.name?.split(" ").at(0);
	return (
		<h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, dear guest {firstName}!
    </h2>
	);
};