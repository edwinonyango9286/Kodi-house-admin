export const dateFormatter = (date: Date) => {
  try {
    if (date) {
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedDate = new Date(date).toLocaleDateString("en-US") + " " + new Date(date).toLocaleTimeString("en-KE", options);
      return formattedDate;
    }
  } catch (error) {
    console.log(error);
  }
};
