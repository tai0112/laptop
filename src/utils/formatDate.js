export const getCurrentDate = () => {
  const date = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return date;
};

export const formatDateToYyyyMmDd = (inputDate) => {
  const [year, month, day] = inputDate.split("-");
  return `${year}/${month}/${day}`;
};
