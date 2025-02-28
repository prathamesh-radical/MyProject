import React from "react";
import { DataTable } from "react-native-paper";

export default function Pagination({ page, totalPages, itemsPerPage, setPage, style }) {
    return (
        <DataTable.Pagination
            style={{ backgroundColor: "#E7F0FF", justifyContent: "center", fontWeight: "bold", ...style }}
            page={page}
            numberOfPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            label={`Page ${page + 1} of ${totalPages}`}
            optionsPerPage={[5, 10, 20]}
            itemsPerPage={itemsPerPage}
            showFastPaginationControls
        />
    );
};
