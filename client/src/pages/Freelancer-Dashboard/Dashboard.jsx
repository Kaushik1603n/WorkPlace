import {} from "react";
import { Menu } from "lucide-react";

export default function FreelancerDashboard() {
  const activeProjects = [
    {
      id: 1,
      title: "Food Delivery web app",
      description: "Food Delivery app full functionality",
      cost: "100000/-",
      stack: "MERN Stack",
      developer: "John",
      role: "MERN stack developer",
    },
    {
      id: 2,
      title: "Food Delivery web app",
      description: "Food Delivery app full functionality",
      cost: "100000/-",
      stack: "MERN Stack",
      developer: "John",
      role: "MERN stack developer",
    },
    {
      id: 3,
      title: "Food Delivery web app",
      description: "Food Delivery app full functionality",
      cost: "100000/-",
      stack: "MERN Stack",
      developer: "John",
      role: "MERN stack developer",
    },
  ];

  return (
    <>
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg  border-green-100 mb-6 border border-color">
          <div className="flex">
            <div className="p-6 flex-1">
              <h2 className="text-xl font-medium text-gray-800">
                Hello, John!
              </h2>
              <p className="text-gray-600 mt-2">
                You are active project are 10, and completed project is 34
              </p>
            </div>
            <div className="p-6 bg-color-light border-l rounded-br-lg rounded-tr-lg border-color">
              <div className="space-y-2">
                <p className="text-gray-700">Total Spent: $8,400</p>
                <p className="text-gray-700">Total Pending: $8,400</p>
                <p className="text-gray-700">Total Pending: $8,400</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-color-light rounded-lg border border-color p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Active Project
          </h3>
          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="border border-color bg-white rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center text-white text-xs">
                        <div className="text-center">
                          <div className="w-8 h-8 mx-auto mb-1 bg-blue-600 rounded-full flex items-center justify-center">
                            <Menu size={16} />
                          </div>
                          <span className="text-xs">MERN Stack</span>
                        </div>
                      </div>
                      <button className="mt-2 text-green-500 border border-green-500 text-xs rounded-full w-full py-1">
                        Details
                      </button>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">
                        {project.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
                          J
                        </div>
                        <span className="ml-2 text-gray-600 text-sm">
                          John{" "}
                          <span className="text-gray-500">
                            ({project.role})
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-medium">{project.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
