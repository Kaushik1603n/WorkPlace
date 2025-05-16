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

    const { userId } = req.user;

    if (!CoverPic || !profilePic) {
      return res.status(400).json({
        error: "Missing CoverPic or profilePic",
      });
    }

    const findClient = await User.findById(userId);
    if (findClient.email !== email) {
      const emailUsed = await User.findOne({ email });
      if (!emailUsed) {
        await User.findByIdAndUpdate(userId, { email });
      } else {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    if (findClient.fullName !== fullName) {
      await User.findByIdAndUpdate(userId, { fullName });
    }

    let coverPromise, profilePromise;

    // Prepare promises (but don't await yet)
    if (CoverPic && !CoverPic.includes("res.cloudinary.com")) {
      coverPromise = cloudinary.uploader.upload(CoverPic, {
        folder: "cover_uploads",
      });
    } else {
      coverPromise = Promise.resolve({ secure_url: CoverPic });
    }

    if (profilePic && !profilePic.includes("res.cloudinary.com")) {
      profilePromise = cloudinary.uploader.upload(profilePic, {
        folder: "profile_uploads",
      });
    } else {
      profilePromise = Promise.resolve({ secure_url: profilePic });
    }

    // Await both
    const [coverResult, profileResult] = await Promise.all([
      coverPromise,
      profilePromise,
    ]);

    // const [coverResult, profileResult] = await Promise.all([
    //   cloudinary.uploader.upload(CoverPic, { folder: "cover_uploads" }),
    //   cloudinary.uploader.upload(profilePic, { folder: "profile_uploads" }),
    // ]);

    const clientProfileData = await ClientProfile.findOneAndUpdate(
      { userId: userId },
      {
        profilePic: profileResult.secure_url,
        CoverPic: coverResult.secure_url,
        companyName,
        location,
        website,
        description,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      client: {
        userId: clientProfileData.userId,
        fullName,
        email,
        profilePic: profileResult.secure_url,
        CoverPic: coverResult.secure_url,
        companyName,
        location,
        website,
        description,
      },
    });
  } catch (error) {
    console.error("Error in clientProfileEdit:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getClientDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const client = await ClientProfile.findOne({ userId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      client: client,
    });
  } catch (error) {
    console.error("Error in get client profile:", error);
    res.status(500).json({ error: "can not get client details" });
  }
};
