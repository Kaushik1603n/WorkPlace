import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Redirect on successful login
        navigate("/home"); // or your desired route
      })
      .catch((error) => {
        // Error is already handled in the slice
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto flex rounded-lg overflow-hidden shadow-lg">
        <div className="w-full lg:w-1/2 bg-white p-12">
          <div className="flex mb-8 border-b">
            <div className="flex-1">
              <Link
                to="/login"
                className={`block pb-3 text-center font-medium text-lg ${
                  activeTab === "login"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("login");
                }}
              >
                LOGIN
              </Link>
            </div>

            <div className="flex-1">
              <Link
                to="/register"
                className={`block pb-3 text-center font-medium text-lg ${
                  activeTab === "signup"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("signup");
                }}
              >
                SIGN UP
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Please Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Please Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-6 text-right">
              <Link
                to="/forgot-pass"
                className="text-green-500 hover:text-green-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium mb-4 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition duration-200"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
              </svg>
              Sign up with Google
            </button>
          </form>
        </div>

        {/* Right Panel - Illustration */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-800 p-12 relative">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            WorkPlace
          </h1>

          <div className="flex flex-col items-center justify-center h-full">
            {/* Speech Bubbles */}
            <div className="absolute top-24 right-24">
              <div className="bg-green-100 w-24 h-24 rounded-full"></div>
            </div>
            <div className="absolute top-32 left-16">
              <div className="bg-red-200 w-16 h-16 rounded-full"></div>
            </div>
            <div className="absolute top-40 right-32">
              <div className="bg-orange-300 w-32 h-16 rounded-lg"></div>
            </div>
            <div className="absolute top-16 left-24">
              <div className="bg-blue-100 w-20 h-20 rounded-full"></div>
            </div>
            <div className="absolute top-48 left-32">
              <div className="bg-green-200 w-16 h-16 rounded-full"></div>
            </div>

            {/* People Illustration */}
            <div className="mt-48">
              <div className="flex justify-center space-x-2">
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-gray-300 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="absolute bottom-12 w-16 h-12 bg-green-700"></div>
                </div>
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-28 bg-orange-300 rounded-t-full"></div>
                  <div className="absolute bottom-20 left-3 w-10 h-10 bg-red-300 rounded-full"></div>
                  <div className="absolute bottom-8 w-16 h-12 bg-green-700"></div>
                </div>
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-30 bg-blue-200 rounded-t-full"></div>
                  <div className="absolute bottom-22 left-3 w-10 h-10 bg-gray-100 rounded-full"></div>
                  <div className="absolute bottom-10 w-16 h-12 bg-gray-800"></div>
                </div>
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-28 bg-green-200 rounded-t-full"></div>
                  <div className="absolute bottom-20 left-3 w-10 h-10 bg-green-600 rounded-full"></div>
                  <div className="absolute bottom-10 w-16 h-10 bg-red-700"></div>
                </div>
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-red-400 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-red-300 rounded-full"></div>
                  <div className="absolute bottom-12 w-16 h-12 bg-green-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
