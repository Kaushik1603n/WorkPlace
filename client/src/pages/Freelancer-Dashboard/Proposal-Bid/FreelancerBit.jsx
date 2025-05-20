import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Calendar,
  DollarSign,
  FileText,
  User,
  Briefcase,
  Clock,
  CheckCircle,
} from "lucide-react";
import ProposalContractModal from "./ContractModal";


function FreelancerBit() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [proposals, setProposals] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/proposal/get-freelacer-proposal/`,
          {
            withCredentials: true,
          }
        );
        setProposals(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load proposal details"
        );
      }
    };

    fetchProposals();
  }, [baseURL]);



  return (
    <main className="flex-1">

      <div className="space-y-6">
        {Array.isArray(proposals) &&
          proposals.map((proposal) => (
            <div
              key={proposal?._id}
              className="border border-gray-200 rounded-lg p-6 bg-white relative shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">
                {proposal?.jobId?.title}
              </h2>

              <p className="text-gray-600 mb-3">
                Bid: ${proposal?.bidAmount} • Budget: ${proposal?.jobId?.budget}{" "}
                • Type: {proposal?.budgetType}
              </p>

              <p className="text-gray-500 mb-2">
                Estimated Time: {proposal?.estimatedTime} week(s)
              </p>

              {proposal?.status === "accepted" && (
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-md text-sm">
                    Accepted
                  </span>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 flex items-center"
                    onClick={() => {
                      setSelectedProposal(proposal);
                      setOpenModal(true);
                    }}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    View Contract
                  </button>
                </div>
              )}
              {selectedProposal && (
                <ProposalContractModal
                  isOpen={openModal}
                  contractId={selectedProposal.contractId}
                  onClose={() => setOpenModal(false)}
                />
              )}

              {proposal?.status === "submitted" && (
                <div className="absolute bottom-4 right-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm">
                  Submitted
                </div>
              )}
              {proposal?.status === "rejected" && (
                <div className="absolute bottom-4 right-4 bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm">
                  Rejected
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}

export default FreelancerBit;
