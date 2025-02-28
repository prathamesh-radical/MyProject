import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { styles } from "../../utils/stylesheet";

export default function TableHeading({
    colName1, colName2, colName3, colName4, col1Style, col2Style, col3Style, col4Style, colStyle, colCommonStyle
}) {
    const route = useRoute();
    let colStyle1 = null;
    let colStyle2 = null;
    let colStyle3 = null;
    let colStyle4 = null;

    if (route.name === "UsersRequest") {
        colStyle1 = col1Style;
        colStyle2 = col2Style;
        colStyle3 = col3Style;
        colStyle4 = col4Style;
    } else if (route.name === "Event Requests") {
        colStyle1 = "";
        colStyle2 = colCommonStyle;
        colStyle3 = colCommonStyle;
        colStyle4 = colStyle;
    } else if (route.name === "Event Calculation") {
        colStyle1 = colStyle;
        colStyle2 = colStyle;
        colStyle3 = colStyle;
        colStyle4 = col4Style;
    } else if (route.name === "BranchHome") {
        colStyle1 = col1Style;
        colStyle2 = col2Style;
        colStyle3 = col3Style;
        colStyle4 = col4Style;
    } else if (route.name === "Attendance Dashboard") {
        colStyle1 = col1Style;
        colStyle2 = col2Style;
        colStyle3 = col3Style;
        colStyle4 = col4Style;
    } else if (route.name === "Attendance Registration") {
        colStyle1 = col1Style;
        colStyle2 = col2Style;
        colStyle3 = col3Style;
        colStyle4 = col4Style;
    }

    return (
        <DataTable.Header style={styles.ur_header}>
            <DataTable.Title style={colStyle1}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>{colName1}</Text>
            </DataTable.Title>
            <DataTable.Title style={colStyle2}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>{colName2}</Text>
            </DataTable.Title>
            <DataTable.Title style={colStyle3}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>{colName3}</Text>
            </DataTable.Title>
            <DataTable.Title style={colStyle4}>
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>{colName4}</Text>
            </DataTable.Title>
        </DataTable.Header>
    );
};