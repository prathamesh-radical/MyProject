import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import TableHeading from "../../../ui/TableHeading.jsx";
import Pagination from "../../../ui/pagination.jsx";
import TableData from "./TableData.jsx";

export default function Attendence({ days, requests, eventDates }) {
    const { userData } = useContext(MyContext);
    const [page, setPage] = useState(0);
    const itemsPerPage = 9;
    const totalItems = requests.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const colName1 = "S. No.";
    const colName2 = "Date";
    const colName3 = "Day";
    const colName4 = "Status";

    const currentItems = requests.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <View style={{ position: "relative", top: "8%", marginBottom: "14%", flex: 1 }}>
            <Text style={{ textAlign: "center", marginVertical: 15 }}>
                Welcome, {userData.userName}
            </Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <DataTable>
                    <TableHeading
                        colName1={colName1}
                        colName2={colName2}
                        colName3={colName3}
                        colName4={colName4}
                        colCommonStyle={{ position: "relative", right: "4%" }}
                    />
                    <TableData
                        days={days}
                        page={page}
                        itemsPerPage={itemsPerPage}
                        currentItems={currentItems}
                        eventDates={eventDates}
                    />
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setPage={setPage}
                    />
                </DataTable>
            </ScrollView>
        </View>
    );
}