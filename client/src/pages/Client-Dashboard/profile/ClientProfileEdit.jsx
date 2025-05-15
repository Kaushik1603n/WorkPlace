import "react-image-crop/dist/ReactCrop.css";
import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import CoverModal from "./CoverModal";
import ReactCrop from "react-image-crop";
import { toast } from "react-toastify";
import axios from 'axios';


export default function ClientProfileEdit() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    location: "",
    website: "",
    description: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      type === "profile" ? setProfilePhoto(imageUrl) : setCoverPhoto(imageUrl);
    }
  };

  const blobToBase64 = async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, companyName, email, location, website, description } =
      profileData;

    // Basic validation
    if (!fullName.trim()) {
      toast.error("Full Name is required.");
      return;
    }
    if (!companyName.trim()) {
      toast.error("Company Name is required.");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }
    if (!website.trim()) {
      toast.error("Website is required.");
      return;
    }
    const urlRegex = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (!urlRegex.test(website)) {
      toast.error("Enter a valid website URL.");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    const profilePhotoBase64 = await blobToBase64(profilePhoto);
    setProfilePhoto(profilePhotoBase64);

    const formData = {
      companyName: profileData.companyName,
      description: profileData.description,
      email: profileData.email,
      fullName: profileData.fullName,
      location: profileData.location,
      website: profileData.website,
      CoverPic: coverPhoto,
      profilePic: profilePhoto,
    };

   try {
  const response = await axios.post("http://localhost:5000/api/client/edit-profile", formData, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Upload success:", response.data);
} catch (error) {
  console.error("Upload failed:", error);
}
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto border border-[#27AE60]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Edit Client Profile
      </h2>

      {/* Profile Photo */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No photo
              </div>
            )}
          </div>
          <div>
            <label className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <LinkIcon size={16} />
              Choose Profile Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">
          Cover Photo
        </label>
        <div className="w-full aspect-[5.5/1] bg-gray-100 rounded-md overflow-hidden mb-2">
          {coverPhoto ? (
            <img
              src={coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No cover photo
            </div>
          )}
        </div>
        <button
          className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
          onClick={() => setModalOpen(true)}
        >
          <LinkIcon size={16} />
          Edit Cover Photo
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={profileData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={profileData.companyName}
            onChange={handleChange}
            placeholder="Enter your company name"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            name="website"
            value={profileData.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            value={profileData.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 rounded-md transition"
        >
          Update Profile
        </button>
      </div>
      {modalOpen && (
        <CoverModal
          updateCover={setCoverPhoto}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
