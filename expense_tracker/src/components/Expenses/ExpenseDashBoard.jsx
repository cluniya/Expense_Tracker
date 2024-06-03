// ExpenseDashboard.js
import React, { useState, useEffect } from 'react';
import './ExpenseDashBoard.css';
import ExpenseForm from './ExpenseForm';

const ExpenseDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('https://expense-tracker-3498f-default-rtdb.firebaseio.com/expenses.json');
                const data = await response.json();

                const expenseList = [];
                for (let id in data) {
                    expenseList.push({ id, ...data[id] });
                }
                setExpenses(expenseList);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleExpenseAdded = (expense) => {
        setExpenses([...expenses, expense]);
        handleClose();
    };

    return (
        <div className="expense-dashboard-container">
            <h1>Expense Dashboard</h1>
            <button className="btn" onClick={handleShow}>Add Expense</button>

            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>${expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add Expense</h5>
                            <button className="close" onClick={handleClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseDashboard;
