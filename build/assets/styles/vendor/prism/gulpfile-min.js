var gulp=require("gulp"),rename=require("gulp-rename"),uglify=require("gulp-uglify"),header=require("gulp-header"),concat=require("gulp-concat"),replace=require("gulp-replace"),fs=require("fs"),paths={componentsFile:"components.json",componentsFileJS:"components.js",components:["components/**/*.js","!components/index.js","!components/**/*.min.js"],main:["components/prism-core.js","components/prism-markup.js","components/prism-css.js","components/prism-clike.js","components/prism-javascript.js","plugins/file-highlight/prism-file-highlight.js"],plugins:["plugins/**/*.js","!plugins/**/*.min.js"],showLanguagePlugin:"plugins/show-language/prism-show-language.js",autoloaderPlugin:"plugins/autoloader/prism-autoloader.js",changelog:"CHANGELOG.md"},componentsPromise=new Promise(function(n,e){fs.readFile(paths.componentsFile,{encoding:"utf-8"},function(s,p){s?e(s):n(JSON.parse(p))})});gulp.task("components",function(){return gulp.src(paths.components).pipe(uglify()).pipe(rename({suffix:".min"})).pipe(gulp.dest("components"))}),gulp.task("build",function(){return gulp.src(paths.main).pipe(header("\n/* **********************************************\n     Begin <%= file.relative %>\n********************************************** */\n\n")).pipe(concat("prism.js")).pipe(gulp.dest("./"))}),gulp.task("plugins",["languages-plugins"],function(){return gulp.src(paths.plugins).pipe(uglify()).pipe(rename({suffix:".min"})).pipe(gulp.dest("plugins"))}),gulp.task("components-json",function(n){componentsPromise.then(function(e){e="var components = "+JSON.stringify(e)+";\nif (typeof module !== 'undefined' && module.exports) { module.exports = components; }",fs.writeFile(paths.componentsFileJS,e,n)})}),gulp.task("watch",function(){gulp.watch(paths.components,["components","build"]),gulp.watch(paths.plugins,["plugins","build"])}),gulp.task("languages-plugins",function(n){componentsPromise.then(function(e){var s={},p={};for(var i in e.languages)if("meta"!==i){var u=e.languages[i].displayTitle||e.languages[i].title,o=i.substring(0,1).toUpperCase()+i.substring(1);u!==o&&(s[i]=u);for(var t in e.languages[i].aliasTitles)s[t]=e.languages[i].aliasTitles[t];e.languages[i].require&&(p[i]=e.languages[i].require)}var a=JSON.stringify(s),l=JSON.stringify(p),g=[{plugin:paths.showLanguagePlugin,map:a},{plugin:paths.autoloaderPlugin,map:l}],r=0,c=g.length,m=function(){++r===c&&n&&n()};g.forEach(function(n){var e=gulp.src(n.plugin).pipe(replace(/\/\*languages_placeholder\[\*\/[\s\S]*?\/\*\]\*\//,"/*languages_placeholder[*/"+n.map+"/*]*/")).pipe(gulp.dest(n.plugin.substring(0,n.plugin.lastIndexOf("/"))));e.on("error",m),e.on("end",m)})})}),gulp.task("changelog",function(n){return gulp.src(paths.changelog).pipe(replace(/#(\d+)(?![\d\]])/g,"[#$1](https://github.com/PrismJS/prism/issues/$1)")).pipe(replace(/\[[\da-f]+(?:, *[\da-f]+)*\]/g,function(n){return n.replace(/([\da-f]{7})[\da-f]*/g,"[`$1`](https://github.com/PrismJS/prism/commit/$1)")})).pipe(gulp.dest("."))}),gulp.task("default",["components","components-json","plugins","build"]);