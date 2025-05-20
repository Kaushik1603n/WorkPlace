import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ArrowDown,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";
import NavigationBar from "../../components/NavBar/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllTheJobs } from "../../features/marketPlace/marketPlaceSlice";
import { Link } from "react-router-dom";

function MarketPlace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const dispatch = useDispatch();
  const { jobs } = useSelector((store) => store.market);

  useEffect(() => {
    dispatch(getAllTheJobs()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); 

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    dispatch(getAllTheJobs(debouncedSearchQuery));
  }, [debouncedSearchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllTheJobs(searchQuery));
  };

  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const skills = ["Node.js", "React", "MongoDB", "Express.js"];

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 px-4 py-6">
          <div className="relative w-full md:w-[600px]">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-10 border border-[#27AE60] rounded-full bg-white focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full"
            >
              <Search size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <button
                onClick={() => setIsSkillOpen(!isSkillOpen)}
                className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors"
              >
                Skill <span className="ml-1">›</span>
              </button>
              {isSkillOpen && (
                <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-gray-700"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors">
              Price Range <span className="ml-1">›</span>
            </button>
            <button className="px-4 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors">
              Job Type <span className="ml-1">›</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition duration-150"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.stack} Stack · Posted{" "}
                    {new Date(job.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Link
                    to={`job-details/${job._id}`}
                    className="bg-green-100 text-green-600 hover:bg-green-200 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    View Job
                  </Link>
                </div>
              </div>

              <p className="mt-3 text-gray-700 truncate">{job.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    ${job.budget}
                  </h3>
                </div>
                <div className="text-sm text-gray-600">
                  {job.proposals.length} proposals
                </div>
              </div>
              {/* <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Star
                    size={16}
                    className="text-yellow-400"
                    fill="currentColor"
                  />
                  <span className="ml-1 text-sm text-gray-600">
                    {job.ratings} ({job.reviews} reviews)
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {job.proposals} proposals
                </div>
              </div> */}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-50 text-sm font-medium text-green-600 hover:bg-green-100"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </main>
      
    </div>
  );
}

export default MarketPlace;
