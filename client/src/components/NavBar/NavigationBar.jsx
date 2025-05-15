import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav className="bg-white px-4 py-4 flex items-center justify-between relative shadow-lg border-b border-gray-100">
      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-bold">WorkPlace</h1>
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="text-green-600 font-medium hover:text-green-800 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-green-600 transition-colors"
          >
            About
          </a>

          <a
            href="#"
            className="text-gray-700 hover:text-green-600 transition-colors"
          >
            Market place
          </a>

          {user?.role && (
            <Link
              to="/client-dashboard"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Dashboard
            </Link>
          )}
          {user?.role && (
            <Link
              to="/freelancer-dashboard"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
             freelancer Dashboard
            </Link>
          )}
          {user?.role === "freelancer" && (
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Find Client
            </a>
          )}
          {user?.role === "client" && (
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Find Freelancers
            </a>
          )}
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="hidden md:flex space-x-3">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition shadow-sm hover:shadow">
                LogIn
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-green-500 text-green-500 px-5 py-2 rounded-md hover:bg-green-50 transition shadow-sm hover:shadow">
                SignUp
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-5 py-2 rounded-md hover:bg-red-600 transition shadow-sm hover:shadow"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white p-5 md:hidden z-50 shadow-lg border-t border-gray-100">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="text-green-600 font-medium hover:text-green-800 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Market place
            </a>

            {user?.role && (
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Dashboard
              </a>
            )}
            {user?.role === "freelancer" && (
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Find Client
              </a>
            )}
            {user?.role === "client" && (
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Find Freelancers
              </a>
            )}
            <div className="flex flex-col space-y-3 pt-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <button className="bg-green-500 text-white w-full px-5 py-2 rounded-md hover:bg-green-600 transition shadow-sm hover:shadow">
                      LogIn
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="border border-green-500 text-green-500 w-full px-5 py-2 rounded-md hover:bg-green-50 transition shadow-sm hover:shadow">
                      SignUp
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-400 text-white w-full px-5 py-2 rounded-md hover:bg-red-600 transition shadow-sm hover:shadow"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
