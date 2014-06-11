module.exports = function( grunt ){
	grunt.initConfig({
		"pkg": {
			"name": "Eijs"
		},
		"bower": {
			"install":{
                "options":{
                    "layout": "byComponent",
                    "targetDir": "./vendor",
                    "cleanBowerDir": true
                }
            }
		}
	});

	grunt.registerTask( 'clean', "Wipe the build directory", function(){
		grunt.file.delete( "./js/build" );
        grunt.file.mkdir( "./js/build" );
    });

	grunt.registerTask( 'prepare', "Prepare directory structure for anything necessary", function(){
        grunt.task.run( ['clean'] );
        grunt.file.mkdir( "./vendor" );
    });

    grunt.loadNpmTasks( 'grunt-bower-task' );

	grunt.registerTask( "setup", ["bower"] );
};