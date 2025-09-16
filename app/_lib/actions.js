"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "@/app/_lib/auth";
import { updateGuest, deleteBooking, updateBooking, getBookings } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {

  const session = await auth();
	if (!session) {
		throw new Error("Unauthorized");
	}

  const fullName = formData.get("fullName");
  const citizenshipID = formData.get("citizenshipID");
	const [citizenship, countryFlag] = formData.get("citizenship").split('%');

  // Validate full name
  if (!fullName || fullName.trim().length < 3) {
    throw new Error("Please provide your full legal name (at least 3 characters)");
  }

	if(!/^[a-zA-Z0-9]{6,12}$/.test(citizenshipID)) {
		throw new Error("Invalid citizenship ID, please provide a valid ID.");
	}

  // Update the guest profile with the new data
  await updateGuest(session.user.guestId, { fullName, citizenshipID, citizenship, countryFlag });

  // Revalidate the path to ensure the updated data is fetched
  revalidatePath(`/account/profile`);
}

export async function DeleteBookingReservation(bookingId) {
	const session = await auth();
	if (!session) {
		throw new Error("Unauthorized");
	}

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsIds = guestBookings.map(booking => booking.id);

	if (!guestBookingsIds.includes(bookingId)) {
		throw new Error("You are not authorized to delete this reservation.");
	}

	// Call the data service to delete the reservation
	await deleteBooking(bookingId);

  // Revalidate the path to ensure the updated data is fetched
  revalidatePath(`/account/reservations`);
}

export async function updateBookingReservation(formData) {
	const session = await auth();
	if (!session) {
		throw new Error("Unauthorized");
	}

	const bookingId = Number(formData.get("bookingId"));
	const numberGuests = parseInt(formData.get("numberGuests"), 10);
	const observations = formData.get("observations")?.trim().slice(0, 500) || "";

	if (isNaN(numberGuests) || numberGuests < 1) {
		throw new Error("Please provide a valid number of guests.");
	}

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingsIds = guestBookings.map(booking => booking.id);

	// Check if the booking belongs to the user, with proper type handling
	const hasAccess = guestBookingsIds.some(id => 
		(typeof id === 'number' && id === bookingId) || 
		(typeof id === 'string' && id === bookingId)
	);

	if (!hasAccess) {
		console.error("Authorization failed. User's bookings:", guestBookingsIds, "Requested booking:", bookingId);
		throw new Error("You are not authorized to update this reservation.");
	}

	await updateBooking(bookingId, { numberGuests, observations });

	// Revalidate the path to ensure the updated data is fetched
	revalidatePath(`/account/reservation`);
	redirect(`/account/reservation`);
}