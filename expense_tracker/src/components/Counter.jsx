import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const increment = ()=>{
        dispatch({type : 'increase',amount:2});
    }
    const decrement = ()=>{
        dispatch({type : 'decrese',amount:2});
    }

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>IncrementBy2</button>
            <button onClick={decrement}>DecrementBy2</button>
        </div>
    );
};

export default Counter;
