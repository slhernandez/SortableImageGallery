# Sortable Image Gallery

This is a developer exercise that requires you to build a basic photo ordering tool based on the images and JavaScript provided. Thumbnails of images are displayed in a grid layout and sortable by dragging images to their desired position.

This project uses following tools:
- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [jQuery](http://jquery.com/) (from npm)
- [jQueryUI](http://jqueryui.com/) (from npm)
- [lodash](https://lodash.com/) (from npm)
- [del](https://www.npmjs.com/package/del)
- [vinyl-source-stream](https://www.npmjs.com/package/vinyl-source-stream)

Gulp manages project build and workflows. Here is a list of plug-ins used:
- [gulp](http://gulpjs.com/)(Build system automating tasks)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)(Prefix CSS with Autoprefixer)
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)(Minify with clean-css)
- [gulp-notify](https://www.npmjs.com/package/gulp-notify)(send message to OS X notifier)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)(Rename files easily)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)(Gulp plugin for SASS)
- [gulp-streamify](https://github.com/nfroidure/gulp-streamify)(Wrap old Gulp plugins to support streams)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)(Minify files with UglifyJS)

If you've never used Node or npm before, you'll need to install Node.
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

# Building the project

###Install npm dependencies:
This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.
```
npm install
```

###Build project
This will run gulp.  Gulp will generate the project and store it in the build folder.
```
npm start
```

Alternatively, you can run...
```
gulp build
```
