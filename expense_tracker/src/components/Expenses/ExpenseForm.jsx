// ExpenseForm.js
import React, { useRef } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ addExpense }) => {
    const dateRef = useRef();
    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            date: dateRef.current.value,
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };
        addExpense(newExpense);
    };

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" ref={dateRef} required /><br />

            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" ref={amountRef} required /><br />

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" ref={descriptionRef} required /><br />

            <label htmlFor="category">Category:</label>
            <select id="category" ref={categoryRef} required>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
                {/* Add more categories as needed */}
            </select><br />

            <button type="submit">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;
