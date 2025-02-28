import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text } from "react-native";
import useFunctions from "../../hooks/useFunctions";

export default function UserHome() {
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, "Home");
            return;
        }, [])
    );

    return (
        <Text style={{ textAlign: "center" }}>User Home Page</Text>
    );
};