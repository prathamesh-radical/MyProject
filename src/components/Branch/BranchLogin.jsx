import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Text } from "react-native-paper";
import { MyContext } from "../../context/ContextProvider.jsx";
import useFunctions from "../../hooks/useFunctions.jsx";
import { styles } from "../../utils/stylesheet.jsx";

export default function BranchLogin() {
    const navigation = useNavigation();
    const route = useRoute();
    const { branchFormData: formData, handleLoginChange } = useContext(MyContext);
    const { CommonFrontWrapper, handleBranchLogin } = useFunctions();
    const backAction = <Appbar.BackAction onPress={() => navigation.goBack()} iconColor="#fff" />;

    useFocusEffect(
        useCallback(() => {
            CommonFrontWrapper(backAction, route);
            return;
        }, [])
    );

    return (
        <View style={[styles.login_container, { paddingHorizontal: 20 }]}>
            <View style={styles.login_subcontainer}>
                <Text style={styles.login_title}>Branch Login</Text>
                <TextInput
                    style={styles.login_input}
                    placeholder="Username"
                    value={formData.branch_username}
                    onChangeText={(text) => handleLoginChange("branch_username")(text)}
                />
                <TextInput
                    style={[styles.login_input, styles.password_input]}
                    placeholder="Password"
                    value={formData.branch_password}
                    onChangeText={(text) => handleLoginChange("branch_password")(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.login_button} onPress={handleBranchLogin}>
                    <Text style={styles.login_buttonText}>
                        <Icon source="login" color="#fff" size={24} /> Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};