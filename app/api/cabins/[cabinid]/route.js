import { getCabinById, getBookedDatesByCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabinById(cabinId),
      getBookedDatesByCabin(cabinId),
    ]);
    if (!cabin) {
      return new Response("Cabin not found", { status: 404 });
    }
    return new Response(JSON.stringify({ cabin, bookedDates }), { status: 200 });
  } catch (error) {
    console.error("Error fetching cabin:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}