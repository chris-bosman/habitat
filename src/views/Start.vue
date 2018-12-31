<!-- Pug Template -->
<template lang="pug">
.gs
    .band
        .header
        center
            include:markdown-it /text/gs.md
    .cards
        center
            .column
                .card(id='upload')
                    h3 Import
                    p Start your Habitat journey by importing your first Terraform state (.tfstate) file.
                    .ico
                        center
                            img(src='./images/upload.svg' width="65%" style="opacity:0.6;padding-top:5%;")
            .column
                a(href='/content/view')
                    .card
                        h3 Visualize
                        p Dig into Habitat's functionality by checking out the visualization tools.
                        .ico
                            center
                                img(src='./images/visualize.svg' width="75%" style="opacity:0.6;padding-top:0.5%;")
            .column
                a(href='/content/analyze')
                    .card
                        h3 Analyze
                        p Compare the real-world state of your infrastructure against your Terraform code.
                        .ico
                            center
                                img(src='./images/analyze.svg' width="90%" style="opacity:0.6;padding-top:7%;")
include upload
script(src='https://code.jquery.com/jquery-3.3.1.min.js')
</template>

<!-- SCSS Styling-->
<style lang="scss">
.gs a {
    text-decoration: none;
    color: rgb(190, 189, 184);
}

.cards {
    box-sizing: border-box;
    margin: 50px -5px 0 -5px;
}

.cards:after {
    display: table;
    clear: both;
    content: "";
}

.column {
    float: left;
    width: 30%;
    padding: 0 10px;
}

.card {
    box-shadow: 1px 1px 1px 1px rgba(190, 189, 184, 0.3);
    padding: 16px;
    background-color: rgba(30, 32, 29, 0.8);
    width: 60%;
    height: 300px;
    border-radius: 16px;
    text-align: left;
    border-style: solid;
    border-width: 0.5px;
    border-color: rgb(190, 189, 184);
    transition: transform 0.1s;
}

.card:hover {
    transform: scale(1.02);
}

.card h3 {
    text-align: center;
    margin: 0;
}

#upload {
    cursor: pointer;
}

.ico {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding-top: 12%;
}
</style>

<!-- Javascript-->
<script>
import { navFunction } from './js/navFunction.js'
import * as modal from './js/modal.js'
import * as bodyNav from './js/bodyNav.js'
</script>