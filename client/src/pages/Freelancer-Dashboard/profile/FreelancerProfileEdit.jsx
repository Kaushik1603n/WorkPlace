import "react-image-crop/dist/ReactCrop.css";
import { useCallback, useEffect, useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import FreelancerCoverModal from "./FreelancerCoverModal";
import {
  getFreelancerProfile,
  updateFreelancerProfile,
} from "../../../features/freelancerProfile/freelancerProfileSlice";
import Skill from "./Skill";

function FreelancerProfileEdit() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    availability: "",
    experienceLevel: "",
    education: "",
    hourlyRate: 0,
    skills: [],
    location: "",
    reference: "",
    bio: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [fetchFreelancer, setFetchFreelancer] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { loading, freelancer } = useSelector((state) => state.freelancer);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getFreelancerProfile())
      .unwrap()
      .then(() => {
        setFetchFreelancer(true)
      })
      .catch((error) => {
        console.error(error?.message);
      });
  }, [dispatch]);

  useEffect(() => {
    if (user || freelancer) {
      setProfileData({
        fullName: user?.fullName || "",
        email: user?.email || "",
        availability: freelancer?.availability || "",
        experienceLevel: freelancer?.experienceLevel || "",
        education: freelancer?.education || "",
        hourlyRate: freelancer?.hourlyRate || "",
        skills: Array.isArray(freelancer?.skills) ? freelancer.skills : [],
        location: freelancer?.location || "",
        reference: freelancer?.reference || "",
        bio: freelancer?.bio || "",
      });
      setCoverPhoto(freelancer?.CoverPic || null);
      setProfilePhoto(freelancer?.profilePic || null);
    }
  }, [user, freelancer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const {
      bio,
      email,
      fullName,
      hourlyRate,
      availability,
      experienceLevel,
      education,
      location,
      reference,
    } = profileData;

    if (!fullName.trim()) {
      toast.error("Full Name is required.");
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
    if (!availability.trim()) {
      toast.error("availability is required.");
      return;
    }
    if (!experienceLevel.trim()) {
      toast.error("experienceLevel is required.");
      return;
    }
    if (!education.trim()) {
      toast.error("education is required.");
      return;
    }
    if (Number(hourlyRate) <= 0) {
      toast.error("Hourly Rate is must > 0.");
      return;
    }
    if (!location.trim()) {
      toast.error("location is required.");
      return;
    }
    if (profileData.skills > 0) {
      toast.error("Minimum One skill is required.");
      return;
    }
    if (!reference.trim()) {
      toast.error("Website is required.");
      return;
    }
    const urlRegex = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (!urlRegex.test(reference)) {
      toast.error("Enter a valid website URL.");
      return;
    }
    if (!bio.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (!coverPhoto || !profilePhoto) {
      toast.error("Cover or Profile Photo Missing");
      return;
    }

    const isChanged =
      user?.fullName !== fullName ||
      user?.email !== email ||
      freelancer?.availability !== availability ||
      freelancer?.experienceLevel !== experienceLevel ||
      freelancer?.education !== education ||
      freelancer?.hourlyRate !== hourlyRate ||
      freelancer?.reference !== reference ||
      freelancer?.location !== location ||
      freelancer?.skills !== profileData.skills ||
      freelancer?.bio !== bio ||
      freelancer?.profilePic !== profilePhoto ||
      freelancer?.CoverPic !== coverPhoto;

    if (!isChanged) {
      toast.info("No changes detected");
      return;
    }

    let profilePhotoBase64 = undefined;
    if (freelancer?.profilePic !== profilePhoto) {
      profilePhotoBase64 = await blobToBase64(profilePhoto);
      setProfilePhoto(profilePhotoBase64);
    }

    const formData = {
      fullName: profileData.fullName,
      email: profileData.email,
      availability: profileData.availability,
      experienceLevel: profileData.experienceLevel,
      education: profileData.education,
      hourlyRate: profileData.hourlyRate,
      skills: profileData.skills,
      reference: profileData.reference,
      bio: profileData.bio,
      location: profileData.location,
      CoverPic: coverPhoto,
      profilePic: profilePhotoBase64 || profilePhoto,
    };

    dispatch(updateFreelancerProfile(formData))
      .unwrap()
      .then(() => {
        toast.success("Profile Update successfully");
      })
      .catch((error) => {
        console.log(error?.error);
        toast.error(error?.error);
      });
  };

  const handleSkillsChange = useCallback((updatedSkills) => {
    setProfileData((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto border border-[#27AE60]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Edit Freelancer Profile
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
                onChange={(e) => {
                  handleImageUpload(e, "profile");
                }}
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
          onClick={() => {
            setModalOpen(true);
          }}
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
            Availability
          </label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="full-time"
                name="availability"
                value="full-time"
                checked={profileData.availability === "full-time"}
                onChange={handleChange}
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
              />
              <label htmlFor="full-time" className="ml-2 text-gray-700">
                Full-time
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="part-time"
                name="availability"
                value="part-time"
                checked={profileData.availability === "part-time"}
                onChange={handleChange}
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
              />
              <label htmlFor="part-time" className="ml-2 text-gray-700">
                Part-time
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Experience Level
          </label>
          <input
            type="text"
            name="experienceLevel"
            value={profileData.experienceLevel}
            onChange={handleChange}
            placeholder="Enter your Experience Level"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Education
          </label>
          <input
            type="text"
            name="education"
            value={profileData.education}
            onChange={handleChange}
            placeholder="Enter your education"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Hourly Rate
          </label>
          <input
            type="number"
            name="hourlyRate"
            value={profileData.hourlyRate}
            onChange={handleChange}
            placeholder="Enter your hourly rate"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        {fetchFreelancer && (
          <Skill
            onSkillsChange={handleSkillsChange}
            dynamicSkill={freelancer?.skills}
          />
        )}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            location
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
            Reference
          </label>
          <input
            type="url"
            name="reference"
            value={profileData.reference}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={profileData.bio}
            onChange={handleChange}
            placeholder="Write a short description..."
            className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold py-3 rounded-md transition"
        >
          {loading ? "Updating Profile..." : "Update Profile"}
        </button>
      </div>
      {modalOpen && (
        <FreelancerCoverModal
          updateCover={setCoverPhoto}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default FreelancerProfileEdit;
