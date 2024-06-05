import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async () => {
    try {
        const response = await fetch('https://expense-tracker-3498f-default-rtdb.firebaseio.com/expenses.json');
        const data = await response.json();

        const expenseList = [];
        for (let id in data) {
            expenseList.push({ id, ...data[id] });
        }
        console.log(expenseList);
        return expenseList;

    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Error fetching expenses');

    }
});

export const addExpense = createAsyncThunk('expenses/addExpense', async (expenseData) => {
    try {
        const response = await fetch('https://expense-tracker-3498f-default-rtdb.firebaseio.com/expenses.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        });

        const data = await response.json();
        return { id: data.name, ...expenseData };
    } catch (error) {
        console.error('Error adding expense:', error);
        throw new Error('Error adding expense');
    }
});

// Add reducers and initial state for expensesSlice
const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});
export default expensesSlice.reducer;
