import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ThanksPage() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Success Message */}
            <Text style={styles.message}>For Registering With</Text>
            <Text style={styles.brandName}>Mukteshwari!</Text>

            {/* Login Prompt */}
            <Text style={styles.loginPrompt}>Please Log In Here:</Text>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("UserLogin")}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 40, // Adjust spacing from the step indicator
    },
    message: {
        fontSize: 11,
        textAlign: "center",
        fontWeight: "bold",
    },
    brandName: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#F26F29",
        textAlign: "center",
        marginVertical: 5,
    },
    loginPrompt: {
        fontSize: 13,
        color: "#F26F29",
        marginTop: 40,
        fontWeight: "bold",

    },
    loginButton: {
        backgroundColor: "#F26F29",
        width: "80%",
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10, 
        marginTop: 15,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 17,
    }
});
