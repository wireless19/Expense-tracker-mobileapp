import axios from 'axios';

const BACKEND_URL = "https://expense-tracker-mobileap-41fa8-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id = response.data.name; //name property holds the generated id in firebase
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateEachExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteEachExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}