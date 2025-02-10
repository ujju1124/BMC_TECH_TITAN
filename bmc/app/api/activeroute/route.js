import { connectToDatabase } from "@/utils/db";
import opencage from "opencage-api-client";
import { User } from "../../../models/User.model";
import { NextResponse } from "next/server";

const OPEN_CAGE_API_KEY = process.env.OPEN_CAGE_API_KEY;

// Get the coordinates for a location using the OpenCage API
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
    const { clerkId, startLocation, endLocation, role, phoneNumber } =
      await req.json();

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
        role: role,
      },
      { new: true }
    );

    if (!updatedUser) {
      const newUser = await User.create({
        clerkId: clerkId,
        role,
        phoneNumber,
        location: {
          latitude: null,
          longitude: null,
        },
        activeRoute: {
          start: {
            latitude: null,
            longitude: null,
          },
          ene: {
            latitude: null,
            longitude: null,
          },
        },
      });
      return NextResponse.json({
        message: "User registered successfully",
        newUser,
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
