import codes from "../json/customResponseCodes.json";

function responseHandler(response) {
  console.log(codes);
  if (!response.ok) {
    return response.json().then(function(jsonResponse) {
      console.log(jsonResponse);
      throw Error(jsonResponse.message);
    });
  } else if (response.status == 222) {
    var error = new Error(
      "This version of this resource already exists in your Habitat!"
    );
    error.code = 222;
    throw error;
  } else {
    return response;
  }
}

export { responseHandler };
