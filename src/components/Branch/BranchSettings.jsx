import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Text } from "react-native";
import useFunctions from "../../hooks/useFunctions";

export default function BranchSettings() {
    const { CommonBranchWrapper } = useFunctions();
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, "Settings");
            return;
        }, [])
    );

    return (
        <Text style={{ textAlign: "center" }}>Branch Settings</Text>
    );
};