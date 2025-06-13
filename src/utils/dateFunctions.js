// function to format timestamp like "2021-08-01T00:00:00.000Z" to "Wed, 01 Aug 2021"
export const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toDateString();
    return formattedDate;
}


export const formatDateTime = (date) => {
    const dateObj = new Date(date);
  
    // Define arrays for the days of the week and months
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Get day of the week, day of the month, month, year
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const day = String(dateObj.getDate()).padStart(2, '0'); // Adds leading zero if day is a single digit
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    // Get hours, minutes, and seconds (in 24-hour format)
    const hours = String(dateObj.getHours()).padStart(2, '0'); // Adds leading zero if hours is a single digit
    const minutes = String(dateObj.getMinutes()).padStart(2, '0'); // Adds leading zero if minutes is a single digit
    const seconds = String(dateObj.getSeconds()).padStart(2, '0'); // Adds leading zero if seconds is a single digit
  
    // Return the formatted date with time
    return `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  };
  