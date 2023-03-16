import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
  const { expensesState } = useContext(ExpensesContext);

  return (
    <ExpensesOutput fallBackText="No Registered Expenses found !" expensesPeriod="Total" expenses={expensesState} />
  );
}

export default AllExpenses;