import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

// const DUMMY_EXPENSES = [
//     {
//         id: "e1",
//         description: "A pair of shoes",
//         amount: 15000.00,
//         date: new Date("2021-12-19")
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
//         date: new Date("2022-1-05")
//     },
//     {
//         id: "e7",
//         description: "Some bananas",
//         amount: 1000.00,
//         date: new Date("2021-12-01")
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
//         date: new Date("2022-02-18")
//     }
// ]

function ExpensesOutput(props) {

    let content = <Text style={styles.infoText}>{props.fallBackText}</Text>

    if (props.expenses.length > 0) {
        content = <ExpensesList expensesList={props.expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary expensesSummary={props.expenses} periodName={props.expensesPeriod} />
            {content}
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        marginTop: 32
    }
});
