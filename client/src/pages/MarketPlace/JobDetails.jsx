import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const { user } = useSelector((store) => store.auth);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios(`${baseURL}/jobs/job-details/${jobId}`).then((data) => {
      setJob(data.data?.jobDetails);
    });
  }, [baseURL]);

  return (
    <>
      <NavigationBar />
      <div className="max-w-4xl mx-auto my-8 p-6 bg-[#EFFFF6] rounded-lg shadow-sm border border-[#27AE60]">
        <h1 className="text-2xl font-bold text-center mb-8">{job?.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Discription</h2>
              <p className="text-gray-700">{job?.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Tech Preferences</h2>
              <p className="text-gray-700">{job?.stack}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Time</h2>
              <p className="text-gray-700"> {job?.time} only</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Reference</h2>
              <a
                href={job?.reference ? job?.reference : "#"}
                className="text-gray-700 break-words text-sm pointer"
              >
                {job?.reference}
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">
                Required Features / Pages
              </h2>
              <ul className="text-gray-700 space-y-1">
                {job?.requiredFeatures}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Budget</h2>
              <p className="text-gray-700">
                Budget Type: <b>{job?.budgetType}</b> <br />
                Budget : <b>{job?.budget}</b>
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Experience Level</h2>
              <p className="text-gray-700">{job?.experienceLevel}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Posted by</h2>
              <div className=" py-2  rounded ">
                {job?.clientId?.fullName} <br />
                {job?.clientId?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          {user?.role === "client" && (
            <Link className="bg-[#2ECC71] hover:bg-[#27AE60] text-white py-2 px-6 rounded-lg transition-colors">
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
export default JobDetails;
