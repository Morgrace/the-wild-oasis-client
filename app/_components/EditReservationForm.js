import { updateReservation } from "../_lib/action";
import FormButton from "./FormButton";

function EditReservationForm({ maxCapacity, reservationId }) {
  return (
    <form
      action={updateReservation}
      className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
    >
      <input type="hidden" name="id" value={reservationId} />
      <input type="hidden" name="maxCapacity" value={maxCapacity} />
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
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <FormButton pendingMessage="Updating...">Update reservation</FormButton>
      </div>
    </form>
  );
}

export default EditReservationForm;
