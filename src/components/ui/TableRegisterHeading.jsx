import React, { useRef } from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";
import { Checkbox, DataTable, Icon } from "react-native-paper";

export default function TableRegisterHeading({ isAllChecked, toggleAll, handleSort, sortOrder }) {
    const rotationAnim = {
        userName: useRef(new Animated.Value(
            sortOrder.column === "userName" && sortOrder.order === "ascending" ? 0 : 1
        )).current,
        phone_number: useRef(new Animated.Value(
            sortOrder.column === "phone_number" && sortOrder.order === "ascending" ? 0 : 1)
        ).current,
    };

    const handleColumnSort = (column) => {
        Animated.timing(rotationAnim[column], {
            toValue: sortOrder.column === column && sortOrder.order === "ascending" ? 1 : 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start();

        handleSort(column);
    };

    return (
        <DataTable.Header
            style={{ borderColor: "#ccc", borderWidth: 1, borderTopWidth: 0, backgroundColor: "#E7F0FF" }}
        >
            <DataTable.Cell style={{ position: "relative", right: 15 }}>
                <Checkbox
                    status={isAllChecked ? "checked" : "unchecked"}
                    onPress={() => toggleAll(!isAllChecked)}
                />
            </DataTable.Cell>
            <DataTable.Title style={{ flex: 2, position: "relative", right: 5, top: 3 }}>
                <TouchableOpacity
                    style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                    onPress={() => handleColumnSort("userName")}
                >
                    <Text style={{ fontWeight: "bold", color: "#000" }}>User Name</Text>
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: rotationAnim.userName.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "180deg"],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Icon source="sort-ascending" size={17} color="#000" />
                    </Animated.View>
                </TouchableOpacity>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 3, position: "relative", left: 45, top: 3 }}>
                <TouchableOpacity
                    style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                    onPress={() => handleColumnSort("phone_number")}
                >
                    <Text style={{ fontWeight: "bold", color: "#000" }}>P. No.</Text>
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: rotationAnim.phone_number.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "180deg"],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Icon source="sort-ascending" size={17} color="#000" />
                    </Animated.View>
                </TouchableOpacity>
            </DataTable.Title>
            <DataTable.Title style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", color: "#000" }}>Actions</Text>
            </DataTable.Title>
        </DataTable.Header>
    );
}