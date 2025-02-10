import { NextResponse } from "next/server";
import { Complaint } from "../../../models/Complaint.models";
import { connectToDatabase } from "@/utils/db";

// To get all the complaints
export async function GET() {
  try {
    await connectToDatabase();
    const complaints = await Complaint.find();
    return NextResponse.json({
      message: "Get all complaints",
      complaints,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}

// To create a new complaint
export async function POST(req) {
  try {
    const {
      companyName,
      email,
      phoneNum,
      imageUrl,
      complaintType,
      complaintDescription,
      clerkId,
      busNumber,
    } = await req.json();
    await connectToDatabase();
    const data = [
      companyName,
      email,
      phoneNum,
      imageUrl,
      complaintType,
      complaintDescription,
      clerkId,
      busNumber,
    ];
    if (data.some((field) => !field)) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const newComplaint = new Complaint({
      companyName,
      email,
      phoneNum,
      imageUrl,
      complaintType,
      complaintDescription,
      clerkId,
      busNumber,
    });

    await newComplaint.save();
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

// To delete a complaint
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { complaintId } = await req.json();
    if (!complaintId) {
      return NextResponse.json(
        {
          message: "Post id is compulsory to delete the post",
        },
        { status: 400 }
      );
    }
    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return NextResponse.json(
        { message: "Complaint not found", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
