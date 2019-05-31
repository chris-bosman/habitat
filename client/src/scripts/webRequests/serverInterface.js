import Vue from "vue";
import axios from "axios";
import { responseHandler } from "./responseHandler";
import store from "../../store";

var tfStateRegEx = new RegExp("(.+?).tfstate");

async function uploadResource(formData, event) {
  const accessToken = await Vue.prototype.$auth.getAccessToken();

  var url;
  var file = event.target.files[0];

  if (tfStateRegEx.test(file.name)) {
    url = `${process.env.VUE_APP_SERVER}/api/v1/tfstate`;
  }

  for (var pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }

  return axios({
    url: url,
    method: "POST",
    crossDomain: true,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => {
      var uploadSuccess, responseResult;
      console.log(response.data);

      responseHandler(response);
      uploadSuccess = true;
      responseResult = "Success!";
      store.dispatch("uploadResult", { uploadSuccess, responseResult });
    })
    .catch(error => {
      var uploadSuccess, responseResult;

      uploadSuccess = false;
      responseResult = `Error: ${error.message}`;
      store.dispatch("uploadResult", { uploadSuccess, responseResult });
    });
}

async function createOrg(orgName, event) {
  const user = await Vue.prototype.$auth.getUser();
  const accessToken = await Vue.prototype.$auth.getAccessToken();
  console.log(orgName);
  console.log(event);
  console.log(user.email);

  return axios({
    url: `${process.env.VUE_APP_SERVER}/api/v1/organizations`,
    method: "POST",
    crossDomain: true,
    data: `{organization: ${orgName}, user: ${user.email}}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.message);
    });
}

export { uploadResource, createOrg };
