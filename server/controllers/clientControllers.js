import bcrypt from "bcrypt";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import ClientProfile from "../models/ClientProfile.js";

export const clientProfileEdit = async (req, res) => {
  try {
    const {
      companyName,
      description,
      email,
      fullName,
      location,
      website,
      CoverPic,
      profilePic,
    } = req.body;

    if (!CoverPic || !profilePic) {
      return res
        .status(400)
        .json({ error: "Missing coverPhoto or profilePhoto" });
    }

    // Upload both images to Cloudinary
    const [coverResult, profileResult] = await Promise.all([
      cloudinary.uploader.upload(CoverPic, { folder: "cover_uploads" }),
      cloudinary.uploader.upload(profilePic, { folder: "profile_uploads" }),
    ]);

    console.log("Cover Photo URL:", coverResult.secure_url);
    console.log("Profile Photo URL:", profileResult.secure_url);

    const user = await ClientProfile.create({
      userId: "682321f0ebe2e8dac2d7a54b",
      profilePic,
      CoverPic,
      companyName,
      location,
      website,
      description,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      coverPhotoUrl: coverResult.secure_url,
      profilePhotoUrl: profileResult.secure_url,
    });
  } catch (error) {
    console.error("Error in clientProfileEdit:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
