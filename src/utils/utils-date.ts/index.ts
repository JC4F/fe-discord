// mm/dd/yyyy
export function isValidDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const date = new Date(Date.parse(dateString));
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  console.log(formattedDate, dateString);
  return formattedDate.toString() === dateString;
}
