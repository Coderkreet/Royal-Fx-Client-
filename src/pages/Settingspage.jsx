import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import SecuritySection from "../Components/SecuritySection";
import PaymentHistorySection from "../Components/PaymentHistorySection";
import { updateUserProfile } from "../api/user-api";
import Swal from "sweetalert2";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");


  const tabs = ["Profile",
    // "Security","Payment History"
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-3 xl:p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className=" p-3 xl:p-6">
          <div className="flex items-center gap-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-200"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>

          <div className="border-b border-gray-700">
            <nav className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === "Profile" && <ProfileSection />}
          {activeTab === "Security" && <SecuritySection />}
          {activeTab === "Payment History" && <PaymentHistorySection />}
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    username: "",
    dob: "",
    timeZone: "",
    address: "",
    postalCode: "",
    city: "",
    country: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.username) newErrors.username = "First Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.timeZone) newErrors.timeZone = "Time Zone is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country || formData.country === "Select country") newErrors.country = "Country is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: undefined })); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      Swal.fire({
        icon: "info",
        title: "Updating Profile...",
        text: "Please wait while we update your profile.",
        timer: 1200,
        showConfirmButton: false,
      });
      const res = await updateUserProfile(formData);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: res?.message || "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Disable button if any field is empty or submitting
  const isDisabled = Object.keys(validate()).length > 0 || isSubmitting;

  return (
    <div className="py-6">
      <h2 className="text-lg font-medium mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">
              Your email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-gray-900 border ${errors.email ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2">
              Title<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`appearance-none w-full bg-gray-900 border ${errors.title ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select title</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full bg-gray-900 border ${errors.username ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                Date Of Birth<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full bg-gray-900 border ${errors.dob ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">
                Preferred Time Zone<span className="text-gray-500 ml-1 text-xs">(?)</span>
              </label>
              <div className="relative">
                <select
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  className={`appearance-none w-full bg-gray-900 border ${errors.timeZone ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select time zone</option>
                  <option value="Asia/Calcutta">Asia/Calcutta</option>
                  <option value="GMT">GMT</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.timeZone && <p className="text-red-500 text-xs mt-1">{errors.timeZone}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6"></div>
        <h2 className="text-lg font-medium mb-6">Update Address</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">
              address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="address"
              className={`w-full bg-gray-900 border ${errors.address ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div>
            <label className="block text-sm mb-2">
              Postal Code<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className={`w-full bg-gray-900 border ${errors.postalCode ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`w-full bg-gray-900 border ${errors.city ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm mb-2">
                Country<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`appearance-none w-full bg-gray-900 border ${errors.country ? "border-red-500" : "border-gray-700"} rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Select country">Select country</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 font-medium text-sm ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isDisabled}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


