import { useEffect } from "react";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getClientProject } from "../../features/project/projectSlice";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.clientProject);

  useEffect(() => {
    dispatch(getClientProject()).unwrap();
  }, [dispatch]);

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
            {project &&
              project.map((project) => (
                <div
                  key={project._id}
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
                        <Link
                          to={`job-details/${project._id}`}
                          className="mt-2 inline-block text-green-600 border border-green-600 text-xs rounded-full px-4 py-1 hover:bg-green-600 hover:text-white transition duration-200 text-center w-full"
                        >
                          
                          Details
                        </Link>
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
                    <div className="text-lg font-medium">{project.budget}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
