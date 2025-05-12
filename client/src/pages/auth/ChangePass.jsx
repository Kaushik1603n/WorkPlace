import { Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

export default function ChangePass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    dispatch(resetPassword({ newPassword, confirmPassword, userId: user }))
      .unwrap()
      .then(() => {
        // Redirect on successful login
        navigate("/login"); // or your desired route
      })
      .catch((error) => {
        // Error is already handled in the slice        
        toast.error( error.message);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="w-full max-w-6xl flex overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="w-full md:w-1/2 bg-gray-800 rounded-lg">
          <div className="h-full p-6 flex items-center justify-center relative">
            {/* Chat Bubbles */}
            <div className="absolute top-16 left-1/4">
              <div className="bg-pink-200 h-12 w-16 rounded-full"></div>
            </div>
            <div className="absolute top-12 right-1/4">
              <div className="bg-green-100 h-16 w-24 rounded-full"></div>
            </div>
            <div className="absolute top-24 left-1/3">
              <div className="bg-orange-300 h-12 w-32 rounded-lg"></div>
            </div>
            <div className="absolute top-20 right-1/3">
              <div className="bg-gray-300 h-10 w-16 rounded-full"></div>
            </div>
            <div className="absolute top-32 right-1/4">
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

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-green-500 mb-16">
            forgot Password
          </h1>

          <div className="w-full max-w-md space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Please Enter your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-1/2 mx-auto block bg-green-500 hover:bg-green-600 text-white py-3 rounded-md font-medium transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
