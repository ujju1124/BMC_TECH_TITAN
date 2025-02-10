import { BusData } from "@/models/Bus.models";
import { connectToDatabase } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (ADMIN_EMAIL !== email) {
      return NextResponse.json(
        {
          message: "Unauthorized user",
          success: false,
          isAdmin: false,
        },
        {
          status: 401,
        }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Authorized user",
      isAdmin: true,
    });
  } catch (error) {
    throw Error(`Error while checking the user : ${error}`);
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Bus ID is required" },
        { status: 400 }
      );
    }

    const deletedBus = await BusData.findByIdAndDelete(id);

    if (!deletedBus) {
      return NextResponse.json({ message: "Bus not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Bus data deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    // Parse the JSON body from the request
    const { busId } = await req.json();

    if (!busId) {
      return NextResponse.json(
        { message: "Bus ID is required" },
        { status: 400 }
      );
    }

    // Find the bus by its ID
    const bus = await BusData.findOne({ _id: busId });

    if (!bus) {
      return NextResponse.json({ message: "Bus not found" }, { status: 404 });
    }

    // Toggle the availability status of the bus
    bus.isAvailable = !bus.isAvailable;
    await bus.save();

    return NextResponse.json({
      message: "Bus availability status changed successfully",
      bus, // Return the updated bus object
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
