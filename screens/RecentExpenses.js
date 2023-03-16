import { useContext, useEffect, useState } from 'react';
// import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const { expensesState, setExpenses } = useContext(ExpensesContext);


    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                setExpenses(expenses);
            } catch (error) {
                setError("Could not fetch expenses !");
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);


    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />;
    }

    const recentExpenses = expensesState.filter((expenses) => {
        const today = new Date();
        const dateSevenDaysAgo = getDateMinusDays(today, 7);
        return (expenses.date >= dateSevenDaysAgo) && (expenses.date <= today);
    });

    return (
        <ExpensesOutput fallBackText="No Recent Expenses for the last 7 days" expenses={recentExpenses} expensesPeriod="Last 7 Days" />
    );
}

export default RecentExpenses;