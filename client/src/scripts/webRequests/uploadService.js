var tfStateRegEx = new RegExp("(.+?).tfstate");

function upload(formData, event) {
  var file = event.target.files[0];
  var url;

  if (tfStateRegEx.test(file.name)) {
    url = `${process.env.VUE_APP_SERVER}/api/v1/tfstate`;
  }
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: formData
  });
}

export { upload };
