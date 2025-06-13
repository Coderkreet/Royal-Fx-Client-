import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';
import Swal from 'sweetalert2';
import { createUserApi, verifyRegisterOtp } from '../api/auth-api';
import DualOtpVerificationPopup from '../Components/UI/DualOtpVerificationPopup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Password Mismatch',
          text: 'Password and Confirm Password do not match!',
        });
        return;
      }

      setIsSubmitting(true);
      dispatch(setLoading(true));
      
      const res = await createUserApi(formData);
      console.log('Registration Response:', res);

      if (res?.success && res?.data) {
        // Store user data and show OTP popup
        setUserData({
          name: res.data.name,
          email: res.data.email,
          mobile: res.data.mobile,
          username: res.data.username
        });
        
        // Show success message
      await Swal.fire({
        icon: 'success',
          title: 'Registration Successful',
          text: 'Please verify your email with OTP',
        timer: 2000,
      });

        // Show OTP popup
        setShowOtpPopup(true);
        console.log('OTP Popup should be visible now');
        console.log('User Data:', res.data);
      } else {
        throw new Error(res?.message || 'Registration failed');
      }
      
    } catch (error) {
      console.error('Registration Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error?.response?.data?.message || error.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
      setIsSubmitting(false);
    }
  };

  const handleOtpVerification = async (emailOtp) => {
    try {
      dispatch(setLoading(true));
      console.log('Verifying OTP:', emailOtp);
      const res = await verifyRegisterOtp(emailOtp);
      console.log('OTP Verification Response:', res);

      if (res?.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Verification Success',
          text: 'Your account has been verified successfully',
          timer: 2000,
        });

        navigate('/login');
      } else {
        throw new Error(res?.message || 'Verification failed');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: error?.response?.data?.message || error.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
      setShowOtpPopup(false);
    }
  };

  const handleCloseOtpPopup = () => {
    console.log('Closing OTP popup');
    setShowOtpPopup(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated World Background */}
      <div className="absolute inset-0">
        {/* World Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-40 h-40 bg-gradient-to-r from-green-400/20 to-cyan-600/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>

            <div className="relative">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">®</span>
                    </div>
                  </div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-2">
                  Royal-Fx
                </h1>
                <p className="text-cyan-400 text-sm font-medium tracking-wide">GLOBAL BLOCKCHAIN PLATFORM</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Join the World</h2>
                <p className="text-gray-400 leading-relaxed">
                  Create your account and become part of the global blockchain ecosystem. Secure, fast, and trusted.
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-white text-sm">Full Name*</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-white text-sm">Email Address*</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="text-white text-sm">Mobile Number*</label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      required
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="text-white text-sm">Password*</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>

              <div>
                    <label htmlFor="confirmPassword" className="text-white text-sm">Confirm Password*</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="referralCode" className="text-white text-sm">Referral Code</label>
                <input
                  id="referralCode"
                      name="referralCode"
                  type="text"
                      value={formData.referralCode}
                      onChange={handleChange}
                      placeholder="Enter referral code (optional)"
                      className="w-full bg-slate-800/30 border border-slate-700/50 text-white font-medium py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
              </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
              </button>
              </form>

              {/* Login Link */}
              <button
                onClick={() => navigate('/login')}
                className="w-full mt-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Already have an account? Login</span>
                </div>
              </button>

              {/* Footer */}
              <div className="text-center space-y-3 mt-6">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Secure</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Global</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Trusted</span>
                  </span>
                </div>
                <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  Privacy Policy & Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOtpPopup && userData && (
        <DualOtpVerificationPopup
          show={showOtpPopup}
          onHide={handleCloseOtpPopup}
          payload={userData}
          otpSubmitHandler={handleOtpVerification}
        />
      )}
    </div>
  );
};

export default Register; 