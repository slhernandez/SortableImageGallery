# Sortable Image Gallery
========================

This is a developer exercise that requires you to build a basic photo ordering tool based on the images and JavaScript provided. Thumbnails of images are displayed in a grid layout and sortable by dragging images to their desired position.

This project uses following tools:
- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [jQuery](http://jquery.com/) (from npm)
- [jQuery](http://jqueryui.com/) (from npm)
- [lodash](https://lodash.com/) (from npm)
- [del](https://www.npmjs.com/package/del)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)

Gulp manages project build and workflows. Here is a list of plug-ins used:
- [gulp](http://gulpjs.com/)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [gulp-notify](https://www.npmjs.com/package/gulp-notify)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-streamify](https://github.com/nfroidure/gulp-streamify)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

If you use homebrew, do:

```
brew install node
```
Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install Gulp Globally

Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*

```
npm install -g gulp
```

### Building the project

Install npm dependencies
```
npm install
```
This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.

```
npm start
```
This will run gulp.  Gulp will generate the project and store it in the build folder.

Alternatively, you can run...
```
gulp build
```
