# Habitat

**NOTE:** Not currently working.

Habitat is intended to be a front-end GUI for Terraform. The front-end is written in [Vue](https://vuejs.org/), [SCSS](https://sass-lang.com/), and [Pug](https://pugjs.org/api/getting-started.html). The back-end is written in [HapiJS](https://hapijs.com/) and interfaces with a [Mongo](https://www.mongodb.com/) database via [Mongoose](https://mongoosejs.com/).

## Phase 1

For the initial phase, the idea will be to provide a graphical representation for Terraform state via reading of Terraform state files. Milestones for this phase include:

* Import .tfstate files by
  * Manual file upload
  * Directory upload
  * Remote State upload (Will require authentication)
* Display content from .tfstate files
* Search through imported infrastructure based on .tfstate fields
* Create attractive visual mappings of infrastructure based on .tfstate files

## Phase 2