import Vue from "vue";

var tfStateRegEx = new RegExp("(.+?).tfstate");
var headers = {};

export default {
  async getToken() {
    let accessToken = await Vue.prototype.$auth.getAccessToken();
    return headers({
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`
    });
  }
};

function upload(formData, event) {
  var file = event.target.files[0];
  var url;

  if (tfStateRegEx.test(file.name)) {
    url = `${process.env.VUE_APP_SERVER}/api/v1/tfstate`;
  }
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: formData
  });
}

export { upload };
