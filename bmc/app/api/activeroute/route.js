import { connectToDatabase } from "@/utils/db";
import opencage from "opencage-api-client";
import { User } from "../../../models/User.model";

const OPEN_CAGE_API_KEY = process.env.OPEN_CAGE_API_KEY;

async function getCoordinates(location) {
  const geoData = await opencage.geocode({
    q: location,
    key: OPEN_CAGE_API_KEY,
  });

  if (geoData && geoData.results.length > 0) {
    const { lat, lng } = geoData.results[0].geometry;
    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("No coordinates found for the location");
  }
}

// To Update The User's Active Route
export async function POST(req) {
  try {
    const { clerkId, startLocation, endLocation } = await req.json();

    if (!clerkId || !startLocation || !endLocation) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Get coordinates for both start and end locations
    const startCoordinates = await getCoordinates(startLocation);
    const endCoordinates = await getCoordinates(endLocation);

    // Update the user's active route with the coordinates
    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      {
        activeRoute: {
          start: startCoordinates,
          end: endCoordinates,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // Return the updated user with the new active route
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user route:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
