// General.
let pkg = require( './package.json' );
let project = pkg.name;
let title = pkg.title;

// Build.
let buildZipDestination = './build/';
let buildFiles = [ './**', '!build', '!build/**', '!node_modules/**', '!*.json', '!*.map', '!*.xml', '!gulpfile.js', '!*.sublime-project', '!*.sublime-workspace', '!*.sublime-gulp.cache', '!*.log', '!*.DS_Store', '!*.gitignore', '!TODO', '!*.git', '!*.ftppass', '!*.DS_Store', '!sftp.json', '!yarn.lock', '!*.md', '!package.lock' ];
let cleanFiles = [ './build/' + project + '/', './build/' + project + ' 2/', './build/' + project + '.zip' ];
let buildDestination = './build/' + project + '/';
let buildDestinationFiles = './build/' + project + '/**/*';

// Release.
let srcDirectory = './build/' + project + '/src/';
let cleanSrcFiles = [ './build/' + project + '/src/**/*.js', './build/' + project + '/src/**/*.scss', '!build/' + project + '/src/blocks/**/*.php' ];

// Translation.
let textDomain = '@@textdomain';
let destFile = project + '.pot';
let packageName = pkg.title;
let bugReport = pkg.author_uri;
let lastTranslator = pkg.author;
let team = pkg.author_shop;
let translatePath = './languages';
let translatableFiles = [ './**/*.php' ];
let jsPotFile = [ './languages/' + project + '-js.pot', './build/languages/' + project + '-js.pot' ];

/**
 * Load Plugins.
 */
let gulp = require( 'gulp' );
let del = require( 'del' );
let notify = require( 'gulp-notify' );
let replace = require( 'gulp-replace-task' );
let zip = require( 'gulp-zip' );
let copy = require( 'gulp-copy' );
let cache = require( 'gulp-cache' );
let run = require( 'gulp-run-command' ).default;
let open = require( 'gulp-open' );
let gulpif = require( 'gulp-if' );
let wpPot = require( 'gulp-wp-pot' );
let deleteEmpty = require( 'delete-empty' );

/**
 * Tasks.
 */
gulp.task( 'clearCache', function( done ) {
	cache.clearAll();
	done();
} );

gulp.task( 'clean', function( done ) {
	return del( cleanFiles );
	done();
} );

gulp.task( 'removeJSPotFile', function( done ) {
	return del( jsPotFile );
	done();
} );

gulp.task( 'cleanSrc', function( done ) {
	return del( cleanSrcFiles );
	done();
} );

gulp.task( 'deleteEmptyDirectories', function(done) {
	deleteEmpty.sync( srcDirectory );
	console.log(deleteEmpty.sync(srcDirectory));
	done();
});

gulp.task( 'npmStart', run( 'npm run start' ) );

gulp.task( 'npmBuild', run( 'npm run build' ) );

gulp.task( 'npmInstall', run( 'npm install' ) );

gulp.task( 'npmMakeBabel', run( 'npm run babel' ) )

gulp.task( 'npmMakePot', run( 'npm run makepot' ) );

gulp.task( 'npmMakePotPHP', run( 'npm run makepot:php' ) );

gulp.task( 'copy', function( done ) {
	return gulp.src( buildFiles )
		.pipe( copy( buildDestination ) );
	done();
} );

gulp.task( 'updateVersion', function( done ) {
	return gulp.src( './*.php' )

		.pipe( replace( {
			patterns: [
				{
					match: /(\d+\.+\d+\.+\d)/,
					replacement: pkg.version,
				},
			],
			usePrefix: false,
		} ) )
		.pipe( gulp.dest( './' ) );
	done();
} );

gulp.task( 'variables', function( done ) {
	return gulp.src( buildDestinationFiles )
		.pipe( replace( {
			patterns: [
				{
					match: 'pkg.name',
					replacement: project,
				},
				{
					match: 'pkg.title',
					replacement: pkg.title,
				},
				{
					match: 'pkg.version',
					replacement: pkg.version,
				},
				{
					match: 'pkg.author_uri',
					replacement: pkg.author_uri,
				},
				{
					match: 'pkg.author',
					replacement: pkg.author,
				},
				{
					match: 'pkg.homepage',
					replacement: pkg.homepage,
				},
				{
					match: 'pkg.license',
					replacement: pkg.license,
				},
				{
					match: 'pkg.copyright',
					replacement: pkg.copyright,
				},
				{
					match: 'textdomain',
					replacement: pkg.name,
				},
				{
					match: 'pkg.description',
					replacement: pkg.description,
				},
				{
					match: 'pkg.requires',
					replacement: pkg.requires,
				},
				{
					match: 'pkg.requires_php',
					replacement: pkg.requires_php,
				},
				{
					match: 'pkg.tested_up_to',
					replacement: pkg.tested_up_to,
				},
			],
		} ) )
		.pipe( gulp.dest( buildDestination ) );
	done();
} );

gulp.task( 'translate', function( done ) {
	gulp.src( translatableFiles )

		.pipe( wpPot( {
			domain: textDomain,
			destFile: destFile,
			package: project,
			bugReport: bugReport,
			lastTranslator: lastTranslator,
			team: team,
		} ) )
		.pipe( gulp.dest( translatePath ) );
	done();
} );

gulp.task( 'zip', function( done ) {
	return gulp.src( buildDestination + '/**', { base: 'build' } )
		.pipe( zip( project + '.zip' ) )
		.pipe( gulp.dest( buildZipDestination ) );
	done();
} );

gulp.task( 'build-notice', function( done ) {
	return gulp.src( './' )
		.pipe( notify( { message: 'Your build of ' + title + ' is complete.', onLast: false } ) );
	done();
} );

gulp.task( 'build-process', gulp.series( 'clearCache', 'clean', 'npmMakeBabel', 'npmBuild', 'npmMakePot', 'removeJSPotFile', 'updateVersion', 'copy', 'cleanSrc', 'deleteEmptyDirectories', 'variables', 'zip', function( done ) {
	done();
} ) );

gulp.task( 'build', gulp.series( 'build-process', 'build-notice', function( done ) {
	done();
} ) );

gulp.task(
	'default',
	gulp.series(
		'npmStart', function( done ) {
			done();
		}
	)
);

gulp.task(
	'install',
	gulp.series(
		'npmInstall', function( done ) {
			done();
		}
	)
);

gulp.task(
	'release',
	gulp.series(
		'build-process', function( done ) {
			done();
		}
	)
);
