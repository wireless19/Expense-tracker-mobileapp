import { createContext, useState, useReducer } from "react";

// const DUMMY_EXPENSES = [
//     {
//         id: "e1",
//         description: "A pair of shoes",
//         amount: 15000.00,
//         date: new Date("2023-03-03")
//     },
//     {
//         id: "e2",
//         description: "A pair of trouser",
//         amount: 5000.00,
//         date: new Date("2022-1-05")
//     },
//     {
//         id: "e3",
//         description: "Some bananas",
//         amount: 1000.00,
//         date: new Date("2021-12-01")
//     },
//     {
//         id: "e4",
//         description: "A book",
//         amount: 3000.00,
//         date: new Date("2022-02-19")
//     },
//     {
//         id: "e5",
//         description: "Another book",
//         amount: 4000.00,
//         date: new Date("2022-02-18")
//     },
//     {
//         id: "e6",
//         description: "A pair of trouser",
//         amount: 5000.00,
//         date: new Date("2023-03-03")
//     },
//     {
//         id: "e7",
//         description: "Some bananas",
//         amount: 1000.00,
//         date: new Date("2023-03-09")
//     },
//     {
//         id: "e8",
//         description: "A book",
//         amount: 3000.00,
//         date: new Date("2022-02-19")
//     },
//     {
//         id: "e9",
//         description: "Another book",
//         amount: 4000.00,
//         date: new Date("2023-03-03")
//     }
// ]

export const ExpensesContext = createContext();

//it receives the current "state" and an "action" object
function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            //generating expense item id
            // const expenseItemId = new Date().toString() + Math.random().toString();
            // return [{ ...action.payload, id: expenseItemId }, ...state]
            return [action.payload, ...state]

        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider(props) {
    // const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    const [expensesState, dispatch] = useReducer(expensesReducer, []);


    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(expenseDataId, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: expenseDataId, data: expenseData } });
    }


    return <ExpensesContext.Provider value={{ expensesState, setExpenses, addExpense, deleteExpense, updateExpense }}>
        {props.children}
    </ExpensesContext.Provider>
}

export default ExpensesContextProvider;