import { useState } from "react";
import {
  Search,
  Filter,
  ArrowDown,
  Star,
  Users,
  MessageCircle,
} from "lucide-react";

function MarketPlace() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Freelancer Platform Like Upwork (MERN Stack)",
      budget: "$2,500 - $5,000",
      category: "Web Development",
      time: "1 hour ago",
      description:
        "Need a skilled developer to create a freelancing platform similar to Upwork using MERN stack. Must include bidding system, user profiles, and payment integration...",
      skills: ["node.js", "react.js", "mongodb"],
      ratings: 4.2,
      reviews: 5,
      proposals: 3,
    },
    {
      id: 2,
      title: "E-commerce Website with Payment Gateway",
      budget: "$1,800 - $3,500",
      category: "Web Development",
      time: "3 hours ago",
      description:
        "Looking for an experienced developer to build a responsive e-commerce website with product catalog, shopping cart, and secure payment gateway integration...",
      skills: ["php", "mysql", "javascript"],
      ratings: 4.5,
      reviews: 8,
      proposals: 7,
    },
    {
      id: 3,
      title: "Mobile App for Fitness Tracking",
      budget: "$3,000 - $6,000",
      category: "Mobile Development",
      time: "5 hours ago",
      description:
        "Need a mobile developer to create a fitness tracking app for iOS and Android. Features include workout plans, progress tracking, calorie counter, and social sharing...",
      skills: ["react native", "firebase", "UI/UX"],
      ratings: 4.7,
      reviews: 12,
      proposals: 9,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-green-600">WorkPlace</div>
              <nav className="ml-10 flex space-x-8">
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-700 px-3 py-2 text-sm font-medium"
                >
                  Market place
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Find Freelancers/Client
                </a>
              </nav>
            </div>
            <div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full">
                LogOut
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-md border border-gray-300 flex items-center bg-white">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-none rounded-md focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search"
              />
              <button className="bg-white p-2 rounded-r-md border-l">
                <Filter size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="relative inline-block">
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 inline-flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Skill
                <ArrowDown size={16} className="ml-2 text-gray-400" />
              </button>
            </div>

            <div className="relative inline-block">
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 inline-flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Price Range
                <ArrowDown size={16} className="ml-2 text-gray-400" />
              </button>
            </div>

            <div className="relative inline-block">
              <button className="bg-white border border-gray-300 rounded-md px-4 py-2 inline-flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Job Type
                <ArrowDown size={16} className="ml-2 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition duration-150"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.budget} · {job.category} · Posted {job.time}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <button className="bg-green-100 text-green-600 hover:bg-green-200 px-4 py-2 rounded-md text-sm font-medium">
                    View Job
                  </button>
                </div>
              </div>

              <p className="mt-3 text-gray-700">{job.description}</p>

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
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
