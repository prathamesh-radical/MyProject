import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export const ProtectedRouteBranch = ({ children }) => {
    const navigation = useNavigation();
    const [isLoggedBranch, setIsLoggedBranch] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("branchToken");
            setIsLoggedBranch(!!token);
        };
        checkToken();
    }, []);

    if (isLoggedBranch === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return isLoggedBranch ? children : navigation.replace("Home");
};

export const ProtectedRouteUser = ({ children }) => {
    const navigation = useNavigation();
    const [isLoggedUser, setIsLoggedUser] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem("userToken");
            setIsLoggedUser(!!token);
        };
        checkToken();
    }, []);

    if (isLoggedUser === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return isLoggedUser ? children : navigation.replace("Home");
};

export const getRole = async () => {
    const branchToken = await AsyncStorage.getItem("branchToken");
    const userToken = await AsyncStorage.getItem("userToken");
    return branchToken ? "branch" : userToken ? "user" : null;
};

export const ProtectedAllEvents = ({ children }) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            const role = await getRole();
            setRole(role);
        };
        fetchRole();
    }, []);

    if (role === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (role === "branch") {
        return <ProtectedRouteBranch>{children}</ProtectedRouteBranch>;
    } else if (role === "user") {
        return <ProtectedRouteUser>{children}</ProtectedRouteUser>;
    } else {
        return null;
    }
};