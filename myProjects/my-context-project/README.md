# React Context API

## Useful when prop-drilling to pass down state to nested components

Quite often, there will be components that don't use that state,
but you have to pass a prop with that state to be able to use it
in the nested component.

With the Context API, you declare state in one place and with the
useContext() hook, you can consume it directly.

You can pass both data and functions with the Context API.

### TIP

It is a good idea to add dummy functions to your default context object
when you create your context.

This will provide IDE auto-completion.
A dummy function can be as simple as: () => {} or

(param1, param2) => {} if you're expecting params. This will show up in auto-completion as well.

### TIP

Create a dedicated context component in a decicated context file to maintain
the single-responsibily principle and to make your code leaner.

You may want to move the context set-up from the component it is currently in
and move it into the default context object and expose it in a component you
create there.

## Context limitations
Keep in mind to use props for component configuration and Context for state management across components or the entire app.
React Context should'nt be used to replace ALL component communications and props.
Context is NOT optimized for high frequency changes. (eg. multiple changes per secong)
