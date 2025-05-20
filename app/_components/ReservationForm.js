import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";
import ReservationFormContent from "./ReservationFormContent";

async function ReservationForm({ maxCapacity }) {
  const session = await auth();
  const user = session?.user;
  if (!user) return <LoginMessage />;

  return (
    <div className="grid justify-center">
      <div className="bg-primary-800 text-primary-300 flex items-center justify-between px-16 py-2">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name.split(" ")[0]}</p>
        </div>
      </div>
      <ReservationFormContent
        guestId={session?.user.guest.id}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}

export default ReservationForm;
