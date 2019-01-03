<!-- Pug Template -->
<template lang="pug">
.modal-wrapper
    .modal(role="dialog" aria-labelledby="Habitat Upload" aria-describedy="Uplaod Terraform State Files to Habitat")
        .modal-header
            slot(name="header")
                .close-button
                    span(@click="close" aria-label="Close modal") &times;
        .modal-body
            slot(name="body")
                form(enctype="multipart/form-data" novalidate v-if="isInitial || isSaving")
                    input(type="file" :name="uploadFieldName" accept=".tfstate" class="input-file" multiple id="upload-button" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length")
                    label(for="upload-button")
                        .upload-box
                            center
                                .text(v-if="isInitial")
                                    p Drag & Drop or Click to Browse
                                .text(v-if="isSaving")
                                    span Uploading {{ fileCount }} files...
                                .text(v-if="isSuccess")
                                    span Uploaded {{ uploadedFiles.length }} file(s) successfully.
                                    p
                                        a(href="javascript:void(0)" @click="reset()") Click here to upload more files.
                                .text(v-if="isFailed")
                                    span Upload failed.
                                    p
                                        a(href="javascript:void(0)" @click="reset()") Click here to try again.
                                    pre {{ uploadError }}
        .modal-footer
            slot(name="footer")
                .submit-button
                    button(type="submit" name="action") Submit
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

form {
  box-sizing: inherit;
  width: 100%;
  height: 100%;
}

label {
  box-sizing: inherit;
  width: 99%;
  height: 85%;
  display: flex;
  justify-content: center;
}

.modal-body input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -5;
}

.close-button span {
  margin: -5vh -2vw;
  float: right;
  font-size: 3vw;
  cursor: pointer;
}

.upload-box {
  box-sizing: inherit;
  outline: 2px dashed rgb(235, 234, 229);
  background: transparent;
  cursor: pointer;
  width: 95%;
  height: 100%;
}

.text {
  box-sizing: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 13vh;
  padding-left: 4%;
  padding-right: 4%;
}

.text p {
  box-sizing: inherit;
  width: 100%;
}

.submit-button button {
  background-color: rgb(190, 189, 184);
  color: black;
  border: none;
  border-radius: 1px;
  width: 5vw;
  height: 3vh;
}

.text button:active {
  transform: translateY(2px);
  background-color: rgb(235, 234, 229);
}
</style>

<!-- Javascript-->
<script>
import { Upload } from "@/js/upload";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "Modal",
  data() {
    return {
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "stateFiles"
    };
  },
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
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      this.currentStatus = STATUS_SAVING;

      Upload(formData)
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();

      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
};
</script>
