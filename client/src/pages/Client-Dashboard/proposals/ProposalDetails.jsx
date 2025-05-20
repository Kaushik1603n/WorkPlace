import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProposalDetails() {
  const { proposalId } = useParams();
  const [ProposalDetail, setProposalDetail] = useState({});
  const [bidStatus, setBidStatus] = useState("New");

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchProposalDetails = async () => {
    axios(`${baseURL}/jobs/get-proposal-details/${proposalId}`, {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data.data);

        setProposalDetail(res.data?.data);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to load proposal details"
        );
      });
  };
  useEffect(() => {
    fetchProposalDetails();
  }, []);

  const handleHire = async () => {
    axios
      .put(
        `${baseURL}/proposal/hire-request/${ProposalDetail?.proposal_id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        fetchProposalDetails();
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to load proposal details"
        );
      });
  };

  return (
    <div className=" p-2 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden border border-[#27AE60]">
        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center ">
          <div className="flex items-center gap-4">
            <img
              src={ProposalDetail?.profile}
              alt="Freelancer Profile Photo"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#27AE60]"
            />
            <div>
              <h1 className="text-xl font-semibold">
                {ProposalDetail?.freelancerName}
              </h1>
              <div className="text-yellow-500 font-semibold">★★★★☆ 4.7</div>
              <div className="inline-flex items-center bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full mt-1">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-1"></span>
                Online Now
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="bg-[#EFFFF6] rounded-full p-1 flex">
              {["New", "Shortlisted", "Rejected"].map((status) => (
                <button
                  key={status}
                  className={`px-3 py-2 text-sm rounded-full ${
                    bidStatus === status
                      ? "bg-white shadow text-gray-800 font-semibold"
                      : "bg-transparent text-gray-500"
                  }`}
                  onClick={() => setBidStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#EFFFF6] p-5 border border-[#27AE60] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:border-r border-[#27AE60] md:pr-4">
            <h3 className="text-sm text-gray-500 uppercase font-semibold">
              Bid Amount
            </h3>
            <p className="text-xl font-semibold text-blue-600">
              ${ProposalDetail?.bidAmount}
              <span className="text-xs text-yellow-600 font-normal">
                ({ProposalDetail?.bidType})
              </span>
            </p>
          </div>

          <div className="md:border-r border-[#27AE60] md:px-4">
            <h3 className="text-sm text-gray-500 uppercase font-semibold">
              Timeline
            </h3>
            <p className="text-lg font-semibold">
              {ProposalDetail?.timeline} Week
            </p>
            {/* <p className="text-sm text-gray-500">Start date: May 15, 2025</p> */}
          </div>

          <div className="md:pl-4">
            <h3 className="text-sm text-gray-500 uppercase font-semibold">
              Proposal Date
            </h3>
            <p className="text-lg font-semibold">
              {ProposalDetail?.submittedAt}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex-grow md:w-2/3  p-5 md:border-r border-[#27AE60]">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Cover Letter
              </h2>
              <div className="bg-white p-4 rounded-lg shadow">
                {ProposalDetail?.coverLetter}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Milestones Breakdown
              </h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#EFFFF6]">
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">
                        Deliverable
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">
                        Due Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-500">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(ProposalDetail?.milestones) &&
                      ProposalDetail?.milestones.map((milestone) => (
                        <tr
                          key={milestone._id}
                          className="border-b border-[#27AE60]"
                        >
                          <td className="py-3 px-4">{milestone.title}</td>
                          <td className="py-3 px-4">
                            {new Date(milestone.dueDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {milestone.description}
                          </td>
                          <td className="py-3 px-4">${milestone.amount}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 p-5 bg-[#EFFFF6]">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(ProposalDetail?.skills) &&
                  ProposalDetail?.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#ffffff] border font-medium border-[#27AE60] text-[#27AE60] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Success Metrics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-3 text-center">
                  <h4 className="text-lg font-semibold">92%</h4>
                  <p className="text-gray-500 text-sm">Job Success Rate</p>
                </div>
                <div className="bg-white rounded-lg shadow p-3 text-center">
                  <h4 className="text-lg font-semibold">35</h4>
                  <p className="text-gray-500 text-sm">Projects Completed</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="col-span-2 bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition">
                  💬 Message Freelancer
                </button>
                {ProposalDetail?.status === "accepted" ? (
                  <button
                    // onClick={handleHire}
                    className="border border-green-600 text-green-600 rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-green-100 transition"
                  >
                     Waiting for approval
                  </button>
                ) : (
                  <button
                    onClick={handleHire}
                    className="bg-green-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-green-700 transition"
                  >
                    Hire Now
                  </button>
                )}

                <button className="bg-red-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-red-700 transition">
                  Reject
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Trust & Verification
              </h2>
              <div className="flex flex-col gap-2">
                {[
                  { icon: "✓", text: "ID Verified" },
                  { icon: "✓", text: "Payment Protected" },
                  { icon: "✓", text: "Dispute Protection", link: true },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow p-3 flex items-center gap-2"
                  >
                    <span className="text-green-600">{badge.icon}</span>
                    <p>
                      {badge.link ? (
                        <a href="#" className="text-blue-600 no-underline">
                          {badge.text}
                        </a>
                      ) : (
                        badge.text
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
