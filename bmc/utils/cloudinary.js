import cloudinary from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to upload image to Cloudinary
export const uploadImageToCloudinary = async (image) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(image.path);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};
