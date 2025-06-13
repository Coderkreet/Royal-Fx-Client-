export const tokenOptions = [
  "Bitcoin",
  "Ethereum",
  "Nebulux",
  "XRP",
  "Solana",
  "Litecoin",
  "Dogecoin",
];
export const tokenOptionsWithIcon = [
  {
    name: "Bitcoin",
    imgSrc: "https://img.icons8.com/fluency/48/bitcoin.png",
    symbol: "BTCUSDT",
  },
  {
    name: "Ethereum",
    imgSrc: "https://img.icons8.com/fluency/48/ethereum.png",
    symbol: "ETHUSDT",
  },
  //   {
  //     name: "Tether (USDT)",
  //     imgSrc: "https://img.icons8.com/color/48/tether--v1.png",
  //     symbol: "USDTUSDT",
  //   },
  {
    name: "Binance Coin (BNB)",
    imgSrc: "https://img.icons8.com/arcade/64/binance.png",
    symbol: "BNBUSDT",
  },
  {
    name: "Tron (TRX)",
    imgSrc: "https://img.icons8.com/cotton/64/tron.png",
    symbol: "TRXUSDT",
  },
  {
    name: "Cardano (ADA)",
    imgSrc: "https://img.icons8.com/fluency/48/cardano.png",
    symbol: "ADAUSDT",
  },
  {
    name: "Solana (SOL)",
    imgSrc: "https://img.icons8.com/nolan/64/solana.png",
    symbol: "SOLUSDT",
  },
  {
    name: "Dogecoin (DOGE)",
    imgSrc: "https://img.icons8.com/ios-filled/50/dogecoin.png",
    symbol: "DOGEUSDT",
  },
];

export const fetchTokenDetails = async (coin) => {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin.symbol}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return {
      name: coin.name,
      imgSrc: coin.imgSrc,
      symbol: coin.symbol,
      price: parseFloat(data.price).toFixed(2),
    };
  } catch (error) {
    console.error("Error fetching token details:", error);
    return null;
  }
};

export const calculateTokenInUsdtAmount = async (price, usdtAmount, name) => {
  if (price) {
    const amount = usdtAmount / price;
    // console.log(
    //   `For ${usdtAmount} USDT, you can buy ${amount.toFixed(6)} ${name}.`
    // );
    return amount;
  } else {
    console.log("Unable to fetch token price");
    return null;
  }
};
export const calculateTokenToUsdtAmount = async (price, tokenAmount, name) => {
  if (price) {
    const usdtAmount = tokenAmount * price;
    // console.log(
    //   `For ${tokenAmount} ${name}, you can get ${usdtAmount.toFixed(2)} USDT.`
    // );
    return usdtAmount;
  } else {
    console.log("Unable to fetch token price");
    return null;
  }
};

export const calculateProfitOrLoss = ({
  purchaseValue,
  currentValue,
  holdingToken,
}) => {
  const totalPurchaseCost = purchaseValue * holdingToken;
  const currentValueOfHolding = currentValue * holdingToken;
  const profitOrLoss = currentValueOfHolding - totalPurchaseCost;
  return profitOrLoss;
};

// const result = calculateProfitOrLoss({
//   purchaseValue: 630.02,
//   currentValue: 626.3,
//   holdingToken: 1,
// });

// console.log("Profit or Loss Value (in USDT):", result);

import axios from "axios";

// Fetch data with caching mechanism
export const fetchDataWithCache = async () => {
  const cacheKey = "cryptoData";
  const cacheTimeKey = "cryptoDataTimestamp";
  const cacheExpiry = 60 * 1000; // Cache for 1 minute

  const cachedData = localStorage.getItem(cacheKey);
  const cachedTime = localStorage.getItem(cacheTimeKey);

  const currentTime = new Date().getTime();

  // If cached data exists and is still valid, use it
  if (cachedData && cachedTime && currentTime - cachedTime < cacheExpiry) {
    console.log("Using cached data");
    return JSON.parse(cachedData);
  }

  try {
    // Fetch live data from API if cache is expired or not present
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          // ids: 'bitcoin,binancecoin,ethereum',
          ids: "bitcoin,binancecoin,ethereum,dogecoin,ripple,litecoin",
          order: "market_cap_desc",
        },
      }
    );

    // Cache the response data and timestamp
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    localStorage.setItem(cacheTimeKey, currentTime.toString());

    console.log("Fetched live data");
    return response.data;
  } catch (error) {
    console.error("Error fetching live data:", error);
    // Return cached data in case of error (fallback)
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
};

export const fetchAllMarketData = async () => {
  const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
  const data = await response.json();
  return data;
};


// fetchAllMarketData();

// Update every second
// const interval = setInterval(fetchAllMarketData, 1000);
// return () => clearInterval(interval);


export const fetchSingleCoinData = async (symbol) => {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single coin data:", error);
    return null;
  }
};


export const fetchHistoricalKlines = async (symbol, interval = "1h", limit = 48) => {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
    );
    const data = await response.json();
    return data; // Each entry: [time, open, high, low, close, volume, ...]
  } catch (error) {
    console.error("Error fetching historical klines:", error);
    return [];
  }
};

// Fetch token options with icon from CoinGecko API
export const fetchTokenOptionsWithIcon = async () => {
  // List of CoinGecko IDs for your tokens
  const ids = [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "tron",
    "cardano",
    "solana",
    "dogecoin"
  ];
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: ids.join(","),
        },
      }
    );
    // Map API data to your format
    return response.data.map((coin) => ({
      name: coin.name,
      imgSrc: coin.image,
      symbol: (coin.symbol + "USDT").toUpperCase(),
    }));
  } catch (error) {
    console.error("Error fetching token options:", error);
    return [];
  }
};
