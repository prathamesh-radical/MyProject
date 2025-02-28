import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text } from "react-native";
import useFunctions from "../../hooks/useFunctions";

export default function UserSettings() {
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, "Settings");
            return;
        }, [])
    );

    return (
        <Text style={{ textAlign: "center" }}>User Settings</Text>
    );
};