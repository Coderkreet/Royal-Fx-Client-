import { useState, useRef, useEffect } from 'react';
// import { LuShield } from 'react-icons/lu';
import { maskTwoLetters } from '../../utils/additonalFunc';

const DualOtpVerificationPopup = ({ show, onHide, payload, otpSubmitHandler }) => {
  const [emailOtp, setEmailOtp] = useState(new Array(6).fill(''));
  const [emailStatus, setEmailStatus] = useState(null);
  const [shakeEmail, setShakeEmail] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const emailRefs = useRef([]);

  useEffect(() => {
    emailRefs.current[0]?.focus();
  }, []);

  const handleChange = (otpArray, setOtpArray, index, value, refs) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otpArray];
    updatedOtp[index] = value;
    setOtpArray(updatedOtp);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, otpArray, index, refs) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e, setOtpArray, refs) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(data)) {
      const otpArray = Array(6).fill('');
      data.split('').forEach((char, idx) => {
        otpArray[idx] = char;
      });
      setOtpArray(otpArray);
      refs.current[Math.min(data.length, 5)]?.focus();
    }
  };

  const verifyOtps = () => {
    setIsVerifying(true);
    const isEmailValid = emailOtp.join('').length === 6;

    setEmailStatus(isEmailValid ? 'success' : 'error');

    if (!isEmailValid) {
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 500);
    }

    if (isEmailValid) {
      otpSubmitHandler({
        emailOtp: emailOtp.join(''),
      });
    }
    setIsVerifying(false);
  };

  const renderOtpGroup = (
    label,
    otpArray,
    setOtpArray,
    refs,
    status,
    shake
  ) => (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-300 mb-2">
        {label} - {maskTwoLetters(payload?.email)} OTP
      </h3>
      <div className={`flex gap-2 ${shake ? 'animate-shake' : ''}`}>
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (refs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(otpArray, setOtpArray, index, e.target.value, refs)}
            onKeyDown={(e) => handleKeyDown(e, otpArray, index, refs)}
            onPaste={(e) => handlePaste(e, setOtpArray, refs)}
            className={`w-12 h-12 text-center text-lg font-semibold rounded-md border ${
              digit ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-600'
            } bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        ))}
      </div>
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-1">
          Please enter valid email OTP
        </p>
      )}
    </div>
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            {/* <LuShield className="w-8 h-8 text-blue-500" /> */}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Verify Email</h2>
          <p className="text-gray-300 text-center mb-6">
            Enter the OTP sent to your email address
          </p>

          {renderOtpGroup(
            'Email',
            emailOtp,
            setEmailOtp,
            emailRefs,
            emailStatus,
            shakeEmail
          )}

          <div className="flex gap-4 w-full">
            <button
              onClick={onHide}
              className="flex-1 py-3 px-4 rounded-md font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={verifyOtps}
              disabled={isVerifying}
              className={`flex-1 py-3 px-4 rounded-md font-medium text-white ${
                !isVerifying
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 relative`}
            >
              {isVerifying ? (
                <>
                  <span className="invisible">Verifying</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualOtpVerificationPopup;