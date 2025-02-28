import React from "react";
import { Text, View } from "react-native";
import { Button, DataTable, Icon, IconButton } from "react-native-paper";

export default function TableTitle({ isAnyChecked, toggleAll, isAllChecked, handleBulkStatusUpdate }) {
    return (
        <DataTable.Header
            style={{ borderColor: "#ccc", borderWidth: 1, borderBottomWidth: 0, backgroundColor: "#E7F0FF" }}
        >
            <DataTable.Title>
                <Text style={{ fontSize: 16, color: "#000" }}>Pending Request</Text>
            </DataTable.Title>
            <View style={{ position: "absolute", right: 2 }}>
                {!isAnyChecked ? (
                    <IconButton
                        icon="filter"
                        iconColor="#fff"
                        mode="contained-tonal"
                        size={20}
                        style={{ backgroundColor: "#2563EB" }}
                    />
                ) : (
                    <View
                        style={{
                            flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5, top: 3
                        }}
                    >
                        <Button
                            icon={() => <Icon source="check-circle" color="#fff" size={20} />}
                            style={{ backgroundColor: "green" }}
                            onPress={() => handleBulkStatusUpdate("Accepted")}
                        >
                            <Text style={{ color: "#fff" }}>Accept</Text>
                        </Button>
                        <Button
                            icon={() => <Icon source="close-circle" color="#fff" size={20} />}
                            style={{ backgroundColor: "red" }}
                            onPress={() => handleBulkStatusUpdate("Rejected")}
                        >
                            <Text style={{ color: "#fff" }}>Reject</Text>
                        </Button>
                    </View>
                )}
            </View>
        </DataTable.Header>
    );
};