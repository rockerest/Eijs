module.exports = function( grunt ){
    grunt.initConfig({
        "pkg": {
            "name": "example"
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
                    "baseUrl": "js/src/",
                    "paths":{
                        "jquery": "empty:",
                        "ei": "../../vendor/ei/ei"
                    },
                    "name": "bootstrap",
                    "out": "js/build/<%= pkg.name %>.js"
                }
            }
        },
        "watch": {
            "scripts": {
                "files": ['js/src/**/*.js', 'Gruntfile.js', 'vendor/ei/ei.js'],
                "tasks": ['build']
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

    //contrib tasks
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    //other tasks
    grunt.loadNpmTasks( 'grunt-bower-task' );

    grunt.registerTask( "setup", ["prepare", "bower:install"] );
    grunt.registerTask( "build", ["requirejs:compile"] );

    grunt.registerTask( "default", ["build", "watch"] );
};
