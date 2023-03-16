import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function ExpensesSummary(props) {

    const expensesSum = props.expensesSummary.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{props.periodName}</Text>
            <Text style={styles.sum}>₦ {expensesSum.toFixed(2)}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500
    }
});
