import { createStore } from "redux";

const reducer = (state = { counter: 0 }, action) => {
    if (action.type === 'INCREMENTBY2') {
        return {
            counter: state.counter + 2
        };
    }
    if (action.type === 'DECREMENTBY2') {
        return {
            counter: state.counter - 2
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
