import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import TextExpander from "@/app/_components/TextExpander";

export async function generateMetadata({ params }) {
	const { nameCabin, description } = await getCabin(params.cabinId);

	return {
		title: `Cabin ${nameCabin}`,
		description: description,
	};
}

export async function generateStaticParams() {
	const cabins = await getCabins();

	return cabins.map((cabin) => ({
		cabinId: String(cabin.id),
	}));
}

export default async function Page({ params }) {
	const cabin = await getCabin(params.cabinId);

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<div className="grid grid-cols-[3fr_4fr] items-start gap-20 border border-primary-800 py-3 px-10 mb-24">
				<div className="relative aspect-[3/3] scale-[1.15] -translate-x-3 overflow-hidden">
					<Image
						src={cabin.image}
						alt={`Cabin ${cabin.nameCabin}`}
						quality={100}
						fill
						style={{ objectFit: "cover" }}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				<div>
					<h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
						Cabin {cabin.nameCabin}
					</h3>

					<div className="text-lg text-primary-300 mb-10 min-h-[96px]">
						<TextExpander>{cabin.description}</TextExpander>
					</div>

					<ul className="flex flex-col gap-4 mb-7">
						<li className="flex gap-3 items-center">
							<UsersIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex gap-3 items-center">
							<MapPinIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span> (Italy)
							</span>
						</li>
						<li className="flex gap-3 items-center">
							<EyeSlashIcon className="h-5 w-5 text-primary-600" />
							<span className="text-lg">
								Privacy <span className="font-bold">100%</span> guaranteed
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<h2 className="text-5xl font-semibold text-center">
					Reserve today. Pay on arrival.
				</h2>
			</div>
		</div>
	);
}