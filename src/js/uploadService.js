const axios = require("axios");

const BASE_URL = "http://localhost:3000";

function submitFile(formData) {
  const url = `${BASE_URL}/upload`;
  return (
    axios
      .post(url, formData)
      // get data
      .then(x => x.data)
      // add url field
      .then(x =>
        x.map(stateFile =>
          Object.assign({}, stateFile, {
            url: `${BASE_URL}/files/${stateFile.id}`
          })
        )
      )
  );
}

export { submitFile };
