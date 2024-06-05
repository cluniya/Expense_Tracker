
import React, { useState, useEffect } from 'react';
import './ExpenseDashBoard.css';
import ExpenseForm from './ExpenseForm';
import { fetchExpenses } from '../../Stores/expensesSlice';
import { useDispatch, useSelector } from 'react-redux';



const ExpenseDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [premium , setpremium] = useState(false)

    // const expenses = useSelector(state => state.expenses.items);
    // console.log(expenses);


    const [editingExpense, setEditingExpense] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchExpenses())
        
    },[dispatch])

    let amount = 0;
    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch('https://expense-tracker-3498f-default-rtdb.firebaseio.com/expenses.json');
                const data = await response.json();

                const expenseList = [];
                for (let id in data) {
                    expenseList.push({ id, ...data[id] });
                }
                expenseList.map((expense)=>{
                    amount += expense.amount;
                })
                setpremium(amount)
                setExpenses(expenseList);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setEditingExpense(null);
    };

    const handleExpenseAddedOrUpdated = (expense) => {
        if (editingExpense) {
            setExpenses(expenses.map(exp => (exp.id === expense.id ? expense : exp)));
        } else {
            setExpenses([...expenses, expense]);
        }
        handleClose();
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://expense-tracker-3498f-default-rtdb.firebaseio.com/expenses/${id}.json`, {
                method: 'DELETE',
            });
            setExpenses(expenses.filter(expense => expense.id !== id));
            console.log('Expense successfully deleted');
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setShowModal(true);
    };

    if(premium > 10000){
        return <div>
        <p>Amount exceeds 10000. Activate premium to access additional features.</p>
        <button >Activate Premium</button>
    </div>
    }

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.date}</td>
                            <td>${expense.amount}</td>
                            <td>{expense.description}</td>
                            <td>{expense.category}</td>
                            <td>
                                <button onClick={() => handleEdit(expense)}>Edit</button>
                                <button onClick={() => handleDelete(expense.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h5 className="modal-title">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h5>
                            <button className="close" onClick={handleClose}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <ExpenseForm
                                expense={editingExpense}
                                onSave={handleExpenseAddedOrUpdated}
                            />
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
