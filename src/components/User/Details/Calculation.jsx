import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import ModalPopup from "../../ui/Modal/Modal.jsx";
import TableHeading from "../../ui/TableHeading.jsx";

export default function Calculation({ event, dates, AcceptStatus, PendingStatus, RejectedStatus }) {
    const { userData, modalsVisibility, toggleModal } = useContext(MyContext);
    const data = event;
    const Percentage = ((AcceptStatus?.length / dates?.length) * 100).toFixed(2);
    const stats = [
        { label: "Total Events Occured", value: dates?.length },
        { label: "Total Joined", value: AcceptStatus?.length },
        { label: "Total Pending", value: PendingStatus?.length },
        { label: "Total Rejected", value: RejectedStatus?.length },
        { label: "Total Percentage", value: `${Percentage}%` }
    ];

    return (
        <View style={{ position: "relative", top: "8%" }}>
            <Text style={{ textAlign: "center", marginVertical: 20 }}>
                Welcome, {userData.userName}
            </Text>
            <DataTable>
                <TableHeading
                    colName1="S. No."
                    colName2="METRIC"
                    colName3="COUNT"
                    style={{ flex: 2 }}
                    col4Style={{ display: "none" }}
                    colStyle={{ flex: 1, justifyContent: "center" }}
                />
                {stats.map((item, index) => (
                    <DataTable.Row
                        key={index}
                        style={[
                            styles.ur_row,
                            item.label === "Total Percentage" && { backgroundColor: "#E7F0FF" },
                        ]}
                    >
                        <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>
                            {index + 1}
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2, justifyContent: "center" }}>{item.label}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1, justifyContent: "center" }}>{item.value}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            <TouchableOpacity
                style={[styles.b_event_button, { paddingVertical: 15, marginHorizontal: 80, marginTop: 30 }]}
                onPress={() => toggleModal("datePicker", true, data)}
            >
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.b_event_buttonText}>Register</Text>
            </TouchableOpacity>
            <ModalPopup visible={modalsVisibility.datePicker} handleClose={toggleModal} />
        </View>
    );
};