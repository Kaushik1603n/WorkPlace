import { useEffect, useState } from "react";
import cover from "../../../assets/cover.png";
import avatar from "../../../assets/p1.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFreelancerProfile } from "../../../features/freelancerProfile/freelancerProfileSlice";

function FreelancerProfile() {
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

  const [projectStats] = useState({
    completed: 10,
    pending: 2,
  });

  const [recentProjects] = useState([
    {
      id: 1,
      title:
        "Complete redesign of an Food delivery platform using React and Tailwind CSS",
      date: "Apr 2025",
      days: 14,
      status: "Completed",
    },
    {
      id: 2,
      title:
        "Complete redesign of an Food delivery platform using React and Tailwind CSS",
      date: "Apr 2025",
      days: 14,
      status: "In Progress",
    },
    {
      id: 3,
      title:
        "Complete redesign of an Food delivery platform using React and Tailwind CSS",
      date: "Apr 2025",
      days: 14,
      status: "In Progress",
    },
    {
      id: 4,
      title:
        "Complete redesign of an Food delivery platform using React and Tailwind CSS",
      date: "Apr 2025",
      days: 14,
      status: "Completed",
    },
  ]);

  return (
    <div className="container mx-auto px-4 pb-8 ">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-color">
        <div className="relative">
          <div className="w-full aspect-[5.5/1] overflow-hidden bg-amber-50">
            <img
              src={freelancer?.CoverPic ? freelancer.CoverPic : cover}
              alt="Profile Banner"
              className="w-full object-cover"
            />
          </div>

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

              <div className="mt-6">
                <Link
                  to="edit"
                  className="block w-full mt-3 border border-[#2ECC71] text-[#2ECC71] hover:bg-[#EFFFF6] hover:text-[#27ae60] py-2 px-4 rounded-md font-medium text-center transition duration-200"
                >
                  Edit Profile
                </Link>
              </div>
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

            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-2 gap-4 mb-6 ">
                <div className=" p-4 rounded-md text-center shadow-sm bg-color-light border border-color">
                  <h3 className="text-green-800 font-medium">
                    Completed Projects
                  </h3>
                  <p className="text-2xl font-bold mt-1">
                    {projectStats.completed}
                  </p>
                </div>
                <div className=" p-4 rounded-md text-center shadow-sm bg-color-light border border-color">
                  <h3 className="text-green-800 font-medium">
                    Pending Projects
                  </h3>
                  <p className="text-2xl font-bold mt-1">
                    {projectStats.pending}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Recent Projects</h3>

                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 shadow-sm  ">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className=" border-gray-200 rounded-md p-4 hover:shadow-sm border border-color bg-color-light transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {project.title}
                          </h4>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <span>{project.date}</span>
                            <span className="mx-2">•</span>
                            <span>{project.days} days</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              project.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;
