import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function SignUp({
    formData, dropdownState, setOpenDropdown, setDropdownValue, setDropdownItems, handleLoginChange, handleSubmit
}) {
    return (
        <View style={styles.container}>
            {/* Form Fields */}
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={formData.first_name}
                    keyboardType="default"
                    onChangeText={(text) => handleLoginChange("first_name")(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={formData.last_name}
                    keyboardType="default"
                    onChangeText={(text) => handleLoginChange("last_name")(text)}
                />
            </View>

            <DropDownPicker
                open={dropdownState.open === "city"}
                value={dropdownState.value.city}
                items={dropdownState.items.city}
                setOpen={() => setOpenDropdown("city")}
                setValue={(callback) => setDropdownValue("city", callback(dropdownState.value.city))}
                setItems={(callback) => setDropdownItems("city", callback(dropdownState.items.city))}
                placeholder="Select City"
                placeholderStyle={styles.placeholderBold}
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"  // Ensure dropdown opens downward
                style={[styles.dropdown, dropdownState.open === "city" && styles.dropdownOpen]}
                dropDownContainerStyle={[
                    styles.dropdownContainer, dropdownState.open === "city" && styles.dropdownContainerOpen
                ]}
            />

            <DropDownPicker
                open={dropdownState.open === "branch"}
                value={dropdownState.value.branch}
                items={dropdownState.items.branch}
                setOpen={() => setOpenDropdown("branch")}
                setValue={(callback) => setDropdownValue("branch", callback(dropdownState.value.branch))}
                setItems={(callback) => setDropdownItems("branch", callback(dropdownState.items.branch))}
                placeholder="Select Branch"
                placeholderStyle={styles.placeholderBold}
                disabled={!dropdownState.value.city || dropdownState.value.city === "There's nothing to show!"}
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"  // Ensure dropdown opens downward
                style={[styles.dropdown, dropdownState.open === "branch" && styles.dropdownOpenLower]}
                dropDownContainerStyle={[styles.dropdownContainer, dropdownState.open === "branch" && styles.dropdownContainerOpenLower]}
            />

            <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={formData.password}
                onChangeText={(text) => handleLoginChange("password")(text)}
                secureTextEntry
            />
            <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                value={formData.confirm_password}
                onChangeText={(text) => handleLoginChange("confirm_password")(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={(event) => handleSubmit(event)}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        gap: 10,
    },
    input: {
        flex: 1,
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 8,
        marginTop: 20,
        backgroundColor: "#F8F8F8",
    },
    placeholderBold: {
        color: "#aaa",
    },
    dropdown: {
        width: "80%",
        alignSelf: "center",
        marginVertical: 8,
        borderRadius: 10,
        borderColor: "#ccc",
        backgroundColor: "#F8F8F8",
        zIndex: 1,
    },
    dropdownOpen: {
        zIndex: 3000,
        elevation: 3,
    },
    dropdownContainerOpen: {
        zIndex: 3000,
    },
    dropdownContainer: {
        width: "80%",
        alignSelf: "center",
        zIndex: 1,
        borderColor: "#ccc",
        borderWidth: 2,
        marginTop: 8,
    },
    dropdownOpenLower: {
        zIndex: 1000,
        elevation: 2,
    },
    dropdownContainerOpenLower: {
        zIndex: 1500,
    },
    passwordInput: {
        width: "80%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 8,
        backgroundColor: "#F8F8F8",
    },
    button: {
        backgroundColor: "#F26F29",
        width: "80%",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
    },
});
