import { useEffect, useState } from "react";
import { User, Phone, Mail, Calendar, Shield, Camera, Save, Check, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import Swal from "sweetalert2";
import { getUserInfo, updateUserProfile } from "../api/user-api";
import { emailValidator, nameValidator, phoneValidator } from "../utils/inputValidator";
import { formatDate, maskEmailAddress, maskWalletAddress } from "../utils/additonalFunc";

// Skeleton Loader Component
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-2 xl:p-4 animate-pulse">
    <div className="max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="w-64 h-10 bg-slate-700 rounded-lg mx-auto mb-2"></div>
        <div className="w-80 h-4 bg-slate-700 rounded-lg mx-auto"></div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Profile Header Section Skeleton */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 p-4 md:p-8">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex flex-col items-center text-center">
            {/* Profile Picture Skeleton */}
            <div className="w-32 h-32 rounded-full bg-slate-700 mb-6"></div>

            {/* User Info Skeleton */}
            <div className="w-48 h-8 bg-slate-700 rounded-lg mb-2"></div>
            <div className="w-64 h-4 bg-slate-700 rounded-lg mb-4"></div>
            
            {/* Status Badge Skeleton */}
            <div className="w-24 h-8 bg-slate-700 rounded-full"></div>
          </div>
        </div>

        {/* Form Section Skeleton */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="w-48 h-8 bg-slate-700 rounded-lg"></div>
            <div className="w-32 h-12 bg-slate-700 rounded-xl"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Fields Skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="w-32 h-4 bg-slate-700 rounded mb-2"></div>
                <div className="w-full h-12 bg-slate-700 rounded-xl"></div>
              </div>
            ))}
          </div>

          {/* Additional Info Cards Skeleton */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-5 h-5 bg-slate-700 rounded"></div>
                  <div className="w-32 h-5 bg-slate-700 rounded"></div>
                </div>
                <div className="w-full h-4 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    username: "",
    mobile: "",
    email: "",
    createdAt: "",
    status: "",
    profile: "",
    walletAddress: ""
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  async function GetUserInfo() {
    try {
      setLoading(true);
      const res = await getUserInfo();
      setUserInfo(res.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load profile data",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setPayload({
        username: userInfo?.name || "User",
        mobile: userInfo?.mobile || "NA",
        email: userInfo?.email || "NA",
        createdAt: formatDate(userInfo?.createdAt) || "dd/mm/yyyy",
        status: userInfo?.isActive ? "Active" : "Inactive",
        profile: userInfo?.picture || "https://img.icons8.com/bubbles/100/user.png",
        walletAddress: userInfo?.walletAddress || "NA",
      });
    }
  }, [userInfo]);

  const handleChange = (e, field) => {
    const { value } = e.target;

    let error = null;
    if (field === "mobile") {
      error = phoneValidator(value);
    } else if (field === "email") {
      error = emailValidator(value);
    } else if (field === "username") {
      error = nameValidator(value);
    }

    setErrors({
      ...errors,
      [field]: error,
    });

    setPayload({
      ...payload,
      [field]: value,
    });
  };

  const validate = () => {
    const validationErrors = {};
    let isValid = true;
    const nameError = nameValidator(payload.username);
    const emailError = emailValidator(payload.email);
    const mobileError = phoneValidator(payload.mobile);

    if (nameError) {
      validationErrors.username = nameError;
      isValid = false;
    }
    if (emailError) {
      validationErrors.email = emailError;
      isValid = false;
    }
    if (mobileError) {
      validationErrors.mobile = mobileError;
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // if (!validate()) return;
    dispatch(setLoading(true));

    try {
      // Map username to name if backend expects 'name'
      const response = await updateUserProfile({
        name: payload.username,
        mobile: payload.mobile,
        email: payload.email,
        profile: payload?.profile?.includes("base64,")
          ? payload.profile.split("base64,")[1]
          : payload.profile,
        walletAddress: payload.walletAddress,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updation",
        text: response?.message || "Profile Updated Successfully",
        timer: 2000,
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Profile Updation Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base = e.target.result;
        setPayload({ ...payload, profile: base });
      };
      reader.readAsDataURL(file);
    }
  };

  const InputField = ({ label, value, onChange, error, disabled, type = "text", icon: Icon, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-400" />
          {label}
        </div>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-800 border-2 rounded-xl text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-0 ${
          error 
            ? 'border-red-500 focus:border-red-400' 
            : disabled 
            ? 'border-slate-700 cursor-not-allowed opacity-60' 
            : 'border-slate-600 focus:border-blue-500 hover:border-slate-500'
        }`}
      />
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
          {error}
        </p>
      )}
    </div>
  );

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-2 xl:p-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account information and preferences</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
          
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 p-8">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative flex flex-col items-center text-center">
              
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 p-1 shadow-2xl">
                  <img
                    src={payload.profile}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover bg-slate-700"
                  />
                </div>
                {isEditing && (
                  <button
                    onClick={() => document.getElementById("profileImageChange").click()}
                    className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 group-hover:scale-110"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
                <input
                  id="profileImageChange"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              
              <h2 className="text-3xl font-bold text-white mb-2">{payload.username}</h2>
              <p className="text-blue-200 mb-4">{maskWalletAddress(payload.walletAddress)}</p>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                payload.status === 'Active' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  payload.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                {payload.status}
              </div>
            </div>
          </div>

          
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Account Details</h3>
              {/* <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
              >
                {isEditing ? <Check className="w-4 h-4" /> : <User className="w-4 h-4" />}
                {isEditing ? 'View Mode' : 'Edit Profile'}
              </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="User Id"
                value={payload.username}
                onChange={(e) => handleChange(e, "username")}
                error={errors.username}
                disabled={!isEditing}
                icon={User}
                placeholder="Enter your full name"
              />

              <InputField
                label="Wallet Address"
                value={payload.walletAddress}
                onChange={(e) => handleChange(e, "walletAddress")}
                error={errors.walletAddress}
                disabled={!isEditing}
                icon={Wallet}
                placeholder="Enter your wallet address"
              />

              {/* <InputField
                label="Email Address"
                value={payload.email}
                onChange={(e) => handleChange(e, "email")}
                error={errors.email}
                disabled={true}
                icon={Mail}
                placeholder="Enter your email address"
              /> */}

              <InputField
                label="Member Since"
                value={payload.createdAt}
                disabled={true}
                icon={Calendar}
                placeholder="Joining date"
              />
            </div>

           
            {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-white">Account Security</h4>
                </div>
                <p className="text-slate-400 text-sm">Your account is secured with two-factor authentication</p>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-white">Last Updated</h4>
                </div>
                <p className="text-slate-400 text-sm">Profile was last modified {new Date(payload.updatedAt).toUTCString() || 'N/A'}</p>
              </div>
            </div> */}

           
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  <Save className="w-5 h-5" />
                  Update Profile
                </button>
                
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-200 border border-slate-600"
                >
                  Cancel Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;