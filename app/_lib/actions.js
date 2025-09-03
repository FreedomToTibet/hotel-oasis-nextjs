"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "@/app/_lib/auth";
import { updateGuest } from "@/app/_lib/data-service";

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
