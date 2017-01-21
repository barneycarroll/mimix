import m from 'mithril'

m.mount( document.body, {
  view : ( { state } ) => [
    m( 'h1', 'Mithril mixins' ),

    m( 'p', 'Investigation into the possibilities of composable behaviour in Mithril virtual nodes' ),

    m( 'button', {
      style : {
        border      : '1px solid',
        borderColor : state.hovered
        ? 'blue' : 'black',
        transition  : '.3s ease-in-out'
      },
      onmouseover : () =>
        state.hovered = true,
      onmouseout : () =>
        state.hovered = false,
      onclick : () =>
        state.clicked = true
    },

        state.clicked
      ? 'clicked'
      : 'not clicked'
    )
  ]
} )
