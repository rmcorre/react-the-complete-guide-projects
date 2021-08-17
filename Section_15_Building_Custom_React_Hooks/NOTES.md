# Section 15 - Building Custom React Hooks

You can only use React Hooks in functional components and custom Hooks.
You can only use custom Hooks in functional components an React Hooks.

What are "Custom Hooks"?
You can use custom hooks to encapsulate stateful logic into reusable functions.
It's a mechanism for reusing logic.

Whenever you have code duplication in programming, you want to take that code
and refactor it into a function that holds that shared code.

## Simple Example

Has two counters.
One counter counting up from 0.
One counter counting down from 0.
Both counters have almost identical code, except for the
logic to increase count by 1 and increase count by -1.
Therefore we have some code duplication.

It's important to note that in the ForwardCounter and
BackwardCounter components, we are using the useState
hook and the useEffect hook. React hooks can only be used
in functional components or custom hooks. So to refactor
the code, we have to create a custom hook so that we
can resuse the code as is.

### File naming convention for custom hooks

The custom hook file name should start with lower case
"use" followed by a hyphen and the hook name you want to use.
This helps to identify your custom hooks from React hooks.

### Function naming rule

The function name must start with "use."
This is is required by React.
Omit the hyphen.

### How custom hooks are bound to compenents

A binding is created by React where the custom hook is used

const ForwardCounter = () => {
useCounter();
...
}

In the above snippet, useCounter() is used inside the
ForwardCounter component, therefore React creates a binding
to The ForwardCounter component.

### State in custom hooks

If useState() is used in a custom hook, that state is specific
to the component the custom hook is used in.
It is not shared accross components.
Each component where the custom hook is used in will get
it's own state, operating individually, from the other components.

## A More Realistic Example
