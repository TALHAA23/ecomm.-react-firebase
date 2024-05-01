export default function formatDate(date) {
  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  // Return the formatted date string
  return `${monthNames[monthIndex]} ${day}, ${year}`;
}
