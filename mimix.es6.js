export default (...components) => 
  Object.keys(Object.assign({}, ...components))
    .reduce((component, key) => ({
      ...component,
      [key] : reduce({
        key, values: components.filter(x => key in x).map(x => x[key])
      })
    }), {})

const reduce = ({key, values: [first, ...rest]}) => (
    !rest.length
    ? first
  : key === 'class' || key === 'className'
    ? first.concat(rest).join(' ').replace(/ +/g, ' ')
  : typeof first == 'function'
    ? multi(first, ...rest)
  : typeof first == 'object'
    ? Object.assign({}, first, ...rest)
  : Array.isArray(first)
    ? [first, ...rest]
    : rest.pop()
)

const multi = (...fns) => 
  function(e){
    const [returns, noRedraw] = fns.reduce(
      ([returns, redraws], fn, i) => [
        [...returns, fn.apply(this, arguments)],
        [...redraws, i && e.redraw === false],
      ],
      [[], undefined, ]
    )

    noRedraw
      || delete e.redraw

    return (
      outcomes.some(isPromise)
      ? Promise.all(outcomes)
    : outcomes.every(isFalse)
      ? false
    : outcomes.pop()
    )
  }
  
const isPromise = x => x == Promise.resolve(x)
const isFalse   = x => x === false
const to = (a,b) => b(a)