import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import FreelancerProfile from "../models/FreelancerProfile.js";

export const freelancerProfileEdit = async (req, res) => {
  try {
    const {
      fullName,
      email,
      availability,
      experienceLevel,
      education,
      hourlyRate,
      skills,
      location,
      reference,
      bio,
      CoverPic,
      profilePic,
    } = req.body;

    const { userId } = req.user;

    if (!CoverPic || !profilePic) {
      return res.status(400).json({
        error: "Missing CoverPic or profilePic",
      });
    }

    const findFreelancer = await User.findById(userId);
    if (findFreelancer.email !== email) {
      const emailUsed = await User.findOne({ email });
      if (!emailUsed) {
        await User.findByIdAndUpdate(userId, { email });
      } else {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    if (findFreelancer.fullName !== fullName) {
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

    const freelancerProfileData = await FreelancerProfile.findOneAndUpdate(
      { userId: userId },
      {
        profilePic: profileResult.secure_url,
        CoverPic: coverResult.secure_url,
        bio,
        hourlyRate,
        availability,
        experienceLevel,
        education,
        location,
        reference,
        skills: skills,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      freelancer: freelancerProfileData,
    });
  } catch (error) {
    console.error("Error in freelancer ProfileEdit:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getFreelancerDetails = async (req, res) => {
  const { userId } = req.user;
  try {
    const freelancer = await FreelancerProfile.findOne({ userId });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      freelancer: freelancer,
    });
  } catch (error) {
    console.error("Error in get freelancer profile:", error);
    res.status(500).json({ error: "can not get freelancer details" });
  }
};
