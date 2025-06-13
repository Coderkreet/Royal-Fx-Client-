import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const safeGetStorageItem = (key, defaultValue = null) => {
  try {
    const value = sessionStorage.getItem(key) || localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(`Error accessing ${key}:`, e);
    return defaultValue;
  }
};

export const saveCurrentUser = (userId) => {
  try {
    sessionStorage.setItem("currentUser", JSON.stringify(userId));
  } catch (e) {
    console.error("Error saving current user:", e);
  }
};

export const saveToken = (userId, token, role) => {
  const currentTokens = safeGetStorageItem("authTokens", {});
  currentTokens[userId] = { token, role };
  try {
    localStorage.setItem("authTokens", JSON.stringify(currentTokens));
  } catch (e) {
    console.error("Error saving token:", e);
  }
  saveCurrentUser(userId);
};

export const getToken = (userId) => {
  const currentTokens = safeGetStorageItem("authTokens");
  return currentTokens ? currentTokens[userId] : null;
};

export const getCurrentUser = () => {
  const currentUser = safeGetStorageItem("currentUser");
  return currentUser ? getToken(currentUser) : null;
};

export const removeToken = (userId) => {
  const currentTokens = safeGetStorageItem("authTokens", {});
  sessionStorage.removeItem("currentUser");
  if (currentTokens && currentTokens[userId]) {
    delete currentTokens[userId];
    try {
      localStorage.setItem("authTokens", JSON.stringify(currentTokens));
    } catch (e) {
      console.error("Error removing token:", e);
    }
  }
};

export const maskTwoLetters = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 8) {
    return walletAddress;
  }

  const firstFourChars = walletAddress.slice(0, 2);
  const lastFourChars = walletAddress.slice(-2);
  const maskedChars = "*".repeat(4);

  return `${firstFourChars}${maskedChars}${lastFourChars}`;
};

export const imageBase64Convertor = (e, setFunc) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      const base64StringArray = base64String.split("base64,")[1];
      setFunc(base64StringArray);
    };
    reader.readAsDataURL(file);
  }
};

export const camelCaseToReadable = (str) => {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (match) => match.toUpperCase());
};

export function formatRupeesWithCommas(amount) {
  return amount?.toLocaleString("en-IN");
}

// function to format timestamp like "2021-08-01T00:00:00.000Z" to "Wed, 01 Aug 2021"
export const formatDate = (date) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toDateString();
  return formattedDate;
};

export const formatDateTime = (date) => {
  const dateObj = new Date(date);

  // Define arrays for the days of the week and months
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get day of the week, day of the month, month, year
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  const day = String(dateObj.getDate()).padStart(2, "0"); // Adds leading zero if day is a single digit
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  // Get hours, minutes, and seconds (in 24-hour format)
  const hours = String(dateObj.getHours()).padStart(2, "0"); // Adds leading zero if hours is a single digit
  const minutes = String(dateObj.getMinutes()).padStart(2, "0"); // Adds leading zero if minutes is a single digit
  const seconds = String(dateObj.getSeconds()).padStart(2, "0"); // Adds leading zero if seconds is a single digit

  // Return the formatted date with time
  return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
};

export const getMoneySymbol = () => {
  return "$";
};

export const maskWalletAddress = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 10) {
    return walletAddress;
  }

  const lastFourChars = walletAddress.slice(-4);
  const maskedChars = "**** ".repeat(2);

  return `${maskedChars}${lastFourChars}`;
};
export const maskEmailAddress = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 10) {
    return walletAddress;
  }

  const firstFourChars = walletAddress.slice(0, 4);
  const centerFourChars = walletAddress.slice(6, 8);
  const lastFourChars = walletAddress.slice(-4);
  const maskedChars = "*".repeat(3);

  return `${firstFourChars}${maskedChars}${centerFourChars}${maskedChars}${lastFourChars}`;
};

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export const checkImageUrl = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
