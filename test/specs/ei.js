define(
    [ "ei" ],
    function( Ei ){
        describe( "Ei", function(){
            it( "is a constructor", function(){
                Ei.should.be.a( "function" );
            });

            describe( "when constructed", function(){
                it( "should construct an object", function(){
                    var result = new Ei();

                    result.should.be.a( "object" );
                    result.manage.should.be.a( "function" );
                });
            });
        });
    }
);
