import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 60;

export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const { cap } = await searchParams;
  const filter = cap;
  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="mb-8 flex justify-end">
        {/* filter component */}
        <Filter />
      </div>
      <Suspense
        key={filter}
        fallback={
          <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-primary-200 text-xl">Loading cabin data</p>
          </div>
        }
      >
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
