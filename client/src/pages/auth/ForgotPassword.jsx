import { Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPass } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    dispatch(forgotPass({ email }))
      .unwrap()
      .then(() => {
        console.log("sjbsbj");

        navigate("/otp");
      })
      .catch((error) => {
       toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-6xl flex overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-green-500 mb-16">
            forgot Password
          </h1>

          <div className="w-full max-w-md">
            <div className="relative mb-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Please Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition-colors"
            >
              Send OTP
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gray-800">
          <div className="h-full p-6 flex items-center justify-center relative">
            {/* Chat Bubbles */}
            <div className="absolute top-1/4 right-1/4">
              <div className="bg-green-100 h-16 w-24 rounded-full"></div>
            </div>
            <div className="absolute top-1/4 left-1/4">
              <div className="bg-pink-200 h-10 w-16 rounded-full"></div>
            </div>
            <div className="absolute top-1/3 right-1/3">
              <div className="bg-orange-300 h-12 w-32 rounded-lg"></div>
            </div>
            <div className="absolute top-1/3 left-1/3">
              <div className="bg-gray-300 h-10 w-16 rounded-full"></div>
            </div>
            <div className="absolute top-2/5 right-2/5">
              <div className="bg-green-100 h-12 w-20 rounded-lg"></div>
            </div>

            {/* People Illustration */}
            <div className="mt-32">
              <div className="flex items-end">
                {/* Person 1 */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-12 h-16 bg-gray-300 rounded-t-full"></div>
                  <div className="w-12 h-20 bg-gray-200"></div>
                  <div className="w-8 h-20 bg-gray-400"></div>
                </div>

                {/* Person 2 */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-12 h-16 bg-orange-400 rounded-t-full"></div>
                  <div className="w-12 h-14 bg-orange-300"></div>
                  <div className="w-8 h-16 bg-green-700"></div>
                </div>

                {/* Person 3 */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-12 h-16 bg-gray-300 rounded-t-full"></div>
                  <div className="w-12 h-16 bg-blue-100"></div>
                  <div className="w-8 h-16 bg-gray-800"></div>
                </div>

                {/* Person 4 */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-12 h-16 bg-green-400 rounded-t-full"></div>
                  <div className="w-12 h-16 bg-green-300"></div>
                  <div className="w-8 h-16 bg-red-800"></div>
                </div>

                {/* Person 5 */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-16 bg-red-400 rounded-t-full"></div>
                  <div className="w-12 h-20 bg-green-600"></div>
                  <div className="w-8 h-14 bg-green-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
