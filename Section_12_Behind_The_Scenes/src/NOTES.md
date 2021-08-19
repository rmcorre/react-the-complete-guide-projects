# How React Works Behind the scenes

Link to [slides](./slides/slides.pdf)

## Intro

React determines how the component tree currently looks like
and what it should look like.

ReactDOM receives the differences (i.e. required changes) and
then manipulates the real DOM.

Re-evaluating components !== re-rendering the DOM.

Components are re-evaluated whenever props, state, or context
changes. Then, React executes the component function again if
there are any changes.

Changes to the real DOM are only made for differences between
evaluations. To be specific, changes to the real DOM are only
in those places where there are differences.

So the real DOM is not changed frequently, it is changed
rarely and only when needed. Making a virtual comparison
between the current state and the previous state is fairly
cheap and easy to do; it happens only in memory.

Reaching out to the real DOM that is rendered in the browser
is a performance intensive task.

## Virtual Diffing

<div style="background: gray">
  <p><i>previous evaluation result</i></p>
  <h2 style="color: black"> Hi there!</h2>
</div>

Then some state changes and we want to show a new paragraph

<div style="background: gray">
  <p><i>current evaluation result</i></p>
  <h2 style="color: black">Hi there!</h2>
  <p style="color: black">This is new!</p>
</div>

In this case, React would determine that the difference between both
snapshots is the <p style="color: black">This is new!</p> and would
report this change to ReactDOM so that ReactDom can update the real
DOM and insert this paragraph.

## React.memo() and useCallback() summary

Use React.memo(Component/that/should/not/be/re-executed) to avoid re-execution of child components
when no new values have changed

React.memo has a limitation though. When a child component is re-evaluated, the functions inside
that component are re-created. Therefore, prevFunctionInside is not equal to reCreatedFunctionInside. A value (the function)
has changed and the child componenent will be re-executed.
Remember, reference values, like arrays and objects (a function is an object), store the address, or pointer, to that object.
Each object has it's own place in memory and therefore a unique address or pointer.
So, everytime a new object is created or re-created, it will have a different address or pointer.
const obj1 = {};
const obj2 = {};
obj1 === obj2; //false

This is where useCallback is useful.
useCallback will tell React to store a function and not recreate it as long as the dependencies in the
dependency array didn't change.

## A closer look at state and components

Ultimately, everything comes down to state when it comes to re-rendering components and changing what is on the screen.
React manages both the state and components.

useState() is only initialized once. React stores a reference to the component in which useState() is used.
You could say that React creates a new state variable and creates a connection to the component it is used in.
React makes sure that useState() and the value you pass as a default value to useState() is considered once.
The first time a component runs, useState(), when executed, creates a new state variable which is handed off to React
and which is managed by React. React then memorizes to which component that belongs and uses the default value to initialize
the state with that value. For subsequent component calls (re-evaluations), when useState() is being called, no new state
is being created. Instead React recognizes that it already has a state and instead updates that state as neeeded.
The state is never re-initialized unless the component was removed from the DOM. If a component is re-attached, a new state
will be initialized. This is also true for useReducer() for example.

## State Updates & Scheduling

State updates are scheduled.
Most of the times state updates happen almost instantly.
React can also postpone that state change if it considers other tasks to have a higher priority.
React guarantees that the order of state changes for the same state is maintained.

It is recommended that you use the function form for updating state because state updates can be postponed.
This is a safe way of ensuring that state changes are processed in order and for every state change where you depend on
the previous state you get the latest state.

## State Batching

If there are more than on state update in a function for example, React will batch those state updates into one update.

## Optimizing with useMemo()

Sorting is one of the more performance intensive tasks you can do in your components.
useMemo() allows you to store any kind of data just like useCallback does it for functions.

const items = useMemo(() => [5, 3, 1, 10, 9], []);

const sortedList = useMemo(() => {
return items.sort((a,b) => a-b)
}, [items])
