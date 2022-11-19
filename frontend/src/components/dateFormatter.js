//format the date into a readable format
export const dateFormat = (date) => {
  const d = new Date(date);
  const input_date = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const newDate = input_date + "/" + month + "/" + year;
  return newDate;

};