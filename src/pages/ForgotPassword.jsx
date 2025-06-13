import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';
import { sendForForgetWithUsername, verifyOtpForForgetWithUsername, createNewPassword } from '../api/auth-api';
import { nameValidator, passwordValidator, confirmPasswordValidator } from '../utils/inputValidator';
import { AuthRoutes } from '../context/Routes';
import Swal from 'sweetalert2';
import DualOtpVerificationPopup from '../Components/UI/DualOtpVerificationPopup';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const [otpPopup, setOtpPopup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const nameError = nameValidator(formData.username);
    if (nameError) {
      newErrors.username = "Username can't be empty.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const validateVerifyForm = () => {
    let newErrors = {};
    let isValid = true;

    const passwordError = passwordValidator(formData.password);
    const confirmPasswordError = confirmPasswordValidator(
      formData.password,
      formData.confirmPassword
    );
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      dispatch(setLoading(true));
      const response = await sendForForgetWithUsername(formData);
      setFormData((prevState) => ({
        ...prevState,
        email: response?.email,
        mobile: response?.mobile,
      }));
      setOtpPopup(true);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Find Account Failed',
        text: error?.response?.data.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const otpSubmitHandler = async (data) => {
    try {
      dispatch(setLoading(true));
      await verifyOtpForForgetWithUsername({
        ...formData,
        ...data,
      });
      setIsVerified(true);
      setOtpPopup(false);
      Swal.fire({
        icon: 'success',
        title: 'OTP Verification Success',
        text: 'OTP verified successfully',
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'OTP Verification Failed',
        text: error?.response?.data?.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createPasswordHandler = async (e) => {
    e.preventDefault();
    if (!validateVerifyForm()) return;
    try {
      dispatch(setLoading(true));
      await createNewPassword(formData);
      Swal.fire({
        icon: 'success',
        title: 'Password Changed Success',
        text: 'Password changed successfully',
        timer: 2000,
      }).then(() => {
        navigate(AuthRoutes.LOGIN);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Password Change Failed',
        text: error?.response?.data.message || 'Something went wrong!',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <DualOtpVerificationPopup
        show={otpPopup}
        payload={formData}
        onHide={() => setOtpPopup(false)}
        otpSubmitHandler={otpSubmitHandler}
      />

      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md p-8 rounded-lg">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-xl font-semibold text-white">AnonMiner<sup>®</sup></span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-white">Reset your password</h2>

          <form onSubmit={isVerified ? createPasswordHandler : handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isVerified}
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {isVerified && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isVerified ? 'Reset Password' : 'Find Account'}
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => navigate(AuthRoutes.LOGIN)}
              className="w-full py-3 px-4 rounded-md font-medium text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20 focus:outline-none"
            >
              Back to Login
            </button>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm font-medium text-gray-400 hover:text-gray-300">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword; 