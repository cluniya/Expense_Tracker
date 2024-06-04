import { createStore } from "redux";

const reducer = (state = { counter: 0 }, action) => {
    if (action.type === 'increase') {
        return {
            counter: state.counter + action.amount
        };
    }
    if (action.type === 'decrese') {
        return {
            counter: state.counter - action.amount
        };
    }
    return state; // Return the current state if no action matches
};

const store = createStore(reducer);

const counterSubscriber = () => {
    const latestState = store.getState();
    console.log(latestState); // Log the latest state
};

store.subscribe(counterSubscriber);

export default store;
