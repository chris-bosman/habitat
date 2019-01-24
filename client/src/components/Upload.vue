<!-- Pug Template -->
<template lang="pug">
.modal-wrapper
    .modal(role="dialog" aria-labelledby="Habitat Upload" aria-describedy="Upload Terraform State Files to Habitat")
        .modal-header
            slot(name="header")
                .close-button
                    span(@click="close" aria-label="Close modal") &times;
        .modal-body
            slot(name="body")
              .container(v-if="isInitial || isSaving || isSuccess || isFailed")
                div(id="box" @dragenter="dragging=true" @dragend="dragging=false" @dragleave="dragging=false" @click="reset()" :class="['upload-box', dragging ? 'upload-box-over' : '']")
                  .text
                      span
                        template(v-if="isInitial")
                          p Drag & Drop or Click to Browse
                        template(v-if="isSaving")
                          p Uploading {{ fileCount }} files...
                        template(v-if="isSuccess")
                          p Uploaded {{ uploadedFiles.length }} file(s) successfully. #[a(href="javascript:void(0)" @click="reset()") Upload more files]
                        template(v-if="isFailed")
                          center
                            p Upload failed. #[a(href="javascript:void(0)" @click="reset()") Try again]
                          p(id="error") {{ uploadError }}
                  input(type="file" multiple id="upload-button" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event); fileCount = $event.target.files.length" accept=".tfstate" class="input-file")                                           
</template>


<!-- SCSS Styling-->
<style lang="scss">
.modal-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  box-sizing: border-box;
  background-color: rgb(30, 32, 29);
  width: 40vw;
  height: 40vh;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  box-sizing: inherit;
  display: flex;
}

.modal-header {
  justify-content: flex-end;
  height: 5%;
}

.modal-footer {
  justify-content: center;
  height: 4vh;
  margin-top: -4vh;
  margin-bottom: 1vh;
}

.modal-body {
  display: flex;
  box-sizing: inherit;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  box-sizing: inherit;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
}

.modal-body input {
  box-sizing: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.close-button span {
  margin: -4vh -2vw;
  float: right;
  font-size: 3.5vw;
  cursor: pointer;
}

.upload-box {
  box-sizing: inherit;
  display: flex;
  outline: 2px dashed rgb(235, 234, 229);
  background: transparent;
  cursor: pointer;
  width: 95%;
  height: 95%;
}

.upload-box:hover a,
.upload-box:hover #clickToBrowse {
  color: gray;
  text-decoration: underline;
}

.upload-box-over {
  background-color: gray;
}

.text {
  cursor: pointer;
  box-sizing: inherit;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

#error {
  font-size: 1.25vw;
  max-width: 20vw;
}

.text button:active {
  transform: translateY(2px);
  background-color: rgb(235, 234, 229);
}
</style>

<!-- Javascript-->
<script>
import { upload } from "@/js/uploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "Modal",
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.dragging = false;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    filesChange(event) {
      if (event.target.result = null) {
        throw Error("No files selected")
        this.currentStatus = STATUS_FAILED;
        this.uploadError = "Error: " + err.message;
      };
      this.currentStatus = STATUS_SAVING;
      var reader = new FileReader();
      var that = this;
      reader.onload = function parser(event) {
        var tfFile = JSON.parse(event.target.result);
        var lineage = tfFile.lineage;
        var serial = tfFile.serial;
        var resourceNames = Object.keys(tfFile.modules[0].resources);
        var dependencies = [];
        var resources = tfFile.modules[0].resources;

        for (var i = 0; i < resourceNames.length; i++) {
          var name = resourceNames[i];
          var type = name.split(".")[0];

          if (!name.startsWith("data")) {
            var resource = resources[name];
            var provider = resource.provider.split(".")[1];
            var attributeData = resource.primary.attributes;
            var attributes = Object.keys(attributeData);
            var resourceAttributesObject = {};
            for (var j = 0; j < attributes.length; j++) {
              var attributeName = attributes[j];
              var attributeNameOld = attributeName;
              if (attributeName.includes(".")) {
                attributeName = attributeName
                  .replace(/\./g, "_")
                  .replace(/[0-9]/g, "")
                  .replace("__", "_");
              }
              resourceAttributesObject[attributeName] =
                attributeData[attributeNameOld];
            }
          } else {
            dependencies.push(resources[name].primary.attributes.name);
          }
        }
        var resourceAttributes = JSON.stringify(resourceAttributesObject);

        const formData = new FormData();
        formData.append("resourceSerial", serial);
        formData.append("resourceLineage", lineage);
        formData.append("resourceType", type);
        formData.append("resourceName", name);
        formData.append("resourceProvider", provider);
        formData.append("resourceAttributes", resourceAttributes);
        formData.append("resourceDependencies", dependencies);
        that.save(formData);
      };
      reader.readAsText(event.target.files[0]);
    },
    save(formData) {
      upload(formData)
        .then(function(response) {
          return response.json().then(function(jsonResponse) {
            if (!response.ok) {
              console.log(jsonResponse);
              throw Error(jsonResponse.message);
            }

            return response;
          });
        })
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          //console.log(err);
          this.uploadError = "Error: " + err.message;
          this.currentStatus = STATUS_FAILED;
        });
    }
  },
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "stateFile",
      dragging: false
    };
  },
  mounted() {
    this.reset();
  }
};
</script>
