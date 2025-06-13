import React, { useEffect } from 'react'
import { getWithdrawalHistory } from '../api/user-api';

const PaymentHistorySection = () => {
 async function WithdrawalHistory() {
  const res = await getWithdrawalHistory()
  console.log(res)
 }


 useEffect(()=>{
  WithdrawalHistory();
 },[])

    const transactions = [
       
      ];
    
      return (
        <div className="py-6">
          <h2 className="text-lg font-medium mb-6">Payment History</h2>
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {transaction.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-blue-400 hover:text-blue-300">
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing 4 of 4 transactions
                </div>
                <div className="flex space-x-2">
                  <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm" disabled>
                    Previous
                  </button>
                  <button className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm" disabled>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-md font-medium mb-4">Payment Methods</h3>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-gray-400">Expires 04/26</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs">Default</span>
                <button className="text-gray-400 hover:text-gray-300 text-xs">Edit</button>
              </div>
            </div>
            
            <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
              Add Payment Method
            </button>
          </div> */}
        </div>
      );
}

export default PaymentHistorySection
