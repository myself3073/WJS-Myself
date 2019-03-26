
var gulp = require('gulp'),
	
	less = require('gulp-less'),

	cssMin = require('gulp-cssmin'),

	autoPre = require('gulp-autoprefixer'),

	reName = require('gulp-rename'),

	rev = require('gulp-rev'),

	imagemin = require('gulp-imagemin'),

	gulpIf = require('gulp-if'),

	revReplace = require('gulp-rev-collector');



//deal with css
gulp.task('css',function () {
	return gulp.src('./public/css/*')
				.pipe(gulpIf('*.less',less()))
				.pipe(cssMin())
				.pipe(autoPre())
				.pipe(rev())
				.pipe(gulp.dest('./release/public/css/'))
				.pipe(rev.manifest())
				.pipe(reName('css-manifest.json'))
				.pipe(gulp.dest('./release/rev'))
})

//deal with images
gulp.task('images',function(){

	return gulp.src('./public/images/*')
	.pipe(imagemin())
	.pipe(rev())
	.pipe(gulp.dest('./release/public/images'))
	.pipe(rev.manifest())
	.pipe(reName('image-manifest.json'))
	.pipe(gulp.dest('./release//rev/'))

})

//deal with other file
gulp.task('other',function(){

	return gulp.src(['./public/font','./public/lib','./index.html','./scripts'],{base:'./'})
				.pipe(gulp.dest('./release'))

})

//replace 
gulp.task('replace',['css','images'],function(){

	return gulp.src(['./release/rev/*.json','./release/index.html'])
				.pipe(revReplace())
				.pipe(gulp.dest('./release'))


})
//ok
gulp.task('default',['replace','other'],function(){

	console.log('okokokok');


})