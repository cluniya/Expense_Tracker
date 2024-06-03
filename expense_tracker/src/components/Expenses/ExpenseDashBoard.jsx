// ExpenseDashboard.js
import React, { useState } from 'react';
import './ExpenseDashBoard.css';
import ExpenseForm from './ExpenseForm';

const ExpenseDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [expenses, setExpenses] = useState([
        { date: '2024-06-01', amount: 50, description: 'Groceries', category: 'Food' },
        { date: '2024-06-02', amount: 20, description: 'Gas', category: 'Transport' },
    ]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const addExpense = (expense) => {
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
                    {expenses.map((expense, index) => (
                        <tr key={index}>
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
                            <ExpenseForm addExpense={addExpense} />
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
