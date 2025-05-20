import Link from "next/link";
import { auth } from "../_lib/auth";
import { getBookings } from "../_lib/data-service";
import BookingList from "./BookingList";

async function Bookings() {
  const session = await auth();
  const bookings = await getBookings(session.user.guest.id);

  return bookings.length === 0 ? (
    <p className="text-lg">
      You have no reservations yet. Check out our{" "}
      <Link className="text-accent-500 underline" href="/cabins">
        luxury cabins &rarr;
      </Link>
    </p>
  ) : (
    <ul className="space-y-6">
      <BookingList bookings={bookings} />
    </ul>
  );
}

export default Bookings;
