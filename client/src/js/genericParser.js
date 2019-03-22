import { tfStateParser } from "./tfStateParser";

function parser(event, formData) {
  var reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.onload = tfStateParser(event, formData);
}

export { parser };
