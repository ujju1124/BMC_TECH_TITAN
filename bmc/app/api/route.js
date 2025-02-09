import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    message:
      "Backend for the traffic management system and bus route tracking system",
    success: "True",
  });
}
