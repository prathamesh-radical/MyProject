import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Avatar } from "react-native-paper";
import Toast from "react-native-toast-message";
import { MyContext } from "../../context/ContextProvider";
import useFunctions from "../../hooks/useFunctions";

export default function UserLogin() {
    const { userLoginFormData: formData, handleLoginChange } = useContext(MyContext);
    const { UserLoginWrapper } = useFunctions();
    const navigation = useNavigation();
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            UserLoginWrapper(route);
            return;
        }, [])
    );

    const handleLogin = async () => {
        if (!formData.phone_number || !formData.password) {
            Toast.show({
                type: "error",
                text1: "Empty Fields",
                text2: "Please enter both phone number and password",
            });
            return;
        }

        if (formData.password.length < 8) {
            Toast.show({
                type: "error",
                text1: "Invalid Password",
                text2: "Password must be at least 8 characters long",
            });
            return;
        }

        setLoading(true);
        
        try {
            Toast.show({
                type: "success",
                text1: "Login Successful",
                text2: "Welcome back!",
            });

            setLoading(false);

            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "UserHome" }],
                });
            }, 500);
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <Text style={styles.title}>Login</Text>
            </View>

            <View style={styles.avatarContainer}>
                <Avatar.Icon size={110} icon="account" style={styles.avatar} />
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Number"
                    value={formData.phone_number}
                    keyboardType="numeric"
                    onChangeText={(text) => handleLoginChange("phone_number")(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => handleLoginChange("password")(text)}
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <>
                            <ActivityIndicator color="#fff" />
                            <Text style={styles.loginButtonText}>  Logging in...</Text>
                        </>
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.registerText}>
                    Don't Have an Account? 
                    <Text style={styles.registerLink} onPress={() => navigation.navigate("UserRegister")}>
                        {" "}Sign Up
                    </Text>
                </Text>
            </View>

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    appbar: {
        width: "100%",
        height: 150,
        backgroundColor: "#F26F29",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        color: "#fff",
        marginBottom: 70,
    },
    avatarContainer: {
        alignItems: "center",
        marginTop: -50    
    },
    avatar: {
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: "#fff",
    },
    formContainer: {
        width: "90%",
        marginTop: 40,
        alignItems: "center",
    },
    input: {
        width: "90%",
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: "#F8F8F8",
    },
    forgotPassword: {
        color: "#F26F29",
        alignSelf: "flex-start",
        marginTop: 40,
        fontWeight: "bold",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#F26F29",
        width: "90%",
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10, 
        marginTop: 20,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 17,
    },
    registerText: {
        fontSize: 12,
        color: "#A9A9A9",
        marginTop: 10, 
    },
    registerLink: {
        color: "#F26F29",
        fontWeight: "bold",
    },
});
