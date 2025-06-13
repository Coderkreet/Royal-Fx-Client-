import { useState } from 'react';
import { ChevronUp, Trophy, Award, Clock, BarChart3 } from 'lucide-react';

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('all');
  
  // Top performers data
  const topPerformers = [
    {
      title: 'Highest Reward',
      name: 'Jagroop D',
      icon: <Trophy className="h-5 w-5 text-white" />,
      accountSize: '$100,000',
      value: '$140,354.4',
      percent: '(140.35%)',
      color: 'bg-gradient-to-br from-purple-600 to-blue-700'
    },
    {
      title: 'Best Win Ratio',
      name: 'Mohamed A',
      icon: <Award className="h-5 w-5 text-white" />,
      accountSize: '$100,000',
      value: '100%',
      percent: '',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700'
    },
    {
      title: 'Fastest Evaluation',
      name: 'Mayank S',
      icon: <Clock className="h-5 w-5 text-white" />,
      accountSize: '$10,000',
      value: '1d 0h 1m 10s',
      percent: '',
      color: 'bg-gradient-to-br from-blue-500 to-blue-700'
    }
  ];
  
  // Podium data
  const podiumData = [
    {
      position: 2,
      name: 'Emeka I',
      country: 'NG',
      amount: '$24,156.6',
      accountSize: '$100,000',
      symbol: 'XAUUSD',
      closePrice: '3224.58',
      openPrice: '3288.17',
      backgroundColor: '',
      positionColor: 'text-cyan-400',
      medal: 'silver'
    },
    {
      position: 1,
      name: 'Thorvid D',
      country: 'CH',
      amount: '$26,037.38',
      accountSize: '$100,000',
      symbol: 'XAUUSD',
      closePrice: '3300.01',
      openPrice: '3212.85',
      backgroundColor: 'bg-gradient-to-b from-yellow-600/60 to-yellow-700/30',
      positionColor: 'text-yellow-400',
      medal: 'gold'
    },
    {
      position: 3,
      name: 'Emeka I',
      country: 'NG',
      amount: '$24,019.8',
      accountSize: '$100,000',
      symbol: 'XAUUSD',
      closePrice: '3324.62',
      openPrice: '3287.85',
      backgroundColor: '',
      positionColor: 'text-green-400',
      medal: 'bronze'
    }
  ];
  
  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Mahmoud M', country: 'JO', accountSize: '$5,000', profit: '$958,961.40', profitPercent: '19870.23%', medal: 'gold' },
    { rank: 2, name: 'Syed A', country: 'ZA', accountSize: '$5,000', profit: '$5,018.63', profitPercent: '100.38%', medal: 'silver' },
    { rank: 3, name: 'Emeka I', country: 'NG', accountSize: '$100,000', profit: '$25,595.39', profitPercent: '25.50%', medal: 'bronze' },
    { rank: 4, name: 'Lukas U', country: 'CH', accountSize: '$25,000', profit: '$17,666.15', profitPercent: '70.66%', medal: 'none' },
    { rank: 5, name: 'Daril S', country: 'PL', accountSize: '$5,000', profit: '$2,420.76', profitPercent: '48.42%', medal: 'none' },
    { rank: 6, name: 'Thanatcha Y', country: 'TH', accountSize: '$10,000', profit: '$4,354.51', profitPercent: '43.57%', medal: 'none' },
    { rank: 7, name: 'Rupen J', country: 'IN', accountSize: '$10,000', profit: '$4,065.15', profitPercent: '40.65%', medal: 'none' },
    { rank: 8, name: 'Ramswarup R', country: 'IN', accountSize: '$5,000', profit: '$2,017.65', profitPercent: '40.35%', medal: 'none' },
    { rank: 9, name: 'MRR U', country: '', accountSize: '$5,000', profit: '$2,000', profitPercent: '40.00%', medal: 'none' },
    { rank: 10, name: 'Volodymyr F', country: 'UA', accountSize: '$5,000', profit: '$1,973.24', profitPercent: '39.46%', medal: 'none' },
    { rank: 11, name: 'Wei Ting K', country: 'GB', accountSize: '$100,000', profit: '$37,150.15', profitPercent: '37.15%', medal: 'none' },
    { rank: 12, name: 'Furkan F', country: 'TR', accountSize: '$25,000', profit: '$9,250.15', profitPercent: '37.00%', medal: 'none' },
    { rank: 13, name: 'Elias Abel R', country: 'US', accountSize: '$50,000', profit: '$16,670.38', profitPercent: '33.34%', medal: 'none' },
    { rank: 14, name: 'Md A', country: 'IN', accountSize: '$10,000', profit: '$3,226.2', profitPercent: '32.26%', medal: 'none' },
    { rank: 15, name: 'Maxine P', country: 'DE', accountSize: '$50,000', profit: '$15,782.14', profitPercent: '31.56%', medal: 'none' },
    { rank: 16, name: 'Ever C', country: 'US', accountSize: '$25,000', profit: '$7,853.39', profitPercent: '31.41%', medal: 'none' },
    { rank: 17, name: 'Firetoz T', country: 'EC', accountSize: '$5,000', profit: '$1,459.85', profitPercent: '29.19%', medal: 'none' },
    { rank: 18, name: 'Amit Y', country: 'IN', accountSize: '$5,000', profit: '$1,377.18', profitPercent: '27.54%', medal: 'none' },
    { rank: 19, name: 'KIRILL O', country: 'BY', accountSize: '$5,000', profit: '$1,343.89', profitPercent: '26.88%', medal: 'none' },
    { rank: 20, name: 'Akash A', country: 'IN', accountSize: '$5,000', profit: '$1,342.82', profitPercent: '26.86%', medal: 'none' },
    { rank: 21, name: 'Youssef A', country: 'DE', accountSize: '$10,000', profit: '$2,671.93', profitPercent: '26.72%', medal: 'none' },
    { rank: 22, name: 'Douglas A E', country: 'ES', accountSize: '$10,000', profit: '$2,528.19', profitPercent: '25.28%', medal: 'none' },
    { rank: 23, name: 'Srojan P', country: 'IN', accountSize: '$5,000', profit: '$1,258.49', profitPercent: '25.14%', medal: 'none' },
    { rank: 24, name: 'Naim D', country: 'FR', accountSize: '$10,000', profit: '$2,475.36', profitPercent: '24.75%', medal: 'none' },
    { rank: 25, name: 'Gyula S', country: 'HU', accountSize: '$100,000', profit: '$22,498.44', profitPercent: '22.49%', medal: 'none' }
  ];
  
  const renderMedal = (type) => {
    if (type === 'gold') {
      return (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 border-2 border-yellow-400">
          <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    } else if (type === 'silver') {
      return (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-400 bg-opacity-20 border-2 border-gray-300">
          <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    } else if (type === 'bronze') {
      return (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-amber-700 bg-opacity-20 border-2 border-amber-600">
          <svg className="w-6 h-6 text-amber-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-700 bg-opacity-20 border-2 border-gray-600">
          <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      );
    }
  };
  
  return (
    <div className=" text-white p-4 min-h-screen">
      {/* Leaderboard Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-700 p-2 rounded-md">
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
      </div>
      
      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {topPerformers.map((performer, index) => (
          <div 
            key={index} 
            className={`${performer.color} rounded-lg p-4 relative overflow-hidden`}
          >
            <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
              {performer.icon}
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-2 flex items-center gap-2">
                {performer.icon}
                <span className="text-sm font-medium">{performer.title}</span>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-bold">{performer.name}</h3>
                <p className="text-sm opacity-80">{performer.accountSize}</p>
                <p className="text-lg font-bold mt-1">
                  {performer.value} <span className="text-sm font-normal">{performer.percent}</span>
                </p>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="w-16 h-16 opacity-20">
                  <svg viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 0C48.4 0 56.4 2.34 63.03 6.72C69.66 11.1 74.64 17.28 77.31 24.44C79.99 31.61 80.21 39.37 77.95 46.67C75.7 53.96 71.09 60.37 64.75 65.04L57.83 58.12C62.34 54.73 65.67 50.04 67.31 44.72C68.95 39.39 68.79 33.71 66.86 28.48C64.93 23.25 61.33 18.72 56.62 15.52C51.9 12.32 46.31 10.61 40.59 10.68L40 10.69V40L17.42 62.58C12.66 59.36 8.72 55.13 5.87 50.21C3.03 45.28 1.35 39.79 0.96 34.13C0.57 28.46 1.47 22.79 3.63 17.54C5.78 12.29 9.12 7.61 13.38 3.88C17.65 0.15 22.73 -0.53 28.03 0.06C33.33 0.64 38.67 2.5 43.57 5.5L40 10.69C36.54 8.61 32.73 7.21 28.76 6.57C24.8 5.92 20.76 6.03 16.85 6.89C12.94 7.75 9.26 9.33 6.06 11.55C2.86 13.77 0.23 16.56 -1.65 19.78L-1.62 19.83C-3.66 23.39 -4.85 27.3 -5.13 31.32C-5.41 35.34 -4.76 39.36 -3.24 43.13C-1.72 46.89 0.63 50.29 3.66 53.11C6.7 55.92 10.35 58.09 14.37 59.47L40 33.83L40 0Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Podium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {podiumData.map((item, index) => (
          <div 
            key={index} 
            className={`bg-gray-800 rounded-lg p-4 relative overflow-hidden ${item.backgroundColor}`}
          >
            <div className={`absolute top-4 left-4 text-6xl font-bold ${item.positionColor}`}>{item.position}<sup>nd</sup></div>
            <div className="flex items-start mt-14">
              <div className="mr-3">
                {renderMedal(item.medal)}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <span className="ml-2 text-xs px-2 py-0.5 bg-gray-700 rounded">{item.country}</span>
                </div>
                <div className="text-xs bg-green-500 bg-opacity-20 text-green-400 px-2 py-0.5 rounded inline-block mt-1">Buy</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-400">{item.symbol}</div>
              <div className="flex justify-between items-center mt-1">
                <div>
                  <div className="text-xs text-gray-400">Close Price</div>
                  <div>{item.closePrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Open Price</div>
                  <div>{item.openPrice}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-400">{item.accountSize}</div>
              <div className="text-xl font-bold text-green-400">{item.amount}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Best Accounts in Profit */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold">Best Accounts In Profit</h2>
        </div>
        
        {/* Account Size Filter */}
        <div className="flex flex-wrap gap-2 mb-4 text-sm overflow-x-auto pb-2">
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === '$5,000' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('$5,000')}
          >
            $5,000
          </button>
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === '$10,000' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('$10,000')}
          >
            $10,000
          </button>
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === '$25,000' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('$25,000')}
          >
            $25,000
          </button>
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === '$50,000' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('$50,000')}
          >
            $50,000
          </button>
          <button 
            className={`px-3 py-1 rounded-md whitespace-nowrap ${activeTab === '$100,000' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setActiveTab('$100,000')}
          >
            $100,000
          </button>
        </div>
        
        {/* Leaderboard Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-4 py-3 px-4 text-sm text-gray-400">
              <div>User</div>
              <div className="text-center">Account Size</div>
              <div className="text-center">Profit</div>
              <div className="text-center">Profit%</div>
            </div>
            
            {leaderboardData.map((user, index) => (
              <div 
                key={index} 
                className="grid grid-cols-4 items-center py-3 px-4 border-t border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <div className="text-gray-400 w-6">{user.rank}</div>
                  {renderMedal(user.medal)}
                  <div>
                    <div className="flex items-center flex-wrap">
                      <span className="break-words">{user.name}</span>
                      {user.country && (
                        <span className="ml-2 text-xs px-1 bg-gray-700 text-gray-400 rounded whitespace-nowrap">{user.country}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center whitespace-nowrap">{user.accountSize}</div>
                <div className="text-center flex items-center justify-center gap-1 text-green-400 whitespace-nowrap">
                  <ChevronUp className="w-4 h-4" />
                  {user.profit}
                </div>
                <div className="text-center flex items-center justify-center gap-1 text-green-400 whitespace-nowrap">
                  <ChevronUp className="w-4 h-4" />
                  {user.profitPercent}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-right text-xs text-gray-400 mt-2">
          *Data Is Populated As And When Traders Are Created
        </div>
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