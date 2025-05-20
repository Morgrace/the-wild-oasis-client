"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/action";
function BookingList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) =>
      currentBookings.filter((booking) => currentBookings.id !== bookingId),
  );
  async function handleDelete(bookingId) {
    await deleteReservation(bookingId);
    optimisticDelete(bookingId);
  }
  return optimisticBookings.map((booking) => (
    <ReservationCard
      onDelete={handleDelete}
      booking={booking}
      key={booking.id}
    />
  ));
}

export default BookingList;
