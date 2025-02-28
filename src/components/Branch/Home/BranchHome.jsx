import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import useFunctions from "../../../hooks/useFunctions.jsx";
import Pagination from "../../ui/pagination.jsx";
import TableHeading from "../../ui/TableHeading.jsx";
import TableData from "./TableData.jsx";

export default function BranchHome() {
    const { usersData: data, branchData } = useContext(MyContext);
    const { CommonBranchWrapper } = useFunctions();
    const [page, setPage] = useState(0);
    const filteredUsers = data.filter((item) => item?.branch_id === branchData?.branchId);
    const itemsPerPage = 11;
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = filteredUsers.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
    const route = useRoute();

    useFocusEffect(
        useCallback(() => {
            CommonBranchWrapper(route, "Home");
            return;
        }, [])
    );

    return (
        <View>
            <ScrollView>
                <DataTable style={{ width: "100%", }}>
                    <TableHeading
                        colName1="S No."
                        colName2="User Name"
                        colName3="Phone Number"
                        colName4="Action"
                        col1Style={{ flex: 1, justifyContent: "center", position: "relative", right: 20 }}
                        col2Style={{ flex: 2, justifyContent: "center", position: "relative", right: 20 }}
                        col3Style={{ flex: 2, justifyContent: "center", position: "relative", right: 5 }}
                        col4Style={{ flex: 1, justifyContent: "center", position: "relative", left: 8 }}
                    />
                    <TableData page={page} itemsPerPage={itemsPerPage} currentItems={currentItems} />
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setPage={setPage}
                        style={{ position: "relative", bottom: "6%", borderColor: "#ccc", borderWidth: 1 }}
                    />
                </DataTable>
            </ScrollView>
        </View>
    );
};