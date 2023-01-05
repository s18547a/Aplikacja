export function getCurrentDate():string {
  let date = new Date();

  return date.toISOString().split("T")[0];
}
export function getCurrentHour():string{
  let date:Date = new Date();

  const hour:string = date.toISOString().split("T")[1].split(":")[0];
  const minute:string = date.toISOString().split("T")[1].split(":")[1];

  return `${hour}:${minute}`;
}
