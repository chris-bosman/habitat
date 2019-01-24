const BASE_URL = "http://localhost:3000";

function upload(formData) {
  const url = `${BASE_URL}/upload`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  });
}

export { upload };
