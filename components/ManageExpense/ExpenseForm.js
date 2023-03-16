import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm(props) {
    // const [inputValues, setInputValues] = useState({
    //     amount: props.defaultValues ? props.defaultValues.amount.toString() : "",
    //     date: props.defaultValues ? getFormattedDate(props.defaultValues.date) : "",
    //     description: props.defaultValues ? props.defaultValues.description : ""
    // });
    const [inputValues, setInputValues] = useState({
        amount: { value: props.defaultValues ? props.defaultValues.amount.toString() : "", isValid: true },
        date: { value: props.defaultValues ? getFormattedDate(props.defaultValues.date) : "", isValid: true },
        description: { value: props.defaultValues ? props.defaultValues.description : "", isValid: true }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid Input', 'Please check your input values')
            setInputValues((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        props.onSubmit(expenseData);
    }

    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>{props.formTitle}</Text>
        <View style={styles.inputsRow}>
            <Input customStyle={styles.rowInput}
                label="Amount"
                invalid={!inputValues.amount.isValid}
                textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangedHandler.bind(this, "amount"),
                    value: inputValues.amount.value
                }} />
            <Input customStyle={styles.rowInput}
                label="Date"
                invalid={!inputValues.date.isValid}
                textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxlength: 10,
                    onChangeText: inputChangedHandler.bind(this, "date"),
                    value: inputValues.date.value
                }} />
        </View>
        <Input label="Description"
            invalid={!inputValues.description.isValid}
            textInputConfig={{
                multiline: true, // multine for ios
                //numberOfLines: 4, // multine for android
                //autoCapitalize: "none"
                //autoCorrect: false // default is true
                placeholder: "Expense Description",
                onChangeText: inputChangedHandler.bind(this, "description"),
                value: inputValues.description.value
            }} />
        {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
        <View style={styles.buttons}>
            <Button customStyle={styles.button} mode="flat" press={props.cancelHandler}>Cancel</Button>
            <Button customStyle={styles.button} press={submitHandler}>{props.submitButtonLabel}</Button>
        </View>

    </View>
}
export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
});