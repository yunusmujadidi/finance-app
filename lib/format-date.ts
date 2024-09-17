export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",

    timeZone: "Asia/Jakarta",
  };
  return date.toLocaleString("id-ID", options);
}
