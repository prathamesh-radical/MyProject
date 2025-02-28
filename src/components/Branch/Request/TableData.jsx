import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Badge, DataTable, Icon, Tooltip } from "react-native-paper";
import { styles } from "../../../utils/stylesheet";

export default function TableData({ statuses, currentItems, handleStatusUpdate }) {
    const renderActions = (id) => {
        const status = statuses[id];

        if (status === "Accepted") {
            return (
                <Badge size={30} style={[styles.ur_badge, { backgroundColor: "green" }]}>Accepted</Badge>
            );
        }

        if (status === "Rejected") {
            return (
                <Badge size={30} style={[styles.ur_badge, { backgroundColor: "red" }]}>Rejected</Badge>
            );
        }

        return (
            <View style={styles.ur_actions}>
                <Tooltip title="Accept">
                    <TouchableOpacity
                        style={styles.ur_acceptButton}
                        onPress={() => handleStatusUpdate(id, "Accepted")}
                    >
                        <Icon source="check-circle" color="#fff" size={24} />
                    </TouchableOpacity>
                </Tooltip>
                <Tooltip title="Reject">
                    <TouchableOpacity
                        style={styles.ur_rejectButton}
                        onPress={() => handleStatusUpdate(id, "Rejected")}
                    >
                        <Icon source="close-circle" color="#fff" size={24} />
                    </TouchableOpacity>
                </Tooltip>
            </View>
        );
    };

    return (
        <>
            {currentItems.map((item) => (
                <DataTable.Row key={item.id} style={styles.ur_row}>
                    <DataTable.Cell style={{ flex: 1 }}>{item.userName}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0.5 }}>{item.eventName}</DataTable.Cell>
                    <DataTable.Cell style={{ flex: 1 }}>
                        {renderActions(item.id)}
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </>
    );
};