"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings, validateNationalID } from "./data-service";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

export async function signInAction(formData) {
  const providerId = formData.get("provider");
  const redirectPath = formData.get("redirectPath") || "/account";
  await signIn(providerId, { redirectTo: redirectPath });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!validateNationalID(nationality, nationalID))
    throw new Error("Please Input a Valid National Id");
  const updateData = { nationalID, countryFlag, nationality };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guest.id);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const guestBookings = await getBookings(session.user.guest.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("you are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}
export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const numGuests = +formData.get("numGuests");
  const observations = formData.get("observations");
  const id = formData.get("id");
  const maxCapacity = +formData.get("maxCapacity");

  if (numGuests > maxCapacity)
    throw new Error("Number of guests exceeds the maximum cabin capacity");

  const updatedFields = { observations, numGuests };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(data, formData) {
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  const reservationData = {
    numGuests: formData.get("numGuests"),
    extrasPrice: 0,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
    observations: formData.get("observations")?.slice(0, 500) || "",

    ...data,
  };
  const { error } = await supabase.from("bookings").insert([reservationData]);
  if (error) {
    throw new Error("Booking could not be created");
  }
  const query = new URLSearchParams({
    regularPrice: data.regularPrice,
    discount: data.discount,
  }).toString();
  revalidatePath(`/cabins/${data.cabinId}?${query}`);
}
