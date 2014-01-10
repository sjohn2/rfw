# RFW

***
Directory structure, Grunt build and workflow with HTML5 boilerplate for a faster UI development.

## About
The framework is intended to provide the best practice directory structure and easy to use grunt build and workflow for your front-layer of the website or single page application (SPA) project. Rapid supports JS task running, build process with version management, auto minification, file concatenation , Less css pre-processor compilation and HTML5 boilerplate framework.

To kickstart a new UI project, all you have to do is clone Rapid and make configuration changes at package.json and Gruntfile.js if required and start coding.  In less than 10 minutes you have a working grunt build and workflow ready for your new project. 

## Directory Structure
├── build
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   └── index.html
├── src
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   ├── Less
│   │    ├── mixins
│   │    ├── modules
│   │    ├── partials
│   │    ├── vendor
│   │    └── style.less
│   └── index.html
├── vendor
├── docs
├── Gruntfile.js
├── package.json
├── README.md

## Features
* Best practice directory structure for your front-end layer
* Basic HTML5 boilerplate with Shiv and Modernizer.
* Open source workflow with Grunt.js that will minify, concatenate and maintain version management of your files. 
* Dynamically appended copyright/license and version numbers for JS/CSS/HTML
* Well documented Gruntfile.js for enhanced developer support
* Built-in build script for auto-minification of CSS,JavaScript and HTML files for production
* Pre-setup Less files and directory structure
* Configurable JSHint
* Lightweight framework

## Wish list
* LESS/SASS switching options
* Image compression / optimizations
* Command line execution bat and command files.

## Install

Required NodeJs  - for installation visit [https://github.com/joyent/node/wiki/installation](https://github.com/joyent/node/wiki/installation)

```
$ git clone git://github.com/sjohn2/rfw
$ cd rfw
$ sudo npm -g install grunt-cli
$ npm install
$ grunt

```



You can browser the index file from file:///path/to/rfw/build/index.html .
