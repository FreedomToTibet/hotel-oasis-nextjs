"use client";

import Image from "next/image";
import { updateGuestProfile } from "@/app/_lib/actions";
import { useFormStatus } from "react-dom";

const metadata = {
	title: "Update your profile",
	description:
		"Provide the following information to make your check-in process faster and smoother.",
};

export default function UpdateProfileForm({ guest, children }) {
	const { fullName, email, citizenship, citizenshipID, countryFlag } = guest;

	return (
		<form
			action={updateGuestProfile}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
		>
        <div className="space-y-2">
          <label htmlFor="fullName">Full name (as shown on ID)</label>
          <input
            defaultValue={fullName}
            name="fullName"
            id="fullName"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Enter your legal full name"
          />
          <p className="text-xs text-primary-300">Please enter your name exactly as it appears on your ID document</p>
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            defaultValue={email}
            name="email"
            disabled
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="citizenship">Where are you from?</label>
            {countryFlag ? (
              <Image
                src={countryFlag}
                alt="Country flag"
                className="h-5 rounded-sm"
                width={40}
                height={20}
              />
            ) : null}
          </div>
					{children}
        </div>

        <div className="space-y-2">
          <label htmlFor="citizenshipID">National ID number</label>
          <input
						defaultValue={citizenshipID}
            name="citizenshipID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button />
        </div>
      </form>
	)

	function Button() {
		const { pending } = useFormStatus();

		return (
			<button 
				className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
				disabled={ pending }
			>
					{pending ? "Updating..." : "Update profile"}
      </button>
		)
	}
}