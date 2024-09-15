export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",

    timeZone: "Asia/Jakarta",
  };
  return date.toLocaleString("id-ID", options);
}
