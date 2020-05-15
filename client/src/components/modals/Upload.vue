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
  // appearance attributes
  background-color: rgba(0, 0, 0, 0.5);

  // container attributes
  display: flex;

  // content attributes
  align-items: center;
  justify-content: center;

  // position attributes
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;

  // size attributes
  height: 100%;
  width: 100%;
  & .modal {
    // appearance attributes
    background-color: rgb(30, 32, 29);
    border-radius: 8px;
    box-sizing: border-box;

    // container attributes
    display: flex;

    // content attributes
    flex-direction: column;

    // size attributes
    height: 40vh;
    width: 40vw;
    & .modal-header {
      // content attributes
      justify-content: flex-end;

      // size attributes
      height: 5%;
      & .close-button {
        // appearance attributes
        cursor: pointer;
        font-size: 3.5vw;
        margin: -4vh -2vw;

        // position attributes
        float: right;
      }
    }
    & .modal-body {
      // container attributes
      box-sizing: inherit;
      display: flex;

      // content attributes
      justify-content: center;

      // position attributes
      position: relative;

      // size attributes
      height: 100%;
      width: 100%;
      &:hover #clickable {
        // appearance attributes
        text-decoration: underline;
      }
      & .container {
        // container attributes
        box-sizing: inherit;
        display: flex;

        // content attributes
        align-content: center;
        justify-content: center;

        // size attributes
        height: 100%;
        width: 100%;
        & .upload-box {
          // appearance attributes
          background: transparent;
          cursor: pointer;
          outline: 2px dashed rgb(235, 234, 229);

          // container attributes
          box-sizing: inherit;
          display: flex;

          // size attributes
          height: 95%;
          width: 95%;
        }
        & .upload-box-over {
          // appearance attributes
          background-color: dimgray;
        }
        & .text {
          // appearance attributes
          cursor: pointer;

          // container attributes
          box-sizing: inherit;
          display: flex;

          // content attributes
          align-items: center;
          justify-content: center;

          // position attributes
          position: absolute;

          // size attributes
          height: 100%;
          width: 100%;
          & .error {
            // appearance attributes
            font-family: "IBM Plex Mono", monospace;
            word-break: break-all;

            // size attributes
            max-width: 34vw;
          }
          & button:active {
            // appearance attributes
            background-color: rgb(235, 234, 229);
            transform: translateY(2px);
          }
        }
      }
      & input {
        // appearance attributes
        cursor: pointer;
        opacity: 0;

        // container attributes
        box-sizing: inherit;
        display: flex;

        // content attributes
        align-items: center;
        justify-content: center;

        // size attributes
        height: 100%;
        width: 100%;
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
