import React, { useContext } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Badge, DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { MyContext } from "../../../context/ContextProvider.jsx";
import formatDate from "../../../utils/formatData.jsx";
import { styles } from "../../../utils/stylesheet.jsx";

export default function FilterModal({ visible, handleClose }) {
    const { index, data } = useContext(MyContext);
    const tableData = {
        "S. No.": index,
        "User Name": data?.userName,
        "Event Name": data?.eventName,
        "Event Date": formatDate(data?.date),
        "Phoner Number": data?.phone_number,
        "Status": data?.status,
    };

    function badge(value) {
        return (
            <Badge size={30} style={[styles.ur_badge, { backgroundColor: getBadgeColor(value), left: 0 }]}>
                {value}
            </Badge>
        );
    }

    function getBadgeColor(value) {
        if (value === "Accepted") {
            return "#22C55E";
        } else if (value === "Rejected") {
            return "#DC2626";
        } else if (value === "Pending") {
            return "#F59E0B";
        }
    }

    return (
        <View style={styles.modal_container}>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={() => handleClose("brancheventdetails", false)}
            >
                <View style={styles.modal_overlay}>
                    <View style={[styles.modal_subcontainer, { paddingHorizontal: 0, marginVertical: "52%" }]}>
                        <TouchableOpacity
                            style={styles.modal_closebutton}
                            onPress={() => handleClose("brancheventdetails", false)}
                        >
                            <Icon
                                name="times"
                                size={20}
                                color="#fff"
                                style={{ textAlign: "center", paddingVertical: 5, paddingHorizontal: 8 }}
                            />
                        </TouchableOpacity>
                        <DataTable style={{ width: "100%", marginTop: 20 }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {Object.entries(tableData).map(([label, value], index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={[styles.md_th, { flex: 0.7 }]}>
                                            <Text style={{ fontWeight: "bold" }}>{label}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.md_td}>
                                            {label === "Status" ? (
                                                badge(value)
                                            ) : (
                                                <Text>{value}</Text>
                                            )}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </ScrollView>
                        </DataTable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}