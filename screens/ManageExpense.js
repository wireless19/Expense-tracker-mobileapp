import { useLayoutEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expenses-context';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateEachExpense, deleteEachExpense } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function ManageExpense(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { expensesState, addExpense, deleteExpense, updateExpense } = useContext(ExpensesContext);
  //it is possible you load this screen without any params, in that case params will be undefined and trying to access expenseId property would cause an error. so we use the "?"conditional operator built into modern javascript to check if params is undefined 
  const editedExpenseId = props.route.params?.expenseId;
  const isEditing = !!editedExpenseId; //conververt a value to a boolean

  const selectedExpense = expensesState.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Editing Expense" : "Add Expense",
      animation: "slide_from_bottom"
    });
  }, [props.navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteEachExpense(editedExpenseId);
      deleteExpense(editedExpenseId);
      props.navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    props.navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);
        await updateEachExpense(editedExpenseId, expenseData);
      } else {
        const fireBaseId = await storeExpense(expenseData); //making a post request to firebase database
        addExpense({ ...expenseData, id: fireBaseId });
      }
      props.navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        cancelHandler={cancelHandler}
        formTitle={isEditing ? "Update Your Expense" : "Enter an Expense"}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense} />
      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} press={deleteExpenseHandler} />
        </View>}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  },
});
