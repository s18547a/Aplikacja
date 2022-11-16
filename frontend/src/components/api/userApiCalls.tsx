const baseUrl = "http://localhost:8000/users";

export function logIn(user) {
  const url = `${baseUrl}`;
  const userJSON = JSON.stringify(user); //convert javascript to JSON
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userJSON,
  };
  const promise = fetch(url, options);
  return promise;
}
