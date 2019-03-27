const BASE_URL = "http://localhost:3000";

function upload(formData) {
  const url = `${BASE_URL}/upload`;
  try {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });
  } catch (err) {
    console.log(err);
  }
}

export { upload };
