import Navigation from "./_components/Navigation";

import Logo from "@/app/_components/Logo";
import "@/app/_styles/globals.css";

export const metadata = {
	title: {
		template: "%s / The Hotel Oasis",
		default: "Welcome / The Hotel Oasis",
	},
	description: "The Hotel Oasis is the perfect place to relax and unwind.",
};

export default function RootLayout ({ children}) {
	return (
		<html lang="eng">
			<body className="bg-primary-950 text-primary-100 min-h-screen">
				<header>
					<Logo />
					<Navigation />
				</header>
				
				<main>{children}</main>
				<footer>Copyright</footer>
			</body>
		</html>
	)
}