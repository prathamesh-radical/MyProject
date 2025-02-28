import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import useFunctions from "../../hooks/useFunctions.jsx";

export default function OtherEvents() {
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, "Other Events");
            return;
        }, [])
    );

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16, }}>
            <Text>Other Events</Text>
        </View>
    );
};