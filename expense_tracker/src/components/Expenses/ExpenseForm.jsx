import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../Stores/expensesSlice';
const ExpenseForm = ({ expense, onSave }) => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        if (expense) {
            setDate(expense.date);
            setAmount(expense.amount);
            setDescription(expense.description);
            setCategory(expense.category);
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const expenseData = {
            date,
            amount: parseFloat(amount),
            description,
            category,
        };

        try {
            dispatch(addExpense(expenseData));

            // Clear form fields
            setDate('');
            setAmount('');
            setDescription('');
            setCategory('');
        } catch (error) {
            console.error('Error saving expense:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Saving...' : expense ? 'Update Expense' : 'Add Expense'}
            </button>
        </form>
    );
};

export default ExpenseForm;
