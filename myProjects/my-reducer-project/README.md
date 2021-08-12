# My Reducer Project

Sometimes, you have more complex state - for example if you got multiple states, multiple ways of changing state, or dependencies to other states.

useState() then often becomes hard or error-prone to use - it's easy to write bad, inefficient or buggy code in such scenarios.

useReducer() can be used as a replacement for usetState() if you need "more powerful state management"

Doesn't mean you should always use useReducer() because it's more powerful. For the majority of the cases you will use useState().

A good scenario for useReducer() would be when you have multiple related states that can be merged into one state.

Another scenario would be when you have state that relies on previous state.

## Syntax

const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)

state: the state snapshot used in the component re-render/re-evaluation cycle
dispatchFn: a function that can be used to dispatch a new action (i.e. trigger an update of the state)
reducerFn: a function that is triggered automatically once an action is dispatched (via dispatchFn()) - it receives the latest state snapshot and should return the new, updated state.
(prevState, action) => newState
It's a bit like the useState() function form but has the additional action arg.

initialState: set the initialState
initFn: a function to set the initial state

## Implementation

You can define a reducerFn outside the component function. It doesn't need to react with anything inside the component function. All the data it needs will be passed to it automatically when it is executed by react.
eg:

//// Remember: the reducer function receives the last state snapshot
//// React will guarantee it is the last state snapshot
const emailReducer = (state, action) => {
if (action.type === 'USER_INPUT) {
return {value: action.val, isValid: action.val.includes('@')};
}
if (action.type === 'INPUT_BLUR') {
return {value: state.value, isValid: state.value.includes('@')};
}
//// Default state
return {
value: '', isValid: false
};
};

const Login = (props) => {

const [emailState, dispatchEmailAction] = useReducer(emailReducer, {value: '', isValid: null});

const emailChangeHandler = (event) => {
dispatchEmailAction({type: 'USER_INPUT', val: event.target.value});
};

const validateEmailHandler = () => {
dispatchEmailAction({type: 'INPUT_BLUR'});
};

};

## useSate() vs useReducer()

Generally, you'll know when you need useReducer(); when using useState() becomes cumbersome or you're getting a lot of bugs/unintented behaviors.

useState(): main state management tool. Typically you start with useState(). Great for independent pieces of state/data. Great if state updates are easy and limited to a few kinds of updates.
Eg. great if you don't have an object as a state. However

useReducer(): Great if you have more complex state logic. Guaranteed to have the latest state snapshot. Great if you want to move move complex state logic out of the component.
Should be considered if you have related pieces of state/date.
