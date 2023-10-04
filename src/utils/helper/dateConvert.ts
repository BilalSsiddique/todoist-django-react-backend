const dateConvert = (inputDate: string | Date) => {
  let dateObj;
  if (typeof inputDate === "string") {
    dateObj = new Date(inputDate);

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date string");
    }
  } else if (inputDate instanceof Date) {
    dateObj = inputDate;
  } else {
    dateObj = new Date();
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const due_date = `${year}-${month}-${day}`;

  return {
    due_date,
  };
};

export default dateConvert;
