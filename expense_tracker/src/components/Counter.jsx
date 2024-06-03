import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const increment = ()=>{
        dispatch({type : 'INCREMENTBY2'});
    }
    const decrement = ()=>{
        dispatch({type : 'DECREMENTBY2'});
    }

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;
