import { useState } from 'react';
import { Key } from 'lucide-react';

export default function Rewards() {
  // Sample state to track if there are rewards or not
  const [rewards, setRewards] = useState([]);
  
  return (
    <div className=" text-white p-2 xl:p-8 min-h-screen">
      {/* Rewards Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-700 p-2 rounded-md">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
            <path d="M19.5 12C19.5 12.88 19.33 13.71 19.03 14.46L20.97 16.04C21.34 15.43 21.63 14.78 21.84 14.08C22.0353 13.3336 22.1313 12.5676 22.1267 11.8C22.1247 9.5566 21.3683 7.38166 19.997 5.631C18.6256 3.88034 16.7217 2.65575 14.57 2.15C14.06 2.02 13.53 1.93 13 1.89V3.95C13.2667 3.98333 13.5333 4.03333 13.8 4.1C15.47 4.52 16.92 5.53 17.9 6.94C18.5 7.77 18.93 8.73 19.18 9.77C19.4 10.62 19.5 11.3 19.5 12Z" fill="currentColor"/>
            <path d="M19.03 14.46C17.9114 16.9571 15.6099 18.7793 12.9409 19.3513C10.2719 19.9233 7.48979 19.1731 5.38 17.33L7.01 14.46C8.3272 15.6045 10.1328 16.0808 11.8778 15.7522C13.6228 15.4237 15.1021 14.328 15.9 12.79L19.03 14.46Z" fill="currentColor"/>
            <path d="M12 5C11.17 5 10.42 5.11 9.72 5.31L8.04 2.27C9.22 1.78 10.57 1.5 12 1.5C13.05 1.5 14.06 1.66 15 1.95V3.95C14.04 3.65 13.03 3.5 12 3.5V5Z" fill="currentColor"/>
            <path d="M5.38 17.33C3.97324 16.047 3.02937 14.3602 2.70241 12.5251C2.37544 10.6899 2.68464 8.80008 3.57929 7.13661C4.47394 5.47314 5.91003 4.12505 7.67254 3.28654C9.43505 2.44803 11.4249 2.16333 13.36 2.47L12.99 4.47C11.4548 4.22176 9.87352 4.45745 8.48108 5.14628C7.08864 5.83511 5.95579 6.943 5.23934 8.31104C4.52289 9.67909 4.26284 11.2362 4.4975 12.7603C4.73216 14.2843 5.44741 15.6977 6.54 16.79L5.38 17.33Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Rewards</h1>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Welcome To The Reward Section.</h2>
      </div>

      {/* Request Reward Box */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Ready to request your reward?</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-300 max-w-lg">
            Please click on the request reward button then proceed to fill out the required information,
            our team will reach out to you for further advancements.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md flex items-center gap-2">
            <Key size={18} />
            <span>Request Reward</span>
          </button>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-4 px-4 text-left">REFERENCE ID</th>
              <th className="py-4 px-4 text-left">REWARD TYPE</th>
              <th className="py-4 px-4 text-left">REQUESTED ON</th>
              <th className="py-4 px-4 text-left">METHOD</th>
              <th className="py-4 px-4 text-left">STATUS</th>
              <th className="py-4 px-4 text-left">AMOUNT</th>
              <th className="py-4 px-4 text-left">ADMIN NOTE</th>
              <th className="py-4 px-4 text-left">CERTIFICATE</th>
              <th className="py-4 px-4 text-left">INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {rewards.length > 0 ? (
              rewards.map((reward, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="py-4 px-4">{reward.id}</td>
                  <td className="py-4 px-4">{reward.type}</td>
                  <td className="py-4 px-4">{reward.requestedOn}</td>
                  <td className="py-4 px-4">{reward.method}</td>
                  <td className="py-4 px-4">{reward.status}</td>
                  <td className="py-4 px-4">{reward.amount}</td>
                  <td className="py-4 px-4">{reward.adminNote}</td>
                  <td className="py-4 px-4">{reward.certificate}</td>
                  <td className="py-4 px-4">{reward.invoice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-400">
                  No Rewards Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Chat button at bottom right */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-blue-700 hover:bg-blue-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5286 20 9.11938 19.7127 7.86212 19.1913L3 20L4.3 16.1C3.47291 14.8902 3 13.4872 3 12C3 7.58172 7.02944 4 12 4C16.97 4 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}