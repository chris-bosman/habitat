import * as axios from "axios";

const BASE_URL = "http://localhost:3000";

function Upload(formData) {
  console.log(formData);
  const url = `${BASE_URL}/upload`;
  return axios
    .post(url, formData)

    .then(x => x.data)
    .then(x =>
      x.map(stateFile =>
        Object.assign({}, stateFile, {
          url: `${BASE_URL}/upload/${stateFile.id}`
        })
      )
    );
}

export { Upload };
