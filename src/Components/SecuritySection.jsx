import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slice/loadingSlice';
import Swal from 'sweetalert2';
import { createNewPassword } from '../api/auth-api';
import { getUserInfo } from '../api/user-api';

const SecuritySection = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  async function GetUserInfo() {
    const res = await getUserInfo();
    setUser(res);
    setFormData(prevData => ({
      ...prevData,
      email: res?.data?.email || ""
    }));
  }

  useEffect(() => {
    GetUserInfo();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmitPass = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      await createNewPassword(formData);
      
      await Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        text: 'Your password has been updated successfully',
        timer: 2000
      });
      
      setFormData(prevData => ({
        ...prevData,
        password: "",
        confirmPassword: ""
      }));
      setErrors({});
    } catch (error) {
      console.error('Error updating password:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error?.response?.data?.message || 'Failed to update password'
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-lg font-medium mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-md font-medium mb-4">Password</h3>
          <form onSubmit={handleSubmitPass} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-2">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
        
        {/* <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-md font-medium mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">
                Add an extra layer of security to your account
              </p>
              <p className="text-xs text-gray-400 mt-1">
                We'll ask for a code in addition to your password when you log in
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm">
              Enable 2FA
            </button>
          </div>
        </div> */}
        
        {/* <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-md font-medium mb-4">Active Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <rect width="16" height="14" x="4" y="5" rx="2"></rect>
                    <rect width="8" height="6" x="8" y="9" rx="1"></rect>
                    <path d="M4 19h16"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Windows PC - Chrome</p>
                  <p className="text-xs text-gray-400">Current session</p>
                </div>
              </div>
              <span className="text-green-500 text-xs">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <rect width="12" height="20" x="6" y="2" rx="2"></rect>
                    <path d="M12 18h.01"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">iPhone - Safari</p>
                  <p className="text-xs text-gray-400">Last active: 2 days ago</p>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-300 text-xs">Revoke</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SecuritySection;
