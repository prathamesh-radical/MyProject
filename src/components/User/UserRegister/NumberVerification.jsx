import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function NumberVerification({ error, formData, handleLoginChange, handleValidatePhoneNumber }) {
    return (
        <View style={styles.container}>
            {/* Form Input */}
            <Text style={styles.subHeading}>Enter Your Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                value={formData.phone_number}
                keyboardType="numeric"
                onChangeText={(text) => handleLoginChange("phone_number")(text)}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Next Button */}
            <TouchableOpacity style={styles.button} onPress={handleValidatePhoneNumber}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        
    },
    subHeading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        marginTop: 25
    },
    input: {
        width: "80%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: "#F8F8F8",
       
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#F26F29",
        width: "80%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        
    },
});
