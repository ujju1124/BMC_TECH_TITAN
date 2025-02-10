import { models, model, Schema } from "mongoose";

const complaintModel = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    complaintType: {
      type: String,
      required: true,
    },
    complaintDescription: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Complaint = models.Complaint | model("Complaint", complaintModel);
