import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../../Stores/expensesSlice';

const ExpenseDownload = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items); // Assuming you have a expenses state in your Redux store

  const handleDownload = async () => {
    try {
      // Dispatch action to fetch expense data from backend
      await dispatch(fetchExpenses());

      // Once the data is fetched, create a CSV file with the expense data
      const csvData = expenses.map(expense => {
        return `${expense.date},${expense.amount},${expense.description},${expense.category}`;
      }).join('\n');

      // Create a Blob with the CSV data
      const blob = new Blob([csvData], { type: 'text/csv' });

      // Create a link element to initiate download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'expenses.text';
      link.click();
    } catch (error) {
      console.error('Error downloading expenses:', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download Expenses</button>
  );
};

export default ExpenseDownload;
