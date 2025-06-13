import React, { useState } from 'react';
import zicZacImage from '../../assets/product/zic-zack.png';

const SubscribeSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Basic form validation
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email) {
      setError('Please fill in both fields.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="px-6 sm:px-12 lg:px-32 py-12 lg:py-20 space-y-8 bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 shadow-xl">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left text-white">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Get the latest news, product updates, and
            <br />
            <span className="relative inline-block">
              exclusive deals
              {/* <img
                src={zicZacImage}
                alt="underline decoration"
                className="hidden lg:block absolute -bottom-2 left-0 w-full h-auto"
              /> */}
            </span>{' '}
            in your inbox!
          </h2>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col gap-6 flex-1 w-full lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="flex flex-col w-full lg:w-1/2">
              <label
                className="text-white text-sm lg:text-base font-medium mb-2"
                htmlFor="name"
              >
                First Name<span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 bg-white dark:bg-gray-800 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 text-base lg:text-lg transition duration-200"
                required
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <label
                className="text-white text-sm lg:text-base font-medium mb-2"
                htmlFor="email"
              >
                Email<span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-white dark:bg-gray-800 dark:text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 text-base lg:text-lg transition duration-200"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-700 text-white py-3 px-6 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-300 text-base lg:text-lg font-semibold"
          >
            Subscribe
          </button>
        </form>

        {/* Error and Success Messages */}
        {error && (
          <p className="text-red-400 text-sm lg:text-base mt-4 text-center lg:text-left animate-pulse">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-400 text-sm lg:text-base mt-4 text-center lg:text-left animate-fade-in">
            Thank you for subscribing, {name}!
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscribeSection;