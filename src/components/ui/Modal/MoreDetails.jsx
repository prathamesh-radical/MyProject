import React, { useContext } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataTable } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { MyContext } from "../../../context/ContextProvider.jsx";
import { styles } from "../../../utils/stylesheet.jsx";

export default function MoreDetails({ visible, handleClose }) {
    const { data } = useContext(MyContext);
    const tableData = {
        "User Name": data?.name,
        "Events Data": data?.branch_name,
        "Address": data?.address,
        "City": data?.city,
        "Phone. No.": data?.phone_number,
    };

    return (
        <View style={styles.modal_container}>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
                onRequestClose={() => handleClose("branch", false)}
            >
                <View style={styles.modal_overlay}>
                    <View style={[styles.modal_subcontainer, { paddingHorizontal: 0, marginVertical: "60%" }]}>
                        <TouchableOpacity
                            style={styles.modal_closebutton}
                            onPress={() => handleClose("branch", false)}
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
                                        <DataTable.Cell style={styles.md_th}>
                                            <Text style={{ fontWeight: "bold" }}>{label}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.md_td}>
                                            <Text>{value}</Text>
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