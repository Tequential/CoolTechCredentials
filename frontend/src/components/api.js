//fetch data from Atlas Cluster
export const api = (url, dataMethod, data) => {
  return fetch(url, {
    method: dataMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json());

};
//fetch data using the JWT
export const apiToken = (url, dataMethod, token) => {
  return fetch(url, {
    method: dataMethod,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json()); // parses response to JSON 

};

