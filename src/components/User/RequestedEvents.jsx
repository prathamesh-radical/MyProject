import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text } from "react-native";
import useFunctions from "../../hooks/useFunctions";

export default function RequestedEvents() {
    const { CommonUserWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonUserWrapper(route, "Requested Events");
            return;
        }, [])
    );

    return (
        <Text style={{ textAlign: "center" }}>Requested Events Page</Text>
    );
};