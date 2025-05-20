import Bookings from "@/app/_components/Bookings";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Your reservations
      </h2>
      <Suspense fallback={<Spinner />}>
        <Bookings />
      </Suspense>
    </>
  );
}
