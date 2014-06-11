module.exports = function( grunt ){
	grunt.initConfig({
		"pkg": {
			"name": {
				"main": "EiJS",
				"build": "ei"
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
                    "dest": 'vendor/ei/ei.js'
                }]
            }
        },
        "watch": {
            "scripts": {
                "files": ['src/**/*.js', 'Gruntfile.js'],
                "tasks": ['build']
            }
        }
	});

	grunt.registerTask( 'clean', "Wipe the build directory", function(){
		grunt.file.delete( "./build" );
        grunt.file.mkdir( "./build" );
    });

	grunt.registerTask( 'prepare', "Prepare directory structure for anything necessary", function(){
        grunt.task.run( ['clean'] );
        grunt.file.mkdir( "./vendor" );
    });

	//contrib tasks
	grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

	//other tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );

	grunt.registerTask( "setup", ["prepare", "bower:install"] );
	grunt.registerTask( "build", ["requirejs:compile", "copy"] );

	grunt.registerTask( "default", ["build", "watch"] );
};
