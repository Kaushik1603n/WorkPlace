import { useState, useRef } from "react";
import { Link as LinkIcon, X } from "lucide-react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";

const ASPECT_RATIO = 5.5;
const MIN_DIMENSION = 300;

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
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      type === "profile" ? setProfilePhoto(imageUrl) : setImgSrc(imageUrl);
      if (type === "cover") setModalOpen(true);
    }
  };

  const handleSubmit = () => {
    const { fullName, companyName, email, location, website, description } = profileData;

    if (!fullName.trim()) return toast.error("Full Name is required.");
    if (!companyName.trim()) return toast.error("Company Name is required.");
    if (!email.trim()) return toast.error("Email is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Enter a valid email address.");
    if (!location.trim()) return toast.error("Location is required.");
    if (!website.trim()) return toast.error("Website is required.");
    const urlRegex = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
    if (!urlRegex.test(website)) return toast.error("Enter a valid website URL.");
    if (!description.trim()) return toast.error("Description is required.");

    console.log("Submitted:", {
      ...profileData,
      profilePhoto,
      coverPhoto,
    });
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, ASPECT_RATIO, width, height),
      width,
      height
    );
    setCrop(crop);
  };

  const getCroppedImg = async () => {
    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    const croppedImg = await getCroppedImg();
    setCoverPhoto(croppedImg);
    setModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto border border-[#27AE60]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Edit Client Profile
      </h2>

      {/* Profile Photo */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No photo
              </div>
            )}
          </div>
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

      {/* Cover Photo */}
      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">Cover Photo</label>
        <div className="w-full aspect-[5.5/1] bg-gray-100 rounded-md overflow-hidden mb-2">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No cover photo
            </div>
          )}
        </div>
        <label className="text-sm text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
          <LinkIcon size={16} />
          Choose Cover Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "cover")}
          />
        </label>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {["fullName", "companyName", "email", "location", "website"].map((field) => (
          <div key={field}>
            <label className="block font-medium text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={field === "email" ? "email" : field === "website" ? "url" : "text"}
              name={field}
              value={profileData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="w-full border border-[#27AE60] rounded-md px-3 py-2 focus:ring-green-500 focus:outline-none focus:border-green-500"
            />
          </div>
        ))}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
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

      {/* Cover Crop Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-[90%] max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setModalOpen(false)}
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-black">Crop Cover Photo</h3>
            {imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                aspect={ASPECT_RATIO}
                keepSelection
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Source"
                  onLoad={onImageLoad}
                  className="max-h-[400px]"
                />
              </ReactCrop>
            )}
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleCropSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
