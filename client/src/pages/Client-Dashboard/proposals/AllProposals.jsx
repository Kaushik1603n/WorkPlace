import { useEffect, useState } from "react";
import { Search, Filter, Clock, CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AllProposals() {
  const [proposals, setProposals] = useState([]);

  const { jobId } = useParams();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios(`${baseURL}/jobs/all-proposal/${jobId}`, {
      withCredentials: true,
    }).then((res) => {
      toast.success("success");
      setProposals(res.data?.allProposal);
    });
  }, [baseURL]);

 

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Freelancer Proposals
        </h2>
        <p className="text-gray-500">
          Manage freelancer applications and submissions
        </p>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal?.proposal_id}
            className={`flex items-center justify-between p-4 rounded-lg border  "border-green-200 bg-green-50
                border-gray-200 bg-white"
            `}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-lg font-bold">
                  {proposal?.freelancerName[0]}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">
                    {proposal?.freelancerName}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {proposal?.freelancerEmail}
                </p>
                <div className="flex items-center mt-1 text-sm">
                  <div className="flex items-center text-green-600">
                    <CheckCircle size={14} className="mr-1" />
                    {proposal?.status}
                  </div>

                  <span className="ml-3 text-gray-400 flex items-center">
                    <Clock size={14} className="mr-1" />
                      <span>
                        {proposal?.submittedAt}
                      </span>
                  </span>
                  <span className="ml-3 text-gray-800 flex items-center">
                    <DollarSign size={14} className="mr-1" />
                      <b>
                        {proposal?.bidAmount}
                      </b>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Link to={`propisal-details/${proposal?.proposal_id}`} className="px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
                Review
              </Link>
            </div>
          </div>
        ))}
      </div>

      {proposals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No Proposals.</p>
        </div>
      )}

      {/* <div className="mt-6 text-center">
        <button className="text-green-500 font-medium hover:text-green-600">
          View all freelancers
        </button>
      </div> */}
    </div>
  );
}

export default AllProposals;
