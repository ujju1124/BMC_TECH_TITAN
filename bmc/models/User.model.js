import { models, model, Schema } from "mongoose";

const userSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["driver", "passenger"],
    required: true,
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  activeRoute: {
    start: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    end: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

export const User = models.User || model("User", userSchema);
