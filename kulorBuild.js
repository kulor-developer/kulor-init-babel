var path    = require( "path" );

module.exports  = function( bower , grunt , kulor , log , callback ) {
    var self    = this ,
        tool;
    
    tool    = {
        makeWatchYAML : function(){
            var _path       = path.resolve( "grunt/watch.yaml" ) ,
                _config     = grunt.file.readYAML( _path );
            _config.js.tasks.push( "babel" );
            kulor.file.writeYAML( _path , _config )
            return this;
        } ,
        makeAliasesYAML : function(){
            var _path       = path.resolve( "grunt/aliases.yaml" ) ,
                _config     = grunt.file.readYAML( _path );
            _config.dev.push( "babel" );
            _config.mock.push( "babel" );
            kulor.file.writeYAML( _path , _config )
            return this;
        } ,
        makeBabelYAML   : function(){
            kulor.file.writeYAML( path.resolve( "grunt/babel.yaml" ) , {
                    options     : {
                        sourceMap   : true ,
                        presets     : [ "babel-preset-es2015" ]
                    } ,
                    files   : {
                        expand  : true ,
                        cwd     : "<%= src%>" ,
                        src     : "js/*.js" ,
                        dest    : "<%= dev%>" ,
                        ext     : '.js'
                    }
                } );
            return this;
        } ,
        makePackageConfig   : function(){
            var _pkg    = grunt.file.readJSON( "package.json" );
            if( typeof _pkg === "object" ){
                _pkg.dependencies[ "babel-preset-es2015" ]      = "^6.6.0";
                _pkg.dependencies[ "grunt-babel" ]              = "^6.0.0";
                grunt.file.write( path.resolve( "package.json" ) , JSON.stringify( _pkg , null , "    " ) );
            }
            return this;
        }
    }

    log( "start load kulor-init-babel" );
    tool.makePackageConfig()
        .makeBabelYAML()
        .makeWatchYAML()
        .makeAliasesYAML();
    log( "kulor-init-babel init success" );
    callback();
}