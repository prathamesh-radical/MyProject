import React, { useContext, useState } from "react";
import { DataTable } from "react-native-paper";
import { MyContext } from "../../../../context/ContextProvider.jsx";
import { filterRequestsByDate } from "../../../../utils/formatData.jsx";
import Pagination from "../../../ui/pagination.jsx";
import TableHeading from "../../../ui/TableHeading.jsx";
import TableData from "./TableData.jsx";

export default function FilteredData({ filteredData }) {
    const { startDate, endDate } = useContext(MyContext);
    const [page, setPage] = useState(0);
    const result = filterRequestsByDate(filteredData, startDate, endDate);
    const itemsPerPage = 7;
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = result.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <DataTable style={{ marginTop: 20, borderColor: "#ccc", borderWidth: 1 }}>
            <TableHeading
                colName1="Sr. No."
                colName2="User Name"
                colName3="Event Name"
                colName4="Action"
                col1Style={{ flex: 1, justifyContent: "center" }}
                col2Style={{ flex: 2, justifyContent: "center" }}
                col3Style={{ flex: 2, justifyContent: "center" }}
                col4Style={{ flex: 1, justifyContent: "center" }}
            />
            <TableData currentItems={currentItems} />
            <Pagination page={page} totalPages={totalPages} itemsPerPage={itemsPerPage} setPage={setPage} />
        </DataTable>
    );
};