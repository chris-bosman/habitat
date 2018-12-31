<!-- Pug Template -->
<template lang="pug">
.modal
    .modal-content
        .close-button
            span &times;
        form(action='/upload' method='POST' enctype='multipart/form-data')
            input(type='file' name='stateFiles' accept='.tfstate' class='inputfile' multiple id='upload-button' data-multiple-caption="{count} files selected")
            label(for='upload-button')
                .upload-box
                    .text
                        span Drag & drop your .tfstate files here, or click browse to find them on your local machine.
                        p
                            button(type='submit' name='action') Upload
script(src='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js')
script(src='/js/config/uploadIndicator.js')
script(src='/js/config/upload.js')
</template>

<!-- SCSS Styling-->
<style lang="scss">
.modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    z-index: 4;
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(30, 32, 29);
    padding: 1%;
    width: 40vw;
    height: 40vh;
    border-radius: 8px;
    z-index: 3;
    text-align: center;
}

.modal-content input {
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -5;
}

.close-button span {
    float: right;
    font-size: 3vw;
    margin: -5%;
    width: 1.5%;
    line-height: 1.5%;
    text-align: center;
    cursor: pointer;
}

.show-modal {
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
}

.upload-box {
    outline: 2px dashed rgb(235, 234, 229);
    background: transparent;
    min-height: 36vh;
    font-size: 1vw;
    padding: 2% 4%;
    margin: 0 2%;
    max-height: 38vh;
    align-self: center;
    cursor: pointer;
}

.text {
    margin-top: 15vh;
}

.text button {
    background-color: rgb(190, 189, 184);
    color: black;
    border: none;
    border-radius: 1px;
    display: inline-block;
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

</script>