export function getCurrentDate() {
  let date = new Date();

  return date.toISOString().split("T")[0];
}
export function getCurrentHour() {
  let date = new Date();

  const hour = date.toISOString().split("T")[1].split(":")[0];
  const minute = date.toISOString().split("T")[1].split(":")[1];

  return `${hour}:${minute}`;
}
