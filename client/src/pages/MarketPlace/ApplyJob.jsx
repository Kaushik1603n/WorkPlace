import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancerProfile } from "../../features/freelancerProfile/freelancerProfileSlice";
import cover from "../../assets/cover.png";
import avatar from "../../assets/p1.jpg";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";

function ApplyJob() {
  const dispatch = useDispatch();
  const { freelancer } = useSelector((state) => state.freelancer);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFreelancerProfile())
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.error(error?.message);
      });
  }, [dispatch]);

  const [bidType, setBidType] = useState("fixed");
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    dueDate: "",
    amount: "",
  });
  const [formValues, setFormValues] = useState({
    coverLetter: "",
    bidAmount: "",
    timeline: "",
    workSamples: "",
  });
  const [agreeVideoCall, setAgreeVideoCall] = useState(false);
  const [agreeNDA, setAgreeNDA] = useState(false);
  const [errors, setErrors] = useState({});
  const [milestoneErrors, setMilestoneErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });

    // // Clear error when field is edited
    // if (errors[name]) {
    //   setErrors({
    //     ...errors,
    //     [name]: "",
    //   });
    // }
  };

  const handleMilestoneChange = (e) => {
    const { name, value } = e.target;
    setNewMilestone({
      ...newMilestone,
      [name]: value,
    });

    // Clear milestone error when field is edited
    if (milestoneErrors[name]) {
      setMilestoneErrors({
        ...milestoneErrors,
        [name]: "",
      });
    }
  };

  const validateMilestone = () => {
    const errors = {};

    if (!newMilestone.title.trim()) {
      toast.error("Title is required");
    }

    if (!newMilestone.dueDate) {
      toast.error("Due date is required");
    }

    if (!newMilestone.amount.trim()) {
      toast.error("Amount is required");
    } else if (isNaN(parseFloat(newMilestone.amount))) {
      toast.error("Amount must be a valid number");
    }

    setMilestoneErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addMilestone = () => {
    if (!validateMilestone()) return;

    setMilestones([...milestones, { ...newMilestone, id: Date.now() }]);
    setNewMilestone({
      title: "",
      description: "",
      dueDate: "",
      amount: "",
    });
    setMilestoneErrors({});
  };

  const removeMilestone = (id) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id));
  };

  const validateForm = () => {
    let newErrors = true;

    if (!formValues.coverLetter.trim()) {
      toast.error("Cover letter is required");
      newErrors = false
    }

    if (!formValues.bidAmount.trim()) {
      toast.error("Bid amount is required");
      newErrors = false
    } else if (isNaN(parseFloat(formValues.bidAmount))) {
      toast.error("Bid amount must be a valid number");
      newErrors = false
    }

    if (!formValues.timeline.trim()) {
      toast.error("Timeline is required");
      newErrors = false
    }

    if (!formValues.workSamples.trim()) {
      toast.error("Work samples link is required");
      newErrors = false
    }

    if (!agreeVideoCall) {
      toast.error("You must agree to a video call interview if selected");
      newErrors = false
    }

    if (!agreeNDA) {
      toast.error("You must agree to the Non-Disclosure Agreement terms");
      newErrors = false
    }

    if (milestones.length === 0) {
      toast.error("At least one milestone is required");
      newErrors = false
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form submission logic would go here
      console.log("Form submitted successfully", {
        ...formValues,
        milestones,
        bidType,
        agreeVideoCall,
        agreeNDA
      });
    } else {
      console.log("Form validation failed");
    }
  };
  return (
    <>
      <NavigationBar />
      <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">Submit Your Proposal</h1>
          <p className="text-gray-600">
            Complete the form below to send your proposal to the client.
          </p>
        </div>
        {/* Banner and Profile Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-color">
          <div className="relative p-4">
            <div className="w-full aspect-[5.5/1] overflow-hidden ">
              <img
                src={freelancer?.CoverPic ? freelancer.CoverPic : cover}
                alt="Profile Banner"
                className="w-full object-cover rounded-lg"
              />
            </div>

            {/* Profile Image on Banner */}
            <div className="absolute left-4 bottom-0 transform translate-y-1/2">
              <div className="h-30 w-30 rounded-full bg-white p-1 shadow-md">
                <img
                  src={freelancer?.profilePic ? freelancer.profilePic : avatar}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-16 pb-4 px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Info Section */}
              <div className="w-full md:w-1/3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user?.fullName}
                </h2>
                <p className="text-gray-600 mt-1">{user?.role}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{freelancer?.location || "Loacation"}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Projects Stats and Recent Projects Section */}
              <div className="w-full md:w-2/3">
                <div className="mt-6 border border-color rounded-md p-4 w-full">
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2 max-h-35 overflow-y-auto p-1">
                    {freelancer?.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 border border-color rounded-md bg-emerald-50 text-emerald-800 inline-block"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-xl font-bold">Proposal Details</h2>
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                  Required
                </span>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Cover Letter</label>
                <textarea
                  className="w-full border border-color focus:outline-none  rounded-lg p-3 min-h-32"
                  placeholder="Tell the client why you are best for this job..."
                  name="coverLetter"
                  value={formValues.coverLetter}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Bid Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bidType"
                      className="h-4 w-4 text-green-500"
                      checked={bidType === "fixed"}
                      onChange={() => setBidType("fixed")}
                    />
                    <span className="ml-2">Fixed Price</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bidType"
                      className="h-4 w-4 text-green-500"
                      checked={bidType === "hourly"}
                      onChange={() => setBidType("hourly")}
                    />
                    <span className="ml-2">Hourly Rate</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Bid Amount</label>
                <input
                  type="text"
                  name="bidAmount"
                  value={formValues.bidAmount}
                  onChange={handleChange}
                  className="w-full border border-color focus:outline-none rounded-lg p-3"
                  placeholder="Enter your total project cost or hourly rate"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Timeline</label>
                <input
                  type="text"
                  name="timeline"
                  value={formValues.timeline}
                  onChange={handleChange}
                  className="w-full border border-color focus:outline-none rounded-lg p-3"
                  placeholder="eg: 1 week"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Milestones</label>
                <div className="border border-color rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newMilestone.title}
                        onChange={handleMilestoneChange}
                        className="w-full border border-color focus:outline-none  rounded-lg p-2"
                        placeholder="Milestone title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        value={newMilestone.dueDate}
                        onChange={handleMilestoneChange}
                        className="w-full border border-color focus:outline-none  rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newMilestone.description}
                        onChange={handleMilestoneChange}
                        className="w-full border border-color focus:outline-none  rounded-lg p-2"
                        placeholder="Brief description of this milestone"
                        rows="2"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        value={newMilestone.amount}
                        onChange={handleMilestoneChange}
                        className="w-full border border-color focus:outline-none  rounded-lg p-2"
                        placeholder="$"
                      />
                    </div>
                  </div>
                  <button
                    onClick={addMilestone}
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Add Milestone
                  </button>
                </div>

                {milestones.length > 0 && (
                  <div className="bg-color-light rounded-lg border border-color overflow-hidden">
                    <h4 className="font-medium p-3 bg-color-secondary border-b border-color">
                      Milestone Preview ({milestones.length})
                    </h4>
                    <div className="divide-y divide-gray-200">
                      {milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="p-4 flex justify-between items-start"
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-medium text-gray-800">
                                {milestone.title}
                              </span>
                              <span className="text-sm text-gray-500">
                                {milestone.dueDate}
                              </span>
                              <span className="font-medium text-green-600">
                                ${milestone.amount}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {milestone.description}
                            </p>
                          </div>
                          <button
                            onClick={() => removeMilestone(milestone.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Work Samples</label>
                <input
                  type="text"
                  name="workSamples"
                  value={formValues.workSamples}
                  onChange={handleChange}
                  className="w-full border border-color focus:outline-none rounded-lg p-3"
                  placeholder="eg: GitHub.com"
                />
              </div>

              <div className="mb-8">
                <h3 className="font-medium mb-3">Client Requirements</h3>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-500"
                    checked={agreeVideoCall}
                    onChange={() => setAgreeVideoCall(!agreeVideoCall)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to a video call interview if selected
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-500"
                    checked={agreeNDA}
                    onChange={() => setAgreeNDA(!agreeNDA)}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the Non-Disclosure Agreement terms
                  </span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-8 py-3 rounded-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyJob;
