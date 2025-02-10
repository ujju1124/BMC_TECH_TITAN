import { BusData } from "@/models/Bus.models";
import opencage from "opencage-api-client";
import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { busNumber, routeName, stops, companyName } = await req.json();

    if (!busNumber || !routeName || !stops || stops.length === 0 || !companyName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const API_KEY = process.env.OPEN_CAGE_API_KEY;

    // Convert stop names into lat/lng
    const stopData = await Promise.all(
      stops.map(async (stop) => {
        const geoData = await opencage.geocode({
          q: stop.stopName,
          key: API_KEY,
        });
        if (geoData && geoData.results.length > 0) {
          const { lat, lng } = geoData.results[0].geometry;
          return { ...stop, latitude: lat, longitude: lng };
        }
        return { ...stop, latitude: null, longitude: null };
      })
    );

    await connectToDatabase();

    // Save bus data
    const newBusData = await BusData.create({
      busNumber,
      routeName,
      stops: stopData,
      companyName,
    });

    return new Response(JSON.stringify(newBusData), { status: 201 });
  } catch (error) {
    console.error("Error adding bus data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const busData = await BusData.find({});
    return NextResponse.json(
      { message: "Bus data loaded successfully", busData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
