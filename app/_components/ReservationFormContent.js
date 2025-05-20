"use client";
import { differenceInCalendarDays } from "date-fns";
import { createReservation } from "../_lib/action";
import { useReservation } from "./ReservationContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import FormButton from "./FormButton";

function ReservationFormContent({ maxCapacity, guestId }) {
  const { range, reset: resetRange } = useReservation();
  const router = useRouter();

  const startDate = range?.from;
  const endDate = range?.to;
  const { cabinId } = useParams();
  const searchParam = useSearchParams();

  const numNights =
    differenceInCalendarDays(new Date(endDate), new Date(startDate)) || 1;
  const cabinPrice =
    Number(searchParam.get("regularPrice")) -
    Number(searchParam.get("discount"));
  const totalPrice = cabinPrice * numNights;

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    totalPrice,
    cabinId,
    guestId,
  };
  const createReservationWithData = createReservation.bind(
    null,
    reservationData,
  );
  return (
    <form
      action={async (formData) => {
        await createReservationWithData(formData);
        resetRange();
        router.push(`/cabins/${cabinId}/thankYou`);
      }}
      className="bg-primary-900 flex flex-col gap-5 px-16 py-10 text-lg"
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          id="observations"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          placeholder="Any pets, allergies, special requirements, etc.?"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <p className="text-primary-300 text-base">Start by selecting dates</p>
        {endDate && startDate ? (
          <FormButton pendingMessage="Reserving...">Reserve now</FormButton>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default ReservationFormContent;
