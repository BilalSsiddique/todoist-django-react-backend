const dateFormatter = () => {
  const originalDate = new Date();
  const formattedDate = new Date(
    Date.UTC(
      originalDate.getFullYear(),
      originalDate.getMonth(),
      originalDate.getDate()
    )
  )
    .toISOString()
    .split("T")[0];
  return {
    formattedDate,
  };
};

export default dateFormatter;
