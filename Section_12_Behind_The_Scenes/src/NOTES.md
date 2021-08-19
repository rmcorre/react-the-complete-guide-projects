# How React Works Behind the scenes

Link to [slides](./slides/slides.pdf)

## Intro

React evaluates the components:
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
snapshots is the <p style="background: gray; color: black">This is new!</p> and would
report this change to ReactDOM so that ReactDom can update the real
DOM and insert this paragraph.

## Component Updates In Action

The child components are re-evaluated everytime the parent's state changes.
It doesn't matter if their props or state doesn't change.
Triggering a re-evaluation of the parent component causes a re-evaluation of
the child components and all other components in the component tree.

This poses a question: isn't this bad for performance?

For simple apps this will not matter as React is optimized for that.
Nonetheless, in bigger apps you might want to optimize that.
Therefore, as a developer you should tell React that it should re-execute
a component under certain circumstances.

How do you tell React that a component shoud be limited in re-execution.
Go to the file for the component and wrap the component export with React.memo();

<code>
const DemoOutput = (props) => {
  ...
}

export default React.memo(DemoOutput);
</code>

## React.memo()

Use React.memo() to avoid re-execution of child components when no state in the
child component has changed.

What does React.memo() do?
For the code snippet above, React would look at the previous props and compare it with
the new props, and only if the value of a prop changed, the component should be re-executed
and re-evaluated. If the parent components changed and the prop values for the child components
did not change, then child component re-execution will be skipped.

If a parent component is not re-executed, a child component will not be re-executed.

Then why not use React.memo() on all components if it allows us to optimize them?
Because this optimization comes at a cost. The memo() method tells React that whenever
the parent component changed it should go to the child component and compare the new
prop values to the previous prop values therefore React needs to store the previous prop
values and it needs to make that comparison and that also has it's own performance cost.
So, the use of React.memo() depends on the component you are applying it to and whether it
is worth it or not.

If you have a component where you know it's going to change or it's props values are going to
change with every re-evaluation of the parent component anyways, then memo() doesn't make
a lot of sense.

Remember, reference values, like arrays and objects (a function is an object), are an address, or pointer, to that object.
Each object has it's own place in memory and therefore a unique address or pointer.
So, everytime a new object is created or re-created, it will have a different address or pointer.

<pre style="background-color: tomato">
  const obj1 = {};
  const obj2 = {};
  obj1 === obj2; //false
</pre>

Let's look at the following code for an example:

<pre style="background-color: tomato">
  function App() {

    ...

    // When this app is re-executed
    // this function will be re-created
    const toggleParagraphHandler = () => {
        setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    };

    return (
      &lt;div className="app"&gt;
        &lt;h1&gt;Hi there!&lt;/h1&gt;

        // Because the app is re-executed
        // this false value is also re-created
        // However, comparing a primitive value
        // will return true if the previous value
        // and the current value are of the same type and same value.
        // eg. false === false //true
        // And because we wrapped DemoOutput with
        // React.memo(), DemoOutput is not re-executed.
        &lt;DemoOutput show={false} /&gt;

        // Because toggleParagraphHandler has been re-created
        // and a function is an object, a new object is created
        // so the previous function object pointer is compared
        // with the new function object pointer and they will
        // always be different addresses so this Button component
        // will be re-executed.
        &lt;Button onClick={toggleParagraphHandler}&gt;Toggle Paragraph&lt;/Button&gt;
      &lt;/div&gt;
    );
  }

  export default App;
</pre>

React.memo has a limitation though. When a child component is re-evaluated, the functions inside
that component are re-created. Therefore, prevFunctionInside is not equal to reCreatedFunctionInside. A value (the function)
has changed and the child componenent will be re-executed.
This is where useCallback is useful.

## useCallback()

useCallback() will save a function of our choice somewhere in React's internal storage and will always reuse the function when the function wrapped with useCallback() is re-executed.
useCallback will tell React to store a function and not re-create it as long as the dependencies in the dependency array didn't change.

However, functions that have outside variables whose value might change
need to update those variables from the last time it was stored
Use useCallback if you know a function should never change and shouldn't be re-created.
No dependencies if there are no outside variables
Include outside variables in the dependency array if the function uses outside variables
Because of closures, you have to add those dependencies that need to be updated
to the dependency array
Those variables should be updated everytime they change
If they don't change, the function isn't recreated
The function is re-created only for the variables in the dependency array that change

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
React guarantees that the order of state changes for one and the same type of state is guaranteed.

It is recommended that you use the function form for updating state because state updates can be postponed.

<pre style="background-color: tomato">
  setShowParagraph((prevShowParagraph) => !prevShowParagraph);
</pre>

This is a safe way of ensuring that state changes are processed in order and for every state change where you depend on
the previous state you get the latest state.

## State Batching

If there are more than on state update in a function for example, React will batch those state updates into one update.

## Optimizing with useMemo()

useMemo() allows you to memoize any kind of data

Sorting is one of the more performance intensive tasks you can do in your components.
useMemo() allows you to store any kind of data just like useCallback does it for functions.

<pre style="background-color: tomato">

  //Add useMemo because the array never changes
  //This will prevent items from being re-created everytime
  const items = useMemo(() => [5, 3, 1, 10, 9], []);

  const sortedList = useMemo(() => {
    return items.sort((a,b) => a-b)
  }, [items])
</pre>

sortedList will be rebuilt if items change because items is in the dependency array.
