// import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// export async function GET(request, { params }) {
//   const { cabinId } = await params;
//   console.log(params);
//   try {
//     const [cabin, bookingDetails] = await Promise.all([
//       getCabin(cabinId),
//       getBookedDatesByCabinId(cabinId),
//     ]);
//     return Response.json({ cabin, bookingDetails });
//   } catch (error) {
//     return Response.json({ Error: error.message });
//   }
// }
