import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function ExpensesList(props) {
    const navigation = useNavigation();

    function expensePressHandler(id) {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }


    return <FlatList data={props.expensesList} keyExtractor={(item) => item.id} renderItem={(itemData) =>
        <Pressable onPress={() => expensePressHandler(itemData.item.id)} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{itemData.item.description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(itemData.item.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>₦ {itemData.item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    } />;
}

export default ExpensesList;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: "bold"
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: "bold"
    }
});
