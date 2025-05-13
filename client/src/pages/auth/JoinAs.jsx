import { useState } from "react";
import { Briefcase, UserCheck } from "lucide-react";

export default function JoinAs() {
  const [selectedType, setSelectedType] = useState("client");

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const handleJoin = () => {
    console.log(`Joining as a ${selectedType}`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">WorkPlace</h1>

        <div className="bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-16">
            Join as a client or freelancer
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <div
              className={`border-2 rounded-xl p-6 cursor-pointer flex items-start gap-4 relative
                ${
                  selectedType === "client"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              onClick={() => handleTypeSelection("client")}
            >
              <div className="absolute top-6 right-6 h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                {selectedType === "client" && (
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                )}
              </div>

              <div className="mt-1">
                <Briefcase size={24} />
              </div>

              <div>
                <p className="text-xl font-medium">I'm a client,</p>
                <p className="text-xl font-medium">hiring for a</p>
                <p className="text-xl font-medium">project</p>
              </div>
            </div>

            <div
              className={`border-2 rounded-xl p-6 cursor-pointer flex items-start gap-4 relative
                ${
                  selectedType === "freelancer"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              onClick={() => handleTypeSelection("freelancer")}
            >
              <div className="absolute top-6 right-6 h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                {selectedType === "freelancer" && (
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                )}
              </div>

              <div className="mt-1">
                <UserCheck size={24} />
              </div>

              <div>
                <p className="text-xl font-medium">I'm a freelancer,</p>
                <p className="text-xl font-medium">work for a</p>
                <p className="text-xl font-medium">project</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleJoin}
              className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium py-3 px-12 rounded-full transition duration-200"
            >
              Join as a {selectedType === "client" ? "Client" : "Freelancer"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-lg">
              Already have an account?
              <a
                href="/login"
                className="text-green-500 hover:text-green-600 ml-2 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
