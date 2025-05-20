import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  DollarSign,
  FileText,
  User,
  Briefcase,
  Clock,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function ProposalContractModal({ isOpen, contractId, onClose }) {
const baseURL = useMemo(() => import.meta.env.VITE_API_BASE_URL, []);
  const [contract, setContract] = useState({});

  useEffect(() => {
    if (!contractId) return;
    const fetchContract = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/proposal/get-contract-details/${contractId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);

        setContract(response.data.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load proposal details"
        );
      }
    };

    fetchContract();
  }, [baseURL, contractId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">{contract?.title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              {contract?.status}
            </span>
            <span className="text-gray-500 text-sm">
              Created on{" "}
              {contract?.createdAt
                ? new Date(contract.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          {/* Main Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {contract?.createdAt
                      ? new Date(contract.startDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">${contract?.totalAmount}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <User className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Freelancer ID</p>
                  <p className="font-medium">{contract?.freelancerId}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Job ID</p>
                  <p className="font-medium"> {contract?.jobId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              Contract Terms
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className=" text-gray-700 whitespace-pre-line">
                {contract?.terms}
              </p>
            </div>
          </div>

          {/* IDs Section */}
          <div className="mt-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="font-medium">Contract ID:</span>{" "}
                {contract?._id}
              </div>
              <div>
                <span className="font-medium">Proposal ID:</span>{" "}
                {contract?.freelancerId}{" "}
              </div>
              <div>
                <span className="font-medium">Client ID:</span>{" "}
                {contract?.clientId}{" "}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>{" "}
                {contract?.createdAt
                  ? new Date(contract.updatedAt).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
          >
            Close
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Download Contract
          </button>
        </div>
      </div>
    </div>
  );
}
export default React.memo(ProposalContractModal);
