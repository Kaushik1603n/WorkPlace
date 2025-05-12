import { useState } from "react";
import { Briefcase, UserCheck, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/authSlice";

export default function CombinedRegistration() {
  // Step 1
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);

  // Step 2
  const [activeTab, setActiveTab] = useState("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleTypeSelection = (type) => {
    setUserType(type);
  };

  const handleJoin = () => {
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log("Signup attempt with:", {
      userType,
      fullName,
      email,
      password,
      confirmPassword,
    });

    dispatch(registerUser({ joinAs: userType, fullName, email, password }))
      .unwrap()
      .then((user) => {
        console.log(user);
        navigate("/verify-otp");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16">WorkPlace</h1>

          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-center mb-16">
              Join as a client or freelancer
            </h2>

            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              {/* Client Card */}
              <div
                className={`border-2 rounded-xl p-6 cursor-pointer flex items-start gap-4 relative
                  ${
                    userType === "client"
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                onClick={() => handleTypeSelection("client")}
              >
                <div className="absolute top-6 right-6 h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {userType === "client" && (
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

              {/* Freelancer Card */}
              <div
                className={`border-2 rounded-xl p-6 cursor-pointer flex items-start gap-4 relative
                  ${
                    userType === "freelancer"
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                onClick={() => handleTypeSelection("freelancer")}
              >
                <div className="absolute top-6 right-6 h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {userType === "freelancer" && (
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
                disabled={!userType}
                className={`bg-green-500 text-white text-lg font-medium py-3 px-12 rounded-full transition duration-200
                  ${
                    !userType
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
              >
                Join as a{" "}
                {userType === "client"
                  ? "Client"
                  : userType === "freelancer"
                  ? "Freelancer"
                  : "User"}
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

  // Step 2
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto flex rounded-lg overflow-hidden shadow-lg">
        <div className="w-full lg:w-1/2 bg-white px-12 py-5">
          {/* <h2 className="text-2xl font-bold mb-4">
            Complete your {userType === 'client' ? 'Client' : 'Freelancer'} Registration
            </h2> */}

          <div className="flex mb-4 border-b">
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

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error.message || "Login failed. Please try again."}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div className="mb-2">
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Please Enter your Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-2">
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

            <div className="mb-2">
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

            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Please Confirm your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium mb-3 transition duration-200"
            >
              {loading ? "Get OTP..." : "Get OTP"}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition duration-200"
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
            <div className="absolute top-24 right-24">
              <div className="bg-green-100 w-24 h-24 rounded-full"></div>
            </div>
            <div className="absolute top-16 left-20">
              <div className="bg-red-200 w-16 h-16 rounded-full"></div>
            </div>
            <div className="absolute top-32 right-36">
              <div className="bg-orange-300 w-36 h-16 rounded-lg"></div>
            </div>
            <div className="absolute top-24 left-32">
              <div className="bg-gray-400 w-16 h-16 rounded-lg"></div>
            </div>
            <div className="absolute top-16 right-12">
              <div className="bg-blue-100 w-20 h-20 rounded-full"></div>
            </div>

            <div className="mt-48 relative">
              <div className="flex justify-center space-x-1">
                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-gray-300 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-700"></div>
                  <div className="absolute bottom-16 w-16 h-8 bg-gray-400"></div>
                </div>

                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-pink-300 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-orange-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-16 bg-pink-200"></div>
                  <div className="absolute bottom-16 w-16 h-8 bg-orange-400"></div>
                </div>

                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-blue-200 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-gray-700 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-12 bg-gray-800"></div>
                </div>

                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-green-200 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-teal-700 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-12 bg-red-700"></div>
                </div>

                <div className="relative w-16 h-48">
                  <div className="absolute bottom-0 w-16 h-32 bg-red-400 rounded-t-full"></div>
                  <div className="absolute bottom-24 left-3 w-10 h-10 bg-red-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
