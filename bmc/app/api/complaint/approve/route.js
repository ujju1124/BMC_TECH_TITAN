import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import { Complaint } from "../../../../models/Complaint.models";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { complainId } = await req.json();
    console.log("Compttdyjyt")
    const complainData = await Complaint.findById(complainId);

    if (!complainData) {
      return NextResponse.json(
        {
          message: "Complaint not found",
          success: false,
        },
        { status: 404 }
      );
    } // Toggle the verification status
    complainData.isVerified = !complainData.isVerified;
    await complainData.save();

    return NextResponse.json(
      {
        message: "Status changed successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update the status of the compalin",
      success: false,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { complainId } = await req.json();
    const deletedComplain = await Complaint.findOneAndDelete({
      _id: complainId,
    });
    if (!deletedComplain) {
      return NextResponse.json({ message: "Complain id doesn't founded" });
    }
    return NextResponse.json({
      message: "Complain deleted successfully",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete the complain",
      success: false,
    });
  }
}
