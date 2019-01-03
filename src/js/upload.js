import * as axios from "axios";

const BASE_URL = "http://localhost:3000";

function Upload(formData) {
  const url = `${BASE_URL}/files/upload`;
  return axios
    .post(url, formData)

    .then(x => x.data)
    .then(x =>
      x.map(file =>
        Object.assign({}, file, { url: `${BASE_URL}/files/${file.id}` })
      )
    );
}

export { Upload };
