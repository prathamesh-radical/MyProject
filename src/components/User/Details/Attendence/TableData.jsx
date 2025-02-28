import React from "react";
import { Text } from "react-native";
import { Badge, DataTable } from "react-native-paper";
import formatDate, { formatDates } from "../../../../utils/formatData.jsx";
import { styles } from "../../../../utils/stylesheet.jsx";

export default function TableData({ days, page, itemsPerPage, currentItems, eventDates }) {
    const getBadgeColor = (status) => {
        switch (status) {
            case "Accepted":
                return "#22C55E";
            case "Rejected":
                return "#DC2626";
            case "Pending":
                return "#F59E0B";
            case "Not Attended":
                return "#9CA3AF";
            default:
                return "#9CA3AF";
        }
    };

    return (
        <>
            {currentItems.map((item, index) => {
                const requestDate = formatDates([new Date(item.date)])[0];
                const isEventDateMatch = eventDates.includes(requestDate);
                const status = isEventDateMatch ? item.status : "Not Attended";

                return (
                    <DataTable.Row key={index} style={styles.ur_row}>
                        <DataTable.Cell>
                            <Text style={{ textAlign: "center" }}>{(page * itemsPerPage) + index + 1}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <Text>
                                {formatDate(item.date)}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>
                            <Text>{days}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3, justifyContent: "center" }}>
                            <Badge
                                style={[
                                    styles.att_badge,
                                    { backgroundColor: getBadgeColor(status) },
                                ]}
                            >
                                <Text style={{ fontSize: 14 }}>{status}</Text>
                            </Badge>
                        </DataTable.Cell>
                    </DataTable.Row>
                );
            })}
        </>
    );
};