import Image from "next/image";
import { updateProfile } from "../_lib/action";
import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";
import FormButton from "./FormButton";
import SelectCountry from "./SelectCountry";

async function ProfileForm() {
  const session = await auth();
  const { email, name } = session?.user;
  const guest = await getGuest(email);
  const { countryFlag, nationalID, nationality } = guest || {};

  return (
    <form
      action={updateProfile}
      className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          defaultValue={name}
          disabled
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image width="20" height="20" src={countryFlag} alt="flag" />
          )}
        </div>

        <SelectCountry
          name="nationality"
          id="nationality"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          defaultCountry={nationality}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          defaultValue={nationalID}
          pattern="[A-Za-z0-9\-]{5,20}"
          title="5-20 letters, numbers, or hyphens"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <FormButton pendingMessage="Updating...">Update Profile</FormButton>
      </div>
    </form>
  );
}

export default ProfileForm;
