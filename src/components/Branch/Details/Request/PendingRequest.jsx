import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import useFunctions from "../../../../hooks/useFunctions.jsx";
import Pagination from "../../../ui/pagination.jsx";
import TableFilterHeading from "../../../ui/TableFilterHeading.jsx";
import TableTitle from "../../../ui/TableTitle.jsx";
import TableData from "./TableData.jsx";

export default function PendingRequest({ eventName, routeDetails }) {
    const { branchesRequest, branchData } = useContext(MyContext);
    const { CommonBranchWrapper, handleUpdateStatus, handleUpdateBulkStatus } = useFunctions();
    const [sortOrder, setSortOrder] = useState({ column: "eventDate", order: "ascending" });
    const [checked, setChecked] = useState({});
    const [page, setPage] = useState(0);
    const rowsPerPage = 8;
    const dataBranch = branchesRequest?.requests;
    const branchId = branchData.branchId;
    const { eventId } = routeDetails.params;
    const [filteredRequests, setFilteredRequests] = useState(
        dataBranch.filter(
            (item) =>
                item.event_id === parseInt(eventId, 10) &&
                item.branch_id === parseInt(branchId, 10) &&
                item.status === "Pending"
        ).map((item) => {
            let newDate = new Date(item.date);
            newDate.setUTCDate(newDate.getUTCDate() + 1);
            return { ...item, date: newDate.toISOString().split("T")[0] };
        })
    );
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, eventName);
            return;
        }, [])
    );

    const isAllChecked =
        filteredRequests.length > 0 &&
        filteredRequests.every((request) => checked[request.id]);
    const isAnyChecked = filteredRequests.some((item) => checked[item.id]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await handleUpdateStatus(id, status);
            setFilteredRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleBulkStatusUpdate = async (status) => {
        try {
            let selectedIds;
            if (isAllChecked) {
                selectedIds = filteredRequests.map((item) => item.id.toString());
            } else {
                selectedIds = Object.keys(checked).filter((id) => checked[id]);
            }

            if (selectedIds.length === 0) return;

            await handleUpdateBulkStatus(selectedIds, status);

            setFilteredRequests((prevRequests) =>
                prevRequests.filter((request) => !selectedIds.includes(request.id.toString()))
            );

            setChecked({});
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleSort = (column) => {
        setSortOrder((prev) => ({
            column,
            order: prev.column === column && prev.order === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (sortOrder.column === "userName") {
            return sortOrder.order === "ascending"
                ? a.userName.localeCompare(b.userName)
                : b.userName.localeCompare(a.userName);
        } else {
            return sortOrder.order === "ascending"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        }
    });

    const toggleCheck = (id) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const toggleAll = (checkedAll) => {
        const newChecked = {};
        filteredRequests.forEach((item) => {
            newChecked[item.id] = checkedAll;
        });
        setChecked(newChecked);
    };

    return (
        <View style={{ flex: 1, flexDirection: "column", position: "relative", top: "9.50%", paddingHorizontal: 0 }}>
            <DataTable style={{ borderColor: "#ccc", borderWidth: 1 }}>
                <TableTitle
                    isAnyChecked={isAnyChecked}
                    isAllChecked={isAllChecked}
                    toggleAll={toggleAll}
                    handleBulkStatusUpdate={handleBulkStatusUpdate}
                />
                <TableFilterHeading
                    isAllChecked={isAllChecked}
                    toggleAll={toggleAll}
                    handleSort={handleSort}
                    sortOrder={sortOrder}
                />
                <TableData
                    page={page}
                    checked={checked}
                    rowsPerPage={rowsPerPage}
                    sortedRequests={sortedRequests}
                    toggleCheck={toggleCheck}
                    handleStatusUpdate={handleStatusUpdate}
                />
                <Pagination
                    page={page}
                    totalPages={Math.ceil(sortedRequests.length / rowsPerPage)}
                    itemsPerPage={rowsPerPage}
                    setPage={setPage}
                    style={{ borderColor: "#ccc", borderWidth: 1 }}
                />
            </DataTable>
        </View>
    );
}