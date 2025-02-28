import React, { useContext } from "react";
import { DataTable, IconButton } from "react-native-paper";
import { MyContext } from "../../../context/ContextProvider.jsx";
import MoreDetails from "../../ui/Modal/MoreDetails.jsx";

export default function TableData({ page, itemsPerPage, currentItems }) {
    const { modalsVisibility, toggleModal } = useContext(MyContext);

    return (
        <>
            {currentItems.map((user, i) => {
                const id = (page * itemsPerPage) + i + 1;
                const data = user;
                return (
                    <DataTable.Row key={id} style={{ borderColor: "#ccc", borderWidth: 1 }}>
                        <DataTable.Cell
                            style={{ flex: 1, justifyContent: "center", position: "relative", right: 20 }}
                        >
                            {id}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 3, justifyContent: "center", position: "relative", right: 30 }}
                        >
                            {user.first_name}{" "}{user.last_name}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 2, justifyContent: "center", position: "relative", right: 20 }}
                        >
                            {user.phone_number}
                        </DataTable.Cell>
                        <DataTable.Cell
                            style={{ flex: 1, justifyContent: "center", position: "relative", left: 4 }}
                        >
                            <IconButton
                                icon="dots-horizontal"
                                iconColor="#fff"
                                style={{ backgroundColor: "#3478f6" }}
                                size={20}
                                onPress={() => toggleModal("branch", true, data, id)}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                );
            })}
            <MoreDetails visible={modalsVisibility.branch} handleClose={toggleModal} />
        </>
    );
}