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
                    "name": "bootstrap",
                    "out": "build/<%= pkg.name.build %>.js"
                }
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

	//other tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );

	grunt.registerTask( "setup", ["prepare", "bower:install"] );
	grunt.registerTask( "build", ["requirejs:compile"] );

	grunt.registerTask( "default", ["build"] );
};