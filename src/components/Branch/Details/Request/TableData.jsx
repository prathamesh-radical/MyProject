import React from "react";
import { Checkbox, DataTable, Text } from "react-native-paper";
import formatDate from "../../../../utils/formatData";
import MenuItem from "../../../ui/MenuItem/MenuItem";

export default function TableData({ page, rowsPerPage, checked, sortedRequests, toggleCheck, handleStatusUpdate }) {
    return (
        <>
            {sortedRequests.length === 0 && (
                <Text style={{ textAlign: "center", paddingVertical: 20 }}>
                    No pending request found.
                </Text>
            )}
            {sortedRequests.length !== 0 && (
                sortedRequests.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((item) => (
                    <DataTable.Row key={item.id} style={{ borderColor: "#ccc", borderWidth: 1 }}>
                        <DataTable.Cell style={{ position: "relative", right: 15 }}>
                            <Checkbox
                                status={checked[item.id] ? "checked" : "unchecked"}
                                onPress={() => toggleCheck(item.id)}
                            />
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            {item.first_name}{" "}{item.last_name}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3, position: "relative", left: 20 }}>
                            {formatDate(item.date)}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                            <MenuItem itemId={item.id} handleStatusUpdate={handleStatusUpdate} />
                        </DataTable.Cell>
                    </DataTable.Row>
                )))
            }
        </>
    );
};