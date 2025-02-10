import { NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/db";
import { Complaint } from "../../../../models/Complaint.models";

export async function PUT(req) {
  try {
    await connectToDatabase();
    const { complainId } = await req.json();
    const complainData = await Complaint.findOne({ _id: complainId });
    const status = complainData.isVerified;
    complainData.isVerified = !status;
    await complainData.save();
    if (!complainData) {
      return NextResponse.json(
        {
          message: "Failed to change the status of the complain",
          success: false,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Status changed successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update the status of the compalin",
      success: false,
    });
  }
}
