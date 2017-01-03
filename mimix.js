function mimix( attrs_list ){
  var output = {}
  var mashup = Object.assign.apply( Object, [ Object.create( null ) ].concat( attrs_list ) ).keys()

  for( var key in mashup ){
    var values = attrs_list.map( function( x ){ x[ key ] } )

    output[ key ] = (
      typeof values[ 0 ] === 'function'
      ? function(){
          var outputs = []

          for( var i = 0; i < values.length; i++ ){
            outputs[ i ] = values[ i ].apply( this, arguments )

            if( outputs[ i ] === false )
              return false
          }

          if( outputs[ i ].then )
            return Promise.all( outputs )

          else
            return outputs[ i ]
        }
    : Array.isArray( values[ 0 ] )
      ? [].concat( values )
    : typeof values[ 0 ] === 'object'
      ? Object.assign.apply( [], [ {} ].concat( values ) )
    : key === 'class' || key === 'className'
      ? values.join( ' ' )
      : values[ values.length - 1 ]
    )
  }

  return composite
}

if ( typeof module !== 'undefined' ) module[ 'exports' ] = mimix
