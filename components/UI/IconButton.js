import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

function IconButton(props) {
    return (
        <Pressable onPress={props.press} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.buttonContainer}>
                <Ionicons name={props.icon} size={props.size} color={props.color} />
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 8,
        padding: 6,
        marginHorinzontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    }
});
