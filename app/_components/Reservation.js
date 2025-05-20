import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(cabin.id),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="space-y-8">
      <h2 className="text-center text-5xl font-semibold">
        Reserve {cabin.name} today. Pay on arrival.
      </h2>
      <div className="border-primary-800 grid min-h-[400px] grid-cols-[repeat(auto-fit,_minmax(40.625rem,_1fr))] gap-y-10 border">
        <DateSelector
          regularPrice={cabin.regularPrice}
          discount={cabin.discount}
          settings={settings}
          bookedDates={bookedDates}
        />
        <ReservationForm maxCapacity={cabin.maxCapacity} />
      </div>
    </div>
  );
}

export default Reservation;
