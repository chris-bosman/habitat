import { tfStateParser } from "./tfStateParser";

var tfStateRegEx = new RegExp("(.+?).tfstate");

function parser(event, formData) {
  var file = event.target.files[0];
  var reader = new FileReader();

  if (tfStateRegEx.test(file.name)) {
    reader.onload = function tfState() {
      return tfStateParser(formData, reader);
    };
    reader.readAsText(file);
  }
}

export { parser };
