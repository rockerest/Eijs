module.exports = function( grunt ){
	grunt.initConfig({
		"pkg": {
			"name": {
				"main": "EiJS",
				"build": "ei"
			}
		},
        "jsdoc": {
            "documentation": {
                "src": ['src/**/*.js', 'README.md'],
                "dest": "doc/"
            }
        },
		"bower": {
			"install":{
                "options":{
                    "layout": "byComponent",
                    "targetDir": "./vendor",
                    "cleanBowerDir": true
                }
            }
		},
		"requirejs":{
            "compile":{
                "options":{
                    "baseUrl": "src/",
                    "paths":{
                        "jquery": "empty:",
                        "underscore": "../vendor/underscore/underscore"
                    },
                    "name": "ei",
                    "out": "build/<%= pkg.name.build %>.js"
                }
            }
        },
        "copy": {
            "built": {
                "files": [{
                    "src": 'build/ei.js',
                    "dest": 'example/vendor/ei/ei.js'
                }]
            }
        },
        "mocha": {
            "test": {
                "src": "test/index.html",
                "options": {
                    "growlOnSuccess": true,
                    "reporter": "Nyan"
                }
            }
        },
        "watch": {
            "application": {
                "files": ['src/**/*.js', 'Gruntfile.js'],
                "tasks": ['build']
            },
            "documentation": {
                "files": ['src/**/*.js', 'Gruntfile.js'],
                "tasks": ['jsdoc']
            }
        }
	});

	grunt.registerTask( 'clean', "Wipe the build directory", function(){
		grunt.file.delete( "./build" );
        grunt.file.delete( "./doc" );

    });

	grunt.registerTask( 'prepare', "Prepare directory structure for anything necessary", function(){
        grunt.task.run( ['clean'] );
        grunt.file.mkdir( "./build" );
        grunt.file.mkdir( "./doc" );
        grunt.file.mkdir( "./vendor" );
    });

	//contrib tasks
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

	//other tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );
    grunt.loadNpmTasks( 'grunt-jsdoc' );
    grunt.loadNpmTasks( 'grunt-mocha' );

	grunt.registerTask( "setup", ["prepare", "bower:install"] );
	grunt.registerTask( "build", ["requirejs:compile", "copy"] );
    grunt.registerTask( "document", ["jsdoc", "watch:documentation"] );
    grunt.registerTask( "test", ["mocha"] );

	grunt.registerTask( "default", ["build", "watch:application"] );
};
