import { tfStateParser } from "./tfStateParser";

var tfStateRegEx = new RegExp("(.+?).tfstate");

function parser(event) {
  var file = event.target.files[0];
  var reader = new FileReader();

  if (tfStateRegEx.test(file.name)) {
    reader.onload = function tfState() {
      return tfStateParser(reader, event);
    };
    reader.readAsText(file);
  }
}

export { parser };
