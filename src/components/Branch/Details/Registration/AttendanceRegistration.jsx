import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import useFunctions from "../../../../hooks/useFunctions.jsx";
import Pagination from "../../../ui/pagination.jsx";
import TableRegisterHeading from "../../../ui/TableRegisterHeading.jsx";
import TableRegisterTitle from "../../../ui/TableRegisterTitle.jsx";
import TableData from "./TableData.jsx";

export default function AttendanceRegistration({ eventName, filteredEvent }) {
    const { usersData: data, date, branchData, requestsData } = useContext(MyContext);
    const { CommonBranchWrapper } = useFunctions();
    const [page, setPage] = useState(0);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState({ column: "eventDate", order: "ascending" });
    const [checked, setChecked] = useState({});

    const filteredUsers = data.filter((item) => item?.branch_id === branchData?.branchId);

    const searchedUsers = filteredUsers.filter((user) =>
        Object.values(user).some((value) =>
            value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // console.log("requestsData", requestsData);

    const itemsPerPage = 6;
    const totalItems = searchedUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, eventName);
            return;
        }, [])
    );

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardOpen(true);
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardOpen(false);
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const handleSort = (column) => {
        setSortOrder((prev) => ({
            column,
            order: prev.column === column && prev.order === "ascending" ? "descending" : "ascending",
        }));
    };

    const sortedUsers = [...searchedUsers].sort((a, b) => {
        if (sortOrder.column === "userName") {
            return sortOrder.order === "ascending"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortOrder.column === "phone_number") {
            return sortOrder.order === "ascending"
                ? a.phone_number.localeCompare(b.phone_number)
                : b.phone_number.localeCompare(a.phone_number);
        } else {
            return sortOrder.order === "ascending"
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        }
    });

    const currentItems = sortedUsers.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    const isAllChecked =
        currentItems.length > 0 &&
        currentItems.every((item) => checked[item.user_id]);
    const isAnyChecked = currentItems.some((item) => checked[item.user_id]);

    const handleStatusUpdate = async (id, status) => {
        try {
            console.log("id", id, status);
            // await handleUpdateStatus(id, status);
            // setFilteredRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleBulkStatusUpdate = async (status) => {
        try {
            // let selectedIds;
            // if (isAllChecked) {
            //     selectedIds = sortedUsers.map((item) => item.id.toString());
            // } else {
            //     selectedIds = Object.keys(checked).filter((id) => checked[id]);
            // }

            // if (selectedIds.length === 0) return;
            console.log("status", status);

            // await handleUpdateBulkStatus(selectedIds, status);

            // setsortedUsers((prevRequests) =>
            //     prevRequests.filter((request) => !selectedIds.includes(request.id.toString()))
            // );

            setChecked({});
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const toggleCheck = (id) => {
        setChecked((prev) => {
            const newChecked = { ...prev, [id]: !prev[id] };

            const allChecked = currentItems.every((item) => newChecked[item.user_id]);
            if (allChecked) {
                return newChecked;
            }

            return newChecked;
        });
    };

    const toggleAll = () => {
        const newCheckedState = !isAllChecked;
        const newChecked = {};

        currentItems.forEach((item) => {
            newChecked[item.user_id] = newCheckedState;
        });

        setChecked(newChecked);
    };

    return (
        <View style={{ textAlign: "center", position: "relative", top: isKeyboardOpen ? "17%" : "9.6%" }}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <DataTable style={{ width: "100%", borderColor: "#ccc", borderWidth: 1, borderBottomWidth: 0 }}>
                    <TableRegisterTitle
                        data={filteredEvent}
                        isAnyChecked={isAnyChecked}
                        isAllChecked={isAllChecked}
                        toggleAll={toggleAll}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        handleBulkStatusUpdate={handleBulkStatusUpdate}
                    />
                    {date && (
                        <>
                            <TableRegisterHeading
                                isAllChecked={isAllChecked}
                                handleSort={handleSort}
                                sortOrder={sortOrder}
                                toggleAll={toggleAll}
                            />
                            <TableData
                                checked={checked}
                                page={page}
                                itemsPerPage={itemsPerPage}
                                currentItems={currentItems}
                                toggleCheck={toggleCheck}
                                handleStatusUpdate={handleStatusUpdate}
                            />
                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                                setPage={setPage}
                                style={{
                                    borderColor: "#ccc", borderWidth: 1, position: "relative", bottom: "5.8%"
                                }}
                            />
                        </>
                    )}
                </DataTable>
            </ScrollView>
        </View>
    );
}