import store from "../../store";

var useResultModal = false;
var requestSuccess = null;
var requestResult = null;

function clearResponseState() {
  store.dispatch("triggerResults", useResultModal);
  store.dispatch("requestResult", { requestSuccess, requestResult });
}

export { clearResponseState };
