import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import SelectCountry from "@/app/_components/SelectCountry";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import { se } from "date-fns/locale";

export const metadata = {
	title: "Update your profile",
	description:
		"Provide the following information to make your check-in process faster and smoother.",
};

export default async function Page() {
	const session = await auth();
	const guest = await getGuest(session.user.email);
	
  // Ensure all necessary properties exist to avoid errors
  const guestWithDefaults = {
    fullName: guest?.fullName || session?.user?.name || '',
    email: guest?.email || session?.user?.email || '',
    citizenship: guest?.citizenship || '',
    citizenshipID: guest?.citizenshipID || '',
    countryFlag: guest?.countryFlag || null
  };
  
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
			<UpdateProfileForm guest={guestWithDefaults}>
				<SelectCountry
            name="citizenship"
            id="citizenship"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={guestWithDefaults.citizenship}
          />
			</UpdateProfileForm>
    </div>
  );
}
