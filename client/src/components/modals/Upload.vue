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
        .container(v-if="isInitial || isSaving || isSuccess || isFailed || isServerResponse")
          div(@dragover="dragging=true" @dragleave="dragging=false" @click="reset()" :class="['upload-box', { 'upload-box-over': dragging }]")
            .text
              span
                template(v-if="isInitial")
                  p Drag & Drop or &nbsp;
                    div(id="clickable") Click to Browse
                template(v-if="isSaving")
                  p Uploading {{ fileCount }} files...
                template(v-if="isServerResponse && this.$store.state.requestSuccess")
                  p Uploaded {{ fileCount }} file(s) successfully. 
                  center
                    p #[a(id="clickable" href="javascript:void(0)" @click="reset()") Upload more files?]
                template(v-if="isFailed")
                  p(class="error") {{ uploadResponse }}
                  center
                    p #[a(id="clickable" href="javascript:void(0)" @click="reset()") Reset upload form?]
                template(v-if="isServerResponse && !this.$store.state.requestSuccess")
                  p(class="error") {{ this.$store.state.requestResult }}
                  center
                    p #[a(id="clickable" href="javascript:void(0)" @click="reset()") Reset upload form?]
            input(v-if="isInitial" type="file" multiple id="upload-button" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event)" accept=".tfstate" class="input-file")                                           
</template>

<!-- SCSS Styling -->
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
  & .modal {
    box-sizing: border-box;
    background-color: rgb(30, 32, 29);
    width: 40vw;
    height: 40vh;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    & .modal-header {
      justify-content: flex-end;
      height: 5%;
      & .close-button {
        margin: -4vh -2vw;
        float: right;
        font-size: 3.5vw;
        cursor: pointer;
      }
    }
    & .modal-body {
      display: flex;
      box-sizing: inherit;
      position: relative;
      justify-content: center;
      width: 100%;
      height: 100%;
      &:hover #clickable {
        text-decoration: underline;
      }
      & .container {
        box-sizing: inherit;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-content: center;
        & .upload-box {
          box-sizing: inherit;
          display: flex;
          outline: 2px dashed rgb(235, 234, 229);
          background: transparent;
          cursor: pointer;
          width: 95%;
          height: 95%;
        }
        & .upload-box-over {
          background-color: dimgray;
        }
        & .text {
          cursor: pointer;
          box-sizing: inherit;
          width: 100%;
          height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          & .error {
            font-family: "IBM Plex Mono", monospace;
            word-break: break-all;
            max-width: 34vw;
          }
          & button:active {
            transform: translateY(2px);
            background-color: rgb(235, 234, 229);
          }
        }
      }
      & input {
        box-sizing: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>

<!-- Javascript -->
<script>
import { parser } from "@/scripts/fileParsing/genericParser";
import { clearResponseState } from "@/scripts/stateManagement/clearResponseState";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3,
  STATUS_SERVERRESPONDED = 4;

export default {
  name: "Upload",
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
    },
    isServerResponse() {
      return this.currentStatus === STATUS_SERVERRESPONDED;
    }
  },
  methods: {
    close() {
      this.$emit("close");
      clearResponseState();
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.dragging = false;
      this.uploadResponse = null;
      this.fileCount = null;
      clearResponseState();
    },
    filesChange(event) {
      this.fileCount = event.target.files.length;
      this.currentStatus = STATUS_SAVING;
      if (!event.target) {
        this.currentStatus = STATUS_FAILED;
        throw Error("No file selected");
      }
      try {
        parser(event);
      } catch (err) {
        this.uploadResponse = err;
        this.currentStatus = STATUS_FAILED;
      } finally {
        this.currentStatus = STATUS_SERVERRESPONDED;
      }
    }
  },
  data() {
    return {
      uploadResponse: null,
      currentStatus: null,
      uploadFieldName: "stateFile",
      dragging: false,
      requestSuccess: false
    };
  },
  mounted() {
    this.reset();
  }
};
</script>
