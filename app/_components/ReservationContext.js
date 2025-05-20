"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
ReservationContext.displayName = "ReservationContext";
const initialState = { from: null, to: null };
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const reset = () => setRange(initialState);
  return (
    <ReservationContext.Provider value={{ range, setRange, reset }}>
      {children}
    </ReservationContext.Provider>
  );
}
export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("useReservation was used outside the provider");
  return context;
}
export default ReservationProvider;
