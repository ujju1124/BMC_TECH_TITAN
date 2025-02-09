import { Schema, model, models } from "mongoose";

const busDataSchema = new Schema(
  {
    companyName: { type: String, required: true },
    busNumber: { type: String, required: true },
    routeName: { type: String, required: true },
    stops: [
      {
        stopName: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        arrivalTime: { type: String }, // Optional, can be a timestamp or formatted string
      },
    ],
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BusData = models.BusData || model("BusData", busDataSchema);
