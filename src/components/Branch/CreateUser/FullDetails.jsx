import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from "../../../utils/stylesheet";

export default function FullDetails({
    route, formData, navigation, dropdownState, setOpenDropdown, setDropdownValue, setDropdownItems, handleLoginChange, handleSubmit
}) {
    return (
        <>
            <View style={styles.input_container}>
                <TextInput
                    style={[styles.login_input, { width: "48%" }]}
                    placeholder="First Name"
                    value={formData.first_name}
                    keyboardType="default"
                    onChangeText={(text) => handleLoginChange("first_name")(text)}
                />
                <TextInput
                    style={[styles.login_input, { width: "48%" }]}
                    placeholder="Last Name"
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
                containerStyle={{ marginBottom: 20 }}
                style={[styles.dropdown, { backgroundColor: "#ddd" }]}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                listMode="SCROLLVIEW"
                disabled
            />
            <DropDownPicker
                open={dropdownState.open === "branch"}
                value={dropdownState.value.branch}
                items={dropdownState.items.branch}
                setOpen={() => setOpenDropdown("branch")}
                setValue={(callback) => setDropdownValue("branch", callback(dropdownState.value.branch))}
                setItems={(callback) => setDropdownItems("branch", callback(dropdownState.items.branch))}
                placeholder="Select Branch"
                containerStyle={{ marginBottom: 20 }}
                style={[styles.dropdown, { backgroundColor: "#ddd" }]}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                listMode="SCROLLVIEW"
                disabled
            />
            <TextInput
                style={styles.login_input}
                placeholder="Phone Number"
                value={formData.phone_number}
                keyboardType="numeric"
                onChangeText={(text) => handleLoginChange("phone_number")(text)}
            />
            <TextInput
                style={styles.login_input}
                placeholder="Address"
                value={formData.address}
                keyboardType="default"
                onChangeText={(text) => handleLoginChange("address")(text)}
                multiline
            />
            <TextInput
                style={[styles.login_input, styles.password_input]}
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => handleLoginChange("password")(text)}
                secureTextEntry
            />
            <TextInput
                style={[styles.login_input, styles.password_input]}
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChangeText={(text) => handleLoginChange("confirm_password")(text)}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.login_button}
                onPress={(event) => handleSubmit(event)}
            >
                <Text style={styles.login_buttonText}>Register</Text>
            </TouchableOpacity>
            {(route.name === "UserRegister" && route.name !== "CreateUser") && (
                <Text style={{ textAlign: "center", paddingTop: 20 }}>
                    Already have an account? <Text
                        style={{ color: "#3478f6" }}
                        onPress={() => navigation.navigate("UserLogin")}
                    >
                        Login
                    </Text>
                </Text>
            )}
        </>
    );
};