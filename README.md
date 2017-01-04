# mimix

A mithril mixin mixer. 

`mimix( [ mixin1, mixin2, etc ] )` is like `{ ...mixin1, ...mixin2, ...etc }`, but geared towards the semantics of Mithril virtual DOM nodes (vnodes), DOM properties, and lifecycle methods. The goal is to enable a form of behaviour composition more subtle than components, by allowing mixins describing vnode behaviour to be composed into a singular node. 

When multiple mixins share a key:

1. Multiple functions are bound into one which executes all of these with the same input context & arguments:
  1. if the first returns a `Promise`, then the consuming context receives a `Promise.all` of all return values (ideal for `onbeforeremove`)
  2. or if any returns `false`, subsequent functions do not execute and `false` is passed on (ideal for `onbeforeupdate`)
  3. otherwise the last such function's output is passed through
2. Arrays are concatenated (ideal for `children`)
3. Non-null Objects are merged into a new object (ideal for `style`)
4. `class` / `className` entries are space separated

In all other cases, it behaves like a traditional object merge would and subsequent values override the previous.
