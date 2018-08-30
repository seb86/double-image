// General.
var pkg		= require('./package.json');
var project = pkg.name;
var title	= pkg.title;

// Build.
var buildZipDestination	  = './build/';
var buildFiles            = ['./**', '!build', '!build/**', '!node_modules/**', '!*.json', '!*.map', '!*.xml', '!gulpfile.js', '!*.sublime-project', '!*.sublime-workspace', '!*.sublime-gulp.cache', '!*.log', '!*.DS_Store', '!*.gitignore', '!TODO', '!*.git', '!*.ftppass', '!*.DS_Store', '!sftp.json', '!yarn.lock', '!*.md', '!package.lock'];
var cleanFiles			  = ['./build/'+project+'/', './build/'+project+' 2/', './build/'+project+'.zip' ];
var buildDestination	  = './build/'+project+'/';
var buildDestinationFiles = './build/'+project+'/**/*';

// Release.
var cleanSrcFiles		  = ['./build/'+project+'/src/'];

// Translation.
var text_domain		  = '@@textdomain';
var destFile		  = project+'.pot';
var packageName		  = pkg.title;
var bugReport		  = pkg.author_uri;
var lastTranslator	  = pkg.author;
var team			  = pkg.author_shop;
var translatePath	  = './languages';
var translatableFiles = ['./**/*.php'];

/**
 * Load Plugins.
 */
var gulp	= require('gulp');
var del		= require('del');
var notify	= require('gulp-notify');
var replace = require('gulp-replace-task');
var zip		= require('gulp-zip');
var copy	= require('gulp-copy');
var cache	= require('gulp-cache');
var run		= require('gulp-run-command').default;
var open	= require("gulp-open");
var gulpif	= require('gulp-if');
var wpPot	= require('gulp-wp-pot');

/**
 * Tasks.
 */
gulp.task('clearCache', function(done) {
	cache.clearAll();
	done();
});

gulp.task('clean', function(done) {
	return del( cleanFiles );
	done();
});

gulp.task('cleanSrc', function(done) {
	if ( 'double-image' == project ) {
		done();
		return;
	}

	return del( cleanSrcFiles );

	done();
});

gulp.task( 'npmStart', run( 'npm run start' ) )

gulp.task( 'npmBuild', run( 'npm run build' ) )

gulp.task( 'npmInstall', run( 'npm install' ) )

gulp.task( 'copy', function(done) {
	return gulp.src( buildFiles )
	.pipe( copy( buildDestination ) );
	done();
});

gulp.task( 'updateVersion', function(done) {
	return gulp.src( './*.php' )

	.pipe( replace( {
		patterns: [
			{
				match: /(\d+\.+\d+\.+\d)/,
				replacement: pkg.version
			},
		],
		usePrefix: false
	} ) )
	.pipe( gulp.dest( './' ) );
	done();
});

gulp.task( 'variables', function(done) {
	return gulp.src( buildDestinationFiles )
	.pipe(replace({
		patterns: [
		{
			match: 'pkg.name',
			replacement: project
		},
		{
			match: 'pkg.title',
			replacement: pkg.title
		},
		{
			match: 'pkg.version',
			replacement: pkg.version
		},
		{
			match: 'pkg.author',
			replacement: pkg.author
		},
		{
			match: 'pkg.license',
			replacement: pkg.license
		},
		{
			match: 'pkg.copyright',
			replacement: pkg.copyright
		},
		{
			match: 'textdomain',
			replacement: pkg.name
		},
		{
			match: 'pkg.downloadid',
			replacement: pkg.downloadid
		},
		{
			match: 'pkg.description',
			replacement: pkg.description
		},
		{
			match: 'pkg.tested_up_to',
			replacement: pkg.tested_up_to
		}
		]
	}))
	.pipe(gulp.dest( buildDestination ));
	done();
});

gulp.task( 'translate', function(done) {
	gulp.src( translatableFiles )

	.pipe( wpPot( {
		domain        : text_domain,
		destFile      : destFile,
		package       : project,
		bugReport     : bugReport,
		lastTranslator: lastTranslator,
		team          : team
	} ))
	.pipe( gulp.dest( translatePath ) )
	done();
});

gulp.task( 'zip', function(done) {
	return gulp.src( buildDestination + '/**', { base: 'build' } )
	.pipe( zip( project + '.zip' ) )
	.pipe( gulp.dest( buildZipDestination ) );
	done();
});

gulp.task( 'build-notice', function(done) {
	return gulp.src( './' )
	.pipe( notify( { message: 'Your build of ' + title + ' is complete.', onLast: false } ) );
	done();
});

gulp.task( 'build-process', gulp.series( 'clearCache', 'clean', 'npmBuild', 'updateVersion', 'copy', 'cleanSrc', 'variables', 'zip',  function(done) {
	done();
} ) );

gulp.task( 'build', gulp.series( 'build-process', 'build-notice', function(done) {
	done();
} ) );

gulp.task(
	'default',
	gulp.series(
		'npmStart', function(done) {
	done();
} ) );

gulp.task(
	'install',
	gulp.series(
		'npmInstall', function(done) {
	done();
} ) );

gulp.task(
	'release',
	gulp.series(
		'build-process', function(done) {
	done();
} ) );
