import { connectToDatabase } from "@/utils/db";
import { User } from "../../../models/User.model";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { clerkId, role, location, activeRoute, phoneNumber } = await req.json();

    const loca = {
      latitude: location?.latitude ?? null, // Use null if location or latitude is undefined
      longitude: location?.longitude ?? null, // Use null if location or longitude is undefined
    };

    // Handle missing or null activeRoute
    const active = {
      start: {
        latitude: activeRoute?.start?.latitude ?? null, // Use null if start or latitude is missing
        longitude: activeRoute?.start?.longitude ?? null, // Use null if start or longitude is missing
      },
      end: {
        latitude: activeRoute?.end?.latitude ?? null, // Use null if end or latitude is missing
        longitude: activeRoute?.end?.longitude ?? null, // Use null if end or longitude is missing
      },
    };

    if (!clerkId || !role || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const newUser = new User({
      clerkId,
      role,
      location: loca,
      activeRoute: active,
      phoneNumber,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User added successfully", user: newUser }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// To get the driver Data
// Haversine formula to calculate distance between two lat/lng points in km
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(req) {
  try {
    // Get the URL from the request
    const url = new URL(req.url);

    // Use URLSearchParams to get the query parameters
    const params = new URLSearchParams(url.search);

    // Extract latitude and longitude
    const latitude = params.get("latitude");
    const longitude = params.get("longitude");
    
    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: "Missing latitude or longitude" }),
        { status: 400 }
      );
    }

    // Convert to numbers
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
      return new Response(
        JSON.stringify({ error: "Invalid latitude or longitude" }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch active users (drivers)
    const activeDrivers = await User.find({
      "activeRoute.start.latitude": { $ne: null },
      "activeRoute.start.longitude": { $ne: null },
    });

    const nearbyDrivers = activeDrivers.filter((driver) => {
      const driverLat = driver.activeRoute.start.latitude;
      const driverLon = driver.activeRoute.start.longitude;
      const distance = haversineDistance(
        userLat,
        userLon,
        driverLat,
        driverLon
      );
      return distance <= 5;
    });

    if (nearbyDrivers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active drivers nearby" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Nearby drivers found", nearbyDrivers }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking active drivers:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
