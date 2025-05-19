import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProposalDetails() {
  const { proposalId } = useParams();
  const [ProposalDetail, setProposalDetail] = useState({});

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios(`${baseURL}/jobs/get-proposal-details/${proposalId}`, {
      withCredentials: true,
    })
      .then((res) => {
        setProposalDetail(res.data?.data);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to load proposal details"
        );
      });
  }, [baseURL]);

  const [bidStatus, setBidStatus] = useState("New");

  return (
    <div className=" p-2 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow overflow-hidden border border-[#27AE60]">
        {/* Header Section */}
        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center ">
          <div className="flex items-center gap-4">
            <img
              src={ProposalDetail?.profile }
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

        {/* Bid Details */}
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

        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="flex-grow md:w-2/3  p-5 md:border-r border-[#27AE60]">
            {/* Cover Letter */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Cover Letter
              </h2>
              <div className="bg-white p-4 rounded-lg shadow">
                {ProposalDetail?.coverLetter}
              </div>
            </div>

            {/* Milestones */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Milestones Breakdown
              </h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
               <table className="w-full border-collapse">
  <thead>
    <tr className="bg-[#EFFFF6]">
      <th className="text-left py-3 px-4 font-semibold text-gray-500">Deliverable</th>
      <th className="text-left py-3 px-4 font-semibold text-gray-500">Due Date</th>
      <th className="text-left py-3 px-4 font-semibold text-gray-500">Description</th>
      <th className="text-left py-3 px-4 font-semibold text-gray-500">Amount</th>
    </tr>
  </thead>
  <tbody>
    {Array.isArray(ProposalDetail?.milestones) &&
 ProposalDetail?.milestones.map((milestone) => (
      <tr key={milestone._id} className="border-b border-[#27AE60]">
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

            {/* Attachments */}
            {/* <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Attachments
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Portfolio_SarahJ.pdf", "UI_Samples.pdf", "Project_Timeline.xlsx"].map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2 cursor-pointer hover:bg-[#EFFFF6] transition"
                  >
                    <span>{index === 0 ? "📄" : index === 1 ? "🎨" : "📊"}</span>
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Comparison */}
            {/* <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Compare With Other Bids
              </h2>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-2">
                  <div className="relative inline-block w-12 h-6 mr-2">
                    <input type="checkbox" className="opacity-0 w-0 h-0" />
                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition"></span>
                  </div>
                  <span>Side-by-Side View</span>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 flex items-center gap-2 mt-4">
                  <span>🤖</span>
                  <span className="text-sm">This bid is 15% below average for similar jobs.</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Content */}
          <div className="w-full md:w-1/3 p-5 bg-[#EFFFF6]">
            {/* Skills */}
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

            {/* Portfolio Preview */}
            {/* <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Portfolio Preview
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item}
                    className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
                  >
                    <img 
                      src={`/api/placeholder/400/400`} 
                      alt={`Portfolio Item ${item}`}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm">
                <a href="#" className="text-blue-600 no-underline">
                  🔗 GitHub Portfolio
                </a>
                <a href="#" className="text-blue-600 no-underline ml-4">
                  🔗 Behance
                </a>
              </div>
            </div> */}

            {/* Success Metrics */}
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

            {/* Actions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-[#27AE60]">
                Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="col-span-2 bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-blue-700 transition">
                  💬 Message Freelancer
                </button>
                <button className="bg-green-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-green-700 transition">
                  ✅ Hire Now
                </button>
                <button className="bg-red-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 font-semibold hover:bg-red-700 transition">
                  ❌ Reject
                </button>
              </div>
            </div>

            {/* Trust & Verification */}
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

            {/* Client Notes */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProposalDetails;
