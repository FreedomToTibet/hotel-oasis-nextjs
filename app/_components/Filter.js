"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const currentFilter = searchParams.get("capacity") || "all";

	function handleFilterChange(filter) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="border border-primary-800 flex divide-x divide-primary-800">
			<button 
				className={`px-5 py-2 transition-colors ${
					currentFilter === "all"
						? "bg-primary-700 text-primary-100"
						: "hover:bg-primary-800 text-primary-300"
				}`}
				onClick={() => handleFilterChange("all")}
			>
				All cabins
			</button>
			<button 
				className={`px-5 py-2 transition-colors ${
					currentFilter === "small"
						? "bg-primary-700 text-primary-100"
						: "hover:bg-primary-800 text-primary-300"
				}`}
				onClick={() => handleFilterChange("small")}
			>
				1&mdash;3 guests
			</button>
			<button 
				className={`px-5 py-2 transition-colors ${
					currentFilter === "medium"
						? "bg-primary-700 text-primary-100"
						: "hover:bg-primary-800 text-primary-300"
				}`}
				onClick={() => handleFilterChange("medium")}
			>
				4&mdash;7 guests
			</button>
			<button 
				className={`px-5 py-2 transition-colors ${
					currentFilter === "large"
						? "bg-primary-700 text-primary-100"
						: "hover:bg-primary-800 text-primary-300"
				}`}
				onClick={() => handleFilterChange("large")}
			>
				7&mdash;12 guests
			</button>
		</div>
	);
}