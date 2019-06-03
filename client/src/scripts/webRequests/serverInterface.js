import { axiosInstance } from "./axiosInstance";

var tfStateRegEx = new RegExp("(.+?).tfstate");

function uploadResource(formData, event) {
  var url;
  var file = event.target.files[0];

  if (tfStateRegEx.test(file.name)) {
    url = `${process.env.VUE_APP_SERVER}/api/v1/tfstate`;
  }

  return axiosInstance({
    url: url,
    method: "POST",
    crossDomain: true,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

function createOrg(orgName) {
  return axiosInstance({
    url: `${process.env.VUE_APP_SERVER}/api/v1/organizations/create`,
    method: "POST",
    crossDomain: true,
    data: {
      organization: orgName
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function deleteOrg() {
  return axiosInstance({
    url: `${process.env.VUE_APP_SERVER}/api/v1/organizations/delete`,
    method: "POST",
    crossDomain: true,
    data: null
  });
}

export { uploadResource, createOrg, deleteOrg };
