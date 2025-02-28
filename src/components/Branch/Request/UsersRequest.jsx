import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import { styles } from "../../../utils/stylesheet.jsx";
import Pagination from "../../ui/pagination.jsx";
import TableHeading from "../../ui/TableHeading.jsx";
import TableData from "./TableData.jsx";

export default function UsersRequest() {
    const { requestsData: data } = useContext(MyContext);
    const { CommonBranchWrapper, handleUpdateStatus } = useFunctions();
    const [statuses, setStatuses] = useState(
        data.reduce((acc, request) => {
            acc[request.id] = request.status || "Pending";
            return acc;
        }, {})
    );
    const route = useRoute();
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, "User's Request");
            return;
        }, [])
    );

    const handleStatusUpdate = (id, status) => {
        setStatuses((prev) => ({
            ...prev,
            [id]: "animating",
        }));

        handleUpdateStatus(id, status)
            .then(() => {
                setStatuses((prev) => ({
                    ...prev,
                    [id]: status,
                }));
            })
            .catch(() => {
                setStatuses((prev) => ({
                    ...prev,
                    [id]: "Pending",
                }));
            });
    };

    const currentItems = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <ScrollView style={styles.ur_container}>
            <DataTable>
                <TableHeading
                    colName1="User Name"
                    colName2="Event Name"
                    colName3="Status / Actions"
                    col1Style={{ flex: 2 }}
                    col2Style={{ flex: 2, position: "relative", left: 32 }}
                    col3Style={{ flex: 2.8, position: "relative", left: 40 }}
                    col4Style={{ display: "none" }}
                />
                <TableData statuses={statuses} currentItems={currentItems} handleStatusUpdate={handleStatusUpdate} />
                <Pagination page={page} totalPages={totalPages} itemsPerPage={itemsPerPage} setPage={setPage} />
            </DataTable>
        </ScrollView>
    );
}