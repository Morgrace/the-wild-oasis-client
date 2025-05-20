import EditReservationForm from "@/app/_components/EditReservationForm";

export default async function Page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const reservationId = param.bookingId;
  const { maxCapacity } = searchParam;

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{reservationId}
      </h2>
      <EditReservationForm
        reservationId={reservationId}
        maxCapacity={maxCapacity}
      />
    </div>
  );
}
