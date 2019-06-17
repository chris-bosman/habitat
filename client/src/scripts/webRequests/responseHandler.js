import codes from "../../data/json/customResponseCodes.json";
import store from "../../store";

var requestResult, requestSuccess;
var customResponses = codes.responseCodes.map(a => a.code);

function errorHandler(error) {
  console.log(error);

  var errorMessage = error.message;
  var errorNumber = errorMessage.substring(errorMessage.lastIndexOf(" ") + 1);
  var errorCode = Number(errorNumber);

  if (customResponses.indexOf(errorCode) !== -1) {
    for (var i = 0; i < codes.responseCodes.length; i++) {
      if (codes.responseCodes[i].code == errorCode) {
        requestResult = new Error(codes.responseCodes[i].response);
        requestSuccess = false;
        requestResult.code = codes.responseCodes[i].code;
      }
    }
  } else {
    requestResult = error.message;
    requestSuccess = false;
  }
  store.dispatch("requestResult", { requestSuccess, requestResult });
}

function responseHandler(response) {
  console.log(response);

  if (customResponses.indexOf(response.status) !== -1) {
    for (var i = 0; i < codes.responseCodes.length; i++) {
      if (codes.responseCodes[i].code == response.status) {
        if (response.status > 399) {
          requestResult = new Error(codes.responseCodes[i].response);
          requestSuccess = false;
          requestResult.code = codes.responseCodes[i].code;
        } else {
          requestResult = codes.responseCodes[i].response;
          requestSuccess = true;
        }
      }
    }
  } else {
    requestResult = response.data.message;
    requestSuccess = true;
  }
  store.dispatch("requestResult", { requestSuccess, requestResult });
}

export { responseHandler, errorHandler };
