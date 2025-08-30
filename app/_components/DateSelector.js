"use client"

import { isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "@/app/_components/ReservationContext";

function isAlreadyBooked(range, datesArr) {
	return (
		range.from &&
		range.to &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from, end: range.to })
		)
	);
}

function DateSelector({ settings, cabin }) {
	// CHANGE
	const { range, setRange, resetRange } = useReservation();

	const regularPrice = cabin.regularPrice;
	const discount = cabin.discount;
	const numNights = 23;
	const cabinPrice = regularPrice * numNights - discount;

	// SETTINGS
	const { minBookingLength, maxBookingLength } = settings;

	return (
		<div className="flex flex-col justify-between min-h-[440px]">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				onSelect={setRange}
				selected={range}
				min={minBookingLength + 1}
				max={maxBookingLength}
				defaultMonth={new Date()}
				disabled={{
					before: new Date(),
					after: new Date(new Date().getFullYear() + 5, 11, 31),
				}}
				captionLayout="dropdown"
				numberOfMonths={1}
			/>

			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[52px]">
				<div className="flex items-baseline gap-6">
					<p className="flex gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${(regularPrice - discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
								<span className="line-through font-semibold text-primary-700">
									${regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
								</span>
							</>
						) : (
							<span className="text-2xl">${regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>{" "}
								<span className="text-2xl font-semibold">${cabinPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
							</p>
						</>
					) : null}
				</div>

				{range.from || range.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={ resetRange }
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
}

export default DateSelector;
