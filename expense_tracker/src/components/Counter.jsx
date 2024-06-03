import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const increment = ()=>{
        dispatch({type : 'INCREMENTBY5'});
    }
    const decrement = ()=>{
        dispatch({type : 'DECREMENTBY5'});
    }

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={increment}>IncrementBy5</button>
            <button onClick={decrement}>DecrementBy5</button>
        </div>
    );
};

export default Counter;
