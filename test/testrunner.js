requirejs.config({
    "baseUrl": "../src",
    "paths":{
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min",
        "underscore": "../vendor/underscore/underscore",

        // Testing Libraries
        "chai": "../vendor/chai/chai",
        "mocha": "../vendor/mocha/mocha",
        "sinon-chai": "../vendor/sinon-chai/lib/sinon-chai"
    },
    "config": {
        "testRunner": {
            "tests": [
                "ei"
            ]
        }
    }
});

define(
    "testRunner",
    ["require", "module", "underscore", "chai", "sinon-chai"],
    function( require, module, _, chai, sinonChai ){
        // Chai setup
        var assert = chai.assert,
            should = chai.should(),
            expect = chai.expect;

        // Mocha setup
        mocha.setup( 'bdd' );
        chai.use( sinonChai );

        // get tests
        var tests = module.config().tests,
            count = 0;

        // tests
        _( tests ).each( function( test ){
            require(
                [ '../test/specs/' + test ],
                function(){
                    count++;

                    if( count === _(tests).size() ){
                        if( window.mochaPhantomJS ){
                            mochaPhantomJS.run();
                        }
                        else{
                            mocha.run();
                        }
                    }
                }
            );
        });
    }
);

require(["testRunner"]);
