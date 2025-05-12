import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../features/auth/authSlice';

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
// userId

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      setIsResendDisabled(false); // Enable resend button when timer expires
      setIsRegisterDisabled(true); // Disable register button when timer expires
    }
    return () => clearInterval(interval);
  }, [timer, isTimerRunning]);

  useEffect(() => {
    // Enable register button only when all OTP fields are filled
    const allFieldsFilled = otp.every(digit => digit !== '');
    setIsRegisterDisabled(!allFieldsFilled);
  }, [otp]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendOTP = () => {
    if (isResendDisabled) return;
    
    // Reset OTP fields and timer
    setOtp(['', '', '', '']);
    setTimer(60);
    setIsTimerRunning(true);
    setIsResendDisabled(true); // Disable resend button again
    setIsRegisterDisabled(false); // Enable register button
    inputRefs[0].current.focus();
    
    // Here you would typically call your API to resend OTP
    console.log('Resending OTP...');
  };

  const handleRegister = () => {
    if (isRegisterDisabled) return;
    
    // Combine OTP digits
    const otpCode = otp.join('');
    
     dispatch(verifyEmail({otp:otpCode, userId:user}))
          .unwrap()
          .then(() => {
            // Redirect on successful login
            navigate("/change-pass"); // or your desired route
          })
          .catch((error) => {
            // Error is already handled in the slice
            console.error("OTP validation failed:", error);
          });
   
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-50">
      <h1 className="text-3xl font-bold mt-16 mb-8">WorkPlace</h1>
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="w-full md:w-1/2 p-4 flex justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <img 
              src="/api/placeholder/500/500" 
              alt="People discussing with speech bubbles"
              className="w-full object-contain"
            />
          </div>
        </div>
        
        {/* Right side - OTP form */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center">
          <div className="text-center mb-6">
            <p className="text-gray-700">OTP has been send to your Email</p>
            
            <div className="text-5xl text-green-500 font-bold my-6">
              {formatTime(timer)}
            </div>
            
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 bg-gray-200 rounded-full text-center text-xl font-bold"
                  maxLength={1}
                />
              ))}
            </div>
            
            <button 
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              className={`w-full py-3 rounded-lg transition mb-4 ${
                isResendDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isResendDisabled ? `Resend available in ${timer}s` : 'Send Again'}
            </button>
            
            <button 
              onClick={handleRegister}
              disabled={isRegisterDisabled}
              className={`w-full py-3 rounded-lg transition ${
                isRegisterDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}