function mimix( attrs_list ){
  var output = {}
  var mashup = Object.assign.apply( Object, [ {} ].concat( attrs_list ) ).keys()

  for( var key in mashup ){
    var values = attrs_list.map( function( x ){ x[ key ] } )

    output[ key ] = (
      values.length === 1
    ? values[ 0 ]
    : typeof values[ 0 ] === 'function'
    ? function(){
        var outputs = []
        var allFalse = true
        var promises = false

        for( var i = 0; i < values.length; i++ ){
          outputs[ i ] = values[ i ].apply( this, arguments )

          if( outputs[ i ] != false ){
            allFalse = false

            if( !promises && typeof outputs[ i ] != 'undefined' && typeof outputs[ i ].then )
              promises = true
          }
        }

        if( allFalse )
          return false

        else if( promises )
          return Promise.all( outputs )

        else
          return outputs[ i ]
      }
    : Array.isArray( values[ 0 ] )
      ? [].concat( values )
    : values[ 0 ] != undefined && typeof values[ 0 ] === 'object'
      ? Object.assign.apply( [], [ {} ].concat( values ) )
    : key === 'class' || key === 'className'
      ? values.join( ' ' )
      : values[ values.length - 1 ]
    )
  }

  return output
}

if( typeof module != 'undefined' ) module[ 'exports' ] = mimix
else if( typeof window != 'undefined' ) window.mimix = mimix
