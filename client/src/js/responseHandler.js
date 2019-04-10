import codes from "../json/customResponseCodes.json";

function responseHandler(response) {
  var customResponses = codes.responseCodes.map(a => a.code);
  if (customResponses.indexOf(response.status) !== -1) {
    var i;
    for (i = 0; i < codes.responseCodes.length; i++) {
      if (codes.responseCodes[i].code == response.status) {
        var err = new Error(codes.responseCodes[i].response);
        err.code = codes.responseCodes[i].code;
        throw err;
      }
    }
  } else {
    if (!response.ok) {
      console.log(response);
      return response;
    }
  }
}

export { responseHandler };
