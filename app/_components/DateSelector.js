"use client";
import { differenceInCalendarDays, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
const isPastButNotToday = (date) => {
  const today = new Date();
  return (
    date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) // disables past
  );
};

function DateSelector({ regularPrice, discount, settings = {}, bookedDates }) {
  const { minBookingLength, maxBookingLength } = settings;

  const { setRange, range, reset } = useReservation();

  const numNights =
    differenceInCalendarDays(new Date(range?.to), new Date(range?.from)) || 1;

  const cabinPrice = (regularPrice - discount) * numNights;
  return (
    <div className="flex h-full flex-col justify-between">
      <DayPicker
        selected={range}
        onSelect={setRange}
        className="place-self-center pt-12"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={[isPastButNotToday, ...bookedDates]}
      />

      <div className="bg-accent-500 text-primary-800 flex h-[72px] w-[40rem] items-center justify-between gap-8 self-center px-8 2xl:w-full 2xl:self-auto">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="text-primary-700 font-semibold line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border-primary-800 border px-4 py-2 text-sm font-semibold"
            onClick={reset}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
