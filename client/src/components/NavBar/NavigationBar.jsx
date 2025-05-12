import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

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
    <nav className="bg-green-50 px-4 py-4 flex items-center justify-between relative">
      <div className="flex items-center space-x-8">
        <h1 className="text-xl font-bold">WorkPlace</h1>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-green-600 font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Market place
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Freelancers
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Client
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            About
          </a>
        </div>
      </div>

      {/* Mobile menu button */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop buttons */}
      <div className="hidden md:flex space-x-2">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                LogIn
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition">
                SignUp
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-green-50 p-4 md:hidden z-50">
          <div className="flex flex-col space-y-3">
            <a href="#" className="text-green-600 font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Market place
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Freelancers
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Client
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              About
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                      LogIn
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 transition">
                      SignUp
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
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
